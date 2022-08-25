<template>
  <div class="w-full space-y-2 rounded-md border border-2 p-5 text-center">
    <div class="text-sm italic text-gray-800 dark:text-gray-200">
      "{{ $t(reviewTextKey) }}"
    </div>
    <div class="text-gray-600 opacity-50 dark:text-gray-400">
      {{ $t(dateKey) }}
    </div>
    <div class="text-gray-600 opacity-90 dark:text-gray-400">
      {{ $t(parentNameKey) }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  reviewTextKey: {
    type: String,
    required: true,
  },
  dateKey: {
    type: String,
    required: true,
  },
  parentNameKey: {
    type: String,
    required: true,
  },
});
</script>
