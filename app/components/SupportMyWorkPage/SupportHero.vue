<template>
  <section class="support-hero">
    <div class="container">
      <div class="hero-content">
        <h1 class="page-title">Support My Work</h1>
        <p class="page-subtitle">
          Help me continue creating open-source tools, innovative projects, and
          sharing knowledge with the developer community
        </p>
        <div class="hero-cta">
          <a
            href="https://github.com/sponsors/sethbr11"
            target="_blank"
            rel="noopener"
            class="btn btn-primary sponsor-btn"
          >
            <span class="btn-icon">
              <HeartIcon />
            </span>
            Become a GitHub Sponsor
          </a>
          <a href="/contact" class="btn btn-secondary"> Get in Touch </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HeartIcon from '@/components/icons/HeartIcon.vue'

export default defineComponent({
  name: 'SupportHero',
  components: {
    HeartIcon,
  },
})
</script>

<style scoped>
.support-hero {
  background: linear-gradient(
    135deg,
    var(--background-color) 0%,
    var(--background-variant) 100%
  );
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.support-hero::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle,
    rgba(216, 118, 40, 0.05) 0%,
    transparent 50%
  );
  animation: float 20s ease-in-out infinite;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.hero-content {
  position: relative;
  z-index: 2;
}

.page-title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  background: linear-gradient(45deg, #d87628, #ac5a17);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
  opacity: 0;
  transform: translateY(30px);
  animation: slideUp 0.8s ease forwards 0.2s;
}

.page-subtitle {
  font-size: 1.25rem;
  color: var(--text-color-muted);
  max-width: 700px;
  margin: 0 auto 3rem;
  line-height: 1.6;
  opacity: 0;
  transform: translateY(30px);
  animation: slideUp 0.8s ease forwards 0.4s;
}

.hero-cta {
  opacity: 0;
  transform: translateY(30px);
  animation: slideUp 0.8s ease forwards 0.6s;
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.sponsor-btn {
  background: linear-gradient(45deg, #e73c7e, #23a9f2);
  font-size: 1.2rem;
  padding: 1.2rem 2.5rem;
  box-shadow: 0 6px 25px rgba(231, 60, 126, 0.3);
  position: relative;
  overflow: hidden;
}

.sponsor-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: left 0.5s;
}

.sponsor-btn:hover::before {
  left: 100%;
}

.sponsor-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(231, 60, 126, 0.4);
}

.btn {
  padding: 1rem 2rem;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
}

.btn-secondary {
  background: transparent;
  color: var(--text-color);
  border: 2px solid var(--outline-color);
}

.btn-secondary:hover {
  background: var(--text-color);
  color: var(--background-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.btn-icon {
  width: 1.2rem;
  height: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-icon svg {
  width: 100%;
  height: 100%;
}

@keyframes slideUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
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

@media (max-width: 768px) {
  .support-hero {
    padding: 3rem 0 4rem;
  }
}
</style>
