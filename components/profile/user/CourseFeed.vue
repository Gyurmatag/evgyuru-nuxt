<template>
  <div class="text-md space-y-4 text-gray-800 dark:text-gray-200">
    <div class="border-b-2 border-blue-600">
      {{ $t("profile.user.reservations.title") }}
    </div>
    <profile-user-empty-course-panel
      v-if="!reservations?.length"
    ></profile-user-empty-course-panel>
    <div
      v-for="reservation in reservations"
      :key="reservation._id"
      class="mt-4 rounded-md bg-blue-200 p-6 dark:bg-gray-700"
    >
      <profile-user-reservation-card
        :reservation-id="reservation._id"
        :course-title="reservation.course.title"
        :course-date-interval="
          $dateIntervalFormat(
            reservation.course.dateFrom,
            reservation.course.dateTo
          )
        "
        :course-image-url="reservation.course.imageUrl"
        :children="reservation.children"
      ></profile-user-reservation-card>
    </div>
    <div class="flex justify-center">
      <button
        v-if="reservations.length !== data.totalItems"
        class="rounded-md bg-gray-200 p-4 transition duration-300 ease-in-out hover:bg-gray-300 dark:bg-gray-200 dark:hover:bg-gray-300"
        @click="loadNextPage"
      >
        {{ $t("profile.user.reservations.loadMore") }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Reservation, ReservationList } from "~/models/reservation";
import { useUserStore } from "~/stores/user";

const userStore = useUserStore();

const currentPage = ref(1);
const limit = 5;
const reservations = ref<Reservation[]>([]);

// TODO: error kezelés
const { API_BASE: baseURL } = useRuntimeConfig();
// TODO: ideiglenes megoldás, refresh nem működik a custom methodd-al, Githubon kell majd problémát jelezni
// TODO: params-ban nem működik a reaktivitás (currentPage.value)
// TODO: szép töltési allapot kezelés impelementálása
const { data, refresh } = await useFetch<ReservationList>(
  () => `${RESERVATION}/${USER_RESERVATIONS}?page=${currentPage.value}`,
  {
    headers: {
      "x-access-token": userStore.user.accessToken,
    },
    params: { limit },
    baseURL,
    initialCache: false,
  }
);

reservations.value = [...data.value.reservations];

const loadNextPage = async () => {
  currentPage.value++;
  await refresh();
  reservations.value.push(...data.value.reservations);
};
</script>
