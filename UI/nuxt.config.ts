import { defineNuxtConfig } from "nuxt/config";
// import { createResolver } from "@nuxt/kit";

// const { resolve } = createResolver(import.meta.url);
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const currentDir = dirname(fileURLToPath(import.meta.url));

export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ["@nuxtjs/svg-sprite"],
  css: ['normalize.css/normalize.css',"v-calendar/style.css", join(currentDir, "./assets/scss/main.scss")],
  //   css: ["./assets/css/main.css"],
  // alias: { '@': resolve('./') },

  //   components: [{ path: "@/components", prefix: "M" }],
  //   css: ['./assets/css/main.css'],
  // postcss: {
  //   plugins: {
  //     autoprefixer: {},
  //   },
  // },
  ssr: false,
  compatibilityDate: "2024-08-29",
});