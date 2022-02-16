<template>
  <div class="flex flex-col items-center mb-8 space-y-8">
    <div
      class="flex flex-col w-full justify-center items-center
                bg-gradient-to-b from-cyan-500 to-blue-700"
    >
      <div
        class="md:flex-row max-w-6xl my-8 px-4 space-y-8
                  justify-center items-center text-center"
      >
        <div
          class="w-full text-xl text-manocska bg-gray-100
                    pt-2 pb-2 rounded-lg text-center"
        >
          {{ data.project.title }}
        </div>
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
        <div class="text-sm text-gray-200 text-left">
          {{ data.project.description }}
        </div>
      </div>
    </div>
    <div class="flex flex-col w-full justify-center items-center">
      <div
        class="max-w-6xl w-full px-4 space-y-8
                  justify-center items-center text-center"
      >
        <div class="text-l bg-manocska text-gray-100 pt-2 pb-2 rounded-lg text-center">
          {{ $t('project.projectDetails.courses') }}
        </div>
        <div>
          <course-list :project-id="data.project._id" />
        </div>
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
