<template>
  <div class="w-full space-y-4 p-5 text-center">
    <img :alt="imgName" :src="`/${imgName}.png`" class="m-auto h-20" />
    <div class="text-xl text-gray-800 dark:text-gray-200">
      {{ $t(reasonTitleKey) }}
    </div>
    <div class="text-gray-600 dark:text-gray-400">
      {{ $t(reasonDescriptionKey) }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  imgName: {
    type: String,
    required: true,
  },
  reasonTitleKey: {
    type: String,
    required: true,
  },
  reasonDescriptionKey: {
    type: String,
    required: true,
  },
});
</script>
