<template>
  <Icon
    v-if="!isDataLoading"
    class="cursor-pointer transition duration-300 ease-in-out hover:text-gray-600 dark:hover:text-gray-400"
    :class="{
      'origin-center rotate-180 transform transition duration-300':
        !isPanelOpen,
    }"
    name="mdi:chevron-up"
    @click="emit('expand')"
  />
  <common-icon-loading-spin v-else></common-icon-loading-spin>
</template>

<script setup lang="ts">
defineProps({
  isDataLoading: {
    type: Boolean,
    default: false,
  },
  isPanelOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits<{
  (e: "expand"): void;
}>();
</script>
