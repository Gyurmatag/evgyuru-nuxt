<template>
  <div
    class="flex flex-col space-x-0 space-y-3 md:flex-row md:space-y-0 md:space-x-3"
  >
    <common-text-input
      name="zipCode"
      type="text"
      input-mask="####"
      :label="$t('common.zipCode')"
      @input="searchForCity"
    />
    <common-text-input
      name="city"
      type="text"
      :label="$t('common.city')"
      :value="fetchedCityName"
      class="disabled"
      :class="isCityFetchPending ? 'animate-pulse' : ''"
    />
  </div>
</template>

<script setup lang="ts">
// TODO: miért nem jó a property hivatkozás vajon? (_value)
// TODO: error kezelés
// TODO: pending meg adat kiszervezése?
// TODO: URL kiemelése
import { City } from "~/models/city";

const fetchedCityName = ref(null);
const isCityFetchPending = ref(false);

const searchForCity = async (event: InputEvent) => {
  if (event.target._value.length === 4) {
    isCityFetchPending.value = true;
    const { data } = await useCustomFetch<City>({
      customBaseURL: "https://hur.webmania.cc/zips",
      path: `/${event.target._value}.json`,
    });
    isCityFetchPending.value = false;
    fetchedCityName.value = data.value?.zips[0]?.name;
  }
};
</script>
