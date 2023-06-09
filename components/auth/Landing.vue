<template>
  <common-page-head :subtitle="'page.title.auth'"></common-page-head>
  <div
    class="flex flex-col items-center justify-center bg-blue-100 bg-opacity-10 dark:bg-gray-800"
  >
    <div
      class="relative m-4 max-w-6xl items-center justify-center rounded-lg bg-white p-4 text-center shadow-xl dark:border-gray-500 dark:bg-gray-700 sm:w-3/4 md:m-8 lg:w-2/5"
    >
      <button
        v-if="
          currentStep !== AuthenticationSteps.Initial &&
          currentStep !== AuthenticationSteps.SignupSuccess
        "
        class="absolute left-0 top-0 h-9 w-16 rounded-br-xl rounded-tl-xl bg-gray-100 text-sm transition duration-300 ease-in-out hover:bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 md:h-7 md:w-16"
        type="button"
        @click="goBackToInitial"
      >
        {{ $t("common.back") }}
      </button>
      <form
        :validation-schema="currentSchema"
        class="space-y-6"
        @submit="onSubmit"
      >
        <auth-greeting-title
          v-if="currentStep !== AuthenticationSteps.SignupSuccess"
        ></auth-greeting-title>
        <auth-initial-panel
          v-if="currentStep === AuthenticationSteps.Initial"
        ></auth-initial-panel>
        <auth-existing-user-login-panel
          v-if="currentStep === AuthenticationSteps.ExistingUserLogin"
          :user-email="loginFormData.email"
        ></auth-existing-user-login-panel>
        <auth-user-register-panel
          v-if="currentStep === AuthenticationSteps.NewUserRegister"
          :user-email="loginFormData.email"
        ></auth-user-register-panel>
        <common-success-panel
          v-if="currentStep === AuthenticationSteps.SignupSuccess"
          :success-message-key="'auth.form.newProfileSuccess'"
          :hint-key="'auth.form.newProfileEmailActivationHint'"
        >
          <template #hint-icon>
            <common-icon-inbox></common-icon-inbox>
          </template>
        </common-success-panel>
        <button
          class="rounded-md bg-green-600 p-2 align-bottom text-sm text-white transition duration-300 ease-in-out hover:bg-green-800 disabled:opacity-30 disabled:hover:bg-green-600"
          type="submit"
          :disabled="!meta.valid || isSubmitting"
        >
          <span class="flex">
            {{ $t(submitButtonText) }}
            <common-icon-loading-spin
              v-if="isSubmitting"
              class="ml-2"
            ></common-icon-loading-spin>
          </span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import * as Yup from "yup";
import { AuthenticationSteps, FetchMethods } from "~/models/enums";
import { useUserStore } from "~/stores/user";
import {
  IsEmailAlreadyRegistered,
  LoginUser,
  SignUpUser,
  User,
} from "~/models/user";

const userStore = useUserStore();

const loginFormData = useState<LoginUser>("loginFormData", () => null);
const signUpFormData = useState<SignUpUser>("signUpFormData", () => null);
const currentStep = useState("currentStep", () => AuthenticationSteps.Initial);

const validationSchemas = {
  [AuthenticationSteps.Initial]: Yup.object().shape({
    email: Yup.string()
      .email("auth.form.errors.email.format")
      .required("auth.form.errors.email.required"),
  }),
  [AuthenticationSteps.ExistingUserLogin]: Yup.object().shape({
    password: Yup.string().required("auth.form.errors.password.required"),
  }),
  [AuthenticationSteps.NewUserRegister]: Yup.object().shape({
    fullName: Yup.string()
      .required("auth.form.errors.fullName.required")
      .min(3, "auth.form.errors.fullName.minChars")
      .max(100, "auth.form.errors.fullName.maxChars"),
    telephoneNumber: Yup.string()
      .required("auth.form.errors.telephoneNumber.required")
      .min(17, "auth.form.errors.telephoneNumber.minChars"),
    zipCode: Yup.string()
      .required("auth.form.errors.zipCode.required")
      .min(4, "auth.form.errors.zipCode.minChars"),
    city: Yup.string()
      .required("auth.form.errors.city.required")
      .min(2, "auth.form.errors.city.minChars")
      .max(200, "auth.form.errors.city.maxChars"),
    streetAddress: Yup.string()
      .required("auth.form.errors.streetAddress.required")
      .min(5, "auth.form.errors.streetAddress.minChars")
      .max(200, "auth.form.errors.streetAddress.maxChars"),
    // TODO: dinamikussá tétel (8 karakter)
    password: Yup.string()
      .required("auth.form.errors.password.required")
      .min(8, "auth.form.errors.password.minChars"),
    passwordConfirmation: Yup.string()
      .required("auth.form.errors.password.required")
      .oneOf([Yup.ref("password")], "auth.form.errors.password.notMatching"),
    acceptDataManagement: Yup.boolean().isTrue(),
  }),
};

