<template>
  <div class="phishing-demo-page">
    <ScrollProgress />
    <HeroSection />
    <InteractiveSimulation />
    <CTASection />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useHead } from '#app'
import ScrollProgress from '@/components/PhishingDemoPage/ScrollProgress.vue'
import HeroSection from '@/components/PhishingDemoPage/HeroSection.vue'
import InteractiveSimulation from '@/components/PhishingDemoPage/InteractiveSimulation.vue'
import CTASection from '@/components/PhishingDemoPage/CTASection.vue'

export default defineComponent({
  name: 'PhishingDemoPage',
  components: {
    ScrollProgress,
    HeroSection,
    InteractiveSimulation,
    CTASection,
  },
  setup() {
    useHead({
      title: 'Phishing Demo - Interactive Cybersecurity Simulation | Brockefni',
      link: [
        {
          rel: 'canonical',
          href: 'https://brockefni.com/phishing-demo',
        },
      ],
      meta: [
        {
          name: 'description',
          content:
            'Explore the interactive Phishing Demo by Brockefni. A hands-on cybersecurity simulation designed to teach social engineering awareness and credential security concepts.',
        },
        {
          name: 'keywords',
          content:
            'phishing demo brockefni, phishing simulator, cybersecurity education, social engineering demo, TikTok phishing simulation, credential harvesting demo, security awareness training, STEM cybersecurity',
        },
        {
          name: 'author',
          content: 'Seth Brock',
        },
        {
          property: 'og:title',
          content:
            'Phishing Demo - Interactive Cybersecurity Simulation | Brockefni',
        },
        {
          property: 'og:description',
          content:
            'Experience the interactive phishing simulation on Brockefni. Designed to teach digital safety and social engineering mechanics through a realistic email mockup.',
        },
        {
          property: 'og:image',
          content: 'https://brockefni.com/og_image.png',
        },
        {
          property: 'og:url',
          content: 'https://brockefni.com/phishing-demo',
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
            'Phishing Demo - Interactive Cybersecurity Simulation | Brockefni',
        },
        {
          name: 'twitter:description',
          content:
            'Interactive educational demo illustrating the mechanics of a phishing attack on Brockefni.',
        },
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LearningResource',
            name: 'Phishing Demo Simulation',
            description:
              'An interactive phishing simulation designed to teach cybersecurity concepts.',
            author: {
              '@type': 'Person',
              name: 'Seth Brock',
              url: 'https://brockefni.com',
            },
            learningResourceType: 'Interactive Simulation',
            educationalUse: 'Demonstration',
            typicalAgeRange: '10-18',
          }),
        },
      ],
    })

    return {}
  },
})
</script>

<style scoped>
.phishing-demo-page {
  min-height: auto;
  background: var(--background-color);
  overflow-x: hidden;
  display: block;
  position: relative;
}

/* Force parents to not add extra height on this page */
:deep(html),
:deep(body),
:deep(#__nuxt) {
  height: auto !important;
  min-height: auto !important;
  overflow-x: hidden;
}

/* Ensure smooth scrolling between sections */
.phishing-demo-page > * {
  scroll-margin-top: 2rem;
}

/* Global page animations */
.phishing-demo-page {
  animation: fadeIn 0.5s ease-out;
}

/* Eliminate any footer gap */
:deep(footer) {
  display: none;
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
