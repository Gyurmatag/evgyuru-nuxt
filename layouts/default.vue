<template>
  <div class="flex h-screen flex-col">
    <header>
      <nav-bar />
    </header>
    <main class="flex-grow pt-24 dark:bg-gray-800">
      <slot />
      <common-cookie-accept
        v-if="!userStore.user.areCookiesAccepted"
        class="fixed bottom-5 sm:bottom-10 sm:right-10"
      ></common-cookie-accept>
    </main>
    <footer>
      <footer-bar />
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/user";

const userStore = useUserStore();
</script>
