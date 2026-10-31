<template>
  <section
    id="cp-panel-index"
    role="tabpanel"
    aria-labelledby="cp-tab-index"
    class="cp-lib__panel"
  >
    <nav class="cp-az" aria-label="Jump to letter">
      <a
        v-for="g in indexGroups"
        :key="g.letter"
        :href="`#cp-idx-${g.letter}`"
        >{{ g.letter }}</a
      >
    </nav>
    <div
      v-for="g in indexGroups"
      :id="`cp-idx-${g.letter}`"
      :key="g.letter"
      class="cp-idx"
    >
      <h2 class="cp-idx__letter">{{ g.letter }}</h2>
      <ul class="cp-idx__list">
        <li v-for="row in g.rows" :key="row.entry.id">
          <NuxtLink
            :to="`/commonplace/read/${row.entry.id}?from=collection:${row.collection.id}`"
            class="cp-idx__row"
          >
            <span class="cp-idx__title">{{ row.entry.title }}</span>
            <span class="cp-idx__author">{{ row.entry.author }}</span>
            <span class="cp-idx__coll">{{ row.collection.title }}</span>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  collections,
  type Collection,
  type Entry,
} from '@/assets/data/commonplaceData'

/** Sort key: drop leading articles/quotes/diacritics so "The Altar" files under A. */
function sortKey(title: string) {
  return title
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/^["'“‘\s]+/, '')
    .replace(/^(the|a|an)\s+/i, '')
    .toLowerCase()
}

const indexGroups = computed(() => {
  const rows: { entry: Entry; collection: Collection; key: string }[] =
    collections.flatMap((collection) =>
      collection.entries.map((entry) => ({
        entry,
        collection,
        key: sortKey(entry.title),
      }))
    )
  rows.sort((a, b) => a.key.localeCompare(b.key))
  const groups: { letter: string; rows: typeof rows }[] = []
  for (const row of rows) {
    const ch = row.key.charAt(0).toUpperCase()
    const letter = /[A-Z]/.test(ch) ? ch : '#'
    const last = groups[groups.length - 1]
    if (last && last.letter === letter) last.rows.push(row)
    else groups.push({ letter, rows: [row] })
  }
  return groups
})
</script>

<style scoped>
.cp-az {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 0.9rem;
  margin-bottom: 1.5rem;
  font-family: var(--cp-serif);
  font-size: 1.05rem;
}
.cp-az a {
  color: var(--cp-text-muted);
  text-decoration: none;
}
.cp-az a:hover {
  color: var(--cp-accent-ink);
}

.cp-idx {
  display: grid;
  grid-template-columns: 2.5rem 1fr;
  gap: 1rem;
  padding: 0.75rem 0;
  border-top: 1px solid var(--cp-rule);
  scroll-margin-top: 1rem;
}
.cp-idx__letter {
  margin: 0;
  font-family: var(--cp-serif);
  font-weight: 500;
  font-size: 1.6rem;
  line-height: 1.2;
  color: var(--cp-accent-ink);
}
.cp-idx__list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.cp-idx__row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 14rem) 6rem;
  gap: 1rem;
  align-items: baseline;
  padding: 0.4rem 0;
  color: inherit;
  text-decoration: none;
}
.cp-idx__title {
  font-family: var(--cp-serif);
  font-size: 1.1rem;
  color: var(--cp-ink);
}
.cp-idx__row:hover .cp-idx__title {
  color: var(--cp-accent-ink);
}
.cp-idx__author {
  font-size: 0.85rem;
  color: var(--cp-text);
}
.cp-idx__coll {
  font-size: 0.75rem;
  color: var(--cp-text-muted);
  text-align: right;
}

@media (max-width: 640px) {
  .cp-idx {
    grid-template-columns: 1.75rem 1fr;
    gap: 0.6rem;
  }
  .cp-idx__row {
    grid-template-columns: 1fr;
    gap: 0.1rem;
    padding: 0.5rem 0;
  }
  .cp-idx__coll {
    text-align: left;
  }
}
</style>
