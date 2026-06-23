<template>
  <div class="tab-pane details-pane" id="intex2">
    <div class="project-hero glass-panel">
      <div class="hero-meta-row">
        <span class="term-badge">Winter 2024 • Integrated Exercise II</span>
        <span class="team-badge">Team of 4</span>
        <span class="cloud-badge azure-badge">Azure Hosted</span>
      </div>
      <h2>Aurora Bricks Storefront &amp; Real-Time Fraud Shield</h2>
      <p class="project-mission">
        <strong>Academic Brief:</strong> As part of a BYU academic simulation,
        our team built the Aurora Bricks Lego storefront. The system features a
        custom C# session shopping cart, collaborative filtering
        recommendations, GDPR tools, and an ONNX machine learning model for
        real-time checkout fraud detection.
      </p>
    </div>

    <!-- Architecture Diagram -->
    <IntexTwoDiagram />

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
            <span>https://aurorabricks.store</span>
          </div>
        </div>
        <div class="browser-content no-scroll">
          <img
            src="~/assets/images/intex2-screenshot.png"
            alt="INTEX II Website Screenshot"
            class="screenshot-img"
          />
        </div>
      </div>
    </div>

    <!-- Pillars & Course Integrations -->
    <div class="pillars-grid">
      <div class="pillar-card glass-panel">
        <div class="pillar-header">
          <UsersIcon class="pillar-icon" />
          <h4>Systems Design &amp; Scrum (IS 401)</h4>
        </div>
        <ul>
          <li>
            <strong>Scrum Governance:</strong> Managed a Trello sprint backlog,
            conducting standups, reviews, and retrospectives.
          </li>
          <li>
            <strong>UML Deliverables:</strong> Created Figma interactive
            mockups, Unified Activity diagrams, Class blueprints, and checkout
            Sequence diagrams.
          </li>
          <li>
            <strong>Heuristics:</strong> Applied Nielson's usability heuristics
            to create a clean, responsive shopper experience.
          </li>
        </ul>
      </div>

      <div class="pillar-card glass-panel">
        <div class="pillar-header">
          <CpuIcon class="pillar-icon" />
          <h4>Enterprise Dev (.NET Core) (IS 413)</h4>
        </div>
        <ul>
          <li>
            <strong>E-Commerce Catalog:</strong> Deployed paging (5, 10, 20
            results) and filtering (Category and Color) for Lego sets.
          </li>
          <li>
            <strong>Shopping Cart:</strong> Built a session-backed shopping cart
            logic allowing users to add, update quantity, and remove items.
          </li>
          <li>
            <strong>Matrix Recommendations:</strong> Pre-calculated
            collaborative filtering items in Jupyter and stored them in DB.
          </li>
        </ul>
      </div>

      <div class="pillar-card glass-panel">
        <div class="pillar-header">
          <ShieldCheckIcon class="pillar-icon" />
          <h4>Security and Controls (IS 414)</h4>
        </div>
        <ul>
          <li>
            <strong>Security Headers:</strong> Enabled Content-Security-Policy
            (CSP) and HTTP Strict Transport Security (HSTS) headers.
          </li>
          <li>
            <strong>Logins &amp; MFA:</strong> Integrated ASP.NET Identity with
            password strength rules, third-party authentication, and Google
            Authenticator 2FA.
          </li>
          <li>
            <strong>Privacy &amp; Cookies:</strong> Configured a GDPR-compliant
            cookie consent notification and custom privacy notice links.
          </li>
        </ul>
      </div>

      <div class="pillar-card glass-panel">
        <div class="pillar-header">
          <BrainCircuitIcon class="pillar-icon" />
          <h4>Machine Learning (IS 455)</h4>
        </div>
        <ul>
          <li>
            <strong>Collaborative Filters:</strong> Made user-based suggestions
            on home page and item-based recommendations on details page.
          </li>
          <li>
            <strong>Fraud Interception:</strong> Built a classification model
            predicting fraud from checkout Time, Amount, and UK country origin.
          </li>
          <li>
            <strong>Soft Flags:</strong> Blocked suspicious checkouts using a
            soft notice:
            <em
              >"Order placed successfully and is undergoing standard validation
              checks"</em
            >
            to keep customer satisfaction intact.
          </li>
        </ul>
      </div>
    </div>

    <!-- Details on Model Inferencing -->
    <div class="model-details-section glass-panel">
      <div class="section-badge-row">
        <span class="inline-badge">ML Pipeline Showcase</span>
      </div>
      <h3>Fraud Prediction Machine Learning Pipeline</h3>
      <p>
        To secure transaction checkouts, we designed a robust Gradient Boosting
        classification pipeline in Python, serialized the model, and compiled it
        to the ONNX runtime format for millisecond-level inference inside the
        .NET Core web host.
      </p>

      <!-- Detailed ML Pipeline Highlights -->
      <div class="ml-pipeline-specs">
        <div class="spec-grid">
          <div class="spec-card">
            <h5>Data Wrangling &amp; Leakage Control</h5>
            <p>
              Dropped high-cardinality fields like
              <code>transaction_ID</code> to prevent model leakage, handled
              missing fields (such as empty amounts/addresses), and engineered
              calendar features (hour, day of week, month, year) from the
              transaction date.
            </p>
          </div>
          <div class="spec-card">
            <h5>Low-Frequency Category Binning</h5>
            <p>
              Grouped high-cardinality categorical attributes (e.g., banks, card
              types, entry mode, transaction countries) with less than 5%
              relative occurrence into an "Other" bin to prevent overfitting and
              improve generalization.
            </p>
          </div>
          <div class="spec-card">
            <h5>Gradient Boosting Classifier</h5>
            <p>
              Trained a Scikit-Learn
              <code>GradientBoostingClassifier</code> (100 estimators, max depth
              of 1, learning rate of 1.0) on 100,000 transaction records,
              achieving a cross-validated accuracy of
              <strong>96.42%</strong> using repeated 10-fold CV.
            </p>
          </div>
        </div>
      </div>

      <h4 class="sub-section-title">Real-Time C# Checkout Inference Flow:</h4>
      <div class="vertical-stepper">
        <div class="stepper-item">
          <div class="stepper-badge">1</div>
          <div class="stepper-content">
            <strong>Assemble Features</strong>
            Extracts variables from the checkout form:
            <code>Time (hour)</code>, <code>Amount ($ value)</code>, and boolean
            flag <code>CountryOfTransaction == "United Kingdom"</code>.
          </div>
        </div>
        <div class="stepper-item">
          <div class="stepper-badge">2</div>
          <div class="stepper-content">
            <strong>Invoke ONNX Session</strong>
            Tensors are loaded, and
            <code>InferenceSession.Run(inputs)</code> is called against
            <code>fraud_model2.onnx</code>.
          </div>
        </div>
        <div class="stepper-item">
          <div class="stepper-badge">3</div>
          <div class="stepper-content">
            <strong>Evaluate Score</strong>
            The classification output is read from the output label tensor:
            <code>0</code> signifies safe, <code>1</code> flags high-risk fraud
            (intercepting checkout in real-time).
          </div>
        </div>
      </div>
    </div>

    <!-- Recommender Engine Details -->
    <div class="model-details-section glass-panel">
      <div class="section-badge-row">
        <span class="inline-badge">Recommendation Engine Showcase</span>
      </div>
      <h3>Dual-Layer Collaborative Recommendation System</h3>
      <p>
        To personalize shopper journeys and boost conversion rates, we
        integrated a collaborative filtering recommendation engine. The system
        splits the user and item lookup phases to serve real-time predictions
        without performance bottlenecks on the web host:
      </p>

      <div class="ml-pipeline-specs">
        <div class="spec-grid">
          <div class="spec-card">
            <h5>User-Based Collaborative Filtering</h5>
            <p>
              Personalized sets are generated for authenticated users. The
              <code>YourRecommendation</code> controller resolves customer
              identification by checking pre-calculated top matches
              (recommendations 1 through 4) compiled on a customer-matrix basis
              in the database.
            </p>
          </div>
          <div class="spec-card">
            <h5>Item-Based Product Similarity</h5>
            <p>
              Suggested related sets are shown on details pages. The
              <code>ProductDetail</code> action queries pre-calculated
              product-to-product similarity profiles directly from the
              <code>Product</code> schema database row (fetching the top 3
              similar sets).
            </p>
          </div>
          <div class="spec-card">
            <h5>Pre-Calculated Relational Caching</h5>
            <p>
              Rather than executing intensive sparse matrix operations
              dynamically at request time (which increases server CPU loads and
              response times), recommendation mappings were pre-computed in
              Jupyter and cached as relational SQLite tables.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Deliverables Section -->
    <div class="deliverables-section glass-panel">
      <h3>Project Deliverables</h3>
      <div class="deliverables-grid">
        <a
          href="https://github.com/sethbr11/INTEXII"
          target="_blank"
          class="deliv-card"
        >
          <GithubIcon class="deliv-icon" />
          <span>GitHub Source Code</span>
        </a>
        <a
          href="https://colab.research.google.com/drive/1Fc9kKJJdrWyluxj0f64VFo47VpXozcip?usp=sharing"
          target="_blank"
          class="deliv-card"
        >
          <FileTextIcon class="deliv-icon" />
          <span>Fraud Pipeline Colab Notebook</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  UsersIcon,
  CpuIcon,
  ShieldCheckIcon,
  BrainCircuitIcon,
  FileTextIcon,
  GithubIcon,
  GlobeIcon,
} from 'lucide-vue-next'
import IntexTwoDiagram from './IntexTwoDiagram.vue'

