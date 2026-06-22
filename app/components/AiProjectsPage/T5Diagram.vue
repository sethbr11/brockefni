<template>
  <div class="diagram-wrapper">
    <div class="t5-visual">
      <div 
        v-for="(pair, idx) in t5Examples" 
        :key="idx" 
        class="t5-pair" 
        :class="{ active: activeExample === idx }"
      >
        <div class="t5-bubble input-bubble">{{ pair.input }}</div>
        <div class="t5-processing">
          <div class="pulse-ring"></div>
          <div class="t5-center">T5</div>
        </div>
        <div class="t5-bubble output-bubble">{{ pair.output }}</div>
      </div>
      
      <div class="t5-dots">
        <button 
          v-for="(_, idx) in t5Examples" 
          :key="idx" 
          class="t5-dot" 
          :class="{ active: activeExample === idx }"
          @click="selectExample(idx)"
          aria-label="Select translation example"
        ></button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const t5Examples = [
  {
    input: '"Love your enemies and do good to those who hate you."',
    output: '"Love ye your enemies, and do good unto them which hate you."'
  },
  {
    input: '"He went to the store and bought bread."',
    output: '"And he went unto the market, and purchased bread thereof."'
  },
  {
    input: '"Do not be afraid, for I am with you always."',
    output: '"Fear not; for I am with thee alway, even unto the end."'
  }
]

const activeExample = ref(0)
let exampleInterval: ReturnType<typeof setInterval> | null = null

const startAutoplay = () => {
  exampleInterval = setInterval(() => {
    activeExample.value = (activeExample.value + 1) % t5Examples.length
  }, 4000)
}

const stopAutoplay = () => {
  if (exampleInterval) {
    clearInterval(exampleInterval)
    exampleInterval = null
  }
}

const selectExample = (idx: number) => {
  activeExample.value = idx
  // Reset the interval on manual selection
  stopAutoplay()
  startAutoplay()
}

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
})
</script>

<style scoped>
.diagram-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 1rem 0;
}

.t5-visual {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
  min-height: 260px;
}

.t5-pair {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.6s ease;
  pointer-events: none;
}

.t5-pair.active {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
  position: relative;
}

.t5-bubble {
  padding: 1rem 1.5rem;
  border-radius: 12px;
  font-family: 'Georgia', serif;
  font-size: 0.95rem;
  text-align: center;
  max-width: 90%;
  line-height: 1.5;
  transition: background 0.3s, color 0.3s, border-color 0.3s;
}

/* Light mode styles (default) */
.input-bubble {
  background: rgba(0, 0, 0, 0.02);
  color: var(--text-color-muted, #555);
  border: 1.5px dashed rgba(0, 0, 0, 0.25);
}

.output-bubble {
  background: rgba(255, 128, 8, 0.06);
  color: #bf6922; /* Highly legible dark orange in light mode */
  border: 1.5px solid rgba(255, 128, 8, 0.35);
  font-style: italic;
}

/* Dark mode overrides (nested under html.darkmode) */
:global(.darkmode) .input-bubble {
  background: rgba(255, 255, 255, 0.04);
  color: var(--secondary-text-color, #aaa);
  border: 1.5px dashed rgba(255, 255, 255, 0.25);
}

:global(.darkmode) .output-bubble {
  background: rgba(255, 128, 8, 0.08);
  color: #ffc837; /* Vibrant gold in dark mode */
  border: 1.5px solid rgba(255, 128, 8, 0.4);
}

.t5-processing {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
}

.pulse-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid #ff8008;
  animation: expandPulse 2s infinite;
}

.t5-center {
  background: #ff8008;
  color: #111;
  font-weight: 800;
  font-size: 0.9rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

@keyframes expandPulse {
  0% { 
    transform: scale(1); 
    opacity: 0.7; 
  }
  100% { 
    transform: scale(1.8); 
    opacity: 0; 
  }
}

.t5-dots {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.t5-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 1px solid #ff8008;
  background: transparent;
  cursor: pointer;
  padding: 0;
  transition: all 0.2s;
}

.t5-dot.active {
  background: #ff8008;
  transform: scale(1.3);
}
</style>
