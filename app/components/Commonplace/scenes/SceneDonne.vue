<!--
  John Donne — "The Flea", then "The Good-morrow". Two lovers face each other in a dim room
  before dawn, each holding out a flat open hand. A flea hops up from the floor onto his hand and
  bites ("it suck'd me first"), hops across onto hers and bites ("and now sucks thee"), swelling;
  she presses it at her fingertip — "purpled thy nail". The flea only ever rests on the floor or
  a palm: every hop is a single arc from one contact point to the next. Then the curtains part on a rising sun, and the lovers' hands meet.
-->
<template>
  <SceneStage :build="build">
    <!-- the chamber -->
    <rect width="1600" height="900" :fill="c('stone-3')" />
    <g :fill="c('stone')" opacity="0.28">
      <rect
        v-for="i in 20"
        :key="i"
        :x="i * 80 - 52"
        y="0"
        width="22"
        height="760"
      />
    </g>
    <rect y="760" width="1600" height="140" :fill="c('wood-2')" />
    <path
      v-for="x in 9"
      :key="x"
      :d="`M ${x * 180 - 60} 760 L ${x * 180 - 140} 900`"
      :stroke="c('wood')"
      stroke-width="5"
      opacity="0.5"
    />
    <rect y="742" width="1600" height="20" :fill="c('wood')" />

    <!-- the window: night now, dawn to come -->
    <path :d="WIN_FRAME" :fill="c('wood-3')" />
    <clipPath :id="clipId"><path :d="WIN_GLASS" /></clipPath>
    <g :clip-path="`url(#${clipId})`">
      <rect x="600" y="60" width="400" height="420" :fill="c('night')" />
      <g data-part="dawn">
        <rect x="600" y="60" width="400" height="420" :fill="c('sky')" />
        <ellipse cx="800" cy="395" rx="240" ry="160" :fill="c('sky-2')" />
        <ellipse
          cx="800"
          cy="395"
          rx="160"
          ry="84"
          :fill="c('glow')"
          opacity="0.55"
        />
      </g>
      <g data-part="sun" data-pivot transform="translate(800 290)">
        <circle r="88" :fill="c('glow')" opacity="0.35" />
        <circle r="44" :fill="c('sun')" />
      </g>
      <path
        d="M 600 480 L 600 366 C 680 344 740 362 800 354 C 870 344 930 358 1000 350 L 1000 480 Z"
        :fill="c('far')"
      />
    </g>
    <path
      d="M 800 98 L 800 394 M 686 266 L 914 266"
      :stroke="c('wood-3')"
      stroke-width="10"
    />
    <rect x="654" y="390" width="292" height="18" rx="3" :fill="c('wood-3')" />

    <!-- curtains (closed), on a rod -->
    <g transform="translate(632 56)">
      <g data-part="curtain-l" data-pivot>
        <path
          d="M 0 0 L 170 0 C 164 130 174 280 168 370 L 0 374 Z"
          :fill="c('green-2')"
        />
        <path
          d="M 38 0 L 38 372 M 86 0 L 88 371 M 132 0 L 130 370"
          :stroke="c('ink')"
          stroke-width="7"
          opacity="0.14"
        />
      </g>
    </g>
    <g transform="translate(968 56)">
      <g data-part="curtain-r" data-pivot>
        <path
          d="M 0 0 L -170 0 C -164 130 -174 280 -168 370 L 0 374 Z"
          :fill="c('green-2')"
        />
        <path
          d="M -38 0 L -38 372 M -86 0 L -88 371 M -132 0 L -130 370"
          :stroke="c('ink')"
          stroke-width="7"
          opacity="0.14"
        />
      </g>
    </g>
    <rect x="606" y="48" width="388" height="14" rx="7" :fill="c('gold')" />

    <!-- morning light falling into the room -->
    <path
      data-part="beam"
      d="M 686 394 L 914 394 L 1100 790 L 500 790 Z"
      :fill="c('glow')"
      opacity="0"
    />

    <!-- the lovers, facing each other -->
    <Figure
      part="him"
      :x="HIM_X"
      :y="FLOOR"
      :scale="S"
      body="tunic"
      robe="cloth-b"
      legs="cloth-a"
      belt="gold"
      hat="cap"
      hat-color="cloth-d"
      mood="happy"
      :look="1"
      :tilt="5"
      :lean="LEAN"
      :arm-r="ARM"
    >
      <template #held-r>
        <g :transform="`rotate(${PAD_LEVEL})`">
          <g data-part="pad" data-pivot>
            <rect
              x="-4"
              :y="PAD_TOP"
              width="54"
              :height="PAD_H"
              rx="5"
              :fill="c('skin')"
            />
          </g>
        </g>
      </template>
    </Figure>
    <Figure
      part="her"
      :x="HER_X"
      :y="FLOOR"
      :scale="S"
      flip
      hair="long"
      hair-color="hair"
      robe="cloth-a"
      trim="gold"
      mood="happy"
      :look="1"
      :tilt="5"
      :lean="LEAN"
      :arm-r="ARM"
    >
      <template #held-r>
        <g :transform="`rotate(${PAD_LEVEL})`">
          <g data-part="pad" data-pivot>
            <rect
              x="-4"
              :y="PAD_TOP"
              width="54"
              :height="PAD_H"
              rx="5"
              :fill="c('skin')"
            />
            <ellipse
              cx="41"
              :cy="PAD_TOP + 2"
              rx="6"
              ry="2.4"
              :fill="c('highlight')"
            />
            <ellipse
              data-part="nail-stain"
              cx="41"
              :cy="PAD_TOP + 2"
              rx="6.4"
              ry="2.7"
              :fill="c('cloth-d')"
              opacity="0"
            />
          </g>
        </g>
      </template>
    </Figure>

    <!-- the flea, and the snap -->
    <Burst
      part="snap"
      :x="HER_X - 160"
      :y="FLOOR - 200"
      :scale="0.24"
      color="cloth-d"
    />
    <Flea part="flea" :x="FLEA_FLOOR.x" :y="FLEA_FLOOR.y" :scale="FS" />

    <!-- good-morrow -->
    <path
      data-part="heart"
      data-pivot
      transform="translate(800 486)"
      d="M 0 14 C -26 -4 -30 -24 -16 -30 C -8 -33 -2 -28 0 -22 C 2 -28 8 -33 16 -30 C 30 -24 26 -4 0 14 Z"
      :fill="c('cloth-a')"
    />

    <!-- pre-dawn dimness over the whole room -->
    <rect
      data-part="night-dim"
      width="1600"
      height="900"
      :fill="c('night')"
      opacity="0.2"
      pointer-events="none"
    />
  </SceneStage>
