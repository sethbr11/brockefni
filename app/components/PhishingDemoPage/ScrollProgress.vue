<template>
  <div class="scroll-progress">
    <div class="progress-bar" :style="{ width: progress + '%' }"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'

export default defineComponent({
  name: 'ScrollProgress',
  setup() {
    const progress = ref(0)

    const updateProgress = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight
      const scrolled = (window.scrollY / scrollHeight) * 100
      progress.value = scrolled
    }

    onMounted(() => {
      window.addEventListener('scroll', updateProgress)
      updateProgress()
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', updateProgress)
    })

    return { progress }
  },
})
</script>

<style scoped>
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: transparent;
  z-index: 1000;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(to right, #ff3b3b, #fe2c55);
  transition: width 0.1s ease-out;
  box-shadow: 0 0 10px rgba(254, 44, 85, 0.5);
}
</style>
