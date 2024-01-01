import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  // nitro: {
  //   preset: 'vercel-edge',
  // },
  modules: [
    '@nuxt/content',
    '@nuxtjs/device',
    "nuxt-vercel-analytics",
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
            autoImports: ['defineStore', 'acceptHMRUpdate', 'storeToRefs'],
        }
    ],
  ],
  // postcss: {
  //   plugins:{
  //     autoprefixer: {},
  //   }
  // },
  device: {
    refreshOnResize: true
  },
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
      NAME_APP: 'GOOSE'
    }
  },
  routeRules: {
    '/': { ssr: true },
    '/add': { ssr: false },
    '/delivery': { swr: true }
  },
  vite: {
    resolve: {
      alias: {
        ".prisma/client/index-browser": "./node_modules/.prisma/client/index-browser.js"
      }
    }
  },
  app: {
    pageTransition: { name: 'blur', mode: 'out-in' }
  },
});