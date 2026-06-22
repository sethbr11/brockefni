<template>
  <div class="diagram-container">
    <div class="diagram-wrapper">
      <svg
        class="terraform-svg"
        viewBox="0 0 540 380"
        xmlns="http://www.w3.org/2000/svg"
      >
        <!-- Definitions for markers and gradients -->
        <defs>
          <marker
            id="arrow-purple"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 2 L 8 5 L 0 8 z" fill="#844fba" />
          </marker>
          <linearGradient id="purple-blue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#844fba" stop-opacity="1.0" />
            <stop offset="100%" stop-color="#3b82f6" stop-opacity="1.0" />
          </linearGradient>
        </defs>

        <!-- VPC Boundary Box -->
        <rect
          x="130"
          y="40"
          width="395"
          height="320"
          rx="10"
          class="vpc-box"
          stroke-width="1.5"
        />
        <text x="145" y="60" class="group-label">
          Virtual Private Cloud (VPC)
        </text>

        <!-- Availability Zone A Box -->
        <rect x="250" y="80" width="125" height="260" rx="8" class="az-box" />
        <text x="258" y="98" class="group-label-sub">AZ A</text>

        <!-- Availability Zone B Box -->
        <rect x="385" y="80" width="125" height="260" rx="8" class="az-box" />
        <text x="393" y="98" class="group-label-sub">AZ B</text>

        <!-- Public Subnet A Boundary Box (AZ A) -->
        <rect
          x="255"
          y="105"
          width="115"
          height="125"
          rx="6"
          class="subnet-boundary"
        />
        <text x="312.5" y="125" text-anchor="middle" class="subnet-txt">
          Public Subnet A
        </text>

        <!-- Private Subnet A Boundary Box (AZ A) -->
        <rect
          x="255"
          y="240"
          width="115"
          height="90"
          rx="6"
          class="subnet-boundary"
        />
        <text x="312.5" y="318" text-anchor="middle" class="subnet-txt">
          Private Subnet A
        </text>

        <!-- Public Subnet B Boundary Box (AZ B) -->
        <rect
          x="390"
          y="105"
          width="115"
          height="125"
          rx="6"
          class="subnet-boundary"
        />
        <text x="447.5" y="125" text-anchor="middle" class="subnet-txt">
          Public Subnet B
        </text>

        <!-- Private Subnet B Boundary Box (AZ B) -->
        <rect
          x="390"
          y="240"
          width="115"
          height="90"
          rx="6"
          class="subnet-boundary"
        />
        <text x="447.5" y="318" text-anchor="middle" class="subnet-txt">
          Private Subnet B
        </text>

        <!-- ═══════════ Connection Paths ═══════════ -->
        <!-- Client -> ALB -->
        <path
          d="M 70,190 L 160,190"
          fill="none"
          stroke="#844fba"
          stroke-width="1.8"
          stroke-dasharray="4,4"
          marker-end="url(#arrow-purple)"
        />

        <!-- ALB -> ECS Task A -->
        <path
          d="M 210,180 L 270,180"
          class="connection-line"
          fill="none"
          stroke-width="1.5"
          marker-end="url(#arrow-purple)"
        />
        <!-- ALB -> ECS Task B (Routed above ECS Task A to prevent visual overlap) -->
        <path
          d="M 210,170 L 235,135 L 375,135 L 405,180"
          class="connection-line"
          fill="none"
          stroke-width="1.5"
          marker-end="url(#arrow-purple)"
        />

        <!-- ECR -> ECS Tasks (Docker pull) -->
        <path
          d="M 80,80 L 270,180"
          class="deploy-line"
          fill="none"
          stroke-width="1.2"
          stroke-dasharray="2,2"
        />
        <path
          d="M 80,80 L 405,180"
          class="deploy-line"
          fill="none"
          stroke-width="1.2"
          stroke-dasharray="2,2"
        />

        <!-- Connection paths to database (routed through network gap to bypass Private Subnet A) -->
        <path
          d="M 312.5,205 L 312.5,235 L 447.5,235 L 447.5,250"
          class="connection-line"
          fill="none"
          stroke-width="1.2"
          stroke-dasharray="2,2"
        />
        <path
          d="M 447.5,205 L 447.5,250"
          class="connection-line"
          fill="none"
          stroke-width="1.2"
          stroke-dasharray="2,2"
        />

        <!-- ═══════════ Nodes ═══════════ -->
        <!-- Client Node (Web Browser) -->
        <rect
          x="10"
          y="155"
          width="60"
          height="70"
          rx="6"
          class="node-box client-box"
        />
        <text x="40" y="190" text-anchor="middle" class="node-txt">Client</text>
        <text x="40" y="205" text-anchor="middle" class="node-txt-sub">
          Browser
        </text>

        <!-- Developer (Terraform CLI) -->
        <rect
          x="10"
          y="280"
          width="60"
          height="60"
          rx="6"
          class="node-box tf-box"
        />
        <text x="40" y="308" text-anchor="middle" class="node-txt">
          Terraform
        </text>
        <text x="40" y="323" text-anchor="middle" class="node-txt-sub">
          Apply
        </text>

        <!-- ECR Node (Registry) -->
        <rect
          x="10"
          y="50"
          width="70"
          height="60"
          rx="6"
          class="node-box ecr-box"
        />
        <text x="45" y="78" text-anchor="middle" class="node-txt">
          Elastic CR
        </text>
        <text x="45" y="93" text-anchor="middle" class="node-txt-sub">
          Docker ECR
        </text>

        <!-- Application Load Balancer -->
        <rect
          x="160"
          y="155"
          width="50"
          height="70"
          rx="6"
          class="node-box alb-box"
        />
        <text x="185" y="185" text-anchor="middle" class="node-txt">ALB</text>
        <text x="185" y="200" text-anchor="middle" class="node-txt-sub">
          Balancer
        </text>

        <!-- ECS Tasks (Container instance A) -->
        <rect
          x="270"
          y="155"
          width="85"
          height="50"
          rx="6"
          class="node-box container-box"
        />
        <text x="312.5" y="177" text-anchor="middle" class="node-txt">
          ECS Task A
        </text>
        <text x="312.5" y="191" text-anchor="middle" class="node-txt-sub">
          Docker Fargate
        </text>

        <!-- ECS Tasks (Container instance B) -->
        <rect
          x="405"
          y="155"
          width="85"
          height="50"
          rx="6"
          class="node-box container-box"
        />
        <text x="447.5" y="177" text-anchor="middle" class="node-txt">
          ECS Task B
        </text>
        <text x="447.5" y="191" text-anchor="middle" class="node-txt-sub">
          Docker Fargate
        </text>

        <text x="105" y="175" text-anchor="middle" class="line-label">
          Client
        </text>
        <text x="105" y="125" text-anchor="middle" class="line-label">
          Deploy
        </text>

        <!-- RDS MySQL Database (RDS Module) -->
        <rect
          x="395"
          y="250"
          width="105"
          height="50"
          rx="6"
          class="node-box db-box"
        />
        <text x="447.5" y="272" text-anchor="middle" class="node-txt">
          Amazon RDS
        </text>
        <text x="447.5" y="286" text-anchor="middle" class="node-txt-sub">
          MySQL Instance
        </text>

        <!-- ═══════════ Flow Particles (Drawn on top of nodes) ═══════════ -->
        <!-- Client to Task A (Request / Response) -->
        <circle r="4.5" fill="#844fba" class="flow-particle-cdk">
          <animateMotion
            dur="4s"
            repeatCount="indefinite"
            path="M 40,190 L 185,190 L 210,180 L 270,180 L 312.5,180"
          />
        </circle>
        <circle r="4.5" fill="#844fba" class="flow-particle-cdk" opacity="0.7">
          <animateMotion
            dur="4s"
            begin="2s"
            repeatCount="indefinite"
            path="M 40,190 L 185,190 L 210,180 L 270,180 L 312.5,180"
          />
        </circle>
        <circle r="4.5" fill="#00e5ff" class="flow-particle-cdk-back">
          <animateMotion
            dur="4s"
            begin="1s"
            repeatCount="indefinite"
            path="M 312.5,180 L 270,180 L 210,180 L 185,190 L 40,190"
          />
        </circle>
        <circle
          r="4.5"
          fill="#00e5ff"
          class="flow-particle-cdk-back"
          opacity="0.7"
        >
          <animateMotion
            dur="4s"
            begin="3s"
            repeatCount="indefinite"
            path="M 312.5,180 L 270,180 L 210,180 L 185,190 L 40,190"
          />
        </circle>

        <!-- Client to Task B (Request / Response) -->
        <circle r="4.5" fill="#844fba" class="flow-particle-cdk-blue">
          <animateMotion
            dur="4.5s"
            repeatCount="indefinite"
            path="M 40,190 L 185,190 L 210,170 L 235,135 L 375,135 L 405,180 L 447.5,180"
          />
        </circle>
        <circle
          r="4.5"
          fill="#844fba"
          class="flow-particle-cdk-blue"
          opacity="0.7"
        >
          <animateMotion
            dur="4.5s"
            begin="2.25s"
            repeatCount="indefinite"
            path="M 40,190 L 185,190 L 210,170 L 235,135 L 375,135 L 405,180 L 447.5,180"
          />
        </circle>
        <circle r="4.5" fill="#00e5ff" class="flow-particle-cdk-blue-back">
          <animateMotion
            dur="4.5s"
            begin="1.125s"
            repeatCount="indefinite"
            path="M 447.5,180 L 405,180 L 375,135 L 235,135 L 210,170 L 185,190 L 40,190"
          />
        </circle>
        <circle
          r="4.5"
          fill="#00e5ff"
          class="flow-particle-cdk-blue-back"
          opacity="0.7"
        >
          <animateMotion
            dur="4.5s"
            begin="3.375s"
            repeatCount="indefinite"
            path="M 447.5,180 L 405,180 L 375,135 L 235,135 L 210,170 L 185,190 L 40,190"
          />
        </circle>

        <!-- Database Flow Particles (Request / Response - ECS Task B to RDS) -->
        <circle r="3.5" fill="#844fba" class="flow-particle-db">
          <animateMotion
            dur="1.8s"
            repeatCount="indefinite"
            path="M 447.5,205 L 447.5,275"
          />
        </circle>
        <circle r="3.5" fill="#00e5ff" class="flow-particle-db-back">
          <animateMotion
            dur="1.8s"
            begin="0.9s"
            repeatCount="indefinite"
            path="M 447.5,275 L 447.5,205"
          />
        </circle>

        <!-- Database Flow Particles (Request / Response - ECS Task A to RDS) -->
        <circle r="3.5" fill="#844fba" class="flow-particle-db">
          <animateMotion
            dur="2.4s"
            repeatCount="indefinite"
            path="M 312.5,205 L 312.5,235 L 447.5,235 L 447.5,275"
          />
        </circle>
        <circle r="3.5" fill="#00e5ff" class="flow-particle-db-back">
          <animateMotion
            dur="2.4s"
            begin="1.2s"
            repeatCount="indefinite"
            path="M 447.5,275 L 447.5,235 L 312.5,235 L 312.5,205"
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
          Select a step circle above to explore the Terraform infrastructure
          orchestration.
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
    cx: 40,
    cy: 270,
    title: 'Terraform Provisioning',
    placement: 'top',
    text: 'Developer runs Terraform Apply. It compiles declarative syntax and builds VPC networks, subnets, load balancers, security rules, and cluster configurations.',
  },
  {
    id: 2,
    cx: 45,
    cy: 120,
    title: 'Amazon ECR Docker Registry',
    placement: 'bottom',
    text: 'Dockerized C# / .NET app container images are built and pushed to ECR. This repository serves as the single source of truth for app container instances.',
  },
  {
    id: 3,
    cx: 185,
    cy: 235,
    title: 'Application Load Balancer (ALB)',
    placement: 'bottom',
    text: 'Exposed to the public internet, the ALB accepts client HTTP traffic. It continuously checks targets and routes connections evenly across availability zones.',
  },
  {
    id: 4,
    cx: 345,
    cy: 165,
    title: 'ECS Fargate Serverless Cluster',
    placement: 'top',
    text: 'Orchestrator manages Fargate tasks. It monitors task health, automatically replacing crashed containers and scaling up tasks to meet demands.',
  },
  {
    id: 5,
    cx: 312.5,
    cy: 285,
    title: 'Public & Private Subnets',
    placement: 'top',
    text: 'VPC network partitions ECS Fargate compute tasks in public subnets mapping public IPs, while holding RDS database instances securely inside isolated private subnets.',
  },
  {
    id: 6,
    cx: 485,
    cy: 260,
    title: 'Amazon RDS MySQL Database',
    placement: 'bottom',
    text: 'A dedicated relational database instance provisioned by the RDS Terraform module, running MySQL 8.0 securely inside the private subnets to store application state.',
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

.terraform-svg {
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

.deploy-line {
  stroke: rgba(0, 0, 0, 0.4);
  transition: stroke 0.3s ease;
}

:global(.darkmode) .deploy-line {
  stroke: rgba(255, 255, 255, 0.25);
}

.vpc-box {
  stroke: rgba(0, 0, 0, 0.55);
  fill: rgba(0, 0, 0, 0.01);
  transition: all 0.3s ease;
}

:global(.darkmode) .vpc-box {
  stroke: rgba(255, 255, 255, 0.25);
  fill: rgba(255, 255, 255, 0.01);
}

.az-box {
  stroke: rgba(132, 79, 186, 0.55);
  fill: rgba(132, 79, 186, 0.01);
  transition: all 0.3s ease;
}

:global(.darkmode) .az-box {
  stroke: rgba(132, 79, 186, 0.3);
  fill: rgba(132, 79, 186, 0.02);
}

.node-box.client-box {
  stroke: #ff9900;
  fill: rgba(255, 153, 0, 0.05);
}

.node-box.tf-box {
  stroke: #844fba;
  fill: rgba(132, 79, 186, 0.05);
}

.node-box.ecr-box {
  stroke: #3b82f6;
  fill: rgba(59, 130, 246, 0.05);
}

.node-box.alb-box {
  stroke: #10b981;
  fill: rgba(16, 185, 129, 0.05);
}

.node-box.container-box {
  stroke: #f59e0b;
  fill: rgba(245, 158, 11, 0.05);
}

.subnet-boundary {
  stroke: rgba(0, 0, 0, 0.4);
  stroke-dasharray: 4, 4;
  fill: rgba(0, 0, 0, 0.01);
  transition: all 0.3s ease;
}

:global(.darkmode) .subnet-boundary {
  stroke: rgba(255, 255, 255, 0.25);
  fill: rgba(255, 255, 255, 0.01);
}

.subnet-txt {
  fill: var(--text-color, #111827);
  opacity: 0.7;
  font-size: 8px;
  font-weight: 700;
  font-family: sans-serif;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  transition: fill 0.3s ease;
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

.group-label {
  fill: var(--text-color, #111827);
  opacity: 0.8;
  font-size: 10px;
  font-weight: 700;
  font-family: sans-serif;
  letter-spacing: 0.5px;
  transition: fill 0.3s ease;
}

.group-label-sub {
  fill: var(--text-color, #111827);
  opacity: 0.65;
  font-size: 9px;
  font-weight: 600;
  font-family: sans-serif;
  transition: fill 0.3s ease;
}

/* Particle flows */
.flow-particle-cdk {
  filter: drop-shadow(0 0 3px #844fba);
}

.flow-particle-cdk-back {
  filter: drop-shadow(0 0 3px #00e5ff);
}

.flow-particle-cdk-blue {
  filter: drop-shadow(0 0 3px #844fba);
}

.flow-particle-cdk-blue-back {
  filter: drop-shadow(0 0 3px #00e5ff);
}

.flow-particle-db {
  filter: drop-shadow(0 0 3px #844fba);
}

.flow-particle-db-back {
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
  .terraform-svg {
    max-width: 360px;
  }
}
</style>
