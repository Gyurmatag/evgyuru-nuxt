<template>
  <div
    class="flex flex-col items-center justify-center bg-blue-100 bg-opacity-10 dark:bg-gray-800"
  >
    <div
      v-if="!pending"
      class="m-8 max-w-6xl items-center justify-center rounded-lg bg-white p-4 text-center shadow-xl dark:border-gray-500 dark:bg-gray-700 sm:w-3/4 lg:w-2/5"
    >
      <common-error-panel
        v-if="error"
        :error-message-key="errorMessageKey"
      ></common-error-panel>
      <div v-else>
        <common-success-panel
          :success-message-key="successMessageKey"
        ></common-success-panel>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  pending: {
    type: Boolean,
    required: true,
  },
  error: {
    type: Boolean,
    required: true,
  },
  errorMessageKey: {
    type: String,
    required: true,
  },
  successMessageKey: {
    type: String,
    required: true,
  },
});
</script>
