<template>
  <div class="scroll-smooth">
    <nuxt-loading ref="loading" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
// TODO: ideiglenes megoldás, ameddig nincs benne natívban a Nuxt 3- ban
import NuxtLoading from './components/common/nuxt-loading'

const loading = ref(null)
const nuxtApp = useNuxtApp()

nuxtApp.hook('page:start', () => {
  loading.value.start()
})

nuxtApp.hook('page:finish', () => {
  loading.value.finish()
  window.scrollTo(0, 0)
})
</script>
