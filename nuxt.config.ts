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
  device: {
    refreshOnResize: true
  },
  runtimeConfig: {
    cloudinaryName: process.env.CLOUDINARY__NAME,
    cloudinaryApiKey: process.env.CLOUDINARY__KEY,
    cloudinaryApiSecret: process.env.CLOUDINARY__SECRET,
    
    jwtAccessSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
    jwtRefrechSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
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
  }
});
