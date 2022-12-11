<template>
  <!-- TODO: kérdés, hogy kell-e ez a wrapper class??-->
  <div :class="wrapperClass" class="w-full">
    <div class="mb-1 flex justify-center space-x-2">
      <label :class="labelClass" :for="name || inputId">
        <!-- TODO: itt nyelvesítés labelnél -->
        {{ label }}
      </label>
      <span
        v-if="infoHint"
        class="cursor-pointer rounded-md border border-blue-100 bg-gray-100 px-2 text-sm text-blue-600 transition duration-300 ease-in-out hover:bg-gray-200 dark:bg-gray-600 dark:text-blue-400 dark:hover:bg-gray-500"
        @click="infoHintActive = !infoHintActive"
      >
        ?
      </span>
    </div>
    <!-- TODO: ez a hint komponens kiszervezése commonban -->
    <div :class="{ 'mb-2': infoHint }">
      <common-transition-expand>
        <div
          v-if="infoHintActive"
          class="rounded-lg bg-blue-50 text-sm text-gray-800 opacity-80 dark:bg-gray-800 dark:text-gray-300"
        >
          <div class="p-2">{{ $t(infoHint) }}</div>
        </div>
      </common-transition-expand>
    </div>
    <div class="flex flex-row">
      <div class="flex h-11" :class="inputWrapperClassRef">
        <!--TODO: basis-full jó megoldás-e? -->
        <component
          :is="isTextArea ? 'textarea' : 'input'"
          :id="name || inputId"
          ref="inputElement"
          v-maska="inputMask"
          :name="name"
          class="w-full bg-gray-50 focus:outline-none dark:bg-gray-700 dark:text-white"
          :type="typeRef"
          :value="inputValue"
          @input="handleChange"
          @blur="handleCustomBlur"
          @focus="handleInputFocus"
        />
        <!--TODO: nem helyes HTML tag -->
        <div
          v-if="inputValue && isInputFocused"
          class="material-icons-outlined cursor-pointer px-2 text-gray-800 dark:text-gray-300 md:hidden"
          @mousedown="resetFieldCustom"
        >
          close
        </div>
      </div>
      <button
        v-if="isRemoveInputActive"
        class="material-icons-outlined ml-3 h-10 w-10 rounded-lg border border-2 border-red-600 text-xs text-gray-800 transition duration-300 hover:bg-red-50 dark:text-gray-200 dark:hover:bg-red-500"
        type="button"
        @click="emit('deleteInput')"
      >
        close
      </button>
      <div
        v-if="type === 'password'"
        class="material-icons-outlined ml-2 flex cursor-pointer items-center rounded-lg border border-gray-300 bg-gray-50 px-2 text-gray-600 transition duration-300 ease-in-out hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
        @click="togglePasswordVisibility"
      >
        {{ typeRef === "password" ? "visibility" : "visibility_off" }}
      </div>
    </div>
    <common-transition-expand>
      <span
        v-if="(errorMessage && meta.touched) || externalErrorMessage"
        class="text-left text-sm text-red-500"
      >
        {{ $t(errorMessage || externalErrorMessage) }}
      </span>
    </common-transition-expand>
  </div>
</template>

<script setup lang="ts">
import {useField} from "vee-validate";

const props = defineProps({
  // TODO: type-ot tipizálni
  type: {
    type: String,
    default: "text",
  },
  isTextArea: {
    type: Boolean,
    default: false,
  },
  value: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    required: true,
  },
  inputId: {
    type: String,
    default: null,
  },
  label: {
    type: String,
    required: true,
  },
  externalErrorMessage: {
    type: String,
    required: false,
    default: null,
  },
  infoHint: {
    type: String,
    required: false,
    default: null,
  },
  isRemoveInputActive: {
    type: Boolean,
    required: false,
    default: false,
  },
  wrapperClass: {
    type: String,
    default: "flex flex-col",
  },
  labelClass: {
    type: String,
    default: "text-gray-800 dark:text-gray-300",
  },
  inputWrapperClass: {
    type: String,
    default:
      "basis-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 transition duration-300 ease-in-out focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500",
  },
  inputMask: {
    type: String,
    default: null,
  },
});

const inputElement = ref(null);
const infoHintActive = ref(false);
const isInputFocused = ref(false);
const fieldResetActive = ref(false);
const typeRef = ref(props.type);
const inputWrapperClassRef = ref(props.inputWrapperClass);

const emit = defineEmits<{
  (e: "deleteInput"): void;
}>();

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
  resetField,
} = useField(props.name, undefined, {
  initialValue: props.value,
});

const resetFieldCustom = () => {
  resetField({
    value: "",
  });
  fieldResetActive.value = true;
};

// TODO: event type-ja mi? Ki kell majd egészíteni
const handleCustomBlur = (event) => {
  isInputFocused.value = false;
  handleBlur(event);
  if (fieldResetActive.value) {
    inputElement.value.focus();
    fieldResetActive.value = false;
  }
  inputWrapperClassRef.value = `${props.inputWrapperClass} border-gray-300 dark:border-gray-600`;
};

// TODO: lehet szebben is meg lehet oldani a focus-os border színezést
const handleInputFocus = () => {
  isInputFocused.value = true;
  if (meta.touched && !meta.valid) {
    inputWrapperClassRef.value = `${props.inputWrapperClass} border-red-300 dark:border-red-300`;
  } else if (meta.valid) {
    inputWrapperClassRef.value = `${props.inputWrapperClass} border-green-500 dark:border-green-500`;
  }
};

const togglePasswordVisibility = () => {
  if (typeRef.value === "password") {
    typeRef.value = "text";
  } else {
    typeRef.value = "password";
  }
};

// TODO: kérdéses, hogy mennyire szép. Esetleg Githubon megkérdezni? async watch?
watch(
  () => props.value,
  (newValue: string) => {
    handleChange(newValue);
  }
);

// TODO: ezt lehet vajon szebben, úgy hogy nem az errorMessage-et nézem?
watch(errorMessage, (newErrorMessage) => {
  if (newErrorMessage) {
    inputWrapperClassRef.value = `${props.inputWrapperClass} border-red-300 dark:border-red-300`;
  } else {
    inputWrapperClassRef.value = `${props.inputWrapperClass} border-green-500 dark:border-green-500`;
  }
});
</script>
