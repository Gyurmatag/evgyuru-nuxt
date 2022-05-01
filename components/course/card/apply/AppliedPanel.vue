<template>
  <div>
    <common-icon-animated-check-mark
      svg-classes="md:h-24 lg:h-28 h-20"
    ></common-icon-animated-check-mark>
    <p class="font-semibold text-gray-800 dark:text-gray-100">
      {{ $t("course.apply.form.success") }}
    </p>
    <p class="text-gray-600 dark:text-gray-300">
      {{ $t("course.apply.form.hint") }}
    </p>
  </div>
</template>
