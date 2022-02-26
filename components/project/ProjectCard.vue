<template>
  <router-link
    :to="{ name: 'projects-projectId', params: { projectId } }"
    class="m-auto flex h-auto w-full flex-col space-y-5 overflow-hidden rounded-lg bg-white p-4 shadow-lg transition duration-300 ease-in-out hover:cursor-pointer hover:shadow-2xl dark:bg-gray-800 md:w-3/5"
  >
    <img alt="news photo" :src="imageUrl" class="w-full object-cover" />
    <div class="w-full">
      <p
        class="mb-2 text-center text-xl font-medium text-gray-700 dark:text-gray-200"
      >
        {{ title }}
      </p>
    </div>
  </router-link>
</template>

<script setup>
defineProps({
  projectId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
</script>
