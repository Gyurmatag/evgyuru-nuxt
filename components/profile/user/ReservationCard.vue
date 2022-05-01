<template>
  <div class="flex h-10 items-center justify-between">
    <div class="text-lg font-bold text-gray-800 dark:text-gray-200">
      {{ courseTitle }}
    </div>
    <common-transition-basic-transition>
      <span
        v-if="!isDeleteConfirmationMessageVisible"
        class="material-icons cursor-pointer text-3xl text-red-600 transition duration-300 ease-in-out hover:text-red-700"
        @click="isDeleteConfirmationMessageVisible = true"
      >
        cancel
      </span>
    </common-transition-basic-transition>
  </div>

  <common-transition-expand>
    <profile-user-delete-reservation-confirmation-panel
      v-if="isDeleteConfirmationMessageVisible"
      @cancel-delete-confirmation="isDeleteConfirmationMessageVisible = false"
      @delete-reservation="deleteReservation(reservationId)"
    ></profile-user-delete-reservation-confirmation-panel>
  </common-transition-expand>
</template>

<script setup lang="ts">
import { FetchMethods } from "~/models/enums";
import { useUserStore } from "~/stores/user";

const userStore = useUserStore();

const isDeleteConfirmationMessageVisible = ref(false);

defineProps({
  reservationId: {
    type: String,
    required: true,
  },
  courseTitle: {
    type: String,
    required: true,
  },
});

// TODO: error kezelés
const deleteReservation = async (reservationId) => {
  const { data } = await useCustomFetch({
    path: `${RESERVATION}/${reservationId}`,
    method: FetchMethods.DELETE,
    isAuthenticated: true,
  });

  if (data) {
    userStore.deleteReservation(reservationId);
  }
};
</script>
