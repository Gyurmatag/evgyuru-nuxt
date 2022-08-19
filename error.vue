<template>
  <div class="scroll-smooth dark:bg-gray-800">
    <common-page-head
      :subtitle="error.satusCode === '404' ? 'error.404' : error.message"
    ></common-page-head>
    <NuxtLayout>
      <div v-if="error.statusCode === '404'">{{ $t("error.404") }}</div>
      <div v-else>{{ $t(error.message) }}</div>
      <button @click="handleError">{{ $t("error.backToHomePage") }}</button>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// TODO: type-osítás, default value adás
defineProps({
  error: Object,
});

const handleError = () => clearError({ redirect: "/" });
</script>
