<template>
  <div class="tab-pane details-pane" id="intex1">
    <div class="project-hero glass-panel">
      <div class="hero-meta-row">
        <span class="term-badge">Fall 2023 • Integrated Exercise I</span>
        <span class="team-badge">Team of 4</span>
        <span class="cloud-badge aws-badge">AWS Hosted</span>
      </div>
      <h2>Provo City Social Media Usage &amp; Mental Health Study</h2>
      <p class="project-mission">
        <strong>Academic Brief:</strong> As part of a BYU academic simulation,
        our team developed a secure survey portal for a mental health study
        tracking Provo vs. Plainsville responses, and integrated Tableau
        dashboards to filter public health trends.
      </p>
    </div>

    <!-- Architecture Diagram -->
    <IntexOneDiagram />

    <!-- Screenshot Section -->
    <div class="screenshot-section glass-panel">
      <h3>Website Preview</h3>
      <div class="browser-mockup">
        <div class="browser-header">
          <div class="browser-buttons">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
          </div>
          <div class="browser-address">
            <GlobeIcon class="address-icon" />
            <span>https://survey.smu-study.is404.net</span>
          </div>
        </div>
        <div class="browser-content no-scroll">
          <img
            src="~/assets/images/intex1-screenshot.png"
            alt="INTEX I Website Screenshot"
            class="screenshot-img"
          />
        </div>
      </div>
    </div>

    <!-- Pillars & Course Integrations -->
    <div class="pillars-grid">
      <div class="pillar-card glass-panel">
        <div class="pillar-header">
          <DatabaseIcon class="pillar-icon" />
          <h4>Database Principles (IS 402)</h4>
        </div>
        <ul>
          <li>
            <strong>PostgreSQL on RDS:</strong> Designed and deployed a secure
            relational schema normalized to 3NF.
          </li>
          <li>
            <strong>Origin Tracking:</strong> Added an origin attribute to
            separate Provo campaign submissions from Plainsville historical
            data.
          </li>
          <li>
            <strong>Data Migration:</strong> Managed migration workflows to
            import baseline Excel records into clean SQL tables.
          </li>
        </ul>
      </div>

      <div class="pillar-card glass-panel">
        <div class="pillar-header">
          <CodeIcon class="pillar-icon" />
          <h4>Application Development (IS 403)</h4>
        </div>
        <ul>
          <li>
            <strong>Node.js Express App:</strong> Built server controllers,
            router structures, session cookies, and survey forms.
          </li>
          <li>
            <strong>Privilege Escalation Prevention:</strong> Programmed input
            sanitization checking registered usernames to prevent accounts from
            claiming the administrative username.
          </li>
          <li>
            <strong>Admin Dashboard:</strong> Implemented admin views allowing
            search, filtering, and manual inspection of individual citizen
            surveys.
          </li>
        </ul>
      </div>

      <div class="pillar-card glass-panel">
        <div class="pillar-header">
          <GlobeIcon class="pillar-icon" />
          <h4>Telecommunications &amp; Network (IS 404)</h4>
        </div>
        <ul>
          <li>
            <strong>AWS Cloud:</strong> Configured AWS Beanstalk containers,
            CodePipeline deployments, and secure RDS instances.
          </li>
          <li>
            <strong>Certbot Integration:</strong> Implemented shell triggers
            inside Beanstalk postdeploy platform hooks to fetch and bind secure
            Let's Encrypt HTTPS certs.
          </li>
          <li>
            <strong>Domain Config:</strong> Mapped DNS records to Route 53
            namespaces.
          </li>
        </ul>
      </div>

      <div class="pillar-card glass-panel">
        <div class="pillar-header">
          <TrendingUpIcon class="pillar-icon" />
          <h4>Exploratory Analytics (IS 415)</h4>
        </div>
        <ul>
          <li>
            <strong>Python EDA:</strong> Utilized Pandas, NumPy, and Seaborn in
            Colab to profile correlations (e.g. social platforms vs
            sleep/depression/validation seeking).
          </li>
          <li>
            <strong>Storytelling Deck:</strong> Designed data presentations
            outlining behavioral findings for Provo City.
          </li>
          <li>
            <strong>Embedded Dashboard:</strong> Integrated interactive Tableau
            visual layouts allowing users to filter by age, gender, occupation,
            and origin.
          </li>
        </ul>
      </div>
    </div>

    <!-- Deliverables Section -->
    <div class="deliverables-section glass-panel">
      <h3>Project Deliverables</h3>
      <div class="deliverables-grid">
        <a
          href="https://github.com/prestonfitz/intex"
          target="_blank"
          class="deliv-card"
        >
          <GithubIcon class="deliv-icon" />
          <span>GitHub Source Code</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  GlobeIcon,
  DatabaseIcon,
  CodeIcon,
  TrendingUpIcon,
  FileTextIcon,
  GithubIcon,
} from 'lucide-vue-next'
import IntexOneDiagram from './IntexOneDiagram.vue'

