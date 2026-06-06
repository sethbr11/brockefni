<template>
  <section
    ref="section"
    class="repl-section"
    :class="{ 'is-visible': isVisible }"
  >
    <div class="content-container">
      <div class="header">
        <h2 class="section-title">Developer Experience</h2>
        <h3 class="product-name">uptime-robot-v3-repl</h3>
        <p class="description">
          An interactive Node.js REPL for exploring and testing the Uptime Robot
          API. No more writing scripts just to check an endpoint.
        </p>
      </div>

      <div class="terminal-container">
        <div class="terminal">
          <div class="terminal-header">
            <span class="terminal-title">bash — uptime-robot-v3-repl</span>
          </div>
          <div class="terminal-body">
            <!-- Initial state: REPL already started -->
            <div class="line">
              <span class="prompt">$</span> UPTIMEROBOT_API_KEY=your_key npx
              uptime-robot-v3-repl
            </div>

            <div class="ascii-art">
              <pre>
██╗   ██╗██████╗ ████████╗██╗███╗   ███╗███████╗██████╗  ██████╗ ██████╗  ██████╗ ████████╗
██║   ██║██╔══██╗╚══██╔══╝██║████╗ ████║██╔════╝██╔══██╗██╔═══██╗██╔══██╗██╔═══██╗╚══██╔══╝
██║   ██║██████╔╝   ██║   ██║██╔████╔██║█████╗  ██████╔╝██║   ██║██████╔╝██║   ██║   ██║   
██║   ██║██╔═══╝    ██║   ██║██║╚██╔╝██║██╔══╝  ██╔══██╗██║   ██║██╔══██╗██║   ██║   ██║   
╚██████╔╝██║        ██║   ██║██║ ╚═╝ ██║███████╗██║  ██║╚██████╔╝██████╔╝╚██████╔╝   ██║   
 ╚═════╝ ╚═╝        ╚═╝   ╚═╝╚═╝     ╚═╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═════╝  ╚═════╝    ╚═╝   
</pre
              >
            </div>

            <div class="terminal-static-output">
              <div class="line info">
                💡 UptimeRobot service (API v3) available as "service"
              </div>
              <div class="line info">
                💡 Type <span class="cmd">help()</span> for resource & method
                index; <span class="cmd">help("list")</span> to search methods
              </div>
              <div class="line info">
                💡 Type <span class="cmd">.exit</span> or press Ctrl+D to exit
              </div>
              <div class="line divider">
                ───────────────────────────────────
              </div>
            </div>

            <!-- Typing state: The command -->
            <div class="line">
              <span class="prompt">uptime></span> {{ displayCommand
              }}<span v-if="typing" class="cursor">_</span>
            </div>

            <!-- Result state: The output -->
            <div v-if="showResult" class="terminal-result">
              <div class="line output">
                [ { id: 12345, friendlyName: 'Brockefni', status: 2 } ]
              </div>
              <div class="line">
                <span class="prompt">uptime></span>
                <span class="cursor">_</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="features-grid">
        <div class="feature-item">
          <h4>Live Exploration</h4>
          <p>Instant access to the full SDK in a global context.</p>
        </div>
        <div class="feature-item">
          <h4>Integrated Help</h4>
          <p>Docstrings available directly within the shell.</p>
        </div>
        <div class="feature-item">
          <h4>Rapid Prototyping</h4>
          <p>Test your logic before committing to code.</p>
        </div>
      </div>

      <div class="actions">
        <a
          href="https://github.com/sethbr11/uptime-robot-v3-repl"
          target="_blank"
          class="btn btn-primary"
          >View on GitHub</a
        >
      </div>

      <div class="install-wrapper">
        <InstallBlock command="npm install -g uptime-robot-v3-repl" />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import InstallBlock from './InstallBlock.vue'

