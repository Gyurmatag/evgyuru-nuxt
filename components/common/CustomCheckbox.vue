<template>
  <button
    type="button"
    class="rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 transition duration-300 ease-in-out dark:border-gray-600 dark:bg-gray-700 dark:text-white"
    :class="{
      'border border-2 border-green-600 dark:border-blue-500': checked,
    }"
    @click="handleChange(value)"
  >
    {{ label }}
  </button>
</template>

<script setup lang="ts">
import { toRefs } from "vue";
import { useField } from "vee-validate";

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

const { checked, handleChange } = useField(name, undefined, {
  type: "checkbox",
  checkedValue: props.value,
});
</script>
