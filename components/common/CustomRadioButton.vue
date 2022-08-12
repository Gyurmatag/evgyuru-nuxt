<template>
  <ul class="flex space-x-2">
    <li>
      <input
        id="activeReservations"
        v-model="value"
        class="peer sr-only"
        type="radio"
        value="true"
        :name="props.name"
      />
      <label
        class="flex cursor-pointer rounded-lg border border-gray-300 bg-white p-3 transition duration-300 ease-in-out hover:bg-gray-50 focus:outline-none peer-checked:border-transparent peer-checked:ring-2 peer-checked:ring-green-500 dark:bg-gray-700"
        for="activeReservations"
      >
        {{ $t("profile.user.reservations.activeReservations") }}
      </label>
    </li>

    <li>
      <input
        id="pastReservations"
        v-model="value"
        class="peer sr-only"
        type="radio"
        value="false"
        :name="props.name"
      />
      <label
        class="flex cursor-pointer rounded-lg border border-gray-300 bg-white p-3 transition duration-300 ease-in-out hover:bg-gray-50 focus:outline-none peer-checked:border-transparent peer-checked:ring-2 peer-checked:ring-red-500 dark:bg-gray-700"
        for="pastReservations"
      >
        {{ $t("profile.user.reservations.pastReservations") }}
      </label>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";

const props = defineProps({
  name: {
    type: String,
    default: "",
  },
});

const { value } = useField(props.name, undefined, {
  type: "radio",
  initialValue: true,
});
</script>
