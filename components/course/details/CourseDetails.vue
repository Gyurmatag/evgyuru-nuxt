<template>
  <div>
    <course-card
      :course-id="data.course._id"
      :title="data.course.title"
      :description="data.course.description"
      :image-url="data.course.imageUrl"
    />
  </div>
</template>

<script setup>
const config = useRuntimeConfig()
const route = useRoute()

const apiUrl = 'course'
const courseId = route.params.courseId
// TODO: itt majd meg kell nézni, hogy lehet jól kiszervezni a baseURL adásokat és api-t
const { data } =
    await useFetch(
        `${config.API_BASE}/${apiUrl}/${courseId}`
    )

useMeta({
  meta: [
    { hid: 'og:url', property: 'og:url', content: 'https://evgyuru-nuxt.netlify.app/courses/6202902940d4f85bd2542a26' },
    { hid: 'og:type', property: 'og:type', content: 'website' },
    { hid: 'og:title', property: 'og:title', content: data.value.course.title },
    { hid: 'og:description', property: 'og:description', content: data.value.course.description },
    { hid: 'og:image', property: 'og:image', content: data.value.course.imageUrl }
  ],
  bodyAttrs: {
    class: 'test'
  }
})
</script>
