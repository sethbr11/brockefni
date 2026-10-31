<template>
  <div
    class="cp-reader"
    :style="{ '--cp-period': `var(--cp-period-${entry.period})` }"
  >
    <div class="cp-reader__stage">
      <div class="cp-reader__grid">
        <!-- Apparatus -->
        <aside class="cp-app" aria-label="About this work">
          <p class="cp-app__pos">
            No. {{ position.index + 1 }} of {{ position.total }} ·
            {{ sourceLabel }}
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

        <!-- Passage & readings -->
        <article class="cp-page" :aria-label="`Passages from ${entry.title}`">
          <template v-if="entry.passages.length">
            <PassageViewer ref="viewer" :passages="entry.passages" />

            <section v-if="entry.summary" class="cp-page__section">
              <h2 class="cp-label">Summary</h2>
              <p class="cp-page__prose">{{ entry.summary }}</p>
            </section>
            <section v-if="entry.commentary" class="cp-page__section">
              <h2 class="cp-label">Commentary</h2>
              <p class="cp-page__prose">{{ entry.commentary }}</p>
            </section>
            <p
              v-if="!entry.summary && !entry.commentary"
              class="cp-page__tocome"
            >
              Summary and commentary to come.
            </p>
          </template>

          <div v-else class="cp-blank">
            <IlluminatedInitial
              :letter="initial"
              tone="var(--cp-period)"
              size="5.5rem"
              faint
            />
            <p class="cp-blank__title">Passage not yet transcribed</p>
            <p class="cp-blank__sub">This leaf of the book is still blank.</p>

            <section v-if="entry.summary" class="cp-page__section">
              <h2 class="cp-label">Summary</h2>
              <p class="cp-page__prose">{{ entry.summary }}</p>
            </section>
            <section v-if="entry.commentary" class="cp-page__section">
              <h2 class="cp-label">Commentary</h2>
              <p class="cp-page__prose">{{ entry.commentary }}</p>
            </section>
          </div>
        </article>
      </div>

      <SceneOverlay
        v-if="sceneKey"
        :key="sceneKey"
        :scene-id="entry.scene"
        :period="entry.period"
        :title="entry.title"
        :initial="initial"
        @done="sceneKey = ''"
      />
    </div>

    <nav class="cp-pager" aria-label="Works">
      <NuxtLink
        v-if="position.prev"
        :to="readLink(position.prev.id)"
        class="cp-pager__btn cp-pager__btn--prev"
        rel="prev"
      >
        <span class="cp-pager__dir"
          ><span aria-hidden="true">←</span> Previous</span
        >
        <span class="cp-pager__title">{{ position.prev.title }}</span>
      </NuxtLink>
      <span v-else class="cp-pager__spacer" />

      <NuxtLink :to="backLink" class="cp-pager__back">
        <span>{{ src.type === 'tag' ? 'Themes' : 'Contents' }}</span>
        <kbd class="cp-pager__kbd">Esc</kbd>
      </NuxtLink>

      <NuxtLink
        v-if="position.next"
        :to="readLink(position.next.id)"
        class="cp-pager__btn cp-pager__btn--next"
        rel="next"
      >
        <span class="cp-pager__dir"
          >Next <span aria-hidden="true">→</span></span
        >
        <span class="cp-pager__title">{{ position.next.title }}</span>
      </NuxtLink>
      <span v-else class="cp-pager__spacer" />
    </nav>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import {
  createError,
  definePageMeta,
  navigateTo,
  useHead,
  useRoute,
} from '#imports'
import {
  entryTags,
  formatFrom,
  getCollection,
  getEntriesByTag,
  getEntry,
  getNeighbors,
  getSequence,
  getTheme,
  parseFrom,
  periods,
  type SequenceSource,
} from '@/assets/data/commonplaceData'
import IlluminatedInitial from '@/components/Commonplace/IlluminatedInitial.vue'
import PassageViewer from '@/components/Commonplace/PassageViewer.vue'
import SceneOverlay from '@/components/Commonplace/scenes/SceneOverlay.vue'
import {
  useScenePref,
  useSceneReplay,
} from '@/components/Commonplace/useScenePref'

