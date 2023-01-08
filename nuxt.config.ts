import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  // nitro: {
  //   preset: 'vercel-edge',
  // },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    ['@pinia/nuxt', {
            autoImports: ['defineStore', 'acceptHMRUpdate'],
        }
    ], 
  ],
  runtimeConfig: {
    // cloudinaryName: process.env.CLOUDINARY__NAME,
    // cloudinaryApiKey: process.env.CLOUDINARY__KEY,
    // cloudinaryApiSecret: process.env.CLOUDINARY__SECRET,
    
    jwtAccessSecret: 'access_secter_token',
    jwtRefrechSecret: 'refrech_secter_token',
  }
});
