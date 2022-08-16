<template>
  <div class="flex flex-col md:flex-row">
    <common-checkbox-input name="acceptDataManagement" :value="true" />
    <div class="flex flex-col space-y-3 text-left">
      <p class="text-xxs leading-3 text-gray-700 dark:text-gray-300">
        {{ $t("auth.form.acceptDataManagementHint") }}
      </p>
      <div>
        <a
          :href="dataManagementInformationLink"
          target="_blank"
          class="text-xxs leading-3 text-gray-700 underline dark:text-gray-300"
        >
          {{ $t("auth.form.acceptDataManagementLink") }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const dataManagementInformationLink = DATA_MANAGEMENT_INFORMATION;
</script>
