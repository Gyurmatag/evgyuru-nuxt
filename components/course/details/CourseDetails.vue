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

console.log(route)

useMeta({
  meta: [
    { name: 'og:type', content: 'website' },
    { name: 'og:url', content: window.location },
    { name: 'og:title', content: data.value.course.title },
    { name: 'og:description', content: data.value.course.description },
    { name: 'og:image', content: data.value.course.imageUrl }
  ],
  bodyAttrs: {
    class: 'test'
  }
})
</script>
