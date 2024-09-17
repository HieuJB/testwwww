export default defineNuxtConfig({
  buildModules: [
    '@nuxtjs/pwa',
  ],
  pwa: {
    manifest: {
      name: 'My PWA App',
      short_name: 'PWA',
      theme_color: '#ffffff',
    },
    workbox: {
      enabled: true, // Bật workbox
    },
  },
})
