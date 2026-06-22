<template>
  <div class="diagram-container">
    <div class="diagram-wrapper">
      <svg
        class="transformer-svg"
        viewBox="-30 170 600 600"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <marker
            id="arrUp"
            markerWidth="8"
            markerHeight="8"
            refX="4"
            refY="8"
            orient="auto"
          >
            <path
              d="M 1 8 L 4 1 L 7 8"
              fill="none"
              stroke="#555"
              stroke-width="1.2"
            />
          </marker>
        </defs>

        <!-- ═════════ ENCODER (left, x=130 center) ═════════ -->
        <text x="130" y="758" text-anchor="middle" class="svg-label">
          Inputs
        </text>
        <line
          x1="130"
          y1="745"
          x2="130"
          y2="730"
          stroke="#555"
          stroke-width="1.2"
          marker-end="url(#arrUp)"
        />

        <!-- Input Embedding -->
        <rect
          x="58"
          y="698"
          width="144"
          height="28"
          rx="5"
          class="blk embedding"
        />
        <text x="130" y="716" text-anchor="middle" class="blk-txt">
          Input Embedding
        </text>
        <line
          x1="130"
          y1="698"
          x2="130"
          y2="680"
          stroke="#555"
          stroke-width="1.2"
          marker-end="url(#arrUp)"
        />

        <!-- Positional Encoding ⊕ -->
        <circle
          cx="130"
          cy="668"
          r="10"
          fill="none"
          stroke="#888"
          stroke-width="1"
        />
        <text x="130" y="672" text-anchor="middle" class="pe-plus">⊕</text>
        <text x="10" y="672" text-anchor="start" class="pe-label">
          Positional Encoding
        </text>
        <line
          x1="130"
          y1="658"
          x2="130"
          y2="638"
          stroke="#555"
          stroke-width="1.2"
          marker-end="url(#arrUp)"
        />

        <!-- Encoder Nx box -->
        <rect
          x="44"
          y="450"
          width="172"
          height="186"
          rx="8"
          fill="none"
          class="dashed-boundary"
          stroke-width="1"
          stroke-dasharray="5 3"
        />
        <text x="34" y="548" text-anchor="middle" class="nx-label">N×</text>

        <!-- Multi-Head Attention -->
        <rect
          x="58"
          y="598"
          width="144"
          height="28"
          rx="5"
          class="blk attention"
        />
        <text x="130" y="616" text-anchor="middle" class="blk-txt">
          Multi-Head Attention
        </text>
        <path
          d="M 58 612 L 48 612 L 48 568 L 58 568"
          stroke="#555"
          stroke-width="1"
          fill="none"
          stroke-dasharray="3 2"
          opacity="0.5"
        />
        <line
          x1="130"
          y1="598"
          x2="130"
          y2="578"
          stroke="#555"
          stroke-width="1.2"
          marker-end="url(#arrUp)"
        />

        <!-- Add & Norm 1 -->
        <rect
          x="58"
          y="550"
          width="144"
          height="24"
          rx="5"
          class="blk addnorm"
        />
        <text x="130" y="566" text-anchor="middle" class="blk-txt">
          Add & Norm
        </text>
        <line
          x1="130"
          y1="550"
          x2="130"
          y2="530"
          stroke="#555"
          stroke-width="1.2"
          marker-end="url(#arrUp)"
        />

        <!-- Feed Forward -->
        <rect
          x="58"
          y="500"
          width="144"
          height="28"
          rx="5"
          class="blk feedforward"
        />
        <text x="130" y="518" text-anchor="middle" class="blk-txt">
          Feed Forward
        </text>
        <path
          d="M 58 514 L 48 514 L 48 470 L 58 470"
          stroke="#555"
          stroke-width="1"
          fill="none"
          stroke-dasharray="3 2"
          opacity="0.5"
        />
        <line
          x1="130"
          y1="500"
          x2="130"
          y2="480"
          stroke="#555"
          stroke-width="1.2"
          marker-end="url(#arrUp)"
        />

        <!-- Add & Norm 2 -->
        <rect
          x="58"
          y="454"
          width="144"
          height="24"
          rx="5"
          class="blk addnorm"
        />
        <text x="130" y="470" text-anchor="middle" class="blk-txt">
          Add & Norm
        </text>

        <!-- ═════════ DECODER (right, x=370 center) ═════════ -->
        <text x="370" y="758" text-anchor="middle" class="svg-label">
          Outputs
        </text>
        <text x="370" y="770" text-anchor="middle" class="svg-label-sm">
          (shifted right)
        </text>
        <line
          x1="370"
          y1="745"
          x2="370"
          y2="730"
          stroke="#555"
          stroke-width="1.2"
          marker-end="url(#arrUp)"
        />

        <!-- Output Embedding -->
        <rect
          x="298"
          y="698"
          width="144"
          height="28"
          rx="5"
          class="blk embedding"
        />
        <text x="370" y="716" text-anchor="middle" class="blk-txt">
          Output Embedding
        </text>
        <line
          x1="370"
          y1="698"
          x2="370"
          y2="680"
          stroke="#555"
          stroke-width="1.2"
          marker-end="url(#arrUp)"
        />

        <!-- Positional Encoding ⊕ -->
        <circle
          cx="370"
          cy="668"
          r="10"
          fill="none"
          stroke="#888"
          stroke-width="1"
        />
        <text x="370" y="672" text-anchor="middle" class="pe-plus">⊕</text>
        <text x="465" y="672" text-anchor="start" class="pe-label">
          Positional Encoding
        </text>
        <line
          x1="370"
          y1="658"
          x2="370"
          y2="638"
          stroke="#555"
          stroke-width="1.2"
          marker-end="url(#arrUp)"
        />

        <!-- Decoder Nx box -->
        <rect
          x="284"
          y="308"
          width="172"
          height="328"
          rx="8"
          fill="none"
          class="dashed-boundary"
          stroke-width="1"
          stroke-dasharray="5 3"
        />
        <text x="466" y="476" text-anchor="middle" class="nx-label">N×</text>

        <!-- Masked Multi-Head Attention -->
        <rect
          x="298"
          y="598"
          width="144"
          height="28"
          rx="5"
          class="blk attention masked"
        />
        <text x="370" y="611" text-anchor="middle" class="blk-txt">
          Masked Multi-Head
        </text>
        <text x="370" y="621" text-anchor="middle" class="blk-txt">
          Attention
        </text>
        <path
          d="M 298 612 L 288 612 L 288 568 L 298 568"
          stroke="#555"
          stroke-width="1"
          fill="none"
          stroke-dasharray="3 2"
          opacity="0.5"
        />
        <line
          x1="370"
          y1="598"
          x2="370"
          y2="578"
          stroke="#555"
          stroke-width="1.2"
          marker-end="url(#arrUp)"
        />

        <!-- Add & Norm 1 (decoder) -->
        <rect
          x="298"
          y="550"
          width="144"
          height="24"
          rx="5"
          class="blk addnorm"
        />
        <text x="370" y="566" text-anchor="middle" class="blk-txt">
          Add & Norm
        </text>
        <line
          x1="370"
          y1="550"
          x2="370"
          y2="530"
          stroke="#555"
          stroke-width="1.2"
          marker-end="url(#arrUp)"
        />

        <!-- Multi-Head Attention (cross-attention) -->
        <rect
          x="298"
          y="500"
          width="144"
          height="28"
          rx="5"
          class="blk attention"
        />
        <text x="370" y="518" text-anchor="middle" class="blk-txt">
          Multi-Head Attention
        </text>
        <path
          d="M 298 514 L 288 514 L 288 470 L 298 470"
          stroke="#555"
          stroke-width="1"
          fill="none"
          stroke-dasharray="3 2"
          opacity="0.5"
        />
        <line
          x1="370"
          y1="500"
          x2="370"
          y2="480"
          stroke="#555"
          stroke-width="1.2"
          marker-end="url(#arrUp)"
        />

        <!-- Add & Norm 2 (decoder) -->
        <rect
          x="298"
          y="454"
          width="144"
          height="24"
          rx="5"
          class="blk addnorm"
        />
        <text x="370" y="470" text-anchor="middle" class="blk-txt">
          Add & Norm
        </text>
        <line
          x1="370"
          y1="454"
          x2="370"
          y2="434"
          stroke="#555"
          stroke-width="1.2"
          marker-end="url(#arrUp)"
        />

        <!-- Feed Forward (decoder) -->
        <rect
          x="298"
          y="404"
          width="144"
          height="28"
          rx="5"
          class="blk feedforward"
        />
        <text x="370" y="422" text-anchor="middle" class="blk-txt">
          Feed Forward
        </text>
        <path
          d="M 298 418 L 288 418 L 288 374 L 298 374"
          stroke="#555"
          stroke-width="1"
          fill="none"
          stroke-dasharray="3 2"
          opacity="0.5"
        />
        <line
          x1="370"
          y1="404"
          x2="370"
          y2="384"
          stroke="#555"
          stroke-width="1.2"
          marker-end="url(#arrUp)"
        />

        <!-- Add & Norm 3 (decoder) -->
        <rect
          x="298"
          y="358"
          width="144"
          height="24"
          rx="5"
          class="blk addnorm"
        />
        <text x="370" y="374" text-anchor="middle" class="blk-txt">
          Add & Norm
        </text>
        <line
          x1="370"
          y1="358"
          x2="370"
          y2="318"
          stroke="#555"
          stroke-width="1.2"
          marker-end="url(#arrUp)"
        />

        <!-- ═════════ ABOVE THE Nx BLOCK ═════════ -->
        <!-- Linear -->
        <rect
          x="298"
          y="288"
          width="144"
          height="26"
          rx="5"
          class="blk linear-blk"
        />
        <text x="370" y="305" text-anchor="middle" class="blk-txt">Linear</text>
        <line
          x1="370"
          y1="288"
          x2="370"
          y2="268"
          stroke="#555"
          stroke-width="1.2"
          marker-end="url(#arrUp)"
        />

        <!-- Softmax -->
        <rect
          x="298"
          y="240"
          width="144"
          height="26"
          rx="5"
          class="blk softmax-blk"
        />
        <text x="370" y="257" text-anchor="middle" class="blk-txt">
          Softmax
        </text>
        <line
          x1="370"
          y1="240"
          x2="370"
          y2="220"
          stroke="#555"
          stroke-width="1.2"
          marker-end="url(#arrUp)"
        />

        <!-- Output Probabilities -->
        <text x="370" y="210" text-anchor="middle" class="svg-label">
          Output Probabilities
        </text>

        <!-- ═════════ CROSS-ATTENTION CONNECTION ═════════ -->
        <path
          d="M 202 466 L 240 466 L 240 514 L 298 514"
          stroke="#ff8008"
          stroke-width="2"
          fill="none"
          stroke-dasharray="6 3"
          class="cross-path"
        />

        <!-- ═════════ ANIMATED FLOW PARTICLES ═════════ -->
        <circle r="3" fill="#ffc837" opacity="0">
          <animateMotion
            dur="4s"
            repeatCount="indefinite"
            path="M 130 750 L 130 638"
          />
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            dur="4s"
            repeatCount="indefinite"
          />
        </circle>
        <circle r="3" fill="#ff8008" opacity="0">
          <animateMotion
            dur="6s"
            repeatCount="indefinite"
            path="M 370 750 L 370 638 L 370 318 L 370 210"
          />
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            dur="6s"
            repeatCount="indefinite"
          />
        </circle>
        <circle r="3" fill="#ff8008" opacity="0">
          <animateMotion
            dur="3s"
            repeatCount="indefinite"
            path="M 202 466 L 240 466 L 240 514 L 298 514"
          />
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>

        <!-- ═════════ TOOLTIP STEP INDICATORS ═════════ -->
        <g
          v-for="step in steps"
          :key="step.id"
          class="step-trigger"
          :class="{ active: activeStepId === step.id }"
          @mouseenter="onStepHover(step.id)"
          @mouseleave="onStepLeave"
          @click="onStepClick(step.id)"
        >
          <!-- Invisible larger touch target for easier tapping on mobile -->
          <circle
            :cx="step.cx"
            :cy="step.cy"
            r="20"
            fill="white"
            opacity="0"
            style="cursor: pointer; pointer-events: all"
          />

          <!-- Visible indicator circle with solid background to mask underlying diagram elements -->
          <circle :cx="step.cx" :cy="step.cy" r="9" class="tooltip-circle" />
          <text
            :x="step.cx"
            :y="step.cy + 4"
            text-anchor="middle"
            class="tooltip-num"
          >
            {{ step.id }}
          </text>
        </g>
      </svg>

      <!-- Desktop absolute tooltips (calculated using exact SVG layout bounds) -->
      <div class="tooltip-overlay">
        <SharedTooltip
          :active="!!activeStep"
          :title="activeStep?.title"
          :text="activeStep?.text || ''"
          :placement="activeStep?.placement"
          :left="activeStep ? getTooltipStyle(activeStep).left : '0%'"
          :top="activeStep ? getTooltipStyle(activeStep).top : '0%'"
          :stepNumber="activeStep?.id"
          themeColor="#ff8008"
        />
      </div>
    </div>

    <!-- Mobile Panel explanation below diagram -->
    <div class="mobile-details-panel">
      <span class="mobile-details-title">Tap steps to explore sequence:</span>
      <div class="mobile-steps-row">
        <button
          v-for="step in steps"
          :key="step.id"
          class="mobile-step-btn"
          :class="{ active: activeStepId === step.id }"
          @click="onStepClick(step.id)"
        >
          {{ step.id }}
        </button>
      </div>

      <transition name="tooltip-fade" mode="out-in">
        <div v-if="activeStep" class="mobile-details-card" :key="activeStep.id">
          <div class="card-header">
            <span class="step-badge">Step {{ activeStep.id }}</span>
            <h4>{{ activeStep.title }}</h4>
          </div>
          <p>{{ activeStep.text }}</p>
        </div>
        <div v-else class="mobile-details-placeholder">
          Select a step circle above to explore the Transformer flow.
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import SharedTooltip from '@/components/SharedProject/SharedTooltip.vue'

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
    cx: 208,
    cy: 712,
    title: 'Input Embedding',
    placement: 'right',
    text: 'Maps each input token to a dense vector of dimension d_model. This learned lookup table is the first transformation from discrete tokens to continuous representations.',
  },
  {
    id: 2,
    cx: 175,
    cy: 668,
    title: 'Positional Encoding',
    placement: 'right',
    text: 'Sine and cosine functions inject sequence-order information into the embeddings, since transformers have no inherent notion of position.',
  },
  {
    id: 3,
    cx: 208,
    cy: 612,
    title: 'Multi-Head Attention',
    placement: 'right',
    text: 'Queries, Keys, and Values are linearly projected into multiple subspaces. Each "head" learns different relationships, then results are concatenated.',
  },
  {
    id: 4,
    cx: 208,
    cy: 562,
    title: 'Add & Norm',
    placement: 'right',
    text: "A residual connection adds the sub-layer's input back to its output, then Layer Normalization stabilizes training by normalizing activations.",
  },
  {
    id: 5,
    cx: 208,
    cy: 514,
    title: 'Feed Forward Network',
    placement: 'right',
    text: 'Two linear transformations with a ReLU activation in between, applied independently to each position. Expands then contracts the representation.',
  },
  {
    id: 6,
    cx: 448,
    cy: 612,
    title: 'Masked Multi-Head Attention',
    placement: 'left',
    text: 'Same as multi-head attention, but future positions are masked to prevent the decoder from "cheating" by looking ahead during training.',
  },
  {
    id: 7,
    cx: 240,
    cy: 490,
    title: 'Cross-Attention',
    placement: 'top',
    text: 'The encoder\'s output becomes the Keys and Values, while the decoder provides the Queries. This is how the decoder "reads" the source sequence.',
  },
  {
    id: 8,
    cx: 448,
    cy: 253,
    title: 'Output Probabilities',
    placement: 'left',
    text: 'The linear layer maps to vocabulary size, then softmax normalizes into a probability distribution for the next token prediction.',
  },
]

