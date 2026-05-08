<template>
  <section class="hero-section" :class="{ 'is-visible': isVisible }">
    <div class="bg-animation">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
      <div class="circle circle-3"></div>
      <div class="circle circle-4"></div>
    </div>
    <div ref="container" class="hero-container">
      <div class="branding">
        <span class="suite-label">The UptimeRobot Suite</span>
      </div>
      <h1 class="hero-title">
        Monitor with <span class="highlight">Precision.</span>
      </h1>
      <p class="hero-subtitle">
        A complete ecosystem of open-source tools designed to extend, interact, and integrate with the UptimeRobot API. Built for developers, by developers.
      </p>
    </div>
    <div class="hero-scroll-indicator">
      <div v-if="!isMobile" class="mouse"></div>
      <div v-else class="hand-swipe">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 19V5M12 5L7 10M12 5L17 10" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <span>{{ isMobile ? 'Swipe Up' : 'Scroll to Explore' }}</span>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'

export default defineComponent({
  name: 'HeroSection',
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

/* UptimeRobot Logo Background Animation */
.bg-animation {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  max-width: 1000px;
  height: 50vh;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  pointer-events: none;
  z-index: 0;
  opacity: 0.15;
}

.circle {
  position: absolute;
  border-radius: 50%;
  border: 4px solid #3bd671;
  border-bottom: none;
  transform-origin: bottom center;
  opacity: 0;
  transform: scale(0);
  transition: all 1.5s cubic-bezier(0.16, 1, 0.3, 1);
  bottom: 0;
}

.circle-1 { width: 200px; height: 200px; border-width: 30px; border-radius: 200px 200px 0 0; }
.circle-2 { width: 400px; height: 400px; border-width: 40px; border-radius: 400px 400px 0 0; }
.circle-3 { width: 600px; height: 600px; border-width: 50px; border-radius: 600px 600px 0 0; }
.circle-4 { width: 800px; height: 800px; border-width: 60px; border-radius: 800px 800px 0 0; }

.is-visible .circle-1 { opacity: 1; transform: scale(1); transition-delay: 0.2s; }
.is-visible .circle-2 { opacity: 0.8; transform: scale(1); transition-delay: 0.4s; }
.is-visible .circle-3 { opacity: 0.6; transform: scale(1); transition-delay: 0.6s; }
.is-visible .circle-4 { opacity: 0.4; transform: scale(1); transition-delay: 0.8s; }

.hero-container {
  max-width: 1000px;
  text-align: center;
  opacity: 0;
  transform: translateY(30px);
  transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 10;
  padding-bottom: 6rem; /* Prevent overlap with scroll indicator */
}

.hero-section.is-visible .hero-container {
  opacity: 1;
  transform: translateY(0);
}

.suite-label {
  display: inline-block;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #3bd671;
  margin-bottom: 0.5rem; /* Reduced space from main title */
}

.hero-title {
  font-size: clamp(3rem, 10vw, 5.5rem);
  font-weight: 800;
  line-height: 1.1;
  color: var(--text-color);
  margin-bottom: 1.5rem;
}

.highlight {
  color: #3bd671;
}

.hero-subtitle {
  font-size: clamp(1.1rem, 3vw, 1.5rem);
  color: var(--secondary-text-color);
  line-height: 1.6;
  max-width: 700px;
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
  border: 2px solid var(--outline-color);
  border-radius: 12px;
  position: relative;
}

.mouse::after {
  content: '';
  width: 2px;
  height: 6px;
  background: var(--text-color, #333);
  position: absolute;
  top: 6px;
  left: 50%;
  transform: translateX(-50%);
  animation: scrollMouse 2s infinite;
}

.hand-swipe {
  width: 30px;
  height: 30px;
  animation: swipeUp 2s infinite ease-in-out;
}

@keyframes scrollMouse {
  0% { transform: translate(-50%, 0); opacity: 1; }
  100% { transform: translate(-50%, 15px); opacity: 0; }
}

@keyframes swipeUp {
  0% { transform: translateY(10px); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateY(-10px); opacity: 0; }
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

  .suite-label {
    font-size: 0.8rem;
    margin-bottom: 0.25rem;
  }

  .hero-subtitle {
    font-size: 0.95rem;
  }

  .bg-animation {
    height: 50vh;
    bottom: 0; /* Anchor to the absolute bottom */
  }

  .circle-1 { width: 120px; height: 120px; border-width: 12px; }
  .circle-2 { width: 240px; height: 240px; border-width: 18px; }
  .circle-3 { width: 360px; height: 360px; border-width: 24px; }
  .circle-4 { width: 480px; height: 480px; border-width: 30px; }

  .hero-scroll-indicator {
    bottom: 1.5rem;
  }
}
</style>
