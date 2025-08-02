<template>
  <section class="hero" ref="heroRef">
    <div class="hero-content">
      <div class="logo-container">
        <img
          src="@/assets/brockefni_logo.png"
          alt="Brockefni Logo"
          class="animated-logo"
          ref="logoRef"
        />
      </div>

      <div class="hero-text">
        <h1 class="hero-title">
          <span class="word word-1">CREATIVE</span>
          <span class="word word-2">DEVELOPER</span>
          <span class="word word-3">& DESIGNER</span>
        </h1>
        <p class="hero-subtitle">
          Crafting exceptional digital experiences through innovative code and
          compelling design
        </p>
        <div class="hero-buttons">
          <button
            class="btn btn-primary"
            @click="$emit('scroll-to-section', 'portfolio')"
          >
            View My Work
          </button>
          <button
            class="btn btn-secondary"
            @click="$emit('scroll-to-section', 'contact')"
          >
            Let's Connect
          </button>
        </div>
      </div>
    </div>

    <div class="scroll-indicator">
      <div class="scroll-arrow"></div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'HeroSection',
  emits: ['scroll-to-section'],
  setup() {
    const logoRef = ref<HTMLElement | null>(null)
    const heroRef = ref<HTMLElement | null>(null)

    onMounted(() => {
      // Logo entrance animation sequence
      setTimeout(() => {
        if (logoRef.value) {
          logoRef.value.classList.add('logo-entered')
        }
      }, 300)

      // Logo drift up animation
      setTimeout(() => {
        if (logoRef.value) {
          logoRef.value.classList.add('logo-drifted')
        }
      }, 2500)

      // Reduce hero padding after all animations finish
      setTimeout(() => {
        if (heroRef.value) {
          heroRef.value.classList.add('animation-complete')
        }
      }, 4500)
    })

    return {
      logoRef,
      heroRef,
    }
  },
})
</script>

<style scoped>
.hero {
  min-height: calc(100vh - 75px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  z-index: 2;
  padding-top: 55px;
  background: linear-gradient(
    135deg,
    var(--background-color, #fff) 0%,
    var(--background-variant, #f8f9fa) 100%
  );
  transition: padding-top 1s ease-out;
}

.hero.animation-complete {
  padding-top: 5px;
}

.hero-content {
  max-width: 800px;
  padding: 0 20px;
  position: relative;
  z-index: 3;
}

.logo-container {
  margin-bottom: 2rem;
  position: relative;
  z-index: 2000;
}

.animated-logo {
  width: 225px;
  opacity: 0;
  transform: scale(0) rotate(720deg);
  transition: all 2.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  filter: drop-shadow(0 10px 30px rgba(216, 118, 40, 0.3));
  position: relative;
  z-index: 2000;
}

.animated-logo.logo-entered {
  opacity: 1;
  transform: scale(1.2) rotate(0deg);
  transition: all 2.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.animated-logo.logo-drifted {
  width: 150px;
  transform: scale(1) rotate(0deg) translateY(-20px);
  transition: all 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.hero-title {
  font-size: clamp(1.875rem, 6vw, 3.75rem);
  font-weight: 900;
  line-height: 1.1;
  margin: auto;
  color: #d87628;
  position: relative;
  z-index: 10;
}

.word {
  display: block;
  opacity: 0;
  transform: translateY(50px);
  animation: slideUp 0.8s ease forwards;
  position: relative;
  z-index: 10;
  color: #d87628 !important;
  font-weight: 900;
}

.word-1 {
  animation-delay: 3s;
}
.word-2 {
  animation-delay: 3.3s;
}
.word-3 {
  animation-delay: 3.6s;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: var(--text-color-muted);
  margin-bottom: 3rem;
  opacity: 0;
  animation: fadeIn 1s ease forwards 4.2s;
  position: relative;
  z-index: 10;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  opacity: 0;
  animation: fadeIn 1s ease forwards 4.5s;
  position: relative;
  z-index: 10;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
}

.btn-primary {
  background: linear-gradient(45deg, #d87628, #ac5a17);
  color: white;
  box-shadow: 0 4px 15px rgba(216, 118, 40, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(216, 118, 40, 0.4);
}

.btn-secondary {
  background: transparent;
  color: var(--text-color, #333);
  border: 2px solid var(--text-color, #333);
}

.btn-secondary:hover {
  background: var(--text-color, #333);
  color: var(--background-color, #fff);
  transform: translateY(-2px);
}

.scroll-indicator {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  animation: fadeIn 1s ease forwards 5s;
}

.scroll-arrow {
  width: 2px;
  height: 30px;
  background: var(--text-color, #333);
  position: relative;
  animation: bounce 2s infinite;
}

.scroll-arrow::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: -4px;
  width: 8px;
  height: 8px;
  border-bottom: 2px solid var(--text-color, #333);
  border-right: 2px solid var(--text-color, #333);
  transform: rotate(45deg);
}

@keyframes slideUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

@media (max-width: 768px) {
  .hero {
    min-height: 105vh;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }

  .btn {
    width: 150px;
  }
}
</style>
