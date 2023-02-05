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
    "nuxt-umami",
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
  umami: {
    enable: true, // enable the module? true by default
    autoTrack: true,
    doNotTrack: false,
    cache: false,
    domains: 'evgyuru.hu',
    websiteId: 'evgyuru',
    scriptUrl: 'https://evgyuru-analytics.netlify.app/umami.js',
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE,
      cloudinaryBaseUrl: process.env.CLOUDINARY_BASE_URL,
    },
  },
});
