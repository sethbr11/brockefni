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

    <LibraryCollections v-if="view === 'collections'" />
    <LibraryThemes v-else-if="view === 'themes'" />
    <LibraryIndex v-else />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { definePageMeta, useHead, useRoute, useRouter } from '#imports'
import LibraryCollections from '@/components/Commonplace/library/LibraryCollections.vue'
import LibraryIndex from '@/components/Commonplace/library/LibraryIndex.vue'
import LibraryThemes from '@/components/Commonplace/library/LibraryThemes.vue'

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
@media (hover: hover) {
  .cp-seg__btn:hover {
    color: var(--cp-text);
  }
}
.cp-seg__btn[aria-selected='true'] {
  background: var(--cp-control-active);
  color: var(--cp-text);
  box-shadow: var(--cp-shadow);
}

@media (max-width: 640px) {
  .cp-lib {
    padding: 1.75rem 1rem 3rem;
  }
}
</style>
