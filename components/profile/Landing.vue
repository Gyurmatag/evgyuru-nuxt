<template>
  <div
    class="my-8 flex max-w-6xl flex-col items-center justify-center px-4 md:flex-row"
  >
    <div class="flex w-screen flex-col space-y-4 p-4">
      <div class="flex justify-between">
        <div class="text-2xl font-bold text-gray-800 dark:text-gray-200">
          {{ $t("profile.greeting", { name: userStore.user.fullName }) }}
        </div>
        <button
          class="text-sm text-red-600 hover:text-red-700"
          @click="logoutUser"
        >
          {{ $t("profile.logout") }}
        </button>
      </div>
      <profile-moderator-course-feed
        v-if="userStore.hasModeratorRole"
      ></profile-moderator-course-feed>
      <profile-user-course-feed
        v-else-if="userStore.isSimpleUser"
      ></profile-user-course-feed>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/user";

const userStore = useUserStore();

const logoutUser = async () => {
  await navigateTo({
    path: "/",
  });
  userStore.$reset();
};
</script>
