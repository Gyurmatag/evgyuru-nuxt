<template>
  <div class="mx-4">
    <form :validation-schema="currentSchema" @submit="onSubmit">
      <common-transition-basic-transition>
        <div class="space-y-2">
          <auth-initial-panel
            v-if="currentStep === CourseApplySteps.Initial"
            :hint-translate-key="'course.apply.form.noLoginHint'"
          ></auth-initial-panel>
          <auth-existing-user-login-panel
            v-if="currentStep === CourseApplySteps.ExistingUserLogin"
            :user-email="loginFormData.email"
          ></auth-existing-user-login-panel>
          <auth-new-user-register-panel
            v-if="
              currentStep === CourseApplySteps.NewUserDataAdd ||
              currentStep === CourseApplySteps.NewUserDataAddWithSignUp
            "
            v-model:is-data-to-be-saved="isDataToBeSaved"
            :hint-translate-key="'course.apply.form.newProfileHint'"
            :user-email="loginFormData.email"
            :is-on-apply-form="true"
          ></auth-new-user-register-panel>
          <course-card-apply-new-apply-panel
            v-if="currentStep === CourseApplySteps.Apply"
            :meta="meta"
            :is-submitting="isSubmitting"
            :is-user-will-be-registered-or-already-logged-in="
              isDataToBeSaved || !!userStore.user._id
            "
            :remaining-places-count="remainingPlacesCount"
          >
          </course-card-apply-new-apply-panel>
          <course-card-apply-applied-panel
            v-if="currentStep === CourseApplySteps.ApplySuccess"
          ></course-card-apply-applied-panel>
          <button
            v-if="!userStore.currentCourseReservedByUser(courseId)"
            class="rounded-md bg-green-600 p-2 align-bottom text-sm text-white transition duration-300 ease-in-out hover:bg-green-800 disabled:opacity-30 disabled:hover:bg-green-600"
            type="submit"
            :disabled="!meta.valid || isSubmitting"
          >
            {{
              currentStep === CourseApplySteps.Initial
                ? $t("common.next")
                : $t("common.go")
            }}
          </button>
        </div>
      </common-transition-basic-transition>
    </form>
    <common-transition-basic-transition>
      <button
        v-if="!userStore.currentCourseReservedByUser(courseId)"
        type="button"
        class="absolute right-0 bottom-0 rounded-md bg-gray-100 p-1 text-sm transition duration-300 ease-in-out hover:bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
        @click="emit('update:isApplyActive', false)"
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
import { CourseApplySteps, FetchMethods } from "~/models/enums";
import {
  IsEmailAlreadyRegistered,
  LoginUser,
  SignUpUser,
  User,
} from "~/models/user";
import { useCustomFetch } from "~/composables/myFetch";

const userStore = useUserStore();

const props = defineProps({
  courseId: {
    type: String,
    required: true,
  },
  isApplyActive: {
    type: Boolean,
    required: true,
  },
  remainingPlacesCount: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits<{
  (e: "update:isApplyActive", p: boolean): void;
}>();

const loginFormData = ref<LoginUser>(null);
const signUpFormData = ref<SignUpUser>(null);
const applyFormData = ref<ApplyCourse>(null);
const currentStep = ref(CourseApplySteps.Initial);
const isDataToBeSaved = ref(false);

// TODO: kiszervezés központi helyre, hogy itt is és az auth-ban is tudjuk használni
const baseUserDataApplyValidations = {
  fullName: Yup.string().required("auth.form.errors.fullName.required"),
  telephoneNumber: Yup.string().required(
    "auth.form.errors.telephoneNumber.required"
  ),
  zipCode: Yup.string()
    .required("auth.form.errors.zipCode.required")
    .min(4, "auth.form.errors.zipCode.minChars"),
  city: Yup.string().required("auth.form.errors.city.required"),
  streetAddress: Yup.string().required(
    "auth.form.errors.streetAddress.required"
  ),
  acceptDataManagement: Yup.boolean().isTrue(),
};

const acceptDataManagementValidation = {
  acceptDataManagement: Yup.boolean().isTrue(),
};

const validationSchemas = {
  [CourseApplySteps.Initial]: Yup.object().shape({
    email: Yup.string()
      .email("auth.form.errors.email.format")
      .required("auth.form.errors.email.required"),
  }),
  [CourseApplySteps.ExistingUserLogin]: Yup.object().shape({
    password: Yup.string().required("auth.form.errors.password.required"),
  }),
  [CourseApplySteps.NewUserDataAdd]: Yup.object().shape(
    baseUserDataApplyValidations
  ),
  [CourseApplySteps.NewUserDataAddWithSignUp]: Yup.object().shape({
    ...baseUserDataApplyValidations,
    ...{
      password: Yup.string()
        .required("auth.form.errors.password.required")
        .min(8, "auth.form.errors.password.minChars"),
      passwordConfirmation: Yup.string()
        .required("auth.form.errors.password.required")
        .oneOf([Yup.ref("password")], "auth.form.errors.password.notMatching"),
      ...acceptDataManagementValidation,
    },
  }),
  [CourseApplySteps.Apply]: Yup.object().shape({
    children: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required(
          "course.apply.form.errors.childName.required"
        ),
      })
    ),
    ...(isDataToBeSaved || !!userStore.user._id
      ? acceptDataManagementValidation
      : {}),
  }),
};

