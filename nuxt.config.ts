import { VitePWA } from 'vite-plugin-pwa'

export default defineNuxtConfig({
  modules: ['@vite-pwa/nuxt'],
  pwa: {
    manifest: {
      name: 'My PWA App',
      short_name: 'PWA',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      display: 'standalone',
      start_url: '/',
      icons: [
        {
          src: '/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    workbox: {
      cleanupOutdatedCaches: true, // Dọn dẹp cache cũ
      clientsClaim: true, // Lấy quyền kiểm soát tất cả các tab
      skipWaiting: true // Kích hoạt ngay lập tức khi Service Worker mới được cài đặt
    }
  },
  head: {
    link: [
      { rel: 'manifest', href: '/manifest.webmanifest' } // Đảm bảo manifest được liên kết trong <head>
    ]
  }
})
