import { defineNuxtPlugin } from "#app";
import InfiniteLoading from "v3-infinite-loading";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(InfiniteLoading);
});
