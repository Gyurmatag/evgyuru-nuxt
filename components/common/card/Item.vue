<template>
  <div class="flex space-x-2 align-middle">
    <Icon class="text-gray-700 dark:text-gray-300" :name="iconName" />
    <span class="text-gray-600 dark:text-gray-400">{{ valueText }}</span>
  </div>
</template>

<script setup>
defineProps({
  iconName: {
    type: String,
    required: true,
  },
  valueText: {
    type: String,
    required: true,
  },
});
</script>
