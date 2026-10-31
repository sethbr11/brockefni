<template>
  <div class="cp-lib">
    <header class="cp-lib__head">
      <h1 class="cp-lib__title">Library</h1>
      <div class="cp-seg" role="tablist" aria-label="Browse the library by">
        <button
          v-for="v in views"
          :id="`cp-tab-${v.id}`"
          :key="v.id"
          type="button"
          role="tab"
          class="cp-seg__btn"
          :aria-selected="view === v.id"
          :aria-controls="`cp-panel-${v.id}`"
          :tabindex="view === v.id ? 0 : -1"
          @click="setView(v.id)"
          @keydown.right.prevent="step(1)"
          @keydown.left.prevent="step(-1)"
        >
          {{ v.label }}
        </button>
      </div>
    </header>

    <!-- Collections -->
    <section
      v-if="view === 'collections'"
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

    <!-- Themes -->
    <section
      v-else-if="view === 'themes'"
      id="cp-panel-themes"
      role="tabpanel"
      aria-labelledby="cp-tab-themes"
      class="cp-lib__panel"
    >
      <ul v-if="themeRows.length" class="cp-list">
        <li v-for="t in themeRows" :key="t.theme.id">
          <component
            :is="t.first ? NuxtLink : 'div'"
            :to="
              t.first
                ? `/commonplace/read/${t.first.id}?from=tag:${t.theme.id}`
                : undefined
            "
            class="cp-list__row"
            :class="{ 'is-empty': !t.first }"
          >
            <span class="cp-list__main">
              <span class="cp-list__title">{{ t.theme.label }}</span>
              <span v-if="t.theme.description" class="cp-list__desc">{{
                t.theme.description
              }}</span>
            </span>
            <span class="cp-list__count"
              >{{ t.count }} {{ t.count === 1 ? 'work' : 'works' }}</span
            >
          </component>
        </li>
      </ul>
      <div v-else class="cp-empty">
        <IlluminatedInitial letter="T" size="3.25rem" faint />
        <h2 class="cp-empty__title">No headings yet</h2>
        <p>
          Themes are the commonplace headings, the <em>loci communes</em> under
          which passages are gathered: love, kingship, the fall, fortune. Once
          headings exist, every work and passage filed under one can be read in
          sequence here.
        </p>
        <p class="cp-empty__hint">
          Add themes to <code>themes</code> in
          <code>app/assets/data/commonplaceData.ts</code>, then reference their
          ids in an entry's or passage's <code>tags</code>.
        </p>
      </div>
    </section>

    <!-- Index -->
    <section
      v-else
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
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { definePageMeta, useHead, useRoute, useRouter } from '#imports'
import { NuxtLink } from '#components'
import {
  collections,
  themes,
  isFilled,
  getEntriesByTag,
  type Collection,
  type Entry,
} from '@/assets/data/commonplaceData'
import CollectionCover from '@/components/Commonplace/CollectionCover.vue'
import IlluminatedInitial from '@/components/Commonplace/IlluminatedInitial.vue'

definePageMeta({ layout: 'commonplace' })
useHead({ title: 'Library | Commonplace Book' })

type View = 'collections' | 'themes' | 'index'
const views: { id: View; label: string }[] = [
  { id: 'collections', label: 'Collections' },
  { id: 'themes', label: 'Themes' },
  { id: 'index', label: 'Index' },
]

const route = useRoute()
const router = useRouter()

const view = computed<View>(() => {
  const q = route.query.view
  return q === 'themes' || q === 'index' ? q : 'collections'
})

function setView(v: View) {
  router.replace({
    query: { ...route.query, view: v === 'collections' ? undefined : v },
  })
}

function step(d: number) {
  const i = views.findIndex((v) => v.id === view.value)
  const next = views[(i + d + views.length) % views.length]!
  setView(next.id)
  requestAnimationFrame(() =>
    document.getElementById(`cp-tab-${next.id}`)?.focus()
  )
}

const themeRows = computed(() =>
  themes.map((theme) => {
    const list = getEntriesByTag(theme.id)
    return { theme, count: list.length, first: list[0] }
  })
)

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
.cp-lib {
  width: 100%;
  max-width: 64rem;
  margin: 0 auto;
  padding: 2.5rem 1.5rem 4rem;
  box-sizing: border-box;
}

.cp-lib__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid var(--cp-rule);
  margin-bottom: 2rem;
}

.cp-lib__title {
  margin: 0;
  font-family: var(--cp-serif);
  font-weight: 500;
  font-size: clamp(2.2rem, 5vw, 3rem);
  line-height: 1;
  color: var(--cp-ink);
}

/* segmented control */
.cp-seg {
  display: inline-flex;
  padding: 3px;
  border-radius: 999px;
  background: var(--cp-control-bg);
}
.cp-seg__btn {
  border: 0;
  background: transparent;
  color: var(--cp-text-muted);
  font: inherit;
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  padding: 0.45rem 1rem;
  border-radius: 999px;
  cursor: pointer;
  transition:
    background-color var(--cp-dur) ease,
    color var(--cp-dur) ease,
    box-shadow var(--cp-dur) ease;
}
.cp-seg__btn:hover {
  color: var(--cp-text);
}
.cp-seg__btn[aria-selected='true'] {
  background: var(--cp-control-active);
  color: var(--cp-text);
  box-shadow: var(--cp-shadow);
}

/* collections */
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
.cp-card:hover :deep(.cp-cover) {
  transform: translateY(-3px);
  box-shadow: var(--cp-shadow-lift);
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
.cp-card:hover .cp-card__title {
  color: var(--cp-accent-ink);
}
.cp-card__sub {
  font-size: 0.9rem;
}
.cp-card__meta {
  font-size: 0.76rem;
  color: var(--cp-text-muted);
}

/* themes */
.cp-list {
  list-style: none;
  margin: 0;
  padding: 0;
  border-top: 1px solid var(--cp-rule);
}
.cp-list__row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.9rem 0.25rem;
  border-bottom: 1px solid var(--cp-rule);
  color: inherit;
  text-decoration: none;
}
a.cp-list__row:hover .cp-list__title {
  color: var(--cp-accent-ink);
}
.cp-list__row.is-empty {
  opacity: 0.6;
}
.cp-list__main {
  display: grid;
  gap: 0.2rem;
}
.cp-list__title {
  font-family: var(--cp-serif);
  font-size: 1.2rem;
  color: var(--cp-ink);
}
.cp-list__desc {
  font-size: 0.85rem;
  color: var(--cp-text-muted);
}
.cp-list__count {
  font-size: 0.78rem;
  color: var(--cp-text-muted);
  white-space: nowrap;
}

.cp-empty {
  max-width: 34rem;
  margin: 2rem auto;
  text-align: center;
  color: var(--cp-text-muted);
}
.cp-empty__title {
  margin: 1.1rem 0 0.6rem;
  font-family: var(--cp-serif);
  font-weight: 500;
  font-size: 1.5rem;
  color: var(--cp-ink);
}
.cp-empty p {
  margin: 0 0 0.8rem;
  line-height: 1.6;
  font-size: 0.95rem;
}
.cp-empty__hint {
  font-size: 0.82rem !important;
}
.cp-empty code {
  font-size: 0.85em;
  padding: 0.05rem 0.3rem;
  border-radius: 3px;
  background: var(--cp-chip-bg);
  color: var(--cp-text);
}

/* index */
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
  .cp-lib {
    padding: 1.75rem 1rem 3rem;
  }
  .cp-shelf {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.5rem 1rem;
  }
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
