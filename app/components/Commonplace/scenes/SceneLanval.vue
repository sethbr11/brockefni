<!--
  Lanval — a lonely knight lies in a meadow by a river; a fairy pavilion shimmers into being,
  its lady beckons, and a purse at his belt fills with fairy gold that spills at his feet.
-->
<template>
  <SceneStage :build="build" :caption-at="3.0">
    <Backdrop variant="hills" />

    <!-- river -->
    <path
      d="M 0 820 C 300 790 500 850 800 820 C 1100 790 1300 850 1600 820 L 1600 900 L 0 900 Z"
      :fill="c('water')"
    />
    <path
      data-part="ripple"
      d="M 100 858 L 260 858 M 560 882 L 740 882 M 1000 860 L 1160 860 M 1340 886 L 1480 886"
      :stroke="c('foam')"
      stroke-width="6"
      stroke-linecap="round"
      opacity="0.7"
    />

    <!-- the fairy pavilion -->
    <g data-part="glimmer" data-pivot transform="translate(1100 640)">
      <circle r="330" :fill="c('glow')" opacity="0.18" />
    </g>
    <Tent part="tent" :x="1100" :y="GY" :scale="1.2" />
    <!-- fairy glamour: a few small sparkles hugging the pavilion -->
    <g
      v-for="(k, i) in sparks"
      :key="'sp' + i"
      :transform="`translate(${k[0]} ${k[1]}) scale(${k[2]})`"
    >
      <g data-part="spark" data-pivot>
        <path
          d="M 0 -16 L 3.5 -3.5 L 16 0 L 3.5 3.5 L 0 16 L -3.5 3.5 L -16 0 L -3.5 -3.5 Z"
          :fill="c(i % 2 ? 'highlight' : 'gold')"
        />
      </g>
    </g>

    <!-- the lady -->
    <Figure
      part="lady"
      :x="880"
      :y="GY"
      :scale="0.9"
      flip
      hair="long"
      hair-color="gold"
      hat="none"
      robe="cloth-d"
      sleeve="cloth-d"
      trim="gold"
      belt="gold"
      mood="happy"
      :arm-l="40"
    />

    <!-- Lanval, forlorn on the grass -->
    <Figure
      part="lanval"
      :x="500"
      :y="GY"
      :scale="0.9"
      body="tunic"
      robe="cloth-b"
      sleeve="cloth-b"
      trim="gold"
      legs="cloth-c"
      belt="gold"
      hair="short"
      hair-color="hair"
      mood="neutral"
      :arm-l="0"
      :arm-r="0"
    >
      <!-- his purse, hung from the belt (the slot rides on the figure, so it moves with him). Origin = the belt line -->
      <template #held-r>
        <g transform="translate(-24 -31)">
          <circle
            data-part="purse-glow"
            data-pivot
            cx="0"
            cy="26"
            r="34"
            :fill="c('glow')"
            opacity="0.55"
          />
          <g data-part="purse" data-pivot>
            <rect
              x="-4"
              y="-4"
              width="8"
              height="14"
              rx="2"
              :fill="c('wood-3')"
            />
            <g data-part="purse-gold" data-pivot>
              <circle cx="-7" cy="5" r="7" :fill="c('gold')" />
              <circle cx="7" cy="4" r="7" :fill="c('gold-2')" />
              <circle cx="0" cy="0" r="7.5" :fill="c('gold')" />
              <circle
                cx="-2"
                cy="-2"
                r="2.5"
                :fill="c('highlight')"
                opacity="0.8"
              />
            </g>
            <path
              d="M -15 8 C -31 22 -27 50 0 52 C 27 50 31 22 15 8 Z"
              :fill="c('cloth-a')"
            />
            <path
              d="M 6 10 C 22 22 24 44 4 51 C 26 48 30 24 15 8 Z"
              :fill="c('ink')"
              opacity="0.18"
            />
            <path
              d="M -21 22 C -10 28 10 28 21 22"
              fill="none"
              :stroke="c('gold')"
              stroke-width="5"
              stroke-linecap="round"
            />
            <path
              d="M -17 8 Q -9 -1 -3 8 Q 3 -1 9 8 Q 13 2 17 8 L 15 14 L -15 14 Z"
              :fill="c('cloth-a')"
            />
            <path
              d="M -17 8 Q -9 -1 -3 8 Q 3 -1 9 8 Q 13 2 17 8"
              fill="none"
              :stroke="c('gold')"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
        </g>
      </template>
    </Figure>

    <!-- her gift: coins spill from the purse and settle on the ground. Anchor = the coin's lowest point (its contact with the ground) -->
    <g
      v-for="(k, i) in heap"
      :key="'coin' + i"
      data-part="coin"
      data-pivot
      :transform="`translate(${MOUTH[0]} ${MOUTH[1]})`"
    >
      <g :transform="`translate(0 ${-COIN_LIFT})`">
        <g data-part="coin-face" data-pivot>
          <ellipse cx="0" cy="4" rx="13" ry="13" :fill="c('gold-2')" />
          <ellipse cx="0" cy="0" rx="13" ry="13" :fill="c('gold')" />
          <ellipse
            cx="0"
            cy="0"
            rx="8.5"
            ry="8.5"
            fill="none"
            :stroke="c('gold-2')"
            stroke-width="2.5"
          />
          <path
            d="M -7 -4 A 9 9 0 0 1 3 -8"
            fill="none"
            :stroke="c('highlight')"
            stroke-width="2.5"
            stroke-linecap="round"
            opacity="0.9"
          />
        </g>
      </g>
    </g>
  </SceneStage>
