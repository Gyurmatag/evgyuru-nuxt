<template>
  <div class="scroll-smooth dark:bg-gray-800">
    <common-page-head
      :subtitle="error.statusCode === '404' ? 'error.404' : error.message"
    ></common-page-head>
    <NuxtLayout>
      <div class="flex flex-col items-center text-gray-800 dark:text-gray-200">
        <div class="my-8 flex max-w-6xl flex-col space-y-4">
          <div class="text-center text-5xl">:(</div>
          <div v-if="error.statusCode === '404'" class="text-center">
            {{ $t("error.404") }}
          </div>
          <div v-else>{{ $t(error.message) }}</div>
          <button
            class="rounded-md border border-blue-400 p-2 transition duration-300 ease-in-out hover:bg-gray-50 dark:hover:bg-gray-600"
            @click="handleError"
          >
            {{ $t("error.backToHomePage") }}
          </button>
        </div>
      </div>
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
