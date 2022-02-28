<template>
  <div class="p-4 text-center">
    <div class="text-xl text-gray-800 dark:text-gray-200">
      {{ reasonTitle }}
    </div>
    <div class="text-gray-600 dark:text-gray-400">
      {{ reasonDescription }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  reasonTitle: {
    type: String,
    required: true,
  },
  reasonDescription: {
    type: String,
    required: true,
  },
});
</script>
