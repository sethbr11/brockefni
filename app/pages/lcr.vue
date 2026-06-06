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
      title: 'LCR Tools - LDS Leader & Clerk Chrome Extension | Brockefni',
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
            'LCR Tools by Brockefni: A free browser extension that enhances the Leader and Clerk Resources (LCR) website with data exporting, CSV attendance reports, and advanced member management utilities.',
        },
        {
          name: 'keywords',
          content:
            'LCR Tools, LCR Tools Chrome Extension, Leader and Clerk Resources, LDS Leaders, LDS Clerks, LDS Secretary Tools, LDS Data Export, Brockefni LCR Tools',
        },
        {
          name: 'author',
          content: 'Seth Brock',
        },
        {
          property: 'og:title',
          content:
            'LCR Tools - LDS Leader & Clerk Chrome Extension | Brockefni',
        },
        {
          property: 'og:description',
          content:
            'LCR Tools by Brockefni: A free Chrome extension that enhances the LDS Leader and Clerk Resources (LCR) portal with attendance exporting and advanced member management tools.',
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
          content:
            'LCR Tools - LDS Leader & Clerk Chrome Extension | Brockefni',
        },
        {
          name: 'twitter:description',
          content:
            'LCR Tools by Brockefni: Essential browser utilities for LDS clerks, secretaries, and leaders. Free and open source.',
        },
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'LCR Tools',
            description:
              'A Chrome extension to enhance the Leader and Clerk Resources (LCR) experience.',
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
