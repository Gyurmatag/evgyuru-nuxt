<template>
  <div
    class="flex flex-col space-y-5 overflow-hidden shadow-lg rounded-lg h-auto m-auto p-4
              w-full md:w-3/5 bg-white hover:shadow-2xl"
  >
    <img alt="news photo" :src="imageUrl" class="lg:w-3/4 xl:w-1/2 rounded-lg m-auto">
    <div class="w-full">
      <router-link
        :to="{ name: 'courses-courseId', params: { courseId }}"
        class="text-center text-gray-700 text-xl font-medium mb-2"
      >
        {{ title }}
      </router-link>
      <p class="text-center text-gray-700 mb-2">
        {{ description }}
      </p>
      <ClientOnly>
        <share-network
            network="facebook"
            :url="'https://evgyuru-nuxt.netlify.app/courses/6202902940d4f85bd2542a26'"
            :title="title"
            :description="description"
        >
          Megosztás Facebook-on
        </share-network>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup>
defineProps({
  courseId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  }
})
</script>
