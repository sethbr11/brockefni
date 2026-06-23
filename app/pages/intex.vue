<template>
  <div class="intex-page" :style="cssVars">
    <!-- Hero Banner Section -->
    <IntexHeroSection />

    <!-- Tab Control & Content Area -->
    <main class="container page-content">
      <!-- Tabs Navigation -->
      <div class="tabs-nav glass-panel">
        <button
          class="tab-btn"
          :class="{ active: activeTab === 'overview' }"
          @click="setTab('overview')"
        >
          <GraduationCapIcon class="tab-icon" /> Progression Overview
        </button>
        <button
          class="tab-btn"
          :class="{
            active: activeTab === 'intex1',
            'active-intex1': activeTab === 'intex1',
          }"
          @click="setTab('intex1')"
        >
          <CodeIcon class="tab-icon" /> INTEX I: Social Media Study
        </button>
        <button
          class="tab-btn"
          :class="{
            active: activeTab === 'intex2',
            'active-intex2': activeTab === 'intex2',
          }"
          @click="setTab('intex2')"
        >
          <ShieldAlertIcon class="tab-icon" /> INTEX II: E-Commerce &amp; ML
          Shield
        </button>
      </div>

      <!-- Tab Content Transitions -->
      <div class="tab-viewport">
        <transition name="fade-slide" mode="out-in">
          <IntexOverviewTab
            v-if="activeTab === 'overview'"
            @explore="setTab"
            key="overview"
          />
          <IntexOneTab v-else-if="activeTab === 'intex1'" key="intex1" />
          <IntexTwoTab v-else-if="activeTab === 'intex2'" key="intex2" />
        </transition>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from '#app'
import { useHead, useSeoMeta } from '#app'
import { GraduationCapIcon, CodeIcon, ShieldAlertIcon } from 'lucide-vue-next'
import IntexHeroSection from '@/components/IntexPage/IntexHeroSection.vue'
import IntexOverviewTab from '@/components/IntexPage/IntexOverviewTab.vue'
import IntexOneTab from '@/components/IntexPage/IntexOneTab.vue'
import IntexTwoTab from '@/components/IntexPage/IntexTwoTab.vue'

