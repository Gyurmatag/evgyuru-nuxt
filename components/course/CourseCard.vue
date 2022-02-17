<template>
  <div
    class="flex flex-col space-y-5 overflow-hidden shadow-lg rounded-lg h-auto m-auto
              w-full md:w-3/5 bg-white"
  >
    <img alt="news photo" :src="imageUrl" class="lg:w-3/4 xl:w-1/2 rounded-lg m-auto">
    <div class="w-full">
      <router-link
        :to="{ name: 'courses-courseId', params: { courseId }}"
        class="text-center text-blue-600 text-2xl font-bold mb-2
               transition duration-300 ease-in-out hover:text-blue-800"
      >
        {{ title }}
      </router-link>
      <p class="text-center text-sm text-gray-700 mb-2">
        {{ description }}
      </p>
      <div class="flex items-center justify-center border-t-2 border-t-blue-100">
        <ClientOnly>
          <share-network
            network="facebook"
            :url="'https://evgyuru-nuxt.netlify.app/courses/6202902940d4f85bd2542a26'"
            :title="title"
            :description="description"
          >
            <div class="m-2 p-2 bg-gray-100 transition duration-300 ease-in-out hover:bg-gray-200">
              <svg class="h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M11.194 17v-6.386h2.358l.353-2.5h-2.71v-1.6c0-.72.22-1.212 1.356-1.212L14 5.32V3.098A21.32 21.32 0 0 0 11.886 3c-2.1 0-3.523 1.16-3.523 3.3v1.835H6v2.5h2.365V17h2.83z" />
              </svg>
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
