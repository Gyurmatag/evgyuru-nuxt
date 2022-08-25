<template>
  <div class="mx-4 mb-4 space-y-2 md:space-y-5">
    <div class="flex md:justify-center">
      <common-card-item
        :icon-name="'location_on'"
        :value-text="`${city}, ${streetAddress}`"
      ></common-card-item>
    </div>
    <div class="flex flex-col content-start justify-between lg:flex-row space-y-2 md:space-y-0">
      <common-card-item
        :icon-name="'payments'"
        :value-text="$t('common.priceInHuf', { price })"
      ></common-card-item>
      <common-card-item
        :icon-name="'numbers'"
        :value-text="$t('common.occasions', { occasions })"
      ></common-card-item>
      <common-card-item
        :icon-name="'date_range'"
        :value-text="$dateIntervalFormat(dateFrom, dateTo)"
      ></common-card-item>
      <common-card-item
        :icon-name="'person'"
        :value-text="$t('common.maxGroupSize', { maxGroupSize })"
      ></common-card-item>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  city: {
    type: String,
    required: true,
  },
  streetAddress: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  occasions: {
    type: Number,
    required: true,
  },
  dateFrom: {
    type: String,
    required: true,
  },
  dateTo: {
    type: String,
    required: true,
  },
  maxGroupSize: {
    type: Number,
    required: true,
  },
});
</script>
