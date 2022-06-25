<template>
  <div class="space-y-6">
    <div v-for="course in courses" :key="course._id">
      <course-card
        :course-id="course._id"
        :title="course.title"
        :description="course.description"
        :price="course.price"
        :occasions="course.occasions"
        :date-from="course.dateFrom"
        :date-to="course.dateTo"
        :image-url="course.imageUrl"
        :max-group-size="course.maxGroupSize"
        :reservations="course.reservations"
        :is-on-details="false"
      />
    </div>
    <button
      v-if="courses.length !== data.totalItems"
      class="rounded-md bg-gray-200 p-4 transition duration-300 ease-in-out hover:bg-gray-300 dark:bg-gray-200 dark:hover:bg-gray-300"
      @click="loadNextPage"
    >
      {{ $t("project.projectDetails.courses.loadMore") }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { Course, CourseList } from "~/models/course";

const props = defineProps({
  projectId: {
    type: String,
    required: true,
  },
});

// TODO: error kezelés
const currentPage = ref(1);
const limit = 5;
const courses = ref<Course[]>([]);
const projectId = props.projectId;
const { API_BASE: baseURL } = useRuntimeConfig();
// TODO: ideiglenes megoldás, refresh nem működik a custom methodd-al, Githubon kell majd problémát jelezni
// TODO: szép töltési allapot kezelés impelementálása
const { data, refresh } = await useFetch<CourseList>(
  () => `/${COURSE}/${COURSES}?page=${currentPage.value}`,
  {
    params: { projectId, limit },
    baseURL,
    initialCache: false,
  }
);

courses.value = [...data.value.courses];

const loadNextPage = async () => {
  currentPage.value++;
  await refresh();
  courses.value.push(...data.value.courses);
};
</script>
