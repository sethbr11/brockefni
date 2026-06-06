<template>
  <section class="desktop-section" :class="{ 'is-visible': isVisible }">
    <div class="content-container">
      <div class="section-header">
        <span class="section-badge">Desktop Version</span>
        <h2 class="section-title">Rodun for Desktop</h2>
        <p class="section-desc">
          Looking for a dedicated application? Download the compiled native desktop app for offline use directly in the workshop.
        </p>
      </div>

      <!-- Download Actions -->
      <div class="cta-actions">
        <a
          v-if="isMacOS && !isMobile"
          href="https://pub-ec1ffa573fea49e58c444331188ff39c.r2.dev/Rodun-v.1.0.0-Installer-MacOS.dmg"
          class="btn btn-primary"
        >
          Download Desktop App (macOS)
        </a>
        <button
          v-else
          class="btn btn-primary btn-disabled"
          disabled
          :title="isMobile ? 'Desktop app is not available on mobile devices' : 'Only available for macOS'"
        >
          {{ isMobile ? 'Desktop Only — Not Available on Mobile' : 'macOS Only — Not Available for Your Platform' }}
        </button>
        <a
          href="https://github.com/sethbr11/Rodun"
          target="_blank"
          class="btn btn-secondary"
        >
          <svg class="github-icon" viewBox="0 0 16 16" width="18" height="18" aria-hidden="true">
            <path fill="currentColor" d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"/>
          </svg>
          GitHub Repository
        </a>
      </div>

      <!-- Terminal Gatekeeper Workaround (only shown on macOS, non-mobile) -->
      <template v-if="isMacOS && !isMobile">
        <CardComponent class="terminal-card">
          <div class="terminal-wrapper">
            <div class="terminal-header">
              <span class="dot red"></span>
              <span class="dot yellow"></span>
              <span class="dot green"></span>
              <span class="terminal-title">macOS Gatekeeper Bypass</span>
            </div>
            <div class="terminal-body">
              <code id="terminal-code">sudo xattr -r -d com.apple.quarantine /Applications/Rodun.app</code>
              <button class="copy-btn" @click="copyCommand" title="Copy to clipboard">
                <img src="@/assets/icons/copy.png" class="copy-img" alt="Copy" />
                <span class="copy-text">{{ copied ? 'Copied!' : 'Copy' }}</span>
              </button>
            </div>
          </div>
        </CardComponent>
      </template>

      <!-- Specs Grid -->
      <h3 class="specs-heading">Desktop Engine Specifications</h3>
      <div class="specs-grid">
        <!-- Card 1 -->
        <CardComponent class="spec-card">
          <div class="spec-icon-block">
            <span class="spec-number">01</span>
          </div>
          <h3 class="spec-title">C++20 Packing Engine</h3>
          <p class="spec-text">
            Implements 1D Bin-Packing algorithms (First-Fit, Best-Fit, and Sorted variants) optimized for extreme speeds. Completes cut calculations for hundreds of boards in microseconds.
          </p>
        </CardComponent>

        <!-- Card 2 -->
        <CardComponent class="spec-card">
          <div class="spec-icon-block">
            <span class="spec-number">02</span>
          </div>
          <h3 class="spec-title">Dear ImGui &amp; GLFW</h3>
          <p class="spec-text">
            Utilizes immediate-mode graphics context via Dear ImGui and GLFW for a fast desktop interface. Bypasses heavy Electron wrappers to run with near-zero CPU and memory footprint.
          </p>
        </CardComponent>

        <!-- Card 3 -->
        <CardComponent class="spec-card">
          <div class="spec-icon-block">
            <span class="spec-number">03</span>
          </div>
          <h3 class="spec-title">Libharu PDF (hpdf)</h3>
          <p class="spec-text">
            Natively links the Haru Free PDF Library to draw vector-perfect print sheets. Outputs dimensions, board counts, yields, and color-coded cut patterns directly to your disk.
          </p>
        </CardComponent>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import CardComponent from '@/components/CardComponent.vue'

export default defineComponent({
  name: 'DesktopSection',
  components: {
    CardComponent,
  },
  setup() {
    const isVisible = ref(false)
    const copied = ref(false)
    const isMacOS = ref(false)
    const isMobile = ref(false)

    const copyCommand = () => {
      const copyText = document.getElementById('terminal-code')
      if (copyText?.innerText) {
        navigator.clipboard.writeText(copyText.innerText).then(() => {
          copied.value = true
          setTimeout(() => {
            copied.value = false
          }, 2000)
        })
      }
    }

    onMounted(() => {
      // Detect macOS
      const ua = navigator.userAgent
      isMacOS.value = /Macintosh|MacIntel|MacPPC|Mac68K|Mac OS X/i.test(ua)

      // Detect mobile
      isMobile.value = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua) ||
        (navigator.maxTouchPoints > 0 && window.innerWidth < 1024)

      setTimeout(() => {
        isVisible.value = true
      }, 300)
    })

    return {
      isVisible,
      copied,
      copyCommand,
      isMacOS,
      isMobile,
    }
  }
})
</script>

<style scoped>
.desktop-section {
  padding: 6rem 2rem;
  background-color: var(--background-color);
  position: relative;
  border-top: 1px solid var(--outline-color);
}

