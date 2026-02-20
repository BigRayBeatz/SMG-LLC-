// public/sw.js
const CACHE_NAME = 'smgpub-v2.0.0';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/dashboard.html',
  '/style.css',
  '/main.js',
  '/config.js',
  '/css/glass-ui.css',
  '/css/dashboard.css'
];

// Install Event: Caching the app shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activate Event: Cleaning up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// Fetch Event: Offline-first strategy for static assets
self.addEventListener('fetch', (event) => {
  // Only handle GET requests and skip API calls to ensure fresh royalty data
  if (event.request.method !== 'GET' || event.request.url.includes('/api/')) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
