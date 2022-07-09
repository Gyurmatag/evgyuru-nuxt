import { useUserStore } from "~/stores/user";
import { Roles } from "~/models/enums";

export default defineNuxtRouteMiddleware((to) => {
  const userStore = useUserStore();

  if (userStore.user.roles.includes(Roles.Moderator)) {
    navigateTo(to);
    return;
  }
  return navigateTo("/");
});
