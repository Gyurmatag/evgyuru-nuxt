<template>
  <div class="w-full space-y-4 p-5 text-center">
    <img :alt="imgName" :src="`/${imgName}.png`" class="m-auto h-20" />
    <div class="text-xl text-gray-800 dark:text-gray-200">
      {{ reasonTitle }}
    </div>
    <div class="text-gray-600 dark:text-gray-400">
      {{ reasonDescription }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  imgName: {
    type: String,
    required: true,
  },
  reasonTitle: {
    type: String,
    required: true,
  },
  reasonDescription: {
    type: String,
    required: true,
  },
});
</script>
