<template>
  <div class="cursor-auto rounded-lg bg-gray-50 p-6 shadow-md dark:bg-gray-700">
    <div class="relative mx-auto -mt-10 mb-3 w-16">
      <nuxt-img
        class="-mt-1"
        src="https://www.svgrepo.com/show/30963/cookie.svg"
        alt="Cookie Icon SVG"
      />
    </div>
    <span
      class="mb-3 block w-full text-sm leading-normal text-gray-800 dark:text-gray-200 sm:w-60"
    >
      {{ $t("page.cookies.acceptMessage") }}
    </span>
    <div class="flex items-center justify-between">
      <a
        class="mr-1 text-xs text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
        :href="dataProtectionAndDataManagementPolicyLink"
        target="_blank"
      >
        {{ $t("page.cookies.privacyPolicy") }}
      </a>
      <div class="w-1/2">
        <button
          type="button"
          class="w-full rounded-lg bg-blue-600 py-2 px-4 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-blue-700 focus:outline-none"
          @click="acceptCookies"
        >
          {{ $t("page.cookies.understand") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/user";

const dataProtectionAndDataManagementPolicyLink =
  DATA_PROTECTION_AND_DATA_MANAGEMENT_POLICY_LINK;

const userStore = useUserStore();

const acceptCookies = () => {
  userStore.$patch({
    user: {
      areCookiesAccepted: true,
    },
  });
};
</script>
