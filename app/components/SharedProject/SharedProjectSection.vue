<template>
  <section
    ref="section"
    class="shared-project-section"
    :class="{ 'is-visible': isVisible, 'reverse-layout': reverse }"
    @mousemove="onMouseMove"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <!-- Background Code Reveal Layer -->
    <div 
      v-if="$slots['background-code']"
      class="section-bg-code" 
      :class="{ 'is-hovered': isHovered }"
      :style="{ '--x': mouseX + 'px', '--y': mouseY + 'px' }"
    >
      <pre><code><slot name="background-code"></slot></code></pre>
    </div>

    <div class="content-wrapper">
      <div class="visual-content">
        <slot name="visual"></slot>
      </div>
      <div class="text-content">
        <h2 class="section-subtitle" :style="{ color: themeColor }">{{ subtitle }}</h2>
        <h3 class="section-title">{{ title }}</h3>
        <div class="description">
          <slot name="description"></slot>
        </div>
        
        <ul v-if="features && features.length > 0" class="features-list">
          <li v-for="(feature, idx) in features" :key="idx">{{ feature }}</li>
        </ul>

        <div class="actions" v-if="$slots.actions">
          <slot name="actions"></slot>
        </div>
        
        <div class="install-wrapper" v-if="$slots.install">
          <slot name="install"></slot>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'

export default defineComponent({
  name: 'SharedProjectSection',
  props: {
    title: { type: String, required: true },
    subtitle: { type: String, default: '' },
    themeColor: { type: String, default: '#3bd671' },
    reverse: { type: Boolean, default: false },
    features: { type: Array as () => string[], default: () => [] }
  },
  setup() {
    const isVisible = ref(false)
    const section = ref<HTMLElement | null>(null)
    const isHovered = ref(false)
    const mouseX = ref(0)
    const mouseY = ref(0)

    const onMouseMove = (e: MouseEvent) => {
      if (!section.value) return
      const rect = section.value.getBoundingClientRect()
      mouseX.value = e.clientX - rect.left
      mouseY.value = e.clientY - rect.top
    }

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
      isHovered,
      mouseX,
      mouseY,
      onMouseMove
    }
  },
})
</script>

<style scoped>
.shared-project-section {
  padding: 6rem 2rem;
  background: var(--background-variant);
  overflow: hidden;
  position: relative;
}

.section-bg-code {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(10, 10, 10, 0.4); /* Faint overlay */
  color: rgba(255, 128, 8, 0.25); /* Faint code color */
  font-family: 'Fira Code', monospace;
  font-size: 0.8rem;
  line-height: 1.4;
  padding: 2rem;
  overflow: hidden;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 0;
  
  /* Circular mask centered at --x and --y */
  mask-image: radial-gradient(circle 250px at var(--x) var(--y), black 20%, transparent 80%);
  -webkit-mask-image: radial-gradient(circle 250px at var(--x) var(--y), black 20%, transparent 80%);
}

.section-bg-code.is-hovered {
  opacity: 1;
}

.section-bg-code pre {
  margin: 0;
  white-space: pre-wrap;
  word-break: break-all;
}

/* Alternate backgrounds for consecutive sections */
.shared-project-section:nth-of-type(even) {
  background: var(--background-color);
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 1;
}

.reverse-layout .content-wrapper {
  grid-template-columns: 1fr 1fr;
}

.visual-content {
  opacity: 0;
  transform: translateX(-50px);
  transition: all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s;
  width: 100%;
  min-width: 0;
}

.reverse-layout .visual-content {
  order: 2;
  transform: translateX(50px);
}

.is-visible .visual-content {
  opacity: 1;
  transform: translateX(0);
}

.text-content {
  opacity: 0;
  transform: translateX(50px);
  transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
  text-align: left;
  min-width: 0;
}

.reverse-layout .text-content {
  order: 1;
  transform: translateX(-50px);
}

.is-visible .text-content {
  opacity: 1;
  transform: translateX(0);
}

.section-subtitle {
  font-size: 1.25rem;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 0.25rem;
}

.section-title {
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
  position: relative;
  padding-left: 1.5rem;
}

.features-list li::before {
  content: '→';
  position: absolute;
  left: 0;
  color: var(--secondary-text-color);
}

.actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
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

@media (max-width: 992px) {
  .shared-project-section {
    padding: 3rem 1rem;
  }

  .content-wrapper,
  .reverse-layout .content-wrapper {
    grid-template-columns: 1fr;
    gap: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .visual-content,
  .reverse-layout .visual-content {
    order: 1;
    transform: translateY(-10px);
    opacity: 0;
    max-width: 100%;
  }

  .text-content,
  .reverse-layout .text-content {
    order: 2;
    transform: translateY(10px);
    opacity: 0;
    text-align: center;
  }

  .is-visible .visual-content,
  .is-visible .text-content {
    transform: translateY(0);
    opacity: 1;
  }

  .section-title {
    font-size: 2rem;
  }
  
  .features-list li::before {
    display: none;
  }
  .features-list li {
    padding-left: 0;
  }
  
  .actions {
    justify-content: center;
  }
}
</style>
