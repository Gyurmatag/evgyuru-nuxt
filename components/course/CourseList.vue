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
        :price="course.price"
        :occasions="course.occasions"
        :date-from="course.dateFrom"
        :date-to="course.dateTo"
        :image-url="course.imageUrl"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { CourseList } from "~/models/course";

const props = defineProps({
  projectId: {
    type: String,
    required: true,
  },
});

// TODO: error kezelés
// TODO: ininite lista bevezetése
const currentPage = 1;
const limit = 5;
const projectId = props.projectId;
const { data } = await useCustomFetch<CourseList>({
  path: `/${COURSE}/${COURSES}`,
  params: { projectId, limit, currentPage },
});
</script>
