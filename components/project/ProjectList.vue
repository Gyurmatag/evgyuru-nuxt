<template>
  <div class="dark:bg-gray-800">
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

<script setup lang="ts">
const currentPage = 1;
const limit = 5;
// TODO: error kezelés
// TODO: ininite lista bevezetése
const { data } = await useCustomFetch({
  path: `/${PROJECT}/${PROJECTS}`,
  params: { limit, currentPage },
});
</script>
