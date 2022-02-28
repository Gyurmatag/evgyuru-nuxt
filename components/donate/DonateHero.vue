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
    <div class="flex w-4/5 flex-col md:flex-row lg:w-3/4 xl:w-1/2">
      <donate-reason-card
        :reason-title="'Indok 1'"
        reason-description="'Indok leírás Indok leírás Indok leírás Indok leírás Indok leírás'"
      ></donate-reason-card>
      <donate-reason-card
        :reason-title="'Indok 2'"
        reason-description="'Indok leírás Indok leírás Indok leírás Indok leírás Indok leírás'"
      ></donate-reason-card>
      <donate-reason-card
        :reason-title="'Indok 3'"
        reason-description="'Indok leírás Indok leírás Indok leírás Indok leírás Indok leírás'"
      ></donate-reason-card>
    </div>
  </div>
</template>
