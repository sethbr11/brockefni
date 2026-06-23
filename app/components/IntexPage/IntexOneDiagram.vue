<template>
  <div class="diagram-section glass-panel">
    <h3>System &amp; Data Pipeline Architecture</h3>
    <div class="svg-container">
      <svg viewBox="0 0 860 440" class="architecture-svg">
        <defs>
          <linearGradient
            id="aws-region-grad"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stop-color="#ff9900" stop-opacity="0.07" />
            <stop offset="100%" stop-color="#ff9900" stop-opacity="0.02" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <marker
            id="arrowhead"
            markerWidth="8"
            markerHeight="6"
            refX="8"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 8 3, 0 6" fill="#888" />
          </marker>
          <marker
            id="arrowhead-accent"
            markerWidth="8"
            markerHeight="6"
            refX="8"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 8 3, 0 6" fill="var(--theme-accent)" />
          </marker>
        </defs>

        <!-- AWS Cloud Region box -->
        <rect
          x="280"
          y="30"
          width="560"
          height="390"
          rx="14"
          fill="url(#aws-region-grad)"
          stroke="#ff9900"
          stroke-width="1.5"
          stroke-dasharray="6,4"
        />
        <!-- AWS badge -->
        <rect x="292" y="42" width="72" height="22" rx="4" fill="#ff9900" />
        <text
          x="328"
          y="57"
          text-anchor="middle"
          font-size="10"
          font-weight="900"
          fill="white"
          font-family="Arial, sans-serif"
        >
          AWS Cloud
        </text>
        <!-- us-east-1 in top-right corner -->
        <text
          x="828"
          y="57"
          text-anchor="end"
          font-size="9"
          fill="#ff9900"
          font-weight="700"
          opacity="0.7"
        >
          us-east-1
        </text>

        <!-- Connection Paths -->
        <g stroke="#888" stroke-dasharray="5,4" stroke-width="1.5" fill="none">
          <!-- Client -> Route 53 -->
          <path d="M 145 178 Q 220 115, 310 105" marker-end="url(#arrowhead)" />
          <!-- Client -> Tableau -->
          <path d="M 145 178 Q 220 320, 310 351" marker-end="url(#arrowhead)" />
          <!-- Beanstalk -> Certbot -->
          <path d="M 555 158 L 445 250" marker-end="url(#arrowhead)" />
          <!-- Postgres -> Tableau (data feed) -->
          <path d="M 535 310 L 450 351" marker-end="url(#arrowhead)" />
        </g>
        <g stroke="var(--theme-accent)" stroke-width="2" fill="none">
          <!-- Route 53 -> Beanstalk -->
          <path d="M 450 105 L 535 115" marker-end="url(#arrowhead-accent)" />
          <!-- Beanstalk -> RDS Postgres -->
          <path d="M 615 158 L 615 262" marker-end="url(#arrowhead-accent)" />
        </g>

        <!-- Node: Client Browser -->
        <g class="node-group">
          <rect
            x="15"
            y="148"
            width="130"
            height="60"
            rx="10"
            fill="var(--background-lighter-variant)"
            stroke="#666"
            stroke-width="1.5"
          />
          <text
            x="80"
            y="173"
            text-anchor="middle"
            font-size="12"
            font-weight="700"
            fill="var(--text-color)"
          >
            Client Browser
          </text>
          <text
            x="80"
            y="189"
            text-anchor="middle"
            font-size="10"
            fill="var(--text-color-muted)"
          >
            Surveys &amp; Data
          </text>
        </g>

        <!-- Node: Route 53 DNS -->
        <g class="node-group">
          <rect
            x="310"
            y="72"
            width="140"
            height="66"
            rx="8"
            fill="var(--background-lighter-variant)"
            stroke="#ff9900"
            stroke-width="1.5"
          />
          <circle cx="327" cy="85" r="4" fill="#ff9900" opacity="0.9" />
          <text
            x="380"
            y="100"
            text-anchor="middle"
            font-size="11"
            font-weight="700"
            fill="var(--text-color)"
          >
            Route 53 DNS
          </text>
          <text
            x="380"
            y="116"
            text-anchor="middle"
            font-size="9"
            fill="var(--text-color-muted)"
          >
            is404.net Subdomain
          </text>
        </g>

        <!-- Node: Elastic Beanstalk (highlighted) -->
        <g class="node-group highlighted">
          <rect
            x="535"
            y="72"
            width="160"
            height="86"
            rx="10"
            fill="var(--background-lighter-variant)"
            stroke="var(--theme-accent)"
            stroke-width="2.5"
            filter="url(#glow)"
          />
          <circle cx="553" cy="86" r="4" fill="#76a03f" />
          <text
            x="615"
            y="102"
            text-anchor="middle"
            font-size="12"
            font-weight="800"
            fill="var(--text-color)"
          >
            Node.js Express
          </text>
          <text
            x="615"
            y="118"
            text-anchor="middle"
            font-size="10"
            fill="var(--text-color-muted)"
          >
            Elastic Beanstalk
          </text>
          <text
            x="615"
            y="134"
            text-anchor="middle"
            font-size="9"
            fill="var(--theme-accent)"
            font-weight="700"
          >
            CodePipeline CI/CD
          </text>
        </g>

        <!-- Node: Certbot SSL -->
        <g class="node-group">
          <rect
            x="310"
            y="250"
            width="140"
            height="58"
            rx="8"
            fill="var(--background-lighter-variant)"
            stroke="#2196f3"
            stroke-width="1.5"
          />
          <circle cx="327" cy="263" r="4" fill="#2196f3" opacity="0.9" />
          <text
            x="380"
            y="274"
            text-anchor="middle"
            font-size="11"
            font-weight="700"
            fill="var(--text-color)"
          >
            Certbot / SSL
          </text>
          <text
            x="380"
            y="290"
            text-anchor="middle"
            font-size="9"
            fill="var(--text-color-muted)"
          >
            Let's Encrypt Hook
          </text>
        </g>

        <!-- Node: RDS PostgreSQL (highlighted) -->
        <g class="node-group highlighted">
          <rect
            x="535"
            y="262"
            width="160"
            height="76"
            rx="10"
            fill="var(--background-lighter-variant)"
            stroke="#336791"
            stroke-width="2.5"
          />
          <circle cx="553" cy="276" r="4" fill="#336791" />
          <text
            x="615"
            y="287"
            text-anchor="middle"
            font-size="12"
            font-weight="800"
            fill="var(--text-color)"
          >
            PostgreSQL
          </text>
          <text
            x="615"
            y="303"
            text-anchor="middle"
            font-size="10"
            fill="var(--text-color-muted)"
          >
            AWS RDS Serverless
          </text>
          <text
            x="615"
            y="319"
            text-anchor="middle"
            font-size="9"
            fill="#336791"
            font-weight="700"
          >
            3NF Schema
          </text>
        </g>

        <!-- Node: Tableau Dashboard -->
        <g class="node-group">
          <rect
            x="310"
            y="322"
            width="140"
            height="58"
            rx="8"
            fill="var(--background-lighter-variant)"
            stroke="var(--theme-accent)"
            stroke-width="1.5"
          />
          <circle
            cx="327"
            cy="335"
            r="4"
            fill="var(--theme-accent)"
            opacity="0.9"
          />
          <text
            x="380"
            y="346"
            text-anchor="middle"
            font-size="11"
            font-weight="700"
            fill="var(--text-color)"
          >
            Tableau Dashboard
          </text>
          <text
            x="380"
            y="362"
            text-anchor="middle"
            font-size="9"
            fill="var(--text-color-muted)"
          >
            Live Storytelling
          </text>
        </g>
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IntexOneDiagram',
})
</script>

