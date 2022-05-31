<template>
  <div class="flex flex-col space-y-4 text-sm text-gray-700 dark:text-gray-300">
    <div>{{ $t(confirmationMsgKey) }}</div>
    <div class="flex space-x-2">
      <button
        class="rounded-md bg-red-500 p-2 text-gray-200 transition duration-300 ease-in-out hover:bg-red-600"
        @click="emit('delete')"
      >
        {{ $t("common.yes") }}
      </button>
      <button
        class="rounded-md border border-blue-400 p-2 transition duration-300 ease-in-out hover:bg-blue-300 dark:hover:bg-gray-600"
        @click="emit('cancelDelete')"
      >
        {{ $t("common.cancel") }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  confirmationMsgKey: {
    type: String,
    default: "common.deleteConfirm",
  },
});

const emit = defineEmits<{
  (e: "delete"): void;
  (e: "cancelDelete"): void;
}>();
</script>
