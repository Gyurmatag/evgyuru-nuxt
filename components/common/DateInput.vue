<template>
  <!-- TODO: kérdés, hogy kell-e ez a wrapper class??-->
  <div :class="wrapperClass" class="w-full">
    <div class="mb-1 flex justify-center space-x-2">
      <label :class="labelClass" :for="name">
        <!-- TODO: itt nyelvesítés labelnél -->
        {{ label }}
      </label>
    </div>
    <!-- TODO: ez így biztos jó / szép? $commonDateFormat(inputValue) nézni kell akkor a backnednél is, hogy konvertálni kell! -->
    <!-- TODO: v-model-es megoldás biztos, hogy jó? -->
    <datepicker
      :id="name"
      v-model="inputValue"
      :name="name"
      class="w-full"
      :class="[
        {
          'border-red-300 focus:border-red-500 dark:border-red-300 dark:focus:border-red-500':
            meta.touched && !meta.valid,
          'focus:border-green-500 dark:focus:border-green-500': meta.valid,
        },
        inputClass,
      ]"
      :locale="hu"
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
// TODO: miért kell importálni a DatePickert? Valmiért nem jó a pluginban.
import Datepicker from "vue3-datepicker";
import { hu } from "date-fns/locale";

const props = defineProps({
  value: {
    type: Date,
    default: new Date(),
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
  meta,
} = useField(props.name, undefined, {
  initialValue: props.value,
});
</script>
