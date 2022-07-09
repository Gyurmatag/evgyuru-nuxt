import { useUserStore } from "~/stores/user";

export default defineNuxtRouteMiddleware((to) => {
  const userStore = useUserStore();

  if (!userStore.user.accessToken) {
    navigateTo(to);
    return;
  }
  return navigateTo("/");
});
