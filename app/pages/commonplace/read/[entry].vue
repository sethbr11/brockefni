<template>
  <div
    class="cp-reader"
    :style="{ '--cp-period': `var(--cp-period-${entry.period})` }"
  >
    <div class="cp-reader__stage">
      <div class="cp-reader__grid">
        <ReaderApparatus
          :entry="entry"
          :position="position"
          :source-label="sourceLabel"
          :facts="facts"
          :tag-chips="tagChips"
        />

        <!-- Passage & readings -->
        <article class="cp-page" :aria-label="`Passages from ${entry.title}`">
          <template v-if="entry.passages.length">
            <PassageViewer ref="viewer" :passages="entry.passages" />

            <section v-if="entry.summary" class="cp-page__section">
              <h2 class="cp-label cp-page__label">Summary</h2>
              <RichText :text="entry.summary" />
            </section>
            <section v-if="entry.commentary" class="cp-page__section">
              <h2 class="cp-label cp-page__label">Commentary</h2>
              <RichText :text="entry.commentary" />
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
              <h2 class="cp-label cp-page__label">Summary</h2>
              <RichText :text="entry.summary" />
            </section>
            <section v-if="entry.commentary" class="cp-page__section">
              <h2 class="cp-label cp-page__label">Commentary</h2>
              <RichText :text="entry.commentary" />
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

    <ReaderPager
      :prev="pagerPrev"
      :next="pagerNext"
      :back-to="backLink"
      :back-label="src.type === 'tag' ? 'Themes' : 'Contents'"
    />
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
import RichText from '@/components/Commonplace/RichText.vue'
import ReaderApparatus from '@/components/Commonplace/reader/ReaderApparatus.vue'
import ReaderPager from '@/components/Commonplace/reader/ReaderPager.vue'
import '@/components/Commonplace/reader/reader-shared.css'
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

const pagerLink = (e?: { id: string; title: string }) =>
  e && { title: e.title, to: readLink(e.id) }
const pagerPrev = computed(() => pagerLink(position.value.prev))
const pagerNext = computed(() => pagerLink(position.value.next))

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
  // an open dialog (device glossary) owns the keyboard; Esc closes it natively
  if (document.querySelector('dialog[open]')) return

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
.cp-page__label {
  margin-bottom: 0.85rem;
  font-size: 1.2rem;
  letter-spacing: 0.1em;
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

/* ── narrow or short (landscape phone): stack, let the shell scroll ── */
@media (max-width: 820px), (max-height: 540px) {
  /* Plain block flow when stacked. WebKit keeps stale grid-row heights inside
     these flex containers after a rotation, so rows overlap or leave blank gaps
     and the scroll length goes wrong; block layout always sizes from content. */
  .cp-reader {
    flex: 1 0 auto;
    display: block;
  }
  .cp-reader__stage {
    display: block;
    min-height: 60vh;
    min-height: 60svh;
  }
  .cp-reader__grid {
    display: block;
  }
  .cp-page {
    overflow: visible;
    padding: 1.75rem 1.1rem 2.5rem;
  }
  .cp-blank {
    min-height: 18rem;
  }
}
</style>
