<template>
  <div class="uptimerobot-page">
    <ScrollProgress />
    <HeroSection />
    <SDKSection />
    <REPLSection />
    <BackstageSection />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useHead } from '#app'
import ScrollProgress from '@/components/UptimeRobotPage/ScrollProgress.vue'
import HeroSection from '@/components/UptimeRobotPage/HeroSection.vue'
import SDKSection from '@/components/UptimeRobotPage/SDKSection.vue'
import REPLSection from '@/components/UptimeRobotPage/REPLSection.vue'
import BackstageSection from '@/components/UptimeRobotPage/BackstageSection.vue'

export default defineComponent({
  name: 'UptimeRobotPage',
  components: {
    ScrollProgress,
    HeroSection,
    SDKSection,
    REPLSection,
    BackstageSection,
  },
  setup() {
    useHead({
      title: 'UptimeRobot Suite - Open Source Monitoring Tools',
      link: [
        {
          rel: 'canonical',
          href: 'https://brockefni.com/uptimerobot',
        },
      ],
      meta: [
        {
          name: 'description',
          content:
            'Explore the UptimeRobot Suite: A powerful TypeScript SDK, interactive REPL, and enterprise Backstage IDP plugins for seamless monitoring integration.',
        },
        {
          name: 'keywords',
          content:
            'UptimeRobot, SDK, TypeScript, Node.js, REPL, Backstage, Backstage Plugin, Internal Developer Portal, IDP, Open Source, Monitoring, API v3',
        },
        {
          name: 'author',
          content: 'Seth Brock',
        },
        {
          property: 'og:title',
          content: 'UptimeRobot Suite - Open Source Monitoring Tools',
        },
        {
          property: 'og:description',
          content:
            'A complete ecosystem of open-source tools for UptimeRobot, including a TypeScript SDK, interactive REPL, and Backstage enterprise integrations.',
        },
        {
          property: 'og:image',
          content: 'https://brockefni.com/og_image.png',
        },
        {
          property: 'og:url',
          content: 'https://brockefni.com/uptimerobot',
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
          content: 'UptimeRobot Suite - Monitoring Ecosystem',
        },
        {
          name: 'twitter:description',
          content: 'Open-source tools designed to extend and integrate the UptimeRobot API.',
        },
      ],
      script: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'UptimeRobot Suite',
            description: 'A collection of open-source tools for interacting with and integrating UptimeRobot.',
            applicationCategory: 'DeveloperApplication',
            operatingSystem: 'Node.js, Browser',
            author: {
              '@type': 'Person',
              name: 'Seth Brock',
              url: 'https://brockefni.com',
            },
            softwareAddOn: [
              {
                '@type': 'SoftwareApplication',
                name: 'uptime-robot-v3',
                description: 'TypeScript SDK for UptimeRobot API v3',
              },
              {
                '@type': 'SoftwareApplication',
                name: 'uptimerobot-backstage-plugin',
                description: 'Backstage IDP integration for UptimeRobot',
              },
            ],
          }),
        },
      ],
    })

    return {}
  },
})
</script>

<style scoped>
.uptimerobot-page {
  min-height: auto;
  background: var(--background-color);
  overflow-x: hidden;
  display: block; /* Ensure it's block-level */
  position: relative;
}

/* Force parents to not add extra height on this page */
:deep(html), :deep(body), :deep(#__nuxt) {
  height: auto !important;
  min-height: auto !important;
  overflow-x: hidden;
}

/* Ensure smooth scrolling between sections */
.uptimerobot-page > * {
  scroll-margin-top: 2rem;
}

/* Global page animations */
.uptimerobot-page {
  animation: fadeIn 0.5s ease-out;
}

/* Eliminate any footer gap */
:deep(footer) {
  display: none; /* Hide footer on this specific landing page for a cleaner stop */
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
