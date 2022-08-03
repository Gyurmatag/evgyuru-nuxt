<template>
  <div class="my-8 flex flex-col items-center justify-center px-4 md:flex-row">
    <div class="mb-4 flex max-w-6xl flex-col items-center">
      <div class="m-8 flex flex-col items-center space-y-6">
        <h1
          class="text-center text-3xl font-black text-gray-800 dark:text-gray-200"
        >
          {{ $t("home.homeSecond.systemTitle") }}
        </h1>
        <h2 class="text-center text-lg text-gray-600 dark:text-gray-300">
          {{ $t("home.homeSecond.systemDescription") }}
        </h2>
      </div>
      <div class="flex w-full flex-col lg:flex-row">
        <common-reason-card
          :img-name="'list'"
          :reason-title-key="'home.homeSecond.systemManual.first.title'"
          :reason-description-key="'home.homeSecond.systemManual.first.description'"
        ></common-reason-card>
        <common-reason-card
          :img-name="'tick'"
          :reason-title-key="'home.homeSecond.systemManual.second.title'"
          :reason-description-key="'home.homeSecond.systemManual.second.description'"
        ></common-reason-card>
        <common-reason-card
          :img-name="'profile_manage'"
          :reason-title-key="'home.homeSecond.systemManual.third.title'"
          :reason-description-key="'home.homeSecond.systemManual.third.description'"
        ></common-reason-card>
      </div>
    </div>
  </div>
</template>
