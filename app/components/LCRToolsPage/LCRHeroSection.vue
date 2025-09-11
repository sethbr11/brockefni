<template>
  <div class="lcr-hero">
    <!-- Floating geometric shapes -->
    <div class="floating-shapes">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
      <div class="shape shape-4"></div>
      <div class="shape shape-5"></div>
    </div>

    <div class="hero-content">
      <div class="logo-container">
        <img
          src="@/assets/images/lcrToolsLogo.jpg"
          alt="LCR Tools Logo"
          class="lcr-logo"
        />
      </div>

      <h1 class="hero-title">LCR Tools</h1>
      <p class="hero-subtitle">
        Enhance your LCR experience with powerful tools for clerks, secretaries,
        and leaders
      </p>

      <div class="hero-actions">
        <a
          href="https://chromewebstore.google.com/detail/lcr-tools/camjilfjkjmgcpmnheoeoomfndedpmbn"
          target="_blank"
          class="chrome-store-button"
        >
          <img
            src="@/assets/icons/chrome-web-store.png"
            alt="Chrome Web Store"
            class="chrome-icon"
          />
          Add to Chrome
        </a>
      </div>

      <div class="hero-stats">
        <div class="stat">
          <span class="stat-number">5.0</span>
          <span class="stat-label">Rating</span>
        </div>
        <div class="stat">
          <span class="stat-number">4</span>
          <span class="stat-label">Users</span>
        </div>
        <div class="stat">
          <span class="stat-number">Free</span>
          <span class="stat-label">Forever</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LCRHeroSection',
  setup() {
    useHead({
      title: 'LCR Tools - Chrome Extension',
      meta: [
        {
          name: 'description',
          content:
            'Enhance your LCR experience with powerful tools for clerks, secretaries, and leaders. Export data, process attendance, manage member information, and more.',
        },
        {
          name: 'keywords',
          content:
            'LCR Tools, Chrome Extension, LDS, Church, Clerk, Secretary, Leader Resources',
        },
        {
          name: 'author',
          content: 'Seth Brock',
        },
      ],
    })

    return {}
  },
})
</script>

<style scoped>
.lcr-hero {
  min-height: 82vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    var(--background-color) 0%,
    var(--background-variant) 50%,
    var(--background-color) 100%
  );
  background-size: 200% 200%;
  animation: gradientShift 20s ease infinite;
  position: relative;
  padding: 2rem 1rem;
  overflow: hidden;
}

.lcr-hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(circle at 20% 80%, var(--accent-color) 0%, transparent 70%),
    radial-gradient(
      circle at 80% 20%,
      var(--secondary-text-color) 0%,
      transparent 70%
    ),
    radial-gradient(circle at 40% 40%, var(--outline-color) 0%, transparent 70%);
  opacity: 0.4;
  animation: floatingBubbles 25s ease-in-out infinite;
}

.lcr-hero::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="15" height="15" patternUnits="userSpaceOnUse"><path d="M 15 0 L 0 0 0 15" fill="none" stroke="var(--outline-color)" stroke-width="0.8"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
  opacity: 0.2;
  animation: gridMove 40s linear infinite;
}

.hero-content {
  text-align: center;
  max-width: 800px;
  width: 100%;
  position: relative;
  z-index: 10;
}

.logo-container {
  margin-bottom: 2rem;
  animation: fadeInUp 1s ease-out;
}

.lcr-logo {
  width: 120px;
  height: 120px;
  border-radius: 20px;
  box-shadow: 0 8px 32px var(--shadow);
  object-fit: cover;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  color: var(--text-color);
  margin: 0 0 1rem 0;
  animation: fadeInUp 1s ease-out 0.2s both;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: var(--secondary-text-color);
  margin: 0 0 2.5rem 0;
  line-height: 1.6;
  animation: fadeInUp 1s ease-out 0.4s both;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 3rem;
  animation: fadeInUp 1s ease-out 0.6s both;
}

