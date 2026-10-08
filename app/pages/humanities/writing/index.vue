<template>
  <div class="writing-page">
    <div class="container">
      <!-- Back Link -->
      <div class="page-top-bar">
        <NuxtLink to="/humanities" class="back-link glass-panel">
          <ArrowLeftIcon class="icon" /> Back to Humanities
        </NuxtLink>
      </div>

      <!-- Page Header -->
      <header class="page-header animate-fade-in">
        <span class="sub-badge">ESSAYS &amp; CREATIVE PROSE</span>
        <h1 class="page-title">Writing &amp; Literary Works</h1>
        <p class="page-subtitle">
          Creative narratives, academic essays, literary analyses, and philosophical reflections written during my English studies at Utah Valley University.
        </p>
      </header>

      <!-- Category Filter Pills -->
      <section class="filters-bar">
        <button
          class="filter-pill"
          :class="{ active: selectedCategory === 'all' }"
          @click="selectedCategory = 'all'"
        >
          All Pieces ({{ writings.length }})
        </button>
        <button
          class="filter-pill"
          :class="{ active: selectedCategory === 'creative' }"
          @click="selectedCategory = 'creative'"
        >
          Creative Writing
        </button>
        <button
          class="filter-pill"
          :class="{ active: selectedCategory === 'essay' }"
          @click="selectedCategory = 'essay'"
        >
          Strategy &amp; Essays
        </button>
        <button
          class="filter-pill"
          :class="{ active: selectedCategory === 'technical' }"
          @click="selectedCategory = 'technical'"
        >
          Technical Tutorials
        </button>
      </section>

      <!-- Writing Grid -->
      <main class="writings-grid">
        <WritingCard
          v-for="piece in filteredWritings"
          :key="piece.id"
          :writing="piece"
        />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ArrowLeftIcon } from 'lucide-vue-next'
import { useHead } from '#app'
import { writings } from '@/assets/data/writingData'
import WritingCard from '@/components/WritingPage/WritingCard.vue'

useHead({
  title: 'Writing & Literary Works | Seth Brock',
  meta: [
    {
      name: 'description',
      content:
        'Explore creative writing, literary criticism, and academic essays by Seth Brock.',
    },
  ],
})

const selectedCategory = ref<'all' | 'creative' | 'essay' | 'literary-analysis'>('all')

const filteredWritings = computed(() => {
  if (selectedCategory.value === 'all') {
    return writings
  }
  return writings.filter((w) => w.type === selectedCategory.value)
})
</script>

<style scoped>
.writing-page {
  min-height: 100vh;
  background: var(--background-color);
  color: var(--text-color);
  padding: 2.5rem 0 6rem 0;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.page-top-bar {
  display: flex;
  margin-bottom: 2rem;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  font-weight: 700;
  text-decoration: none;
  color: var(--text-color);
  border-radius: 30px;
  transition: all 0.2s ease;
}

.back-link:hover {
  color: var(--primary-color);
  border-color: var(--primary-color);
  transform: translateX(-3px);
}

.back-link .icon {
  width: 16px;
  height: 16px;
}

.page-header {
  text-align: center;
  max-width: 750px;
  margin: 0 auto 3rem auto;
}

.sub-badge {
  font-size: 0.85rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--primary-color);
}

.page-title {
  font-size: clamp(2.2rem, 5vw, 3.2rem);
  font-weight: 900;
  margin: 0.4rem 0 0.8rem 0;
  letter-spacing: -0.5px;
}

.page-subtitle {
  font-size: 1.1rem;
  line-height: 1.65;
  color: var(--text-color-muted);
  margin: 0;
}

.filters-bar {
  display: flex;
  justify-content: center;
  gap: 0.65rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
}

.filter-pill {
  padding: 0.5rem 1.15rem;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 700;
  background: var(--background-variant);
  border: 1px solid var(--outline-color);
  color: var(--text-color-muted);
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-pill:hover {
  border-color: var(--primary-color);
  color: var(--text-color);
}

.filter-pill.active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
  box-shadow: 0 4px 12px rgba(216, 118, 40, 0.25);
}

.writings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}
</style>
