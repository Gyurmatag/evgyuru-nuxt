<template>
  <div
    class="mt-8 flex flex-col items-center space-y-2 divide-y-2 divide-blue-600 divide-opacity-20"
  >
    <div
      class="mb-8 max-w-6xl items-center justify-center space-y-2 px-4 text-center md:flex-row"
    >
      <div
        class="w-full rounded-lg bg-white pt-2 pb-2 text-xl dark:bg-gray-800"
      >
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
    <div
      class="flex w-full flex-col items-center justify-center bg-blue-100 bg-opacity-25 pb-4"
    >
      <div class="w-full max-w-6xl items-center justify-center p-6 text-center">
        <course-list :project-id="data.project._id" />
      </div>
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
const route = useRoute();

const apiUrl = "project";
const projectId = route.params.projectId;
// TODO: itt majd meg kell nézni, hogy lehet jól kiszervezni a baseURL adásokat és api-t
const { data } = await useFetch(`${config.API_BASE}/${apiUrl}/${projectId}`);
</script>
