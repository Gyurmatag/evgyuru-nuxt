<template>
  <nav class="text-gray-900 border-b-2 border-gray-200 border-opacity-50">
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
            class="inline-block align-bottom p-1.5 rounded-md border-2 border-manocska
                   transition duration-300 ease-in-out hover:bg-orange-100"
            :to="{ name: 'projects-projectId', params: { projectId: '61ed941fd0bd9a48509bee27' } }"
          >
            <span class="hidden sm:block">{{ $t('nav.manocska') }}</span>
            <span class="sm:hidden">{{ $t('nav.manocskaShort') }}</span>
          </nuxt-link>
          <nuxt-link
            class="inline-block align-bottom p-2 rounded-md bg-blue-600 text-white
                   transition duration-300 ease-in-out hover:bg-blue-800"
            to="/"
          >
            {{ $t('nav.donate') }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </nav>
</template>