definePageMeta({ layout: 'commonplace' })

const route = useRoute()

const found = computed(() => getEntry(String(route.params.entry)))
if (!found.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Work not found',
    fatal: true,
  })
}
const entry = computed(() => found.value!.entry)
const collection = computed(() => found.value!.collection)
const initial = computed(
  () =>
    entry.value.title.replace(/^[^\p{L}]+/u, '').charAt(0) ||
    entry.value.title.charAt(0)
)

/** Sequence source from ?from=, falling back to the entry's own collection when absent or not applicable. */
const src = computed<SequenceSource>(() => {
  const parsed = parseFrom(
    typeof route.query.from === 'string' ? route.query.from : undefined
  )
  if (parsed && getSequence(parsed).some((e) => e.id === entry.value.id))
    return parsed
  return { type: 'collection', id: collection.value.id }
})

const position = computed(() => getNeighbors(entry.value.id, src.value))

const sourceLabel = computed(() =>
  src.value.type === 'tag'
    ? (getTheme(src.value.id)?.label ?? src.value.id)
    : (getCollection(src.value.id)?.title ?? collection.value.title)
)

const readLink = (id: string) =>
  `/commonplace/read/${id}?from=${formatFrom(src.value)}`
const backLink = computed(() =>
  src.value.type === 'tag'
    ? '/commonplace/library?view=themes'
    : `/commonplace/library/${src.value.id}`
)

const facts = computed(() =>
  [
    { label: 'Period', value: periods[entry.value.period]?.label },
    { label: 'Composed', value: entry.value.composed },
    { label: 'Language', value: entry.value.language },
    { label: 'Assigned', value: entry.value.assigned },
  ].filter((f): f is { label: string; value: string } => !!f.value)
)

const tagChips = computed(() =>
  entryTags(entry.value).map((id) => {
    const first = getEntriesByTag(id)[0]
    return {
      id,
      label: getTheme(id)?.label ?? id,
      to: first
        ? `/commonplace/read/${first.id}?from=tag:${id}`
        : '/commonplace/library?view=themes',
    }
  })
)

useHead({ title: computed(() => `${entry.value.title} | Commonplace Book`) })

/* ── intro scene ── */
const scenes = useScenePref()
const replay = useSceneReplay()
const sceneKey = ref('')
let plays = 0

function playScene() {
  plays += 1
  sceneKey.value = `${entry.value.id}-${plays}`
}

watch(
  () => entry.value.id,
  () => {
    sceneKey.value = ''
    if (scenes.enabled.value) playScene()
  }
)
watch(replay, () => playScene())

/* ── keyboard ── */
const viewer = ref<InstanceType<typeof PassageViewer> | null>(null)

function onKey(e: KeyboardEvent) {
  if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey) return
  const t = e.target as HTMLElement | null
  if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)))
    return

  if (e.key === 'Escape') {
    e.preventDefault()
    if (sceneKey.value) sceneKey.value = ''
    else navigateTo(backLink.value)
  } else if (e.key === 'ArrowLeft' && position.value.prev) {
    e.preventDefault()
    navigateTo(readLink(position.value.prev.id))
  } else if (e.key === 'ArrowRight' && position.value.next) {
    e.preventDefault()
    navigateTo(readLink(position.value.next.id))
  } else if (e.key === '[') {
    viewer.value?.prev()
  } else if (e.key === ']') {
    viewer.value?.next()
  }
}

