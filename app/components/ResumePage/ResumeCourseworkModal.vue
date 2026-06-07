<template>
  <Transition name="fade">
    <div v-if="show" class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-content glass-panel">
        <button class="close-btn" @click="$emit('close')">&times;</button>
        <h3 class="modal-title">
          <Icon name="lucide:book-open" class="modal-icon" />
          Specialized MISM Coursework
        </h3>
        <p class="modal-subtitle">
          Advanced subjects completed during Brigham Young University's
          integrated Master of Information Systems Management program.
        </p>
        <div class="course-modal-grid">
          <div
            v-for="course in courses"
            :key="course.name"
            class="modal-course-card"
          >
            <h4>{{ course.name }}</h4>
            <p>{{ course.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { Course } from '../../assets/data/resumeData'

export default defineComponent({
  name: 'ResumeCourseworkModal',
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    courses: {
      type: Array as PropType<Course[]>,
      required: true,
    },
  },
  emits: ['close'],
})
</script>

<style scoped>
/* Glass panel */
.glass-panel {
  background: var(--background-variant);
  border: 1px solid var(--outline-color);
  border-radius: 20px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
}

/* Modal Overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(10px);
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
  animation: fadeInModal 0.25s ease-out;
}

.modal-content {
  background: var(--background-variant);
  border: 1px solid var(--outline-color);
  border-radius: 20px;
  width: 100%;
  max-width: 700px;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  padding: 1.75rem;
  animation: slideUpModal 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  text-align: left;
}

/* Custom Scrollbar for Modal */
.modal-content::-webkit-scrollbar {
  width: 6px;
}
.modal-content::-webkit-scrollbar-track {
  background: transparent;
}
.modal-content::-webkit-scrollbar-thumb {
  background: var(--outline-color);
  border-radius: 3px;
}
.modal-content::-webkit-scrollbar-thumb:hover {
  background: var(--page-accent);
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1.25rem;
  font-size: 1.5rem;
  background: transparent;
  border: none;
  color: var(--text-color-muted);
  cursor: pointer;
  transition: color 0.2s ease;
}

.close-btn:hover {
  color: var(--page-accent);
}

.modal-title {
  font-size: 1.3rem;
  font-weight: 800;
  margin-top: 0;
  margin-bottom: 0.4rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-align: left;
}

.modal-icon {
  color: var(--page-accent);
  width: 22px;
  height: 22px;
}

.modal-subtitle {
  color: var(--secondary-text-color);
  font-size: 0.85rem;
  margin-bottom: 1.25rem;
  text-align: left;
}

.course-modal-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  text-align: left;
}

.modal-course-card {
  padding: 0.75rem 1rem;
  background: var(--background-lighter-variant);
  border: 1px solid var(--outline-color);
  border-radius: 12px;
  transition: all 0.2s ease;
  text-align: left;
}

.modal-course-card:hover {
  border-color: var(--page-accent);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px var(--page-accent-glow);
}

.modal-course-card h4 {
  font-size: 0.9rem;
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 0.4rem;
  color: var(--page-accent);
  text-align: left;
}

.modal-course-card p {
  font-size: 0.8rem;
  color: var(--secondary-text-color);
  line-height: 1.4;
  margin: 0;
  text-align: left;
}

@keyframes fadeInModal {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUpModal {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Transition Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .course-modal-grid {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
  .modal-content {
    padding: 1.25rem;
  }
}
</style>
