<template>
  <div class="mx-4">
    <form
      :validation-schema="validationSchema"
      class="h-48 sm:h-44"
      @submit="onSubmit"
    >
      <common-transition-basic-transition>
        <course-card-apply-new-apply-panel
          v-if="!userStore.currentCourseReservedByUser(courseId)"
          :meta="meta"
          :is-submitting="isSubmitting"
        >
        </course-card-apply-new-apply-panel>
        <course-card-apply-applied-panel
          v-else
        ></course-card-apply-applied-panel>
      </common-transition-basic-transition>
    </form>
    <common-transition-basic-transition>
      <button
        v-if="!userStore.currentCourseReservedByUser(courseId)"
        type="button"
        class="absolute right-0 bottom-0 mb-4 rounded-md bg-gray-100 p-1 text-sm transition duration-300 ease-in-out hover:bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
        @click="isApplyActive = false"
      >
        {{ $t("course.apply.cancel") }}
      </button>
    </common-transition-basic-transition>
  </div>
</template>

<script setup lang="ts">
import * as Yup from "yup";
import { useForm } from "vee-validate";
import { ApplyCourse, Reservation } from "~/models/reservation";
import { useUserStore } from "~/stores/user";
import { FetchMethods } from "~/models/enums";

const userStore = useUserStore();

const isApplyActive = useState<boolean>("isApplyActive");

const props = defineProps({
  courseId: {
    type: String,
    required: true,
  },
});

const applyFormData = useState<ApplyCourse>("applyFormData", () => null);

const validationSchema = {
  childName: Yup.string(),
};

const { meta, handleSubmit, isSubmitting } = useForm<ApplyCourse>({
  validationSchema,
});

const onSubmit = handleSubmit(async (values: ApplyCourse) => {
  applyFormData.value = {
    ...applyFormData.value,
    ...values,
  };

  // TODO: error kezelés
  const { data } = await useCustomFetch<Reservation>({
    path: `${RESERVATION}/${SAVE}`,
    method: FetchMethods.POST,
    isAuthenticated: true,
    body: {
      courseId: props.courseId,
      childName: applyFormData.value.childName,
    },
  });

  if (data) {
    userStore.addNewReservation(data.value);
  }
});
</script>
