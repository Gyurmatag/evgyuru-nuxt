<template>
  <div :class="wrapperClass" class="w-full">
    <input
      :id="name"
      type="checkbox"
      :value="true"
      :name="name"
      :class="inputClass"
      @input="handleChange"
    />
    <label :class="labelClass" :for="name"></label>
  </div>
</template>

<script setup>
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
    default: "flex flex-col space-y-2 items-center",
  },
  labelClass: {
    type: String,
    default:
      "flex cursor-pointer justify-center text-gray-800 dark:text-gray-300",
  },
  inputClass: {
    type: String,
    default:
      "h-5 w-5 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 transition duration-300 ease-in-out focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500",
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
