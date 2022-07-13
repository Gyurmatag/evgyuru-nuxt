<template>
  <div class="flex items-center justify-center">
    <svg
      class="animated-check stroke-red-600"
      :class="svgClasses"
      viewBox="0 0 50 50"
    >
      <line x2="50" y2="50" />
      <line x1="50" y2="50" />
    </svg>
  </div>
</template>

<script setup lang="ts">
defineProps({
  svgClasses: {
    type: String,
    default: "h-40",
  },
});
</script>

<style>
.animated-check line {
  stroke-width: 3;
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  animation: draw 1s linear forwards;
  stroke-linecap: round;
  stroke-linejoin: round;
}

@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}
</style>
