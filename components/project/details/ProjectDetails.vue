<template>
  <div class="flex flex-col items-center divide-blue-600 divide-y-2 space-y-2 divide-opacity-20">
    <div
      class="md:flex-row max-w-6xl px-4 space-y-2
                  justify-center items-center text-center"
    >
      <div
        class="w-full text-xl text-manocska bg-white
                    pt-2 pb-2 rounded-lg"
      >
        <img
          :alt="data.project.title"
          :src="data.project.imageUrl"
          class="lg:w-3/4 xl:w-1/2 rounded-lg m-auto"
        >
      </div>
      <div class="m-auto text-center lg:w-3/4 xl:w-1/2 text-sm text-gray-800">
        <p>{{ data.project.description }}</p>
      </div>
    </div>
    <div class="flex flex-col w-full justify-center items-center bg-blue-100 bg-opacity-25 pb-4">
      <div
        class="max-w-6xl w-full p-6 justify-center items-center text-center"
      >
        <course-list :project-id="data.project._id" />
      </div>
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig()
const route = useRoute()

const apiUrl = 'project'
const projectId = route.params.projectId
// TODO: itt majd meg kell nézni, hogy lehet jól kiszervezni a baseURL adásokat és api-t
const { data } =
    await useFetch(
        `${config.API_BASE}/${apiUrl}/${projectId}`
    )
</script>
