<template>
  <transition
    name="expand"
    mode="in-out"
    @enter="enter"
    @after-enter="afterEnter"
    @leave="leave"
  >
    <slot />
  </transition>
</template>

<script setup lang="ts">
const enter = (element) => {
  const { width } = getComputedStyle(element);

  element.style.width = width;
  element.style.position = "absolute";
  element.style.visibility = "hidden";
  element.style.height = "auto";

  const { height } = getComputedStyle(element);

  element.style.width = null;
  element.style.position = null;
  element.style.visibility = null;
  element.style.height = 0;

  getComputedStyle(element).height;

  requestAnimationFrame(() => {
    element.style.height = height;
  });
};

const afterEnter = (element) => {
  element.style.height = "auto";
};

const leave = (element) => {
  const { height } = getComputedStyle(element);

  element.style.height = height;

  // TODO: ez mi is?
  getComputedStyle(element).height;

  requestAnimationFrame(() => {
    element.style.height = 0;
  });
};
</script>

<style scoped>
* {
  will-change: height;
  transform: translateY(0);
  backface-visibility: hidden;
  perspective: 1000px;
}
</style>

<style>
.expand-enter-active,
.expand-leave-active {
  transition: height 500ms ease-in-out;
  overflow: hidden;
}
.expand-enter,
.expand-leave-to {
  height: 0;
}
</style>
