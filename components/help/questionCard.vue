<template>
  <div class="flex flex-col rounded-md bg-blue-200 p-4 dark:bg-gray-700">
    <div
      class="flex cursor-pointer justify-between"
      @click="questionOpened = !questionOpened"
    >
      <p class="text-gray-800 dark:text-gray-200">
        {{ question }}
      </p>
      <common-expand-button
        class="hidden md:block"
        :is-panel-open="questionOpened"
      ></common-expand-button>
    </div>
    <common-transition-expand>
      <div v-if="questionOpened">
        <p class="mt-2 text-sm text-gray-700 dark:text-gray-400">
          {{ answer }}
        </p>
      </div>
    </common-transition-expand>
  </div>
</template>

<script setup lang="ts">
const questionOpened = ref(false);

defineProps({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});
</script>
