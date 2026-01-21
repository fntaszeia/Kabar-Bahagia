// API Configuration for Cloudflare Workers
// Update this URL after deploying your worker

const API_CONFIG = {
    // Replace with your actual worker URL after deployment
    // Format: https://kabar-bahagia-api.<your-subdomain>.workers.dev
    baseURL: 'https://kabar-bahagia-api.fntasze.workers.dev',
    endpoints: {
        greetings: '/api/greetings'
    }
};

// Export for use in script.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = API_CONFIG;
}
