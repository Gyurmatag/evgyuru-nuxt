<template>
  <div class="space-y-6">
    <div class="flex justify-center">
      <form @submit="onSubmit" @change="formOnChange">
        <common-custom-radio-button
          name="filterDateFromAfterToday"
          first-radio-label-key="project.projectDetails.courses.filter.activeCourses"
          second-radio-label-key="project.projectDetails.courses.filter.pastCourses"
        ></common-custom-radio-button>
      </form>
    </div>
    <div v-for="course in courses" :key="course._id">
      <course-card
        :course-id="course._id"
        :title="course.title"
        :description="course.description"
        :city="course.city"
        :street-address="course.streetAddress"
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
      :disabled="pending"
      @click="loadNextPage"
    >
      <span class="flex">
        {{ $t(nextPageButtonTextKey) }}
        <common-icon-loading-spin
          v-if="pending"
          class="ml-2"
        ></common-icon-loading-spin>
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import { Course, CourseFilter, CourseList } from "~/models/course";

const props = defineProps({
  projectId: {
    type: String,
    required: true,
  },
});

const courseFilterFormData = ref<CourseFilter>(null);
const currentPage = ref(1);
const limit = 5;
const courses = ref<Course[]>([]);

const nextPageButtonTextKey = computed(() => {
  return !pending.value
    ? "project.projectDetails.courses.loadMore"
    : "common.wait";
});

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
  currentPage.value = 1;
});

const { API_BASE: baseURL } = useRuntimeConfig();
// TODO: error kezelés
// TODO: ideiglenes megoldás, refresh nem működik a custom methodd-al, Githubon kell majd problémát jelezni
// TODO: params-ban nem működik a reaktivitás (currentPage.value)
// TODO: szép töltési allapot kezelés impelementálása
const { data, refresh, pending } = await useFetch<CourseList>(
  () =>
    `/${COURSE}/${COURSES}?page=${currentPage.value}&filterDateFromAfterToday=${courseFilterFormData.value?.filterDateFromAfterToday}`,
  {
    params: { projectId: props.projectId, limit },
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
