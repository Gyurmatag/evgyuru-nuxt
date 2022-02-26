<template>
  <div class="flex flex-col">
    <header>
      <nav-bar />
    </header>
    <main class="flex-grow pt-24">
      <slot />
    </main>
    <footer>
      <footer-bar />
    </footer>
  </div>
</template>
