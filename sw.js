const CACHE_NAME = 'rafasell-360-v1';

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    self.clients.claim()
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response.ok && response.type === 'basic') {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, copy);
          });
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
