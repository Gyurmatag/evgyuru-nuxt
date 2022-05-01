<template>
  <div class="space-y-4">
    <div class="text-gray-800 dark:text-gray-300">
      {{ $t("auth.form.newProfileHint") }}
    </div>
    <div class="text-gray-500 dark:text-gray-400">
      <!-- TODO: readonly input készítése az e-mailből, mert csak így lesz jó a jelszó megjegyzés -->
      <p>{{ userEmail }}</p>
    </div>
    <common-text-input
      name="fullName"
      type="text"
      :label="$t('auth.form.fullName')"
    />
    <common-text-input
      name="telephoneNumber"
      type="text"
      :label="$t('auth.form.telephoneNumber')"
    />
    <common-text-input
      name="address"
      type="text"
      :label="$t('auth.form.address')"
    />
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
  </div>
</template>

<script setup lang="ts">
defineProps({
  userEmail: {
    type: String,
    default: null,
  },
});
</script>
