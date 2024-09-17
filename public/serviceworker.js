const CACHE_NAME = 'my-pwa-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  // Nếu bạn không có icon, có thể bỏ qua
  // '/icons/icon-192x192.png',
  // '/icons/icon-512x512.png'
];

// Cài đặt Service Worker và cache các tài nguyên tĩnh
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache).then(() => {
        console.log('All resources cached successfully!');
      }).catch(error => {
        console.error('Failed to cache some resources:', error);
        urlsToCache.forEach(async url => {
          try {
            const response = await fetch(url);
            if (!response.ok) {
              console.error(`Failed to fetch and cache ${url}:`, response.status);
            }
          } catch (err) {
            console.error(`Failed to fetch ${url}:`, err.message);
          }
        });
      });
    })
  );
});

// Kích hoạt Service Worker và xóa bộ nhớ cache cũ nếu có
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Lắng nghe các yêu cầu và trả về tài nguyên từ bộ nhớ cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;  // Trả về tài nguyên từ cache nếu có
        }
        return fetch(event.request);  // Nếu không, yêu cầu từ server
      })
  );
});

// Lắng nghe thông báo đẩy
self.addEventListener('push', function(event) {
  const data = event.data.json();
  const options = {
    body: data.body,
    data: {
      url: data.url
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Mở URL khi người dùng nhấp vào thông báo
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  const url = event.notification.data.url || '/';  // Nếu không có URL, mở trang chủ
  event.waitUntil(
    clients.openWindow(url)
  );
});
