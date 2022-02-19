<template>
  <nav
    class="nav-bar fixed inset-x-0 h-24 border-b-2 border-gray-200 border-opacity-50 bg-white text-gray-900"
    :class="{ 'is-hidden': !showNavBar }"
  >
    <div class="mx-auto max-w-6xl px-4">
      <div class="flex justify-between">
        <div class="flex space-x-4">
          <nuxt-link class="mr-4 inline-block p-1" to="/">
            <img alt="Évgyűrű logó" src="~/assets/logo.png" class="h-20" />
          </nuxt-link>
        </div>
        <div class="flex items-center space-x-4">
          <nuxt-link
            class="inline-block rounded-md border-2 border-manocska p-1.5 align-bottom transition duration-300 ease-in-out hover:bg-orange-100"
            :to="{
              name: 'projects-projectId',
              params: { projectId: '61ed941fd0bd9a48509bee27' },
            }"
          >
            <span class="hidden sm:block">{{ $t("nav.manocska") }}</span>
            <span class="sm:hidden">{{ $t("nav.manocskaShort") }}</span>
          </nuxt-link>
          <nuxt-link
            class="inline-block rounded-md bg-blue-600 p-2 align-bottom text-white transition duration-300 ease-in-out hover:bg-blue-800"
            to="/"
          >
            {{ $t("nav.donate") }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
const showNavBar = ref(true);
const lastScrollPosition = ref(0);
const scrollOffset = 40;

onMounted(() => {
  lastScrollPosition.value = window.pageYOffset;
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
  lastScrollPosition.value = window.top.scrollY;
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
