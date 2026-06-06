<template>
  <section class="hero-section" :class="{ 'is-visible': isVisible }">
    <div class="cyber-background">
      <div
        v-for="n in 20"
        :key="n"
        class="data-packet"
        :style="packetStyle(n)"
      ></div>
      <div class="grid-overlay"></div>
    </div>

    <div ref="container" class="hero-container">
      <h1 class="hero-title">
        <span class="demo-label">Interactive Phishing Demo</span>
        <span class="main-title"
          >The Art of the
          <span class="highlight" data-text="Hook.">Hook.</span></span
        >
      </h1>
      <p class="hero-subtitle">
        A hands-on, interactive <strong>phishing simulation</strong> on
        Brockefni designed to teach students about social engineering, digital
        security, and the mechanics of a breach.
      </p>
    </div>

    <div class="hero-scroll-indicator">
      <div v-if="!isMobile" class="mouse"></div>
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
      <span>{{ isMobile ? 'Swipe Up' : 'Scroll to Experience' }}</span>
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

    const packetStyle = (n: number) => {
      const duration = 10 + Math.random() * 20
      const delay = Math.random() * -20
      const left = Math.random() * 100
      const size = 2 + Math.random() * 4
      return {
        left: `${left}%`,
        width: `${size}px`,
        height: `${size}px`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        opacity: 0.1 + Math.random() * 0.4,
      }
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
      packetStyle,
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
}

.cyber-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
}

.grid-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    linear-gradient(rgba(255, 59, 85, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 59, 85, 0.05) 1px, transparent 1px);
  background-size: 50px 50px;
  mask-image: radial-gradient(circle at center, black, transparent 80%);
}

.data-packet {
  position: absolute;
  bottom: -20px;
  background: var(--text-color);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--text-color);
  animation: floatUp linear infinite;
}

@keyframes floatUp {
  0% {
    transform: translateY(0) scale(1);
  }
  50% {
    background: #ff3b55;
    box-shadow: 0 0 15px #ff3b55;
    transform: translateY(-50vh) scale(1.2);
  }
  100% {
    transform: translateY(-110vh) scale(1);
  }
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

.is-visible .hero-container {
  opacity: 1;
  transform: translateY(0);
}

.demo-label {
  display: block;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  color: #ff3b55;
  margin-bottom: 1rem;
  animation: flicker 3s infinite;
}

.main-title {
  display: block;
}

@keyframes flicker {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
  52% {
    opacity: 1;
  }
  54% {
    opacity: 0.8;
  }
  56% {
    opacity: 1;
  }
}

.hero-title {
  font-size: clamp(3.5rem, 12vw, 6.5rem);
  font-weight: 900;
  line-height: 1;
  color: var(--text-color);
  margin-bottom: 2rem;
  letter-spacing: -0.02em;
}

.highlight {
  color: #ff3b55;
  position: relative;
  display: inline-block;
  text-shadow: 0 0 30px rgba(255, 59, 85, 0.5);
}

.highlight::after {
  content: attr(data-text);
  position: absolute;
  left: 2px;
  text-shadow: -2px 0 #25f4ee;
  top: 0;
  color: transparent;
  overflow: hidden;
  clip: rect(0, 900px, 0, 0);
  animation: noise-anim 2s infinite linear alternate-reverse;
}

@keyframes noise-anim {
  0% {
    clip: rect(10px, 9999px, 50px, 0);
  }
  20% {
    clip: rect(30px, 9999px, 20px, 0);
  }
  40% {
    clip: rect(60px, 9999px, 80px, 0);
  }
  60% {
    clip: rect(10px, 9999px, 40px, 0);
  }
  80% {
    clip: rect(90px, 9999px, 10px, 0);
  }
  100% {
    clip: rect(40px, 9999px, 70px, 0);
  }
}

.hero-subtitle {
  font-size: clamp(1.2rem, 4vw, 1.6rem);
  color: var(--secondary-text-color);
  line-height: 1.5;
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
  color: #888;
  font-size: 0.8rem;
  opacity: 0;
  transition: opacity 1s ease 1.5s;
  z-index: 10;
}

.is-visible .hero-scroll-indicator {
  opacity: 0.8;
}

.mouse {
  width: 24px;
  height: 40px;
  border: 2px solid #333;
  border-radius: 12px;
  position: relative;
}

.mouse::after {
  content: '';
  width: 3px;
  height: 8px;
  background: #ff3b55;
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  animation: scrollMouse 2s infinite;
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

.hand-swipe {
  width: 30px;
  height: 30px;
  animation: swipeUp 2s infinite ease-in-out;
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
