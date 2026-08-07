<template>
  <div class="contact-page">
    <section class="contact-hero">
      <div class="container">
        <h1 class="page-title">Let's Work Together</h1>
        <p class="page-subtitle">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Reach out through any of the channels below.
        </p>
      </div>
    </section>

    <section class="contact-content">
      <div class="container">
        <div class="cards-grid">
          <!-- Email Card -->
          <a href="mailto:seth@brockefni.com" class="contact-card glass-panel email-card">
            <div class="card-icon-wrapper">
              <MailIcon class="icon" />
            </div>
            <h2 class="card-title">Email Me</h2>
            <p class="card-desc">Reach out directly to my inbox. I typically respond within 24 hours.</p>
            <span class="card-link">seth@brockefni.com &rarr;</span>
          </a>

          <!-- LinkedIn Card -->
          <a href="https://www.linkedin.com/in/sethbrock11/" target="_blank" rel="noopener" class="contact-card glass-panel linkedin-card">
            <div class="card-icon-wrapper">
              <LinkedinIcon class="icon" />
            </div>
            <h2 class="card-title">Connect on LinkedIn</h2>
            <p class="card-desc">Check out my professional background and send me a direct message.</p>
            <span class="card-link">linkedin.com/in/sethbrock11 &rarr;</span>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useHead } from '#app'
import { MailIcon, LinkedinIcon } from 'lucide-vue-next'

export default defineComponent({
  name: 'ContactPage',
  components: {
    MailIcon,
    LinkedinIcon,
  },
  setup() {
    useHead({
      title: 'Contact',
      meta: [
        {
          name: 'description',
          content: 'Get in touch with Seth Brock for web development, design, and consulting services. Available for new projects.',
        },
        {
          name: 'author',
          content: 'Seth Brock',
        },
        {
          name: 'keywords',
          content: 'Contact Seth Brock, web development, design, consulting, freelance projects',
        }
      ],
    })
  },
})
</script>

<style scoped>
.contact-page {
  min-height: 100vh;
  background: var(--background-color);
  padding-bottom: 4rem;
}

.contact-hero {
  background: linear-gradient(
    135deg,
    var(--background-color) 0%,
    var(--background-variant) 100%
  );
  padding: 4rem 0 3rem;
  text-align: center;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
}

.page-title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  background: linear-gradient(45deg, #d87628, #ac5a17);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
}

.page-subtitle {
  font-size: 1.25rem;
  color: var(--text-color-muted);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.contact-content {
  padding: 3rem 0;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
  align-items: stretch;
}

.glass-panel {
  background: var(--background-variant);
  border: 1px solid var(--outline-color);
  border-radius: 16px;
  box-shadow: 0 8px 30px var(--shadow);
}

.contact-card {
  display: flex;
  flex-direction: column;
  padding: 3rem 2rem;
  text-decoration: none;
  color: var(--text-color);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
  text-align: center;
  align-items: center;
}

.contact-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 0;
}

.contact-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  border-color: var(--primary-color);
}

.contact-card:hover::before {
  opacity: 1;
}

.card-icon-wrapper {
  width: 76px;
  height: 76px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.75rem;
  z-index: 1;
  transition: transform 0.3s ease;
}

.email-card .card-icon-wrapper {
  background: rgba(216, 118, 40, 0.15);
  color: #d87628;
}

.email-card:hover .card-icon-wrapper {
  background: #d87628;
  color: #ffffff;
  transform: scale(1.1) rotate(-5deg);
}

.linkedin-card .card-icon-wrapper {
  background: rgba(10, 102, 194, 0.15);
  color: #0a66c2;
}

.linkedin-card:hover .card-icon-wrapper {
  background: #0a66c2;
  color: #ffffff;
  transform: scale(1.1) rotate(5deg);
}

.icon {
  width: 36px;
  height: 36px;
}

.card-title {
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 1rem;
  z-index: 1;
}

.card-desc {
  font-size: 1.05rem;
  color: var(--text-color-muted);
  line-height: 1.5;
  margin-bottom: 2rem;
  flex-grow: 1;
  z-index: 1;
}

.card-link {
  font-size: 1rem;
  font-weight: 700;
  color: var(--primary-color);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  z-index: 1;
  transition: gap 0.2s ease;
}

.email-card:hover .card-link {
  color: #d87628;
  gap: 0.75rem;
}

.linkedin-card:hover .card-link {
  color: #0a66c2;
  gap: 0.75rem;
}

.darkmode .email-card .card-icon-wrapper {
  background: rgba(216, 118, 40, 0.2);
}

.darkmode .linkedin-card .card-icon-wrapper {
  background: rgba(10, 102, 194, 0.2);
  color: #3b82f6;
}

.darkmode .linkedin-card:hover .card-icon-wrapper {
  color: #ffffff;
}

.darkmode .linkedin-card:hover .card-link {
  color: #3b82f6;
}

@media (max-width: 768px) {
  .contact-hero {
    padding: 3rem 0 2rem;
  }
  
  .cards-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .contact-card {
    padding: 2rem 1.5rem;
  }
}
</style>
