<template>
  <div class="flex flex-col items-center justify-center space-y-3">
    <div
      class="pt-12 text-center text-3xl font-bold text-gray-800 dark:text-gray-200"
    >
      {{ $t("donate.title") }}
    </div>
    <div class="flex flex-col space-y-2 pb-8 text-lg">
      <donate-with-wire></donate-with-wire>
    </div>
  </div>
</template>
