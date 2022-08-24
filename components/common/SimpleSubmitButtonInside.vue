<template>
  <span class="flex">
    {{ $t(submitButtonText) }}
    <common-icon-loading-spin
      v-if="isSubmitting"
      class="ml-2"
    ></common-icon-loading-spin>
  </span>
</template>

<script setup lang="ts">
const props = defineProps({
  isSubmitting: {
    type: Boolean,
    required: true,
  },
});
const submitButtonText = computed(() => {
  return props.isSubmitting ? "common.wait" : "common.go";
});
</script>
