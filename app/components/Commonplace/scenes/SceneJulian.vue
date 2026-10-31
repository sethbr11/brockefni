<!--
  Julian of Norwich — an anchoress in her cell, a window opening onto the church; in her palm
  a tiny thing "like a hazelnut" glows, and warm light fills the room: all shall be well.
-->
<template>
  <SceneStage :build="build">
    <Backdrop variant="parchment" />

    <!-- cell walls and floor -->
    <rect y="760" width="1600" height="140" :fill="c('stone-3')" />
    <rect x="0" y="0" width="1600" height="770" :fill="c('stone-2')" />
    <g :stroke="c('stone-3')" stroke-width="4" opacity="0.45">
      <path v-for="i in 7" :key="i" :d="`M 0 ${i * 110} L 1600 ${i * 110}`" />
    </g>

    <!-- window onto the church -->
    <g transform="translate(1200 440)">
      <g class="cp-day">
        <path
          d="M -150 330 L -150 -80 A 150 150 0 0 1 150 -80 L 150 330 Z"
          :fill="c('sky')"
        />
        <circle cx="70" cy="-40" r="64" :fill="c('sun')" opacity="0.22" />
        <circle cx="70" cy="-40" r="38" :fill="c('sun')" />
        <path
          d="M -130 40 C -140 10 -100 4 -88 22 C -80 -2 -44 -2 -38 22 C -14 18 -4 44 -20 50 L -126 50 Z"
          :fill="c('highlight')"
          opacity="0.9"
        />
      </g>
      <g class="cp-night">
        <path
          d="M -150 330 L -150 -80 A 150 150 0 0 1 150 -80 L 150 330 Z"
          :fill="c('night')"
        />
        <circle cx="70" cy="-40" r="64" :fill="c('moon')" opacity="0.14" />
        <circle cx="70" cy="-40" r="34" :fill="c('moon')" />
        <circle
          v-for="(s, i) in [
            [-90, -40, 3],
            [-40, -90, 2.5],
            [-100, 60, 2.5],
            [10, 20, 3],
            [-30, 130, 2.5],
            [110, 110, 3],
          ]"
          :key="i"
          :cx="s[0]"
          :cy="s[1]"
          :r="s[2]"
          :fill="c('star')"
        />
      </g>
      <path d="M -150 330 L 150 330 L 150 250 L -150 250 Z" :fill="c('far')" />
      <path
        d="M -80 250 L -80 100 L -50 100 L -50 20 L 0 -90 L 50 20 L 50 100 L 80 100 L 80 250 Z"
        :fill="c('stone-3')"
      />
      <g class="cp-night" :fill="c('glow')">
        <path d="M -10 78 L -10 52 Q 0 40 10 52 L 10 78 Z" />
        <path
          v-for="x in [-66, -26, 14, 54]"
          :key="x"
          :d="`M ${x} 170 L ${x} 148 Q ${x + 6} 138 ${x + 12} 148 L ${x + 12} 170 Z`"
        />
      </g>
      <path
        d="M 0 -90 L 0 -140 M -16 -118 L 16 -118"
        :stroke="c('stone-3')"
        stroke-width="7"
        stroke-linecap="round"
      />
      <path
        d="M -150 330 L -150 -80 A 150 150 0 0 1 150 -80 L 150 330 Z"
        fill="none"
        :stroke="c('stone')"
        stroke-width="20"
      />
    </g>

    <!-- the warm light -->
    <g data-part="warmth" data-pivot transform="translate(660 520)">
      <g data-part="warm-rays" data-pivot>
        <path
          v-for="i in 12"
          :key="i"
          d="M 0 -120 L 16 -420 L -16 -420 Z"
          :fill="c('glow')"
          opacity="0.4"
          :transform="`rotate(${i * 30})`"
        />
      </g>
      <circle r="260" :fill="c('glow')" opacity="0.28" />
      <circle r="150" :fill="c('glow')" opacity="0.4" />
    </g>

    <Candle part="candle" :x="320" :y="770" :scale="1.1" />
    <Cat part="cat" :x="1000" :y="790" :scale="0.9" color="wood-3" flip />

    <Figure
      part="julian"
      :x="620"
      :y="800"
      body="robe"
      robe="ink"
      sleeve="ink"
      trim="cloth-c"
      hat="wimple"
      hat-color="cloth-c"
      mood="happy"
      :arm-l="35"
      :arm-r="-55"
      :tilt="-6"
      :look="0.4"
    >
      <!-- glow behind the palm; the hazelnut itself rests in front of it -->
      <template #hand-r>
        <g data-part="nut" data-pivot
          ><circle r="34" :fill="c('glow')" opacity="0.6"
        /></g>
      </template>
      <template #held-r>
        <g data-part="nut" data-pivot>
          <ellipse cx="0" cy="-2" rx="11" ry="13" :fill="c('wood-3')" />
          <path
            d="M -9 -10 Q 0 -19 9 -10"
            fill="none"
            :stroke="c('wood-2')"
            stroke-width="3.5"
          />
        </g>
      </template>
    </Figure>
  </SceneStage>
</template>

<script setup lang="ts">
import {
  Backdrop,
  Candle,
  Cat,
  Figure,
  SceneStage,
  c,
  type SceneApi,
} from './kit'

defineProps<{ period: string; title: string; initial?: string }>()

function build({ tl, p, establish, flicker, bob, blink, turn }: SceneApi) {
  tl.set(p('warmth'), { scale: 0, opacity: 0 }, 0)
  tl.set(p('nut'), { scale: 0 }, 0)

  establish()
  flicker(p('candle', 'flame'), 0)
  flicker(p('candle', 'halo'), 0.05)
  tl.to(
    p('cat', 'tail'),
    { rotation: 12, duration: 0.6, yoyo: true, repeat: 3, ease: 'sine.inOut' },
    0
  )
  blink('julian', 0.3)

  // she opens her hand
  turn(p('julian', 'arm-r'), 0.7, -125, 0.45, 'power2.out')
  tl.to(p('nut'), { scale: 1, duration: 0.35, ease: 'back.out(2)' }, 1.0)

  // it glows; warm light spreads
  tl.to(
    p('warmth'),
    { scale: 1, opacity: 1, duration: 0.9, ease: 'power2.out' },
    1.2
  )
  tl.to(p('warm-rays'), { rotation: 40, duration: 3, ease: 'none' }, 1.2)
  tl.to(
    p('nut'),
    { scale: 1.25, duration: 0.3, yoyo: true, repeat: 3, ease: 'sine.inOut' },
    1.4
  )
  turn(p('julian', 'head'), 1.8, 6, 0.4)
  bob(p('warmth'), 2.2, undefined, 6, 1.2)
}
</script>
