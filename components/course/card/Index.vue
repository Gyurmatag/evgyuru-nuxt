<template>
  <div
    class="m-auto flex h-auto w-full flex-col overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-800 md:w-3/5"
  >
    <common-transition-expand>
      <img
        v-if="!isApplyActive"
        alt="news photo"
        :src="imageUrl"
        class="m-auto rounded-lg lg:w-3/4 xl:w-1/2"
      />
    </common-transition-expand>
    <div class="mt-2 w-full">
      <nuxt-link
        :to="{ name: 'courses-courseId', params: { courseId } }"
        class="mb-2 text-center text-2xl font-bold text-blue-600 transition duration-300 ease-in-out hover:text-blue-800 dark:text-gray-200 dark:hover:text-gray-400"
      >
        {{ title }}
      </nuxt-link>
      <p class="mb-2 p-2 text-center text-sm text-gray-700 dark:text-gray-300">
        {{ description }}
      </p>
      <div class="m-4 flex flex-col content-start justify-between lg:flex-row">
        <course-card-description-items
          :price="price"
          :occasions="occasions"
          :date-from="dateFrom"
          :date-to="dateTo"
          :max-group-size="maxGroupSize"
        ></course-card-description-items>
      </div>
      <div class="border-t-2 border-t-blue-100">
        <div class="m-4 flex">
          <common-transition-expand>
            <div v-if="!isApplyActive">
              <course-card-social-shares
                :url="shareURL"
                :title="title"
                :description="description"
              ></course-card-social-shares>
            </div>
          </common-transition-expand>
          <course-card-apply-actions
            v-if="
              !userStore.user._id ||
              (userStore.isSimpleUser && userStore.user.isActivated)
            "
            v-model:is-apply-active="isApplyActive"
            :course-id="courseId"
            :is-on-details="isOnDetails"
            :max-group-size="maxGroupSize"
            :remaining-places-count="remainingPlacesCount"
          ></course-card-apply-actions>
        </div>
        <div class="pb-4">
          <ClientOnly>
            <common-transition-expand>
              <course-card-apply-form
                v-if="isApplyActive"
                v-model:is-apply-active="isApplyActive"
                :course-id="courseId"
                :remaining-places-count="remainingPlacesCount"
              ></course-card-apply-form>
            </common-transition-expand>
          </ClientOnly>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/user";
import { ReservationList } from "~/models/reservation";

const userStore = useUserStore();
const route = useRoute();

const isApplyActive = ref(false);

const shareURL = computed(() => `${BASE_DOMAIN_URL}${route.fullPath}`);

const props = defineProps({
  courseId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  occasions: {
    type: Number,
    required: true,
  },
  dateFrom: {
    type: String,
    required: true,
  },
  dateTo: {
    type: String,
    required: true,
  },
  maxGroupSize: {
    type: Number,
    required: true,
  },
  reservations: {
    type: Object as PropType<ReservationList>,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  isOnDetails: {
    type: Boolean,
    required: true,
  },
});

const remainingPlacesCount = computed(() => {
  return props.reservations.length
    ? Math.abs(
        props.reservations
          .filter((reservation) => reservation.isActivated)
          .reduce(
            (count, current) => count + current.children.length,
            -props.maxGroupSize
          )
      )
    : props.maxGroupSize;
});
</script>
