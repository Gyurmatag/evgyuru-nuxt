<template>
  <div class="flex items-center justify-center">
    <svg
      class="animated-check stroke-green-600"
      :class="svgClasses"
      viewBox="0 0 24 24"
    >
      <path d="M4.1 12.7L9 17.6 20.3 6.3" fill="none" />
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
.animated-check path {
  fill: none;
  stroke-width: 3;
  stroke-dasharray: 23;
  stroke-dashoffset: 23;
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
