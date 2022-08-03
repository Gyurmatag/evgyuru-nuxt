<template>
  <common-page-head :subtitle="'page.title.editProfile'"></common-page-head>
  <div
    class="flex flex-col items-center justify-center bg-blue-100 bg-opacity-10 dark:bg-gray-800"
  >
    <div
      class="relative m-8 max-w-6xl items-center justify-center rounded-lg bg-white p-4 text-center shadow-xl dark:border-gray-500 dark:bg-gray-700 sm:w-3/4 lg:w-2/5"
    >
      <common-back-button to="/profile" class="text-left"></common-back-button>
      <!-- TODO: hibakezelés és success kezelés átgondolása, érvényes mindenhol, ahol ilyen van -->
      <form
        v-if="
          responseStore.response?.message !==
          'success.api.accountUpdatedSuccessFully'
        "
        :validation-schema="validationSchema"
        class="space-y-6"
        @submit="onSubmit"
      >
        <auth-user-register-panel
          :is-edit="true"
          :hint-translate-key="'profile.edit.hint'"
          :user-email="userStore.user.email"
        ></auth-user-register-panel>
        <button
          class="rounded-md bg-green-600 p-2 align-bottom text-sm text-white transition duration-300 ease-in-out hover:bg-green-800 disabled:opacity-30 disabled:hover:bg-green-600"
          type="submit"
          :disabled="!meta.valid || isSubmitting"
        >
          {{ $t("common.go") }}
        </button>
      </form>
      <div v-else class="space-y-6">
        <common-success-panel
          :success-message-key="'profile.edit.accountUpdatedSuccessFully'"
        ></common-success-panel>
        <div>
          <nuxt-link
            to="/profile"
            class="rounded-md bg-green-600 p-2 text-sm text-white transition duration-300 ease-in-out hover:bg-green-800"
          >
            {{ $t("profile.edit.goToMyProfile") }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as Yup from "yup";
import { useForm } from "vee-validate";
import { useUserStore } from "~/stores/user";
import { EditUser } from "~/models/user";
import { FetchMethods } from "~/models/enums";
import { useCustomFetch } from "~/composables/myFetch";
import { useResponseStore } from "~/stores/response";

const userStore = useUserStore();
const responseStore = useResponseStore();

const editProfileFormData = ref<EditUser>(null);

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("auth.form.errors.fullName.required"),
  telephoneNumber: Yup.string()
    .required("auth.form.errors.telephoneNumber.required")
    .min(17, "auth.form.errors.telephoneNumber.minChars"),
  zipCode: Yup.string()
    .required("auth.form.errors.zipCode.required")
    .min(4, "auth.form.errors.zipCode.minChars"),
  city: Yup.string().required("auth.form.errors.city.required"),
  streetAddress: Yup.string().required(
    "auth.form.errors.streetAddress.required"
  ),
});

editProfileFormData.value = {
  email: userStore.user.email,
  fullName: userStore.user.fullName,
  telephoneNumber: userStore.user.telephoneNumber,
  zipCode: userStore.user.zipCode,
  city: userStore.user.city,
  streetAddress: userStore.user.streetAddress,
};

const { meta, handleSubmit, isSubmitting } = useForm<EditUser>({
  validationSchema,
  initialValues: editProfileFormData.value,
});

const onSubmit = handleSubmit(async (values) => {
  editProfileFormData.value = {
    ...values,
  };
  const { error } = await useCustomFetch({
    path: `/${AUTH}/${EDIT}`,
    method: FetchMethods.PUT,
    isAuthenticated: true,
    body: {
      email: editProfileFormData.value.email,
      fullName: editProfileFormData.value.fullName,
      telephoneNumber: editProfileFormData.value.telephoneNumber,
      zipCode: editProfileFormData.value.zipCode,
      city: editProfileFormData.value.city,
      streetAddress: editProfileFormData.value.streetAddress,
    },
    initialCache: false,
  });

  if (!error.value) {
    userStore.$patch({
      user: {
        ...editProfileFormData.value,
      },
    });
  }
});
</script>