.desktop-section *,
.desktop-section *::before,
.desktop-section *::after {
  box-sizing: border-box;
}

.content-container {
  max-width: 1200px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(20px);
  transition: all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s;
}

.is-visible .content-container {
  opacity: 1;
  transform: translateY(0);
}

.section-header {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 3rem;
}

.section-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: rgba(216, 118, 40, 0.08);
  color: var(--primary-color);
  font-weight: 700;
  font-size: 0.75rem;
  text-transform: uppercase;
  border-radius: 50px;
  margin-bottom: 0.75rem;
  border: 1px solid rgba(216, 118, 40, 0.15);
}

.section-title {
  font-size: 2.25rem;
  font-weight: 800;
  margin: 0 0 0.75rem;
  color: var(--text-color);
}

.section-desc {
  color: var(--secondary-text-color);
  line-height: 1.6;
}

.cta-actions {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
}

.btn {
  padding: 0.95rem 2rem;
  border-radius: 8px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  cursor: pointer;
  border: none;
  font-size: 0.95rem;
}

.btn-primary {
  background: var(--primary-color);
  color: white;
  box-shadow: 0 4px 15px rgba(216, 118, 40, 0.25);
}

.btn-primary:hover:not(.btn-disabled) {
  background: var(--primary-variant);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(216, 118, 40, 0.4);
}

.btn-primary.btn-disabled {
  background: #9ca3af;
  color: #e5e7eb;
  cursor: not-allowed;
  box-shadow: none;
  opacity: 0.8;
}

.darkmode .btn-primary.btn-disabled {
  background: #4b5563;
  color: #9ca3af;
}

.btn-secondary {
  border: 1px solid var(--outline-color);
  background: var(--background-variant);
  color: var(--text-color);
  box-shadow: 0 4px 10px var(--shadow);
}

.btn-secondary:hover {
  background: var(--background-lighter-variant);
  transform: translateY(-2px);
  border-color: var(--text-color);
}

/* GitHub icon — GitHub purple */
.github-icon {
  color: #8b5cf6;
  flex-shrink: 0;
}

/* Terminal Styles */
.terminal-card {
  max-width: 600px;
  margin: 0 auto 4rem;
  background: #09090b !important;
  border: 1px dashed var(--primary-color) !important;
}

.terminal-wrapper {
  background: #09090b;
  overflow: hidden;
  width: 100%;
}

.terminal-header {
  background: #141417;
  padding: 0.75rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.red { background: #ff5f56; }
.yellow { background: #ffbd2e; }
.green { background: #27c93f; }

.terminal-title {
  color: #666;
  font-size: 0.7rem;
  font-family: monospace;
  margin-left: 0.5rem;
}

.terminal-body {
  padding: 1.25rem 1.5rem;
  font-family: 'Fira Code', monospace;
  font-size: 0.8rem;
  color: #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  text-align: left;
}

.terminal-body code {
  color: #3bd671;
  word-break: break-all;
  line-height: 1.4;
}

.copy-btn {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #aaa;
  padding: 0.45rem 0.9rem;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.75rem;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.copy-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
  color: white;
}

.copy-img {
  height: 12px;
  filter: invert(1) opacity(0.6);
}

/* Specs Styles */
.specs-heading {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 2rem;
  text-align: center;
}

.specs-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.spec-card {
  padding: 2.5rem;
  text-align: left;
  border: 1px dashed var(--outline-color) !important;
}

.spec-card:hover {
  border-color: var(--primary-color) !important;
}

.spec-icon-block {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.spec-number {
  font-family: monospace;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--primary-color);
  opacity: 0.6;
}

.spec-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 1rem;
  color: var(--text-color);
}

.spec-text {
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--secondary-text-color);
  margin: 0;
}

@media (max-width: 992px) {
  .specs-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
  
  .desktop-section {
    padding: 4rem 1rem;
  }

  .terminal-body {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .copy-btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .desktop-section {
    padding: 3rem 1rem;
  }

  .section-header {
    margin: 0 auto 2rem;
  }

  .section-title {
    font-size: 1.75rem;
  }

  .section-desc {
    font-size: 0.9rem;
  }

  .cta-actions {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .btn {
    font-size: 0.85rem;
    padding: 0.85rem 1.5rem;
    min-height: 44px;
    text-align: center;
  }

  .specs-heading {
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
  }

  .spec-card {
    padding: 1rem;
  }

  .spec-title {
    font-size: 0.95rem;
  }

  .spec-text {
    font-size: 0.75rem;
    line-height: 1.4;
  }

  .terminal-card {
    margin-bottom: 2.5rem;
  }
}

@media (max-width: 480px) {
  .desktop-section {
    padding: 2rem 0.75rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .section-desc {
    font-size: 0.8rem;
  }

  .terminal-body {
    padding: 1rem;
    font-size: 0.7rem;
  }

  .specs-grid {
    gap: 0.5rem;
  }

  .spec-card {
    padding: 0.5rem;
  }

  .spec-title {
    font-size: 0.85rem;
  }

  .spec-text {
    font-size: 0.7rem;
    line-height: 1.3;
  }
}
</style>
