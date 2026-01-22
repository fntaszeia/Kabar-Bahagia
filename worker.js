// Cloudflare Worker API for Wedding Greetings
// Handles GET and POST requests for greetings
// Security: No DELETE/PUT/PATCH methods exposed, rate limiting, input validation

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';

    // CORS headers - restrict to your domain in production
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // SECURITY: Block all methods except GET and POST
    if (!['GET', 'POST'].includes(request.method)) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Method not allowed'
      }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // SECURITY: Rate limiting check
    const rateLimitResult = await checkRateLimit(env, ip);
    if (!rateLimitResult.allowed) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Too many requests. Please wait before submitting again.'
      }), {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Retry-After': '60' }
      });
    }

    // Route: GET /api/greetings - Fetch all greetings
    if (url.pathname === '/api/greetings' && request.method === 'GET') {
      try {
        const { results } = await env.DB.prepare(
          'SELECT id, name, message, timestamp FROM greetings ORDER BY timestamp DESC LIMIT 100'
        ).all();

        return new Response(JSON.stringify({ success: true, greetings: results }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    // Route: POST /api/greetings - Add new greeting
    if (url.pathname === '/api/greetings' && request.method === 'POST') {
      try {
        const body = await request.json();
        const { name, message } = body;

        // SECURITY: Basic input validation
        if (!name || !message) {
          return new Response(JSON.stringify({ success: false, error: 'Name and message are required' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        // SECURITY: Validate length
        if (name.length > 100 || message.length > 500) {
          return new Response(JSON.stringify({ success: false, error: 'Name or message too long' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        // SECURITY: Check for SQL injection patterns (basic)
        if (containsSuspiciousPatterns(name) || containsSuspiciousPatterns(message)) {
          return new Response(JSON.stringify({ success: false, error: 'Invalid characters detected' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        // SECURITY: Check for spam/duplicate submissions
        const isDuplicate = await checkDuplicateSubmission(env, ip, message);
        if (isDuplicate) {
          return new Response(JSON.stringify({ success: false, error: 'Duplicate submission detected' }), {
            status: 429,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        const timestamp = Date.now();

        // Insert into database
        const result = await env.DB.prepare(
          'INSERT INTO greetings (name, message, timestamp, ip_address) VALUES (?, ?, ?, ?)'
        ).bind(name, message, timestamp, ip).run();

        // Fetch the newly created greeting
        const { results } = await env.DB.prepare(
          'SELECT id, name, message, timestamp FROM greetings WHERE id = ?'
        ).bind(result.meta.last_row_id).all();

        return new Response(JSON.stringify({ success: true, greeting: results[0] }), {
          status: 201,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    // 404 for other routes
    return new Response(JSON.stringify({ success: false, error: 'Not found' }), {
      status: 404,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
};

// SECURITY HELPER FUNCTIONS

// Rate limiting: max 5 POST requests per IP per minute
async function checkRateLimit(env, ip) {
  const now = Date.now();
  const windowMs = 60000; // 1 minute
  const maxRequests = 5;

  try {
    // Get recent submissions from database
    const { results } = await env.DB.prepare(
      'SELECT COUNT(*) as count FROM greetings WHERE ip_address = ? AND timestamp > ?'
    ).bind(ip, now - windowMs).all();

    const count = results[0]?.count || 0;
    return { allowed: count < maxRequests, count };
  } catch (error) {
    // If rate limit check fails, allow the request (fail open)
    console.error('Rate limit check failed:', error);
    return { allowed: true, count: 0 };
  }
}

// Check for suspicious SQL injection patterns
function containsSuspiciousPatterns(text) {
  const suspiciousPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT)\b)/gi,
    /(--|;|\/\*|\*\/|xp_|sp_)/gi,
    /<script[^>]*>.*?<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi // Event handlers like onclick=
  ];

  return suspiciousPatterns.some(pattern => pattern.test(text));
}

// Check for duplicate submissions (same IP + similar message within 5 minutes)
async function checkDuplicateSubmission(env, ip, message) {
  const fiveMinutesAgo = Date.now() - (5 * 60 * 1000);

  try {
    const { results } = await env.DB.prepare(
      'SELECT message FROM greetings WHERE ip_address = ? AND timestamp > ? ORDER BY timestamp DESC LIMIT 1'
    ).bind(ip, fiveMinutesAgo).all();

    if (results.length > 0) {
      // Check if messages are very similar (simple comparison)
      const lastMessage = results[0].message.toLowerCase().trim();
      const currentMessage = message.toLowerCase().trim();
      return lastMessage === currentMessage;
    }

    return false;
  } catch (error) {
    console.error('Duplicate check failed:', error);
    return false;
  }
}
