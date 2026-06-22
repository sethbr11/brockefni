<template>
  <div class="diagram-container">
    <div class="diagram-wrapper">
      <svg class="unet-svg" viewBox="-5 -5 520 380" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="uDown" markerWidth="6" markerHeight="6" refX="3" refY="0" orient="auto">
            <path d="M 0 0 L 3 6 L 6 0" fill="none" stroke="#ff8008" stroke-width="1.2" />
          </marker>
          <marker id="uUp" markerWidth="6" markerHeight="6" refX="3" refY="6" orient="auto">
            <path d="M 0 6 L 3 0 L 6 6" fill="none" stroke="#27c93f" stroke-width="1.2" />
          </marker>
          <marker id="skipArr" markerWidth="6" markerHeight="6" refX="0" refY="3" orient="auto">
            <path d="M 0 0 L 6 3 L 0 6" fill="none" stroke="#888" stroke-width="1" />
          </marker>
        </defs>

        <!-- ═══ CONTRACTING PATH (left, going down) ═══ -->
        <!-- Level 1: 64-channel -->
        <rect x="12" y="10" width="16" height="80" rx="3" class="ub c1" />
        <rect x="32" y="10" width="16" height="80" rx="3" class="ub c1" />
        <line x1="29" y1="50" x2="32" y2="50" stroke="#3355aa" stroke-width="1.5" />
        <line x1="30" y1="94" x2="55" y2="114" stroke="#ff8008" stroke-width="1.5" marker-end="url(#uDown)" />

        <!-- Level 2: 128-channel -->
        <rect x="52" y="118" width="20" height="64" rx="3" class="ub c2" />
        <rect x="76" y="118" width="20" height="64" rx="3" class="ub c2" />
        <line x1="73" y1="150" x2="76" y2="150" stroke="#3355aa" stroke-width="1.5" />
        <line x1="75" y1="186" x2="105" y2="208" stroke="#ff8008" stroke-width="1.5" marker-end="url(#uDown)" />

        <!-- Level 3: 256-channel -->
        <rect x="102" y="212" width="24" height="50" rx="3" class="ub c3" />
        <rect x="130" y="212" width="24" height="50" rx="3" class="ub c3" />
        <line x1="127" y1="237" x2="130" y2="237" stroke="#3355aa" stroke-width="1.5" />
        <line x1="130" y1="266" x2="158" y2="282" stroke="#ff8008" stroke-width="1.5" marker-end="url(#uDown)" />

        <!-- Level 4: 512-channel -->
        <rect x="155" y="286" width="28" height="38" rx="3" class="ub c4" />
        <rect x="187" y="286" width="28" height="38" rx="3" class="ub c4" />
        <line x1="184" y1="305" x2="187" y2="305" stroke="#3355aa" stroke-width="1.5" />
        <line x1="190" y1="328" x2="215" y2="340" stroke="#ff8008" stroke-width="1.5" marker-end="url(#uDown)" />

        <!-- ═══ BOTTLENECK ═══ -->
        <rect x="218" y="334" width="30" height="24" rx="3" class="ub bn" />
        <rect x="252" y="334" width="30" height="24" rx="3" class="ub bn" />
        <line x1="249" y1="346" x2="252" y2="346" stroke="#3355aa" stroke-width="1.5" />

        <!-- ═══ EXPANDING PATH (right, going up) ═══ -->
        <line x1="283" y1="340" x2="307" y2="328" stroke="#27c93f" stroke-width="1.5" marker-end="url(#uUp)" />

        <!-- Level 4: 512-channel (expanding) -->
        <rect x="285" y="286" width="28" height="38" rx="3" class="ub e4" />
        <rect x="317" y="286" width="28" height="38" rx="3" class="ub e4" />
        <line x1="314" y1="305" x2="317" y2="305" stroke="#3355aa" stroke-width="1.5" />
        <line x1="330" y1="284" x2="351" y2="266" stroke="#27c93f" stroke-width="1.5" marker-end="url(#uUp)" />

        <!-- Level 3: 256-channel (expanding) -->
        <rect x="344" y="212" width="24" height="50" rx="3" class="ub e3" />
        <rect x="372" y="212" width="24" height="50" rx="3" class="ub e3" />
        <line x1="369" y1="237" x2="372" y2="237" stroke="#3355aa" stroke-width="1.5" />
        <line x1="383" y1="210" x2="405" y2="186" stroke="#27c93f" stroke-width="1.5" marker-end="url(#uUp)" />

        <!-- Level 2: 128-channel (expanding) -->
        <rect x="402" y="118" width="20" height="64" rx="3" class="ub e2" />
        <rect x="426" y="118" width="20" height="64" rx="3" class="ub e2" />
        <line x1="423" y1="150" x2="426" y2="150" stroke="#3355aa" stroke-width="1.5" />
        <line x1="438" y1="116" x2="453" y2="94" stroke="#27c93f" stroke-width="1.5" marker-end="url(#uUp)" />

        <!-- Level 1: 64-channel (expanding) -->
        <rect x="450" y="10" width="16" height="80" rx="3" class="ub e1" />
        <rect x="470" y="10" width="16" height="80" rx="3" class="ub e1" />
        <line x1="467" y1="50" x2="470" y2="50" stroke="#3355aa" stroke-width="1.5" />

        <!-- Output 1x1 conv bar -->
        <rect x="490" y="10" width="8" height="80" rx="2" class="ub out" />

        <!-- ═══ SKIP CONNECTIONS ═══ -->
        <line x1="50" y1="50" x2="448" y2="50" stroke="#888" stroke-width="1.2" stroke-dasharray="6 4" marker-end="url(#skipArr)" class="skip">
          <animate attributeName="stroke-dashoffset" values="0;-20" dur="2s" repeatCount="indefinite" />
        </line>
        <line x1="98" y1="150" x2="400" y2="150" stroke="#888" stroke-width="1.2" stroke-dasharray="6 4" marker-end="url(#skipArr)" class="skip">
          <animate attributeName="stroke-dashoffset" values="0;-20" dur="2s" repeatCount="indefinite" />
        </line>
        <line x1="156" y1="237" x2="342" y2="237" stroke="#888" stroke-width="1.2" stroke-dasharray="6 4" marker-end="url(#skipArr)" class="skip">
          <animate attributeName="stroke-dashoffset" values="0;-20" dur="2s" repeatCount="indefinite" />
        </line>
        <line x1="217" y1="305" x2="283" y2="305" stroke="#888" stroke-width="1.2" stroke-dasharray="6 4" marker-end="url(#skipArr)" class="skip">
          <animate attributeName="stroke-dashoffset" values="0;-20" dur="2s" repeatCount="indefinite" />
        </line>

        <!-- ═══ TOOLTIP STEP INDICATORS ═══ -->
        <g 
          v-for="step in steps" 
          :key="step.id"
          class="step-trigger"
          :class="{ active: activeStepId === step.id }"
          @mouseenter="onStepHover(step.id)"
          @mouseleave="onStepLeave"
          @click="onStepClick(step.id)"
        >
          <!-- Invisible larger touch target -->
          <circle :cx="step.cx" :cy="step.cy" r="20" fill="white" opacity="0" style="cursor: pointer; pointer-events: all;" />

          <!-- Visible indicator circle with solid background fill -->
          <circle :cx="step.cx" :cy="step.cy" r="9" class="tooltip-circle" />
          <text :x="step.cx" :y="step.cy + 4" text-anchor="middle" class="tooltip-num">{{ step.id }}</text>
        </g>
      </svg>

      <!-- Desktop absolute tooltips (calculated using exact SVG layout bounds) -->
      <div class="tooltip-overlay">
        <transition name="tooltip-fade">
          <div 
            v-if="activeStep" 
            class="tooltip-box"
            :class="'placement-' + activeStep.placement"
            :style="getTooltipStyle(activeStep)"
          >
            <strong>{{ activeStep.title }}</strong>
            <p>{{ activeStep.text }}</p>
          </div>
        </transition>
      </div>
    </div>

    <!-- Mobile-friendly details panel -->
    <div class="mobile-details-panel">
      <div v-if="activeStep" class="mobile-details-card">
        <div class="card-header">
          <span class="step-badge">Step {{ activeStep.id }}</span>
          <h4>{{ activeStep.title }}</h4>
        </div>
        <p>{{ activeStep.text }}</p>
      </div>
      <div v-else class="mobile-details-placeholder">
        <span>Tap the numbered step indicators on the diagram to see how data flows.</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Step {
  id: number
  cx: number
  cy: number
  title: string
  placement: 'top' | 'bottom' | 'left' | 'right'
  text: string
}

