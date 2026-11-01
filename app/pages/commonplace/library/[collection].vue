<template>
  <div class="cp-contents">
    <header class="cp-contents__head">
      <button
        v-if="coverCount > 1"
        type="button"
        class="cp-contents__figure cp-contents__coverbtn"
        aria-haspopup="dialog"
        :aria-label="`See all ${coverCount} covers`"
        @click="galleryOpen = true"
      >
        <CollectionCover
          :collection="collection"
          size="lg"
          class="cp-contents__cover"
        />
        <span class="cp-contents__covercount" aria-hidden="true"
          >{{ coverCount }} covers</span
        >
      </button>
      <CollectionCover
        v-else
        :collection="collection"
        size="lg"
        class="cp-contents__figure cp-contents__cover"
      />
      <CoverGallery
        v-if="coverCount > 1"
        v-model:open="galleryOpen"
        :collection="collection"
      />
      <div class="cp-contents__intro">
        <p class="cp-contents__eyebrow">
          {{
            [
              collection.kind === 'course' ? 'Course' : 'Personal reading',
              collection.term,
            ]
              .filter(Boolean)
              .join(' · ')
          }}
        </p>
        <h1 class="cp-contents__title">{{ collection.title }}</h1>
        <p class="cp-contents__sub">{{ collection.subtitle }}</p>
        <p v-if="collection.description" class="cp-contents__desc">
          {{ collection.description }}
        </p>
        <p class="cp-contents__count">
          {{ collection.entries.length }} works · {{ filledCount }} filled
          <NuxtLink
            v-if="collection.entries[0]"
            :to="readLink(collection.entries[0].id)"
            class="cp-contents__begin"
            >Begin reading <span aria-hidden="true">→</span></NuxtLink
          >
        </p>
      </div>
    </header>

    <section
      v-for="g in groups"
      :key="g.period.id"
      class="cp-period"
      :style="{ '--cp-period': `var(--cp-period-${g.period.id})` }"
      :aria-labelledby="`cp-p-${g.period.id}`"
    >
      <h2 :id="`cp-p-${g.period.id}`" class="cp-period__head">
        <span class="cp-period__label">{{ g.period.label }}</span>
        <span class="cp-period__range">{{ g.period.range }}</span>
      </h2>
      <ol class="cp-rows">
        <li v-for="row in g.rows" :key="row.entry.id">
          <NuxtLink :to="readLink(row.entry.id)" class="cp-row">
            <span class="cp-row__num">{{ row.n }}</span>
            <span class="cp-row__main">
              <span class="cp-row__title">{{ row.entry.title }}</span>
              <span class="cp-row__author">{{ row.entry.author }}</span>
            </span>
            <span class="cp-row__date">{{ row.entry.assigned }}</span>
            <span
              class="cp-row__status"
              :class="{ 'is-empty': !isFilled(row.entry) }"
            >
              <template v-if="isFilled(row.entry)">
                {{ row.entry.passages.length }}
                {{ row.entry.passages.length === 1 ? 'passage' : 'passages' }}
              </template>
              <template v-else>not yet filled</template>
            </span>
          </NuxtLink>
        </li>
      </ol>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { createError, definePageMeta, useHead, useRoute } from '#imports'
import {
  getCollection,
  isFilled,
  periods,
  type Entry,
  type Period,
} from '@/assets/data/commonplaceData'
import CollectionCover from '@/components/Commonplace/CollectionCover.vue'
import CoverGallery from '@/components/Commonplace/CoverGallery.vue'

definePageMeta({ layout: 'commonplace' })

const route = useRoute()
const found = getCollection(String(route.params.collection))
if (!found) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Collection not found',
    fatal: true,
  })
}
const collection = found
const coverCount = collection.covers?.length ?? 0
const galleryOpen = ref(false)

useHead({
  title: `${collection.title}: ${collection.subtitle} | Commonplace Book`,
})

const filledCount = computed(() => collection.entries.filter(isFilled).length)

const readLink = (id: string) =>
  `/commonplace/read/${id}?from=collection:${collection.id}`

/** Works grouped by period (chronological), collection order within each; numbers keep collection order. */
const groups = computed(() => {
  const map = new Map<
    string,
    { period: Period; rows: { entry: Entry; n: number }[] }
  >()
  collection.entries.forEach((entry, i) => {
    const period = periods[entry.period]
    if (!map.has(period.id)) map.set(period.id, { period, rows: [] })
    map.get(period.id)!.rows.push({ entry, n: i + 1 })
  })
  return [...map.values()].sort((a, b) => a.period.order - b.period.order)
})
</script>

<style scoped>
.cp-contents {
  width: 100%;
  max-width: 56rem;
  margin: 0 auto;
  padding: 2.5rem 1.5rem 4rem;
  box-sizing: border-box;
}

