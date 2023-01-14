<template>
  <div>
    <div class="mb-1 flex items-center justify-between">
      <div class="space-y-1">
        <div class="flex space-x-2 text-left">
          <!-- TODO: image kilóg az elementből, belelóg a paddingba, refakt / javítás kell -->
          <nuxt-img
            alt="course image"
            :src="removeBaseUrlFromImageUrl(courseImageUrl)"
            class="h-6 rounded-md"
          />
          <nuxt-link
            v-if="isTitleNavigationEnabled"
            :to="{
              path: `/kurzusok/${courseId}`,
              query: { fromPage: '/profilom' },
            }"
            class="text-lg font-bold text-gray-800 dark:text-gray-200"
          >
            {{ courseTitle }}
          </nuxt-link>
          <p v-else class="text-lg font-bold text-gray-800 dark:text-gray-200">
            {{ courseTitle }}
          </p>
        </div>
        <div
          class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400"
        >
          <Icon
            class="text-gray-700 dark:text-gray-300"
            name="mdi:calendar-range-outline"
          />
          <span> {{ courseDateInterval }}</span>
        </div>
      </div>
    </div>

    <div
      class="flex flex-col justify-start space-y-2 text-sm text-gray-600 dark:text-gray-400"
    >
      <div
        class="flex items-center space-x-2 border-b-2 border-blue-100 pb-2 dark:border-blue-800"
      >
        <Icon class="text-gray-700 dark:text-gray-300" name="mdi:account" />
        <div>
          <ul v-for="child in children" :key="child._id">
            <li>
              {{ child.name }}
            </li>
          </ul>
        </div>
      </div>
      <div v-if="areActionsVisible" class="flex space-x-2">
        <div class="flex flex-col">
          <nuxt-link
            :to="`/profilom/jelentkezesek/${reservationId}`"
            class="cursor-pointer border-b border-orange-600 transition duration-300 ease-in-out hover:text-orange-600"
          >
            {{ $t("profile.user.reservations.modify") }}
          </nuxt-link>
        </div>
        <div class="flex flex-col">
          <!--TODO: itt alsó piros vonal nem jó lenyitásánál -->
          <button
            class="cursor-pointer border-b border-red-600 text-left transition duration-300 ease-in-out hover:text-red-600"
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { FetchMethods } from "~/models/enums";

const isDeleteConfirmationMessageVisible = ref(false);

defineProps({
  areActionsVisible: {
    type: Boolean,
    default: true,
  },
  isTitleNavigationEnabled: {
    type: Boolean,
    default: true,
  },
  reservationId: {
    type: String,
    required: false,
    default: "",
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
