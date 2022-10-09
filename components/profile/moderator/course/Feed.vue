<template>
  <div class="text-md space-y-4 text-gray-800 dark:text-gray-200">
    <div
      class="flex items-center justify-between border-b-2 border-blue-600 pb-3"
    >
      <div>
        {{ $t("profile.moderator.courses.title") }}
      </div>
      <nuxt-link
        to="/profilom/kurzusok/uj"
        class="cursor-pointer rounded-md bg-green-600 px-2 text-2xl font-black text-white transition duration-300 ease-in-out hover:bg-green-700"
      >
        +
      </nuxt-link>
    </div>
    <div>
      <form @submit="onSubmit" @change="formOnChange">
        <common-custom-radio-button
          name="filterDateFromAfterToday"
          first-radio-label-key="profile.moderator.courses.filter.activeCourses"
          second-radio-label-key="profile.moderator.courses.filter.pastCourses"
        ></common-custom-radio-button>
      </form>
    </div>
    <div
      v-for="course in courses"
      :key="course._id"
      class="mt-4 flex flex-col rounded-md bg-blue-200 p-6 dark:bg-gray-700"
    >
      <profile-moderator-course-card
        :course-id="course._id"
        :course-title="course.title"
      ></profile-moderator-course-card>
    </div>
    <button
      v-if="courses.length !== data.totalItems"
      class="rounded-md bg-gray-200 p-4 transition duration-300 ease-in-out hover:bg-gray-400 dark:bg-gray-500 dark:hover:bg-gray-600"
      @click="loadNextPage"
    >
      {{ $t("project.projectDetails.courses.loadMore") }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import { Course, CourseFilter, CourseList } from "~/models/course";

const courseFilterFormData = ref<CourseFilter>(null);
const currentPage = ref(1);
const limit = 5;
const courses = ref<Course[]>([]);

const { handleSubmit } = useForm({});

const formOnChange = () => {
  onSubmit();
};

const onSubmit = handleSubmit(async (values) => {
  courseFilterFormData.value = {
    ...courseFilterFormData.value,
    ...values,
  };
  await refresh();
  courses.value = data.value.courses;
});

const { API_BASE: baseURL } = useRuntimeConfig();
// TODO: error kezelés
// TODO: ideiglenes megoldás, refresh nem működik a custom methodd-al, Githubon kell majd problémát jelezni (https://github.com/nuxt/framework/issues/5993)
// TODO: params-ban nem működik a reaktivitás (currentPage.value)
// TODO: szép töltési allapot kezelés impelementálása
const { data, refresh } = await useFetch<CourseList>(
  () =>
    `/${COURSE}/${COURSES}?page=${currentPage.value}&filterDateFromAfterToday=${courseFilterFormData.value?.filterDateFromAfterToday}`,
  {
    params: { projectId: "61ed941fd0bd9a48509bee27", limit },
    baseURL,
    initialCache: false,
  }
);

courses.value = data.value.courses;

const loadNextPage = async () => {
  currentPage.value++;
  await refresh();
  courses.value.push(...data.value.courses);
};
</script>