<!--
  Closing title card (lower third). Rendered automatically by SceneStage; animated by the
  caption beat in useSceneTimeline (addCaption). Scenes normally don't use this directly.
-->
<template>
  <!--
    Anything GSAP animates (data-part below) must NOT carry a Vue-bound `transform`: when the layout
    re-measures after mount, Vue would rewrite the attribute and clobber GSAP's from-state (the title
    flashes fully written, then the wipe replays). So layout-dependent transforms live on plain wrapper
    <g>s and the animated elements sit inside them, with no transform binding of their own.
  -->
  <g :transform="`translate(800 ${cy})`">
    <g data-part="caption" data-pivot>
      <g :transform="`scale(${CARD_SCALE})`">
        <!-- card -->
        <rect
          :x="-560 + 10"
          :y="-h / 2 + 14"
          width="1120"
          :height="h"
          rx="18"
          :fill="c('ink')"
          opacity="0.22"
        />
        <rect
          x="-560"
          :y="-h / 2"
          width="1120"
          :height="h"
          rx="18"
          :fill="c('paper')"
        />
        <rect
          x="-546"
          :y="-h / 2 + 14"
          width="1092"
          :height="h - 28"
          rx="10"
          fill="none"
          :stroke="c('paper-2')"
          stroke-width="3"
        />

        <!-- illuminated initial -->
        <g
          v-if="showInitial"
          data-part="caption-initial"
          data-pivot
          transform="translate(-470 0)"
        >
          <rect
            x="-118"
            y="-118"
            width="236"
            height="236"
            rx="12"
            :fill="c('ink')"
            opacity="0.18"
            transform="translate(6 8)"
          />
          <rect
            x="-118"
            y="-118"
            width="236"
            height="236"
            rx="12"
            :fill="c('gold')"
          />
          <rect
            x="-106"
            y="-106"
            width="212"
            height="212"
            rx="7"
            :fill="c('period')"
          />
          <rect
            x="-92"
            y="-92"
            width="184"
            height="184"
            rx="4"
            fill="none"
            :stroke="c('gold')"
            stroke-width="3"
            opacity="0.85"
          />
          <g
            :stroke="c('gold')"
            stroke-width="4"
            fill="none"
            stroke-linecap="round"
            opacity="0.75"
          >
            <path
              d="M -80 -44 C -80 -74 -62 -82 -46 -80 C -32 -78 -30 -62 -42 -60"
            />
            <path d="M 80 44 C 80 74 62 82 46 80 C 32 78 30 62 42 60" />
            <path d="M 44 -80 C 74 -80 82 -62 80 -46 C 78 -32 62 -30 60 -42" />
            <path d="M -44 80 C -74 80 -82 62 -80 46 C -78 32 -62 30 -60 42" />
          </g>
          <text
            data-part="caption-letter"
            x="0"
            y="66"
            text-anchor="middle"
            class="cp-serif"
            font-size="196"
            font-weight="600"
            :fill="c('highlight')"
            :stroke="c('gold')"
            stroke-width="4"
            paint-order="stroke"
            >{{ letter }}</text
          >
          <g :fill="c('gold')">
            <circle
              data-part="caption-flourish"
              data-pivot
              cx="0"
              cy="0"
              r="9"
              transform="translate(-118 -118)"
            />
            <circle
              data-part="caption-flourish"
              data-pivot
              cx="0"
              cy="0"
              r="9"
              transform="translate(118 -118)"
            />
            <circle
              data-part="caption-flourish"
              data-pivot
              cx="0"
              cy="0"
              r="9"
              transform="translate(118 118)"
            />
            <circle
              data-part="caption-flourish"
              data-pivot
              cx="0"
              cy="0"
              r="9"
              transform="translate(-118 118)"
            />
            <path
              data-part="caption-flourish"
              data-pivot
              d="M 0 -16 L 7 0 L 0 16 L -7 0 Z"
              transform="translate(0 -134)"
            />
            <path
              data-part="caption-flourish"
              data-pivot
              d="M 0 -16 L 7 0 L 0 16 L -7 0 Z"
              transform="translate(0 134)"
            />
          </g>
        </g>

        <!-- label + rule -->
        <text
          ref="labelEl"
          data-part="caption-label"
          :x="textX"
          :y="labelY"
          :text-anchor="anchor"
          class="cp-serif cp-caps"
          :font-size="LABEL_FS"
          font-weight="600"
          letter-spacing="5"
          :fill="c('period')"
          >{{ label }}</text
        >
        <g
          v-if="showInitial"
          :transform="`translate(${COL_R} ${labelY - LABEL_CAP / 2})`"
          :display="ruleStart < COL_R - 40 ? undefined : 'none'"
        >
          <g data-part="caption-rule" data-pivot>
            <line
              :x1="Math.min(ruleStart, COL_R - 41) - COL_R"
              x2="0"
              y1="0"
              y2="0"
              :stroke="c('gold')"
              stroke-width="3"
              stroke-linecap="round"
            />
            <circle cx="0" cy="0" r="6" :fill="c('gold')" />
          </g>
        </g>

        <!-- title, revealed by a wipe -->
        <!-- the wipe rect sits at its own origin and is only ever touched by GSAP (scaleX); the frame it clips in is placed by this Vue-owned translate -->
        <clipPath :id="clipId">
          <rect
            data-part="caption-wipe"
            data-pivot
            x="0"
            y="0"
            width="1100"
            :height="h + 40"
          />
        </clipPath>
        <g
          :transform="`translate(${wipeX} ${-h / 2 - 20})`"
          :clip-path="`url(#${clipId})`"
        >
          <g :transform="`translate(${-wipeX} ${h / 2 + 20})`">
            <text
              ref="titleEl"
              :x="textX"
              :text-anchor="anchor"
              class="cp-serif"
              :font-size="fs"
              font-weight="500"
              :fill="c('text')"
            >
              <tspan
                v-for="(ln, i) in lines"
                :key="i"
                :x="textX"
                :y="firstBaseline + i * lineStep"
                >{{ ln }}</tspan
              >
            </text>
          </g>
        </g>
      </g>
    </g>
  </g>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, useId } from 'vue'
