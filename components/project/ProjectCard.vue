<template>
  <router-link
    :to="{ name: 'projects-projectId', params: { projectId }}"
    class="flex flex-col space-y-5 overflow-hidden shadow-lg rounded-lg h-auto m-auto p-4
                      w-full md:w-3/5 bg-white transition duration-300 ease-in-out hover:shadow-2xl hover:cursor-pointer"
  >
    <img alt="news photo" :src="imageUrl" class="w-full object-cover">
    <div class="w-full">
      <p class="text-center text-gray-700 text-xl font-medium mb-2">
        {{ title }}
      </p>
    </div>
  </router-link>
</template>

<script setup>
defineProps({
  projectId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})
</script>
