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
    // You'll need to replace this with your actual Pages URL
    const pagesUrl = new URL(request.url);
    pagesUrl.hostname = 'welcome-audio-stream.pages.dev'; // Replace with your actual Pages domain
    
    return fetch(pagesUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body,
    });
  },
};
