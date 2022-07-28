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
import { useResponseStore } from "~/stores/response";

const nuxtApp = useNuxtApp();
const userStore = useUserStore();
const responseStore = useResponseStore();

nuxtApp.hook("page:start", () => {
  if (responseStore.response) {
    responseStore.$reset();
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
