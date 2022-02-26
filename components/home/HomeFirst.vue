<template>
  <div
    class="my-8 flex max-w-6xl flex-col items-center justify-center px-4 text-center md:flex-row"
  >
    <div
      class="flex w-full flex-col divide-y-2 divide-blue-600 p-4 text-left text-xl font-bold md:w-1/2"
    >
      <div class="text-3xl font-black uppercase text-gray-800">
        {{ $t("title.long") }}
      </div>
      <div class="pt-3 text-gray-600 dark:text-gray-300">
        {{ $t("homeFirst.firstRowText") }}
        <span>
          {{ $t("homeFirst.secondRowText") }}
        </span>
        {{ $t("homeFirst.thirdRowText") }}
      </div>
    </div>
    <img
      alt="main photo"
      src="https://res.cloudinary.com/gyurmatag/image/upload/v1642196641/A%20J%C3%B6v%C5%91%20a%20Gyermekek%C3%A9/tabla_gyerek.jpg"
      class="w-full rounded-md border-8 border-blue-100 border-opacity-50 dark:border-blue-900 md:w-1/2"
    />
  </div>
</template>