<style scoped>
/* Glass panel styling */
.glass-panel {
  background: var(--background-variant);
  border: 1px solid var(--outline-color);
  border-radius: 16px;
  box-shadow: 0 8px 30px var(--shadow);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.diagram-section {
  padding: 2rem;
  margin-bottom: 2.5rem;
  text-align: left;
}

.diagram-section h3 {
  font-size: 1.3rem;
  font-weight: 800;
  margin-top: 0;
  margin-bottom: 1.5rem;
}

.svg-container {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  background: var(--background-color);
  border: 1px solid var(--outline-color);
  border-radius: 12px;
  padding: 1rem;
  box-shadow: inset 0 2px 8px var(--shadow);
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.architecture-svg {
  width: 100%;
  min-width: 600px;
  max-width: 100%;
  height: auto;
  display: block;
}

.node-group rect,
.node-group circle {
  transition: all 0.25s ease;
}

.node-group:hover rect {
  fill: var(--background-variant);
  stroke-width: 3px;
}

.node-group:hover {
  cursor: default;
  filter: drop-shadow(0 4px 14px var(--theme-accent-glow));
}

.node-group.highlighted:hover {
  filter: drop-shadow(0 6px 18px var(--theme-accent-glow));
}

@media (max-width: 768px) {
  .diagram-section {
    padding: 1rem;
  }

  .svg-container {
    padding: 0.5rem;
  }
}
</style>
