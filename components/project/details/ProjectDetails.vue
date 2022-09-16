<template>
  <common-page-head
    :subtitle="data.title"
    :is-dynamic-data="true"
  ></common-page-head>
  <div
    class="mt-8 flex flex-col items-center divide-y-2 divide-blue-600 divide-opacity-20"
  >
    <div class="flex w-full flex-col items-center bg-white dark:bg-gray-800">
      <div class="mb-8 max-w-6xl space-y-2 px-4 text-center">
        <div class="w-full rounded-lg pt-2 pb-2 text-xl">
          <img
            :alt="data.title"
            :src="data.imageUrl"
            class="m-auto rounded-lg lg:w-3/4 xl:w-1/2"
          />
        </div>
        <div
          class="m-auto text-center text-sm text-gray-800 dark:text-gray-200 lg:w-3/4 xl:w-1/2"
        >
          <p>{{ data.description }}</p>
        </div>
      </div>
    </div>
    <div
      class="flex w-full flex-col items-center justify-center bg-blue-100 bg-opacity-25 pb-4 dark:bg-gray-700"
    >
      <div class="w-full max-w-6xl items-center justify-center p-6 text-center">
        <course-list :project-id="data._id" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Project } from "~/models/project";

const route = useRoute();

const projectId = route.params.projectId;
// TODO: error kezelése
const { data } = await useCustomFetch<Project>({
  path: `/${PROJECT}/${projectId}`,
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
