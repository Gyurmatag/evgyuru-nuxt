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
    <common-delete-confirmation-panel
      v-if="isDeleteConfirmationMessageVisible"
      confirmation-msg-key="profile.user.reservations.deleteConfirm"
      @cancel-delete="isDeleteConfirmationMessageVisible = false"
      @delete="deleteReservation(reservationId)"
    ></common-delete-confirmation-panel>
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
const deleteReservation = async (reservationId: string) => {
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
