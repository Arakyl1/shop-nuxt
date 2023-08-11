import { fileURLToPath } from 'node:url';
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  // nitro: {
  //   preset: 'vercel-edge',
  // },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    '@nuxtjs/device',
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
  postcss: {
    plugins:{
      tailwindcss: {},
      autoprefixer: {},
    }
  },
  device: {
    refreshOnResize: true
  },
  runtimeConfig: {
    cloudinaryName: process.env.CLOUDINARY__NAME,
    cloudinaryApiKey: process.env.CLOUDINARY__KEY,
    cloudinaryApiSecret: process.env.CLOUDINARY__SECRET,
    
    jwtAccessSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
    jwtRefrechSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
    redis: {
      host: '',
      port: 0,
    },
    public: {
      linkPhotoUserBase: 'https://res.cloudinary.com/dmxetw6p8/image/upload/v1675156698/upload-examples/w7xbdugi7bgqt0psz3kg.webp'
    }
  },
  routeRules: {
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
