<template>
  <nuxt-img
      provider="cloudinary"
      alt="news photo"
      :src="imageSrc"
      class="m-auto w-full rounded-md border-8 border-blue-100 border-opacity-50 opacity-80 dark:border-blue-900 sm:w-3/4 md:w-1/2 lg:w-2/5"
  />
</template>

<script setup lang="ts">
defineProps({
  imageSrc: {
    type: String,
    required: true
  }
});
</script>