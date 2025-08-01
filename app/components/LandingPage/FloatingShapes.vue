<template>
  <div class="floating-shapes">
    <div
      v-for="shape in shapes"
      :key="shape.id"
      class="shape"
      :style="{
        width: shape.size + 'px',
        height: shape.size + 'px',
        top: shape.top + '%',
        left: shape.left + '%',
        animationDelay: shape.delay + 's',
        animationDuration: shape.duration + 's',
      }"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import type { FloatingShape } from "@/assets/scripts/FloatingShape";

export default defineComponent({
  name: "FloatingShapes",
  props: {
    shapes: {
      type: Array as PropType<FloatingShape[]>,
      required: true,
    },
  },
});
</script>

<style scoped>
.floating-shapes {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
}

.shape {
  position: absolute;
  background: linear-gradient(
    45deg,
    var(--primary-color, #d87628),
    var(--secondary-color, #ac5a17)
  );
  border-radius: 50%;
  opacity: 0.12;
  animation: float ease-in-out infinite;
  will-change: transform;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}
</style>
