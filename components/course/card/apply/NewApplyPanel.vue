<template>
  <div class="space-y-4">
    <common-text-input
      name="childName"
      type="text"
      :label="$t('course.apply.form.childName')"
    />
    <auth-accept-data-management-panel
      v-if="!isUserWillBeRegistered"
    ></auth-accept-data-management-panel>
  </div>
</template>

<script setup lang="ts">
defineProps({
  isUserWillBeRegistered: {
    type: Boolean,
    default: false,
  },
});
</script>
