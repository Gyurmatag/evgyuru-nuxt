<template>
  <div
    class="flex flex-col md:flex-row max-w-6xl my-8 px-4
              justify-center items-center text-center"
  >
    <div class="w-full md:w-1/2 p-4 text-xl text-left font-bold uppercase">
      <div class="rounded-lg text-gray-800">
        {{ $t('title.long') }}
      </div>
      <div class="text-gray-100">
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
      class="w-full md:w-1/2 rounded-lg shadow-blue-900 shadow-2xl"
    >
  </div>
</template>
