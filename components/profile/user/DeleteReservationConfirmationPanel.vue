<template>
  <div class="flex flex-col space-y-4 text-sm text-gray-700 dark:text-gray-300">
    <div>{{ $t("profile.user.reservations.deleteConfirm") }}</div>
    <div class="flex justify-between">
      <button
        class="rounded-md bg-red-500 p-2 text-gray-200 transition duration-300 ease-in-out hover:bg-red-600"
        @click="emit('deleteReservation')"
      >
        {{ $t("common.yes") }}
      </button>
      <button
        class="rounded-md border border-blue-400 p-2 transition duration-300 ease-in-out hover:bg-blue-300 dark:hover:bg-gray-600"
        @click="isDeleteConfirmationMessageVisible = false"
      >
        {{ $t("common.cancel") }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const isDeleteConfirmationMessageVisible = useState<boolean>(
  "isDeleteConfirmationMessageVisible"
);
const emit = defineEmits<{
  (e: "deleteReservation"): void;
}>();
</script>
