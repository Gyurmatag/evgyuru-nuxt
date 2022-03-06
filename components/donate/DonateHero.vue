<template>
  <div class="mb-4 flex flex-col items-center">
    <div class="m-8 flex flex-col items-center space-y-6">
      <h1
        class="text-center text-3xl font-black text-gray-800 dark:text-gray-200"
      >
        Segítsd alapítványunkat támogatásoddal!
      </h1>
      <h2 class="text-center text-lg text-gray-600 dark:text-gray-300">
        Miért érdemes minket támogatni?
      </h2>
    </div>
    <div class="flex w-full flex-col lg:flex-row xl:w-3/4 2xl:w-3/4">
      <donate-reason-card
        :img-name="'research'"
        :reason-title="$t('donate.reasons.reason1.title')"
        :reason-description="$t('donate.reasons.reason1.description')"
      ></donate-reason-card>
      <donate-reason-card
        :img-name="'lifelong_student'"
        :reason-title="$t('donate.reasons.reason2.title')"
        :reason-description="$t('donate.reasons.reason2.description')"
      ></donate-reason-card>
      <donate-reason-card
        :img-name="'programs'"
        :reason-title="$t('donate.reasons.reason3.title')"
        :reason-description="$t('donate.reasons.reason3.description')"
      ></donate-reason-card>
    </div>
  </div>
</template>
