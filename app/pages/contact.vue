<template>
  <div class="contact-page">
    <section class="contact-hero">
      <div class="container">
        <h1 class="page-title">Let's Work Together</h1>
        <p class="page-subtitle">
          Have a project in mind? I'd love to discuss how we can bring your
          vision to life.
        </p>
      </div>
    </section>

    <section class="contact-content">
      <div class="container">
        <div class="contact-grid">
          <div class="contact-info-section">
            <ContactInfo />
          </div>
          <div class="contact-form-section">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import ContactForm from '@/components/ContactPage/ContactForm.vue'
import ContactInfo from '@/components/ContactPage/ContactInfo.vue'
import { useHead } from '#app'

export default defineComponent({
  name: 'ContactPage',
  components: {
    ContactForm,
    ContactInfo,
  },
  setup() {
    useHead({
      title: 'Contact',
      meta: [
        {
          name: 'description',
          content:
            'Get in touch with Seth Brock for web development, design, and consulting services. Available for new projects.',
        },
        {
          name: 'author',
          content: 'Seth Brock',
        },
        {
          name: 'keywords',
          content:
            'Contact Seth Brock, web development, design, consulting, freelance projects',
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0',
        },
      ],
    })
  },
})
</script>

<style scoped>
.contact-page {
  min-height: 100vh;
  background: var(--background-color);
}

.contact-hero {
  background: linear-gradient(
    135deg,
    var(--background-color) 0%,
    var(--background-variant) 100%
  );
  padding: 2rem 0 4rem;
  text-align: center;
}

.container {
  max-width: 1200px;
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
  padding: 4rem 0 6rem;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

.contact-info-section {
  order: 1;
}

.contact-form-section {
  order: 2;
}

@media (max-width: 768px) {
  .contact-hero {
    padding: 4rem 0 2rem;
  }

  .contact-content {
    padding: 2rem 0 4rem;
  }

  .contact-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .contact-info-section {
    order: 2;
  }

  .contact-form-section {
    order: 1;
  }
}
</style>
