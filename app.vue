<template>
  <div class="scroll-smooth dark:bg-gray-800">
    <nuxt-loading ref="loading" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
// TODO: ideiglenes megoldás, ameddig nincs benne natívban a Nuxt 3- ban meg amúgy miért kell ezt importálni??
import NuxtLoading from "./components/common/NuxtLoading";

const loading = ref(null);
const nuxtApp = useNuxtApp();

nuxtApp.hook("page:start", () => {
  loading.value.start();
});

nuxtApp.hook("page:finish", () => {
  loading.value.finish();
});
</script>
