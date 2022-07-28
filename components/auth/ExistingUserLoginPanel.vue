<template>
  <div>
    <div class="text-gray-500 dark:text-gray-400">
      <span class="material-icons-outlined text-6xl font-light"> face </span>
      <p>{{ userEmail }}</p>
    </div>
    <common-text-input
      name="password"
      type="password"
      :label="$t('auth.form.password')"
      :external-error-message="
        responseStore.response?.message === 'error.api.invalidPassword'
          ? responseStore.response.message
          : ''
      "
    />
    <div class="mt-4 text-right">
      <a
        class="cursor-pointer text-sm text-blue-600 opacity-70 transition duration-300 ease-in-out hover:opacity-90 dark:text-blue-400"
        :class="{
          isForgotPasswordActivated:
            'cursor-default text-green-600 hover:opacity-70 dark:text-green-400',
        }"
        @click="sendPasswordResetEmail"
      >
        {{
          isForgotPasswordActivated
            ? $t("auth.form.passwordResetKeySentHintSmall")
            : $t("auth.form.forgotPassword")
        }}
      </a>
    </div>
    <common-transition-expand>
      <div v-if="isForgotPasswordActivated">
        <common-hint-card :hint-key="'auth.form.passwordResetKeySentHint'">
          <common-icon-inbox></common-icon-inbox>
        </common-hint-card>
      </div>
    </common-transition-expand>
  </div>
</template>

<script setup lang="ts">
import { useResponseStore } from "~/stores/response";
import { useCustomFetch } from "~/composables/myFetch";
import { FetchMethods } from "~/models/enums";

const responseStore = useResponseStore();

const isForgotPasswordActivated = ref<boolean>(false);

const props = defineProps({
  userEmail: {
    type: String,
    default: null,
  },
});

const sendPasswordResetEmail = async () => {
  if (!isForgotPasswordActivated.value) {
    const { error } = await useCustomFetch({
      path: `${AUTH}/${PASSWORD_RESET}`,
      method: FetchMethods.PUT,
      body: {
        email: props.userEmail,
      },
      initialCache: false,
    });
    if (!error.value) {
      isForgotPasswordActivated.value = true;
    }
  }
};
</script>
