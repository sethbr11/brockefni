<template>
  <section class="hero-section">
    <div class="hero-bg-container">
      <img
        src="~/assets/images/tanner-building.png"
        alt="BYU Tanner Building"
        class="hero-bg-image"
      />
      <div class="hero-overlay"></div>
    </div>

    <div class="container hero-content-wrapper">
      <!-- Back Link -->
      <NuxtLink to="/byu" class="back-link glass-panel">
        <ArrowLeftIcon class="icon" /> Back to BYU Experience
      </NuxtLink>

      <!-- Page Header -->
      <div class="header-card glass-panel animate-fade-in">
        <div class="header-meta">
          <span class="program-tag">BYU IS Junior Core</span>
          <span class="type-tag">Integrated Exercises (INTEX)</span>
        </div>
        <h1 class="page-title">The Crucible of Systems Integration</h1>
        <p class="header-intro">
          INTEX represents the ultimate test of Brigham Young University's
          Information Systems program. At the end of each semester in the Junior
          Core, students spend an intensive, high-pressure week building an
          integrated enterprise system with the members of their team of 4,
          implementing everything they had learned together in all of their
          classes up to that point.
        </p>

        <!-- Core Stats Grid -->
        <div class="stats-grid">
          <div class="stat-card">
            <span class="stat-value">5 Days</span>
            <span class="stat-label">Execution Time</span>
          </div>
          <div class="stat-card">
            <span class="stat-value">60+ Hrs</span>
            <span class="stat-label">Per Team Member</span>
          </div>
          <div class="stat-card">
            <span class="stat-value">4 Courses</span>
            <span class="stat-label">Integrated per Project</span>
          </div>
          <div class="stat-card">
            <span class="stat-value">Panel</span>
            <span class="stat-label">Judged Presentation</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ArrowLeftIcon } from 'lucide-vue-next'

export default defineComponent({
  name: 'IntexHeroSection',
  components: {
    ArrowLeftIcon,
  },
})
</script>

<style scoped>
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Glass panel styling */
.glass-panel {
  background: var(--background-variant);
  border: 1px solid var(--outline-color);
  border-radius: 16px;
  box-shadow: 0 8px 30px var(--shadow);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

/* Hero Banner */
.hero-section {
  position: relative;
  min-height: 480px;
  display: flex;
  align-items: flex-end;
  padding: 5rem 0 2rem 0;
  overflow: hidden;
}

.hero-bg-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.hero-bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.55) contrast(1.05);
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 46, 93, 0.3) 0%,
    var(--background-color) 95%
  );
}

.hero-content-wrapper {
  position: relative;
  z-index: 2;
  width: 100%;
}

.back-link {
  position: absolute;
  top: -3.5rem;
  left: 1.5rem;
  padding: 0.5rem 1.25rem;
  font-size: 0.85rem;
  font-weight: 700;
  text-decoration: none;
  color: var(--text-color);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 30px;
}

.back-link:hover {
  border-color: var(--theme-accent);
  color: var(--theme-accent);
  transform: translateX(-3px);
}

.back-link .icon {
  width: 16px;
  height: 16px;
}

.header-card {
  padding: 2.5rem;
  margin-top: 1rem;
  text-align: left;
}

.header-meta {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.program-tag {
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  color: var(--theme-accent);
  letter-spacing: 1px;
}

.type-tag {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--text-color-muted);
}

.page-title {
  font-size: 2.5rem;
  font-weight: 900;
  margin: 0 0 1rem 0;
  letter-spacing: -0.75px;
  line-height: 1.15;
}

.header-intro {
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text-color-muted);
  max-width: 900px;
  margin: 0 0 2rem 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.25rem;
}

.stat-card {
  background: var(--background-lighter-variant);
  border: 1px solid var(--outline-color);
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--theme-accent-glow), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.stat-card:hover::before {
  opacity: 1;
}

.stat-card:hover {
  border-color: var(--theme-accent);
  transform: translateY(-3px);
  box-shadow: 0 8px 24px var(--theme-accent-glow);
}

.stat-value {
  display: block;
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--theme-accent);
}

.stat-label {
  display: block;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-color-muted);
  margin-top: 0.25rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.animate-fade-in {
  animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .hero-section {
    min-height: 420px;
    padding: 4rem 0 2rem 0;
  }

  .page-title {
    font-size: 2rem;
  }

  .header-card {
    padding: 1.5rem;
  }
}
</style>
