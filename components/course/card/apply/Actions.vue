<template>
  <div class="flex flex-grow items-center justify-end">
    <button
      v-if="
        isOnDetails &&
        !isApplyActive &&
        !userStore.currentCourseReservedByUser(courseId)
      "
      class="p-2 text-gray-700 underline decoration-blue-600 decoration-2 underline-offset-4 transition duration-300 ease-in-out hover:text-gray-900 dark:text-gray-200"
      @click="emit('update:isApplyActive', !isApplyActive)"
    >
      {{ $t("course.apply.start") }}
    </button>
    <nuxt-link
      v-if="
        !isOnDetails &&
        !isApplyActive &&
        !userStore.currentCourseReservedByUser(courseId)
      "
      :to="{
        name: 'courses-courseId',
        params: { courseId, isApplyFormVisible: true },
      }"
      class="p-2 text-gray-700 underline decoration-blue-600 decoration-2 underline-offset-4 transition duration-300 ease-in-out hover:text-gray-900 dark:text-gray-200"
    >
      {{ $t("course.apply.start") }}
    </nuxt-link>
    <common-transition-basic-transition>
      <div
        v-if="userStore.currentCourseReservedByUser(courseId)"
        class="font-bold text-green-700"
      >
        {{ $t("course.apply.alreadyApplied") }}
      </div>
    </common-transition-basic-transition>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/user";

const route = useRoute();
const userStore = useUserStore();

defineProps({
  courseId: {
    type: String,
    required: true,
  },
  isOnDetails: {
    type: Boolean,
    required: true,
  },
  isApplyActive: {
    type: Boolean,
    required: true,
  },
});

onMounted(() => {
  if (route.params.isApplyFormVisible) {
    emit("update:isApplyActive", true);
  }
});

const emit = defineEmits<{
  (e: "update:isApplyActive", p: boolean): void;
}>();
</script>
