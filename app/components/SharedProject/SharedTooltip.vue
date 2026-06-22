<template>
  <transition name="tooltip-fade">
    <div
      v-if="active"
      class="shared-tooltip-box"
      :class="['placement-' + placement]"
      :style="{
        left: left,
        top: top,
        '--accent-color': themeColor,
      }"
    >
      <div class="tooltip-header" v-if="title || stepNumber">
        <span
          class="step-badge"
          v-if="stepNumber"
          :style="{
            backgroundColor: themeColor + '15',
            color: themeColor,
            borderColor: themeColor + '30',
          }"
        >
          Step {{ stepNumber }}
        </span>
        <strong
          class="tooltip-title"
          :style="{ color: isDark ? '#ff9900' : themeColor }"
        >
          {{ title }}
        </strong>
      </div>
      <p class="tooltip-text">{{ text }}</p>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    active: boolean
    title?: string
    text: string
    placement?: 'top' | 'bottom' | 'left' | 'right'
    left: string
    top: string
    themeColor?: string
    stepNumber?: number
  }>(),
  {
    placement: 'top',
    themeColor: '#844fba',
  }
)

import { useState } from '#imports'

const isDark = useState<boolean>('isDark', () => false)
</script>

<style scoped>
.shared-tooltip-box {
  position: absolute;
  background: var(--background-variant, white);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--outline-color, #e5e7eb);
  border-radius: 8px;
  padding: 0.8rem 1.1rem;
  color: var(--text-color, #2c3e50);
  font-size: 0.8rem;
  line-height: 1.5;
  width: 240px;
  box-shadow:
    0 10px 30px var(--shadow, rgba(0, 0, 0, 0.08)),
    0 0 15px rgba(132, 79, 186, 0.05);
  pointer-events: none;
  z-index: 1000; /* Ensure it stays on top of other content layers */
  transition:
    background 0.3s ease,
    border 0.3s ease,
    color 0.3s ease,
    box-shadow 0.3s ease;
}

:global(.darkmode) .shared-tooltip-box {
  background: var(--background-variant, #23303e);
  border: 1px solid var(--outline-color, #56626f);
  color: var(--text-color, white);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
}

.tooltip-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.4rem;
  text-align: left;
}

.step-badge {
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.15rem 0.45rem;
  border-radius: 20px;
  border: 1px solid currentColor;
  white-space: nowrap;
}

.tooltip-title {
  display: block;
  font-size: 0.85rem;
  font-weight: 700;
}

.tooltip-text {
  margin: 0;
  text-align: left;
  color: var(--secondary-text-color, #6b7280);
}

:global(.darkmode) .tooltip-text {
  color: var(--secondary-text-color, #e2e2e2);
}

/* Position mapping */
.placement-top {
  transform: translate(-50%, -100%);
  margin-top: -12px;
}
.placement-bottom {
  transform: translate(-50%, 0);
  margin-top: 12px;
}
.placement-left {
  transform: translate(-100%, -50%);
  margin-left: -12px;
}
.placement-right {
  transform: translate(0, -50%);
  margin-left: 12px;
}

/* Simple fade transition prevents conflict with absolute translations */
.tooltip-fade-enter-active,
.tooltip-fade-leave-active {
  transition: opacity 0.2s ease;
}
.tooltip-fade-enter-from,
.tooltip-fade-leave-to {
  opacity: 0;
}
</style>
