<template>
  <div>
    <nuxt-link
      :to="to"
      class="cursor-pointer text-sm text-blue-500 opacity-80 transition duration-300 ease-in-out hover:text-blue-600"
    >
      {{ $t("common.back") }}
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
defineProps({
  to: {
    type: String,
    required: true,
  },
});
</script>
