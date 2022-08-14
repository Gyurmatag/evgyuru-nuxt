<template>
  <div class="flex justify-between">
    <div>
      {{ courseTitle }}
      <span v-if="wasDeleteSuccessful" class="text-xs text-red-600">
        {{ $t("profile.moderator.courses.delete.courseDeleted") }}
      </span>
    </div>
    <common-expand-button
      :is-panel-open="courseDetailPanelOpened"
      :is-data-loading="reservationsDataPending"
      @expand="expandCourse(courseId)"
    ></common-expand-button>
  </div>
  <common-transition-expand>
    <!-- TODO: kiszervezni a komponenseket --->
    <div v-if="courseDetailPanelOpened">
      <div class="space-x-2">
        <span
          v-if="!wasDeleteSuccessful"
          class="material-icons-outlined cursor-pointer text-3xl text-gray-500 transition duration-300 ease-in-out hover:text-red-700 dark:text-gray-400 dark:hover:text-red-700"
          @click="
            isDeleteConfirmationMessageVisible =
              !isDeleteConfirmationMessageVisible
          "
        >
          delete
        </span>
        <nuxt-link
          class="material-icons-outlined cursor-pointer text-3xl text-gray-500 transition duration-300 ease-in-out hover:text-orange-700 dark:text-gray-400 dark:hover:text-orange-700"
          :to="{ name: 'profile-course-edit-courseId', params: { courseId } }"
        >
          edit
        </nuxt-link>
      </div>
      <common-transition-expand>
        <div v-if="isDeleteConfirmationMessageVisible">
          <!-- TODO: esetlegesen v-model bevezetése @cancel-delete-nél -->
          <common-delete-confirmation-panel
            confirmation-msg-key="profile.moderator.courses.delete.confirmation"
            @cancel-delete="isDeleteConfirmationMessageVisible = false"
            @delete="deleteCourse(courseId)"
          ></common-delete-confirmation-panel>
        </div>
      </common-transition-expand>
      <profile-moderator-reservations-table
        :reservation-list="reservationListData"
      ></profile-moderator-reservations-table>
    </div>
  </common-transition-expand>
</template>

<script setup lang="ts">
import {
  Reservation,
  ReservationListBasicResponse,
} from "~/models/reservation";
import { FetchMethods } from "~/models/enums";

const isDeleteConfirmationMessageVisible = ref(false);
const wasDeleteSuccessful = ref(false);

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

const reservationListData = ref<[Reservation]>(null);
const courseDetailPanelOpened = ref(false);
const reservationsDataPending = ref(false);

const expandCourse = async (courseId) => {
  if (courseDetailPanelOpened.value === true) {
    courseDetailPanelOpened.value = false;
  } else {
    reservationsDataPending.value = true;
    // TODO: error kezelés
    // TODO: esetleg itt a data-t ki lehetne szervezni?
    const { data } = await useCustomFetch<ReservationListBasicResponse>({
      path: `${RESERVATION}/${RESERVATIONS}`,
      params: { courseId, limit: 0, currentPage: 0 },
      isAuthenticated: true,
    });

    reservationListData.value = data.value.reservations;
    reservationsDataPending.value = false;
    courseDetailPanelOpened.value = true;
  }
};

// TODO: error kezelés
const deleteCourse = async (courseId: string) => {
  const { data } = await useCustomFetch({
    path: `${COURSE}/${courseId}`,
    method: FetchMethods.DELETE,
    isAuthenticated: true,
  });

  if (data) {
    isDeleteConfirmationMessageVisible.value = false;
    wasDeleteSuccessful.value = true;
    courseDetailPanelOpened.value = false;
  }
};
</script>
