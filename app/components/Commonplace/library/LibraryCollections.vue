<template>
  <section
    id="cp-panel-collections"
    role="tabpanel"
    aria-labelledby="cp-tab-collections"
    class="cp-lib__panel"
  >
    <ul class="cp-shelf">
      <li v-for="c in collections" :key="c.id">
        <NuxtLink :to="`/commonplace/library/${c.id}`" class="cp-card">
          <CollectionCover :collection="c" />
          <span class="cp-card__body">
            <span class="cp-card__title">{{ c.title }}</span>
            <span class="cp-card__sub">{{ c.subtitle }}</span>
            <span class="cp-card__meta">
              {{
                [c.term, c.kind === 'course' ? 'Course' : 'Personal reading']
                  .filter(Boolean)
                  .join(' · ')
              }}
            </span>
            <span class="cp-card__meta">
              {{ c.entries.length }} works ·
              {{ c.entries.filter(isFilled).length }} filled
            </span>
          </span>
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { collections, isFilled } from '@/assets/data/commonplaceData'
import CollectionCover from '@/components/Commonplace/CollectionCover.vue'
</script>

<style scoped>
.cp-shelf {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12.5rem, 1fr));
  gap: 2rem 1.5rem;
}
.cp-card {
  display: grid;
  gap: 0.9rem;
  color: inherit;
  text-decoration: none;
}
.cp-card :deep(.cp-cover) {
  transition:
    transform var(--cp-dur) var(--cp-ease),
    box-shadow var(--cp-dur) ease;
  box-shadow: var(--cp-shadow);
}
@media (hover: hover) {
  .cp-card:hover :deep(.cp-cover) {
    transform: translateY(-3px);
    box-shadow: var(--cp-shadow-lift);
  }
}
.cp-card__body {
  display: grid;
  gap: 0.2rem;
}
.cp-card__title {
  font-family: var(--cp-serif);
  font-size: 1.3rem;
  color: var(--cp-ink);
}
@media (hover: hover) {
  .cp-card:hover .cp-card__title {
    color: var(--cp-accent-ink);
  }
}
.cp-card__sub {
  font-size: 0.9rem;
}
.cp-card__meta {
  font-size: 0.76rem;
  color: var(--cp-text-muted);
}

@media (max-width: 640px) {
  .cp-shelf {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.5rem 1rem;
  }
}
</style>
