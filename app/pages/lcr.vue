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
      link: [
        {
          rel: 'canonical',
          href: 'https://brockefni.com/lcr',
        },
      ],
      meta: [
        {
          name: 'description',
          content:
            'Enhance your LCR experience with powerful tools for clerks, secretaries, and leaders. Free Chrome extension for attendance, data export, and member management.',
        },
        {
          name: 'keywords',
          content:
            'LCR Tools, Chrome Extension, LDS Leaders, Church of Jesus Christ, Clerk Resources, LDS Clerk Tools, LDS Secretary Tools, Attendance CSV, LDS Data Export',
        },
        {
          name: 'author',
          content: 'Seth Brock',
        },
        {
          property: 'og:title',
          content: 'LCR Tools - Powerful Extension for LDS Leaders',
        },
        {
          property: 'og:description',
          content:
            'Enhance your LCR experience with powerful tools for clerks, secretaries, and leaders. Export data, process attendance, and manage member information with ease.',
        },
        {
          property: 'og:image',
          content: 'https://brockefni.com/_nuxt/lcrToolsThumbnail.jpg',
        },
        {
          property: 'og:url',
          content: 'https://brockefni.com/lcr',
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
            'Essential browser tools for LDS clerks and secretaries. Free and open source.',
        },
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'LCR Tools',
            description: 'A Chrome extension to enhance the Leader and Clerk Resources (LCR) experience.',
            applicationCategory: 'BrowserApplication',
            operatingSystem: 'Windows, macOS, ChromeOS',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
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
