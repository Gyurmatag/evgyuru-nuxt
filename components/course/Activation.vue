<template>
  <common-activation
    :pending="pending"
    :error="!!error"
    :error-message-key="'course.apply.activation.errorMsg'"
    :success-message-key="'course.apply.activation.successMsg'"
  ></common-activation>
</template>

<script setup lang="ts">
import { useCustomFetch } from "~/composables/myFetch";
import { FetchMethods } from "~/models/enums";
import { useUserStore } from "~/stores/user";

const route = useRoute();
const userStore = useUserStore();

// TODO: error kezelése
const { error, pending } = await useCustomFetch({
  path: `${RESERVATION}/${ACTIVATION}/${route.params.activationKey}`,
  method: FetchMethods.PUT,
  initialCache: false,
  server: false,
  lazy: true,
});

// TODO: ezt szépíteni, megvizsgálni, miért nem jó error-al? Mert itt igazából az error-t kéne figyelnünk!!
watch(pending, (_) => {
  if (!error.value) {
    // TODO: miért kell ide toString()? Miért van tömbben?
    userStore.setReservationToActivated(route.params.activationKey.toString());
  }
});
</script>
