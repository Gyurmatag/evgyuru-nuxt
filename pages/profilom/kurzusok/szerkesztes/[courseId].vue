<template>
  <div class="flex flex-col">
    <profile-moderator-course-form :is-edit="true" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "moderator",
});
</script>