if (!userStore.user._id) {
  currentStep.value = CourseApplySteps.Initial;
} else {
  currentStep.value = CourseApplySteps.Apply;
}

const currentSchema = computed(() => validationSchemas[currentStep.value]);

watch(isDataToBeSaved, (newValue) => {
  if (newValue) {
    currentStep.value = CourseApplySteps.NewUserDataAddWithSignUp;
  } else {
    currentStep.value = CourseApplySteps.NewUserDataAdd;
  }
});

const { meta, handleSubmit, isSubmitting } = useForm<
  LoginUser | SignUpUser | ApplyCourse
>({
  validationSchema: currentSchema,
  // TODO: initalValues miért kell, kiszervezés?
  initialValues: {
    courseId: "",
    children: [
      {
        name: "",
      },
    ],
  },
});

const handleUserDataSave = async (formValues: ApplyCourse) => {
  signUpFormData.value = {
    ...signUpFormData.value,
    email: loginFormData.value.email,
    ...formValues,
  };
  // TODO: error kezelése
  const { error } = await useCustomFetch({
    path: `${AUTH}/${SIGNUP}`,
    method: FetchMethods.POST,
    body: {
      email: signUpFormData.value.email,
      fullName: signUpFormData.value.fullName,
      telephoneNumber: signUpFormData.value.telephoneNumber,
      address: `${signUpFormData.value.zipCode} ${signUpFormData.value.city}, ${signUpFormData.value.streetAddress}`,
      password:
        currentStep.value === CourseApplySteps.NewUserDataAdd
          ? null
          : signUpFormData.value.password,
    },
  });
  if (!error.value) {
    currentStep.value = CourseApplySteps.Apply;
  }
};

const onSubmit = handleSubmit(async (values: ApplyCourse) => {
  switch (currentStep.value) {
    case CourseApplySteps.Initial: {
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
        currentStep.value = CourseApplySteps.ExistingUserLogin;
      } else {
        currentStep.value = CourseApplySteps.NewUserDataAdd;
      }
      break;
    }
    case CourseApplySteps.ExistingUserLogin: {
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
        currentStep.value = CourseApplySteps.Apply;
      }
      break;
    }
    case CourseApplySteps.NewUserDataAdd: {
      await handleUserDataSave(values);
      break;
    }
    case CourseApplySteps.NewUserDataAddWithSignUp: {
      await handleUserDataSave(values);
      break;
    }
    case CourseApplySteps.Apply: {
      applyFormData.value = {
        ...applyFormData.value,
        ...values,
      };

      const applyRequestBody: ApplyCourse = {
        courseId: props.courseId,
        children: applyFormData.value.children,
      };

      if (isDataToBeSaved && signUpFormData.value) {
        applyRequestBody.userEmail = signUpFormData.value.email;
      }

      // TODO: error kezelés
      const { data } = await useCustomFetch<Reservation>({
        path: userStore.user._id
          ? `${RESERVATION}/${LOGGED_IN_SAVE}`
          : `${RESERVATION}/${SAVE}`,
        method: FetchMethods.POST,
        isAuthenticated: !!userStore.user._id,
        body: applyRequestBody,
      });

      if (data) {
        userStore.addNewReservation(data.value);
        currentStep.value = CourseApplySteps.ApplySuccess;
      }
      break;
    }
  }
});
</script>
