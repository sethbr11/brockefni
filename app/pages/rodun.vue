<template>
  <div class="rodun-page">
    <InteractivePlanner />
    <DesktopSection />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useHead } from '#app'
import InteractivePlanner from '@/components/RodunPage/InteractivePlanner/index.vue'
import DesktopSection from '@/components/RodunPage/DesktopSection.vue'

export default defineComponent({
  name: 'RodunPage',
  components: {
    InteractivePlanner,
    DesktopSection,
  },
  setup() {
    useHead({
      title: 'Rodun - 1D Cutting Stock Optimizer & Solver',
      meta: [
        {
          name: 'description',
          content:
            'Rodun is a professional, high-performance 1D cutting stock solver and linear nesting optimizer. Minimize raw material scrap, calculate cut layouts, and export workshop-ready PDF blueprints.',
        },
        {
          name: 'keywords',
          content:
            '1D cutting stock, linear cutting optimizer, cut list calculator, bin packing algorithm, lumber cut solver, metal bar nesting, scrap minimizer, woodworking cut planner, rodun, röðun, seth brock',
        },
        // Open Graph
        {
          property: 'og:title',
          content: 'Rodun - Professional 1D Linear Cut Optimizer',
        },
        {
          property: 'og:description',
          content:
            'Maximize yield and minimize scrap with Rodun, a responsive 1D cutting stock solver. Includes raw material grids, required part layouts, and vector PDF blueprints.',
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:url',
          content: 'https://brockefni.com/rodun',
        },
        // Twitter
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          name: 'twitter:title',
          content: 'Rodun - 1D Cutting Stock Optimizer',
        },
        {
          name: 'twitter:description',
          content:
            'Minimize workshop scrap. Try the browser version or download the native C++ desktop application.',
        },
      ],
      link: [
        {
          rel: 'canonical',
          href: 'https://brockefni.com/rodun',
        },
      ],
    })
  },
})
</script>

<style scoped>
.rodun-page {
  background: var(--background-color);
  min-height: 100vh;
}
</style>
