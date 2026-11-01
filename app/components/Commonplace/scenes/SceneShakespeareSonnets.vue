<!--
  Shakespeare's Sonnets — a poet writes while summer outside the window turns to autumn;
  everything fades but the page, which glows: "so long lives this".
-->
<template>
  <SceneStage :build="build">
    <Backdrop variant="study" :show-window="false" />

    <!-- the window onto the seasons: a round-headed casement, 20-wide frame all round, mullions on a
         grid, sill below; the view is clipped to the glass so the land runs to its bottom edge -->
    <KitPlace :x="1230" :y="120">
      <!-- sill and its shadow on the wall -->
      <rect
        x="-212"
        y="432"
        width="424"
        height="26"
        rx="4"
        :fill="c('wood-3')"
      />
      <rect
        x="-212"
        y="432"
        width="424"
        height="6"
        rx="3"
        :fill="c('highlight')"
        opacity="0.14"
      />
      <rect
        x="-196"
        y="458"
        width="392"
        height="8"
        :fill="c('ink')"
        opacity="0.1"
      />
      <!-- frame -->
      <path :d="`${arch(190, -10, 430)} Z`" :fill="c('wood-2')" />
      <clipPath id="ss-win"><path :d="`${arch(170, 10, 430)} Z`" /></clipPath>
      <g clip-path="url(#ss-win)">
        <rect
          class="cp-day"
          x="-170"
          y="10"
          width="340"
          height="420"
          :fill="c('sky')"
        />
        <g class="cp-night">
          <rect x="-170" y="10" width="340" height="420" :fill="c('night')" />
          <circle
            v-for="(s, i) in [
              [-120, 80, 3],
              [-60, 150, 2.5],
              [-110, 240, 2.5],
              [110, 70, 3],
              [120, 200, 2.5],
              [-20, 60, 2.5],
            ]"
            :key="i"
            :cx="s[0]"
            :cy="s[1]"
            :r="s[2]"
            :fill="c('star')"
          />
        </g>
        <g data-part="summer">
          <Celestial part="sun2" :x="40" :y="120" :scale="0.85" />
          <path
            d="M -170 320 C -90 280 -10 290 60 310 C 110 322 150 306 170 296 L 170 440 L -170 440 Z"
            :fill="c('far')"
          />
          <path
            d="M -170 360 C -80 326 60 356 170 334 L 170 440 L -170 440 Z"
            :fill="c('mid')"
          />
        </g>
        <g data-part="autumn" opacity="0">
          <rect
            class="cp-day"
            x="-170"
            y="10"
            width="340"
            height="420"
            :fill="c('glow-2')"
            opacity="0.55"
          />
          <rect
            class="cp-night"
            x="-170"
            y="10"
            width="340"
            height="420"
            :fill="c('cloth-d')"
            opacity="0.3"
          />
          <path
            d="M -170 320 C -90 280 -10 290 60 310 C 110 322 150 306 170 296 L 170 440 L -170 440 Z"
            :fill="c('gold')"
          />
          <path
            d="M -170 360 C -80 326 60 356 170 334 L 170 440 L -170 440 Z"
            :fill="c('gold-2')"
          />
          <path
            class="cp-night"
            d="M -170 320 C -90 280 -10 290 60 310 C 110 322 150 306 170 296 L 170 440 L -170 440 Z"
            :fill="c('ink')"
            opacity="0.4"
          />
          <g v-for="(l, i) in leaves" :key="i" data-part="leaf">
            <path
              :d="'M 0 -16 C 14 -6 14 10 0 20 C -14 10 -14 -6 0 -16 Z'"
              :fill="c(l.col)"
              :transform="`translate(${l.x} ${l.y}) rotate(${l.r})`"
            />
          </g>
        </g>
        <!-- glass edge shading -->
        <path
          :d="`${arch(170, 10, 430)} Z`"
          fill="none"
          :stroke="c('ink')"
          stroke-width="6"
          opacity="0.14"
        />
      </g>
      <!-- muntins: one upright and a bar at the spring of the arch, both 10 wide -->
      <path
        d="M 0 10 L 0 430 M -170 180 L 170 180"
        :stroke="c('wood-2')"
        stroke-width="10"
      />
    </KitPlace>

    <!-- the glowing page -->
    <KitPlace part="page-halo" :x="760" :y="330">
      <circle r="250" :fill="c('glow')" opacity="0.28" />
      <circle r="170" :fill="c('glow')" opacity="0.3" />
    </KitPlace>
    <Scroll part="page" :x="760" :y="170" :width="200" :length="320" />

    <!-- desk first, so the poet's writing hand rests in front of it -->
    <Table :x="680" :y="790" :width="320" cloth="cloth-a" :items="false" />
    <Goblet :x="730" :y="652" :scale="0.8" />
    <Candle :x="800" :y="654" :h="90" />

    <Figure
      part="poet"
      :x="420"
      :y="790"
      :scale="1.15"
      robe="cloth-b"
      trim="gold"
      hat="cap"
      hat-color="cloth-d"
      hair-color="hair"
      beard
      mood="neutral"
      :look="1"
      :tilt="6"
      :arm-r="-30"
    >
      <!-- the nib points along the forearm; the fist closes round the shaft -->
      <template #hand-r><Quill :rotate="-28" :y="70" :scale="0.55" /></template>
    </Figure>
  </SceneStage>
