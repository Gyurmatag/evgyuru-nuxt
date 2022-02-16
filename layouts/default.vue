<template>
  <div class="flex flex-col h-screen">
    <header>
      <nav-bar />
    </header>
    <main class="flex-grow">
      <slot />
    </main>
    <footer>
      <footer-bar />
    </footer>
  </div>
</template>
