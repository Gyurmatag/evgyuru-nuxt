import { defineNuxtConfig } from "nuxt3";
import { I18nOptions } from "vue-i18n";

declare module "@nuxt/schema" {
  export interface NuxtConfig {
    intlify?: IntlifyModuleOptions;
  }
}

export interface IntlifyModuleOptions {
  vueI18n?: I18nOptions | string;
  localeDir?: string;
}

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  buildModules: ["@intlify/nuxt3"],
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
