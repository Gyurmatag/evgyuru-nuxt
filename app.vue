<template>
  <div class="scroll-smooth dark:bg-gray-800">
    <nuxt-loading ref="loading" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// TODO: ideiglenes megoldás, ameddig nincs benne natívban a Nuxt 3- ban meg amúgy miért kell ezt importálni??
import dayjs from "dayjs";
import NuxtLoading from "./components/common/animation/NuxtLoading.vue";
import { useUserStore } from "~/stores/user";

const nuxtApp = useNuxtApp();
const userStore = useUserStore();
const loading = ref(null);

nuxtApp.hook("page:start", () => {
  loading.value.start();
});

nuxtApp.hook("page:finish", () => {
  loading.value.finish();
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
