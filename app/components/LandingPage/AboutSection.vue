<template>
  <section class="about" id="about">
    <div class="container">
      <div class="about-content">
        <div class="about-image">
          <img
            src="@/assets/images/SethBrockLight.jpeg"
            alt="Seth Brock"
            class="profile-image"
          />
          <div class="name-badge">Seth Brock</div>
        </div>
        <div class="about-text">
          <h2 class="section-title">About Me</h2>
          <p>
            I'm a DevOps engineer and software developer dedicated to building reliable, high-performance digital tools and cloud infrastructure. With a background in Information Systems (BYU MISM) and ongoing studies in English Literature (UVU BA), I bring together technical precision with clear communication, deep analytical reading, and creative problem solving.
          </p>
          <div class="stats">
            <div class="stat">
              <span class="stat-number">400+</span>
              <span class="stat-label">Repos &amp; Systems</span>
            </div>
            <div class="stat">
              <span class="stat-number">20+</span>
              <span class="stat-label">Tools &amp; Languages</span>
            </div>
            <div class="stat">
              <span class="stat-number">BA/MISM</span>
              <span class="stat-label">Degrees &amp; Studies</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AboutSection',
})
</script>

<style scoped>
.about {
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

.about-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 4rem;
  align-items: center;
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.8s ease;
  position: relative;
  z-index: 3;
}

.about-content.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.about-image {
  position: relative;
  text-align: center;
}

.about-image img.profile-image {
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.name-badge {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-color);
  background: var(--primary-lighter-variant);
  border-radius: 50px;
  transition: background 0.3s ease;
}

.about-text h2 {
  text-align: left;
  margin-bottom: 1.5rem;
}

.about-text p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-color);
  margin-bottom: 2rem;
}

.stats {
  display: flex;
  gap: 2rem;
}

.stat {
  text-align: center;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease;
}

.stat.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.stat-number {
  display: block;
  font-size: 2.5rem;
  font-weight: 800;
  color: #d87628;
}

.stat-label {
  font-size: 0.9rem;
  color: var(--text-color-muted, #666);
}

.darkmode .name-badge {
  background: var(--primary-darker-variant);
}

@media (max-width: 768px) {
  .about-text h2 {
    text-align: center;
  }

  .about-content {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .stats {
    justify-content: center;
  }
}
</style>
