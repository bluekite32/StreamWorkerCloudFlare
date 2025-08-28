export default {
  async fetch(request) {
    const url = new URL(request.url);
    
    // If requesting /stream.mp3, proxy the stream through HTTPS
    if (url.pathname === '/stream.mp3') {
      const streamUrl = 'http://161.33.231.94:8000/stream.mp3';
      
      // Fetch the stream from your server
      const response = await fetch(streamUrl, {
        method: request.method,
        headers: {
          'User-Agent': request.headers.get('User-Agent') || 'CloudflareWorker',
        },
      });
      
      // Return the stream with proper headers for audio
      return new Response(response.body, {
        status: response.status,
        headers: {
          'Content-Type': 'audio/mpeg',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-cache',
        },
      });
    }
    
    // For all other requests, serve your main website
    return new Response('Welcome to welcome.audio', {
      headers: { 'content-type': 'text/html' },
    });
  },
};
