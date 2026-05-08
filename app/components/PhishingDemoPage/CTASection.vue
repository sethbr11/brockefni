<template>
  <section
    ref="section"
    class="cta-section"
    :class="{ 'is-visible': isVisible }"
  >
    <div class="cta-container">
      <div class="content">
        <h2 class="cta-title">Bring the Demo to Your Classroom</h2>
        <p class="cta-description">
          The Phishing Demo has been successfully used to engage students and
          spark meaningful discussions about online safety. Whether you're an
          educator looking for a guest speaker or a cybersecurity professional
          wanting to run the simulation yourself, I'm here to help.
        </p>
        <div class="cta-actions">
          <a :href="presentationMailto" class="btn btn-primary"
            >Book a Presentation</a
          >
          <a :href="materialsMailto" class="btn btn-secondary"
            >Request Demo Materials</a
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'

export default defineComponent({
  name: 'CTASection',
  setup() {
    const isVisible = ref(false)
    const section = ref<HTMLElement | null>(null)

    const presentationMailto =
      "mailto:seth@brockefni.com?subject=School%20Presentation%20Request&body=Hi%20Seth!%0A%0AI'm%20interested%20in%20having%20you%20present%20the%20Phishing%20Demo%20at%20our%20school.%0A%0AFrom%2C%0A%5BYOUR%20NAME%20HERE%5D"
    const materialsMailto =
      "mailto:seth@brockefni.com?subject=Phishing%20Demo%20Materials%20Request&body=Hi%20Seth!%0A%0AI'm%20interested%20in%20getting%20the%20materials%20to%20run%20the%20Phishing%20Demo%20myself.%0A%0AFrom%2C%0A%5BYOUR%20NAME%20HERE%5D"

    onMounted(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0]
          if (entry && entry.isIntersecting) {
            isVisible.value = true
            observer.unobserve(entry.target)
          }
        },
        { threshold: 0.2 }
      )

      if (section.value) {
        observer.observe(section.value)
      }
    })

    return {
      isVisible,
      section,
      presentationMailto,
      materialsMailto,
    }
  },
})
</script>

<style scoped>
.cta-section {
  padding: 8rem 2rem;
  background: var(--background-color);
  border-top: 1px solid var(--outline-color);
}

.cta-container {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  opacity: 0;
  transform: translateY(30px);
  transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
}

.cta-section.is-visible .cta-container {
  opacity: 1;
  transform: translateY(0);
}

.cta-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  color: var(--text-color);
}

.cta-description {
  font-size: 1.2rem;
  line-height: 1.7;
  color: var(--secondary-text-color);
  margin-bottom: 3rem;
}

.cta-actions {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
}

.btn {
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.2s;
}

.btn-primary {
  background: #ff3b3b;
  color: white;
}

.btn-primary:hover {
  background: #e02424;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(255, 59, 59, 0.2);
}

.btn-secondary {
  border: 1px solid var(--outline-color);
  color: var(--text-color);
}

.btn-secondary:hover {
  background: var(--outline-color);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .cta-section {
    padding: 5rem 1rem;
  }

  .cta-title {
    font-size: 2rem;
  }

  .cta-actions {
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }

  .btn {
    width: auto;
    font-size: 0.95rem;
    padding: 0.8rem 1.5rem;
  }
}
</style>
