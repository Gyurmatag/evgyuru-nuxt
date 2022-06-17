<template>
  <div>
    <common-checkbox-input name="acceptDataManagement" :value="true" />
    <p class="text-xxs leading-3 text-gray-700 dark:text-gray-300">
      {{ $t("auth.form.acceptDataManagementHint") }}
    </p>
    <a
      :href="dataManagementInformationLink"
      target="_blank"
      class="text-xxs leading-3 text-gray-700 underline dark:text-gray-300"
    >
      {{ $t("auth.form.acceptDataManagementLink") }}
    </a>
  </div>
</template>

<script setup lang="ts">
const dataManagementInformationLink = DATA_MANAGEMENT_INFORMATION;
</script>
