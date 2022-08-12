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

const route = useRoute();

// TODO: error kezelése
const { error, pending } = await useCustomFetch({
  path: `${RESERVATION}/${ACTIVATION}/${route.params.activationKey}`,
  method: FetchMethods.PUT,
  initialCache: false,
  server: false,
  lazy: true,
});
</script>
