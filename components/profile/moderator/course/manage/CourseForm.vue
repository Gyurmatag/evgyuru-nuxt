<template>
  <div
    class="flex flex-col items-center justify-center bg-blue-100 bg-opacity-10 dark:bg-gray-800"
  >
    <div
      class="md:3/5 m-8 w-11/12 max-w-6xl max-w-6xl items-center justify-center rounded-lg bg-white p-4 text-center shadow-xl dark:border-gray-500 dark:bg-gray-700 sm:w-3/4 lg:w-2/5"
    >
      <div v-if="isSuccessPanelVisible">
        <!-- TODO: kiszervezni ezt külön komponensbe -->
        <common-success-panel
          :success-message-key="
            isEdit
              ? 'profile.moderator.manageCourse.form.editSuccess'
              : 'profile.moderator.manageCourse.form.saveSuccess'
          "
        ></common-success-panel>
        <div class="mt-4 text-gray-700 dark:text-gray-200">
          {{
            $t(
              "profile.moderator.manageCourse.form.navigateToProfileAfterSuccess1"
            )
          }}
          <nuxt-link to="/profile" class="cursor-pointer underline">
            {{ $t("profile.moderator.manageCourse.form.profileLink") }}
          </nuxt-link>
          {{
            $t(
              "profile.moderator.manageCourse.form.navigateToProfileAfterSuccess2"
            )
          }}
        </div>
      </div>
      <div v-else class="space-y-4">
        <common-back-button
          to="/profile"
          class="text-left"
        ></common-back-button>
        <h1 class="text-2xl text-gray-700 dark:text-gray-300">
          {{
            props.isEdit
              ? $t("profile.moderator.manageCourse.editTitle")
              : $t("profile.moderator.manageCourse.newTitle")
          }}
        </h1>
        <div class="mx-4">
          <form :validation-schema="validationSchema" @submit="onSubmit">
            <div class="space-y-4">
              <!-- TODO: beégetett érték eltávolítása -->
              <common-select-input
                name="project"
                :label="$t('profile.moderator.manageCourse.form.project')"
                :value="'61ed941fd0bd9a48509bee27'"
              />
              <common-text-input
                name="title"
                type="text"
                :label="$t('profile.moderator.manageCourse.form.title')"
              />
              <common-text-input
                name="description"
                type="text"
                :is-text-area="true"
                :label="$t('profile.moderator.manageCourse.form.description')"
              />
              <common-text-input
                name="maxGroupSize"
                type="text"
                input-mask="###"
                :label="$t('profile.moderator.manageCourse.form.maxGroupSize')"
              />
              <div
                class="flex flex-col space-y-6 md:flex-row md:space-x-6 md:space-y-0"
              >
                <common-text-input
                  name="price"
                  type="text"
                  input-mask="###############"
                  :label="$t('profile.moderator.manageCourse.form.price')"
                />
                <common-text-input
                  name="occasions"
                  type="text"
                  input-mask="###############"
                  :label="$t('profile.moderator.manageCourse.form.occasions')"
                />
              </div>
              <div class="flex space-x-6">
                <common-date-input
                  name="dateFrom"
                  :value="props.isEdit ? courseFormData.dateFrom : new Date()"
                  :label="$t('profile.moderator.manageCourse.form.dateFrom')"
                />
                <common-text-input
                  name="timeFrom"
                  type="time"
                  :label="$t('profile.moderator.manageCourse.form.timeFrom')"
                />
              </div>
              <div class="flex space-x-6">
                <common-date-input
                  name="dateTo"
                  :value="isEdit ? courseFormData.dateTo : new Date()"
                  :label="$t('profile.moderator.manageCourse.form.dateTo')"
                />
                <common-text-input
                  name="timeTo"
                  type="time"
                  :label="$t('profile.moderator.manageCourse.form.timeTo')"
                />
              </div>
              <div class="flex space-x-6">
                <cloudinary-image-uploader
                  :is-image-url-already-provided="isEdit"
                  @image-uploaded="setImageUrl"
                ></cloudinary-image-uploader>
                <common-text-input
                  name="imageUrl"
                  type="text"
                  :value="imageUrlFromUploader"
                  :label="$t('profile.moderator.manageCourse.form.imageUrl')"
                  class="hidden"
                />
              </div>
              <button
                class="rounded-md bg-green-600 p-2 align-bottom text-sm text-white transition duration-300 ease-in-out hover:bg-green-800 disabled:opacity-30 disabled:hover:bg-green-600"
                type="submit"
                :disabled="!meta.valid || isSubmitting"
              >
                {{ $t("common.go") }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as Yup from "yup";
import { useForm } from "vee-validate";
import dayjs from "dayjs";
import { Course, CourseForm } from "~/models/course";
import CloudinaryImageUploader from "~/components/common/CloudinaryImageUploader.vue";
import { useCustomFetch } from "~/composables/myFetch";
import { FetchMethods } from "~/models/enums";

const route = useRoute();

const imageUrlFromUploader = ref(null);
const isSuccessPanelVisible = ref(false);
const courseFormData = ref<CourseForm>(null);

const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false,
  },
});

