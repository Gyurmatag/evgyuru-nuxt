<template>
  <div>
    <div
      v-for="project in data.projects"
      :key="project._id"
      class="flex flex-col space-y-10"
    >
      <project-card
        :project-id="project._id"
        :title="project.title"
        :image-url="project.imageUrl"
        :description="project.description"
      />
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();

const apiUrl = "project/projects";
const currentPage = 1;
const limit = 5;
// TODO: itt majd meg kell nézni, hogy lehet jól kiszervezni a baseURL adásokat és api-t
const { data } = await useFetch(`${config.API_BASE}/${apiUrl}`, {
  params: { limit, currentPage },
});
</script>
