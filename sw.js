const CACHE_NAME = 'atrm-cache-v9';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './videos.html',
  './generador.html',
  './interiores.html',
  './tabla_salarial_2026.html',
  './salaries.html',
  './conceptos_2026.html',
  './tramites.html',
  './festivos.html',
  './css/preloader.css',
  './css/christmas.css',
  './css/videos.css',
  './css/generador.css',
  './css/notificaciones.css',
  './css/telegram_widget.css',
  './assets/calendarios/turnos-vacaciones-2026.jpeg',
  './js/preloader.js',
  './js/preloader-auto.js',
  './js/christmas-snow.js',
  './js/christmas-auto.js',
  './js/ia_mejorada.js',
  './js/notificaciones.js',
  './js/telegram_widget.js',
  './assets/pwa/logo.svg',
  './data/atrm_sindicato_data.json',
  './data/casos.json'
];

// Install event: Cache core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
  self.skipWaiting();
});

// Activate event: Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event: Network first, then cache (or Stale-While-Revalidate)
// For this use case, we'll use Stale-While-Revalidate for non-mutating requests
self.addEventListener('fetch', (event) => {
  // Ignorar requests que no sean http/https (extensiones de Chrome, etc.)
  if (!event.request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          // Update cache in background
          fetch(event.request).then((networkResponse) => {
            if(networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
               caches.open(CACHE_NAME).then((cache) => {
                 cache.put(event.request, networkResponse.clone());
               });
            }
          }).catch(() => {
             // Network failed, but we have cache
          });
          return response;
        }

        return fetch(event.request).then(
          (networkResponse) => {
            // Check if we received a valid response
            if(!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }

            // Clone the response
            const responseToCache = networkResponse.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return networkResponse;
          }
        );
      })
    );
});
