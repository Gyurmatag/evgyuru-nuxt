import { useUserStore } from "~/stores/user";

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();

  console.log(userStore.user.accessToken);

  if (userStore.user.accessToken) {
    // TODO: ezt megkérdezni, hogy miért csak így működik githubon?
    console.log(to);
    return;
  }
  return abortNavigation("error.notAuthenticatedOrAuthorized");
});
