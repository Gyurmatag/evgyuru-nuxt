<template>
  <div class="mx-4 mb-4 space-y-2 md:space-y-5">
    <div class="flex md:justify-center">
      <common-card-item
        :icon-name="'mdi:map-marker'"
        :value-text="`${city}, ${streetAddress}`"
      ></common-card-item>
    </div>
    <div
      class="flex flex-col content-start justify-between space-y-2 md:space-y-0 lg:flex-row"
    >
      <common-card-item
        :icon-name="'mdi:cash'"
        :value-text="$t('common.priceInHuf', { price })"
      ></common-card-item>
      <common-card-item
        :icon-name="'mdi:tally-mark-4'"
        :value-text="$t('common.occasions', { occasions })"
      ></common-card-item>
      <common-card-item
        :icon-name="'mdi:calendar-range-outline'"
        :value-text="$dateIntervalFormat(dateFrom, dateTo)"
      ></common-card-item>
      <common-card-item
        :icon-name="'mdi:account'"
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
