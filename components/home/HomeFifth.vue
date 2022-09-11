<template>
  <!--TODO: keret template készítése -->
  <div class="my-8 flex flex-col items-center justify-center px-4 md:flex-row">
    <div class="mb-4 flex max-w-6xl flex-col items-center">
      <div class="m-8 flex flex-col items-center space-y-6">
        <h1 class="text-center text-xl text-gray-800 dark:text-gray-200">
          {{ $t("home.homeFifth.videoTitle") }}
        </h1>
      </div>
      <div class="rounded-md bg-blue-100 p-4 dark:bg-gray-700">
        <!--TODO beégetett mérettel mizu legyen? -->
        <iframe
          class="video"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/ijMpEziJcMI"
          allow="accelerometer; autoplay; encrypted-media; gyroscope;"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </div>
</template>

<style scoped>
.video {
  aspect-ratio: 16 / 9;
  width: 100%;
}
</style>
