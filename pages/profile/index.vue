<template>
  <div class="flex justify-center">
    <profile-landing />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
</script>
