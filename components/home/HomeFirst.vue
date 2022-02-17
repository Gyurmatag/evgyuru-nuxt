<template>
  <div
    class="flex flex-col md:flex-row max-w-6xl my-8 px-4
              justify-center items-center text-center"
  >
    <div
      class="flex flex-col divide-y-2 divide-blue-600
                w-full md:w-1/2 p-4 text-xl text-left font-bold"
    >
      <div class="text-3xl font-black text-gray-800 uppercase">
        {{ $t('title.long') }}
      </div>
      <div class="text-gray-600 pt-3">
        {{ $t('homeFirst.firstRowText') }}
        <span>
          {{ $t('homeFirst.secondRowText') }}
        </span>
        {{ $t('homeFirst.thirdRowText') }}
      </div>
    </div>
    <img
      alt="main photo"
      src="https://res.cloudinary.com/gyurmatag/image/upload/v1642196641/A%20J%C3%B6v%C5%91%20a%20Gyermekek%C3%A9/tabla_gyerek.jpg"
      class="w-full md:w-1/2 rounded-md border-8 border-blue-100 border-opacity-50"
    >
  </div>
</template>
