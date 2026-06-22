<template>
  <section class="hero-section" :class="{ 'is-visible': isVisible }">
    <div class="bg-animation-container">
      <slot name="background-animation"></slot>
    </div>
    <div ref="container" class="hero-container">
      <h1 class="hero-title">
        <span class="demo-label" :style="{ color: themeColor }">{{ label }}</span>
        <span class="main-title">
          {{ title }}
          <span class="highlight" :style="{ color: themeColor }">{{ highlightText }}</span>
        </span>
      </h1>
      <p class="hero-subtitle">
        <slot name="subtitle">{{ subtitle }}</slot>
      </p>
    </div>

    <div class="hero-scroll-indicator">
      <div v-if="!isMobile" class="mouse" :style="{ borderColor: 'var(--outline-color)' }">
        <div class="mouse-wheel" :style="{ background: themeColor }"></div>
      </div>
      <div v-else class="hand-swipe">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            d="M12 19V5M12 5L7 10M12 5L17 10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <span>{{ isMobile ? 'Swipe Up' : 'Scroll to Explore' }}</span>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'

export default defineComponent({
  name: 'SharedHeroSection',
  props: {
    label: { type: String, required: true },
    title: { type: String, required: true },
    highlightText: { type: String, default: '' },
    subtitle: { type: String, default: '' },
    themeColor: { type: String, default: '#3bd671' }
  },
  setup() {
    const isVisible = ref(false)
    const isMobile = ref(false)
    const container = ref<HTMLElement | null>(null)

    const checkMobile = () => {
      isMobile.value = window.innerWidth <= 768
    }

    onMounted(() => {
      setTimeout(() => {
        isVisible.value = true
      }, 100)

      checkMobile()
      window.addEventListener('resize', checkMobile)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', checkMobile)
    })

    return {
      isVisible,
      isMobile,
      container,
    }
  },
})
</script>

<style scoped>
.hero-section {
  min-height: calc(100vh - 75px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--background-color);
  padding: 55px 1rem 0 1rem;
  overflow: hidden;
  position: relative;
  transition: padding-top 1s ease-out;
}

.hero-section.is-visible {
  padding-top: 5px;
}

.bg-animation-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.hero-container {
  max-width: 1000px;
  text-align: center;
  opacity: 0;
  transform: translateY(30px);
  transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 10;
  padding-bottom: 6rem;
}

.hero-section.is-visible .hero-container {
  opacity: 1;
  transform: translateY(0);
}

.demo-label {
  display: block;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin-bottom: 0.5rem;
}

.main-title {
  display: block;
}

.hero-title {
  font-size: clamp(3rem, 10vw, 5.5rem);
  font-weight: 800;
  line-height: 1.1;
  color: var(--text-color);
  margin-bottom: 1.5rem;
}

.highlight {
  position: relative;
  display: inline-block;
}

.hero-subtitle {
  font-size: clamp(1.1rem, 3vw, 1.5rem);
  color: var(--secondary-text-color);
  line-height: 1.6;
  max-width: 750px;
  margin: 0 auto;
}

.hero-scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: var(--secondary-text-color);
  font-size: 0.8rem;
  opacity: 0;
  transition: opacity 1s ease 1.5s;
  z-index: 10;
}

.hero-section.is-visible .hero-scroll-indicator {
  opacity: 0.6;
}

.mouse {
  width: 20px;
  height: 32px;
  border: 2px solid;
  border-radius: 12px;
  position: relative;
}

.mouse-wheel {
  width: 2px;
  height: 6px;
  position: absolute;
  top: 6px;
  left: 50%;
  transform: translateX(-50%);
  animation: scrollMouse 2s infinite;
  border-radius: 2px;
}

.hand-swipe {
  width: 30px;
  height: 30px;
  animation: swipeUp 2s infinite ease-in-out;
}

@keyframes scrollMouse {
  0% {
    transform: translate(-50%, 0);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, 15px);
    opacity: 0;
  }
}

@keyframes swipeUp {
  0% {
    transform: translateY(10px);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateY(-10px);
    opacity: 0;
  }
}

@media (max-width: 768px) {
  .hero-section {
    min-height: calc(85vh - 75px);
    padding: 0 1rem;
    align-items: center;
    padding-top: 5vh;
  }

  .hero-section.is-visible {
    padding-top: 5vh;
  }

  .hero-container {
    padding-bottom: 0;
  }

  .hero-title {
    font-size: 2.25rem;
    margin-bottom: 0.75rem;
  }

  .demo-label {
    font-size: 0.8rem;
    margin-bottom: 0.25rem;
  }

  .hero-subtitle {
    font-size: 0.95rem;
  }

  .hero-scroll-indicator {
    bottom: 1.5rem;
  }
}
</style>
