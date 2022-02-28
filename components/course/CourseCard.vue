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
      <router-link
        :to="{ name: 'courses-courseId', params: { courseId } }"
        class="mb-2 text-center text-2xl font-bold text-blue-600 transition duration-300 ease-in-out hover:text-blue-800 dark:text-gray-200 dark:hover:text-gray-400"
      >
        {{ title }}
      </router-link>
      <p class="mb-2 p-2 text-center text-sm text-gray-700 dark:text-gray-300">
        {{ description }}
      </p>
      <div class="m-4 flex flex-col content-start justify-between lg:flex-row">
        <common-card-item
          :icon-name="'payments'"
          :value-text="`${price} HUF`"
        ></common-card-item>
        <common-card-item
          :icon-name="'numbers'"
          :value-text="`${occasions} alkalom`"
        ></common-card-item>
        <common-card-item
          :icon-name="'date_range'"
          :value-text="`${dateFrom.substring(0, 10)} - ${dateTo.substring(
            0,
            10
          )}`"
        ></common-card-item>
      </div>
      <div
        class="flex items-center justify-center border-t-2 border-t-blue-100"
      >
        <ClientOnly>
          <share-network
            network="facebook"
            :url="'https://evgyuru-nuxt.netlify.app/courses/6202902940d4f85bd2542a26'"
            :title="title"
            :description="description"
          >
            <div
              class="m-2 bg-gray-100 p-2 transition duration-300 ease-in-out hover:bg-gray-200 dark:bg-gray-500 dark:hover:bg-gray-600"
            >
              <common-icon-facebook-share></common-icon-facebook-share>
            </div>
          </share-network>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script setup>
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
    type: Date,
    required: true,
  },
  dateTo: {
    type: Date,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});
</script>
