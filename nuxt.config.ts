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
      workbox: {
        enabled: true
      },
      icon: {
        source: 'assets/logo.png'
      },
      meta: {
        theme_color: '#685e6f'
      }
    }],
    ['@pinia/nuxt', {
            autoImports: ['defineStore', 'acceptHMRUpdate'],
        }
    ], 
  ],
  runtimeConfig: {
    cloudinaryName: process.env.CLOUDINARY__NAME,
    cloudinaryApiKey: process.env.CLOUDINARY__KEY,
    cloudinaryApiSecret: process.env.CLOUDINARY__SECRET,
    
    jwtAccessSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
    jwtRefrechSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
  },
});