import { c } from './util'

const props = withDefaults(
  defineProps<{
    title: string
    initial?: string
    label?: string
    showInitial?: boolean
  }>(),
  {
    initial: '',
    label: '',
    showInitial: true,
  }
)

const FONT = "Avenir, 'Avenir Next', Helvetica, Arial, sans-serif"
const clipId = `cp-cap-${useId()}`
const titleEl = ref<SVGTextElement | null>(null)
const labelEl = ref<SVGTextElement | null>(null)
const fit = ref(1)
const labelWidth = ref(props.label.length * 24)
/** false during SSR / hydration (so server and client markup agree); true once real glyph widths can be measured */
const measured = ref(false)
/** bumped when fonts finish loading so the wrap is recomputed with real glyph widths */
const fontTick = ref(0)

const letter = computed(() =>
  (
    props.initial ||
    props.title.replace(/^(the|a|an)\s+/i, '').charAt(0) ||
    '·'
  ).toUpperCase()
)

/* ---- layout (all in card units; the card is drawn at full size then scaled into a bottom band) ---- */
/** text column: left edge clear of the initial box, right edge clear of the inner border */
const COL_L = -318
const COL_R = 504
const avail = computed(() => (props.showInitial ? COL_R - COL_L : 940))
const textX = computed(() => (props.showInitial ? COL_L : 0))
const anchor = computed(() => (props.showInitial ? 'start' : 'middle'))
const wipeX = computed(() => (props.showInitial ? COL_L - 12 : -550))

const LABEL_FS = 27
const LABEL_CAP = LABEL_FS * 0.72
const LABEL_GAP = 28
const LEADING = 1.14
const CAP_H = 0.72
const PAD = 44
const MIN_H = 214

const DANGLERS = /^(the|a|an|of|and|in|on|to|for|or|is|&)$/i

let ctx: CanvasRenderingContext2D | null = null
/** width of `s` at 100px in the title font (estimated until a canvas is available) */
function w100(s: string) {
  if (!measured.value || typeof document === 'undefined') return s.length * 52
  ctx ??= document.createElement('canvas').getContext('2d')
  if (!ctx) return s.length * 52
  ctx.font = `500 100px ${FONT}`
  return ctx.measureText(s).width
}

