<!--
  The Nun's Priest's Tale — Chauntecleer crows on the barnyard fence; the fox snatches him and
  bolts, but a clever word makes the rooster slip free and flap up into a tree.
-->
<template>
  <SceneStage :build="build">
    <Backdrop variant="hills" time="day" :celestial="[1010, 170]" />

    <Tree part="tree" :x="1400" :y="740" :scale="1.5" kind="round" />
    <!-- the branch Chauntecleer finally perches on -->
    <path
      d="M 1420 548 C 1400 494 1344 482 1286 478"
      fill="none"
      :stroke="c('wood-2')"
      stroke-width="18"
      stroke-linecap="round"
    />

    <!-- fence -->
    <g :fill="c('wood')">
      <rect
        v-for="i in 5"
        :key="i"
        :x="140 + i * 120"
        y="560"
        width="34"
        height="150"
        rx="6"
      />
      <rect
        x="150"
        y="590"
        width="640"
        height="22"
        rx="6"
        :fill="c('wood-2')"
      />
      <rect
        x="150"
        y="650"
        width="640"
        height="22"
        rx="6"
        :fill="c('wood-2')"
      />
    </g>

    <Rooster part="rooster" :x="520" :y="560" :scale="1.15" color="cloth-a" />
    <g
      data-part="crow"
      data-pivot
      transform="translate(640 290)"
      :fill="c('highlight')"
      :stroke="c('ink')"
      stroke-width="9"
      stroke-linejoin="round"
      paint-order="stroke"
      class="cp-serif"
      font-size="64"
      font-weight="700"
      font-style="italic"
    >
      <text text-anchor="middle">Cock-a-doodle!</text>
    </g>

    <Fox part="fox" :x="-200" :y="700" :scale="1.3" />
    <Burst part="burst" :x="560" :y="520" :scale="0.6" />
  </SceneStage>
</template>

<script setup lang="ts">
import {
  Backdrop,
  Burst,
  Rooster,
  SceneStage,
  Tree,
  c,
  type SceneApi,
} from './kit'
import Fox from './kit/props/Fox.vue'

defineProps<{ period: string; title: string; initial?: string }>()

function build({ tl, p, establish, sway, pop, shake, turn }: SceneApi) {
  tl.set(p('crow'), { opacity: 0, scale: 0.6 }, 0)
  tl.set(p('burst'), { scale: 0, opacity: 0 }, 0)

  establish()
  sway(p('tree', 'canopy'), 0, undefined, 1, 1.8)

  // proud crowing
  turn(p('rooster', 'head'), 0.15, -22, 0.2, 'back.out(2)')
  tl.to(
    p('crow'),
    { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(2)' },
    0.3
  )
  tl.to(
    p('rooster', 'tail'),
    { rotation: 8, duration: 0.15, yoyo: true, repeat: 5 },
    0.3
  )

  // the fox sneaks in…
  tl.to(p('fox'), { x: 420, duration: 0.9, ease: 'power1.inOut' }, 0.5)
  tl.to(
    p('fox', 'head'),
    { rotation: 8, duration: 0.3, yoyo: true, repeat: 3 },
    0.5
  )
  tl.to(p('crow'), { opacity: 0, duration: 0.2 }, 1.2)
  turn(p('rooster', 'head'), 1.25, 0, 0.2)

  // …pounces, grabs him and bolts
  tl.to(
    p('fox'),
    {
      keyframes: [
        { x: 520, y: 600, duration: 0.18, ease: 'power2.out' },
        { x: 600, y: 700, duration: 0.14, ease: 'power2.in' },
      ],
    },
    1.45
  )
  pop(p('burst'), 1.65, 0.25)
  tl.to(p('burst'), { opacity: 0, duration: 0.2 }, 1.9)
  tl.to(
    p('rooster'),
    { x: 620, y: 660, rotation: -75, duration: 0.15, ease: 'power2.in' },
    1.62
  )
  tl.to(
    [p('fox'), p('rooster')],
    { x: '+=420', duration: 0.5, ease: 'power1.in' },
    1.8
  )

  // the rooster slips free and flaps up into the tree
  tl.to(
    p('rooster'),
    {
      keyframes: [
        { x: 1180, y: 470, rotation: -10, duration: 0.3, ease: 'power2.out' },
        { x: 1340, y: 472, rotation: 0, duration: 0.25, ease: 'power2.inOut' },
      ],
    },
    2.15
  )
  tl.to(p('fox'), { x: 1230, y: 700, duration: 0.3, ease: 'power2.out' }, 2.3)
  turn(p('fox', 'head'), 2.45, -25, 0.2)
  shake(2.4, 5, 0.2)
}
</script>
