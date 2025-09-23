<template>
  <div v-if="visible" class="toast-notification">
    <div class="toast-content">
      <span>{{ message }}</span>
      <button @click="$emit('close')" class="toast-close">&times;</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ToastNotification',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  },
  emits: ['close']
})
</script>

<style scoped>
.toast-notification {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  max-width: 400px;
  animation: slideIn 0.3s ease-out;
}

.toast-content {
  background: var(--background-variant);
  border: 2px solid var(--primary-color);
  border-radius: 10px;
  padding: 1rem 1.5rem;
  box-shadow: 0 4px 20px var(--shadow);
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--text-color);
}

.toast-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--text-color);
  opacity: 0.7;
  transition: opacity 0.2s ease;
  flex-shrink: 0;
}

.toast-close:hover {
  opacity: 1;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .toast-notification {
    right: 10px;
    left: 10px;
    max-width: none;
  }

  .toast-content {
    padding: 1rem;
    font-size: 0.9rem;
  }
}
</style>
