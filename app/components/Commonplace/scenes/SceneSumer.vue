<!--
  Sumer is icumen in — spring bursts over the meadow: the cuckoo sings from the tree,
  flowers pop up, and a lamb and calf frolic.
-->
<template>
  <SceneStage :build="build">
    <Backdrop variant="hills" time="day" :celestial="[980, 160]" />

    <Tree part="tree" :x="1380" :y="740" :scale="1.5" kind="round" />

    <!-- cuckoo on a branch -->
    <path
      d="M 1400 520 Q 1300 455 1190 452"
      fill="none"
      :stroke="c('wood-2')"
      stroke-width="14"
      stroke-linecap="round"
    />
    <g data-part="cuckoo" data-pivot transform="translate(1250 420)">
      <!-- tail: its root sits inside the body (drawn first, so the body covers the join) and it pivots there -->
      <g data-part="cuckoo-tail" data-pivot transform="translate(-30 4)">
        <path
          d="M 6 -14 C -34 -16 -76 -2 -112 24 C -116 32 -108 38 -98 36 C -62 32 -22 28 10 16 Z"
          :fill="c('stone')"
        />
        <path
          d="M 8 -4 C -30 -2 -66 12 -100 36 C -62 34 -22 30 10 16 Z"
          :fill="c('stone-2')"
        />
        <path
          d="M -60 6 L -52 26 M -82 18 L -72 32 M -100 28 L -92 36"
          fill="none"
          :stroke="c('ink')"
          stroke-width="5"
          stroke-linecap="round"
          opacity="0.35"
        />
      </g>
      <ellipse cx="0" cy="0" rx="46" ry="30" :fill="c('stone-2')" />
      <ellipse
        cx="-6"
        cy="8"
        rx="30"
        ry="16"
        :fill="c('stone-3')"
        opacity="0.5"
      />
      <g data-part="cuckoo-head" data-pivot transform="translate(34 -22)">
        <circle r="22" :fill="c('stone-2')" />
        <path
          d="M -18 -8 L -48 0 L -18 8 Z"
          :fill="c('gold')"
          transform="scale(-1 1)"
        />
        <circle cx="6" cy="-4" r="4" :fill="c('ink')" />
      </g>
    </g>
    <Note
      v-for="(n, i) in 4"
      :key="i"
      part="note"
      :x="1200 - i * 60"
      :y="430 - (i % 2) * 30"
      :scale="1.1"
      color="cloth-d"
    />

    <!-- flowers -->
    <g
      v-for="(f, i) in flowers"
      :key="i"
      data-part="flower"
      data-pivot
      :transform="`translate(${f.x} ${f.y})`"
    >
      <path
        d="M 0 0 L 0 -50"
        :stroke="c('green-2')"
        stroke-width="6"
        stroke-linecap="round"
      />
      <circle
        v-for="a in 5"
        :key="a"
        cx="0"
        cy="-70"
        r="14"
        :fill="c(f.col)"
        :transform="`rotate(${a * 72} 0 -58) translate(0 0)`"
      />
      <circle cx="0" cy="-58" r="9" :fill="c('gold')" />
    </g>

    <Sheep part="lamb" :x="500" :y="700" :scale="1.5" />
    <Cow
      part="calf"
      :x="1100"
      :y="700"
      :scale="0.75"
      flip
      color="wood-3"
      spots="highlight"
    />
  </SceneStage>
</template>

<script setup lang="ts">
import { Backdrop, SceneStage, Tree, c, type SceneApi } from './kit'
import Cow from './kit/props/Cow.vue'
import Note from './kit/props/Note.vue'
import Sheep from './kit/props/Sheep.vue'

defineProps<{ period: string; title: string; initial?: string }>()

const cols = ['cloth-a', 'highlight', 'cloth-d', 'gold', 'cloth-b']
const flowers = [140, 290, 700, 1010, 1130, 1480, 1560, 380, 620, 1420].map(
  (x, i) => ({
    x,
    y: 690 + (i % 3) * 24,
    col: cols[i % cols.length],
  })
)

function build({ tl, p, establish, sway }: SceneApi) {
  tl.set(p('flower'), { scale: 0 }, 0)
  tl.set(p('note'), { opacity: 0, scale: 0 }, 0)

  establish()
  sway(p('clouds'), 0, undefined, 1, 3)
  sway(p('tree', 'canopy'), 0, undefined, 1.2, 1.6)

  // spring arrives: flowers pop up in a wave
  tl.to(
    p('flower'),
    { scale: 1, duration: 0.4, stagger: 0.07, ease: 'back.out(3)' },
    0.5
  )
  sway(p('flower'), 1.3, undefined, 6, 0.9)

  // the cuckoo sings
  tl.from(
    p('cuckoo'),
    { y: '-=40', opacity: 0, duration: 0.4, ease: 'back.out(2)' },
    0.5
  )
  sway(p('cuckoo-tail'), 1.0, undefined, 5, 0.5)
  tl.to(
    p('cuckoo-head'),
    {
      rotation: -18,
      duration: 0.14,
      yoyo: true,
      repeat: 7,
      ease: 'sine.inOut',
    },
    1.0
  )
  tl.to(
    p('note'),
    { opacity: 1, scale: 1, duration: 0.2, stagger: 0.17, ease: 'back.out(2)' },
    1.05
  )
  tl.to(
    p('note'),
    {
      x: '-=130',
      y: '-=120',
      rotation: -14,
      duration: 1,
      stagger: 0.17,
      ease: 'power1.out',
    },
    1.05
  )

  // the lamb and calf frolic
  tl.to(
    p('lamb'),
    {
      keyframes: [
        { y: 620, x: 525, duration: 0.2, ease: 'power2.out' },
        { y: 700, x: 550, duration: 0.18, ease: 'power2.in' },
        { y: 620, x: 575, duration: 0.2, ease: 'power2.out' },
        { y: 700, x: 600, duration: 0.18, ease: 'power2.in' },
      ],
    },
    1.0
  )
  // calf hops toward the lamb but stops with a clear gap between them
  tl.to(
    p('calf'),
    {
      keyframes: [
        { y: 630, x: 1075, duration: 0.22, ease: 'power2.out' },
        { y: 700, x: 1050, duration: 0.2, ease: 'power2.in' },
        { y: 630, x: 1025, duration: 0.22, ease: 'power2.out' },
        { y: 700, x: 1000, duration: 0.2, ease: 'power2.in' },
      ],
    },
    1.3
  )
  tl.to(
    p('calf', 'tail'),
    { rotation: 25, duration: 0.15, yoyo: true, repeat: 7 },
    1.3
  )
}
</script>
