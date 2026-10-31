<template>
  <g>
    <rect width="1600" height="900" :fill="c('paper-2')" />
    <path
      d="M 50 40 Q 400 30 800 44 Q 1200 30 1550 40 Q 1566 450 1552 860 Q 1200 872 800 858 Q 400 872 48 860 Q 34 450 50 40 Z"
      :fill="c('paper')"
    />
    <rect
      x="90"
      y="80"
      width="1420"
      height="740"
      rx="6"
      fill="none"
      :stroke="c('period')"
      stroke-width="10"
    />
    <rect
      x="112"
      y="102"
      width="1376"
      height="696"
      rx="3"
      fill="none"
      :stroke="c('gold')"
      stroke-width="3"
    />
    <g :fill="c('gold')">
      <path
        v-for="(p, i) in corners"
        :key="i"
        d="M 0 -22 L 10 0 L 0 22 L -10 0 Z"
        :transform="`translate(${p[0]} ${p[1]})`"
      />
    </g>
    <g :fill="c('period')">
      <circle v-for="(p, i) in corners" :key="i" :cx="p[0]" :cy="p[1]" r="5" />
    </g>
    <path
      v-for="y in ruled"
      :key="y"
      :d="`M 180 ${y} L 1420 ${y}`"
      :stroke="c('paper-2')"
      stroke-width="2"
      opacity="0.8"
    />
    <path
      d="M 180 130 L 180 770"
      :stroke="c('red')"
      stroke-width="2"
      opacity="0.35"
    />
  </g>
</template>

<script setup lang="ts">
import { c } from '../util'

const corners = [
  [90, 80],
  [1510, 80],
  [1510, 820],
  [90, 820],
]
const ruled = Array.from({ length: 12 }, (_, i) => 160 + i * 52)
</script>