const activeStepId = ref<number | null>(null)

const activeStep = computed(() => {
  if (activeStepId.value === null) return null
  return steps.find((s) => s.id === activeStepId.value) || null
})

// Prevent hover logic from firing when a touch device is used
let isTouch = false
if (typeof window !== 'undefined') {
  window.addEventListener(
    'touchstart',
    () => {
      isTouch = true
    },
    { once: true }
  )
}

// Calculate the percentage styles for the tooltip absolute placement
// viewBox dimensions: minX=-30, minY=170, width=600, height=600
const getTooltipStyle = (step: Step) => {
  const minX = -30
  const minY = 170
  const width = 600
  const height = 600

  const xPercent = ((step.cx - minX) / width) * 100
  const yPercent = ((step.cy - minY) / height) * 100

  return {
    left: `${xPercent}%`,
    top: `${yPercent}%`,
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

.transformer-svg {
  width: 100%;
  max-width: 540px;
  height: auto;
  display: block;
}

.svg-label {
  fill: var(--text-color, #1f2937);
  font-size: 12px;
  font-weight: 600;
  transition: fill 0.3s ease;
}

:global(.darkmode) .svg-label {
  fill: #e0e0e0;
}

.svg-label-sm {
  fill: var(--secondary-text-color, #4b5563);
  font-size: 10px;
  transition: fill 0.3s ease;
}

:global(.darkmode) .svg-label-sm {
  fill: #888;
}

.dashed-boundary {
  stroke: rgba(0, 0, 0, 0.3);
  transition: stroke 0.3s ease;
}

:global(.darkmode) .dashed-boundary {
  stroke: rgba(255, 255, 255, 0.18);
}

.blk {
  stroke-width: 1.5;
  transition:
    fill 0.3s ease,
    stroke 0.3s ease;
}

.blk.embedding {
  fill: rgba(244, 63, 94, 0.05);
  stroke: rgba(244, 63, 94, 0.5);
}
.blk.attention {
  fill: rgba(245, 158, 11, 0.05);
  stroke: rgba(245, 158, 11, 0.5);
}
.blk.attention.masked {
  fill: rgba(245, 158, 11, 0.08);
  stroke: rgba(245, 158, 11, 0.6);
}
.blk.addnorm {
  fill: rgba(234, 179, 8, 0.04);
  stroke: rgba(234, 179, 8, 0.5);
}
.blk.feedforward {
  fill: rgba(59, 130, 246, 0.05);
  stroke: rgba(59, 130, 246, 0.5);
}
.blk.linear-blk {
  fill: rgba(139, 92, 246, 0.05);
  stroke: rgba(139, 92, 246, 0.5);
}
.blk.softmax-blk {
  fill: rgba(16, 185, 129, 0.05);
  stroke: rgba(16, 185, 129, 0.5);
}

:global(.darkmode) .blk.embedding {
  fill: rgba(251, 209, 215, 0.15);
  stroke: #fbd1d7;
}
:global(.darkmode) .blk.attention {
  fill: rgba(250, 209, 158, 0.15);
  stroke: #fad19e;
}
:global(.darkmode) .blk.attention.masked {
  fill: rgba(250, 209, 158, 0.25);
  stroke: #fad19e;
}
:global(.darkmode) .blk.addnorm {
  fill: rgba(236, 236, 159, 0.12);
  stroke: #ecec9f;
}
:global(.darkmode) .blk.feedforward {
  fill: rgba(179, 222, 244, 0.15);
  stroke: #b3def4;
}
:global(.darkmode) .blk.linear-blk {
  fill: rgba(209, 210, 235, 0.15);
  stroke: #d1d2eb;
}
:global(.darkmode) .blk.softmax-blk {
  fill: rgba(189, 224, 181, 0.15);
  stroke: #bde0b5;
}

.blk-txt {
  fill: var(--text-color, #1f2937);
  font-size: 10px;
  font-weight: 500;
  transition: fill 0.3s ease;
}

:global(.darkmode) .blk-txt {
  fill: #e0e0e0;
}

.pe-plus {
  fill: var(--text-color, #1f2937);
  font-size: 14px;
  transition: fill 0.3s ease;
}

:global(.darkmode) .pe-plus {
  fill: #e0e0e0;
}

.pe-label {
  fill: var(--secondary-text-color, #4b5563);
  font-size: 9px;
  transition: fill 0.3s ease;
}

:global(.darkmode) .pe-label {
  fill: #888;
}

.nx-label {
  fill: var(--secondary-text-color, #4b5563);
  font-size: 14px;
  font-weight: 700;
  transition: fill 0.3s ease;
}

:global(.darkmode) .nx-label {
  fill: #888;
}

.cross-path {
  animation: crossDash 1.5s linear infinite;
}

@keyframes crossDash {
  to {
    stroke-dashoffset: -18;
  }
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
  transition:
    fill 0.2s,
    stroke-width 0.2s,
    stroke 0.2s;
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

/* Mobile panel styles */
.mobile-details-panel {
  display: none;
  width: 100%;
  margin-top: 1rem;
}

.mobile-details-title {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--secondary-text-color, #888);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.5rem;
  display: block;
}

.mobile-steps-row {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 1rem;
}

.mobile-step-btn {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1.5px solid #ff8008;
  background: var(--background-color, #181818);
  color: #ff8008;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.mobile-step-btn.active {
  background: #ff8008;
  color: #fff;
  border-color: #ff8008;
  transform: scale(1.1);
}

.mobile-details-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 128, 8, 0.25);
  border-radius: 12px;
  padding: 1.2rem;
  animation: fadeIn 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
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
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Transitions */
.tooltip-fade-enter-active,
.tooltip-fade-leave-active {
  transition:
    opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
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
  .transformer-svg {
    max-width: 360px;
  }
}
</style>
