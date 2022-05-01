<template>
  <div class="flex justify-center space-x-4">
    <ClientOnly>
      <div
        v-for="color of ['system', 'light', 'dark']"
        :key="color"
        class="cursor-pointer rounded-md border border-blue-100 p-3 transition duration-300 ease-in-out hover:bg-blue-500 dark:hover:bg-gray-600"
        :class="{
          'border-red-400':
            !$colorMode.unknown && color === $colorMode.preference,
          selected: !$colorMode.unknown && color === $colorMode.value,
        }"
        @click="$colorMode.preference = color"
      >
        <common-icon-system v-if="color === 'system'"></common-icon-system>
        <common-icon-light v-else-if="color === 'light'"></common-icon-light>
        <common-icon-dark v-else></common-icon-dark>
      </div>
    </ClientOnly>
  </div>
</template>

<style scoped>
.selected {
  color: var(--color-manocska);
}
</style>
