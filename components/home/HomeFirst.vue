<template>
  <div
    class="my-8 flex max-w-6xl flex-col items-center justify-center px-4 text-center md:flex-row"
  >
    <div
      class="flex flex-col divide-y-2 divide-blue-600 p-4 text-left text-xl font-bold md:w-1/2"
    >
      <div
        class="text-3xl font-black uppercase text-gray-800 dark:text-gray-200"
      >
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
      src="https://res.cloudinary.com/gyurmatag/image/upload/v1652370591/%C3%89vgy%C5%B1r%C5%B1/tabla_gyerekek.jpg"
      class="w-full rounded-md border-8 border-blue-100 border-opacity-50 opacity-80 dark:border-blue-900 md:w-1/2"
    />
  </div>
</template>
