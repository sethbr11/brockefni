<template>
  <div class="support-page">
    <SupportHero />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useHead } from '#app'
import SupportHero from '@/components/SupportMyWorkPage/SupportHero.vue'

export default defineComponent({
  name: 'SupportMyWork',
  components: {
    SupportHero,
  },
  setup() {
    useHead({
      title: 'Support My Work - Seth Brock',
      meta: [
        {
          name: 'description',
          content:
            "Support Seth Brock's open-source development and innovative projects. Help create tools and resources for the developer community.",
        },
        {
          name: 'keywords',
          content:
            'support, sponsor, open source, GitHub sponsors, Seth Brock, development',
        },
        {
          property: 'og:title',
          content: 'Support My Work - Seth Brock',
        },
        {
          property: 'og:description',
          content:
            'Help support open-source development and innovative projects that benefit the developer community.',
        },
      ],
    })
  },
})
</script>

<style scoped>
.support-page {
  min-height: 100vh;
  background: var(--background-color);
}

.support-content {
  padding: 4rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

@media (max-width: 768px) {
  .content-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
