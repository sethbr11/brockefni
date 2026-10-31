<!--
  Intro scene overlay. Mount inside a position:relative container; it covers it, plays the
  scene for `sceneId` (or the fallback), fades out and emits 'done'.
  Click anywhere / Esc / "Skip" finishes early; prefers-reduced-motion shows the final frame.
-->
<template>
  <div
    class="cp-scene cp-scene-overlay"
    :class="{ 'is-leaving': leaving }"
    :style="{ '--scene-period': `var(--scene-period-${period})` }"
    @click="skip"
  >
    <div class="cp-scene-frame">
      <div class="cp-scene-box">
        <div class="cp-scene-stage">
          <component
            :is="scene"
            :period="period"
            :title="title"
            :initial="letter"
          />
        </div>
        <div class="cp-scene-bar">
          <span class="cp-scene-sr">Opening scene: {{ title }}</span>
          <button type="button" class="cp-scene-skip" @click.stop="skip">
            Skip <span aria-hidden="true">›</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  defineAsyncComponent,
  inject,
  onBeforeUnmount,
  onMounted,
  provide,
  ref,
} from 'vue'
import type { gsap } from 'gsap'
import type { PeriodId } from '@/assets/data/commonplaceData'
import { sceneLoader } from './index'
import { SCENE_CONTROLLER, SCENE_DEBUG } from './kit/useSceneTimeline'
import './kit/scene-tokens.css'

const props = defineProps<{
  sceneId?: string
  period: PeriodId
  title: string
  initial?: string
}>()
const emit = defineEmits<{ (e: 'done'): void }>()

/** how long the finished frame (title card) stays up before fading */
const HOLD_MS = 650
const FADE_MS = 400
const REDUCED_HOLD_MS = 1200
/** if a scene never registers (load failure), give up after this */
const WATCHDOG_MS = 6000

const letter = computed(() =>
  (
    props.initial ||
    props.title.replace(/^(the|a|an)\s+/i, '').charAt(0) ||
    '·'
  ).toUpperCase()
)

const scene = defineAsyncComponent(sceneLoader(props.sceneId))
const debug = inject(SCENE_DEBUG, null)

const leaving = ref(false)
let tl: gsap.core.Timeline | null = null
let timers: ReturnType<typeof setTimeout>[] = []
const later = (ms: number, fn: () => void) => timers.push(setTimeout(fn, ms))
const clearTimers = () => {
  timers.forEach(clearTimeout)
  timers = []
}

function reducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  )
}

provide(SCENE_CONTROLLER, {
  title: props.title,
  initial: letter.value,
  period: props.period,
  register(t) {
    tl = t
    clearTimers()
    if (debug)
      (window as unknown as { __cpSceneTl?: gsap.core.Timeline }).__cpSceneTl =
        t
    if (debug?.seek != null) {
      t.pause(debug.seek)
      return
    }
    if (reducedMotion()) {
      t.progress(1)
      if (!debug?.hold) later(REDUCED_HOLD_MS, leave)
      return
    }
    t.eventCallback('onComplete', () => {
      if (!debug?.hold) later(HOLD_MS, leave)
    })
    t.play(0)
  },
})

function leave() {
  if (leaving.value) return
  clearTimers()
  leaving.value = true
  later(FADE_MS, () => emit('done'))
}

function skip() {
  if (leaving.value) return
  tl?.eventCallback('onComplete', null)
  tl?.progress(1).pause()
  leave()
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') skip()
}

onMounted(() => {
  window.addEventListener('keydown', onKey)
  if (!debug?.hold) later(WATCHDOG_MS, () => !tl && leave())
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  clearTimers()
})
</script>

<style>
.cp-scene-overlay {
  position: absolute;
  inset: 0;
  z-index: 40;
  background: var(--scene-scrim);
  cursor: pointer;
  opacity: 1;
  transition: opacity 0.4s ease;
  animation: cp-scene-in 0.25s ease-out both;
}
.cp-scene-overlay.is-leaving {
  opacity: 0;
  pointer-events: none;
}
@keyframes cp-scene-in {
  from {
    opacity: 0;
  }
}

/* viewport-tall box that sticks while the (possibly tall) container scrolls */
.cp-scene-frame {
  position: sticky;
  top: 0;
  height: min(100%, 100vh);
  height: min(100%, 100dvh);
  container-type: size;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cp-scene-box {
  width: min(960px, 100cqw - 32px, (100cqh - 76px) * 16 / 9);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cp-scene-stage {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 14px;
  overflow: hidden;
  background: var(--scene-paper);
  box-shadow:
    0 0 0 1px color-mix(in srgb, var(--scene-frame) 22%, transparent),
    0 18px 50px -18px color-mix(in srgb, var(--scene-frame) 55%, transparent);
}

.cp-scene-bar {
  display: flex;
  justify-content: flex-end;
}

.cp-scene-skip {
  font:
    600 13px/1 system-ui,
    -apple-system,
    'Segoe UI',
    sans-serif;
  letter-spacing: 0.04em;
  padding: 8px 14px;
  border: 0;
  border-radius: 999px;
  background: var(--scene-ui);
  color: var(--scene-ui-text);
  cursor: pointer;
  opacity: 0.75;
  transition: opacity 0.15s ease;
}
.cp-scene-skip:hover,
.cp-scene-skip:focus-visible {
  opacity: 1;
}
.cp-scene-skip:focus-visible {
  outline: 2px solid var(--scene-gold);
  outline-offset: 2px;
}

.cp-scene-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

@media (prefers-reduced-motion: reduce) {
  .cp-scene-overlay {
    animation: none;
  }
}
</style>
