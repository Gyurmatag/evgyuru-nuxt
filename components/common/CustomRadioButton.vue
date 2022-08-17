<template>
  <ul class="flex space-x-2 text-gray-800 dark:text-gray-200">
    <li>
      <input
        id="firstRadioId"
        v-model="value"
        class="peer sr-only"
        type="radio"
        value="true"
        :name="props.name"
      />
      <label
        class="flex cursor-pointer rounded-lg border border-gray-300 bg-white p-3 transition duration-300 ease-in-out hover:bg-gray-50 focus:outline-none peer-checked:border-transparent peer-checked:ring-2 peer-checked:ring-green-500 dark:bg-gray-700 dark:hover:bg-gray-600"
        for="firstRadioId"
      >
        {{ $t(firstRadioLabelKey) }}
      </label>
    </li>

    <li>
      <input
        id="secondRadioId"
        v-model="value"
        class="peer sr-only"
        type="radio"
        value="false"
        :name="props.name"
      />
      <label
        class="flex cursor-pointer rounded-lg border border-gray-300 bg-white p-3 transition duration-300 ease-in-out hover:bg-gray-50 focus:outline-none peer-checked:border-transparent peer-checked:ring-2 peer-checked:ring-red-500 dark:bg-gray-700 dark:hover:bg-gray-600"
        for="secondRadioId"
      >
        {{ $t(secondRadioLabelKey) }}
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
  firstRadioLabelKey: {
    type: String,
    required: true,
  },
  secondRadioLabelKey: {
    type: String,
    required: true,
  },
});

const { value } = useField(props.name, undefined, {
  type: "radio",
  initialValue: true,
});
</script>
