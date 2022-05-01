<template>
  <div
    v-if="userStore.user._id"
    class="flex flex-grow items-center justify-end"
  >
    <button
      v-if="!isApplyActive && !userStore.currentCourseReservedByUser(courseId)"
      class="p-2 text-gray-700 underline decoration-blue-600 decoration-2 underline-offset-4 transition duration-300 ease-in-out hover:text-gray-900 dark:text-gray-200"
      @click="isApplyActive = !isApplyActive"
    >
      {{ $t("course.apply.start") }}
    </button>
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

const userStore = useUserStore();

const isApplyActive = useState<boolean>("isApplyActive");

defineProps({
  courseId: {
    type: String,
    required: true,
  },
});
</script>
