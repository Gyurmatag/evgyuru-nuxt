<template>
  <common-page-head :subtitle="'page.title.passwordReset'"></common-page-head>
  <div
    class="flex flex-col items-center justify-center bg-blue-100 bg-opacity-10 dark:bg-gray-800"
  >
    <div
      class="relative m-4 md:m-8 max-w-6xl items-center justify-center rounded-lg bg-white p-4 text-center shadow-xl dark:border-gray-500 dark:bg-gray-700 sm:w-3/4 lg:w-2/5"
    >
      <form
        v-if="
          responseStore.response?.message ===
          'success.api.passwordResetKeyIsValid'
        "
        :validation-schema="validationSchema"
        class="space-y-6"
        @submit="onSubmit"
      >
        <div class="space-y-8">
          <div class="text-gray-500 dark:text-gray-400">
            <span class="material-icons-outlined text-6xl font-light">
              key
            </span>
            <p>{{ $t("auth.passwordReset.greeting") }}</p>
          </div>
          <common-text-input
            name="password"
            type="password"
            :label="$t('auth.passwordReset.form.passwordFirst')"
          />
          <common-text-input
            name="passwordConfirmation"
            type="password"
            :label="$t('auth.passwordReset.form.passwordAgain')"
          />
        </div>
        <button
          class="rounded-md bg-green-600 p-2 align-bottom text-sm text-white transition duration-300 ease-in-out hover:bg-green-800 disabled:opacity-30 disabled:hover:bg-green-600"
          type="submit"
          :disabled="!meta.valid || isSubmitting"
        >
          {{ $t("common.go") }}
        </button>
      </form>
      <common-error-panel
        v-if="
          responseStore.response?.message ===
          'error.api.userNotFoundWithThisPasswordResetKey'
        "
        :error-message-key="responseStore.response?.message"
      ></common-error-panel>
      <div
        v-if="
          responseStore.response?.message ===
          'success.api.passwordChangedSuccessfully'
        "
        class="space-y-6"
      >
        <common-success-panel
          :success-message-key="'auth.passwordReset.form.passwordChangedSuccessFully'"
          :hint-key="'auth.passwordReset.form.passwordChangedSuccessFullyHint'"
        ></common-success-panel>
        <div>
          <nuxt-link
            to="/auth/login"
            class="rounded-md bg-green-600 p-2 text-sm text-white transition duration-300 ease-in-out hover:bg-green-800"
          >
            {{ $t("auth.passwordReset.form.goToLogin") }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as Yup from "yup";
import { useForm } from "vee-validate";
import { PasswordReset } from "~/models/user";
import { FetchMethods } from "~/models/enums";
import { useCustomFetch } from "~/composables/myFetch";
import { useResponseStore } from "~/stores/response";
import { IS_PASSWORD_RESET_KEY_VALID } from "~/composables/apiUris";

const route = useRoute();
const responseStore = useResponseStore();

const passwordResetFormData = ref<PasswordReset>(null);

await useCustomFetch({
  path: `${AUTH}/${IS_PASSWORD_RESET_KEY_VALID}/${route.params.passwordResetKey}`,
  initialCache: false,
  server: false,
  lazy: true,
});

const validationSchema = Yup.object().shape({
  // TODO: dinamikussá tétel (8 karakter)
  password: Yup.string()
    .required("auth.passwordReset.form.errors.password.required")
    .min(8, "auth.passwordReset.form.errors.password.minChars"),
  passwordConfirmation: Yup.string()
    .required("auth.passwordReset.form.errors.password.required")
    .oneOf(
      [Yup.ref("password")],
      "auth.passwordReset.form.errors.password.notMatching"
    ),
});

const { meta, isSubmitting, handleSubmit } = useForm<PasswordReset>({
  validationSchema,
});

const onSubmit = handleSubmit(async (values) => {
  passwordResetFormData.value = {
    ...passwordResetFormData.value,
    ...values,
  };
  // TODO: error kezelése
  await useCustomFetch({
    path: `${AUTH}/${PASSWORD_RESET}/${route.params.passwordResetKey}`,
    method: FetchMethods.PUT,
    body: {
      password: passwordResetFormData.value.password,
    },
    initialCache: false,
  });
});
</script>
