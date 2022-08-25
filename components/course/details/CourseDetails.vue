<template>
  <common-page-head
    :subtitle="data.title"
    :is-dynamic-data="true"
  ></common-page-head>
  <div
    class="flex flex-col items-center justify-center bg-white dark:bg-gray-800"
  >
    <div class="w-full max-w-6xl items-center justify-center p-6 text-center">
      <course-card
        :course-id="data._id"
        :title="data.title"
        :description="data.description"
        :city="data.city"
        :street-address="data.streetAddress"
        :price="data.price"
        :occasions="data.occasions"
        :date-from="data.dateFrom"
        :date-to="data.dateTo"
        :image-url="data.imageUrl"
        :max-group-size="data.maxGroupSize"
        :reservations="data.reservations"
        :is-on-details="true"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Course } from "~/models/course";

const route = useRoute();

// TODO: error kezelés
const { data } = await useCustomFetch<Course>({
  path: `/${COURSE}/${route.params.courseId}`,
  initialCache: false,
});

useMeta({
  meta: [
    {
      hid: "og:url",
      property: "og:url",
      content: `${BASE_DOMAIN_URL}${route.fullPath}`,
    },
    { hid: "og:type", property: "og:type", content: "website" },
    { hid: "og:title", property: "og:title", content: data.value.title },
    {
      hid: "og:description",
      property: "og:description",
      content: data.value.description,
    },
    {
      hid: "og:image",
      property: "og:image",
      content: data.value.imageUrl,
    },
  ],
});
</script>