export default defineComponent({
  name: 'IntexProjectsPage',
  components: {
    GraduationCapIcon,
    CodeIcon,
    ShieldAlertIcon,
    IntexHeroSection,
    IntexOverviewTab,
    IntexOneTab,
    IntexTwoTab,
  },
  setup() {
    // Rich SEO Meta Tags for Search Engines & Social Media Previewing
    useHead({
      title: 'BYU Junior Core INTEX Capstone Projects | Seth Brock Portfolio',
      link: [{ rel: 'canonical', href: 'https://brockefni.com/intex' }],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'BYU Junior Core INTEX Capstone Projects',
            description:
              'Exploration of BYU MISM Junior Core INTEX projects: full-stack systems engineering, secure data pipelines, cloud deployment, and real-time ONNX machine learning fraud predictions.',
            url: 'https://brockefni.com/intex',
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: 'https://brockefni.com',
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'BYU Experience',
                  item: 'https://brockefni.com/byu',
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: 'INTEX',
                  item: 'https://brockefni.com/intex',
                },
              ],
            },
            author: {
              '@type': 'Person',
              name: 'Seth Brock',
              url: 'https://brockefni.com',
            },
          }),
        },
      ],
    })

    useSeoMeta({
      title: 'BYU Junior Core INTEX Capstone Projects | Seth Brock Portfolio',
      ogTitle: 'BYU Junior Core INTEX Capstone Projects | Seth Brock Portfolio',
      description:
        'Exploration of BYU MISM Junior Core INTEX projects: full-stack systems engineering, secure data pipelines, cloud deployment, and real-time ONNX machine learning fraud predictions.',
      ogDescription:
        'Exploration of BYU MISM Junior Core INTEX projects: full-stack systems engineering, secure data pipelines, cloud deployment, and real-time ONNX machine learning fraud predictions.',
      ogType: 'website',
      ogUrl: 'https://brockefni.com/intex',
      ogImage: 'https://brockefni.com/_nuxt/intex2-screenshot.png',
      twitterCard: 'summary_large_image',
      twitterTitle:
        'BYU Junior Core INTEX Capstone Projects | Seth Brock Portfolio',
      twitterDescription:
        'Exploration of BYU MISM Junior Core INTEX projects: full-stack systems engineering, secure data pipelines, cloud deployment, and real-time ONNX machine learning fraud predictions.',
      twitterImage: 'https://brockefni.com/_nuxt/intex2-screenshot.png',
    })

    const route = useRoute()
    const router = useRouter()
    const activeTab = ref('overview')

    const setTab = (tabName: string) => {
      activeTab.value = tabName
      // Sync URL hash for anchor bookmarks
      if (tabName === 'overview') {
        router.replace({ hash: '' })
      } else if (tabName === 'intex1') {
        router.replace({ hash: '#intex1' })
      } else if (tabName === 'intex2') {
        router.replace({ hash: '#intex2' })
      }
    }

    // Sync tab on mount based on hash
    onMounted(() => {
      const hash = route.hash
      if (hash === '#intex1') {
        activeTab.value = 'intex1'
      } else if (hash === '#intex2') {
        activeTab.value = 'intex2'
      } else {
        activeTab.value = 'overview'
      }
    })

    const cssVars = computed(() => {
      let accent = '#d87628' // default orange
      let glow = 'rgba(216, 118, 40, 0.15)'
      if (activeTab.value === 'intex1') {
        accent = '#76a03f' // Sage Green for INTEX 1
        glow = 'rgba(118, 160, 63, 0.15)'
      } else if (activeTab.value === 'intex2') {
        accent = '#e2b112' // Lego Yellow/Gold for INTEX 2
        glow = 'rgba(226, 177, 18, 0.15)'
      }
      return {
        '--theme-accent': accent,
        '--theme-accent-glow': glow,
      }
    })

    return {
      activeTab,
      setTab,
      cssVars,
    }
  },
})
</script>

<style scoped>
.intex-page {
  min-height: 100vh;
  background: var(--background-color);
  color: var(--text-color);
  padding-bottom: 6rem;
  --theme-accent: #d87628;
  --theme-accent-glow: rgba(216, 118, 40, 0.15);
  --theme-dark: #002e5d;
  --theme-light-blue: rgba(0, 46, 93, 0.08);
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Glass panel styling */
.glass-panel {
  background: var(--background-variant);
  border: 1px solid var(--outline-color);
  border-radius: 16px;
  box-shadow: 0 8px 30px var(--shadow);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

/* Page Content */
.page-content {
  margin-top: 3rem;
}

.tabs-nav {
  display: flex;
  padding: 0.5rem;
  gap: 0.5rem;
  margin-bottom: 2.5rem;
}

.tab-btn {
  flex: 1;
  background: transparent;
  border: none;
  border-radius: 8px;
  padding: 0.85rem 1.25rem;
  color: var(--text-color-muted);
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.tab-btn:hover {
  background: var(--background-lighter-variant);
  color: var(--text-color);
}

.tab-btn.active {
  background: var(--theme-accent);
  color: white;
  box-shadow: 0 4px 15px var(--theme-accent-glow);
}

.tab-btn.active.active-intex1 {
  background: #76a03f;
  box-shadow: 0 4px 15px rgba(118, 160, 63, 0.3);
}

.tab-btn.active.active-intex2 {
  background: #e2b112;
  color: #111;
  box-shadow: 0 4px 15px rgba(226, 177, 18, 0.3);
}

.tab-icon {
  width: 18px;
  height: 18px;
}

/* Tab viewport */
.tab-viewport {
  width: 100%;
}

/* Transitions */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Responsive constraints */
@media (max-width: 768px) {
  .tabs-nav {
    flex-direction: column;
    padding: 0.25rem;
  }

  .tab-btn {
    padding: 0.7rem;
    font-size: 0.9rem;
  }
}
</style>
