<!--
  Pangur Bán — a monk and his white cat, each at his craft. The cat stalks low across the
  floor, wiggles its haunches and pounces on the mouse; in the same instant the monk catches
  the thought he was hunting, and the page glows.
-->
<template>
  <SceneStage :build="build">
    <Backdrop variant="study" />

    <!-- the scholar at his desk -->
    <g data-part="pageglow" data-pivot transform="translate(650 600)">
      <circle r="200" :fill="c('glow')" opacity="0.3" />
      <circle r="120" :fill="c('glow')" opacity="0.4" />
    </g>
    <!-- on the desk (drawn before the monk so his writing hand passes over the page) -->
    <Book part="book" :x="662" :y="667" :scale="0.7" cover="cloth-a" open />
    <Candle part="candle" :x="800" :y="661" :scale="0.7" />
    <Figure
      part="monk"
      :x="MONK_X"
      :y="FLOOR"
      :scale="1.15"
      body="robe"
      robe="wood-3"
      sleeve="wood-3"
      trim="wood-2"
      belt="wood-2"
      hair="bald"
      beard
      mood="neutral"
      :look="0.7"
      :tilt="8"
      :arm-r="-71"
      :arm-l="8"
    >
      <template #hand-r
        ><Quill :rotate="71" :x="-14" :y="8" :scale="0.5"
      /></template>
    </Figure>
    <Table :x="620" :y="FLOOR" :width="440" cloth="wood-2" :items="false" />

    <!-- the hunt -->
    <Burst part="burst" :x="1428" :y="744" :scale="0.42" />
    <Mouse part="mouse" :x="MOUSE_X" :y="FLOOR" :scale="1.1" color="stone-2" />
    <Cat
      part="cat"
      pose="rig"
      :x="CAT_X"
      :y="FLOOR"
      :scale="CAT_S"
      color="highlight"
      eye="green"
    />
  </SceneStage>
</template>

<script setup lang="ts">
import {
  Backdrop,
  Book,
  Burst,
  Candle,
  Figure,
  Mouse,
  Quill,
  SceneStage,
  Table,
  c,
  type SceneApi,
} from './kit'
import Cat from './kit/props/Cat.vue'
import { catRig } from './kit/props/catRig'

defineProps<{ period: string; title: string; initial?: string }>()

const FLOOR = 806
const MONK_X = 470
const CAT_X = 1000
const CAT_S = 1.15
const MOUSE_X = 1440

