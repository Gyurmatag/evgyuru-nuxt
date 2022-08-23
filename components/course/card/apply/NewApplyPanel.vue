<template>
  <div class="space-y-4">
    <div v-for="(field, idx) in fields" :key="idx">
      <common-text-input
        :name="`children[${idx}].name`"
        :label="
          fields.length > 1
            ? $t('course.apply.form.children.indexedName', { index: idx + 1 })
            : $t('course.apply.form.children.universalName')
        "
        :is-remove-input-active="fields.length > 1"
        @deleteInput="remove(idx)"
      />
    </div>
    <div class="flex justify-end">
      <button
        v-if="remainingPlacesCount - fields.length > 0"
        type="button"
        class="rounded-md border border-2 border-green-600 p-1.5 text-xs text-gray-800 transition duration-300 hover:bg-green-50 dark:text-gray-200 dark:hover:bg-green-700"
        @click="push({ name: '' })"
      >
        {{
          $t("course.apply.form.children.addMore", { index: fields.length + 1 })
        }}
      </button>
    </div>
    <auth-accept-data-management-panel
      v-if="!isUserWillBeRegisteredOrAlreadyLoggedIn"
    ></auth-accept-data-management-panel>
  </div>
</template>

<script setup lang="ts">
import { useFieldArray } from "vee-validate";

defineProps({
  isUserWillBeRegisteredOrAlreadyLoggedIn: {
    type: Boolean,
    default: false,
  },
  remainingPlacesCount: {
    type: Number,
    required: true,
  },
});

const { remove, push, fields } = useFieldArray("children");
</script>
