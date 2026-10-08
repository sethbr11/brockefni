<template>
  <div
    class="slider-container"
    ref="containerRef"
    @mousedown="startDragging"
    @touchstart="startDragging"
  >
    <!-- Background / After Layer (Painting) -->
    <div class="layer after-layer">
      <div v-if="afterImage" class="img-wrapper">
        <img :src="afterImage" :alt="afterLabel" class="slider-img" />
      </div>
      <div v-else class="placeholder-painting">
        <div class="painting-content">
          <PaletteIcon class="layer-icon" />
          <h4>{{ afterLabel || 'Commissioned Oil Painting' }}</h4>
          <p>Oil on canvas interpretation with vibrant natural pigments</p>
        </div>
      </div>
      <span class="label after-label">{{ afterLabel || 'Painting' }}</span>
    </div>

    <!-- Foreground / Before Layer (Sketch) - Clipped -->
    <div
      class="layer before-layer"
      :style="{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }"
    >
      <div v-if="beforeImage" class="img-wrapper">
        <img :src="beforeImage" :alt="beforeLabel" class="slider-img" />
      </div>
      <div v-else class="placeholder-sketch">
        <div class="sketch-content">
          <PencilIcon class="layer-icon" />
          <h4>{{ beforeLabel || 'Original Pencil Sketch' }}</h4>
          <p>Hand-drawn graphite concept &amp; value study on paper</p>
        </div>
      </div>
      <span class="label before-label">{{ beforeLabel || 'Sketch' }}</span>
    </div>

    <!-- Draggable Divider Line & Handle -->
    <div
      class="slider-handle"
      :style="{ left: `${sliderPosition}%` }"
      aria-label="Drag to compare sketch and painting"
      role="slider"
      :aria-valuenow="sliderPosition"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <div class="handle-line"></div>
      <div class="handle-button">
        <ChevronsLeftRightIcon class="handle-icon" />
      </div>
      <div class="handle-line"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import {
  PaletteIcon,
  PencilIcon,
  ChevronsLeftRightIcon,
} from 'lucide-vue-next'

defineProps<{
  beforeImage?: string
  afterImage?: string
  beforeLabel?: string
  afterLabel?: string
}>()

const containerRef = ref<HTMLElement | null>(null)
const sliderPosition = ref(50)
const isDragging = ref(false)

const updatePosition = (clientX: number) => {
  if (!containerRef.value) return
  const rect = containerRef.value.getBoundingClientRect()
  const x = clientX - rect.left
  const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
  sliderPosition.value = percentage
}

const onMouseMove = (e: MouseEvent) => {
  if (!isDragging.value) return
  updatePosition(e.clientX)
}

const onTouchMove = (e: TouchEvent) => {
  if (!isDragging.value || !e.touches[0]) return
  updatePosition(e.touches[0].clientX)
}

const stopDragging = () => {
  isDragging.value = false
}

const startDragging = (e: MouseEvent | TouchEvent) => {
  isDragging.value = true
  if ('touches' in e && e.touches[0]) {
    updatePosition(e.touches[0].clientX)
  } else if ('clientX' in e) {
    updatePosition(e.clientX)
  }
}

onMounted(() => {
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', stopDragging)
  window.addEventListener('touchmove', onTouchMove)
  window.addEventListener('touchend', stopDragging)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup', stopDragging)
  window.removeEventListener('touchmove', onTouchMove)
  window.removeEventListener('touchend', stopDragging)
})
</script>

<style scoped>
.slider-container {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  max-height: 480px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 16px 40px var(--shadow);
  border: 1px solid var(--outline-color);
  cursor: ew-resize;
  user-select: none;
}

.layer {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.img-wrapper,
.slider-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Placeholders */
.placeholder-sketch {
  width: 100%;
  height: 100%;
  background: #eae6df;
  color: #3b3734;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: 
    radial-gradient(#cfc8bd 1px, transparent 1px),
    linear-gradient(135deg, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0.08) 100%);
  background-size: 16px 16px, 100% 100%;
  padding: 2rem;
  box-sizing: border-box;
}

.placeholder-painting {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1e3a8a 0%, #065f46 50%, #9a3412 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  box-sizing: border-box;
}

.sketch-content,
.painting-content {
  text-align: center;
  max-width: 320px;
}

.layer-icon {
  width: 42px;
  height: 42px;
  margin-bottom: 0.75rem;
}

.sketch-content h4,
.painting-content h4 {
  font-size: 1.25rem;
  font-weight: 800;
  margin: 0 0 0.4rem 0;
}

.sketch-content p,
.painting-content p {
  font-size: 0.88rem;
  opacity: 0.85;
  margin: 0;
}

/* Floating Badges */
.label {
  position: absolute;
  bottom: 1.25rem;
  padding: 0.35rem 0.85rem;
  border-radius: 50px;
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 5;
}

.before-label {
  left: 1.25rem;
  background: rgba(44, 62, 80, 0.85);
  color: white;
}

.after-label {
  right: 1.25rem;
  background: rgba(216, 118, 40, 0.9);
  color: white;
}

/* Handle */
.slider-handle {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 40px;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
  pointer-events: none;
}

.handle-line {
  flex: 1;
  width: 2px;
  background: white;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
}

.handle-button {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: white;
  color: #2c3e50;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.35);
  border: 2px solid var(--primary-color);
}

.handle-icon {
  width: 18px;
  height: 18px;
}
</style>
