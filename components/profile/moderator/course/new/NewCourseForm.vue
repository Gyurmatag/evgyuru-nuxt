<template>
  <div
    class="flex flex-col items-center justify-center bg-blue-100 bg-opacity-10 dark:bg-gray-800"
  >
    <div
      class="md:3/5 m-8 w-11/12 max-w-6xl max-w-6xl items-center justify-center rounded-lg bg-white p-4 text-center shadow-xl dark:border-gray-500 dark:bg-gray-700 sm:w-3/4 lg:w-2/5"
    >
      <div v-if="isSuccessPanelVisible">
        <common-success-panel
          :success-message-key="'profile.moderator.newCourse.form.success'"
        ></common-success-panel>
        <div class="mt-4 text-gray-700 dark:text-gray-200">
          {{
            $t(
              "profile.moderator.newCourse.form.navigateToProfileAfterSuccess1"
            )
          }}
          <nuxt-link to="/profile" class="cursor-pointer underline">
            {{ $t("profile.moderator.newCourse.form.profileLink") }}
          </nuxt-link>
          {{
            $t(
              "profile.moderator.newCourse.form.navigateToProfileAfterSuccess2"
            )
          }}
        </div>
      </div>
      <div v-else class="space-y-4">
        <common-back-button class="text-left"></common-back-button>
        <h1 class="text-2xl text-gray-700 dark:text-gray-300">
          {{ $t("profile.moderator.newCourse.title") }}
        </h1>
        <div class="mx-4">
          <form :validation-schema="validationSchema" @submit="onSubmit">
            <div class="space-y-4">
              <!-- TODO: beégetett érték eltávolítása -->
              <common-select-input
                name="project"
                :label="$t('profile.moderator.newCourse.form.project')"
                :value="'61ed941fd0bd9a48509bee27'"
              />
              <common-text-input
                name="title"
                type="text"
                :label="$t('profile.moderator.newCourse.form.title')"
              />
              <common-text-input
                name="description"
                type="text"
                :is-text-area="true"
                :label="$t('profile.moderator.newCourse.form.description')"
              />
              <div
                class="flex flex-col space-y-6 md:flex-row md:space-x-6 md:space-y-0"
              >
                <common-text-input
                  name="price"
                  type="text"
                  input-mask="###############"
                  :label="$t('profile.moderator.newCourse.form.price')"
                />
                <common-text-input
                  name="occasions"
                  type="text"
                  input-mask="###############"
                  :label="$t('profile.moderator.newCourse.form.occasions')"
                />
              </div>
              <div class="flex space-x-6">
                <common-date-input
                  name="dateFrom"
                  type="text"
                  :label="$t('profile.moderator.newCourse.form.dateFrom')"
                />
                <common-date-input
                  name="dateTo"
                  type="text"
                  :label="$t('profile.moderator.newCourse.form.dateTo')"
                />
              </div>
              <div class="flex space-x-6">
                <cloudinary-image-uploader
                  @image-uploaded="setImageUrl"
                ></cloudinary-image-uploader>
                <common-text-input
                  name="imageUrl"
                  type="text"
                  :value="imageUrlFromUploader"
                  :label="$t('profile.moderator.newCourse.form.imageUrl')"
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
import { NewCourse } from "~/models/course";
import CloudinaryImageUploader from "~/components/common/CloudinaryImageUploader.vue";
import { useCustomFetch } from "~/composables/myFetch";
import { FetchMethods } from "~/models/enums";

const imageUrlFromUploader = ref(null);
const isSuccessPanelVisible = ref(false);

const newCourseFormData = ref<NewCourse>(null);

const validationSchema = Yup.object().shape({
  project: Yup.string().required(),
  title: Yup.string().required(
    "profile.moderator.newCourse.form.errors.title.required"
  ),
  description: Yup.string().required(
    "profile.moderator.newCourse.form.errors.description.required"
  ),
  price: Yup.number().required(
    "profile.moderator.newCourse.form.errors.price.required"
  ),
  occasions: Yup.number().required(
    "profile.moderator.newCourse.form.errors.occasions.required"
  ),
  dateFrom: Yup.date().required(
    "profile.moderator.newCourse.form.errors.dateFrom.required"
  ),
  dateTo: Yup.date()
    .required("profile.moderator.newCourse.form.errors.dateTo.required")
    .min(
      Yup.ref("dateFrom"),
      "profile.moderator.newCourse.form.errors.dateTo.beforeDateFrom"
    ),
  imageUrl: Yup.string().required(
    "profile.moderator.newCourse.form.errors.imageUrl.required"
  ),
});

const { meta, handleSubmit, isSubmitting } = useForm<NewCourse>({
  validationSchema,
});

const setImageUrl = (url: string) => {
  imageUrlFromUploader.value = url;
};

const onSubmit = handleSubmit(async (values: NewCourse) => {
  newCourseFormData.value = {
    ...values,
  };

  // TODO: error kezelés
  const { error } = await useCustomFetch({
    path: `${COURSE}/${SAVE}`,
    method: FetchMethods.POST,
    isAuthenticated: true,
    body: newCourseFormData.value,
  });

  if (!error.value) {
    isSuccessPanelVisible.value = true;
  }
});
</script>
