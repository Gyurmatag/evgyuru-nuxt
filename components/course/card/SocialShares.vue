<template>
  <ClientOnly>
    <!-- TODO: dinamikus URL -->
    <share-network
      network="facebook"
      :url="url"
      :title="title"
      :description="description"
    >
      <div
        class="rounded-md bg-gray-100 p-2 transition duration-300 ease-in-out hover:bg-gray-200 dark:bg-gray-500 dark:hover:bg-gray-600"
      >
        <common-icon-facebook-share></common-icon-facebook-share>
      </div>
    </share-network>
  </ClientOnly>
</template>

<script setup lang="ts">
defineProps({
  url: {
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
});
</script>
