<template>
  <common-page-head :subtitle="'page.title.donate'"></common-page-head>
  <div class="mb-4 flex max-w-6xl flex-col items-center">
    <div class="m-8 flex flex-col items-center space-y-6">
      <h1
        class="text-center text-3xl font-black text-gray-800 dark:text-gray-200"
      >
        {{ $t("donate.helpOurCause") }}
      </h1>
      <h2 class="text-center text-lg text-gray-600 dark:text-gray-300">
        {{ $t("donate.why") }}
      </h2>
    </div>
    <div class="flex w-full flex-col lg:flex-row">
      <common-reason-card
        :img-name="'research'"
        :reason-title-key="'donate.reasons.reason1.title'"
        :reason-description-key="'donate.reasons.reason1.description'"
      ></common-reason-card>
      <common-reason-card
        :img-name="'lifelong_student'"
        :reason-title-key="'donate.reasons.reason2.title'"
        :reason-description-key="'donate.reasons.reason2.description'"
      ></common-reason-card>
      <common-reason-card
        :img-name="'programs'"
        :reason-title-key="'donate.reasons.reason3.title'"
        :reason-description-key="'donate.reasons.reason3.description'"
      ></common-reason-card>
    </div>
  </div>
</template>
