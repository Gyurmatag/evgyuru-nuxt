<template>
  <div class="scroll-smooth dark:bg-gray-800">
    <NuxtLayout>
      <NuxtLoadingIndicator />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { useUserStore } from "~/stores/user";
import { useErrorStore } from "~/stores/error";

const nuxtApp = useNuxtApp();
const userStore = useUserStore();
const errorStore = useErrorStore();

nuxtApp.hook("page:start", () => {
  if (!errorStore.error) {
    errorStore.$reset();
  }
});

onMounted(() => {
  if (dayjs(new Date()).isAfter(userStore.user.accessTokenExpireDate)) {
    navigateTo({
      path: "/",
    });
    userStore.$reset();
  }
});
</script>