function build(api: SceneApi) {
  const { tl, p, establish, flicker, bob, blink, turn, pop, shake } = api
  // stage → cat units (the cat rig works in its own space, ground at y = 0)
  const cx = (x: number) => (x - CAT_X) / CAT_S
  const cy = (y: number) => (y - FLOOR) / CAT_S

  // low stalking crouch: shoulders down, paws spread
  const cat = catRig(api, 'cat', {
    bx: 0,
    by: -50,
    rot: 5,
    ffx: 50,
    fnx: 64,
    bfx: -46,
    bnx: -32,
  })

  tl.set(p('pageglow'), { scale: 0, opacity: 0 }, 0)
  tl.set(p('burst'), { scale: 0, opacity: 0 }, 0)
  tl.set(p('cat', 'head'), { rotation: 8 }, 0)

  establish()
  flicker(p('candle', 'flame'), 0)
  flicker(p('candle', 'halo'), 0.05)
  // the monk writes, line by line
  tl.to(
    p('monk', 'arm-r'),
    {
      rotation: -76,
      duration: 0.18,
      yoyo: true,
      repeat: 7,
      ease: 'sine.inOut',
    },
    0.1
  )
  bob(p('monk', 'head'), 0, 1.8, 3, 0.9)
  blink('monk', 0.9)
  // the mouse nibbles, unaware
  bob(p('mouse'), 0, 1.5, 3, 0.22)

  // ---- the stalk: two slow strides, belly low, tail swishing ----
  cat.to({ bx: 60, duration: 0.85, ease: 'sine.inOut' }, 0.25)
  cat.to(
    { by: -46, duration: 0.2, yoyo: true, repeat: 3, ease: 'sine.inOut' },
    0.25
  )
  const order = ['fn', 'bf', 'ff', 'bn'] as const
  for (let k = 0; k < 2; k++) {
    order.forEach((id, i) => {
      const at = 0.27 + k * 0.4 + i * 0.1
      cat.to({ [`${id}x`]: `+=30`, duration: 0.18, ease: 'power1.inOut' }, at)
      cat.to(
        {
          keyframes: [
            { [`${id}y`]: -9, duration: 0.09, ease: 'power1.out' },
            { [`${id}y`]: 0, duration: 0.09, ease: 'power1.in' },
          ],
        },
        at
      )
    })
  }
  tl.fromTo(
    p('cat', 'tail'),
    { rotation: -46 },
    {
      rotation: -30,
      duration: 0.37,
      yoyo: true,
      repeat: 2,
      ease: 'sine.inOut',
    },
    0
  )
  tl.fromTo(
    p('cat', 'tail-tip'),
    { rotation: -10 },
    { rotation: 34, duration: 0.33, yoyo: true, repeat: 2, ease: 'sine.inOut' },
    0.12
  )

  // ---- eyes lock on; the haunch wiggle ----
  tl.to(p('cat', 'pupil'), { scaleX: 2.6, duration: 0.15 }, 1.05)
  tl.to(
    p('cat', 'head'),
    { rotation: 2, duration: 0.25, ease: 'power2.out' },
    1.05
  )
  cat.to(
    { rot: 9, duration: 0.07, yoyo: true, repeat: 4, ease: 'sine.inOut' },
    1.12
  )
  cat.to(
    { bx: '+=4', duration: 0.07, yoyo: true, repeat: 4, ease: 'sine.inOut' },
    1.12
  )
  for (let i = 0; i < 3; i++) {
    const id = i % 2 ? 'bf' : 'bn'
    cat.to(
      {
        [`${id}y`]: -7,
        duration: 0.07,
        yoyo: true,
        repeat: 1,
        ease: 'sine.inOut',
      },
      1.12 + i * 0.14
    )
  }
  tl.to(
    p('cat', 'tail'),
    { rotation: -34, duration: 0.2, ease: 'power2.out' },
    1.12
  )
  tl.to(
    p('cat', 'tail-tip'),
    { rotation: 30, duration: 0.07, yoyo: true, repeat: 4, ease: 'sine.inOut' },
    1.12
  )
  // the mouse senses something
  tl.to(
    p('mouse'),
    { scaleY: 1.12, duration: 0.08, yoyo: true, repeat: 1, ease: 'power2.out' },
    1.38
  )

  // ---- anticipation: sink, aim ----
  cat.to(
    { by: -40, rot: -4, sx: 1.05, sy: 0.9, duration: 0.14, ease: 'power2.in' },
    1.5
  )
  tl.to(
    p('cat', 'head'),
    { rotation: -8, duration: 0.14, ease: 'power2.in' },
    1.5
  )

  // ---- the pounce: an arc, stretched, tucked, reaching ----
  const T0 = 1.64
  const LAND = 2.06
  cat.to({ bx: 330, duration: LAND - T0, ease: 'none' }, T0)
  cat.to(
    {
      keyframes: [
        { by: -190, duration: 0.21, ease: 'power2.out' },
        { by: -70, duration: LAND - T0 - 0.21, ease: 'power2.in' },
      ],
    },
    T0
  )
  cat.to(
    {
      keyframes: [
        { rot: -20, sx: 1.16, sy: 0.88, duration: 0.1, ease: 'power2.out' },
        { rot: 0, sx: 1, sy: 1, duration: 0.14, ease: 'sine.inOut' },
        { rot: 14, sx: 1.08, sy: 0.94, duration: 0.12, ease: 'sine.in' },
        { rot: -6, duration: 0.06, ease: 'power2.out' },
      ],
    },
    T0
  )
  cat.to({ air: 1, reach: 1, duration: 0.07, ease: 'power2.out' }, T0)
  cat.to({ reach: -0.5, duration: 0.14, ease: 'sine.inOut' }, T0 + 0.08)
  cat.to({ reach: 1, duration: 0.14, ease: 'sine.out' }, T0 + 0.24)
  tl.to(
    p('cat', 'head'),
    { rotation: 10, duration: 0.3, ease: 'sine.inOut' },
    T0 + 0.05
  )
  // landing spots: front paws on the mouse's back, hind paws on the floor
  const mTop = (dx: number, top: number) => ({
    x: cx(MOUSE_X + dx * 1.1),
    y: cy(FLOOR - top * 1.1 * 0.88),
  })
  const pin1 = mTop(-6, 43)
  const pin2 = mTop(-22, 39.5)
  cat.set(
    {
      fnx: pin1.x,
      fny: pin1.y,
      ffx: pin2.x,
      ffy: pin2.y,
      bnx: 300,
      bny: 0,
      bfx: 286,
      bfy: 0,
    },
    T0 + 0.2
  )
  cat.to({ air: 0, duration: 0.07, ease: 'power2.in' }, LAND - 0.07)
  // the tail streams behind, then whips over on landing (follow-through)
  tl.to(
    p('cat', 'tail'),
    { rotation: -58, duration: 0.16, ease: 'power2.out' },
    T0
  )
  tl.to(
    p('cat', 'tail-tip'),
    { rotation: -24, duration: 0.2, ease: 'power2.out' },
    T0 + 0.04
  )
  tl.to(
    p('cat', 'tail'),
    { rotation: 28, duration: 0.22, ease: 'back.out(2.2)' },
    LAND - 0.04
  )
  tl.to(
    p('cat', 'tail-tip'),
    { rotation: 40, duration: 0.3, ease: 'back.out(2.6)' },
    LAND
  )
  tl.to(
    p('cat', 'tail'),
    { rotation: 12, duration: 0.4, ease: 'sine.inOut' },
    LAND + 0.2
  )
  tl.to(
    p('cat', 'tail-tip'),
    { rotation: 14, duration: 0.45, ease: 'sine.inOut' },
    LAND + 0.28
  )

  // ---- impact: squash, settle; the mouse is pinned ----
  cat.to(
    {
      keyframes: [
        { by: -62, sx: 1.1, sy: 0.86, duration: 0.07, ease: 'power2.out' },
        { by: -72, sx: 1, sy: 1, duration: 0.3, ease: 'back.out(2.5)' },
      ],
    },
    LAND
  )
  tl.to(
    p('cat', 'head'),
    { rotation: 16, duration: 0.08, yoyo: true, repeat: 1, ease: 'power2.out' },
    LAND
  )
  tl.to(
    p('cat', 'head'),
    { rotation: 6, duration: 0.25, ease: 'sine.out' },
    LAND + 0.16
  )
  tl.to(p('cat', 'pupil'), { scaleX: 1, duration: 0.3 }, LAND + 0.25)
  tl.to(
    p('mouse'),
    { scaleY: 0.88, scaleX: 1.06, duration: 0.07, ease: 'power2.out' },
    LAND
  )
  tl.to(
    p('mouse', 'tail'),
    { rotation: 16, duration: 0.06, yoyo: true, repeat: 3, ease: 'sine.inOut' },
    LAND
  )
  pop(p('burst'), LAND, 0.22)
  tl.to(p('burst'), { opacity: 0, scale: 0.55, duration: 0.18 }, LAND + 0.2)
  shake(LAND, 7, 0.2)

  // ---- …and in that instant the monk catches his thought: the page glows ----
  turn(p('monk', 'arm-r'), LAND - 0.12, -96, 0.22, 'back.out(2)')
  turn(p('monk', 'arm-l'), LAND - 0.08, 150, 0.3, 'back.out(1.8)')
  turn(p('monk', 'head'), LAND - 0.08, -6, 0.25, 'back.out(2)')
  tl.to(
    p('pageglow'),
    { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.6)' },
    LAND - 0.06
  )
  blink('monk', LAND + 0.3)
}
</script>
