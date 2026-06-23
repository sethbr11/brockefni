<template>
  <div class="tab-pane overview-pane">
    <div class="pane-grid">
      <div class="text-block glass-panel">
        <h3>The Junior Core Academic Journey</h3>
        <p>
          The BYU MISM and Bachelor of IS curriculums structure the first-year
          Junior Core around deep technical integration. Rather than studying
          development, database normalization, networks, and analytics in silos,
          students are trained to view them as highly coupled aspects of a
          single engineering enterprise.
        </p>
        <p>
          <strong>INTEX I</strong> tests students' foundations: database
          consistency, client-server web programming, automated security
          certificates, and profiling social trends.
        </p>
        <p>
          <strong>INTEX II</strong> pushes into corporate complexity: enterprise
          C# compilation, object-oriented application architecture,
          cryptographic multi-factor security, predictive data classification
          (ML), and agile project mastership under the Scrum framework.
        </p>
      </div>

      <!-- Visual Progression Card -->
      <div class="timeline-visual glass-panel">
        <h3>Progression Timeline</h3>
        <div class="visual-timeline-nodes">
          <div class="timeline-step">
            <div class="timeline-badge-col">
              <div class="step-num">01</div>
            </div>
            <div class="step-line"></div>
            <div class="step-details">
              <h4>First Semester Courses</h4>
              <p>
                IS 402 (SQL/Postgres) • IS 403 (Node/JS) • IS 404 (Networks) •
                IS 415 (EDA Python)
              </p>
            </div>
          </div>
          <div class="timeline-step active">
            <div class="timeline-badge-col">
              <div class="step-num highlight-1">
                <span class="step-label">I</span>
              </div>
            </div>
            <div class="step-line"></div>
            <div class="step-details">
              <h4>Provo Mental Health Survey</h4>
              <p>
                Node.js, PostgreSQL, AWS Beanstalk deployment, and Tableau
                dashboards.
              </p>
              <button @click="$emit('explore', 'intex1')" class="text-link">
                Explore INTEX I →
              </button>
            </div>
          </div>
          <div class="timeline-step">
            <div class="timeline-badge-col">
              <div class="step-num">02</div>
            </div>
            <div class="step-line"></div>
            <div class="step-details">
              <h4>Second Semester Courses</h4>
              <p>
                IS 401 (Scrum/PM) • IS 413 (.NET/C#) • IS 414 (Security) • IS
                455 (Machine Learning)
              </p>
            </div>
          </div>
          <div class="timeline-step active">
            <div class="timeline-badge-col">
              <div class="step-num highlight-2">
                <span class="step-label">II</span>
              </div>
            </div>
            <div class="step-details">
              <h4>Aurora Bricks Store &amp; Fraud Detection</h4>
              <p>
                ASP.NET Core MVC, ONNX Runtime, MFA logins, and similarity
                recommendation engine.
              </p>
              <button @click="$emit('explore', 'intex2')" class="text-link">
                Explore INTEX II →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IntexOverviewTab',
  emits: ['explore'],
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

.pane-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 2.5rem;
}

.text-block {
  padding: 2rem;
  text-align: left;
}

.text-block h3 {
  font-size: 1.4rem;
  font-weight: 800;
  margin-top: 0;
  margin-bottom: 1.25rem;
}

.text-block p {
  font-size: 1.05rem;
  line-height: 1.65;
  color: var(--text-color-muted);
  margin: 0 0 1.25rem 0;
}

.text-block p:last-child {
  margin-bottom: 0;
}

/* Timeline visual card */
.timeline-visual {
  padding: 2rem;
  text-align: left;
}

.timeline-visual h3 {
  font-size: 1.4rem;
  font-weight: 800;
  margin-top: 0;
  margin-bottom: 1.5rem;
}

.visual-timeline-nodes {
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 2.5rem;
}

.timeline-step {
  display: flex;
  gap: 1.25rem;
  align-items: flex-start;
  position: relative;
}

.step-line {
  position: absolute;
  top: 44px;
  bottom: -2.5rem;
  left: 24px;
  width: 2px;
  background: var(--outline-color);
  z-index: 1;
}

.timeline-badge-col {
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  height: 44px;
}

.step-num {
  min-width: 44px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  padding: 0;
  background: var(--background-lighter-variant);
  border: 2px solid var(--outline-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 0.8rem;
  color: var(--text-color-muted);
  flex-shrink: 0;
  box-sizing: border-box;
  text-align: center;
  position: relative;
  z-index: 2;
}

.step-num.highlight-1,
.step-num.highlight-2 {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  padding: 0;
  min-width: 44px;
  position: relative;
  z-index: 2;
}

.step-num.highlight-1 {
  border-color: #76a03f;
  color: #76a03f;
  background: var(--background-lighter-variant);
}

.step-num.highlight-2 {
  border-color: #e2b112;
  color: #e2b112;
  background: var(--background-lighter-variant);
}

.step-label {
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.3px;
  white-space: nowrap;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.step-details {
  flex: 1;
}

.step-details h4 {
  font-size: 1.05rem;
  font-weight: 800;
  margin: 0 0 0.25rem 0;
}

.step-details p {
  font-size: 0.9rem;
  line-height: 1.45;
  color: var(--text-color-muted);
  margin: 0 0 0.5rem 0;
}

.text-link {
  background: none;
  border: none;
  color: var(--theme-accent, #d87628);
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  padding: 0;
  text-decoration: underline;
}

.text-link:hover {
  color: var(--theme-accent, #d87628);
}

@media (max-width: 900px) {
  .pane-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
