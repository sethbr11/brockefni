<template>
  <div class="diagram-container">
    <div class="diagram-wrapper">
      <svg
        class="cdk-svg"
        viewBox="0 0 540 380"
        xmlns="http://www.w3.org/2000/svg"
      >
        <!-- Definitions for markers and filters -->
        <defs>
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 2 L 8 5 L 0 8 z" fill="rgba(132, 79, 186, 0.6)" />
          </marker>
          <linearGradient
            id="gradient-line"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stop-color="#844fba" stop-opacity="1.0" />
            <stop offset="100%" stop-color="#ff9900" stop-opacity="1.0" />
          </linearGradient>
        </defs>

        <!-- Dynamic Connection Lines -->
        <!-- Client to CloudFront (CDN acts as the single entry point) -->
        <path
          d="M 60,190 L 150,100"
          fill="none"
          stroke="#844fba"
          stroke-width="1.8"
          stroke-dasharray="4,4"
          marker-end="url(#arrow)"
        />

        <!-- CloudFront to S3 (Static assets origin routing) -->
        <path
          d="M 230,100 L 330,100"
          class="connection-line"
          fill="none"
          stroke-width="1.5"
          marker-end="url(#arrow)"
        />

        <!-- CloudFront to API Gateway (API endpoints reverse proxy routing) -->
        <path
          d="M 190,135 L 190,245"
          class="vertical-connector-line"
          fill="none"
          stroke-width="1.5"
          marker-end="url(#arrow)"
        />

        <!-- API Gateway to Lambda -->
        <path
          d="M 230,280 L 330,280"
          class="connection-line"
          fill="none"
          stroke-width="1.5"
          marker-end="url(#arrow)"
        />

        <!-- Lambda to DynamoDB -->
        <path
          d="M 410,280 L 455,280"
          class="connection-line"
          fill="none"
          stroke-width="1.5"
          marker-end="url(#arrow)"
        />

        <!-- Animation Pulsing Particles (data flow - Request/Response bi-directional) -->
        <!-- Assets flow (Request - Purple) -->
        <circle r="4.5" fill="#844fba" class="flow-particle-1">
          <animateMotion
            dur="4s"
            repeatCount="indefinite"
            path="M 35,190 L 60,190 L 150,100 L 190,100 L 370,100"
          />
        </circle>
        <circle r="4.5" fill="#844fba" class="flow-particle-1" opacity="0.7">
          <animateMotion
            dur="4s"
            begin="2s"
            repeatCount="indefinite"
            path="M 35,190 L 60,190 L 150,100 L 190,100 L 370,100"
          />
        </circle>

        <!-- Assets flow (Response - Cyan) -->
        <circle r="4.5" fill="#00e5ff" class="flow-particle-1-back">
          <animateMotion
            dur="4s"
            begin="1s"
            repeatCount="indefinite"
            path="M 370,100 L 190,100 L 150,100 L 60,190 L 35,190"
          />
        </circle>
        <circle
          r="4.5"
          fill="#00e5ff"
          class="flow-particle-1-back"
          opacity="0.7"
        >
          <animateMotion
            dur="4s"
            begin="3s"
            repeatCount="indefinite"
            path="M 370,100 L 190,100 L 150,100 L 60,190 L 35,190"
          />
        </circle>

        <!-- API flow (Request - Purple) -->
        <circle r="4.5" fill="#844fba" class="flow-particle-2">
          <animateMotion
            dur="5s"
            repeatCount="indefinite"
            path="M 35,190 L 60,190 L 150,100 L 190,100 L 190,280 L 370,280 L 490,280"
          />
        </circle>
        <circle r="4.5" fill="#844fba" class="flow-particle-2" opacity="0.7">
          <animateMotion
            dur="5s"
            begin="2.5s"
            repeatCount="indefinite"
            path="M 35,190 L 60,190 L 150,100 L 190,100 L 190,280 L 370,280 L 490,280"
          />
        </circle>

        <!-- API flow (Response - Cyan) -->
        <circle r="4.5" fill="#00e5ff" class="flow-particle-2-back">
          <animateMotion
            dur="5s"
            begin="1.25s"
            repeatCount="indefinite"
            path="M 490,280 L 370,280 L 190,280 L 190,100 L 150,100 L 60,190 L 35,190"
          />
        </circle>
        <circle
          r="4.5"
          fill="#00e5ff"
          class="flow-particle-2-back"
          opacity="0.7"
        >
          <animateMotion
            dur="5s"
            begin="3.75s"
            repeatCount="indefinite"
            path="M 490,280 L 370,280 L 190,280 L 190,100 L 150,100 L 60,190 L 35,190"
          />
        </circle>

        <!-- ═══════════ Architectural Nodes ═══════════ -->
        <!-- User Node -->
        <rect
          x="10"
          y="150"
          width="50"
          height="80"
          rx="6"
          class="node-box active-node"
        />
        <text x="35" y="185" text-anchor="middle" class="node-txt">Client</text>
        <text x="35" y="205" text-anchor="middle" class="node-txt-sub">
          Browser
        </text>

        <!-- CloudFront Node (CDN) -->
        <rect
          x="150"
          y="65"
          width="80"
          height="70"
          rx="8"
          class="node-box cdn-box"
        />
        <text x="190" y="95" text-anchor="middle" class="node-txt">
          CloudFront
        </text>
        <text x="190" y="112" text-anchor="middle" class="node-txt-sub">
          Global CDN
        </text>

        <!-- S3 Node (Frontend Bucket) -->
        <rect
          x="330"
          y="65"
          width="80"
          height="70"
          rx="8"
          class="node-box s3-box"
        />
        <text x="370" y="95" text-anchor="middle" class="node-txt">
          Amazon S3
        </text>
        <text x="370" y="112" text-anchor="middle" class="node-txt-sub">
          Static Host
        </text>

        <!-- API Gateway Node (REST API) -->
        <rect
          x="150"
          y="245"
          width="80"
          height="70"
          rx="8"
          class="node-box api-box"
        />
        <text x="190" y="275" text-anchor="middle" class="node-txt">
          API Gateway
        </text>
        <text x="190" y="292" text-anchor="middle" class="node-txt-sub">
          REST Endpoints
        </text>

        <!-- Lambda Node (Compute) -->
        <rect
          x="330"
          y="245"
          width="80"
          height="70"
          rx="8"
          class="node-box compute-box"
        />
        <text x="370" y="275" text-anchor="middle" class="node-txt">
          Lambda
        </text>
        <text x="370" y="292" text-anchor="middle" class="node-txt-sub">
          Node.js Handlers
        </text>

        <!-- DynamoDB Node (Database) -->
        <rect
          x="455"
          y="245"
          width="70"
          height="70"
          rx="8"
          class="node-box db-box"
        />
        <text x="490" y="275" text-anchor="middle" class="node-txt">
          DynamoDB
        </text>
        <text x="490" y="292" text-anchor="middle" class="node-txt-sub">
          NoSQL Table
        </text>

        <!-- Static Text Labels -->
        <text x="105" y="125" text-anchor="middle" class="line-label">
          Assets
        </text>
        <text x="105" y="255" text-anchor="middle" class="line-label">
          API Calls
        </text>

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
            :y="step.cy + 3.5"
            text-anchor="middle"
            class="tooltip-num"
          >
            {{ step.id }}
          </text>
        </g>
      </svg>

      <!-- Desktop Absolute Tooltip Overlay -->
      <div class="tooltip-overlay">
        <SharedTooltip
          :active="!!activeStep"
          :title="activeStep?.title"
          :text="activeStep?.text || ''"
          :placement="activeStep?.placement"
          :left="activeStep ? getTooltipStyle(activeStep).left : '0%'"
          :top="activeStep ? getTooltipStyle(activeStep).top : '0%'"
          :stepNumber="activeStep?.id"
          themeColor="#844fba"
        />
      </div>
    </div>

    <!-- Mobile Panel explanation below diagram -->
    <div class="mobile-details-panel">
      <span class="mobile-details-title"
        >Tap steps above to explore structure:</span
      >
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
          Select a step circle above to explore the serverless request flow.
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
    cx: 35,
    cy: 140,
    title: 'Client Web Browser',
    placement: 'top',
    text: 'The user visits the site. The browser downloads the static pages and Vue app bundle from CloudFront/S3. Once loaded, client-side JavaScript runs locally to drive user interactions.',
  },
  {
    id: 2,
    cx: 190,
    cy: 50,
    title: 'CloudFront CDN',
    placement: 'top',
    text: 'Distributes the compiled Vue.js web app. It caches and serves static pages directly from edge locations to keep load times low and optimize delivery speed.',
  },
  {
    id: 3,
    cx: 370,
    cy: 50,
    title: 'Amazon S3 Bucket',
    placement: 'top',
    text: 'Securely stores the static web files. CloudFront pulls files from this origin bucket when caches expire, enabling serverless static site delivery.',
  },
  {
    id: 4,
    cx: 190,
    cy: 330,
    title: 'Amazon API Gateway',
    placement: 'bottom',
    text: 'The API entry point. The static pages running in the user’s browser make secure REST calls to this gateway, which routes requests to backend handler functions.',
  },
  {
    id: 5,
    cx: 370,
    cy: 330,
    title: 'AWS Lambda (Node.js Functions)',
    placement: 'bottom',
    text: 'Serverless compute layer running Node.js handler functions for database interactions and admin tasks, provisioned and granted read/write database permissions by C# CDK stacks.',
  },
  {
    id: 6,
    cx: 490,
    cy: 330,
    title: 'Amazon DynamoDB',
    placement: 'bottom',
    text: 'A fully managed NoSQL key-value database. Storing application metrics, this tier handles millions of requests per second with single-digit millisecond latency.',
  },
]

