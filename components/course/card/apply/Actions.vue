<template>
  <div class="flex flex-grow items-center justify-end space-x-2">
    <div
      v-if="
        !userStore.currentCourseReservedByUser(reservations) &&
        !isApplySuccess &&
        isDateFromAlreadyPassed
      "
      class="border-r-2 border-blue-100 p-2 text-sm text-gray-700 dark:border-blue-900 dark:text-gray-300"
    >
      <div
        v-if="isRemainingPlacesBiggerThanZero"
        class="flex items-center space-x-1"
      >
        <div
          class="flex h-6 w-6 items-center justify-center rounded-md text-gray-50 opacity-90"
          :class="calculatedRemainingPlacesClass"
        >
          <span>{{ remainingPlacesCount }}</span>
        </div>
        <div>
          <span class="hidden sm:block">{{
            $t("course.apply.remainingPlacesCountHint")
          }}</span>
          <span class="sm:hidden">{{
            $t("course.apply.remainingPlacesCountHintShort")
          }}</span>
        </div>
      </div>
      <div v-else class="text-red-600">
        {{ $t("course.apply.courseIsFull") }}
      </div>
    </div>
    <template
      v-if="
        !isApplyActive &&
        !userStore.currentCourseReservedByUser(reservations) &&
        isRemainingPlacesBiggerThanZero &&
        isDateFromAlreadyPassed
      "
    >
      <button
        v-if="isOnDetails"
        class="p-2 text-gray-700 underline decoration-blue-600 decoration-2 underline-offset-4 transition duration-300 ease-in-out hover:text-gray-900 dark:text-gray-200"
        @click="emit('update:isApplyActive', !isApplyActive)"
      >
        {{ $t("course.apply.start") }}
      </button>
      <nuxt-link
        v-else
        :to="{
          name: 'courses-courseId',
          params: { courseId, isApplyFormVisible: true },
        }"
        class="p-2 text-gray-700 underline decoration-blue-600 decoration-2 underline-offset-4 transition duration-300 ease-in-out hover:text-gray-900 dark:text-gray-200"
      >
        {{ $t("course.apply.start") }}
      </nuxt-link>
    </template>
    <common-transition-basic-transition>
      <div
        v-if="userStore.currentCourseReservedByUser(reservations)"
        class="flex items-baseline space-x-1"
      >
        <div class="font-bold text-green-700">
          {{ $t("course.apply.alreadyApplied") }}
        </div>
        <div
          v-if="
            !userStore.currentCourseReservedByUser(reservations).isActivated
          "
          class="text-sm text-gray-600 dark:text-gray-200"
        >
          {{ $t("course.apply.reservationNotActive") }}
        </div>
      </div>
    </common-transition-basic-transition>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { useUserStore } from "~/stores/user";
import { Reservation } from "~/models/reservation";

const route = useRoute();
const userStore = useUserStore();

const props = defineProps({
  reservations: {
    type: Object as PropType<[Reservation]>,
    required: true,
  },
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
  maxGroupSize: {
    type: Number,
    required: true,
  },
  remainingPlacesCount: {
    type: Number,
    required: true,
  },
  dateFrom: {
    type: String,
    required: true,
  },
  isApplySuccess: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const calculatedRemainingPlacesPercent = computed(() => {
  return (props.remainingPlacesCount / props.maxGroupSize) * 100;
});

const calculatedRemainingPlacesClass = computed(() => {
  return calculatedRemainingPlacesPercent.value < 50
    ? calculatedRemainingPlacesPercent.value > 20
      ? "bg-orange-500"
      : "bg-red-500"
    : "bg-green-500";
});

const isRemainingPlacesBiggerThanZero = computed(() => {
  return props.remainingPlacesCount > 0;
});

const isDateFromAlreadyPassed = computed(() => {
  return dayjs(new Date()).isBefore(props.dateFrom);
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