const currentSchema = computed(() => validationSchemas[currentStep.value]);

const submitButtonText = computed(() => {
  return !isSubmitting.value
    ? currentStep.value === AuthenticationSteps.Initial ||
      currentStep.value === AuthenticationSteps.SignupSuccess
      ? "common.next"
      : "common.go"
    : "common.wait";
});

const { meta, handleSubmit, setFieldValue, isSubmitting } = useForm<
  LoginUser | SignUpUser
>({
  validationSchema: currentSchema,
});

const onSubmit = handleSubmit(async (values, { resetForm }) => {
  switch (currentStep.value) {
    case AuthenticationSteps.Initial: {
      loginFormData.value = {
        ...loginFormData.value,
        ...values,
      };
      // TODO: error kezelése
      const { data } = await useCustomFetch<IsEmailAlreadyRegistered>({
        path: `${AUTH}/${IS_EMAIL_ALREADY_REGISTERED}`,
        params: { email: loginFormData.value.email },
      });

      const isEmailAlreadyRegistered = data.value.isEmailAlreadyRegistered;
      if (isEmailAlreadyRegistered) {
        currentStep.value = AuthenticationSteps.ExistingUserLogin;
      } else {
        currentStep.value = AuthenticationSteps.NewUserRegister;
      }
      break;
    }
    case AuthenticationSteps.ExistingUserLogin: {
      loginFormData.value = {
        ...loginFormData.value,
        ...values,
      };
      // TODO: error kezelése
      const { data: userData, error } = await useCustomFetch<User>({
        path: `${AUTH}/${SIGNIN}`,
        method: FetchMethods.POST,
        body: {
          email: loginFormData.value.email,
          password: loginFormData.value.password,
        },
      });
      if (!error.value) {
        userStore.storeUserData({
          ...userData.value,
          // TODO: itt miért is kell konvertálni a accessTokenExpireTimeInMs számmá?
          accessTokenExpireDate: new Date(
            Date.now() + +userData.value.accessTokenExpireTimeInMs
          ),
        });
        resetForm();
        // TODO: itt majd reset default value-t meg lehetne határozni
        loginFormData.value = {
          email: "",
          password: "",
        };
        currentStep.value = AuthenticationSteps.Initial;
        await navigateTo({
          path: "/",
        });
      }
      break;
    }
    case AuthenticationSteps.NewUserRegister: {
      signUpFormData.value = {
        ...signUpFormData.value,
        email: loginFormData.value.email,
        ...values,
      };
      // TODO: error kezelése
      const { error } = await useCustomFetch({
        path: `${AUTH}/${SIGNUP}`,
        method: FetchMethods.POST,
        body: {
          email: signUpFormData.value.email,
          fullName: signUpFormData.value.fullName,
          telephoneNumber: signUpFormData.value.telephoneNumber,
          zipCode: signUpFormData.value.zipCode,
          city: signUpFormData.value.city,
          streetAddress: signUpFormData.value.streetAddress,
          password: signUpFormData.value.password,
          acceptNewsletter: signUpFormData.value.acceptNewsletter,
          isNotRegisteredOnlyForCourseApply: false,
        },
      });
      if (!error.value) {
        currentStep.value = AuthenticationSteps.SignupSuccess;
      }
      break;
    }
    default: {
      currentStep.value = AuthenticationSteps.ExistingUserLogin;
      break;
    }
  }
  // TODO: szépítés, kiszervezés, nuxt natív megoldás használata
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

const goBackToInitial = () => {
  setFieldValue("email", loginFormData.value.email);
  currentStep.value = AuthenticationSteps.Initial;
};
</script>
