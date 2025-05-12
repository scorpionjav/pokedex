<script setup lang="ts">
import useAppStore from '@/stores/app';
const appStore = useAppStore();
</script>

<template>
  <div
    v-if="appStore.loading"
    class="fixed inset-0 z-[1000] flex items-center justify-center bg-white"
  >
    <img
      src="@/assets/images/loader.svg"
      alt="Loading"
      class="animate-pokeball h-[100px] w-[100px]"
    />
  </div>
</template>

<style scoped>
@keyframes shake-rotate {
  0% {
    transform: rotate(0deg) translate(0, 0);
  }
  10% {
    transform: rotate(2deg) translate(-1px, 1px);
  }
  20% {
    transform: rotate(-2deg) translate(1px, -1px);
  }
  30% {
    transform: rotate(2deg) translate(-1px, 1px);
  }
  40% {
    transform: rotate(-2deg) translate(1px, -1px);
  }
  50% {
    transform: rotate(1deg) translate(-0.5px, 0.5px);
  }
  60% {
    transform: rotate(-1deg) translate(0.5px, -0.5px);
  }
  70% {
    transform: rotate(1deg) translate(-0.5px, 0.5px);
  }
  80% {
    transform: rotate(-1deg) translate(0.5px, -0.5px);
  }
  90% {
    transform: rotate(0deg) translate(0, 0);
  }
  100% {
    transform: rotate(0deg) translate(0, 0);
  }
}

@keyframes pulse {
  0% {
    filter: brightness(1);
    scale: 1;
  }
  100% {
    filter: brightness(1.5);
    scale: 1.05;
  }
}

@layer utilities {
  .animate-pokeball {
    animation:
      shake-rotate 1s ease-in-out infinite,
      pulse 2s ease-in-out infinite alternate;
  }
}
</style>
