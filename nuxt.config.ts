export default defineNuxtConfig({
  modules: [
    "@nuxtjs/color-mode",
    "@vueuse/nuxt",
    "@nuxt/content",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/i18n",
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    "@nuxt/image-edge",
  ],
  i18n: {
    langDir: "locales/",
    defaultLocale: "hu",
    locales: [
      {
        code: "hu",
        name: "Hungarian",
        iso: "hu-HU",
        file: "hu.json",
        momentLocale: "hu",
      },
    ],
    vueI18n: {
      legacy: false,
      locale: "hu",
    },
  },
  image: {
    cloudinary: {
      baseURL: process.env.CLOUDINARY_BASE_URL,
      modifiers: {
        width: "600",
      },
    },
  },
  css: ["@/assets/styles/main.css"],
  colorMode: {
    classSuffix: "",
  },
  build: {
    transpile: ["pinia"],
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE,
      cloudinaryBaseUrl: process.env.CLOUDINARY_BASE_URL,
    },
  },
});
