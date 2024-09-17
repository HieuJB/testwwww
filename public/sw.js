importScripts('https://cdn.jsdelivr.net/npm/workbox-cdn/workbox/workbox-sw.js')

self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', () => {
  self.clients.claim()
})

// Navigation route are handled by network first strategy
workbox.routing.registerRoute(
  ({ request }) => request.mode === 'navigate',
  new workbox.strategies.NetworkFirst({ cacheName: 'navigation' })
)

// CSS are handled by a Stale While Revalidate strategy
workbox.routing.registerRoute(
  ({ request }) => request.destination === 'style',
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'assets',
    plugins: [
      // Ensure that only requests that result in a 200 status are cached
      new workbox.cacheableResponse.CacheableResponse({
        statuses: [200]
      })
    ]
  })
)

// Images are handled with a Cache First strategy
workbox.routing.registerRoute(
  ({ request }) => request.destination === 'image',
  new workbox.strategies.CacheFirst({
    cacheName: 'images',
    plugins: [
      // Ensure that only requests that result in a 200 status are cached
      new workbox.cacheableResponse.CacheableResponse({
        statuses: [200]
      }),
      // Don't cache more than 50 items, and expire them after 30 days
      new workbox.expiration.CacheExpiration('images', {
        maxEntries: 50,
        maxAgeSeconds: 60 * 60 * 24 * 30 // 30 Days
      })
    ]
  })
)

// Function to show notification
const showNotification = () => {
  const currentTime = new Date().toLocaleTimeString();
  self.registration.showNotification('Thông báo', {
    body: `Thời gian hiện tại: ${currentTime}`,
    icon: '/logo_x32.png', // Đảm bảo icon tồn tại
  });
};

// Gửi thông báo mỗi 10 giây
setInterval(showNotification, 10000); // 10 giây