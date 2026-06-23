<template>
  <div class="diagram-section glass-panel">
    <h3>Real-Time Inferencing &amp; E-Commerce Architecture</h3>
    <div class="svg-container">
      <svg viewBox="0 0 860 440" class="architecture-svg">
        <defs>
          <linearGradient
            id="azure-region-grad"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stop-color="#0078d4" stop-opacity="0.07" />
            <stop offset="100%" stop-color="#0078d4" stop-opacity="0.02" />
          </linearGradient>
          <filter id="purple-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="ml-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <marker
            id="arrow2"
            markerWidth="8"
            markerHeight="6"
            refX="8"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 8 3, 0 6" fill="#888" />
          </marker>
          <marker
            id="arrow2-accent"
            markerWidth="8"
            markerHeight="6"
            refX="8"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 8 3, 0 6" fill="var(--theme-accent)" />
          </marker>
          <marker
            id="arrow2-green"
            markerWidth="8"
            markerHeight="6"
            refX="8"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 8 3, 0 6" fill="#00b48b" />
          </marker>
        </defs>

        <!-- Azure Cloud Region box (large, contains most nodes) -->
        <rect
          x="275"
          y="20"
          width="565"
          height="408"
          rx="14"
          fill="url(#azure-region-grad)"
          stroke="#0078d4"
          stroke-width="1.5"
          stroke-dasharray="6,4"
        />
        <!-- Azure badge -->
        <rect x="287" y="32" width="72" height="22" rx="4" fill="#0078d4" />
        <text
          x="323"
          y="47"
          text-anchor="middle"
          font-size="10"
          font-weight="900"
          fill="white"
          font-family="Arial, sans-serif"
        >
          Azure Cloud
        </text>
        <text
          x="828"
          y="47"
          text-anchor="end"
          font-size="9"
          fill="#0078d4"
          font-weight="700"
          opacity="0.7"
        >
          East US
        </text>

        <!-- Connection lines -->
        <!-- Client -> MVC Server -->
        <path
          d="M 145 188 L 310 200"
          stroke="var(--theme-accent)"
          stroke-width="2"
          fill="none"
          marker-end="url(#arrow2-accent)"
        />
        <!-- MVC -> SQLite (internal) -->
        <path
          d="M 410 245 L 410 305"
          stroke="#888"
          stroke-dasharray="5,4"
          stroke-width="1.5"
          fill="none"
          marker-end="url(#arrow2)"
        />
        <!-- MVC -> ONNX (call on checkout) -->
        <path
          d="M 510 180 Q 590 110, 640 120"
          stroke="#e2a000"
          stroke-width="1.5"
          stroke-dasharray="4,3"
          fill="none"
          marker-end="url(#arrow2)"
        />
        <!-- ONNX returns score -> MVC -->
        <path
          d="M 640 148 Q 590 200, 510 200"
          stroke="#00b48b"
          stroke-width="1.5"
          fill="none"
          marker-end="url(#arrow2-green)"
        />
        <!-- MVC -> Azure SQL (save order) -->
        <path
          d="M 510 215 Q 570 255, 640 285"
          stroke="var(--theme-accent)"
          stroke-width="2"
          fill="none"
          marker-end="url(#arrow2-accent)"
        />
        <!-- Jupyter -> SQLite (offline recs sync) -->
        <path
          d="M 145 341 L 310 341"
          stroke="var(--theme-accent)"
          stroke-dasharray="4,3"
          stroke-width="1.5"
          fill="none"
          marker-end="url(#arrow2-accent)"
        />

        <!-- Node: Customer Client (outside Azure) -->
        <g class="node-group">
          <rect
            x="15"
            y="158"
            width="130"
            height="60"
            rx="10"
            fill="var(--background-lighter-variant)"
            stroke="#666"
            stroke-width="1.5"
          />
          <text
            x="80"
            y="183"
            text-anchor="middle"
            font-size="12"
            font-weight="700"
            fill="var(--text-color)"
          >
            Customer Client
          </text>
          <text
            x="80"
            y="199"
            text-anchor="middle"
            font-size="10"
            fill="var(--text-color-muted)"
          >
            Razor Views / Session
          </text>
        </g>

        <!-- Node: Offline Recs Pipeline (outside Azure, bottom-left) -->
        <g class="node-group">
          <rect
            x="15"
            y="305"
            width="130"
            height="72"
            rx="10"
            fill="var(--background-lighter-variant)"
            stroke="#ff9900"
            stroke-width="1.5"
          />
          <circle cx="33" cy="318" r="4" fill="#ff9900" opacity="0.9" />
          <text
            x="80"
            y="327"
            text-anchor="middle"
            font-size="11"
            font-weight="700"
            fill="var(--text-color)"
          >
            Jupyter / Python
          </text>
          <text
            x="80"
            y="343"
            text-anchor="middle"
            font-size="9"
            fill="var(--text-color-muted)"
          >
            Collaborative Filter
          </text>
          <text
            x="80"
            y="359"
            text-anchor="middle"
            font-size="8"
            fill="#ff9900"
            font-weight="700"
          >
            Offline Matrix
          </text>
        </g>

        <!-- Node: ASP.NET Core MVC (inside Azure, main node) -->
        <g class="node-group highlighted">
          <rect
            x="310"
            y="155"
            width="200"
            height="90"
            rx="10"
            fill="var(--background-lighter-variant)"
            stroke="var(--theme-accent)"
            stroke-width="2.5"
            filter="url(#purple-glow)"
          />
          <circle cx="328" cy="170" r="4" fill="var(--theme-accent)" />
          <text
            x="410"
            y="187"
            text-anchor="middle"
            font-size="12"
            font-weight="800"
            fill="var(--text-color)"
          >
            ASP.NET Core 8
          </text>
          <text
            x="410"
            y="203"
            text-anchor="middle"
            font-size="10"
            fill="var(--text-color-muted)"
          >
            C# MVC / Session Cart
          </text>
          <text
            x="410"
            y="219"
            text-anchor="middle"
            font-size="9"
            fill="var(--theme-accent)"
            font-weight="700"
          >
            Identity &amp; HSTS
          </text>
        </g>

        <!-- Node: SQLite (inside Azure) -->
        <g class="node-group">
          <rect
            x="310"
            y="305"
            width="200"
            height="72"
            rx="8"
            fill="var(--background-lighter-variant)"
            stroke="#888"
            stroke-width="1.5"
          />
          <text
            x="410"
            y="336"
            text-anchor="middle"
            font-size="11"
            font-weight="700"
            fill="var(--text-color)"
          >
            SQLite (2 DBs)
          </text>
          <text
            x="410"
            y="352"
            text-anchor="middle"
            font-size="9"
            fill="var(--text-color-muted)"
          >
            Identity + Products/Recs
          </text>
        </g>

        <!-- Node: ONNX ML Runtime (inside Azure, upper-right) -->
        <g class="node-group highlighted-pink">
          <rect
            x="640"
            y="95"
            width="190"
            height="80"
            rx="10"
            fill="var(--background-lighter-variant)"
            stroke="#e2a000"
            stroke-width="2"
            filter="url(#ml-glow)"
          />
          <circle cx="658" cy="109" r="4" fill="#e2a000" />
          <text
            x="735"
            y="122"
            text-anchor="middle"
            font-size="12"
            font-weight="800"
            fill="var(--text-color)"
          >
            ONNX Runtime
          </text>
          <text
            x="735"
            y="138"
            text-anchor="middle"
            font-size="10"
            fill="var(--text-color-muted)"
          >
            fraud_model2.onnx
          </text>
          <text
            x="735"
            y="154"
            text-anchor="middle"
            font-size="9"
            fill="#e2a000"
            font-weight="700"
          >
            ML.NET Classifier
          </text>
        </g>

        <!-- Node: Azure SQL Server (inside Azure, lower-right) -->
        <g class="node-group">
          <rect
            x="640"
            y="258"
            width="190"
            height="80"
            rx="8"
            fill="var(--background-lighter-variant)"
            stroke="#0078d4"
            stroke-width="2"
          />
          <circle cx="658" cy="272" r="4" fill="#0078d4" />
          <text
            x="735"
            y="285"
            text-anchor="middle"
            font-size="12"
            font-weight="700"
            fill="var(--text-color)"
          >
            Azure SQL Server
          </text>
          <text
            x="735"
            y="301"
            text-anchor="middle"
            font-size="10"
            fill="var(--text-color-muted)"
          >
            Entity Framework Core
          </text>
          <text
            x="735"
            y="317"
            text-anchor="middle"
            font-size="9"
            fill="#0078d4"
            font-weight="700"
          >
            Orders + Fraud Score
          </text>
        </g>
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IntexTwoDiagram',
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

.node-group.highlighted-pink:hover {
  filter: drop-shadow(0 4px 15px rgba(226, 177, 18, 0.3));
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
