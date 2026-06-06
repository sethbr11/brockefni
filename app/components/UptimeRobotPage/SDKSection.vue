<template>
  <section
    ref="section"
    class="sdk-section"
    :class="{ 'is-visible': isVisible }"
  >
    <div class="content-wrapper">
      <div class="visual-content">
        <div class="code-window">
          <div class="window-header">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
            <span class="file-name">example.ts</span>
          </div>
          <div class="code-body">
            <pre><code><span class="keyword">import</span> { UptimeRobotService } <span class="keyword">from</span> <span class="string">'uptime-robot-v3'</span>;

<span class="keyword">const</span> service = <span class="keyword">new</span> UptimeRobotService({
  apiKey: process.env.UPTIMEROBOT_API_KEY
});

<span class="comment">// Fetch all monitors</span>
<span class="keyword">const</span> monitors = <span class="keyword">await</span> service.monitors.list();</code></pre>
          </div>
        </div>
      </div>
      <div class="text-content">
        <h2 class="section-title">The Foundation</h2>
        <h3 class="product-name">uptime-robot-v3</h3>
        <p class="description">
          A community-maintained TypeScript/Node.js client for the Uptime Robot
          REST API v3. Built with type safety and modern JavaScript patterns in
          mind.
        </p>
        <ul class="features-list">
          <li>Full coverage of the API v3 surface</li>
          <li>ESM only, built for Node.js 18+</li>
          <li>Optimized batch execution helpers</li>
          <li>Comprehensive JSDoc documentation</li>
        </ul>
        <div class="actions">
          <a
            href="https://github.com/sethbr11/uptime-robot-v3"
            target="_blank"
            class="btn btn-primary"
            >View on GitHub</a
          >
          <a
            href="https://www.npmjs.com/package/uptime-robot-v3"
            target="_blank"
            class="btn btn-secondary"
            >NPM</a
          >
        </div>

        <div class="install-wrapper">
          <InstallBlock command="npm install uptime-robot-v3" />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import InstallBlock from './InstallBlock.vue'

export default defineComponent({
  name: 'SDKSection',
  components: { InstallBlock },
  setup() {
    const isVisible = ref(false)
    const section = ref<HTMLElement | null>(null)

    onMounted(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0]
          if (entry && entry.isIntersecting) {
            isVisible.value = true
            observer.unobserve(entry.target)
          }
        },
        { threshold: 0.2 }
      )

      if (section.value) {
        observer.observe(section.value)
      }
    })

    return {
      isVisible,
      section,
    }
  },
})
</script>

<style scoped>
.sdk-section {
  padding: 6rem 2rem;
  background: var(--background-variant);
  overflow: hidden;
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.visual-content {
  opacity: 0;
  transform: translateX(-50px);
  transition: all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s;
  width: 100%;
}

.is-visible .visual-content {
  opacity: 1;
  transform: translateX(0);
}

.text-content {
  opacity: 0;
  transform: translateX(50px);
  transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
  text-align: center; /* Centering the text content */
}

.is-visible .text-content {
  opacity: 1;
  transform: translateX(0);
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #3bd671;
  text-transform: uppercase;
  margin-bottom: 0.25rem;
}

.product-name {
  font-size: 3rem;
  font-weight: 800;
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: var(--text-color);
}

.description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--secondary-text-color);
  margin-bottom: 2rem;
}

.features-list {
  list-style: none;
  padding: 0;
  margin-bottom: 2.5rem;
}

.features-list li {
  margin-bottom: 0.75rem;
  color: var(--text-color);
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 1rem;
}

.btn {
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn-primary {
  background: #3bd671;
  color: #1a1b1c;
}

.btn-primary:hover {
  background: #2fb961;
}

.btn-secondary {
  border: 2px solid var(--outline-color);
  color: var(--text-color);
}

.btn-secondary:hover {
  background: var(--outline-color);
}

.install-wrapper {
  margin-top: 1.5rem;
  opacity: 0;
  transform: translateY(10px);
  transition: all 1s ease 0.6s;
}

.is-visible .install-wrapper {
  opacity: 1;
  transform: translateY(0);
}

.code-window {
  background: #1e1e1e;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 40px var(--heavy-shadow);
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: left;
  max-width: 100%;
}

.window-header {
  background: #2d2d2d;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.red {
  background: #ff5f56;
}
.yellow {
  background: #ffbd2e;
}
.green {
  background: #27c93f;
}

.file-name {
  color: #999;
  font-size: 0.8rem;
  margin-left: 0.5rem;
  font-family: monospace;
}

.code-body {
  padding: 1.5rem;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  color: #d4d4d4;
  text-align: left;
}

.keyword {
  color: #569cd6;
}
.string {
  color: #ce9178;
}
.comment {
  color: #6a9955;
}

@media (max-width: 992px) {
  .sdk-section {
    padding: 3rem 1rem;
  }

  .content-wrapper {
    grid-template-columns: 1fr;
    gap: 2rem;
    width: 100%;
    max-width: 100%;
    margin: 0;
    padding: 0 1rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .visual-content {
    transform: translateY(-10px);
    opacity: 0;
    width: 100%;
    max-width: 300px; /* Shortened to fit screens better */
    margin: 0 auto;
    padding: 0;
  }

  .is-visible .visual-content {
    transform: translateY(0);
  }

  .code-window {
    width: 100%;
    margin: 0;
  }

  .text-content {
    transform: translateY(10px);
    opacity: 0;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  .is-visible .text-content {
    transform: translateY(0);
  }

  .product-name {
    font-size: 1.85rem; /* Smaller font */
    margin-bottom: 0.75rem;
  }

  .description {
    font-size: 0.9rem;
  }

  .code-body {
    font-size: 0.6rem; /* Smaller font to fit */
    padding: 1rem;
  }

  .code-body pre {
    white-space: pre-wrap; /* Enable wrapping for long lines */
    word-break: break-all;
  }
}
</style>
