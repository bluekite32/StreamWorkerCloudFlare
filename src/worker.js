export default {
  async fetch(request) {
    const url = new URL(request.url);
    
    // If requesting /stream.mp3, proxy the audio stream
    if (url.pathname === '/stream.mp3') {
      const streamUrl = 'http://161.33.231.94:8000/stream.mp3';
      
      const response = await fetch(streamUrl, {
        method: request.method,
        headers: {
          'User-Agent': request.headers.get('User-Agent') || 'CloudflareWorker',
        },
      });
      
      return new Response(response.body, {
        status: response.status,
        headers: {
          'Content-Type': 'audio/mpeg',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-cache',
        },
      });
    }
    
    // For the main page and all other requests, serve your Cloudflare Pages site
    const pagesUrl = new URL(request.url);
    pagesUrl.hostname = 'YOUR_PAGES_URL.pages.dev'; // Replace with your actual Pages URL
    
    return fetch(pagesUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body,
    });
  },
};
