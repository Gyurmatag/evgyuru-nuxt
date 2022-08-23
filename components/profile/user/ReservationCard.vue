<template>
  <div class="mb-3 flex h-10 items-center justify-between">
    <div class="space-y-1">
      <div class="flex space-x-2">
        <!-- TODO: image kilóg az elementből, belelóg a paddingba, refakt / javítás kell -->
        <img alt="course image" :src="courseImageUrl" class="h-6 rounded-md" />
        <nuxt-link
          :to="{
            name: 'kurzusok-courseId',
            params: { courseId },
            query: { fromPage: '/profilom' },
          }"
          class="text-lg font-bold text-gray-800 dark:text-gray-200"
        >
          {{ courseTitle }}
        </nuxt-link>
      </div>
      <div
        class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400"
      >
        <i class="material-icons-outlined text-gray-700 dark:text-gray-300">
          date_range
        </i>
        <span> {{ courseDateInterval }}</span>
      </div>
    </div>
    <button
      class="cursor-pointer rounded-md border-2 border-blue-800 p-1 text-sm text-gray-800 transition duration-300 ease-in-out hover:bg-blue-300 dark:text-gray-200 dark:hover:bg-blue-800"
      @click="isDetailsVisible = !isDetailsVisible"
    >
      {{ isDetailsVisible ? $t("common.lessDetails") : $t("common.details") }}
    </button>
  </div>

  <common-transition-expand>
    <div
      v-if="isDetailsVisible"
      class="flex flex-col justify-start space-y-2 text-sm text-gray-600 dark:text-gray-400"
    >
      <div
        class="flex items-center space-x-2 border-b-2 border-blue-100 pb-2 dark:border-blue-800"
      >
        <i class="material-icons-outlined text-gray-700 dark:text-gray-300">
          person
        </i>
        <div>
          <ul v-for="child in children" :key="child._id">
            <li>
              {{ child.name }}
            </li>
          </ul>
        </div>
      </div>
      <div>
        <button
          class="cursor-pointer border-b border-red-600 transition duration-300 ease-in-out hover:text-red-600"
          @click="
            isDeleteConfirmationMessageVisible =
              !isDeleteConfirmationMessageVisible
          "
        >
          {{ $t("profile.user.reservations.delete") }}
        </button>
        <common-transition-expand>
          <common-delete-confirmation-panel
            v-if="isDeleteConfirmationMessageVisible"
            confirmation-msg-key="profile.user.reservations.deleteConfirm"
            @cancel-delete="isDeleteConfirmationMessageVisible = false"
            @delete="deleteReservation(reservationId)"
          ></common-delete-confirmation-panel>
        </common-transition-expand>
      </div>
    </div>
  </common-transition-expand>
</template>

<script setup lang="ts">
import { FetchMethods } from "~/models/enums";

const isDetailsVisible = ref(false);
const isDeleteConfirmationMessageVisible = ref(false);

defineProps({
  reservationId: {
    type: String,
    required: true,
  },
  courseImageUrl: {
    type: String,
    required: true,
  },
  courseId: {
    type: String,
    required: true,
  },
  courseTitle: {
    type: String,
    required: true,
  },
  courseDateInterval: {
    type: String,
    required: true,
  },
  children: {
    type: Object as PropType<ChildrenList>,
    required: true,
  },
});

const emit = defineEmits<{
  (e: "deleteReservation", reservationId: string): void;
}>();

// TODO: error kezelés
const deleteReservation = async (reservationId: string) => {
  const { data } = await useCustomFetch({
    path: `${RESERVATION}/${reservationId}`,
    method: FetchMethods.DELETE,
    isAuthenticated: true,
  });

  if (data) {
    emit("deleteReservation", reservationId);
  }
};
</script>
