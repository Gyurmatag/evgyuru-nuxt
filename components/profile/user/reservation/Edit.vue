<template>
  <div
    class="flex flex-col items-center justify-center bg-blue-100 bg-opacity-10 dark:bg-gray-800"
  >
    <common-page-head
      :subtitle="'page.title.editReservation'"
    ></common-page-head>
    <div
      class="relative m-4 max-w-6xl items-center justify-center space-y-4 rounded-lg bg-white p-4 text-center shadow-xl dark:border-gray-500 dark:bg-gray-700 sm:w-3/4 md:m-8 lg:w-2/5"
    >
      <div
        v-if="
          responseStore.response?.message !==
          'success.api.reservationUpdatedSuccessfully'
        "
        class="space-y-4"
      >
        <common-back-button
          to="/profilom"
          class="text-left"
        ></common-back-button>
        <div class="flex flex-col text-gray-800 dark:text-gray-300">
          <h1 class="text-xl">
            {{ $t("profile.user.reservations.edit.title") }}
          </h1>
        </div>
        <div class="space-y-4 text-left text-gray-500 dark:text-gray-400">
          <h2>
            {{ $t("profile.user.reservations.edit.originalReservation") }}
          </h2>
          <profile-user-reservation-card
            :reservation-id="reservationData._id"
            :course-id="reservationData.course._id"
            :course-title="reservationData.course.title"
            :course-date-interval="
              $dateIntervalFormat(
                reservationData.course.dateFrom,
                reservationData.course.dateTo
              )
            "
            :course-image-url="reservationData.course.imageUrl"
            :children="reservationData.children"
            :are-actions-visible="false"
          ></profile-user-reservation-card>
        </div>
      </div>
      <!-- TODO: hibakezelés és success kezelés átgondolása, érvényes mindenhol, ahol ilyen van -->
      <form
        v-if="
          responseStore.response?.message !==
          'success.api.reservationUpdatedSuccessfully'
        "
        :validation-schema="validationSchema"
        class="space-y-4"
        @submit="onSubmit"
      >
        <h2 class="space-y-4 text-left text-gray-500 dark:text-gray-400">
          {{ $t("profile.user.reservations.edit.newReservation") }}
        </h2>
        <p class="text-left text-sm text-gray-900 dark:text-gray-400">
          {{ $t("profile.user.reservations.edit.actionHint") }}
        </p>
        <ul
          class="scrollable-div flex h-60 flex-col space-y-2 overflow-scroll p-4 text-gray-800 dark:text-gray-200"
        >
          <common-custom-radio-button-v2
            v-for="availableCourseData in availableCourseListData.courses[0]
              .simpleCourseListResult"
            :key="availableCourseData._id"
            name="targetCourseId"
            :value="availableCourseData._id"
            :label="availableCourseData.title"
          />
        </ul>
        <div class="space-y-2">
          <div
            v-if="editReservationFormValues.targetCourseId"
            class="space-y-4"
          >
            <h2 class="text-left text-gray-900 dark:text-gray-400">
              {{ $t("profile.user.reservations.edit.selectedCourse") }}
            </h2>
            <profile-user-reservation-card
              :course-id="selectedCourseData._id"
              :course-title="selectedCourseData.title"
              :course-date-interval="
                $dateIntervalFormat(
                  selectedCourseData.dateFrom,
                  selectedCourseData.dateTo
                )
              "
              :course-image-url="selectedCourseData.imageUrl"
              :children="selectedChildrenList"
              :are-actions-visible="false"
              :is-title-navigation-enabled="false"
            ></profile-user-reservation-card>
          </div>
          <div class="space-y-4">
            <p class="text-left text-sm text-gray-900 dark:text-gray-400">
              {{ $t("profile.user.reservations.edit.childrenSelectHint") }}
            </p>
            <div class="flex space-x-2">
              <CommonCustomCheckbox
                v-for="child in reservationData.children"
                :key="child._id"
                name="childrenIdList"
                :value="child._id"
                :label="child.name"
              />
            </div>
          </div>
        </div>
        <button
          class="rounded-md bg-green-600 p-2 align-bottom text-sm text-white transition duration-300 ease-in-out hover:bg-green-800 disabled:opacity-30 disabled:hover:bg-green-600"
          type="submit"
          :disabled="!meta.valid || isSubmitting"
        >
          <common-simple-submit-button-inside
            :is-submitting="isSubmitting"
          ></common-simple-submit-button-inside>
        </button>
      </form>
      <div v-else class="space-y-6">
        <common-success-panel
          :success-message-key="'profile.user.reservations.edit.reservationUpdatedSuccessFully'"
        ></common-success-panel>
        <div>
          <nuxt-link
            to="/profilom"
            class="rounded-md bg-green-600 p-2 text-sm text-white transition duration-300 ease-in-out hover:bg-green-800"
          >
            {{ $t("profile.user.reservations.edit.goToMyProfile") }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as Yup from "yup";
import { useForm } from "vee-validate";
import {
  EditReservation,
  Reservation,
  SimpleReservationListResponse,
} from "~/models/reservation";
import { useCustomFetch } from "~/composables/myFetch";
import { FetchMethods } from "~/models/enums";
import { SIMPLE_AVAILABLE_COURSES } from "~/composables/apiUris";
import { Course } from "~/models/course";
import { useResponseStore } from "~/stores/response";
const route = useRoute();

const responseStore = useResponseStore();

const reservationId = route.params.reservationId;

const editReservationFormData = ref<EditReservation>(null);

const validationSchema = Yup.object().shape({
  targetCourseId: Yup.string().required(),
  childrenIdList: Yup.lazy((value) =>
    typeof value === "string"
      ? Yup.string().required()
      : Yup.array().required().min(1)
  ),
});

const { data: reservationData } = await useCustomFetch<Reservation>({
  path: `/${RESERVATION}/${USER_RESERVATIONS}/${reservationId}`,
  isAuthenticated: true,
});

editReservationFormData.value = {
  reservationId: reservationData.value._id,
  targetCourseId: "",
  childrenIdList: reservationData.value.children.map(
    (child: Child) => child._id
  ) as [string],
};

const {
  values: editReservationFormValues,
  meta,
  handleSubmit,
  isSubmitting,
} = useForm<EditReservation>({
  validationSchema,
  initialValues: editReservationFormData.value,
});

const { data: availableCourseListData } =
  await useCustomFetch<SimpleReservationListResponse>({
    path: `${COURSE}/${SIMPLE_AVAILABLE_COURSES}`,
    params: {
      projectId: "61ed941fd0bd9a48509bee27",
      excludedCourseId: (reservationData.value.course as Course)._id,
    },
    isAuthenticated: true,
  });

const selectedCourseData = computed(() => {
  return availableCourseListData.value.courses[0].simpleCourseListResult.find(
    (course) => course._id === editReservationFormValues.targetCourseId
  );
});

const selectedChildrenList = computed(() => {
  return reservationData.value.children.filter((child: Child) =>
    editReservationFormValues.childrenIdList?.includes(child._id)
  );
});

const onSubmit = handleSubmit(async (values) => {
  editReservationFormData.value = {
    ...values,
  };
  const { error } = await useCustomFetch({
    path: `/${RESERVATION}/${EDIT}/${reservationId}`,
    method: FetchMethods.PUT,
    isAuthenticated: true,
    body: {
      childrenIdList: editReservationFormData.value.childrenIdList,
      targetCourseId: editReservationFormData.value.targetCourseId,
    },
  });

  if (!error.value) {
    // TODO: szépítés, kiszervezés, nuxt natív megoldás használata
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
});
</script>

<style scoped>
/* TODO: scrollbar SCC kiszervezése */
.scrollable-div::-webkit-scrollbar {
  -webkit-appearance: none;
}

.scrollable-div::-webkit-scrollbar:vertical {
  width: 11px;
}

.scrollable-div::-webkit-scrollbar:horizontal {
  height: 11px;
}

.scrollable-div::-webkit-scrollbar-thumb {
  border-radius: 8px;
  border: 2px solid white;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
