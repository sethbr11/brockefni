<!--
  Fallback intro for works without a dedicated scene: a period-tinted manuscript page, an
  illuminated initial that draws itself, a quill writing a few lines, then the title card.
-->
<template>
  <SceneStage
    :build="build"
    :caption-initial="false"
    :caption-at="2.35"
    :caption-dim="0.1"
  >
    <Backdrop variant="parchment" />

    <!-- illuminated initial -->
    <g transform="translate(350 376)">
      <path
        data-part="vine"
        pathLength="1"
        d="M -150 170 C -190 230 -150 290 -190 360 C -210 400 -170 420 -150 400"
        fill="none"
        :stroke="c('period')"
        stroke-width="7"
        stroke-linecap="round"
      />
      <g data-part="box-bg" data-pivot>
        <rect
          x="-165"
          y="-165"
          width="330"
          height="330"
          rx="10"
          :fill="c('period')"
        />
      </g>
      <path
        data-part="frame"
        pathLength="1"
        d="M -165 -165 L 165 -165 L 165 165 L -165 165 Z"
        fill="none"
        :stroke="c('gold')"
        stroke-width="14"
        stroke-linejoin="round"
      />
      <path
        data-part="frame"
        pathLength="1"
        d="M -143 -143 L 143 -143 L 143 143 L -143 143 Z"
        fill="none"
        :stroke="c('gold')"
        stroke-width="3"
      />
      <g
        :stroke="c('gold')"
        stroke-width="5"
        fill="none"
        stroke-linecap="round"
      >
        <path
          v-for="(d, i) in curls"
          :key="i"
          data-part="curl"
          pathLength="1"
          :d="d"
          opacity="0.8"
        />
      </g>
      <text
        data-part="letter"
        x="0"
        y="100"
        text-anchor="middle"
        class="cp-serif"
        font-size="300"
        font-weight="600"
        :fill="c('highlight')"
        :stroke="c('gold')"
        stroke-width="5"
        paint-order="stroke"
        >{{ initial || title.charAt(0) }}</text
      >
      <g :fill="c('gold')">
        <circle
          v-for="(p, i) in dots"
          :key="i"
          data-part="dot"
          data-pivot
          r="11"
          :transform="`translate(${p[0]} ${p[1]})`"
        />
      </g>
    </g>

    <!-- script -->
    <g fill="none" stroke-linecap="square" stroke-linejoin="miter">
      <path
        v-for="(ln, i) in lines"
        :key="i"
        :data-part="`line-${i}`"
        pathLength="1"
        :d="ln.d"
        :stroke="c(i === 0 ? 'period' : 'paper-ink')"
        :stroke-width="i === 0 ? 5 : 4"
        :opacity="i === 0 ? 1 : 0.85"
      />
    </g>

    <Quill part="quill" :x="1700" :y="120" :scale="0.9" />
  </SceneStage>
</template>

<script setup lang="ts">
import type { PeriodId } from '@/assets/data/commonplaceData'
import { Backdrop, Quill, SceneStage, c, type SceneApi } from './kit'
import { hashString, rng } from './kit/util'

const props = defineProps<{
  period: PeriodId
  title: string
  initial?: string
}>()

const curls = [
  'M -120 -60 C -120 -110 -90 -122 -66 -118 C -44 -114 -42 -88 -62 -86',
  'M 120 60 C 120 110 90 122 66 118 C 44 114 42 88 62 86',
  'M 60 -120 C 110 -120 122 -90 118 -66 C 114 -44 88 -42 86 -62',
  'M -60 120 C -110 120 -122 90 -118 66 C -114 44 -88 42 -86 62',
]
const dots = [
  [-165, -165],
  [165, -165],
  [165, 165],
  [-165, 165],
  [0, -190],
  [-190, 0],
]

/** handwriting-ish scribble lines, stable per title */
const LINE_X0 = 600
const LINE_X1 = 1400
const LINE_Y = [260, 340, 420, 500]
const rand = rng(hashString(props.title))
const lines = LINE_Y.map((y, li) => {
  const end = li === LINE_Y.length - 1 ? LINE_X1 - 260 : LINE_X1 - rand() * 60
  // textura-ish minims: little "n" strokes with the odd ascender / descender
  let x = LINE_X0
  let d = ''
  while (x < end - 40) {
    const letters = 2 + Math.floor(rand() * 6)
    for (let k = 0; k < letters && x < end; k++) {
      const r = rand()
      const up = r < 0.14 ? 40 : 22
      const down = r > 0.93 ? 14 : 0
      d += `M ${x.toFixed(1)} ${y + down} v ${-(up + down)} l 6 -5 l 6 5 v ${up} `
      x += 17
    }
    x += 14 + rand() * 8
  }
  return { d, y, x1: x }
})

function build({ tl, p, draw, pop, exit }: SceneApi) {
  // the initial draws itself
  draw(p('frame'), 0.15, 0.7)
  tl.from(
    p('box-bg'),
    { scale: 0.6, opacity: 0, duration: 0.45, ease: 'back.out(1.6)' },
    0.55
  )
  draw(p('curl'), 0.85, 0.4)
  draw(p('letter'), 0.8, 0.75, 2200)
  tl.set(p('letter'), { fillOpacity: 0 }, 0)
  tl.to(p('letter'), { fillOpacity: 1, duration: 0.3 }, 1.4)
  pop(p('dot'), 1.35, 0.35)
  draw(p('vine'), 1.3, 0.6)

  // the quill writes
  const q = p('quill')
  tl.to(
    q,
    {
      x: LINE_X0,
      y: LINE_Y[0],
      rotation: -6,
      duration: 0.45,
      ease: 'power3.out',
    },
    0.5
  )
  let t = 0.95
  lines.forEach((ln, i) => {
    const dur = i === 0 ? 0.36 : 0.26
    if (i > 0)
      tl.to(
        q,
        { x: LINE_X0, y: ln.y, duration: 0.07, ease: 'power1.inOut' },
        t - 0.07
      )
    tl.to(q, { x: ln.x1, duration: dur, ease: 'none' }, t)
    tl.to(
      q,
      {
        y: `-=7`,
        duration: dur / 6,
        yoyo: true,
        repeat: 5,
        ease: 'sine.inOut',
      },
      t
    )
    draw(p(`line-${i}`), t, dur)
    t += dur + 0.07
  })
  tl.to(
    q,
    { x: 1700, y: -60, rotation: 12, duration: 0.45, ease: 'power2.in' },
    t
  )
  exit(q, t + 0.3, 0.15)
}
</script>