// TODO: error kezelés
if (props.isEdit) {
  const { data } = await useCustomFetch<Course>({
    path: `/${COURSE}/${route.params.courseId}`,
    initialCache: false,
  });
  courseFormData.value = {
    ...data.value,
    dateFrom: new Date(data.value.dateFrom),
    dateTo: new Date(data.value.dateTo),
    // TODO: szépítési lehetőség? Kiszervezés?
    timeFrom: `${new Date(data.value.dateFrom)
      .getHours()
      .toString()}:${new Date(data.value.dateFrom).getMinutes().toString()}`,
    timeTo: `${new Date(data.value.dateTo).getHours().toString()}:${new Date(
      data.value.dateTo
    )
      .getMinutes()
      .toString()}`,
  };
}

const validationSchema = Yup.object().shape({
  project: Yup.string().required(),
  title: Yup.string().required(
    "profile.moderator.manageCourse.form.errors.title.required"
  ),
  description: Yup.string().required(
    "profile.moderator.manageCourse.form.errors.description.required"
  ),
  maxGroupSize: Yup.number().required(
    "profile.moderator.manageCourse.form.errors.maxGroupSize.required"
  ),
  price: Yup.number().required(
    "profile.moderator.manageCourse.form.errors.price.required"
  ),
  occasions: Yup.number().required(
    "profile.moderator.manageCourse.form.errors.occasions.required"
  ),
  dateFrom: Yup.date()
    .required("profile.moderator.manageCourse.form.errors.dateFrom.required")
    .max(
      Yup.ref("dateTo"),
      "profile.moderator.manageCourse.form.errors.dateTo.afterDateTo"
    ),
  timeFrom: Yup.string().required(
    "profile.moderator.manageCourse.form.errors.timeFrom.required"
  ),
  dateTo: Yup.date()
    .required("profile.moderator.manageCourse.form.errors.dateTo.required")
    .min(
      Yup.ref("dateFrom"),
      "profile.moderator.manageCourse.form.errors.dateTo.beforeDateFrom"
    ),
  timeTo: Yup.string()
    .required("profile.moderator.manageCourse.form.errors.timeTo.required")
    .test(
      "is-greater",
      "profile.moderator.manageCourse.form.errors.timeTo.beforeTimeFrom",
      // TODO: kiszervezések (dátum formátum, stb...?)
      function (value) {
        const { timeFrom, dateFrom, dateTo } = this.parent;
        const timeFromHoursMinutesSpit = splitHoursAndMinutesTime(timeFrom);
        const timeFromDate = dayjs(dateFrom, "YYYY-MM-DD")
          .hour(+timeFromHoursMinutesSpit[0])
          .minute(+timeFromHoursMinutesSpit[1]);
        const timeToHoursMinutesSpit = splitHoursAndMinutesTime(value);
        const timeToDate = dayjs(dateTo, "YYYY-MM-DD")
          .hour(+timeToHoursMinutesSpit[0])
          .minute(+timeToHoursMinutesSpit[1]);
        return dayjs(timeToDate).isAfter(dayjs(timeFromDate));
      }
    ),
  imageUrl: Yup.string().required(
    "profile.moderator.manageCourse.form.errors.imageUrl.required"
  ),
});

const { meta, handleSubmit, isSubmitting } = useForm<CourseForm>({
  validationSchema,
  initialValues: courseFormData.value,
});

const setImageUrl = (url: string) => {
  imageUrlFromUploader.value = url;
};

const onSubmit = handleSubmit(async (values: CourseForm) => {
  const timeFromHoursMinutesSpit = splitHoursAndMinutesTime(values.timeFrom);
  const timeToHoursMinutesSpit = splitHoursAndMinutesTime(values.timeTo);
  // TODO: szép megoldás-e a .toDate().toLocaleString(). Ez addig lehet releváns, amig nem működik rendes a days js plugin?
  courseFormData.value = {
    ...values,
    dateFrom: dayjs(values.dateFrom)
      .hour(+timeFromHoursMinutesSpit[0])
      .minute(+timeFromHoursMinutesSpit[1])
      .toDate()
      .toLocaleString(),
    dateTo: dayjs(values.dateTo)
      .hour(+timeToHoursMinutesSpit[0])
      .minute(+timeToHoursMinutesSpit[1])
      .toDate()
      .toLocaleString(),
  };

  // TODO: error kezelés
  const { error } = await useCustomFetch({
    path: props.isEdit
      ? `/${COURSE}/${route.params.courseId}`
      : `${COURSE}/${SAVE}`,
    method: props.isEdit ? FetchMethods.PUT : FetchMethods.POST,
    isAuthenticated: true,
    body: courseFormData.value,
  });

  if (!error.value) {
    isSuccessPanelVisible.value = true;
  }
});
</script>

<style>
input[type="time"]::-webkit-calendar-picker-indicator {
  display: none;
}
</style>
