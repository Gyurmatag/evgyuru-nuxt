<template>
  <div class="space-y-8">
    <div class="text-gray-500 dark:text-gray-400">
      <span class="material-icons-outlined text-6xl font-light"> face </span>
      <p>{{ userEmail }}</p>
    </div>
    <common-text-input
      name="password"
      type="password"
      :label="$t('auth.form.password')"
      :external-error-message="loginErrorKey"
    />
  </div>
</template>

<script setup lang="ts">
import { useErrorStore } from "~/stores/error";

const errorStore = useErrorStore();
const loginErrorKey = ref<string>(null);

errorStore.$subscribe((mutation) => {
  // TODO: valamiért nem jó itt a tipizálása
  loginErrorKey.value = mutation.events.newValue.messageKey;
});

defineProps({
  userEmail: {
    type: String,
    default: null,
  },
});
</script>
