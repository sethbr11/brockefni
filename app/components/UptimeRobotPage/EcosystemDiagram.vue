<template>
  <section
    ref="section"
    class="ecosystem-section"
    :class="{ 'is-visible': isVisible }"
  >
    <div class="content-container">
      <h2 class="section-title">The Architecture</h2>
      <h3 class="product-name">Integrated Ecosystem</h3>
      <p class="description">
        One core engine, infinite possibilities. See how the suite connects from
        the low-level SDK to enterprise-grade developer portals.
      </p>

      <div class="diagram-container">
        <!-- Top Level: Integration -->
        <div class="layer layer-top">
          <div class="node backstage">
            <div class="node-icon teal">B</div>
            <span>Backstage Integration</span>
          </div>
        </div>

        <!-- Connection Lines -->
        <div class="lines lines-top">
          <div class="line vertical"></div>
        </div>

        <!-- Middle Level: Tooling -->
        <div class="layer layer-middle">
          <div class="node repl">
            <div class="node-icon green">>_</div>
            <span>Interactive REPL</span>
          </div>
        </div>

        <!-- Connection Lines -->
        <div class="lines lines-bottom">
          <div class="line vertical"></div>
        </div>

        <!-- Bottom Level: Core -->
        <div class="layer layer-bottom">
          <div class="node sdk core">
            <div class="node-icon green">SDK</div>
            <span>uptime-robot-v3 (The Core)</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'

export default defineComponent({
  name: 'EcosystemDiagram',
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
      if (section.value) observer.observe(section.value)
    })

    return { isVisible, section }
  },
})
</script>

<style scoped>
.ecosystem-section {
  padding: 6rem 2rem;
  background: var(--background-color);
  text-align: center;
  overflow: hidden;
}

.content-container {
  max-width: 900px;
  margin: 0 auto;
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
  margin-bottom: 4rem;
}

.diagram-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  opacity: 0;
  transform: translateY(30px);
  transition: all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s;
}

.is-visible .diagram-container {
  opacity: 1;
  transform: translateY(0);
}

.layer {
  display: flex;
  justify-content: center;
  width: 100%;
}

.node {
  background: var(--background-variant);
  border: 2px solid var(--outline-color);
  border-radius: 12px;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 10px 30px var(--shadow);
  transition: all 0.3s ease;
  z-index: 2;
}

.node:hover {
  transform: translateY(-5px);
  border-color: #3bd671;
  box-shadow: 0 15px 40px var(--heavy-shadow);
}

.node.core {
  border-color: #3bd671;
  background: rgba(59, 214, 113, 0.05);
}

.node-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 0.9rem;
}

.node-icon.green {
  background: #3bd671;
  color: #1a1b1c;
}
.node-icon.teal {
  background: #7df3e1;
  color: #1a1b1c;
}

.lines {
  height: 60px;
  display: flex;
  justify-content: center;
  position: relative;
}

.line.vertical {
  width: 2px;
  background: linear-gradient(to bottom, var(--outline-color), #3bd671);
  height: 100%;
}

@media (max-width: 768px) {
  .product-name {
    font-size: 2rem;
  }
  .node {
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
  }
}
</style>
