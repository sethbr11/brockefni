<template>
  <g>
    <rect width="1600" height="900" :fill="c('stone')" />
    <path
      :d="brickPath"
      fill="none"
      :stroke="c('stone-2')"
      stroke-width="4"
      opacity="0.45"
    />
    <g
      v-for="wx in [400, 800, 1200]"
      :key="wx"
      :transform="`translate(${wx} 0)`"
    >
      <path
        d="M -78 470 L -78 210 Q -78 120 0 92 Q 78 120 78 210 L 78 470 Z"
        :fill="c('stone-3')"
      />
      <g v-for="m in modes" :key="m" :class="cls(m)">
        <path
          d="M -60 456 L -60 214 Q -60 140 0 116 Q 60 140 60 214 L 60 456 Z"
          :fill="c(m === 'night' ? 'night' : 'sky')"
        />
        <template v-if="m === 'night'">
          <circle cx="22" cy="190" r="16" :fill="c('moon')" opacity="0.9" />
          <circle cx="-26" cy="260" r="3" :fill="c('star')" />
          <circle cx="30" cy="330" r="2.5" :fill="c('star')" />
          <circle cx="-14" cy="380" r="3" :fill="c('star')" />
        </template>
        <template v-else>
          <path
            d="M -60 456 L -60 400 C -30 380 20 410 60 392 L 60 456 Z"
            :fill="c('far')"
          />
          <circle cx="22" cy="190" r="26" :fill="c('sun')" opacity="0.28" />
          <circle cx="22" cy="190" r="16" :fill="c('sun')" />
          <path
            :d="cloud"
            :fill="c('highlight')"
            opacity="0.9"
            transform="translate(-14 290) scale(0.28)"
          />
        </template>
      </g>
      <path
        d="M 0 116 L 0 456 M -60 300 L 60 300"
        :stroke="c('stone-3')"
        stroke-width="8"
      />
    </g>
    <g data-part="banners">
      <g
        v-for="(b, i) in banners"
        :key="i"
        :transform="`translate(${b.x} 150)`"
      >
        <g data-part="banner" data-pivot>
          <rect
            x="-62"
            y="-8"
            width="124"
            height="14"
            rx="7"
            :fill="c('wood-2')"
          />
          <path
            d="M -50 0 L 50 0 L 50 250 L 0 216 L -50 250 Z"
            :fill="c(b.k)"
          />
          <path
            d="M 18 0 L 50 0 L 50 250 L 18 228 Z"
            :fill="c('ink')"
            opacity="0.12"
          />
          <circle cx="0" cy="96" r="26" :fill="c(b.e)" />
          <path d="M -50 22 L 50 22" :stroke="c(b.e)" stroke-width="6" />
        </g>
      </g>
    </g>
    <rect x="0" y="600" width="1600" height="300" :fill="c('stone-2')" />
    <rect
      x="0"
      y="600"
      width="1600"
      height="12"
      :fill="c('ink')"
      opacity="0.2"
    />
    <g :fill="c('stone')" opacity="0.5">
      <rect
        v-for="(t, i) in tiles"
        :key="i"
        :x="t.x"
        :y="t.y"
        :width="t.w"
        :height="t.h"
      />
    </g>
    <!-- sunbeams by day, moonbeams + a warm hearth-glow by night -->
    <g v-for="m in modes" :key="m" :class="cls(m)" pointer-events="none">
      <path
        v-for="wx in [400, 800, 1200]"
        :key="wx"
        :d="`M ${wx - 56} 130 L ${wx + 56} 130 L ${wx + 300} 760 L ${wx + 120} 760 Z`"
        :fill="c(m === 'night' ? 'moon' : 'sun')"
        :opacity="m === 'night' ? 0.07 : 0.13"
      />
      <g v-if="m === 'night'" :fill="c('glow')">
        <ellipse cx="800" cy="640" rx="760" ry="200" opacity="0.06" />
        <ellipse cx="800" cy="660" rx="520" ry="140" opacity="0.07" />
        <ellipse cx="1150" cy="560" rx="320" ry="160" opacity="0.07" />
      </g>
    </g>
  </g>
</template>

<script setup lang="ts">
import { c } from '../util'
import { brickPath, cloud } from './shared'
import { useBackdropTime, type Time } from './useBackdropTime'

const props = withDefaults(defineProps<{ time?: Time; night?: boolean }>(), {
  time: 'auto',
  night: false,
})

const { modes, cls } = useBackdropTime(props)

const banners = [
  { x: 200, k: 'period', e: 'gold' },
  { x: 600, k: 'red', e: 'gold' },
  { x: 1000, k: 'cloth-b', e: 'gold' },
  { x: 1400, k: 'period', e: 'gold' },
]

const tiles = (() => {
  const out: { x: number; y: number; w: number; h: number }[] = []
  const rows = [
    { y: 612, h: 70, w: 100 },
    { y: 682, h: 90, w: 130 },
    { y: 772, h: 128, w: 170 },
  ]
  rows.forEach((row, ri) => {
    for (let x = ri % 2 ? 0 : -row.w / 2, k = 0; x < 1600; x += row.w, k++)
      if (k % 2) out.push({ x, y: row.y, w: row.w, h: row.h })
  })
  return out
})()
</script>