onMounted(() => {
  scenes.load()
  if (scenes.enabled.value) playScene()
  window.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<style scoped>
.cp-reader {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.cp-reader__stage {
  position: relative;
  flex: 1;
  min-height: 0;
  display: flex;
}

.cp-reader__grid {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(16rem, 22rem) minmax(0, 1fr);
  width: 100%;
  max-width: 78rem;
  margin: 0 auto;
}

/* ── apparatus ── */
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

.cp-label {
  margin: 0 0 0.55rem;
  font-family: var(--cp-sans);
  font-size: 0.9rem;
  font-weight: 600;
  font-variant-caps: all-small-caps;
  letter-spacing: 0.12em;
  color: var(--cp-period);
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

/* ── page ── */
.cp-page {
  min-height: 0;
  overflow-y: auto;
  padding: 2.5rem clamp(1.5rem, 5vw, 4.5rem) 2.5rem;
}

.cp-page__section {
  margin-top: 2.25rem;
  max-width: 62ch;
}
.cp-page__prose {
  margin: 0;
  font-family: var(--cp-serif);
  font-size: 1.12rem;
  line-height: 1.65;
  color: var(--cp-ink);
  white-space: pre-line;
}
.cp-page__tocome {
  margin: 2.25rem 0 0;
  font-family: var(--cp-serif);
  font-style: italic;
  color: var(--cp-text-faint);
}

.cp-blank {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem 0;
  box-sizing: border-box;
}
.cp-blank__title {
  margin: 1.5rem 0 0.3rem;
  font-family: var(--cp-serif);
  font-size: 1.45rem;
  color: var(--cp-ink);
}
.cp-blank__sub {
  margin: 0;
  font-family: var(--cp-serif);
  font-style: italic;
  color: var(--cp-text-muted);
}
.cp-blank .cp-page__section {
  text-align: left;
}

/* ── pager ── */
.cp-pager {
  flex: none;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 1rem;
  padding: 0.6rem 1.25rem;
  border-top: 1px solid var(--cp-rule);
  background: var(--cp-bg);
}
.cp-pager__btn {
  display: grid;
  gap: 0.1rem;
  min-width: 0;
  padding: 0.35rem 0.6rem;
  border-radius: 4px;
  color: inherit;
  text-decoration: none;
  transition: background-color var(--cp-dur) ease;
}
.cp-pager__btn:hover {
  background: var(--cp-chip-bg);
}
.cp-pager__btn--prev {
  justify-self: start;
  text-align: left;
}
.cp-pager__btn--next {
  justify-self: end;
  text-align: right;
}
.cp-pager__dir {
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--cp-text-muted);
}
.cp-pager__title {
  font-family: var(--cp-serif);
  font-size: 1rem;
  color: var(--cp-ink);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 28ch;
}
.cp-pager__btn:hover .cp-pager__title {
  color: var(--cp-accent-ink);
}

.cp-pager__back {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.78rem;
  color: var(--cp-text-muted);
  text-decoration: none;
}
.cp-pager__back:hover {
  color: var(--cp-accent-ink);
}
.cp-pager__kbd {
  font-family: var(--cp-sans);
  font-size: 0.65rem;
  padding: 0.05rem 0.35rem;
  border: 1px solid var(--cp-rule-strong);
  border-radius: 3px;
  color: var(--cp-text-faint);
}

/* ── narrow: stack, let the shell scroll ── */
@media (max-width: 820px) {
  .cp-reader__stage {
    flex: none;
    min-height: 60vh;
  }
  .cp-reader__grid {
    grid-template-columns: 1fr;
  }
  .cp-app,
  .cp-page {
    overflow: visible;
  }
  .cp-app {
    padding: 1.75rem 1.1rem 1.25rem;
    border-right: 0;
    border-bottom: 1px solid var(--cp-rule);
  }
  .cp-page {
    padding: 1.75rem 1.1rem 2.5rem;
  }
  .cp-blank {
    min-height: 18rem;
  }
  .cp-pager {
    position: sticky;
    bottom: 0;
    padding: 0.5rem 0.75rem;
    gap: 0.5rem;
  }
  .cp-pager__title {
    max-width: 14ch;
    font-size: 0.92rem;
  }
  .cp-pager__kbd {
    display: none;
  }
}
</style>
