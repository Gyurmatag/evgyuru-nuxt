<template>
  <div
    class="m-auto flex h-auto w-full flex-col space-y-5 overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-800 md:w-3/5"
  >
    <img
      alt="news photo"
      :src="imageUrl"
      class="m-auto rounded-lg p-4 lg:w-3/4 xl:w-1/2"
    />
    <div class="w-full">
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
        ></course-card-description-items>
      </div>
      <div class="border-t-2 border-t-blue-100">
        <div class="m-4 flex">
          <course-card-social-shares
            :title="title"
            :description="description"
          ></course-card-social-shares>
          <course-card-apply-actions
            v-if="!userStore.user._id || userStore.isSimpleUser"
            v-model:is-apply-active="isApplyActive"
            :course-id="courseId"
          ></course-card-apply-actions>
        </div>
        <div class="pb-4">
          <ClientOnly>
            <common-transition-expand>
              <course-card-apply-form
                v-if="isApplyActive"
                v-model:is-apply-active="isApplyActive"
                :course-id="courseId"
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

const userStore = useUserStore();

const isApplyActive = ref(false);

defineProps({
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
  imageUrl: {
    type: String,
    required: true,
  },
});
</script>
