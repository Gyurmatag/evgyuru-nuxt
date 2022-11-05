<template>
  <div class="flex flex-col items-center dark:bg-gray-700">
    <common-page-head :subtitle="'page.title.forTeachers'"></common-page-head>
    <div class="mt-4 flex space-x-2">
      <nuxt-link
        class="rounded-md border-2 border-blue-200 p-2 text-gray-800 transition duration-300 ease-in-out hover:bg-gray-100 dark:border-blue-400 dark:text-gray-300 dark:text-gray-300 dark:hover:bg-gray-600"
        to="/pedagogusoknak/bullying/temanap"
        active-class="dark:bg-gray-600 bg-gray-100"
      >
        {{ $t("forTeachers.themeDay") }}
      </nuxt-link>
      <nuxt-link
        class="rounded-md border-2 border-blue-200 p-2 text-gray-800 transition duration-300 ease-in-out hover:bg-gray-100 dark:border-blue-400 dark:text-gray-300 dark:text-gray-300 dark:hover:bg-gray-600"
        to="/pedagogusoknak/bullying/felhivas-cegeknek"
        active-class="dark:bg-gray-600 bg-gray-100"
      >
        {{ $t("forTeachers.forBusinesses") }}
      </nuxt-link>
      <nuxt-link
        class="rounded-md border-2 border-blue-200 p-2 text-gray-800 transition duration-300 ease-in-out hover:bg-gray-100 dark:border-blue-400 dark:text-gray-300 dark:text-gray-300 dark:hover:bg-gray-600"
        to="/pedagogusoknak/bullying/festmenyek"
        active-class="dark:bg-gray-600 bg-gray-100"
      >
        {{ $t("forTeachers.gallery") }}
      </nuxt-link>
    </div>
    <div>
      <nuxt-page />
    </div>
  </div>
</template>

<script setup lang="ts">
// TODO: azért kell ez az átirányítás, hogy megmaradjon az active class a "Pedagógusoknak" nav menüpontnál.
// Meg kell nézni, hogy lehet-e szebben megoldani
navigateTo({
  path: "/pedagogusoknak/bullying/temanap",
});
</script>