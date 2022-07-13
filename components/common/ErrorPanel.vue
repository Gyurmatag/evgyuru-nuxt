<template>
  <div class="space-y-4">
    <common-icon-animated-error-mark
      svg-classes="md:h-24 lg:h-28 h-20"
    ></common-icon-animated-error-mark>
    <div class="text-gray-700 dark:text-gray-200">
      {{ $t(errorMessageKey) }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  errorMessageKey: {
    type: String,
    required: true,
  },
});
</script>
