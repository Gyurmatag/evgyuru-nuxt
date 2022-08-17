<template>
  <div class="flex flex-col">
    <auth-landing />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "no-auth",
});
</script>
