<!--
  The Altar — George Herbert's pattern poem: stones stack themselves into an altar
  (wide top, narrow column, wide base) and a heart glows upon it.
-->
<template>
  <SceneStage :build="build">
    <Backdrop variant="chapel" />

    <g
      v-for="(b, i) in blocks"
      :key="i"
      data-part="blk"
      data-pivot
      :transform="`translate(${b.x} ${b.y})`"
    >
      <rect
        :x="-b.w / 2"
        y="-24"
        :width="b.w"
        height="48"
        rx="6"
        :fill="c(b.col)"
        :stroke="c('ink')"
        stroke-opacity="0.35"
        stroke-width="3"
      />
      <rect
        :x="-b.w / 2"
        y="-24"
        :width="b.w"
        height="10"
        rx="5"
        :fill="c('highlight')"
        opacity="0.22"
      />
    </g>

    <KitPlace part="heart" :x="800" :y="242" :scale="0.9">
      <circle data-part="aura" r="150" :fill="c('glow')" opacity="0.35" />
      <circle r="100" :fill="c('glow')" opacity="0.4" />
      <path
        d="M 0 52 C -100 -20 -62 -90 0 -44 C 62 -90 100 -20 0 52 Z"
        :fill="c('cloth-a')"
      />
      <path
        d="M -40 -30 C -30 -50 -14 -48 -8 -38"
        fill="none"
        :stroke="c('highlight')"
        stroke-width="7"
        stroke-linecap="round"
        opacity="0.7"
      />
    </KitPlace>
  </SceneStage>
</template>

<script setup lang="ts">
import { Backdrop, KitPlace, SceneStage, c, type SceneApi } from './kit'

defineProps<{ period: string; title: string; initial?: string }>()

// rows bottom → top: base (wide), column (narrow), top slab (wide)
const rows = [7, 7, 5, 1, 1, 1, 1, 5, 7]
const blocks = rows.flatMap((n, r) => {
  const w = n === 1 ? 110 : 86
  const y = 702 - r * 50
  return Array.from({ length: n }, (_, i) => ({
    x: 800 + (i - (n - 1) / 2) * (w + 2),
    y,
    w,
    col: ['wood-3', 'gold', 'gold-2'][(i + r) % 3],
  }))
})

function build({ tl, p, establish, shake, flicker }: SceneApi) {
  tl.set(p('heart'), { scale: 0, opacity: 0 }, 0)
  establish()
  flicker(p('rays'), 0)

  // the stones stack themselves, base first
  tl.from(
    p('blk'),
    {
      y: '-=520',
      x: (i: number) => (i % 2 ? 90 : -90),
      rotation: (i: number) => (i % 2 ? 40 : -40),
      opacity: 0,
      duration: 0.38,
      stagger: 0.032,
      ease: 'back.out(1.1)',
    },
    0.3
  )
  tl.to(
    p('blk'),
    { y: '+=5', duration: 0.1, yoyo: true, repeat: 1, stagger: 0.01 },
    1.75
  )
  shake(1.9, 8, 0.25)

  // a heart glows upon the altar
  tl.to(
    p('heart'),
    { scale: 0.9, opacity: 1, duration: 0.5, ease: 'back.out(2.2)' },
    2.0
  )
  tl.to(
    p('aura'),
    { scale: 1.25, duration: 0.3, yoyo: true, repeat: 1, ease: 'sine.inOut' },
    2.4
  )
}
</script>
