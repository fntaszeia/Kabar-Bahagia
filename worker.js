// Cloudflare Worker API for Wedding Greetings
// Handles GET and POST requests for greetings

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*', // Allow all origins, restrict in production
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
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

        // Validation
        if (!name || !message) {
          return new Response(JSON.stringify({ success: false, error: 'Name and message are required' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        // Validate length
        if (name.length > 100 || message.length > 500) {
          return new Response(JSON.stringify({ success: false, error: 'Name or message too long' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        // Get IP address for rate limiting (optional)
        const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
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
