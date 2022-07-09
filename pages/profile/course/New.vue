<template>
  <div class="flex flex-col">
    <profile-moderator-course-form />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "moderator",
});
</script>
