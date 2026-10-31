<!-- Candle in a holder. Anchor = base centre. ~150 tall at scale 1. Parts: flame, halo. -->
<template>
  <KitPlace v-bind="place(props)">
    <circle
      data-part="halo"
      data-pivot
      cx="0"
      cy="0"
      r="90"
      :fill="c('glow')"
      opacity="0.22"
      :transform="`translate(0 ${-h - 30})`"
    />
    <ellipse cx="0" cy="-4" rx="40" ry="10" :fill="c(holder)" />
    <rect x="-10" y="-24" width="20" height="22" :fill="c(holder)" />
    <ellipse cx="0" cy="-24" rx="26" ry="7" :fill="c(holder)" />
    <rect x="-15" :y="-h - 24" width="30" :height="h" rx="4" :fill="c(wax)" />
    <rect
      x="4"
      :y="-h - 24"
      width="11"
      :height="h"
      rx="4"
      :fill="c('ink')"
      opacity="0.1"
    />
    <path
      :d="`M -15 ${-h - 20} q 8 10 0 22`"
      :stroke="c(wax)"
      stroke-width="7"
      stroke-linecap="round"
      fill="none"
    />
    <rect x="-2" :y="-h - 34" width="4" height="12" :fill="c('ink')" />
    <g :transform="`translate(0 ${-h - 30})`">
      <g data-part="flame" data-pivot>
        <path
          d="M 0 0 C -14 0 -16 -14 -10 -26 C -6 -34 0 -42 2 -52 C 10 -40 16 -30 16 -18 C 16 -6 10 0 0 0 Z"
          :fill="c('glow')"
        />
        <path
          d="M 0 0 C -6 0 -8 -6 -5 -12 C -3 -16 0 -20 1 -26 C 5 -18 8 -14 8 -8 C 8 -2 5 0 0 0 Z"
          :fill="c('highlight')"
        />
      </g>
    </g>
  </KitPlace>
</template>

<script setup lang="ts">
import KitPlace from '../KitPlace.vue'
import { c, place, type Placement } from '../util'

const props = withDefaults(
  defineProps<Placement & { h?: number; wax?: string; holder?: string }>(),
  {
    h: 90,
    wax: 'highlight',
    holder: 'gold',
  }
)
</script>
