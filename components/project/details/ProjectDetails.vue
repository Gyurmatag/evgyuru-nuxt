<template>
  <div
    class="mt-8 flex flex-col items-center divide-y-2 divide-blue-600 divide-opacity-20"
  >
    <div class="flex w-full flex-col items-center bg-white dark:bg-gray-800">
      <div class="mb-8 max-w-6xl space-y-2 px-4 text-center">
        <div class="w-full rounded-lg pt-2 pb-2 text-xl">
          <img
            :alt="data.project.title"
            :src="data.project.imageUrl"
            class="m-auto rounded-lg lg:w-3/4 xl:w-1/2"
          />
        </div>
        <div
          class="m-auto text-center text-sm text-gray-800 dark:text-gray-200 lg:w-3/4 xl:w-1/2"
        >
          <p>{{ data.project.description }}</p>
        </div>
      </div>
    </div>
    <div
      class="flex w-full flex-col items-center justify-center bg-blue-100 bg-opacity-25 pb-4 dark:bg-gray-700"
    >
      <div class="w-full max-w-6xl items-center justify-center p-6 text-center">
        <course-list :project-id="data.project._id" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

const projectId = route.params.projectId;
// TODO: error kezelése
const { data } = await useCustomFetch({
  path: `${PROJECT}/${projectId}`,
});
</script>
