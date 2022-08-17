<template>
  <div class="flex flex-col">
    <profile-edit />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
</script>
