export default {
  async fetch(request) {
    const url = new URL(request.url);
    
    // If requesting /stream.mp3, proxy to your server
    if (url.pathname === '/stream.mp3') {
      const streamUrl = 'http://161.33.231.94:8000/stream.mp3';
      return fetch(streamUrl, {
        method: request.method,
        headers: request.headers,
      });
    }
    
    // For all other requests, serve from Cloudflare Pages
    return fetch(request);
  },
};
