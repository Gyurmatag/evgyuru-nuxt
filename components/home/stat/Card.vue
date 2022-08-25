<template>
  <div class="space-y-2 p-5 text-center">
    <div class="text-5xl font-bold text-blue-700 dark:text-blue-400">
      {{ number }}
    </div>
    <div class="text-gray-600 dark:text-gray-300">
      {{ $t(numberText) }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  number: {
    type: Number,
    required: true,
  },
  numberText: {
    type: String,
    required: true,
  },
});
</script>