export default defineComponent({
  name: 'REPLSection',
  components: { InstallBlock },
  setup() {
    const isVisible = ref(false)
    const section = ref<HTMLElement | null>(null)
    const typing = ref(false)
    const displayCommand = ref('')
    const showResult = ref(false)

    const fullCommand = 'await service.monitors.list({ limit: 1 })'

    const typeCommand = () => {
      typing.value = true
      let i = 0
      const interval = setInterval(() => {
        displayCommand.value += fullCommand[i]
        i++
        if (i >= fullCommand.length) {
          clearInterval(interval)
          typing.value = false
          setTimeout(() => {
            showResult.value = true
          }, 400)
        }
      }, 50)
    }

    onMounted(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0]
          if (entry && entry.isIntersecting) {
            isVisible.value = true
            // Start typing only when user sees the section
            setTimeout(typeCommand, 800)
            observer.unobserve(entry.target)
          }
        },
        { threshold: 0.3 }
      )

      if (section.value) {
        observer.observe(section.value)
      }
    })

    return {
      isVisible,
      section,
      displayCommand,
      typing,
      showResult,
    }
  },
})
</script>

<style scoped>
.repl-section {
  padding: 6rem 2rem;
  background: var(--background-color);
  text-align: center;
}

.content-container {
  max-width: 900px;
  margin: 0 auto;
}

.header {
  opacity: 0;
  transform: translateY(30px);
  transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
  margin-bottom: 3rem;
}

.is-visible .header {
  opacity: 1;
  transform: translateY(0);
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
  max-width: 600px;
  margin: 0 auto;
}

.terminal-container {
  opacity: 0;
  transform: scale(0.98);
  transition: all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s;
  margin-bottom: 3rem;
  max-width: 700px; /* Smaller terminal */
  margin-left: auto;
  margin-right: auto;
}

.is-visible .terminal-container {
  opacity: 1;
  transform: scale(1);
}

.terminal {
  background: #0d0d0d;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 30px 60px var(--heavy-shadow);
  text-align: left;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.terminal-header {
  background: #1a1a1a;
  padding: 0.6rem 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.terminal-title {
  color: #888;
  font-size: 0.75rem;
  font-family: monospace;
}

.terminal-body {
  padding: 1.5rem;
  font-family: 'Fira Code', monospace;
  font-size: 0.75rem;
  color: #e0e0e0;
  min-height: 280px;
  container-type: inline-size;
}

.ascii-art {
  color: #3bd671;
  line-height: 1.1;
  margin: 0.75rem 0;
  overflow: hidden;
}

.terminal-result {
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.ascii-art pre {
  margin: 0;
  font-family: inherit;
  font-size: clamp(3px, 1.72cqi, 11px);
  overflow: hidden;
}

.line {
  margin-bottom: 0.4rem;
}
.prompt {
  color: #3bd671;
  font-weight: bold;
  margin-right: 0.5rem;
}
.info {
  color: #8be9fd;
}
.divider {
  color: #444;
}
.cmd {
  color: #f1fa8c;
}
.output {
  color: #8be9fd;
}

.cursor {
  display: inline-block;
  width: 7px;
  height: 1.1em;
  background: #3bd671;
  vertical-align: middle;
  animation: blink 1s infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 3rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s;
}

.is-visible .features-grid {
  opacity: 1;
  transform: translateY(0);
}

.feature-item h4 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 0.4rem;
}

.feature-item p {
  font-size: 0.85rem;
  color: var(--secondary-text-color);
}

.actions {
  opacity: 0;
  transition: all 1s ease 0.7s;
  margin-bottom: 1.5rem;
}

.is-visible .actions {
  opacity: 1;
}

.btn-primary {
  padding: 0.8rem 1.6rem;
  background: #3bd671;
  color: #1a1b1c;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  display: inline-block;
}

.install-wrapper {
  margin-top: 1.5rem;
  opacity: 0;
  transform: translateY(10px);
  transition: all 1s ease 0.9s;
}

.is-visible .install-wrapper {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 768px) {
  .repl-section {
    padding: 3rem 1rem;
  }

  .terminal-container {
    margin-bottom: 2rem;
    max-width: 100%;
  }

  .terminal-body {
    min-height: 180px;
    padding: 1rem;
    font-size: 0.6rem;
  }

  /* Font size handled by container query clamp */

  .features-grid {
    grid-template-columns: 1fr;
    gap: 0.5rem; /* Tightened */
    margin-bottom: 2rem;
  }

  .feature-item {
    margin-bottom: 0.1rem; /* Tightened */
  }

  .feature-item h4 {
    margin-bottom: 0.2rem;
  }

  .product-name {
    font-size: 2rem;
    margin-bottom: 0.75rem;
  }

  .description {
    font-size: 0.95rem;
    margin-bottom: 1.5rem;
  }
}
</style>
