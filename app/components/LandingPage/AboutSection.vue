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
        </div>
        <div class="about-text">
          <h2 class="section-title">About Me</h2>
          <p>
            I'm a developer and designer who brings ideas to life through clean
            code and thoughtful design. With a strong foundation in modern web
            technologies, I build digital experiences that are both visually
            appealing and high-performing. While my focus is on web development
            and DevOps, I'm always eager to solve problems across any digital
            medium you need.
          </p>
          <div class="stats">
            <div class="stat">
              <span class="stat-number">20+</span>
              <span class="stat-label">Tools & Frameworks</span>
            </div>
            <div class="stat">
              <span class="stat-number">3+</span>
              <span class="stat-label">Years Experience</span>
            </div>
            <div class="stat">
              <span class="stat-number">100%</span>
              <span class="stat-label">Client Satisfaction</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AboutSection",
});
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

.about-image img.profile-image {
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
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

@media (max-width: 768px) {
  .about-content {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .stats {
    justify-content: center;
  }
}
</style>
