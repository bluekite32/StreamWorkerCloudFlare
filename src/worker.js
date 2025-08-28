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
    
    // For the main page, serve your HTML
    const html = YOUR_HTML_CONTENT_HERE;
    
    return new Response(html, {
      headers: { 
        'content-type': 'text/html',
        'Access-Control-Allow-Origin': '*'
      },
    });
  },
};