const steps: Step[] = [
  {
    id: 1,
    cx: 30,
    cy: 100,
    title: 'Contracting Path',
    placement: 'right',
    text: 'Each level applies two 3×3 convolutions followed by ReLU, then a 2×2 max-pool that halves spatial dimensions while doubling channel depth.'
  },
  {
    id: 2,
    cx: 250,
    cy: 365,
    title: 'Bottleneck',
    placement: 'top',
    text: 'The deepest layer captures the highest-level features at the lowest resolution. In diffusion models, the timestep embedding is injected here.'
  },
  {
    id: 3,
    cx: 250,
    cy: 50,
    title: 'Skip Connections',
    placement: 'bottom',
    text: 'Feature maps from each contracting level are concatenated with the corresponding expanding level, preserving spatial detail that would otherwise be lost.'
  },
  {
    id: 4,
    cx: 470,
    cy: 100,
    title: 'Expanding Path',
    placement: 'left',
    text: 'Up-convolutions (transposed convolutions) double the spatial resolution at each step while halving channel depth, progressively reconstructing the output.'
  },
  {
    id: 5,
    cx: 504,
    cy: 50,
    title: '1×1 Output Conv',
    placement: 'left',
    text: 'A final 1×1 convolution maps the feature channels to the desired output — in diffusion models, this predicts the noise to be subtracted.'
  }
]

