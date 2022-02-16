<template>
  <nav class="bg-cyan-500 text-gray-900">
    <div class="max-w-6xl mx-auto px-4">
      <div class="flex justify-between">
        <div class="flex space-x-4">
          <nuxt-link
            class="inline-block mr-4 p-1"
            to="/"
          >
            <img
              alt="Évgyűrű logó"
              src="~/assets/logo.png"
              class="h-20"
            >
          </nuxt-link>
        </div>
        <div class="flex items-center space-x-4">
          <nuxt-link
            class="inline-block align-bottom p-2 rounded-lg
                   text-red-600 hover:text-red-800 bg-gradient-to-br from-gray-100 to-gray-200"
            active-class="text-primary"
            :to="{ name: 'projects-projectId', params: { projectId: '61ed941fd0bd9a48509bee27' } }"
          >
            <span class="hidden sm:block">{{ $t('nav.manocska') }}</span>
            <span class="sm:hidden">{{ $t('nav.manocskaShort') }}</span>
          </nuxt-link>
          <nuxt-link
            class="inline-block align-bottom p-2 bg-gradient-to-br from-green-500 to-green-700
                   text-amber-50 rounded-lg hover:text-gray-200"
            to="/"
          >
            {{ $t('nav.donate') }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </nav>
</template>