</template>

<script setup lang="ts">
import { useId } from 'vue'
import { Burst, Figure, SceneStage, c, type SceneApi } from './kit'
import Flea from './kit/props/Flea.vue'

defineProps<{ period: string; title: string; initial?: string }>()

const FLOOR = 790
const HIM_X = 610
const HER_X = 990
const S = 1.15
const clipId = `cp-donne-${useId()}`
const WIN_FRAME =
  'M 666 400 L 666 230 Q 666 96 800 76 Q 934 96 934 230 L 934 400 Z'
const WIN_GLASS =
  'M 686 394 L 686 236 Q 686 116 800 98 Q 914 116 914 236 L 914 394 Z'

// the lovers hold out flat open hands (a "pad" on the end of each arm, kept level in the world),
// so the flea always has a real surface to land on
const ARM = -28
const LEAN = 2
const PAD_LEVEL = -(ARM + LEAN) // counter-rotation that keeps the pad horizontal (arm + lean + this = 0)
const PAD_H = 12 // the palm's thickness
const PAD_BOTTOM = 16 // the underside lines up with the bottom of the hand (the hand is a circle of radius 16)
const PAD_TOP = PAD_BOTTOM - PAD_H // the palm's top surface (what the flea stands on), in hand-local units
const FS = 0.9 // flea scale
const CAP = 1.5 * FS // the round foot caps reach this far below the flea's anchor line
const FLEA_FLOOR = { x: 700, y: FLOOR - CAP }
const LAND_HIM = 24 // where on his pad the flea lands (hand-local x)
const LAND_HER = 22 // where on her pad (toward the fingertip, but far enough in that the hind foot stays on the palm)

