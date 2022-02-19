import { defineNuxtPlugin } from "#app";
import VouSocialSharing from "vue-social-sharing";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VouSocialSharing);
});
