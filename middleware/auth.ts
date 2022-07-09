import { useUserStore } from "~/stores/user";

export default defineNuxtRouteMiddleware((to) => {
  const userStore = useUserStore();

  if (userStore.user.accessToken) {
    // TODO: ezt megkérdezni, hogy miért csak így működik githubon?
    navigateTo(to);
    return;
  }
  return navigateTo("/");
});
