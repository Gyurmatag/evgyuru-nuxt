<template>
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
</template>

<script setup lang="ts">
defineProps({
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
});
</script>
