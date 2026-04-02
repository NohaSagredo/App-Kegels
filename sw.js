const CACHE_NAME = 'kegel-flow-v7';
const urlsToCache = [
  './kegels.html',
  './manifest.json',
  './icon.svg',
  './css/styles.css',
  './js/app.js',
  'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap',
  'https://cdn.jsdelivr.net/npm/chart.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => cacheName !== CACHE_NAME)
          .map(cacheName => caches.delete(cacheName))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).then(response => {
        let resClone = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, resClone);
        });
        return response;
    }).catch(() => {
        return caches.match(event.request).then(res => {
            return res || caches.match('./kegels.html');
        });
    })
  );
});

// Push Notifications
self.addEventListener('push', event => {
  let data = { title: 'Kegel Flow', body: '¡Es tu momento zen! Toca aquí para entrenar.' };
  if (event.data) {
    try { data = event.data.json(); } catch(e) { data.body = event.data.text(); }
  }
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: './icon.svg',
      badge: './icon.svg',
      vibrate: [200, 100, 200],
      tag: 'kegel-reminder',
      renotify: true,
      actions: [
        { action: 'open', title: '🏋️ Entrenar' },
        { action: 'dismiss', title: 'Después' }
      ]
    })
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  if (event.action === 'dismiss') return;
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
      for (let client of windowClients) {
        if (client.url.includes('kegels.html') && 'focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow('./kegels.html');
    })
  );
});
