<template>
  <aside class="cp-app" aria-label="About this work">
    <p class="cp-app__pos">
      No. {{ position.index + 1 }} of {{ position.total }} · {{ sourceLabel }}
    </p>
    <h1 class="cp-app__title">{{ entry.title }}</h1>
    <p class="cp-app__author">{{ entry.author }}</p>

    <dl v-if="facts.length" class="cp-app__facts">
      <template v-for="f in facts" :key="f.label">
        <dt>{{ f.label }}</dt>
        <dd>
          <span
            v-if="f.label === 'Period'"
            class="cp-app__swatch"
            aria-hidden="true"
          />{{ f.value }}
        </dd>
      </template>
    </dl>

    <div v-if="tagChips.length" class="cp-app__group">
      <h2 class="cp-label">Themes</h2>
      <ul class="cp-chips">
        <li v-for="t in tagChips" :key="t.id">
          <NuxtLink :to="t.to" class="cp-chip cp-chip--link">{{
            t.label
          }}</NuxtLink>
        </li>
      </ul>
    </div>

    <div v-if="entry.devices?.length" class="cp-app__group">
      <h2 class="cp-label">Devices</h2>
      <ul class="cp-chips">
        <li v-for="d in entry.devices" :key="d">
          <span class="cp-chip">{{ d }}</span>
        </li>
      </ul>
    </div>

    <div v-if="entry.notes" class="cp-app__group">
      <h2 class="cp-label">Notes</h2>
      <p class="cp-app__notes">{{ entry.notes }}</p>
    </div>
  </aside>
</template>

<script setup lang="ts">
import type { Entry } from '@/assets/data/commonplaceData'
import './reader-shared.css'

export interface ReaderFact {
  label: string
  value: string
}

export interface ReaderTagChip {
  id: string
  label: string
  to: string
}

defineProps<{
  entry: Entry
  position: { index: number; total: number }
  sourceLabel: string
  facts: ReaderFact[]
  tagChips: ReaderTagChip[]
}>()
</script>

<style scoped>
.cp-app {
  min-height: 0;
  overflow-y: auto;
  padding: 2.5rem 2rem 2rem 1.5rem;
  border-right: 1px solid var(--cp-rule);
}

.cp-app__pos {
  margin: 0 0 1.1rem;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  color: var(--cp-text-muted);
}

.cp-app__title {
  margin: 0;
  font-family: var(--cp-serif);
  font-weight: 500;
  font-size: clamp(1.8rem, 2.6vw, 2.35rem);
  line-height: 1.1;
  color: var(--cp-ink);
  text-wrap: balance;
}

.cp-app__author {
  margin: 0.5rem 0 0;
  font-family: var(--cp-serif);
  font-style: italic;
  font-size: 1.1rem;
  color: var(--cp-text-muted);
}

.cp-app__facts {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.45rem 1rem;
  margin: 1.75rem 0 0;
  padding-top: 1.25rem;
  border-top: 1px solid var(--cp-rule);
  font-size: 0.82rem;
}
.cp-app__facts dt {
  color: var(--cp-text-muted);
  font-variant-caps: all-small-caps;
  letter-spacing: 0.08em;
  font-size: 0.95rem;
  line-height: 1.3;
}
.cp-app__facts dd {
  margin: 0;
  color: var(--cp-text);
  line-height: 1.4;
}
.cp-app__swatch {
  display: inline-block;
  width: 0.55rem;
  height: 0.55rem;
  margin-right: 0.45rem;
  border-radius: 50%;
  background: var(--cp-period);
}

.cp-app__group {
  margin-top: 1.5rem;
}
.cp-app__notes {
  margin: 0;
  font-size: 0.85rem;
  line-height: 1.55;
  color: var(--cp-text-muted);
  white-space: pre-line;
}

.cp-chips {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}
.cp-chip {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  background: var(--cp-chip-bg);
  font-size: 0.75rem;
  color: var(--cp-text);
  text-decoration: none;
}
.cp-chip--link:hover {
  color: var(--cp-accent-ink);
  background: var(--cp-accent-soft);
}

@media (max-width: 820px) {
  .cp-app {
    overflow: visible;
    padding: 1.75rem 1.1rem 1.25rem;
    border-right: 0;
    border-bottom: 1px solid var(--cp-rule);
  }
}
</style>
