<template>
  <div class="text-md space-y-4">
    <div class="border-b-2 border-blue-600 text-gray-800 dark:text-gray-200">
      {{ $t("profile.user.reservations.title") }}
    </div>
    <div>
      <form @submit="onSubmit" @change="formOnChange">
        <common-custom-radio-button
          name="filterDateFromAfterToday"
          first-radio-label-key="profile.user.reservations.filter.activeReservations"
          second-radio-label-key="profile.user.reservations.filter.pastReservations"
        ></common-custom-radio-button>
      </form>
    </div>
    <profile-user-empty-course-panel
      v-if="!reservationsListResponse.reservations[0]?.totalCount[0]?.count"
    ></profile-user-empty-course-panel>
    <div
      v-for="reservation in reservationsListResponse.reservations[0]
        .paginatedResults"
      :key="reservation._id"
      class="mt-4 rounded-md bg-blue-200 p-6 dark:bg-gray-700"
    >
      <profile-user-reservation-card
        :reservation-id="reservation._id"
        :course-id="reservation.course._id"
        :course-title="reservation.course.title"
        :course-date-interval="
          $dateIntervalFormat(
            reservation.course.dateFrom,
            reservation.course.dateTo
          )
        "
        :course-image-url="reservation.course.imageUrl"
        :children="reservation.children"
        @delete-reservation="reservationDeleted"
      ></profile-user-reservation-card>
    </div>
    <div class="flex justify-center">
      <button
        v-if="
          reservationsListResponse.length > 0 &&
          reservationsListResponse.length !== data.totalItems
        "
        class="rounded-md bg-gray-200 p-4 transition duration-300 ease-in-out hover:bg-gray-300 dark:bg-gray-200 dark:hover:bg-gray-300"
        @click="loadNextPage"
      >
        {{ $t("profile.user.reservations.loadMore") }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import {
  ReservationFilter,
  ReservationListResponse,
} from "~/models/reservation";
import { useUserStore } from "~/stores/user";

const userStore = useUserStore();

const reservationFilterFormData = ref<ReservationFilter>(null);
const currentPage = ref(1);
const limit = 5;
const reservationsListResponse = ref<ReservationListResponse>(null);

const { handleSubmit } = useForm({});

const formOnChange = () => {
  onSubmit();
};

const onSubmit = handleSubmit(async (values) => {
  reservationFilterFormData.value = {
    ...reservationFilterFormData.value,
    ...values,
  };
  await refresh();
  reservationsListResponse.value = data.value;
});

const { API_BASE: baseURL } = useRuntimeConfig();
// TODO: error kezelés
// TODO: ideiglenes megoldás, refresh nem működik a custom methodd-al, Githubon kell majd problémát jelezni
// TODO: params-ban nem működik a reaktivitás (currentPage.value)
// TODO: szép töltési allapot kezelés impelementálása
const { data, refresh } = await useFetch<ReservationListResponse>(
  () =>
    `${RESERVATION}/${USER_RESERVATIONS}?page=${currentPage.value}&filterDateFromAfterToday=${reservationFilterFormData.value?.filterDateFromAfterToday}`,
  {
    headers: {
      "x-access-token": userStore.user.accessToken,
    },
    params: { limit },
    baseURL,
    initialCache: false,
  }
);

reservationsListResponse.value = data.value;

const loadNextPage = async () => {
  currentPage.value++;
  await refresh();
  reservationsListResponse.value.reservations[0].paginatedResults.push(
    ...data.value.reservations[0].paginatedResults
  );
};

const reservationDeleted = async (deletedReservationId: string) => {
  await refresh();
  reservationsListResponse.value.reservations[0].totalCount[0] =
    data.value.reservations[0].totalCount[0];
  // TODO: valamiért nem jó a typeolás, miért?
  reservationsListResponse.value.reservations[0].paginatedResults =
    reservationsListResponse.value.reservations[0].paginatedResults.filter(
      (reservation) => reservation._id !== deletedReservationId
    );
};
</script>