const activeStepId = ref<number | null>(null)

const activeStep = computed(() => {
  if (activeStepId.value === null) return null
  return steps.find(s => s.id === activeStepId.value) || null
})

// Prevent hover logic from firing when a touch device is used
let isTouch = false
if (typeof window !== 'undefined') {
  window.addEventListener('touchstart', () => {
    isTouch = true
  }, { once: true })
}

// Calculate the percentage styles for the tooltip absolute placement
// viewBox dimensions: minX=-5, minY=-5, width=520, height=380
const getTooltipStyle = (step: Step) => {
  const minX = -5
  const minY = -5
  const width = 520
  const height = 380

  const xPercent = ((step.cx - minX) / width) * 100
  const yPercent = ((step.cy - minY) / height) * 100

  return {
    left: `${xPercent}%`,
    top: `${yPercent}%`
  }
}

const onStepHover = (id: number) => {
  if (isTouch) return
  activeStepId.value = id
}

const onStepLeave = () => {
  if (isTouch) return
  activeStepId.value = null
}

const onStepClick = (id: number) => {
  if (activeStepId.value === id) {
    activeStepId.value = null
  } else {
    activeStepId.value = id
  }
}
</script>

<style scoped>
.diagram-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.diagram-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 1rem 0;
}

.unet-svg {
  width: 100%;
  max-width: 540px;
  height: auto;
  display: block;
}

.ub {
  stroke: none;
  opacity: 0.85;
}

.ub.c1 { fill: #7eb4d8; }
.ub.c2 { fill: #6fa0c8; }
.ub.c3 { fill: #5e8db8; }
.ub.c4 { fill: #4d7aa8; }
.ub.bn { fill: #3c6898; }
.ub.e4 { fill: #4d7aa8; }
.ub.e3 { fill: #5e8db8; }
.ub.e2 { fill: #6fa0c8; }
.ub.e1 { fill: #7eb4d8; }
.ub.out { fill: #27c93f; }

.skip {
  opacity: 0.35;
}

/* Tooltip overlay styling */
.tooltip-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
}

.tooltip-circle {
  fill: var(--background-color, #181818);
  stroke: #ff8008;
  stroke-width: 1.5;
  cursor: pointer;
  transition: fill 0.2s, stroke-width 0.2s, stroke 0.2s;
}

.step-trigger:hover .tooltip-circle,
.step-trigger.active .tooltip-circle {
  fill: #ff8008;
  stroke: #ff8008;
  stroke-width: 1.8;
}

.tooltip-num {
  fill: #ff8008;
  font-size: 10px;
  font-weight: 700;
  pointer-events: none;
  transition: fill 0.2s;
}

.step-trigger:hover .tooltip-num,
.step-trigger.active .tooltip-num {
  fill: #111;
  font-weight: 800;
}

.tooltip-box {
  position: absolute;
  background: rgba(20, 20, 20, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 128, 8, 0.4);
  border-radius: 8px;
  padding: 0.8rem 1.1rem;
  color: #e0e0e0;
  font-size: 0.8rem;
  line-height: 1.5;
  width: 240px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5), 0 0 15px rgba(255,128,8,0.15);
  pointer-events: none;
  z-index: 100;
}

.tooltip-box strong {
  color: #ffc837;
  display: block;
  margin-bottom: 0.3rem;
  font-size: 0.85rem;
}

.tooltip-box p {
  margin: 0;
}

/* Placement variants */
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

/* Mobile panel styles */
.mobile-details-panel {
  display: none;
  width: 100%;
  margin-top: 1rem;
}

.mobile-details-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 128, 8, 0.25);
  border-radius: 12px;
  padding: 1.2rem;
  animation: fadeIn 0.3s ease;
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.6rem;
}

.step-badge {
  background: rgba(255, 128, 8, 0.15);
  color: #ff8008;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.2rem 0.5rem;
  border-radius: 20px;
  border: 1px solid rgba(255, 128, 8, 0.3);
}

.card-header h4 {
  margin: 0;
  font-size: 1.05rem;
  color: #ffc837;
}

.mobile-details-card p {
  margin: 0;
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--secondary-text-color, #aaa);
}

.mobile-details-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.01);
  border: 1px dashed var(--outline-color, rgba(255, 255, 255, 0.1));
  border-radius: 12px;
  padding: 1.2rem;
  color: var(--secondary-text-color, #888);
  font-size: 0.85rem;
  line-height: 1.4;
  text-align: center;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Transitions */
.tooltip-fade-enter-active,
.tooltip-fade-leave-active {
  transition: opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1), transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.tooltip-fade-enter-from,
.tooltip-fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.95);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .tooltip-overlay {
    display: none;
  }
  .mobile-details-panel {
    display: block;
  }
  .unet-svg {
    max-width: 380px;
  }
}
</style>
