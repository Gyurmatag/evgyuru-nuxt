<template>
  <nav
    class="nav-bar fixed inset-x-0 z-50 h-24 border-b-2 border-gray-200 border-opacity-50 bg-white text-gray-900 dark:bg-gray-900"
    :class="{ 'is-hidden': !showNavBar }"
  >
    <div class="mx-auto max-w-6xl">
      <div class="flex justify-between px-4">
        <div class="flex space-x-4">
          <div class="flex md:hidden" @click="toggleMobileMenu">
            <button
              type="button"
              class="text-gray-800 hover:text-gray-700 focus:outline-none dark:text-gray-100 dark:hover:text-gray-400"
            >
              <svg
                id="hamburgerSvg"
                viewBox="0 0 24 24"
                class="h-6 w-6 fill-current"
              >
                <path
                  id="hamburgerSvgPath"
                  fill-rule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                ></path>
              </svg>
            </button>
          </div>
          <nuxt-link class="mr-4 inline-block p-1" to="/">
            <img
              alt="Évgyűrű logó"
              src="/logo.png"
              class="h-20 object-contain"
            />
          </nuxt-link>
        </div>
        <div class="flex items-center space-x-4">
          <nuxt-link
            class="hidden rounded-md p-1.5 align-bottom transition duration-300 ease-in-out hover:text-blue-800 dark:text-white dark:hover:text-blue-300 md:inline-block"
            to="/pedagogusoknak"
            active-class="underline underline-offset-8"
          >
            {{ $t("nav.forTeachers") }}
          </nuxt-link>
          <nuxt-link
            class="hidden rounded-md border-2 border-manocska p-1.5 align-bottom transition duration-300 ease-in-out hover:bg-orange-100 dark:text-white dark:hover:bg-orange-900 md:inline-block"
            :to="'/projektek/61ed941fd0bd9a48509bee27'"
          >
            {{ $t("nav.manocska") }}
          </nuxt-link>
          <nuxt-link
            class="hidden rounded-md bg-blue-600 p-2 align-bottom text-white transition duration-300 ease-in-out hover:bg-blue-800 md:inline-block"
            to="/tamogatas"
          >
            {{ $t("nav.donate") }}
          </nuxt-link>
          <nuxt-link
            v-if="!userStore.user.accessToken"
            to="/autentikacio/bejelentkezes"
          >
            <common-icon-account-circle
              class="w-10 cursor-pointer fill-gray-600 transition duration-300 ease-in-out hover:fill-gray-700 dark:fill-gray-500 dark:hover:fill-gray-400"
            ></common-icon-account-circle>
          </nuxt-link>
          <nuxt-link
            v-else
            to="/profilom"
            class="cursor-pointer rounded-full border border-blue-800 bg-blue-50 p-2 text-gray-800 transition duration-300 ease-in-out hover:bg-blue-100 dark:border-blue-700 dark:bg-transparent dark:text-gray-300 dark:hover:bg-black"
          >
            {{ userStore.monogram }}
          </nuxt-link>
        </div>
      </div>
    </div>
    <common-transition-expand>
      <ul
        v-if="showMobileMenu"
        ref="mobileMenuElement"
        class="mt-2 flex-col space-y-4 border-b-2 border-gray-200 border-opacity-50 bg-white dark:bg-gray-900"
      >
        <li
          class="flex cursor-pointer px-5 py-2 text-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:text-gray-100"
          @click="navigateToForTeachers"
        >
          {{ $t("nav.forTeachers") }}
        </li>
        <li
          class="flex cursor-pointer px-5 py-2 text-gray-800 dark:text-gray-100"
          @click="navigateToManocskaProject"
        >
          {{ $t("nav.manocska") }}
        </li>
        <li
          class="flex cursor-pointer px-5 py-2 text-gray-800 dark:text-gray-100"
          @click="navigateToDonate"
        >
          {{ $t("nav.donate") }}
        </li>
      </ul>
    </common-transition-expand>
  </nav>
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/user";

const userStore = useUserStore();

const showNavBar = useState<boolean>("showNavBar", () => true);
const lastScrollPosition = useState<number>("lastScrollPosition", () => 0);
const showMobileMenu = ref(false);
const scrollOffset = 40;
const mobileMenuElement = ref<HTMLElement>(null);

onClickOutside(mobileMenuElement, (element: PointerEvent) => {
  if (
    showMobileMenu.value &&
    (element.target as HTMLElement).id !== "hamburgerSvg" &&
    (element.target as HTMLElement).id !== "hamburgerSvgPath"
  ) {
    showMobileMenu.value = false;
  }
});

onMounted(() => {
  lastScrollPosition.value = window.scrollY;
  window.addEventListener("scroll", onScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
});

const onScroll = () => {
  if (window.top.scrollY < 0) {
    return;
  }
  if (Math.abs(window.top.scrollY - lastScrollPosition.value) < scrollOffset) {
    return;
  }
  showNavBar.value = window.top.scrollY < lastScrollPosition.value;
  showMobileMenu.value = false;
  lastScrollPosition.value = window.top.scrollY;
};

const toggleMobileMenu = () => (showMobileMenu.value = !showMobileMenu.value);

const navigateToForTeachers = async () => {
  await navigateTo("/pedagogusoknak/bullying/temanap");
  showMobileMenu.value = false;
};

const navigateToManocskaProject = async () => {
  await navigateTo("/projektek/61ed941fd0bd9a48509bee27");
  showMobileMenu.value = false;
};

const navigateToDonate = async () => {
  await navigateTo("/tamogatas");
  showMobileMenu.value = false;
};
</script>

<style>
.nav-bar {
  transform: translateY(0);
  transition: transform 300ms linear;
}

.nav-bar.is-hidden {
  transform: translateY(-100%);
}
</style>
