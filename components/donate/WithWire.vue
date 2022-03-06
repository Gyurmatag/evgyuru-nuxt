<template>
  <div>
    <div class="divide-primary flex flex-col items-center divide-y">
      <div class="text-gray-900 dark:text-gray-100">
        {{ $t("donate.withWire.accountNameLabel") }}
      </div>
      <div class="text-gray-600 dark:text-gray-400">
        {{ $t("donate.withWire.accountName") }}
      </div>
    </div>
    <div class="divide-primary flex flex-col items-center divide-y">
      <div class="text-gray-900 dark:text-gray-100">
        {{ $t("donate.withWire.accountNumberLabel") }}
      </div>
      <div class="text-gray-600 dark:text-gray-400">
        {{ $t("donate.withWire.accountNumber") }}
      </div>
    </div>
  </div>
</template>
