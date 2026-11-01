<!--
  The Blazing World — a ship drifts through icy polar seas toward a portal in the sky; beyond it,
  a glowing world with two suns, and an Empress crowned with stars.
-->
<template>
  <SceneStage :build="build">
    <Backdrop variant="sea" :celestial="[430, 175]" />

    <!-- aurora -->
    <g class="cp-night">
      <g data-part="aurora" opacity="0.5">
        <path
          d="M 0 250 C 300 120 500 300 800 180 C 1100 60 1300 240 1600 120 L 1600 220 C 1300 340 1100 160 800 280 C 500 400 300 220 0 360 Z"
          :fill="c('green')"
          opacity="0.4"
        />
        <path
          d="M 0 330 C 300 200 500 380 800 260 C 1100 140 1300 320 1600 200 L 1600 250 C 1300 370 1100 190 800 310 C 500 430 300 250 0 400 Z"
          :fill="c('cloth-d')"
          opacity="0.4"
        />
      </g>
    </g>

    <!-- the portal and the world beyond -->
    <KitPlace part="portal" :x="1170" :y="280">
      <circle r="230" :fill="c('glow')" opacity="0.25" />
      <circle r="190" :fill="c('glow-2')" opacity="0.5" />
      <clipPath id="bw-clip"><circle r="170" /></clipPath>
      <g clip-path="url(#bw-clip)">
        <rect x="-170" y="-170" width="340" height="340" :fill="c('sky-2')" />
        <circle cx="-60" cy="-70" r="46" :fill="c('sun')" />
        <circle cx="70" cy="-30" r="28" :fill="c('glow-2')" />
        <path
          d="M -170 60 C -80 10 40 70 170 20 L 170 170 L -170 170 Z"
          :fill="c('mid')"
        />
        <path
          d="M -170 110 C -60 70 60 130 170 90 L 170 170 L -170 170 Z"
          :fill="c('near')"
        />
      </g>
      <circle r="172" fill="none" :stroke="c('gold')" stroke-width="10" />
    </KitPlace>

    <!-- ice floes -->
    <g :fill="c('foam')">
      <path d="M 120 600 L 250 580 L 330 610 L 240 630 Z" />
      <path d="M 640 640 L 780 610 L 880 650 L 760 668 Z" />
      <path d="M 980 590 L 1100 570 L 1170 600 L 1060 616 Z" />
    </g>

    <Ship part="ship" :x="330" :y="590" :scale="0.8" />

    <!-- the Empress -->
    <KitPlace part="empress" :x="1230" :y="650">
      <ellipse cx="0" cy="6" rx="190" ry="26" :fill="c('foam')" />
      <Figure
        part="queen"
        :scale="0.8"
        hair="long"
        hair-color="ink"
        robe="cloth-d"
        trim="gold"
        cape="cloth-a"
        hat="crown"
        mood="happy"
        :arm-r="-40"
      />
      <g data-part="stars" :transform="'translate(0 -288)'">
        <path
          v-for="(s, i) in starPos"
          :key="i"
          data-part="star"
          :d="star"
          :fill="c('star')"
          :transform="`translate(${s[0]} ${s[1]}) scale(${s[2]})`"
        />
      </g>
    </KitPlace>
  </SceneStage>
</template>

<script setup lang="ts">
import {
  Backdrop,
  Figure,
  KitPlace,
  SceneStage,
  Ship,
  c,
  type SceneApi,
} from './kit'

defineProps<{ period: string; title: string; initial?: string }>()
const starPos = [
  [-70, 6, 1],
  [-36, -22, 1.3],
  [0, -34, 1.6],
  [36, -22, 1.3],
  [70, 6, 1],
]
const star =
  'M 0 -12 L 3.5 -4 L 12 -3.5 L 5.5 2.5 L 7.5 11 L 0 6.5 L -7.5 11 L -5.5 2.5 L -12 -3.5 L -3.5 -4 Z'

function build({ tl, p, establish, bob, sway, blink }: SceneApi) {
  tl.set(p('portal'), { scale: 0, opacity: 0 }, 0)
  tl.set(p('empress'), { opacity: 0, y: '+=60' }, 0)
  establish()
  bob(p('ship'), 0, undefined, 6, 1.3)
  sway(p('ship'), 0, undefined, 2, 1.8)
  tl.to(p('ship'), { x: 760, duration: 2.4, ease: 'power1.inOut' }, 0.1)

  // the portal opens in the polar sky
  tl.to(
    p('portal'),
    { scale: 1, opacity: 1, duration: 0.7, ease: 'back.out(1.5)' },
    0.8
  )
  tl.to(p('aurora'), { opacity: 0.9, duration: 0.8 }, 0.8)

  // the Empress appears, crowned with stars
  tl.to(
    p('empress'),
    { opacity: 1, y: '-=60', duration: 0.5, ease: 'power2.out' },
    1.7
  )
  tl.from(
    p('star'),
    { scale: 0, opacity: 0, duration: 0.3, stagger: 0.08, ease: 'back.out(3)' },
    2.1
  )
  tl.to(
    p('star'),
    { y: -6, duration: 0.2, yoyo: true, repeat: 1, stagger: 0.05 },
    2.5
  )
  blink('queen', 2.4)
}
</script>
