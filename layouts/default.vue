<template>
  <div class="flex h-screen flex-col">
    <header>
      <nav-bar />
    </header>
    <main class="flex-grow pt-24 dark:bg-gray-800">
      <slot />
    </main>
    <footer>
      <footer-bar />
    </footer>
  </div>
</template>