</template>

<script setup lang="ts">
import {
  Backdrop,
  Candle,
  Celestial,
  Figure,
  Goblet,
  KitPlace,
  Quill,
  Scroll,
  SceneStage,
  Table,
  c,
  type SceneApi,
} from './kit'

defineProps<{ period: string; title: string; initial?: string }>()
/** round-headed window outline (open path): half-width `w`, semicircular head with its top at `top`, straight sides down to `bottom` */
const arch = (w: number, top: number, bottom: number) =>
  `M ${-w} ${bottom} L ${-w} ${top + w} A ${w} ${w} 0 0 1 ${w} ${top + w} L ${w} ${bottom}`
const leaves = [
  { x: -90, y: 80, r: 20, col: 'cloth-a' },
  { x: -20, y: 40, r: -30, col: 'gold' },
  { x: 60, y: 60, r: 50, col: 'glow-2' },
  { x: 110, y: 100, r: 10, col: 'cloth-a' },
  { x: -50, y: 150, r: 80, col: 'gold' },
  { x: 20, y: 130, r: -10, col: 'glow-2' },
]

function build({ tl, p, establish, flicker, blink, turn, bob }: SceneApi) {
  tl.set(p('page-halo'), { opacity: 0, scale: 0.6 }, 0)
  tl.set(p('page', 'paper'), { scaleY: 0, transformOrigin: '50% 0%' }, 0)
  tl.set(p('page', 'roller-b'), { y: 0 }, 0)
  tl.set(`${p('page', 'lines')} path`, { opacity: 0 }, 0)

  establish()
  flicker(p('flame'), 0)
  bob(p('poet'), 0, undefined, 2, 1.6)
  blink('poet', 0.5)

  // writing
  tl.to(
    p('page', 'paper'),
    { scaleY: 1, duration: 0.5, ease: 'power2.out' },
    0.3
  )
  tl.from(
    p('page', 'roller-b'),
    { y: -320, duration: 0.5, ease: 'power2.out' },
    0.3
  )
  turn(p('poet', 'arm-r'), 0.5, -65, 0.2, 'sine.inOut')
  tl.to(
    p('poet', 'arm-r'),
    {
      rotation: -70,
      duration: 0.14,
      yoyo: true,
      repeat: 7,
      ease: 'sine.inOut',
    },
    0.7
  )
  tl.to(
    `${p('page', 'lines')} path`,
    { opacity: 0.55, duration: 0.12, stagger: 0.08 },
    0.6
  )

  // summer dims to autumn
  tl.to(p('sun2'), { y: '+=170', duration: 1.2, ease: 'power1.inOut' }, 1.0)
  tl.to(p('autumn'), { opacity: 1, duration: 0.9, ease: 'power1.inOut' }, 1.0)
  tl.fromTo(
    p('leaf'),
    { y: -140, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'sine.in' },
    1.1
  )
  tl.to(
    p('leaf'),
    {
      rotation: 25,
      duration: 0.5,
      yoyo: true,
      repeat: 1,
      ease: 'sine.inOut',
      stagger: 0.1,
    },
    1.4
  )

  // the page glows and stays
  tl.to(
    p('page-halo'),
    { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' },
    1.9
  )
  tl.to(p('page'), { scale: 1.12, duration: 0.5, ease: 'back.out(1.6)' }, 1.9)
}
</script>
