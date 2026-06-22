<template>
  <div class="scroll-progress">
    <div 
      class="progress-bar" 
      :style="{ width: progress + '%', background: `linear-gradient(to right, ${color1}, ${color2})`, boxShadow: `0 0 10px ${color2}80` }"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'

export default defineComponent({
  name: 'SharedScrollProgress',
  props: {
    color1: {
      type: String,
      default: '#7df3e1'
    },
    color2: {
      type: String,
      default: '#3bd671'
    }
  },
  setup() {
    const progress = ref(0)

    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
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
  border: none !important;
  outline: none !important;
}

.progress-bar {
  height: 100%;
  transition: width 0.1s ease-out;
}
</style>
