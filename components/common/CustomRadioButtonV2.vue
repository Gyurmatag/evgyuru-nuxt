<template>
  <li>
    <input
      :id="props.value"
      class="peer sr-only"
      type="radio"
      :name="name"
      :value="props.value"
      @input="customHandleChange"
      @blur="handleBlur"
    />
    <label
      class="flex cursor-pointer rounded-lg border border-gray-300 bg-white p-3 text-left transition duration-300 ease-in-out hover:bg-gray-50 focus:outline-none peer-checked:border-transparent peer-checked:ring-2 peer-checked:ring-green-500 dark:bg-gray-700 dark:hover:bg-gray-600"
      :for="props.value"
    >
      {{ label }}
    </label>
  </li>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";
import { toRefs } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});

const { name } = toRefs(props);

const { handleChange, handleBlur } = useField(name, undefined, {
  type: "radio",
  checkedValue: props.value,
});

// TODO: miért kell ezt így, miért nem tudja kezelni ezt?
const customHandleChange = (value) => {
  handleChange(value.target.value);
};
</script>