const activeStepId = ref<number | null>(null)

const activeStep = computed(
  () => steps.find((s) => s.id === activeStepId.value) || null
)

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

// Map coordinate dimensions into percentage alignments
const getTooltipStyle = (step: Step) => {
  const minX = 0
  const minY = 0
  const width = 540
  const height = 380

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

.cdk-svg {
  width: 100%;
  max-width: 540px;
  height: auto;
  display: block;
}

/* Nodes styling */
.node-box {
  fill: var(--background-variant, rgba(255, 255, 255, 0.9));
  stroke: rgba(0, 0, 0, 0.55);
  stroke-width: 1.5;
  transition: all 0.3s ease;
}

:global(.darkmode) .node-box {
  fill: rgba(20, 20, 20, 0.6);
  stroke: rgba(255, 255, 255, 0.3);
}

.connection-line {
  stroke: rgba(0, 0, 0, 0.55);
  transition: stroke 0.3s ease;
}

:global(.darkmode) .connection-line {
  stroke: rgba(255, 255, 255, 0.35);
}

.vertical-connector-line {
  stroke: #844fba;
  transition: stroke 0.3s ease;
}

:global(.darkmode) .vertical-connector-line {
  stroke: #a78bfa;
}

.node-box.active-node {
  stroke: #ff9900;
  fill: rgba(255, 153, 0, 0.05);
}

.node-box.cdn-box {
  stroke: #844fba;
  fill: rgba(132, 79, 186, 0.05);
}

.node-box.s3-box {
  stroke: #3b82f6;
  fill: rgba(59, 130, 246, 0.05);
}

.node-box.api-box {
  stroke: #10b981;
  fill: rgba(16, 185, 129, 0.05);
}

.node-box.compute-box {
  stroke: #f59e0b;
  fill: rgba(245, 158, 11, 0.05);
}

.node-box.db-box {
  stroke: #ef4444;
  fill: rgba(239, 68, 68, 0.05);
}

.node-txt {
  fill: var(--text-color, #111827);
  font-size: 11px;
  font-weight: 700;
  transition: fill 0.3s ease;
}

.node-txt-sub {
  fill: var(--secondary-text-color, #4b5563);
  font-size: 9px;
  font-weight: 500;
  transition: fill 0.3s ease;
}

.line-label {
  fill: var(--secondary-text-color, #4b5563);
  font-size: 9px;
  font-family: monospace;
  font-weight: 600;
  transition: fill 0.3s ease;
}

/* Particle flows */
.flow-particle-1 {
  filter: drop-shadow(0 0 3px #ff9900);
}

.flow-particle-1-back {
  filter: drop-shadow(0 0 3px #00ffcc);
}

.flow-particle-2 {
  filter: drop-shadow(0 0 3px #844fba);
}

.flow-particle-2-back {
  filter: drop-shadow(0 0 3px #00e5ff);
}

/* Interactive indicators */
.tooltip-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
}

.step-trigger {
  cursor: pointer;
}

.tooltip-circle {
  fill: var(--background-color, #181818);
  stroke: #844fba;
  stroke-width: 1.5;
  transition: all 0.2s ease;
}

.step-trigger:hover .tooltip-circle,
.step-trigger.active .tooltip-circle {
  fill: #844fba;
  stroke: #844fba;
  stroke-width: 1.8;
}

.tooltip-num {
  fill: #844fba;
  font-size: 10px;
  font-weight: 700;
  pointer-events: none;
  transition: all 0.2s ease;
}

.step-trigger:hover .tooltip-num,
.step-trigger.active .tooltip-num {
  fill: #fff;
  font-weight: 800;
}

/* Mobile detail drawer styling */
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
  border: 1.5px solid #844fba;
  background: var(--background-color, #181818);
  color: #844fba;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.mobile-step-btn.active {
  background: #844fba;
  color: #fff;
  border-color: #844fba;
  transform: scale(1.1);
}

.mobile-details-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(132, 79, 186, 0.25);
  border-radius: 12px;
  padding: 1.2rem;
  animation: fadeIn 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  text-align: left;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.step-badge {
  background: rgba(132, 79, 186, 0.15);
  color: #844fba;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.2rem 0.5rem;
  border-radius: 20px;
  border: 1px solid rgba(132, 79, 186, 0.3);
}

.card-header h4 {
  margin: 0;
  font-size: 1rem;
  color: #ff9900;
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
  padding: 1.5rem;
  color: var(--secondary-text-color, #888);
  font-size: 0.85rem;
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
    opacity 0.2s ease,
    transform 0.2s ease;
}

.tooltip-fade-enter-from,
.tooltip-fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.95);
}

/* Responsive constraints */
@media (max-width: 768px) {
  .tooltip-overlay {
    display: none;
  }
  .mobile-details-panel {
    display: block;
  }
  .cdk-svg {
    max-width: 360px;
  }
}
</style>
