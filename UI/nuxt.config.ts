import { defineNuxtConfig } from "nuxt/config";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const currentDir = dirname(fileURLToPath(import.meta.url));

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    join(currentDir, './node_modules/@nuxtjs/tailwindcss')
  ],
//'@nuxtjs/stylelint-module'
  css: [join(currentDir, "./assets/css/style.scss"), "v-calendar/style.css"],
  ssr: true,
  tailwindcss: {
    cssPath: [join(currentDir, './assets/css/tailwind.css'), { injectPosition: "first" }],
    configPath: join(currentDir, './tailwind.config.ts'),
    exposeConfig: true,
    
    config: {},
    viewer: true,
  }
});