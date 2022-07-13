<template>
  <div
    class="flex flex-col items-center space-y-4 rounded-md border border-blue-400 p-2 text-sm text-gray-800 opacity-80 dark:text-gray-300"
  >
    <slot></slot>
    <div>
      {{ $t(hintKey) }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  hintKey: {
    type: String,
    required: true,
  },
});
</script>
