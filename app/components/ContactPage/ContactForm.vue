<template>
  <div class="contact-form-container">
    <form
      class="contact-form"
      @submit.prevent="handleSubmit"
      action="https://submit-form.com/idvmMbXXx"
      method="POST"
    >
      <div class="form-group">
        <label for="name">Full Name *</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          name="name"
          autocomplete="name"
          required
          :class="{ error: errors.name }"
          @blur="validateField('name')"
        />
        <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
      </div>

      <div class="form-group">
        <label for="email">Email Address *</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          name="email"
          autocomplete="email"
          required
          :class="{ error: errors.email }"
          @blur="validateField('email')"
        />
        <span v-if="errors.email" class="error-message">{{
          errors.email
        }}</span>
      </div>

      <div class="form-group">
        <label for="address">Address</label>
        <input
          id="address"
          v-model="form.address"
          type="text"
          name="address"
          autocomplete="off"
        />
        <span v-if="errors.address" class="error-message">{{
          errors.address
        }}</span>
      </div>

      <div class="form-group">
        <label for="subject">Subject *</label>
        <input
          id="subject"
          v-model="form.subject"
          type="text"
          name="subject"
          required
          :class="{ error: errors.subject }"
          @blur="validateField('subject')"
        />
        <span v-if="errors.subject" class="error-message">{{
          errors.subject
        }}</span>
      </div>

      <div class="form-group">
        <label for="message">Message *</label>
        <textarea
          id="message"
          v-model="form.message"
          name="message"
          rows="6"
          required
          :class="{ error: errors.message }"
          @blur="validateField('message')"
        ></textarea>
        <span v-if="errors.message" class="error-message">{{
          errors.message
        }}</span>
      </div>

      <div class="form-group">
        <label for="project-type">Project Type</label>
        <select
          id="project-type"
          v-model="form.projectType"
          name="project-type"
        >
          <option value="">Select a project type</option>
          <option value="web-development">Web Development</option>
          <option value="desktop-app">Desktop App</option>
          <option value="data-analysis">Data Analysis</option>
          <option value="ai-development">AI & LLM Development</option>
          <option value="consulting">Consulting</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div class="form-group">
        <label for="budget">Budget Range</label>
        <select id="budget" v-model="form.budget" name="budget">
          <option value="">Select budget range</option>
          <option value="under-250">Under $250</option>
          <option value="250-1k">$250 - $1,000</option>
          <option value="1k-2.5k">$1,000 - $2,500</option>
          <option value="2.5k-plus">$2,500+</option>
        </select>
      </div>

      <input
        type="hidden"
        name="_redirect"
        value="https://brockefni.com/contact?status=success"
      />
      <input
        type="hidden"
        name="_email.subject"
        value="New Contact Form Submission"
      />

      <div style="position: absolute; left: -5000px">
        <input type="text" name="honeypot" tabindex="-1" autocomplete="off" />
      </div>

      <input type="hidden" name="form_load_time" :value="form.loadTime" />

      <div class="form-actions">
        <button type="submit" class="btn btn-primary" :disabled="!isFormValid">
          <span>Send Message</span>
        </button>
      </div>
    </form>

    <div v-if="submitStatus === 'error'" class="error-message">
      Something went wrong. Please try again or email me directly.
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'

export default defineComponent({
  name: 'ContactForm',
  setup() {
    const form = ref({
      name: '',
      email: '',
      subject: '',
      message: '',
      projectType: '',
      budget: '',
      address: '', // Honeypot field
      decoy: '', // Decoy field
      loadTime: '', // Timing field
    })

    const errors = ref({
      name: '',
      email: '',
      address: '', // honeypot
      subject: '',
      message: '',
    })

    const submitStatus = ref<'idle' | 'success' | 'error'>('idle')

    const isFormValid = computed(() => {
      return (
        form.value.name &&
        form.value.email &&
        form.value.subject &&
        form.value.message &&
				form.value.form_load_time &&
        !Object.values(errors.value).some((error) => error)
      )
    })

    const validateField = (field: keyof typeof errors.value) => {
      switch (field) {
        case 'name':
          errors.value.name =
            form.value.name.length < 2
              ? 'Name must be at least 2 characters'
              : ''
          break
        case 'email':
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          errors.value.email = !emailRegex.test(form.value.email)
            ? 'Please enter a valid email address'
            : ''
          break
        case 'address': // honeypot
          break
        case 'subject':
          errors.value.subject =
            form.value.subject.length < 3
              ? 'Subject must be at least 3 characters'
              : ''
          break
        case 'message':
          errors.value.message =
            form.value.message.length < 10
              ? 'Message must be at least 10 characters'
              : ''
          break
      }
    }

    const handleSubmit = async (event: Event) => {
      // Validate all fields
      Object.keys(errors.value).forEach((field) =>
        validateField(field as keyof typeof errors.value)
      )

      if (!isFormValid.value) {
        return
      }

      // --- Spam detection logic ---
      const timeElapsed = Date.now() - parseInt(form.value.loadTime, 10)
      if (timeElapsed < 3000) {
        alert('Form submitted too quickly. Please try again.')
        window.location.href = '/contact?status=error'
        return
      }
      if (form.value.address.trim() !== '') {
        console.warn('Spam detected: honeypot field (address) is filled.')
        window.location.href = '/contact?status=error'
        return
      }
      if (form.value.decoy.trim() !== '') {
        console.warn('Spam detected: decoy field is filled.')
        window.location.href = '/contact?status=error'
        return
      }

      try {
        // Programmatically submit the form
        const formElement = event.target as HTMLFormElement
        formElement.submit()
      } catch (error) {
        console.error('Form submission error:', error)
        // Redirect back to the contact page with an error status
        window.location.href = '/contact?status=error'
      }
    }

    onMounted(() => {
      form.value.loadTime = Date.now().toString()
      const honeypotField = document.getElementById('address')
      if (honeypotField) {
        honeypotField.setAttribute('tabindex', '-1')
      }
    })

    return {
      form,
      errors,
      isFormValid,
      validateField,
      handleSubmit,
      submitStatus,
    }
  },
})
</script>

<style scoped>
.contact-form-container {
  max-width: 600px;
  margin: 0 auto;
}

.contact-form {
  background: var(--background-variant);
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px var(--shadow);
}

.form-group {
  margin-bottom: 2rem;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--text-color);
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 90%;
  padding: 1rem;
  border: 2px solid var(--outline-color);
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: var(--background-color);
  color: var(--text-color);
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(216, 118, 40, 0.1);
}

.form-group input.error,
.form-group textarea.error {
  border-color: #ef4444;
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.form-actions {
  text-align: center;
  margin-top: 2rem;
}

.btn {
  padding: 1rem 3rem;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  min-width: 160px;
}

.btn-primary {
  background: linear-gradient(45deg, #d87628, #ac5a17);
  color: white;
  box-shadow: 0 4px 15px rgba(216, 118, 40, 0.3);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(216, 118, 40, 0.4);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.btn-primary.submitting {
  background: linear-gradient(45deg, #999, #777);
}

.error-message {
  color: #ef4444;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  display: block;
}

.success-message {
  background: #10b981;
  color: white;
  padding: 1rem;
  border-radius: 10px;
  margin-top: 1rem;
  text-align: center;
}

/* Hide the nth child (honeypot field) */
.contact-form .form-group:nth-child(3) {
  position: absolute;
  left: -5000px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

.hidden-field {
  display: none;
}

@media (max-width: 768px) {
  .contact-form {
    padding: 2rem 1.5rem;
    margin: 0 1rem;
  }
}
</style>