.cp-contents__head {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--cp-rule);
}
.cp-contents__figure {
  flex: none;
}
.cp-contents__coverbtn {
  position: relative;
  padding: 0;
  border: 0;
  background: none;
  cursor: zoom-in;
}
.cp-contents__coverbtn:focus-visible {
  outline: 2px solid var(--cp-focus);
  outline-offset: 3px;
}
/* quiet hint that there are more covers; always shown on touch screens */
.cp-contents__covercount {
  position: absolute;
  top: 0.4rem;
  right: 0.4rem;
  z-index: 2;
  padding: 0.15rem 0.45rem;
  border-radius: 999px;
  background: var(--cp-cover-scrim);
  color: var(--cp-cover-paper);
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.06em;
}
@media (hover: hover) {
  .cp-contents__covercount {
    opacity: 0;
    transition: opacity var(--cp-dur) ease;
  }
  .cp-contents__coverbtn:hover .cp-contents__covercount,
  .cp-contents__coverbtn:focus-visible .cp-contents__covercount {
    opacity: 1;
  }
}
.cp-contents__cover {
  box-shadow: var(--cp-shadow);
}
.cp-contents__intro {
  min-width: 0;
}

.cp-contents__eyebrow {
  margin: 0 0 0.5rem;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--cp-accent-ink);
}
.cp-contents__title {
  margin: 0;
  font-family: var(--cp-serif);
  font-weight: 500;
  font-size: clamp(2.2rem, 5vw, 3rem);
  line-height: 1.05;
  color: var(--cp-ink);
}
.cp-contents__sub {
  margin: 0.3rem 0 0;
  font-family: var(--cp-serif);
  font-style: italic;
  font-size: 1.25rem;
  color: var(--cp-ink);
}
.cp-contents__desc {
  margin: 1rem 0 0;
  max-width: 52ch;
  line-height: 1.6;
  color: var(--cp-text-muted);
}
.cp-contents__count {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.4rem 1.25rem;
  margin: 1rem 0 0;
  font-size: 0.8rem;
  color: var(--cp-text-muted);
}
.cp-contents__begin {
  font-weight: 600;
  color: var(--cp-accent-ink);
  text-decoration: none;
}
@media (hover: hover) {
  .cp-contents__begin:hover {
    text-decoration: underline;
    text-underline-offset: 3px;
  }
}

.cp-period {
  margin-top: 2.5rem;
}
.cp-period__head {
  display: flex;
  align-items: baseline;
  gap: 0.9rem;
  margin: 0 0 0.25rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--cp-period);
  font-weight: normal;
}
.cp-period__label {
  font-family: var(--cp-serif);
  font-size: 1.35rem;
  font-weight: 500;
  color: var(--cp-period);
}
.cp-period__range {
  font-size: 0.75rem;
  letter-spacing: 0.06em;
  color: var(--cp-text-muted);
}

.cp-rows {
  list-style: none;
  margin: 0;
  padding: 0;
}
.cp-row {
  display: grid;
  grid-template-columns: 2rem minmax(0, 1fr) 8.5rem 7rem;
  gap: 1rem;
  align-items: baseline;
  padding: 0.8rem 0.25rem;
  border-bottom: 1px solid var(--cp-rule);
  color: inherit;
  text-decoration: none;
  transition: background-color var(--cp-dur) ease;
}
@media (hover: hover) {
  .cp-row:hover {
    background: var(--cp-chip-bg);
  }
}
.cp-row__num {
  font-family: var(--cp-serif);
  font-size: 0.95rem;
  color: var(--cp-period);
  font-variant-numeric: oldstyle-nums;
}
.cp-row__main {
  display: grid;
  gap: 0.1rem;
  min-width: 0;
}
.cp-row__title {
  font-family: var(--cp-serif);
  font-size: 1.15rem;
  line-height: 1.3;
  color: var(--cp-ink);
}
@media (hover: hover) {
  .cp-row:hover .cp-row__title {
    color: var(--cp-accent-ink);
  }
}
.cp-row__author {
  font-size: 0.82rem;
  color: var(--cp-text-muted);
}
.cp-row__date {
  font-size: 0.78rem;
  color: var(--cp-text-muted);
}
.cp-row__status {
  font-size: 0.78rem;
  color: var(--cp-text);
  text-align: right;
}
.cp-row__status.is-empty {
  color: var(--cp-text-faint);
  font-style: italic;
}

@media (max-width: 640px) {
  .cp-contents {
    padding: 1.75rem 1rem 3rem;
  }
  .cp-contents__head {
    gap: 1.1rem;
  }
  .cp-contents__head :deep(.cp-cover--lg) {
    width: 6.5rem;
  }
  .cp-contents__head :deep(.cp-cover__kind),
  .cp-contents__head :deep(.cp-cover__title) {
    display: none;
  }
  .cp-row {
    grid-template-columns: 1.6rem minmax(0, 1fr);
    gap: 0.15rem 0.6rem;
  }
  .cp-row__date,
  .cp-row__status {
    grid-column: 2;
    text-align: left;
  }
  .cp-row__date:empty {
    display: none;
  }
}
</style>
