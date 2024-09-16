import { defineNuxtConfig } from 'nuxt/config'

const isDevelopment = process.env.NODE_ENV === 'development';
export default defineNuxtConfig({
  // nitro: {
  //   preset: 'vercel-edge',
  // },
  extends: [['./UI', { install: true }]],

  modules: [
    ...(isDevelopment ? ['@nuxt/eslint'] : []),
    '@nuxt/content',
    // '@nuxtjs/web-vitals',
    // "nuxt-vercel-analytics",
    '@nuxtjs/svg-sprite',
    // '@nuxtjs/device',
    'nuxt-viewport',
    ['@kevinmarrec/nuxt-pwa', {
      icon: {
        source: 'assets/logo.png'
      },
      meta: {
        theme_color: '#685e6f'
      }
    }],
    ['@pinia/nuxt', {
          autoImports: ['defineStore', 'storeToRefs'],
      }
    ]
  ],

  components: [{ path: "./UI/components", prefix: "UIT" }, { path: './components', prefix: '' }],

  runtimeConfig: {
    cloudinaryName: process.env.CLOUDINARY__NAME,
    cloudinaryApiKey: process.env.CLOUDINARY__KEY,
    cloudinaryApiSecret: process.env.CLOUDINARY__SECRET,
    
    jwtAccessSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
    jwtRefrechSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
    supabase_public_key: process.env.SUPABASE_PUBLIC_KEY,
    redis: {
      host: '',
      port: 0,
    },
    public: {
      linkPhotoUserBase: 'https://res.cloudinary.com/dmxetw6p8/image/upload/v1675156698/upload-examples/w7xbdugi7bgqt0psz3kg.webp',
      emptyImage: '/img/webp/base/empty_photo.webp',
      NAME_APP: 'GOOSE',
    }
  },

  routeRules: {
    '/': { 'swr': 3600 },
    '/contact': { swr: 3600 },
    '/catalog': { swr: 3600 },
    '/catalog/**': { swr: 3600 },
    '/delivery': {  ssr: true },
    '/user': { ssr: false, redirect: { to: '/user/main' } },
    '/user/**': { ssr: false },
    '/auth': { ssr: false },
    '/add': { ssr: false },
    '/ui': { ssr: false },
    '/admin/**': { ssr: false },
  },

  vite: {
    resolve: {
      alias: {
        ".prisma/client/index-browser": "./node_modules/.prisma/client/index-browser.js"
      }
    },
    customLogger: undefined,
  },

  css: [],
  logLevel: 'silent',

  // postcss: {
  //   'plugins': {
  //     "autoprefixer": {},
  //     tailwindcss: {},
  //   },
  // },

  app: {
    pageTransition: { name: 'blur', mode: 'out-in' },
  },

  viewport: {
    breakpoints: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536,
    },

    defaultBreakpoints: {
      desktop: 'lg',
      mobile: 'xs',
      tablet: 'md',
    },

    fallbackBreakpoint: 'lg'
  },

  spaLoadingTemplate: false,
  devtools: { enabled: true },

  // eslint: {
  //   checker: true // <---
  // },
  // webVitals: {
  //   provider: 'log',
  //   debug: true, // debug enable metrics reporting on dev environments
  //   disabled: false
  // }
  ignore: ['./pages/admin', './pages/catalog', './pages/user'],

  compatibilityDate: '2024-09-16'
});

// const viewport = useViewport() v-if="viewport.isGreaterOrEquals('sm')"