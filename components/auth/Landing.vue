<template>
  <div
    class="flex flex-col items-center justify-center bg-blue-100 bg-opacity-10 dark:bg-gray-800"
  >
    <div
      class="relative m-8 max-w-6xl items-center justify-center rounded-lg bg-white p-4 text-center shadow-xl dark:border-gray-500 dark:bg-gray-700 sm:w-3/4 lg:w-2/5"
    >
      <button
        v-if="
          currentStep !== AuthenticationSteps.Initial &&
          currentStep !== AuthenticationSteps.SignupSuccess
        "
        class="absolute left-0 top-0 h-7 w-16 rounded-br-xl rounded-tl-xl bg-gray-100 text-sm transition duration-300 ease-in-out hover:bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
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
        <auth-new-user-register-panel
          v-if="currentStep === AuthenticationSteps.NewUserRegister"
          :user-email="loginFormData.email"
        ></auth-new-user-register-panel>
        <auth-signup-success-panel
          v-if="currentStep === AuthenticationSteps.SignupSuccess"
        ></auth-signup-success-panel>
        <button
          class="rounded-md bg-green-600 p-2 align-bottom text-sm text-white transition duration-300 ease-in-out hover:bg-green-800 disabled:opacity-30 disabled:hover:bg-green-600"
          type="submit"
          :disabled="!meta.valid || isSubmitting"
        >
          {{
            currentStep === AuthenticationSteps.Initial ||
            currentStep === AuthenticationSteps.SignupSuccess
              ? $t("common.next")
              : $t("common.go")
          }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import * as Yup from "yup";
import { FetchMethods, AuthenticationSteps } from "~/models/enums";
import { useUserStore } from "~/stores/user";
import { useCustomFetch } from "~/composables/myFetch";
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
    email: Yup.string().email().required(),
  }),
  [AuthenticationSteps.ExistingUserLogin]: Yup.object().shape({
    password: Yup.string().required(),
  }),
  [AuthenticationSteps.NewUserRegister]: Yup.object().shape({
    fullName: Yup.string().required(),
    telephoneNumber: Yup.string().required(),
    address: Yup.string().required(),
    password: Yup.string().required().min(8),
    passwordConfirmation: Yup.string()
      .required()
      .oneOf([Yup.ref("password")], "Passwords do not match"),
  }),
};

const currentSchema = computed(() => validationSchemas[currentStep.value]);

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
        userStore.user = userData.value;
        resetForm();
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
          address: signUpFormData.value.address,
          password: signUpFormData.value.password,
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
});

const goBackToInitial = () => {
  setFieldValue("email", loginFormData.value.email);
  currentStep.value = AuthenticationSteps.Initial;
};
</script>