export default defineComponent({
  name: 'IntexTwoTab',
  components: {
    UsersIcon,
    CpuIcon,
    ShieldCheckIcon,
    BrainCircuitIcon,
    FileTextIcon,
    GithubIcon,
    GlobeIcon,
    IntexTwoDiagram,
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
  color: var(--theme-accent, #e2b112);
  background: var(--theme-accent-glow, rgba(226, 177, 18, 0.15));
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

.azure-badge {
  color: #0078d4;
  background: rgba(0, 120, 212, 0.1);
  border: 1px solid rgba(0, 120, 212, 0.35);
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
  background: var(--theme-accent, #e2b112);
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
  color: var(--theme-accent, #e2b112);
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
  color: var(--theme-accent, #e2b112);
  font-size: 1.2rem;
  position: absolute;
  left: 0;
  top: -2px;
}

/* Model details section */
.model-details-section {
  padding: 2.5rem;
  margin-bottom: 2.5rem;
}

.section-badge-row {
  margin-bottom: 0.75rem;
}

.inline-badge {
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  color: var(--theme-accent, #e2b112);
  background: var(--theme-accent-glow, rgba(226, 177, 18, 0.15));
  padding: 0.25rem 0.6rem;
  border-radius: 4px;
}

.model-details-section h3 {
  font-size: 1.4rem;
  font-weight: 800;
  margin-top: 0;
  margin-bottom: 1rem;
}

.model-details-section p {
  font-size: 1.05rem;
  line-height: 1.6;
  color: var(--text-color-muted);
  margin-bottom: 2rem;
}

.vertical-stepper {
  display: flex;
  flex-direction: column;
  position: relative;
  padding-left: 2.5rem;
  gap: 2rem;
  margin-top: 1.5rem;
  margin-left: 1.5rem;
  text-align: left;
  padding-bottom: 0;
}

.stepper-item {
  position: relative;
  min-height: 30px;
}

.stepper-item::after {
  content: '';
  position: absolute;
  left: -2.5rem;
  top: 30px;
  bottom: -2rem;
  width: 2px;
  background: var(--outline-color);
}

.stepper-item:last-child::after {
  display: none;
}

.stepper-badge {
  position: absolute;
  left: -3.44rem; /* -padding-left - border-width/2 - badge-radius */
  top: 0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--background-variant);
  border: 2px solid var(--theme-accent, #e2b112);
  color: var(--theme-accent, #e2b112);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 0.85rem;
  box-shadow: 0 2px 8px var(--theme-accent-glow, rgba(226, 177, 18, 0.15));
  flex-shrink: 0;
}

.stepper-content {
  font-size: 0.95rem;
  line-height: 1.5;
  color: var(--text-color-muted);
}

.stepper-content strong {
  display: block;
  color: var(--text-color);
  margin-bottom: 0.3rem;
  font-size: 1rem;
  font-weight: 800;
}

.stepper-content code {
  background: var(--background-color);
  padding: 0.1rem 0.35rem;
  border-radius: 4px;
  font-size: 0.85rem;
  color: var(--theme-accent, #e2b112);
}

/* ML Pipeline Specs Grid */
.ml-pipeline-specs {
  margin-bottom: 2.5rem;
}

.spec-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.25rem;
}

.spec-card {
  background: var(--background-color);
  border: 1px solid var(--outline-color);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: left;
}

.spec-card h5 {
  font-size: 0.9rem;
  font-weight: 800;
  margin-top: 0;
  margin-bottom: 0.75rem;
  color: var(--theme-accent, #e2b112);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.spec-card p {
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--text-color-muted);
  margin: 0;
}

.sub-section-title {
  font-size: 1.1rem;
  font-weight: 800;
  margin-top: 2rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
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
  border-color: var(--theme-accent, #e2b112);
  color: var(--theme-accent, #e2b112);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px var(--theme-accent-glow, rgba(226, 177, 18, 0.15));
}

.deliv-icon {
  width: 20px;
  height: 20px;
  color: var(--theme-accent, #e2b112);
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

@media (max-width: 480px) {
  .vertical-stepper {
    padding-left: 2rem;
    margin-left: 0.5rem;
    gap: 1.5rem;
  }
  .stepper-badge {
    left: -2.75rem;
    width: 24px;
    height: 24px;
    font-size: 0.75rem;
  }
  .stepper-item::after {
    left: -2rem;
    top: 24px;
    bottom: -1.5rem;
  }
}
</style>
