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
    <infinite-loading :identifier="infiniteLoadingId" @infinite="load">
      <template #spinner>
        <div class="flex justify-center">
          <common-icon-loading-spin
            svg-class="h-10 w-10"
          ></common-icon-loading-spin>
        </div>
      </template>
      <template #complete>
        <span></span>
      </template>
    </infinite-loading>
  </div>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
// TODO: ide miért is kell import?
import InfiniteLoading from "v3-infinite-loading";
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
const infiniteLoadingId = ref<number>(+new Date());

const { handleSubmit } = useForm({});

const formOnChange = () => {
  onSubmit();
};

const onSubmit = handleSubmit(async (values) => {
  courseFilterFormData.value = {
    ...courseFilterFormData.value,
    ...values,
  };
  currentPage.value = 1;
  await refresh();
  courses.value = data.value.courses;
  infiniteLoadingId.value += 1;
});

const config = useRuntimeConfig();
// TODO: error kezelés
// TODO: ideiglenes megoldás, refresh nem működik a custom methodd-al, Githubon kell majd problémát jelezni
// TODO: params-ban nem működik a reaktivitás (currentPage.value)
// TODO: szép töltési allapot kezelés impelementálása
const { data, refresh } = await useFetch<CourseList>(
  () =>
    `/${COURSE}/${COURSES}?page=${currentPage.value}&filterDateFromAfterToday=${courseFilterFormData.value?.filterDateFromAfterToday}`,
  {
    params: { projectId: props.projectId, limit },
    baseURL: config.public.apiBase,
  }
);

courses.value = data.value.courses;

const load = async ($state) => {
  try {
    if (courses.value.length === data.value.totalItems) {
      $state.complete();
    } else {
      currentPage.value++;
      await refresh();
      courses.value.push(...data.value.courses);
      $state.loaded();
    }
  } catch (error) {
    $state.error();
  }
};
</script>