.chrome-store-button,
.github-button {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px var(--shadow);
}

.chrome-store-button {
  background: linear-gradient(135deg, #4285f4 0%, #34a853 100%);
  color: white;
}

.chrome-store-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px var(--heavy-shadow);
}

.github-button {
  background: var(--background-variant);
  color: var(--text-color);
  border: 2px solid var(--outline-color);
}

.github-button:hover {
  background: var(--outline-color);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px var(--heavy-shadow);
}

.chrome-icon,
.github-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
  animation: fadeInUp 1s ease-out 0.8s both;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.stat-number {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-color);
}

.stat-label {
  font-size: 0.9rem;
  color: var(--secondary-text-color);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes floatingBubbles {
  0% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.3;
  }
  33% {
    transform: translateY(-20px) rotate(120deg);
    opacity: 0.6;
  }
  66% {
    transform: translateY(10px) rotate(240deg);
    opacity: 0.4;
  }
  100% {
    transform: translateY(0px) rotate(360deg);
    opacity: 0.3;
  }
}

@keyframes gridMove {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(10px, 10px);
  }
}

/* Floating shapes */
.floating-shapes {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.shape {
  position: absolute;
  opacity: 0.15;
  animation: float 30s infinite linear;
  border: 1px solid var(--outline-color);
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
}

.shape-1 {
  width: 120px;
  height: 120px;
  background: linear-gradient(
    45deg,
    var(--accent-color),
    var(--secondary-text-color)
  );
  border-radius: 50%;
  top: 20%;
  left: 10%;
  animation-delay: 0s;
  animation-duration: 35s;
}

.shape-2 {
  width: 90px;
  height: 90px;
  background: linear-gradient(
    135deg,
    var(--secondary-text-color),
    var(--outline-color)
  );
  border-radius: 20%;
  top: 60%;
  right: 15%;
  animation-delay: -7s;
  animation-duration: 40s;
}

.shape-3 {
  width: 140px;
  height: 140px;
  background: linear-gradient(225deg, var(--outline-color), var(--text-color));
  border-radius: 30%;
  top: 40%;
  left: 80%;
  animation-delay: -14s;
  animation-duration: 45s;
}

.shape-4 {
  width: 70px;
  height: 70px;
  background: linear-gradient(90deg, var(--text-color), var(--accent-color));
  border-radius: 50%;
  top: 80%;
  left: 30%;
  animation-delay: -21s;
  animation-duration: 30s;
}

.shape-5 {
  width: 110px;
  height: 110px;
  background: linear-gradient(
    315deg,
    var(--background-variant),
    var(--outline-color)
  );
  border-radius: 40%;
  top: 10%;
  right: 40%;
  animation-delay: -28s;
  animation-duration: 38s;
}

@keyframes float {
  0% {
    transform: translateY(0px) rotate(0deg) scale(1);
  }
  25% {
    transform: translateY(-20px) rotate(90deg) scale(1.1);
  }
  50% {
    transform: translateY(-10px) rotate(180deg) scale(0.9);
  }
  75% {
    transform: translateY(-30px) rotate(270deg) scale(1.05);
  }
  100% {
    transform: translateY(0px) rotate(360deg) scale(1);
  }
}

/* Dark mode adjustments */
@media (prefers-color-scheme: dark) {
  .lcr-hero::before {
    opacity: 0.25;
  }

  .lcr-hero::after {
    opacity: 0.15;
  }

  .shape {
    opacity: 0.12;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .hero-actions {
    flex-direction: column;
    align-items: center;
  }

  .chrome-store-button,
  .github-button {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }

  .hero-stats {
    gap: 2rem;
  }
}

@media (max-width: 480px) {
  .lcr-hero {
    min-height: 70vh;
    padding: 1rem;
  }

  .hero-title {
    font-size: 2rem;
  }

  .lcr-logo {
    width: 100px;
    height: 100px;
  }
}
</style>