function build({ tl, p, root, establish, blink, turn, pop, shake }: SceneApi) {
  // exact contact points, measured from the drawn hands before anything moves
  const frame = root.querySelector(p('flea'))!.parentNode as SVGGraphicsElement
  const surface = (who: string, lx: number) => {
    const rect = root.querySelector<SVGGraphicsElement>(
      `${p(who, 'pad')} rect`
    )!
    const m = frame.getScreenCTM()!.inverse().multiply(rect.getScreenCTM()!)
    const q = new DOMPoint(lx, PAD_TOP).matrixTransform(m)
    return { x: q.x, y: q.y - CAP }
  }
  const A = surface('him', LAND_HIM)
  const B = surface('her', LAND_HER)

  // one clean hop from a contact point to the next: crouch on the surface, a single arc through
  // the air (x steady, y up then down), tucked legs in flight, squash on touchdown
  const hop = (
    at: number,
    to: { x: number; y: number },
    apex: number,
    dur: number
  ) => {
    tl.to(p('flea'), { x: to.x, duration: dur, ease: 'none' }, at)
    tl.to(
      p('flea'),
      {
        keyframes: [
          { y: apex, duration: dur / 2, ease: 'power2.out' },
          { y: to.y, duration: dur / 2, ease: 'power2.in' },
        ],
      },
      at
    )
    tl.to(
      p('flea', 'body'),
      {
        keyframes: [
          { scaleY: 0.75, scaleX: 1.12, duration: 0.07 },
          { scaleY: 1.12, scaleX: 0.92, rotation: -14, duration: 0.05 },
          { rotation: 10, duration: dur - 0.12 },
          { scaleY: 0.78, scaleX: 1.12, rotation: 0, duration: 0.07 },
          { scaleY: 1, scaleX: 1, duration: 0.08 },
        ],
      },
      at - 0.07
    )
    tl.to(
      p('flea', 'hind'),
      { rotation: 60, duration: 0.07, yoyo: true, repeat: 1 },
      at - 0.04
    )
  }
  // feeding: it pulses against the skin (squashing down onto it, so it never lifts off)
  const feed = (at: number) => {
    tl.to(
      p('flea', 'body'),
      {
        scaleY: 0.86,
        scaleX: 1.05,
        duration: 0.07,
        yoyo: true,
        repeat: 3,
        ease: 'sine.inOut',
      },
      at
    )
  }

  tl.set(p('snap'), { x: B.x, y: B.y - 16, scale: 0, opacity: 0 }, 0)
  tl.set(p('heart'), { scale: 0, opacity: 0 }, 0)
  tl.set(p('dawn'), { opacity: 0 }, 0)
  tl.set(p('sun'), { y: 520 }, 0)
  tl.set(p('flea', 'belly'), { scale: 0.25 }, 0)

  establish()
  blink('him', 0.15)
  blink('her', 0.3)

  // "Mark but this flea": it springs from the floor up onto his open hand…
  const H1 = 0.3
  hop(H1, A, A.y - 62, 0.3)
  // …"it suck'd me first" (the arms stay perfectly still while it sits on them)
  feed(0.68)
  tl.to(
    p('flea', 'belly'),
    { scale: 0.75, duration: 0.3, ease: 'power1.out' },
    0.68
  )
  tl.to(
    p('him', 'head'),
    { rotation: -7, duration: 0.07, yoyo: true, repeat: 1 },
    0.74
  )
  blink('him', 0.74)

  // …"and now sucks thee": one hop across onto her hand, near the fingertip
  const H2 = 1.04
  hop(H2, B, Math.min(A.y, B.y) - 64, 0.28)
  feed(1.42)
  tl.to(
    p('flea', 'belly'),
    { scale: 1.25, duration: 0.3, ease: 'power1.out' },
    1.42
  )
  tl.to(p('flea'), { scale: FS * 1.1, duration: 0.3, ease: 'power1.out' }, 1.42)
  tl.to(
    p('her', 'head'),
    { rotation: 7, duration: 0.07, yoyo: true, repeat: 1 },
    1.48
  )
  blink('her', 1.48)

  // and she presses it, there at her fingertip: "purpled thy nail" (it never leaves the skin)
  const SNAP = 1.74
  tl.to(
    p('flea', 'body'),
    { scaleY: 0.25, scaleX: 1.25, duration: 0.06, ease: 'power3.in' },
    SNAP
  )
  tl.to(p('flea'), { opacity: 0, duration: 0.06 }, SNAP + 0.07)
  pop(p('snap'), SNAP, 0.2)
  tl.to(p('snap'), { opacity: 0, scale: 0.4, duration: 0.18 }, SNAP + 0.18)
  tl.to(p('her', 'nail-stain'), { opacity: 1, duration: 0.08 }, SNAP + 0.02)
  shake(SNAP, 6, 0.18)
  tl.to(
    p('him', 'pose'),
    { rotation: -4, duration: 0.12, yoyo: true, repeat: 1, ease: 'power2.out' },
    SNAP + 0.02
  )
  blink('him', SNAP + 0.05)

  // good-morrow: the curtains part, the sun comes up, the room warms
  const DAWN = 2.0
  tl.to(
    p('curtain-l'),
    { scaleX: 0.26, duration: 0.5, ease: 'power3.inOut' },
    DAWN
  )
  tl.to(
    p('curtain-r'),
    { scaleX: 0.26, duration: 0.5, ease: 'power3.inOut' },
    DAWN
  )
  tl.to(p('dawn'), { opacity: 1, duration: 0.5 }, DAWN + 0.05)
  tl.to(p('sun'), { y: 290, duration: 0.7, ease: 'power2.out' }, DAWN + 0.1)
  tl.to(p('night-dim'), { opacity: 0, duration: 0.6 }, DAWN + 0.1)
  tl.to(p('beam'), { opacity: 0.2, duration: 0.5 }, DAWN + 0.2)

  // and the lovers' hands meet beneath it
  turn(p('her', 'arm-r'), DAWN + 0.15, -66, 0.4, 'power2.inOut')
  turn(p('him', 'arm-r'), DAWN + 0.15, -66, 0.4, 'power2.inOut')
  // the open hands stay level as the arms swing, and shorten into a clasp where they meet
  for (const who of ['her', 'him']) {
    tl.to(
      p(who, 'pad'),
      {
        rotation: -(-66 + LEAN + PAD_LEVEL),
        scaleX: 0.5,
        duration: 0.4,
        ease: 'power2.inOut',
      },
      DAWN + 0.15
    )
  }
  turn(p('him', 'head'), DAWN + 0.2, 6, 0.35)
  turn(p('her', 'head'), DAWN + 0.25, 6, 0.35)
  tl.to(
    p('heart'),
    { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(3)' },
    DAWN + 0.45
  )
  tl.to(p('heart'), { y: 470, duration: 0.4, ease: 'sine.out' }, DAWN + 0.6)
}
</script>
