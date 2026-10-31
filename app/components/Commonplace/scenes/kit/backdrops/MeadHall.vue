<template>
  <g>
    <rect width="1600" height="900" :fill="c('wood')" />
    <rect
      v-for="i in 20"
      :key="i"
      :x="i * 80 - 40"
      y="0"
      width="5"
      height="720"
      :fill="c('wood-2')"
      opacity="0.35"
    />
    <path
      d="M 0 0 L 1600 0 L 1600 270 L 800 -30 L 0 270 Z"
      :fill="c('wood-2')"
    />
    <path
      d="M -20 286 L 800 -22 L 1620 286"
      fill="none"
      :stroke="c('wood-3')"
      stroke-width="30"
    />
    <rect x="0" y="236" width="1600" height="30" :fill="c('wood-3')" />
    <rect
      x="0"
      y="262"
      width="1600"
      height="10"
      :fill="c('ink')"
      opacity="0.2"
    />
    <!-- wall shields -->
    <g
      v-for="(s, i) in [
        { x: 320, k: 'cloth-a' },
        { x: 520, k: 'gold' },
        { x: 720, k: 'cloth-b' },
        { x: 920, k: 'cloth-a' },
      ]"
      :key="i"
      :transform="`translate(${s.x} 360)`"
    >
      <circle r="54" :fill="c(s.k)" />
      <circle r="54" fill="none" :stroke="c('wood-2')" stroke-width="7" />
      <circle r="16" :fill="c('metal')" />
      <path
        d="M 0 -54 L 0 54 M -54 0 L 54 0"
        :stroke="c('ink')"
        stroke-width="3"
        opacity="0.15"
      />
    </g>
    <!-- posts -->
    <rect x="110" y="250" width="56" height="480" :fill="c('wood-2')" />
    <rect x="1124" y="250" width="56" height="480" :fill="c('wood-2')" />
    <!-- floor -->
    <rect x="0" y="715" width="1600" height="185" :fill="c('wood-2')" />
    <rect
      x="0"
      y="715"
      width="1600"
      height="8"
      :fill="c('ink')"
      opacity="0.25"
    />
    <path
      d="M 0 790 L 1600 790 M 0 860 L 1600 860"
      :stroke="c('ink')"
      stroke-width="4"
      opacity="0.15"
    />
    <!-- hearth glow on the wall -->
    <g
      data-part="glow"
      data-pivot
      transform="translate(500 700)"
      :fill="c('glow')"
    >
      <circle r="380" opacity="0.07" />
      <circle r="270" opacity="0.08" />
      <circle r="170" opacity="0.1" />
    </g>

    <!-- doorway -->
    <g :clip-path="`url(#${uid}-door)`">
      <g v-for="m in modes" :key="m" :class="cls(m)">
        <rect
          x="1200"
          y="320"
          width="240"
          height="400"
          :fill="c(m === 'night' ? 'night' : 'sky')"
        />
        <rect
          x="1200"
          y="560"
          width="240"
          height="160"
          :fill="c(m === 'night' ? 'night-2' : 'sky-2')"
        />
        <template v-if="m === 'night'">
          <circle cx="1390" cy="410" r="22" :fill="c('moon')" />
          <circle
            v-for="(s, i) in stars.slice(0, 6)"
            :key="i"
            :cx="1210 + (s.x % 220)"
            :cy="350 + (s.y % 150)"
            :r="s.r * 0.8"
            :fill="c('star')"
          />
        </template>
        <template v-else>
          <circle cx="1390" cy="410" r="40" :fill="c('sun')" opacity="0.25" />
          <circle cx="1390" cy="410" r="24" :fill="c('sun')" />
          <path
            :d="cloud"
            :fill="c('highlight')"
            opacity="0.85"
            transform="translate(1300 380) scale(0.3)"
          />
        </template>
      </g>
      <path
        d="M 1200 640 C 1260 610 1320 630 1440 600 L 1440 720 L 1200 720 Z"
        :fill="c('ink')"
        opacity="0.55"
      />
      <slot name="doorway" />
    </g>
    <clipPath :id="`${uid}-door`">
      <path :d="doorPath" />
    </clipPath>
    <path :d="doorPath" fill="none" :stroke="c('wood-3')" stroke-width="24" />
    <path
      :d="doorPath"
      fill="none"
      :stroke="c('ink')"
      stroke-width="4"
      opacity="0.25"
      transform="translate(4 4)"
    />
    <!-- antlers of Heorot -->
    <g :fill="c('gold')" transform="translate(1315 300)">
      <path
        d="M -8 0 C -40 -10 -70 -40 -80 -90 L -68 -92 C -62 -64 -52 -48 -40 -38 C -44 -58 -42 -74 -34 -88 L -24 -84 C -30 -64 -26 -44 -14 -26 C -10 -18 -2 -12 6 -8 Z"
      />
      <path
        d="M 8 0 C 40 -10 70 -40 80 -90 L 68 -92 C 62 -64 52 -48 40 -38 C 44 -58 42 -74 34 -88 L 24 -84 C 30 -64 26 -44 14 -26 C 10 -18 2 -12 -6 -8 Z"
      />
    </g>
    <!-- moonlight spilling in -->
    <g
      v-if="mode !== 'day'"
      data-part="moonlight"
      :class="mode === 'auto' ? 'cp-night' : undefined"
      :opacity="doorOpen ? 1 : 0"
    >
      <path
        d="M 1206 718 L 1426 718 L 1150 900 L 640 900 Z"
        :fill="c('moon')"
        opacity="0.28"
      />
    </g>
    <!-- door panel (hinge on the left; tween scaleX → ~0.1 to swing open) -->
    <g transform="translate(1200 0)">
      <g
        data-part="door"
        data-pivot
        :transform="doorOpen ? 'scale(0.1 1)' : undefined"
      >
        <path :d="doorPanel" :fill="c('wood-3')" />
        <path
          v-for="x in [55, 110, 165]"
          :key="x"
          :d="`M ${x} 340 L ${x} 715`"
          :stroke="c('wood')"
          stroke-width="5"
        />
        <rect x="0" y="430" width="230" height="16" :fill="c('metal-2')" />
        <rect x="0" y="610" width="230" height="16" :fill="c('metal-2')" />
        <circle cx="196" cy="530" r="10" :fill="c('metal-2')" />
      </g>
    </g>
    <!-- hearth -->
    <g transform="translate(500 790)">
      <ellipse cx="0" cy="10" rx="170" ry="34" :fill="c('stone-2')" />
      <ellipse cx="0" cy="4" rx="140" ry="22" :fill="c('ink')" opacity="0.5" />
      <Fire part="fire" :y="10" :scale="0.95" />
      <g :fill="c('stone')">
        <ellipse
          v-for="(s, i) in hearthStones"
          :key="i"
          :cx="s.x"
          :cy="s.y"
          :rx="s.r"
          :ry="s.r * 0.6"
        />
      </g>
    </g>
  </g>
</template>

<script setup lang="ts">
import { useId } from 'vue'
import Fire from '../props/Fire.vue'
import { c } from '../util'
import { cloud, stars } from './shared'
import { useBackdropTime, type Time } from './useBackdropTime'

const props = withDefaults(
  defineProps<{ time?: Time; night?: boolean; doorOpen?: boolean }>(),
  { time: 'auto', night: false, doorOpen: false }
)

const uid = `cp-bd-${useId()}`
const { mode, modes, cls } = useBackdropTime(props)

const doorPath =
  'M 1200 718 L 1200 400 Q 1200 330 1315 330 Q 1430 330 1430 400 L 1430 718 Z'
const doorPanel =
  'M 0 718 L 0 400 Q 0 330 115 330 Q 230 330 230 400 L 230 718 Z'
const hearthStones = Array.from({ length: 9 }, (_, i) => {
  const a = Math.PI * (i / 8)
  return { x: Math.cos(a) * 160, y: 10 + Math.sin(a) * 30, r: 22 + (i % 3) * 4 }
})
</script>
