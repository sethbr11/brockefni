<template>
  <div class="contact-info">
    <h3>Get In Touch</h3>
    <p class="contact-description">
      Ready to start your next project? I'd love to hear about your ideas and
      discuss how we can bring them to life.
    </p>

    <div class="contact-methods">
      <a href="mailto:seth@brockefni.com" class="contact-method">
        <div class="contact-icon">📧</div>
        <div class="contact-details">
          <h4>Email</h4>
          <span>seth@brockefni.com</span>
        </div>
      </a>

      <a
        href="https://www.linkedin.com/in/sethbrock11/"
        target="_blank"
        rel="noopener"
        class="contact-method"
      >
        <div class="contact-icon">💼</div>
        <div class="contact-details">
          <h4>LinkedIn</h4>
          <span>Connect with me</span>
        </div>
      </a>

      <a href="#contact" class="contact-method">
        <div class="contact-icon">⚡</div>
        <div class="contact-details">
          <h4>Response Time</h4>
          <span>Usually within 24 hours</span>
        </div>
      </a>
    </div>

    <div class="availability">
      <h4>Current Availability</h4>
      <div class="availability-status available">
        <span class="status-dot"></span>
        <span>Available for new projects</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ContactInfo',
})
</script>

<style scoped>
.contact-info {
  background: var(--background-variant);
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px var(--shadow);
  text-align: left;
  height: fit-content;
}

.contact-info h3 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.contact-description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text-color-muted);
  margin-bottom: 2rem;
}

.contact-methods {
  margin-bottom: 2rem;
}

.contact-method {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  padding: 1rem;
  background: var(--background-color);
  border-radius: 15px;
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;
}

.contact-method:last-child {
  margin-bottom: 0;
}

.contact-method:hover {
  transform: translateX(5px);
  box-shadow: 0 5px 15px var(--shadow);
}

.contact-icon {
  font-size: 2rem;
  margin-right: 1rem;
  min-width: 50px;
  text-align: center;
}

.contact-details h4 {
  margin: 0 0 0.25rem 0;
  font-weight: 600;
  color: var(--text-color);
  font-size: 1rem;
}

.contact-details a {
  color: var(--primary-color);
  text-decoration: none;
  transition: color 0.3s ease;
}

.contact-details a:hover {
  color: var(--primary-variant);
}

.contact-details span {
  color: var(--text-color-muted);
}

.availability {
  padding: 1.5rem;
  background: var(--background-color);
  border-radius: 15px;
  text-align: center;
}

.availability h4 {
  margin: 0 0 1rem 0;
  color: var(--text-color);
  font-size: 1rem;
}

.availability-status {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #10b981;
  animation: pulse 2s infinite;
}

.available {
  color: #10b981;
  font-weight: 600;
}

@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .contact-info {
    padding: 1.5rem;
    margin: 0 1rem 2rem;
  }

  .contact-info h3 {
    font-size: 1.75rem;
    margin-bottom: 1rem;
  }

  .contact-description {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }

  .contact-methods {
    margin-bottom: 1.5rem;
  }

  .contact-method {
    padding: 0.875rem;
    margin-bottom: 0.875rem;
  }

  .contact-icon {
    font-size: 1.5rem;
    min-width: 40px;
    margin-right: 0.875rem;
  }

  .availability {
    padding: 1.25rem;
  }
}

@media (max-width: 480px) {
  .contact-info {
    padding: 1.25rem;
    margin: 0 0.5rem 1.5rem;
  }

  .contact-method {
    padding: 0.75rem;
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }

  .contact-icon {
    margin-right: 0;
    margin-bottom: 0.25rem;
  }
}
</style>
