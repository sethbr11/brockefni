<template>
  <section class="cta" id="contact">
    <div class="container">
      <div class="cta-content">
        <h2>Ready to Start Your Project?</h2>
        <p>Let's collaborate and bring your vision to life</p>
        <div class="cta-buttons">
          <a class="btn btn-primary" href="/contact">Get In Touch</a>
          <a
            class="btn btn-outline"
            href="/resume.pdf"
            target="_blank"
            rel="noopener"
            >Download Resume</a
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CTASection",
});
</script>

<style scoped>
.cta {
  background: linear-gradient(135deg, #d87628, #ac5a17);
  color: white;
  text-align: center;
  padding: 5rem 0;
  position: relative;
  z-index: 15;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.cta-content h2 {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: white;
}

.cta-content p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
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
  display: inline-block;
}

.btn-primary {
  background: white;
  color: #d87628;
}

.btn-outline {
  border: 2px solid white;
  background: transparent;
  color: white;
}

.btn-outline:hover {
  background: white;
  color: #d87628;
}

@media (max-width: 768px) {
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }

  .btn {
    width: 200px;
  }
}
</style>
