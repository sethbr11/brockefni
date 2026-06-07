<template>
  <section class="resume-hero">
    <div class="hero-content">
      <div class="title-area">
        <span class="subtitle">PORTFOLIO RESUME</span>
        <h1 class="name-title">Seth Brock</h1>
        <p class="tagline">Software Engineer &amp; DevOps Specialist</p>
      </div>

      <div class="contact-quick">
        <a href="mailto:seth@brockefni.com" class="contact-link">
          <Icon name="lucide:mail" class="icon" /> seth@brockefni.com
        </a>
        <a
          href="https://linkedin.com/in/sethbrock11"
          target="_blank"
          class="contact-link"
        >
          <Icon name="lucide:linkedin" class="icon" />
          linkedin.com/in/sethbrock11
        </a>
      </div>

      <div class="view-controls">
        <a href="/resume.pdf" target="_blank" download class="download-pdf-btn">
          <Icon name="lucide:download" class="icon" /> Download PDF Resume
        </a>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ResumeHero',
})
</script>

<style scoped>
.resume-hero {
  padding: 4rem 1.5rem 3rem 1.5rem;
  background: linear-gradient(
    135deg,
    var(--background-color) 0%,
    var(--background-variant) 100%
  );
  border-bottom: 1px solid var(--outline-color);
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.subtitle {
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--page-accent);
}

.name-title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  margin: 0.5rem 0;
  color: var(--text-color);
  letter-spacing: -0.5px;
}

.tagline {
  font-size: clamp(1.1rem, 2vw, 1.4rem);
  color: var(--secondary-text-color);
  margin-bottom: 2rem;
}

.contact-quick {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;
}

.contact-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-color-muted);
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.2s ease;
}

.contact-link:hover {
  color: var(--page-accent);
}

.contact-link :deep(.icon) {
  width: 18px;
  height: 18px;
  color: var(--page-accent);
}

.view-controls {
  display: flex;
  justify-content: center;
  align-items: center;
}

.download-pdf-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.8rem;
  background: var(--page-accent);
  color: white !important;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  box-shadow: 0 4px 12px var(--page-accent-glow);
  transition: all 0.2s ease;
}

.download-pdf-btn:hover {
  background: var(--page-accent-hover);
  transform: translateY(-1px);
  box-shadow: 0 6px 18px var(--page-accent-glow);
}

@media (max-width: 768px) {
  .resume-hero {
    padding: 2.5rem 1rem 2rem 1rem;
  }

  .contact-quick {
    gap: 1rem;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .download-pdf-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
