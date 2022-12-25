<template>
  <div class="flex flex-col">
    <profile-user-reservation-edit />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
</script>
