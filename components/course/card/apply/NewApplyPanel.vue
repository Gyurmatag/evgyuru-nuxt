<template>
  <div class="space-y-4">
    <common-text-input
      name="childName"
      type="text"
      :label="$t('course.apply.form.childName')"
    />
  </div>
</template>

<script setup lang="ts">
import { ApplyCourse } from "~/models/reservation";

defineProps({
  meta: {
    type: Object as PropType<ApplyCourse>,
    default: null,
  },
});
</script>
