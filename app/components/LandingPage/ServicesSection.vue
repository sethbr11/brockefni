<template>
  <section class="services">
    <div class="container">
      <h2 class="section-title">What I Do</h2>
      <div class="services-grid">
        <div class="service-card">
          <div class="service-icon">⚙️</div>
          <h3>DevOps &amp; Cloud</h3>
          <p>
            Architecting resilient cloud infrastructure, CI/CD automation, and developer observability tooling
          </p>
        </div>
        <div class="service-card">
          <div class="service-icon">🌐</div>
          <h3>Web Development</h3>
          <p>
            Building high-performance full-stack web applications and custom browser extensions
          </p>
        </div>
        <div class="service-card">
          <div class="service-icon">🖥️</div>
          <h3>Desktop &amp; SDKs</h3>
          <p>
            Developing cross-platform desktop applications, open-source SDKs, and CLI utilities
          </p>
        </div>
        <div class="service-card">
          <div class="service-icon">📚</div>
          <h3>Humanities &amp; Writing</h3>
          <p>
            Exploring English literature, creative writing, essays, and maintaining a digital reading garden
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ServicesSection',
})
</script>

<style scoped>
.services {
  background: var(--background-variant, #f8f9fa);
  padding: 5rem 0;
  position: relative;
  z-index: 2;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-title {
  font-size: 3rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 3rem;
  background: linear-gradient(45deg, #d87628, #ac5a17);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.service-card {
  background: var(--background-color, #fff);
  padding: 2.5rem 1.5rem;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(50px);
  position: relative;
  z-index: 3;
}

.service-card.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.service-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.service-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
}

.service-card h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--text-color, #333);
}

.service-card p {
  color: var(--text-color-muted, #666);
  line-height: 1.6;
}
</style>
