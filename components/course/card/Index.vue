<template>
  <div
    class="m-auto flex h-auto w-full flex-col overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-800 md:w-3/5"
  >
    <!-- TODO: beégetett projekt eltávolítása -->
    <common-back-button
      v-if="isOnDetails"
      :to="route.query.fromPage || '/projektek/61ed941fd0bd9a48509bee27'"
      class="m-4 text-left"
    ></common-back-button>
    <common-transition-expand>
      <nuxt-img
        v-if="!isApplyActive"
        provider="cloudinary"
        :alt="`${title} photo`"
        :src="removeBaseUrlFromImageUrl(imageUrl)"
        class="m-auto rounded-lg lg:w-3/4 xl:w-1/2"
      />
    </common-transition-expand>
    <div class="mt-2 w-full">
      <nuxt-link
        :to="`/kurzusok/${courseId}`"
        class="mb-2 text-center text-2xl font-bold text-blue-600 transition duration-300 ease-in-out hover:text-blue-800 dark:text-gray-200 dark:hover:text-gray-400"
      >
        {{ title }}
      </nuxt-link>
      <p class="mb-2 p-2 text-center text-sm text-gray-700 dark:text-gray-300">
        {{ description }}
      </p>
      <course-card-description-items
        :city="city"
        :street-address="streetAddress"
        :price="price"
        :occasions="occasions"
        :date-from="dateFrom"
        :date-to="dateTo"
        :max-group-size="maxGroupSize"
      ></course-card-description-items>
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
              !userStore.user.accessToken ||
              (userStore.isSimpleUser && userStore.user.isActivated)
            "
            v-model:is-apply-active="isApplyActive"
            :reservations="reservations"
            :course-id="courseId"
            :is-on-details="isOnDetails"
            :max-group-size="maxGroupSize"
            :remaining-places-count="remainingPlacesCount"
            :date-from="dateFrom"
            :is-apply-success="isApplySuccess"
          ></course-card-apply-actions>
        </div>
        <div class="pb-4">
          <ClientOnly>
            <common-transition-expand>
              <course-card-apply-form
                v-if="isApplyActive"
                v-model:is-apply-active="isApplyActive"
                :course-id="courseId"
                :reservations="reservations"
                :remaining-places-count="remainingPlacesCount"
                @applied-successfully="isApplySuccess = true"
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
import { Reservation } from "~/models/reservation";

const route = useRoute();
const userStore = useUserStore();

const isApplyActive = ref(false);
const isApplySuccess = ref(false);

const shareURL = computed(
  () => `${BASE_DOMAIN_URL}/kurzusok/${props.courseId}`
);

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
  city: {
    type: String,
    required: true,
  },
  streetAddress: {
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
    type: Object as PropType<[Reservation]>,
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
