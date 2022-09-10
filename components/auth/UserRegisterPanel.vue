<template>
  <div class="space-y-4">
    <div class="flex flex-col text-gray-800 dark:text-gray-300">
      <span v-if="isEdit" class="material-icons-outlined text-5xl font-light">
        edit
      </span>
      {{ $t(hintTranslateKey) }}
    </div>
    <div class="text-gray-500 dark:text-gray-400">
      <!-- TODO: readonly input készítése az e-mailből, mert csak így lesz jó a jelszó megjegyzés -->
      <p>{{ userEmail }}</p>
    </div>
    <common-text-input name="fullName" :label="$t('auth.form.fullName')" />
    <common-text-input
      name="telephoneNumber"
      input-mask="+36 (##) ###-####"
      :value="isEdit ? null : '+36'"
      :label="$t('auth.form.telephoneNumber')"
    />
    <common-zip-code-city-name-inputs></common-zip-code-city-name-inputs>
    <common-text-input
      name="streetAddress"
      :label="$t('auth.form.streetAddress')"
      info-hint="auth.form.addressHint"
    />
    <div v-if="isOnApplyForm" class="flex justify-center space-y-2">
      <common-text-input
        name="isDataToBeSaved"
        type="checkbox"
        :checked="isDataToBeSaved"
        :label="$t('auth.form.saveSignupDataOnCourseApply')"
        :wrapper-class="'flex flex-col space-y-2 items-center'"
        :label-class="'flex cursor-pointer justify-center text-gray-800 dark:text-gray-300'"
        :input-wrapper-class="'h-5 w-5 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 transition duration-300 ease-in-out focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500'"
        @input="updateIsDataToBeSaved"
      />
    </div>
    <div>
      <common-transition-expand>
        <div v-if="isDataToBeSaved && !isEdit" class="space-y-4">
          <common-text-input
            name="password"
            type="password"
            :label="$t('auth.form.passwordFirst')"
          />
          <common-text-input
            name="passwordConfirmation"
            type="password"
            :label="$t('auth.form.passwordAgain')"
          />
          <common-checkbox-input
            name="acceptNewsletter"
            :value="true"
            label-key="auth.form.acceptNewsletter"
            label-class="flex cursor-pointer justify-center text-sm text-gray-800 dark:text-gray-300"
          />
          <auth-accept-data-management-panel></auth-accept-data-management-panel>
        </div>
      </common-transition-expand>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  hintTranslateKey: {
    type: String,
    default: "auth.form.newProfileHint",
  },
  userEmail: {
    type: String,
    default: null,
  },
  isOnApplyForm: {
    type: Boolean,
    default: false,
  },
  isDataToBeSaved: {
    type: Boolean,
    default: true,
  },
  isEdit: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits<{
  (e: "update:isDataToBeSaved", p: boolean): void;
}>();

// TODO: event type-ja?
const updateIsDataToBeSaved = (event) => {
  emit("update:isDataToBeSaved", event.target.checked);
};
</script>
