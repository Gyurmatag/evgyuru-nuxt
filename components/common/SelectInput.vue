<template>
  <!-- TODO: input komponensek köré wrapper komponens és slotban megoldás-->
  <!-- TODO: kérdés, hogy kell-e ez a wrapper class??-->
  <div :class="wrapperClass" class="w-full">
    <div class="mb-1 flex justify-center space-x-2">
      <label :class="labelClass" :for="name">
        <!-- TODO: itt nyelvesítés labelnél -->
        {{ label }}
      </label>
    </div>
    <!-- TODO: kérdés, hogy a v-modeles jó megoldás-e ??-->
    <select
      :id="name"
      v-model="inputValue"
      :name="name"
      class="cursor-pointer"
      :class="[
        {
          'border-red-300 focus:border-red-500 dark:border-red-300 dark:focus:border-red-500':
            meta.touched && !meta.valid,
          'focus:border-green-500 dark:focus:border-green-500': meta.valid,
        },
        inputClass,
      ]"
    >
      <!-- TODO: beégetett érték kivétele -->
      <option value="61ed941fd0bd9a48509bee27">Manócska Tanoda</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";

const props = defineProps({
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
  handleChange,
  meta,
} = useField(props.name, undefined, {
  initialValue: props.value,
});

// TODO: kérdéses, hogy mennyire szép. Esetleg Githubon megkérdezni?
watch(
  () => props.value,
  (newValue: string) => {
    handleChange(newValue);
  }
);
</script>
