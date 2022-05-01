<template>
  <div class="text-md space-y-4 text-gray-800 dark:text-gray-200">
    <div class="border-b-2 border-blue-600">
      {{ $t("profile.user.reservations.title") }}
    </div>
    <profile-user-empty-course-panel
      v-if="!userStore.user.reservations?.length"
    ></profile-user-empty-course-panel>
    <div
      v-for="reservation in userStore.user.reservations"
      :key="reservation._id"
      class="mt-4 w-1/4 rounded-md bg-blue-200 p-6 dark:bg-gray-700"
    >
      <profile-user-reservation-card
        :reservation-id="reservation._id"
        :course-title="reservation.course.title"
      ></profile-user-reservation-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/user";
import { ReservationList } from "~/models/reservation";

const userStore = useUserStore();

// TODO: error kezelés
const { data, refresh: refreshReservationListResponse } =
  await useCustomFetch<ReservationList>({
    path: `${RESERVATION}/${USER_RESERVATIONS}`,
    isAuthenticated: true,
  });

// TODO: Githubon választ várok hogy lehetne ezt szebben, csak a cached cuccokat törölni
await refreshReservationListResponse();
userStore.setReservations(data.value.reservations);
</script>