/** best balanced split of `words` into n lines (minimise the widest line, then the raggedness) */
function split(words: string[], n: number) {
  const m = words.length
  const width = (a: number, b: number) => w100(words.slice(a, b).join(' '))
  let best: { cost: number; max: number; lines: string[] } | null = null
  const consider = (cuts: number[]) => {
    const edges = [0, ...cuts, m]
    const ws: number[] = []
    const lines: string[] = []
    for (let k = 0; k < edges.length - 1; k++) {
      if (edges[k + 1]! <= edges[k]!) return
      ws.push(width(edges[k]!, edges[k + 1]!))
      lines.push(words.slice(edges[k]!, edges[k + 1]!).join(' '))
    }
    const max = Math.max(...ws)
    // prefer a longer first line, and never strand a short function word at the end of a line
    let cost =
      max +
      0.35 * (max - Math.min(...ws)) +
      (ws[ws.length - 1]! > ws[0]! ? 40 : 0)
    for (let k = 0; k < edges.length - 2; k++)
      if (DANGLERS.test(words[edges[k + 1]! - 1]!)) cost += 600
    if (!best || cost < best.cost) best = { cost, max, lines }
  }
  if (n === 1) consider([])
  else if (n === 2) for (let i = 1; i < m; i++) consider([i])
  else
    for (let i = 1; i < m; i++) for (let j = i + 1; j < m; j++) consider([i, j])
  return best as { cost: number; max: number; lines: string[] } | null
}

const layout = computed(() => {
  void fontTick.value
  const t = props.title.trim().replace(/\s+/g, ' ')
  // a quoted phrase ("The Flea,") is one unbreakable unit
  const words = t.match(/["“][^"”]*["”]|\S+/g) ?? [t]
  const caps = [80, 60, 48]
  const minGood = [54, 44, 0]
  let pick: { lines: string[]; fs: number } | null = null
  for (let n = 1; n <= 3; n++) {
    if (n > words.length) break
    const sp = split(words, n)
    if (!sp) continue
    const fs = Math.min(caps[n - 1]!, (avail.value * 100) / sp.max)
    pick = { lines: sp.lines, fs }
    if (fs >= minGood[n - 1]!) break
  }
  return pick ?? { lines: [t], fs: 48 }
})
const lines = computed(() => layout.value.lines)
const fs = computed(() => Math.round(layout.value.fs * fit.value * 10) / 10)

/** content block: label cap-top → last baseline (+ a hint of descender), centred in the card */
const lineStep = computed(() => fs.value * LEADING)
const blockH = computed(
  () =>
    LABEL_CAP +
    LABEL_GAP +
    fs.value * CAP_H +
    (lines.value.length - 1) * lineStep.value +
    fs.value * 0.12
)
const h = computed(() => Math.max(MIN_H, Math.round(blockH.value + PAD * 2)))
const labelY = computed(() => -blockH.value / 2 + LABEL_CAP)
const firstBaseline = computed(
  () => labelY.value + LABEL_GAP + fs.value * CAP_H
)
const ruleStart = computed(() => textX.value + labelWidth.value + 30)

/** card is drawn at full size then scaled down into a bottom band so the scene stays visible */
const CARD_SCALE = 0.74
const cy = computed(() => 900 - 22 - (h.value * CARD_SCALE) / 2)

function measure() {
  const t = titleEl.value
  if (t) {
    const w = t.getBBox().width
    const cur = fit.value
    // getBBox reflects the current (already fitted) size; derive what it would be at fit = 1
    const natural = w / cur
    fit.value = natural > avail.value ? avail.value / natural : 1
  }
  if (labelEl.value) labelWidth.value = labelEl.value.getComputedTextLength()
}

onMounted(() => {
  measured.value = true
  fontTick.value++
  requestAnimationFrame(measure)
  document.fonts?.ready
    .then(() => {
      fontTick.value++
      requestAnimationFrame(measure)
    })
    .catch(() => {})
})
</script>

<style>
.cp-scene .cp-serif {
  font-family: Avenir, 'Avenir Next', Helvetica, Arial, sans-serif;
}
.cp-scene .cp-caps {
  text-transform: uppercase;
}
</style>
