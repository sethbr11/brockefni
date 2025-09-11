<template>
  <div class="lcr-page">
    <LCRHeroSection />
    <LCRFeaturesSection />
    <LCRInstallSection />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LCRHeroSection from '@/components/LCRToolsPage/LCRHeroSection.vue'
import LCRFeaturesSection from '@/components/LCRToolsPage/LCRFeaturesSection.vue'
import LCRInstallSection from '@/components/LCRToolsPage/LCRInstallSection.vue'

export default defineComponent({
  name: 'LCRPage',
  components: {
    LCRHeroSection,
    LCRFeaturesSection,
    LCRInstallSection,
  },
  setup() {
    useHead({
      title: 'LCR Tools - Chrome Extension for LDS Leaders',
      meta: [
        {
          name: 'description',
          content:
            'Enhance your LCR experience with powerful tools for clerks, secretaries, and leaders. Export data, process attendance, manage member information, and more with this free Chrome extension.',
        },
        {
          name: 'keywords',
          content:
            'LCR Tools, Chrome Extension, LDS, Church of Jesus Christ, Clerk, Secretary, Leader Resources, Attendance, Data Export',
        },
        {
          name: 'author',
          content: 'Seth Brock',
        },
        {
          property: 'og:title',
          content: 'LCR Tools - Chrome Extension for LDS Leaders',
        },
        {
          property: 'og:description',
          content:
            'Enhance your LCR experience with powerful tools for clerks, secretaries, and leaders. Export data, process attendance, manage member information, and more.',
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          name: 'twitter:title',
          content: 'LCR Tools - Chrome Extension for LDS Leaders',
        },
        {
          name: 'twitter:description',
          content:
            'Enhance your LCR experience with powerful tools for clerks, secretaries, and leaders.',
        },
      ],
    })

    return {}
  },
})
</script>

<style scoped>
.lcr-page {
  min-height: 100vh;
  background: var(--background-color);
}

/* Ensure smooth scrolling between sections */
.lcr-page > * {
  scroll-margin-top: 2rem;
}

/* Global page animations */
.lcr-page {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
