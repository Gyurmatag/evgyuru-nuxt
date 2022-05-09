<template>
  <div class="space-y-2">
    <common-text-input
      name="email"
      type="email"
      :label="$t('auth.form.email')"
    />
    <div
      class="rounded-md border border-blue-400 p-2 text-sm text-gray-800 opacity-80 dark:text-gray-300"
    >
      {{ $t(hintTranslateKey) }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  hintTranslateKey: {
    type: String,
    default: "auth.form.noProfileHint",
  },
});
</script>
