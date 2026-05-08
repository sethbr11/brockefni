<template>
  <section ref="section" class="backstage-section" :class="{ 'is-visible': isVisible }">
    <div class="content-wrapper">
      <div class="visual-content">
        <div class="image-frame">
          <img src="@/assets/images/uptimerobot-backstage-preview.png" alt="Backstage UptimeRobot Plugin Preview" class="preview-img" />
          <div class="caption">UptimeRobot Entity Card in Backstage</div>
        </div>
      </div>
      <div class="text-content">
        <h2 class="section-title gradient-text">Enterprise Integration</h2>
        <h3 class="product-name">Backstage Plugins</h3>
        <div class="backstage-branding">
          <img src="@/assets/icons/backstage.svg" alt="Backstage Logo" class="backstage-logo" />
          <span class="plus-sign">+</span>
          <span class="ur-dot pulse"></span>
        </div>
        <p class="description">
          Seamlessly integrate UptimeRobot monitor health into your Backstage <strong>Internal Developer Portal (IDP)</strong>. Provides developers with instant visibility into their service's uptime directly where they work.
        </p>
        
        <div class="plugin-split">
          <div class="plugin-info">
            <h4>Frontend Plugin</h4>
            <p>Visual cards, progressive loading, and interactive uptime/response-time graphs.</p>
            <div class="install-wrapper">
              <InstallBlock command="yarn --cwd packages/app add @sethbr11/plugin-uptimerobot" />
            </div>
          </div>
          <div class="plugin-info">
            <h4>Backend Plugin</h4>
            <p>Secure API handling, database caching, and enterprise-grade permission integration.</p>
            <div class="install-wrapper">
              <InstallBlock command="yarn --cwd packages/backend add @sethbr11/plugin-uptimerobot-backend" />
            </div>
          </div>
        </div>

        <div class="actions">
          <a href="https://github.com/sethbr11/uptimerobot-backstage-plugin" target="_blank" class="btn btn-secondary">Frontend Repo</a>
          <a href="https://github.com/sethbr11/uptimerobot-backend-backstage-plugin" target="_blank" class="btn btn-secondary">Backend Repo</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import InstallBlock from './InstallBlock.vue'

export default defineComponent({
  name: 'BackstageSection',
  components: { InstallBlock },
  setup() {
    const isVisible = ref(false)
    const section = ref<HTMLElement | null>(null)

    onMounted(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
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
.backstage-section {
  padding: 6rem 2rem;
  background: var(--background-variant);
  overflow: hidden;
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 4rem;
  align-items: center;
}

.visual-content {
  opacity: 0;
  transform: translateX(-50px);
  transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
}

.is-visible .visual-content {
  opacity: 1;
  transform: translateX(0);
}

.image-frame {
  background: rgb(66, 66, 66); /* 0.258 gray */
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 30px 60px var(--heavy-shadow);
  border: 1px solid var(--outline-color);
}

.preview-img {
  width: 100%;
  height: auto;
  border-radius: 4px;
  display: block;
}

.caption {
  text-align: center;
  font-size: 0.8rem;
  color: #ccc;
  margin-top: 1rem;
  font-weight: 500;
}

.text-content {
  opacity: 0;
  transform: translateX(50px);
  transition: all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s;
  text-align: center; /* Centering the text content */
}

.is-visible .text-content {
  opacity: 1;
  transform: translateX(0);
}

.backstage-branding {
  margin: 1.5rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
}

.backstage-logo {
  height: 40px;
  width: auto;
  filter: drop-shadow(0 0 12px rgba(125, 243, 225, 0.4));
}

.plus-sign {
  font-size: 1.5rem;
  font-weight: 300;
  color: var(--secondary-text-color);
  opacity: 0.5;
}

.ur-dot {
  width: 24px;
  height: 24px;
  background: #3bd671;
  border-radius: 50%;
  box-shadow: 0 0 12px rgba(59, 214, 113, 0.4);
}

.ur-dot.pulse {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(59, 214, 113, 0.7); }
  70% { transform: scale(1.1); box-shadow: 0 0 0 10px rgba(59, 214, 113, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(59, 214, 113, 0); }
}

.gradient-text {
  background: linear-gradient(135deg, #7df3e1 0%, #3bd671 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 0.25rem;
}

.product-name {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  color: var(--text-color);
}

.description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--secondary-text-color);
  margin-bottom: 2.5rem;
}

.plugin-split {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
}

.plugin-info h4 {
  font-size: 1.2rem;
  font-weight: 700;
  background: linear-gradient(135deg, #7df3e1 0%, #3bd671 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.75rem;
}

.plugin-info p {
  font-size: 0.95rem;
  color: var(--secondary-text-color);
  line-height: 1.6;
}

.install-wrapper {
  margin-top: 1rem;
  opacity: 0;
  transform: translateY(10px);
  transition: all 1s ease 0.6s;
}

.is-visible .install-wrapper {
  opacity: 1;
  transform: translateY(0);
}

.actions {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

.btn {
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn-secondary {
  border: 2px solid #3bd671;
  color: var(--text-color);
  background: transparent;
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.btn-secondary::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #7df3e1 0%, #3bd671 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.btn-secondary:hover {
  border-color: transparent;
  color: #1a1b1c;
}

.btn-secondary:hover::before {
  opacity: 1;
}

@media (max-width: 992px) {
  .backstage-section {
    padding: 3rem 1rem;
  }

  .content-wrapper {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .visual-content {
    order: -1; /* Show visual first */
    transform: translateY(-10px);
    opacity: 0;
  }

  .is-visible .visual-content {
    transform: translateY(0);
  }

  .image-frame {
    padding: 0.5rem;
  }

  .product-name {
    font-size: 2rem;
    margin-bottom: 0.5rem; /* Tightened */
  }

  .description {
    font-size: 0.95rem;
    margin-bottom: 1rem; /* Tightened */
  }

  .plugin-split {
    gap: 0.5rem; /* Tightened */
    margin-bottom: 1.5rem;
  }

  .plugin-info {
    margin-bottom: 0.25rem; /* Tightened */
  }

  .plugin-info h4 {
    margin-bottom: 0.1rem; /* Tightened */
    font-size: 1.1rem;
  }
}
</style>
