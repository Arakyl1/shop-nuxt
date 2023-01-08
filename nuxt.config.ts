import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  nitro: {
    preset: 'vercel-edge',
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    ['@pinia/nuxt', {
            autoImports: ['defineStore', 'acceptHMRUpdate'],
        }
    ], 
],
});
