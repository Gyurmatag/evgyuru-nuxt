<template>
  <div class="flex justify-between">
    <div>{{ courseTitle }}</div>
    <common-expand-button
      :is-panel-open="reservationsPanelOpen"
      :is-data-loading="reservationsDataPending"
      @expand="expandCourse(courseId)"
    ></common-expand-button>
  </div>
  <common-transition-expand>
    <profile-moderator-reservations-table
      v-if="reservationsPanelOpen"
      :reservation-list="reservationListData"
    ></profile-moderator-reservations-table>
  </common-transition-expand>
</template>

<script setup lang="ts">
import { ReservationList } from "~/models/reservation";

defineProps({
  courseId: {
    type: String,
    default: null,
  },
  courseTitle: {
    type: String,
    default: null,
  },
});

const reservationListData = ref(null);
const reservationsPanelOpen = ref(false);
const reservationsDataPending = ref(false);

const expandCourse = async (courseId) => {
  if (reservationsPanelOpen.value === true) {
    reservationsPanelOpen.value = false;
  } else {
    reservationsDataPending.value = true;
    // TODO: error kezelés
    // TODO: beégetett paraméterek kivezetése
    // TODO: esetleg itt a data-t ki lehetne szervezni?
    const { data } = await useCustomFetch<ReservationList>({
      path: `${RESERVATION}/${RESERVATIONS}`,
      params: { courseId, limit: 5, currentPage: 1 },
      isAuthenticated: true,
    });

    reservationListData.value = data.value;
    reservationsDataPending.value = false;
    reservationsPanelOpen.value = true;
  }
};
</script>
