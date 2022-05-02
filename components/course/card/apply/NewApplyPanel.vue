<template>
  <div class="space-y-6">
    <common-text-input
      name="childName"
      type="text"
      :label="$t('course.apply.form.childName')"
    />
    <button
      class="rounded-md bg-green-600 p-2 align-bottom text-sm text-white transition duration-300 ease-in-out hover:bg-green-800 disabled:opacity-30 disabled:hover:bg-green-600"
      type="submit"
      :disabled="!meta.valid || isSubmitting"
    >
      {{ $t("course.apply.form.action") }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ApplyCourse } from "~/models/reservation";

defineProps({
  meta: {
    type: Object as PropType<ApplyCourse>,
    default: null,
  },
  isSubmitting: {
    type: Boolean,
    default: false,
  },
});
</script>
