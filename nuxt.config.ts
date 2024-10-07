import { defineNuxtConfig } from "nuxt/config";
// const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

export default defineNuxtConfig({
  // routeRules: {
  //   // Cache time /api/** */
  //   // '/api/*': { cache: { maxAge: import.meta.env.NUXT_CACHE_TIME_DEFAULT ?? 20 } },
  //   // '/api/streamers': { cache: { maxAge: import.meta.env.NUXT_CACHE_TIME_LEVEL_2 ?? 20 } },
  // },
  routeRules: {
    // Homepage pre-rendered at build time
    // '/': { prerender: true },
    '/oapi/*': { cache: { maxAge: import.meta.env.NUXT_CACHE_TIME_DEFAULT ?? 20 } },
  },
  // router: {
  //   // Turns off prefetching (since the default is true)
  //   prefetchLinks: false
  // },
  // css: [
  //   '~/assets/css/main.scss',
  //   '~/assets/fonts/iconfont.css',
  // ],
  experimental: {
    defaults: {
      nuxtLink: {
        // default values
        componentName: 'NuxtLink',
        externalRelAttribute: 'noopener noreferrer',
        activeClass: 'router-link-active',
        exactActiveClass: 'router-link-exact-active',
        prefetchedClass: undefined, // can be any valid string class name
        trailingSlash: undefined // can be 'append' or 'remove'
      }
    }
  },
  devtools: { 
    enabled: false,
    timeline: {
      enabled: true,
    },
  },
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      // script: [
      //   {
      //     src: "https://stats.ultraffic.info/js/script.js?ver=1.0.1",
      //     type: "text/javascript",
      //     defer: true
      //   },
      // ],
    },
  },
  modules: [
    'nuxt-snackbar', // '@nuxtjs/sitemap',
    'nuxt-purgecss',
    '@pinia/nuxt', '~/modules/redirects',  "@nuxtjs/seo", "@nuxt/image",
    // '@nuxtjs/i18n',
  ],
  pinia: {
    autoImports: ['defineStore'],  // Chỉ nạp những gì cần thiết
  },
  device: {
    enabled: true,
    refreshOnResize: true
  },
  snackbar: {
    bottom: true,
    right: true,
    duration: 5000
  },
 
  runtimeConfig: {
    apiBaseUrl: import.meta.env.NUXT_API_BASE_URL ?? 'https://bdl-api-dev.scl-dev.com',
    brandCode: import.meta.env.NUXT_BRAND_CODE ?? '19006505',
    apiLivescore: import.meta.env.NUXT_API_LIVESCORE ?? 'https://api.sportdb.live',
    public: {
      wssUri: import.meta.env.NUXT_WSS_ENCODE_URI,
      wssEncodeUri: import.meta.env.NUXT_WSS_ENCODE_URI ?? 'wss://ws-public-dev.sportdb.live/ws',
      brandCode: import.meta.env.NUXT_BRAND_CODE ?? '19006505',
      isEncodeChat: import.meta.env.NUXT_IS_ENCODE_CHAT ?? true,
      liveScoreImage: import.meta.env.NUXT_API_URL_MEDIA_LIVESCORE ?? 'https://img.sportdb.live/livescore-img',
    },
  },
  build: {
    //  transpile: [ 'vue3-emoji-picker' ] 
  },
  ssr: true,
  devServer: {
    port: 3000
  },
  // imports: {
  //   autoImport: false
  // },
  vue: {  
    compilerOptions: {
      isCustomElement: (tag) => ['font'].includes(tag),
    },
  },
  // nitro: {
  //   prerender: {
  //     crawlLinks: true,
  //     routes: ['/robots.txt']
  //   },
  //   // experimental: {
  //   //   tasks: true
  //   // },
  //   // scheduledTasks: {
  //   //   // Run `sync:sitemap` task every minute
  //   //   '* * * * *': ['sync:sitemap']
  //   // }
  // }
  nitro: {
    routeRules: {
      "/img/**": { headers: { 'cache-control': `public,max-age=1296000,s-maxage=1296000` } },
      "/_nuxt/**": { headers: { 'cache-control': `public,max-age=1296000,s-maxage=1296000` } },
    }
  },
  ogImage: {
    enabled: true,
    defaults: {
      cacheMaxAgeSeconds: 60 * 60 * 24 * 7 * 1000 // 7 days
    }
  },
  sitemap: {
    enabled: false
  },
  robots: {
    enabled: false
  },
  seoExperiments: {
    enabled: true
  },
  schemaOrg: {
    enabled: false
  },
  // linkChecker: {
  //   enabled: true
  // },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/css/_global.scss" as *;'
        }
      }
    },
    server: {
      hmr: {
          clientPort: 3000
      }
    }
  },
  components: true,
  render: {
    bundleRenderer: {
      shouldPrefetch: () => false,
      shouldPreload: () => false,
    },
  },
  purgeCSS: {
    enabled: true,
    paths: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
    ],
    styleExtensions: ['.css'],
    whitelist: ['body', 'html', 'nuxt-progress'],
    extractors: [
      {
        extractor: content => content.match(/[A-z0-9-:\\/]+/g) || [],
        extensions: ['html', 'vue', 'js']
      }
    ]
   }
  // delayHydration: {
  //   mode: 'init'
  // },
  // critters: {
  //   // Options passed directly to critters: https://github.com/GoogleChromeLabs/critters#critters-2
  //   config: {
  //     // Default: 'media'
  //     preload: 'swap',
  //   },
  // },
  // lazyLoad: {
  //   // These are the default values
  //   images: true,
  //   videos: true,
  //   audios: true,
  //   iframes: true,
  //   native: false,
  //   directiveOnly: false,
    
  //   // To remove class set value to false
  //   loadingClass: 'isLoading',
  //   loadedClass: 'isLoaded',
  //   appendClass: 'lazyLoad',
    
  //   observerConfig: {
  //     // See IntersectionObserver documentation
  //   }
  // }
  
});