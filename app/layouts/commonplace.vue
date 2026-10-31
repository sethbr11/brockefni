<template>
  <div class="cp-root cp-shell">
    <header class="cp-bar">
      <div class="cp-bar__left">
        <NuxtLink
          :to="back.to"
          class="cp-bar__exit"
          :aria-label="`Back to ${back.label}`"
        >
          <span aria-hidden="true">←</span
          ><span class="cp-bar__exit-label">{{ back.label }}</span>
        </NuxtLink>
        <nav class="cp-crumbs" aria-label="Breadcrumb">
          <ol>
            <li v-for="(c, i) in crumbs" :key="i">
              <NuxtLink v-if="c.to && i < crumbs.length - 1" :to="c.to">{{
                c.label
              }}</NuxtLink>
              <span v-else aria-current="page">{{ c.label }}</span>
            </li>
          </ol>
        </nav>
      </div>

      <div class="cp-bar__right">
        <button
          v-if="isReader"
          type="button"
          class="cp-bar__btn cp-bar__btn--icon"
          aria-label="Replay intro scene"
          title="Replay intro scene"
          @click="replay++"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path
              d="M4 12a8 8 0 1 0 2.6-5.9M4 4v4h4"
              fill="none"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <button
          type="button"
          class="cp-bar__btn"
          :aria-pressed="scenes.enabled.value"
          title="Play an intro scene when opening a work"
          @click="scenes.toggle()"
        >
          <span
            class="cp-bar__dot"
            :class="{ 'is-on': scenes.enabled.value }"
            aria-hidden="true"
          />
          Scenes<span class="cp-bar__state"
            >&nbsp;{{ scenes.enabled.value ? 'on' : 'off' }}</span
          >
        </button>
        <div class="cp-bar__theme"><DarkModeSwitch /></div>
      </div>
    </header>

    <main class="cp-main">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from '#app'
import DarkModeSwitch from '@/components/DarkModeSwitch.vue'
import {
  useScenePref,
  useSceneReplay,
} from '@/components/Commonplace/useScenePref'
import {
  getCollection,
  getEntry,
  getTheme,
  parseFrom,
} from '@/assets/data/commonplaceData'
import '@/components/Commonplace/commonplace-tokens.css'

const route = useRoute()
const scenes = useScenePref()
const replay = useSceneReplay()

const isReader = computed(() =>
  String(route.name ?? '').startsWith('commonplace-read')
)

type Crumb = { label: string; to?: string }
const crumbs = computed<Crumb[]>(() => {
  const out: Crumb[] = [{ label: 'Library', to: '/commonplace/library' }]
  const name = String(route.name ?? '')
  if (name === 'commonplace-library-collection') {
    const c = getCollection(String(route.params.collection))
    if (c) out.push({ label: c.title })
  } else if (isReader.value) {
    const found = getEntry(String(route.params.entry))
    if (!found) return out
    const src = parseFrom(
      typeof route.query.from === 'string' ? route.query.from : undefined
    )
    if (src?.type === 'tag') {
      out.push({
        label: getTheme(src.id)?.label ?? src.id,
        to: '/commonplace/library?view=themes',
      })
    } else {
      const c = (src && getCollection(src.id)) || found.collection
      out.push({ label: c.title, to: `/commonplace/library/${c.id}` })
    }
    out.push({ label: found.entry.title })
  }
  return out
})

/** one level up: work → its contents (or themes), contents → library, library → landing */
const back = computed<{ label: string; to: string }>(() => {
  const parent = crumbs.value[crumbs.value.length - 2]
  if (parent?.to) return { label: parent.label, to: parent.to }
  return { label: 'Commonplace', to: '/commonplace' }
})
</script>

<style scoped>
.cp-shell {
  height: 100vh;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  background: var(--cp-bg);
  color: var(--cp-text);
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}

.cp-bar {
  flex: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  height: 52px;
  padding: 0 1.25rem;
  border-bottom: 1px solid var(--cp-rule);
  background: var(--cp-bg);
  font-size: 0.82rem;
}

.cp-bar__left,
.cp-bar__right {
  display: flex;
  align-items: center;
  min-width: 0;
}
.cp-bar__left {
  gap: 1rem;
  flex: 1;
}
.cp-bar__right {
  gap: 0.5rem;
  flex: none;
}

.cp-bar__exit {
  display: inline-flex;
  gap: 0.4rem;
  color: var(--cp-text-muted);
  text-decoration: none;
  font-weight: 600;
  letter-spacing: 0.02em;
  padding-right: 1rem;
  border-right: 1px solid var(--cp-rule);
  white-space: nowrap;
}
.cp-bar__exit:hover {
  color: var(--cp-accent-ink);
}

.cp-crumbs {
  min-width: 0;
}
.cp-crumbs ol {
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  min-width: 0;
}
.cp-crumbs li {
  display: flex;
  align-items: center;
  min-width: 0;
  white-space: nowrap;
  color: var(--cp-text-muted);
}
.cp-crumbs li + li::before {
  content: '/';
  margin: 0 0.55rem;
  color: var(--cp-text-faint);
}
.cp-crumbs li:last-child {
  flex: 1 1 auto;
  min-width: 0;
}
.cp-crumbs li:last-child span {
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--cp-text);
}
.cp-crumbs a {
  color: var(--cp-text-muted);
  text-decoration: none;
}
.cp-crumbs a:hover {
  color: var(--cp-accent-ink);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.cp-bar__btn {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  height: 32px;
  padding: 0 0.75rem;
  border: 1px solid var(--cp-rule-strong);
  border-radius: 999px;
  background: transparent;
  color: var(--cp-text);
  font: inherit;
  font-size: 0.78rem;
  cursor: pointer;
  transition:
    border-color var(--cp-dur) ease,
    color var(--cp-dur) ease;
}
.cp-bar__btn:hover {
  border-color: var(--cp-accent);
  color: var(--cp-accent-ink);
}
.cp-bar__btn--icon {
  width: 32px;
  padding: 0;
  justify-content: center;
}

.cp-bar__dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  border: 1px solid var(--cp-text-faint);
}
.cp-bar__dot.is-on {
  background: var(--cp-accent);
  border-color: var(--cp-accent);
}
.cp-bar__state {
  color: var(--cp-text-muted);
}

/* DarkModeSwitch is 50px; size it to the bar without editing the component */
.cp-bar__theme :deep(#theme-switch) {
  width: 32px;
  height: 32px;
  border-width: 1px;
  box-shadow: none;
}
.cp-bar__theme :deep(svg) {
  width: 16px;
  height: 16px;
}

.cp-main {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
}

@media (max-width: 640px) {
  .cp-bar {
    padding: 0 0.75rem;
    gap: 0.5rem;
  }
  .cp-bar__left {
    gap: 0.6rem;
  }
  .cp-bar__exit {
    padding-right: 0.6rem;
  }
  .cp-bar__exit-label {
    display: none;
  }
  .cp-bar__state {
    display: none;
  }
  .cp-bar__btn {
    padding: 0 0.6rem;
  }
  .cp-bar__btn--icon {
    padding: 0;
  }
  /* keep only the current page on narrow screens */
  .cp-crumbs li:not(:last-child) {
    display: none;
  }
  .cp-crumbs li + li::before {
    display: none;
  }
}
</style>