export default defineComponent({
  name: 'IntexOneTab',
  components: {
    GlobeIcon,
    DatabaseIcon,
    CodeIcon,
    TrendingUpIcon,
    FileTextIcon,
    GithubIcon,
    IntexOneDiagram,
  },
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

.details-pane {
  text-align: left;
}

.project-hero {
  padding: 2.5rem;
  margin-bottom: 2.5rem;
}

.term-badge {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  color: var(--theme-accent, #76a03f);
  background: var(--theme-accent-glow, rgba(118, 160, 63, 0.15));
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
}

.hero-meta-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
}

.team-badge {
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--text-color-muted);
  background: var(--background-lighter-variant);
  border: 1px solid var(--outline-color);
  padding: 0.2rem 0.65rem;
  border-radius: 50px;
  letter-spacing: 0.3px;
  text-transform: uppercase;
}

.cloud-badge {
  font-size: 0.72rem;
  font-weight: 800;
  padding: 0.2rem 0.65rem;
  border-radius: 50px;
  letter-spacing: 0.3px;
  text-transform: uppercase;
}

.aws-badge {
  color: #ff9900;
  background: rgba(255, 153, 0, 0.1);
  border: 1px solid rgba(255, 153, 0, 0.35);
}

.project-hero h2 {
  font-size: 1.85rem;
  font-weight: 900;
  margin: 0 0 1rem 0;
  line-height: 1.2;
}

.project-mission {
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text-color-muted);
  margin: 0;
}

/* Screenshot Mockup Styles */
.screenshot-section {
  padding: 2.5rem;
  margin-bottom: 2.5rem;
  text-align: left;
}

.screenshot-section h3 {
  font-size: 1.4rem;
  font-weight: 800;
  margin-top: 0;
  margin-bottom: 1.5rem;
}

.browser-mockup {
  background: var(--background-lighter-variant);
  border: 1px solid var(--outline-color);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 12px 40px var(--shadow);
}

.browser-header {
  height: 40px;
  background: var(--background-darker-variant);
  display: flex;
  align-items: center;
  padding: 0 1rem;
  position: relative;
  border-bottom: 1px solid var(--outline-color);
}

.browser-buttons {
  display: flex;
  gap: 6px;
  position: absolute;
  left: 1rem;
}

.browser-buttons .dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}

.browser-buttons .dot.red {
  background: #ff5f56;
}
.browser-buttons .dot.yellow {
  background: #ffbd2e;
}
.browser-buttons .dot.green {
  background: #27c93f;
}

.browser-address {
  margin: 0 auto;
  background: var(--background-color);
  border-radius: 6px;
  padding: 0.25rem 1rem;
  font-size: 0.8rem;
  color: var(--text-color-muted);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid var(--outline-color);
  max-width: 400px;
  width: calc(100% - 140px);
  justify-content: center;
  box-sizing: border-box;
}

.browser-address span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.address-icon {
  width: 12px;
  height: 12px;
  color: var(--text-color-muted);
}

.browser-content {
  width: 100%;
  max-height: 500px;
  overflow-y: auto;
  background: #ffffff;
}

.screenshot-img {
  width: 100%;
  height: auto;
  display: block;
}

.browser-content.no-scroll {
  max-height: none;
  overflow-y: visible;
}

/* Pillars grid */
.pillars-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.pillar-card {
  padding: 2rem;
  text-align: left;
  position: relative;
  overflow: hidden;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.pillar-card::after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: var(--theme-accent, #76a03f);
  transform: scaleY(0);
  transition: transform 0.25s ease;
  transform-origin: bottom;
  border-radius: 0 2px 2px 0;
}

.pillar-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 28px var(--shadow);
}

.pillar-card:hover::after {
  transform: scaleY(1);
}

.pillar-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
  border-bottom: 1px solid var(--outline-color);
  padding-bottom: 0.75rem;
}

.pillar-icon {
  width: 24px;
  height: 24px;
  color: var(--theme-accent, #76a03f);
}

.pillar-card h4 {
  font-size: 1.1rem;
  font-weight: 800;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.pillar-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.pillar-card li {
  font-size: 0.95rem;
  line-height: 1.5;
  color: var(--text-color-muted);
  position: relative;
  padding-left: 1.25rem;
}

.pillar-card li::before {
  content: '•';
  color: var(--theme-accent, #76a03f);
  font-size: 1.2rem;
  position: absolute;
  left: 0;
  top: -2px;
}

/* Deliverables Section */
.deliverables-section {
  padding: 2rem;
}

.deliverables-section h3 {
  font-size: 1.3rem;
  font-weight: 800;
  margin-top: 0;
  margin-bottom: 1.5rem;
}

.deliverables-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.25rem;
}

.deliv-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  background: var(--background-lighter-variant);
  border: 1px solid var(--outline-color);
  border-radius: 12px;
  color: var(--text-color);
  text-decoration: none;
  font-weight: 700;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.deliv-card:hover {
  border-color: var(--theme-accent, #76a03f);
  color: var(--theme-accent, #76a03f);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px var(--theme-accent-glow, rgba(118, 160, 63, 0.15));
}

.deliv-icon {
  width: 20px;
  height: 20px;
  color: var(--theme-accent, #76a03f);
  flex-shrink: 0;
}

@media (max-width: 900px) {
  .pillars-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .project-hero {
    padding: 1.5rem;
  }

  .screenshot-section {
    padding: 1rem;
  }

  .pillar-card {
    padding: 1.25rem;
  }
}
</style>
