<template>
  <div class="text-md space-y-4 text-gray-800 dark:text-gray-200">
    <div class="border-b-2 border-blue-600">
      {{ $t("profile.moderator.reservations.title") }}
    </div>
    <div
      v-for="course in courseData.courses"
      :key="course._id"
      class="mt-4 flex flex-col rounded-md bg-blue-200 p-6 dark:bg-gray-700"
    >
      <profile-moderator-course-card
        :course-id="course._id"
        :course-title="course.title"
      ></profile-moderator-course-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CourseList } from "~/models/course";

// TODO: error kezelés
// TODO: beégetett paraméterek kivezetése
const { data: courseData } = await useCustomFetch<CourseList>({
  path: `${COURSE}/${COURSES}`,
  params: { projectId: "61ed941fd0bd9a48509bee27", limit: 5, currentPage: 1 },
});
</script>
