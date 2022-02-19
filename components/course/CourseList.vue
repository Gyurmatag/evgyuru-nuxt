<template>
  <div>
    <div
      v-for="course in data.courses"
      :key="course._id"
      class="flex flex-col space-y-10"
    >
      <course-card
        :course-id="course._id"
        :title="course.title"
        :description="course.description"
        :image-url="course.imageUrl"
      />
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();

const props = defineProps({
  projectId: {
    type: String,
    required: true,
  },
});

const apiUrl = "course/courses";
const currentPage = 1;
const limit = 5;
const projectId = props.projectId;
const { data } = await useFetch(`${config.API_BASE}/${apiUrl}`, {
  params: { projectId, limit, currentPage },
});
</script>