</template>

<script setup lang="ts">
import { Backdrop, Figure, SceneStage, c, type SceneApi } from './kit'
import Tent from './kit/props/Tent.vue'

defineProps<{ period: string; title: string; initial?: string }>()

/** meadow ground line (the river starts ≈ 820) */
const GY = 790

/** fairy sparkles close around the pavilion: [x, y, scale] */
const sparks = [
  [915, 520, 1.1],
  [985, 380, 0.85],
  [1235, 405, 1.2],
  [1345, 540, 0.95],
  [1368, 680, 1.1],
  [890, 690, 0.8],
]

/** the lifted coin's centre sits this far above its contact point once it lies flat (rim included) */
const COIN_FLAT = 0.36
const COIN_LIFT = (13 + 4) * COIN_FLAT
/** where the coins leave the purse (stage coords): Lanval x 500, scale 0.9; purse mouth at figure (32, -119) */
const MOUTH = [529, 682]
/** where they come to rest: [x, height above the ground line] → the lowest point lands exactly on GY */
const heap: [number, number][] = [
  [566, 0],
  [588, 0],
  [610, 0],
  [632, 0],
  [577, 4],
  [599, 4],
  [621, 4],
  [588, 8],
  [610, 8],
]

function build({ tl, p, root, gsap, establish, sway, blink, turn }: SceneApi) {
  // lying on his side: the pose pivots at his feet, offset so his flank (not his middle) rests on the ground
  const lie = p('lanval', 'pose')
  const HALF = 76 // half the body's thickness
  tl.set(lie, { rotation: -90, x: -HALF, y: -HALF }, 0)
  tl.set(p('tent'), { scale: 0, opacity: 0 }, 0)
  tl.set(p('glimmer'), { scale: 0, opacity: 0 }, 0)
  tl.set(p('lady'), { opacity: 0, x: 960 }, 0)
  tl.set(p('spark'), { scale: 0, opacity: 0 }, 0)
  // the purse starts slack and empty
  const purse = p('lanval', 'purse')
  tl.set(purse, { scaleX: 0.82, scaleY: 0.55 }, 0)
  tl.set(p('lanval', 'purse-gold'), { opacity: 0, y: 8 }, 0)
  tl.set(p('lanval', 'purse-glow'), { opacity: 0, scale: 0.4 }, 0)
  const coins = Array.from(root.querySelectorAll<SVGGElement>(p('coin')))
  tl.set(coins, { opacity: 0, scale: 0.5 }, 0)

  establish()
  tl.from(p('ripple'), { x: -30, duration: 3, ease: 'none' }, 0)
  sway(p('clouds'), 0, undefined, 1, 3)
  blink('lanval', 0.3)

  // the pavilion appears, glittering
  tl.to(
    p('glimmer'),
    { scale: 1, opacity: 1, duration: 0.6, ease: 'power2.out' },
    0.7
  )
  tl.to(
    p('tent'),
    { scale: 1.2, opacity: 1, duration: 0.55, ease: 'back.out(1.8)' },
    0.75
  )
  sway(p('tent', 'pennant'), 1.2, undefined, 8, 0.6)
  tl.to(
    p('spark'),
    { scale: 1, opacity: 1, duration: 0.3, stagger: 0.1, ease: 'back.out(3)' },
    1.0
  )
  tl.to(
    p('spark'),
    {
      scale: 0.6,
      opacity: 0.7,
      duration: 0.26,
      yoyo: true,
      repeat: 3,
      stagger: 0.08,
      ease: 'sine.inOut',
    },
    1.5
  )

  // the lady steps out and beckons
  tl.to(
    p('lady'),
    { opacity: 1, x: 860, duration: 0.45, ease: 'power2.out' },
    1.3
  )
  turn(p('lady', 'arm-l'), 1.7, 110, 0.3, 'back.out(1.8)')
  tl.to(
    p('lady', 'arm-l'),
    { rotation: 85, duration: 0.18, yoyo: true, repeat: 3, ease: 'sine.inOut' },
    2.0
  )

  // Lanval lifts his head
  // …rising about his foot-side corner on the ground: x/y follow the sine of the angle so the body never leaves or sinks into the grass
  const rise = gsap.parseEase('power2.out')
  tl.to(lie, { rotation: 0, duration: 0.55, ease: 'power2.out' }, 1.75)
  tl.to(
    lie,
    {
      x: 0,
      duration: 0.55,
      ease: (t: number) => Math.sin((Math.PI / 2) * rise(t)),
    },
    1.75
  )
  tl.to(
    lie,
    {
      y: 0,
      duration: 0.55,
      ease: (t: number) => 1 - Math.cos((Math.PI / 2) * rise(t)),
    },
    1.75
  )
  tl.to(p('lanval', 'head'), { rotation: -8, duration: 0.2 }, 2.1)

  // her gift: the purse at his belt swells with gold…
  tl.to(
    purse,
    { scaleX: 1.12, scaleY: 1.18, duration: 0.28, ease: 'back.out(2.2)' },
    1.82
  )
  tl.to(p('lanval', 'purse-gold'), { opacity: 1, y: 0, duration: 0.2 }, 1.88)
  tl.to(
    p('lanval', 'purse-glow'),
    { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' },
    1.82
  )
  // …and spills over: coins arc out, drop to the ground at his feet and settle in a little heap
  const FLIGHT = 0.34
  coins.forEach((coin, i) => {
    const [lx, lift] = heap[i]!
    const ly = GY - lift
    const at = 2.05 + i * 0.04
    const face = coin.querySelector('[data-part="coin-face"]')
    tl.set(coin, { opacity: 1 }, at)
    tl.to(coin, { scale: 1, duration: 0.12, ease: 'power1.out' }, at)
    tl.to(coin, { x: lx, duration: FLIGHT, ease: 'none' }, at)
    tl.to(
      coin,
      {
        keyframes: [
          {
            y: MOUTH[1] - 50 - (i % 3) * 8,
            duration: FLIGHT * 0.4,
            ease: 'power2.out',
          },
          { y: ly, duration: FLIGHT * 0.6, ease: 'power2.in' },
        ],
      },
      at
    )
    tl.to(
      face,
      {
        keyframes: [
          { scaleY: 0.2, duration: FLIGHT * 0.35, ease: 'sine.inOut' },
          { scaleY: 0.9, duration: FLIGHT * 0.3, ease: 'sine.inOut' },
          { scaleY: COIN_FLAT, duration: FLIGHT * 0.35, ease: 'sine.in' },
        ],
      },
      at
    )
    // a tiny bounce as it lands, then it lies still on the ground line
    tl.to(
      coin,
      {
        keyframes: [
          { y: ly - 5, duration: 0.06, ease: 'power1.out' },
          { y: ly, duration: 0.06, ease: 'power1.in' },
        ],
      },
      at + FLIGHT
    )
  })
  // the purse settles and its glow fades
  tl.to(purse, { scaleX: 1, scaleY: 1, duration: 0.3, ease: 'power2.out' }, 2.4)
  tl.to(p('lanval', 'purse-glow'), { opacity: 0, duration: 0.4 }, 2.5)
}
</script>
