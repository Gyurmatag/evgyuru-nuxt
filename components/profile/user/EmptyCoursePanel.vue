<template>
  <div class="text-sm text-gray-700 dark:text-gray-400">
    <p>{{ $t("profile.user.reservations.empty") }}</p>
    <p>
      <nuxt-link
        to="/projektek/61ed941fd0bd9a48509bee27"
        class="font-bold underline underline-offset-1 transition duration-300 ease-in-out hover:text-gray-900 dark:hover:text-gray-200"
      >
        {{ $t("common.here") }}
      </nuxt-link>
      {{ $t("profile.user.reservations.moreCourses") }}
    </p>
  </div>
</template>
