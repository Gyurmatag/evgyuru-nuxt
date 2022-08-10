import { defineNuxtConfig } from "nuxt";

export default defineNuxtConfig({
  buildModules: ["@intlify/nuxt3", "@pinia/nuxt"],
  modules: ["@nuxtjs/color-mode"],
  intlify: {
    localeDir: "locales",
    vueI18n: {
      locale: "hu",
    },
  },
  css: ["@/assets/styles/main.css"],
  colorMode: {
    classSuffix: "",
  },
  build: {
    transpile: ["pinia"],
    postcss: {
      postcssOptions: require("./postcss.config.js"),
    },
  },
  publicRuntimeConfig: {
    API_BASE: process.env.API_BASE,
  },
  meta: {
    link: [
      {
        href: "https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined",
        rel: "stylesheet",
      },
    ],
  },
});
