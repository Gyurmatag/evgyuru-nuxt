<template>
  <div
    class="flex flex-col items-center justify-center bg-blue-100 bg-opacity-10 dark:bg-gray-800"
  >
    <div
      v-if="!pending"
      class="m-8 max-w-6xl items-center justify-center rounded-lg bg-white p-4 text-center shadow-xl dark:border-gray-500 dark:bg-gray-700 sm:w-3/4 lg:w-2/5"
    >
      <common-error-panel
        v-if="error"
        :error-message-key="'auth.activation.errorMsg'"
      ></common-error-panel>
      <div v-else>
        <common-success-panel
          :success-message-key="'auth.activation.successMsg'"
        ></common-success-panel>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCustomFetch } from "~/composables/myFetch";
import { FetchMethods } from "~/models/enums";
import { useUserStore } from "~/stores/user";

const route = useRoute();
const userStore = useUserStore();

// TODO: error kezelése
const { error, pending } = await useCustomFetch({
  path: `${AUTH}/${ACTIVATION}/${route.params.activationKey}`,
  method: FetchMethods.PUT,
  initialCache: false,
  server: false,
  lazy: true,
});

// TODO: ezt szépíteni, megvizsgálni, miért nem jó error-al? Mert itt igazából az error-t kéne figyelnünk!!
watch(pending, (_) => {
  if (!error.value) {
    userStore.activateUser();
  }
});
</script>
