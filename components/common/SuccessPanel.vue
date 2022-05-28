<template>
  <div class="space-y-4">
    <common-icon-animated-check-mark
      svg-classes="md:h-24 lg:h-28 h-20"
    ></common-icon-animated-check-mark>
    <div class="text-gray-700 dark:text-gray-200">
      {{ $t(successMessageKey) }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  successMessageKey: {
    type: String,
    required: true,
  },
});
</script>
