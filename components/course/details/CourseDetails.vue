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
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: window.location },
    { property: 'og:title', content: data.value.course.title },
    { property: 'og:description', content: data.value.course.description },
    { property: 'og:image', content: data.value.course.imageUrl }
  ],
  bodyAttrs: {
    class: 'test'
  }
})
</script>
