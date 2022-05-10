<template>
  <div :class="wrapperClass">
    <label :class="labelClass" :for="name">
      {{ label }}
    </label>
    <input
      :id="name"
      :name="name"
      :type="type"
      :value="inputValue"
      :class="[
        {
          'border-red-300 focus:border-red-500 dark:border-red-300 dark:focus:border-red-500':
            meta.touched && !meta.valid,
          'focus:border-green-500 dark:focus:border-green-500': meta.valid,
        },
        inputClass,
      ]"
      @input="handleChange"
      @blur="handleBlur"
    />
    <common-transition-expand>
      <span
        v-if="errorMessage && meta.touched"
        class="text-left text-sm text-red-500"
      >
        {{ $t(errorMessage) }}
      </span>
    </common-transition-expand>
  </div>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";

const props = defineProps({
  // TODO: type-ot tipizálni
  type: {
    type: String,
    default: "text",
  },
  value: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  wrapperClass: {
    type: String,
    default: "flex flex-col",
  },
  labelClass: {
    type: String,
    default: "text-gray-800 dark:text-gray-300",
  },
  inputClass: {
    type: String,
    default:
      "rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 transition duration-300 ease-in-out focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500",
  },
});

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(props.name, undefined, {
  initialValue: props.value,
});
</script>
