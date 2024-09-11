const CACHE_NAME = 'vue-pwa-cache-v1';
const urlsToCache = [
  '/',
  '/home',
  '/login',
  '/signup',
  '/forget-password',
  '/notifications',
  '/newform',
  '/list',
  '/showform',
  '/about'
];


self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event: serve cached content if available, else fetch from the network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // If a match is found in the cache, return it
      if (response) {
        return response;
      }
      // If not in cache, try fetching it from the network
      return fetch(event.request).then((networkResponse) => {
        // Optionally cache the new request for future use
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
    })
  );
});

// Activate event: clear old caches if necessary
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
