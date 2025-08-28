export default {
  async fetch(request) {
    const url = new URL(request.url);
    
    // Debug logging
    console.log('Request URL:', request.url);
    console.log('Pathname:', url.pathname);
    
    // Handle stream request
    if (url.pathname === '/stream.mp3') {
      console.log('Serving audio stream');
      
      try {
        const response = await fetch('http://161.33.231.94:8000/stream.mp3', {
          method: request.method,
          headers: {
            'User-Agent': 'CloudflareWorker',
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
      } catch (error) {
        return new Response('Stream error', { status: 500 });
      }
    }
    
    // Serve HTML for all other requests
    const html = `<!DOCTYPE html>
<html>
<head><title>Welcome Audio</title></head>
<body><h1>Main page - worker is working</h1></body>
</html>`;
    
    return new Response(html, {
      headers: { 'content-type': 'text/html' },
    });
  },
};
