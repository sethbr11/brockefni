<!--
  Paradise Lost — Satan falls from heaven through fire into the burning lake, rises on
  flaming wings, and glimpses Eden's tree and its serpent.
-->
<template>
  <SceneStage :build="build">
    <!-- Hell: "no light, but rather darkness visible" — a smoky vault lit from the lake below -->
    <defs>
      <linearGradient :id="glowId" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0.2" :stop-color="c('red')" stop-opacity="0" />
        <stop offset="0.55" :stop-color="c('red')" stop-opacity="0.22" />
        <stop offset="0.75" :stop-color="c('glow-2')" stop-opacity="0.4" />
      </linearGradient>
    </defs>
    <rect width="1600" height="900" :fill="c('ink')" />
    <rect width="1600" height="900" :fill="`url(#${glowId})`" />
    <path
      v-for="(d, i) in smoke"
      :key="i"
      :d="d"
      :fill="c('stone-2')"
      opacity="0.12"
    />

    <!-- heaven's light, top-left -->
    <KitPlace part="heaven" :x="200" :y="60">
      <circle r="320" :fill="c('glow')" opacity="0.25" />
      <circle r="190" :fill="c('highlight')" opacity="0.45" />
      <path
        d="M 40 40 C 120 60 220 30 300 80 C 240 120 120 110 40 40 Z"
        :fill="c('highlight')"
        opacity="0.8"
      />
    </KitPlace>

    <!-- the burning lake -->
    <g data-part="lake">
      <rect x="0" y="640" width="1600" height="260" :fill="c('cloth-a')" />
      <path
        d="M 0 640 C 150 610 250 670 400 640 C 550 610 650 670 800 640 C 950 610 1050 670 1200 640 C 1350 610 1450 670 1600 640 L 1600 700 L 0 700 Z"
        :fill="c('glow-2')"
      />
      <path
        d="M 0 720 C 200 700 300 740 500 720 C 700 700 800 740 1000 720 C 1200 700 1300 740 1600 720 L 1600 900 L 0 900 Z"
        :fill="c('red')"
        opacity="0.8"
      />
    </g>
    <g data-part="flames">
      <path
        v-for="(f, i) in flames"
        :key="i"
        data-part="lick"
        :d="`M ${f} 660 C ${f - 30} 600 ${f + 10} 570 ${f} 520 C ${f + 50} 580 ${f + 40} 620 ${f + 30} 660 Z`"
        :fill="c(i % 2 ? 'glow' : 'glow-2')"
        opacity="0.9"
      />
    </g>

    <!-- Eden, a glimpse -->
    <KitPlace part="eden" :x="1300" :y="300">
      <circle r="190" :fill="c('sky-2')" />
      <Tree kind="apple" :y="140" :scale="0.6" leaves="green-3" />
      <Serpent :x="-22" :y="138" :scale="0.45" color="green-4" pattern />
      <circle r="192" fill="none" :stroke="c('gold')" stroke-width="10" />
    </KitPlace>

    <Figure
      part="satan"
      :x="300"
      :y="-200"
      :scale="1.2"
      body="robe"
      skin="skin-2"
      robe="ink"
      trim="cloth-a"
      hair="long"
      hair-color="ink"
      wings
      wing-color="glow-2"
      mood="stern"
      :arm-l="20"
      :arm-r="-20"
    />
    <Burst part="splash" :x="640" :y="640" :scale="1.1" color="glow" />
  </SceneStage>
</template>

<script setup lang="ts">
import { useId } from 'vue'
import {
  Burst,
  Figure,
  KitPlace,
  SceneStage,
  Serpent,
  Tree,
  c,
  type SceneApi,
} from './kit'

defineProps<{ period: string; title: string; initial?: string }>()
const glowId = `cp-hell-glow-${useId()}`
const flames = [80, 260, 440, 880, 1060, 1240, 1440]
/** drifting smoke under the vault */
const smoke = [
  'M -60 220 C 80 150 260 170 360 230 C 470 190 640 210 700 280 C 520 320 160 310 -60 290 Z',
  'M 760 140 C 900 80 1080 100 1180 160 C 1300 130 1500 150 1660 210 C 1420 260 1000 250 760 210 Z',
  'M 300 440 C 460 390 640 400 740 450 C 860 420 1040 430 1120 480 C 880 520 500 510 300 490 Z',
]

function build({ tl, p, establish, flicker, shake, pop, turn }: SceneApi) {
  tl.set(p('splash'), { scale: 0, opacity: 0 }, 0)
  tl.set(p('eden'), { scale: 0, opacity: 0 }, 0)
  tl.set(p('satan', 'pose'), { rotation: 150 }, 0)
  establish()
  flicker(p('lick'), 0)
  flicker(p('wing-l'), 0.1)
  flicker(p('wing-r'), 0.15)

  // the fall
  tl.to(p('satan'), { x: 640, y: 420, duration: 0.8, ease: 'power2.in' }, 0.3)
  tl.to(
    p('satan', 'pose'),
    { rotation: 190, duration: 0.8, ease: 'sine.in' },
    0.3
  )
  tl.to(p('heaven'), { opacity: 0.4, duration: 0.8 }, 0.3)

  // splash in the lake
  pop(p('splash'), 1.1, 0.3)
  shake(1.1, 18)
  tl.to(p('satan'), { y: 760, duration: 0.2, ease: 'power2.out' }, 1.05)
  tl.to(p('satan', 'pose'), { rotation: 360, duration: 0.2 }, 1.05)
  tl.to(p('splash'), { opacity: 0, scale: 1.5, duration: 0.25 }, 1.4)

  // he rises on burning wings
  tl.set(p('satan', 'pose'), { rotation: 0 }, 1.4)
  tl.to(p('satan'), { y: 800, x: 640, duration: 0.1 }, 1.4)
  tl.to(p('satan'), { y: 660, duration: 0.5, ease: 'back.out(1.6)' }, 1.45)
  turn(p('satan', 'wing-l'), 1.5, 0, 0.1)
  tl.to(
    [p('satan', 'wing-l'), p('satan', 'wing-r')].join(','),
    { scale: 1.25, duration: 0.35, yoyo: true, repeat: 1, ease: 'power2.out' },
    1.6
  )
  turn(p('satan', 'arm-r'), 1.7, -150, 0.4, 'back.out(1.6)')

  // a glimpse of Eden
  tl.to(
    p('eden'),
    { scale: 1, opacity: 1, duration: 0.55, ease: 'back.out(1.6)' },
    1.95
  )
  tl.to(p('satan', 'head'), { rotation: 14, duration: 0.3 }, 2.2)
}
</script>
