<template>
  <div
    :class="wrapperClass"
    class="flex flex-col items-center space-x-0 space-y-2 md:flex-row md:items-start md:space-x-2 md:space-y-0"
  >
    <input
      :id="name"
      type="checkbox"
      :value="true"
      :name="name"
      :class="inputClass"
      @input="handleChange"
    />
    <label :class="labelClass" :for="name" class="text-center md:text-left">
      {{ $t(labelKey) }}
    </label>
  </div>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";

const props = defineProps({
  name: {
    type: String,
    default: "",
  },
  value: {
    type: Boolean,
    default: false,
  },
  wrapperClass: {
    type: String,
    default: "flex",
  },
  labelKey: {
    type: String,
    default: "common.nothing",
  },
  labelClass: {
    type: String,
    default:
      "flex cursor-pointer justify-center text-gray-800 dark:text-gray-300",
  },
  inputClass: {
    type: String,
    default:
      "md:h-5 md:w-5 w-7 h-7 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 transition duration-300 ease-in-out focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500",
  },
});

const { handleChange } = useField(props.name, undefined, {
  type: "checkbox",
  valueProp: props.value,
  initialValue: false,
  uncheckedValue: false,
  checkedValue: true,
});
</script>
