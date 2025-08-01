<template>
  <div class="thank-you-page">
    <div class="container">
      <div class="thank-you-content">
        <div class="success-icon">✅</div>
        <h1>Thank You!</h1>
        <p>
          Your message has been sent successfully. I'll get back to you within
          24 hours.
        </p>
        <div class="action-buttons">
          <NuxtLink to="/" class="btn btn-primary">Back to Home</NuxtLink>
          <NuxtLink to="/projects" class="btn btn-secondary"
            >View My Work</NuxtLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ThankYouPage",
});
</script>

<style scoped>
.thank-you-page {
  min-height: calc(100vh - 140px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--background-color);
}

.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 0 20px;
}

.thank-you-content {
  text-align: center;
  background: var(--background-variant);
  padding: 4rem 3rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px var(--shadow);
}

.success-icon {
  font-size: 4rem;
  margin-bottom: 2rem;
}

.thank-you-content h1 {
  font-size: 3rem;
  font-weight: 800;
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.thank-you-content p {
  font-size: 1.25rem;
  color: var(--text-color-muted);
  margin-bottom: 3rem;
  line-height: 1.6;
}

.action-buttons {
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
  background: linear-gradient(45deg, #d87628, #ac5a17);
  color: white;
  box-shadow: 0 4px 15px rgba(216, 118, 40, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(216, 118, 40, 0.4);
}

.btn-secondary {
  background: transparent;
  color: var(--text-color);
  border: 2px solid var(--text-color);
}

.btn-secondary:hover {
  background: var(--text-color);
  color: var(--background-color);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .thank-you-content {
    padding: 3rem 2rem;
  }

  .action-buttons {
    flex-direction: column;
    align-items: center;
  }

  .btn {
    width: 200px;
  }
}
</style>
