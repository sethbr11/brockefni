<!-- Book. Anchor = bottom centre. Closed ~120×150 (upright) or open ~260 wide. Parts: pages (open only). -->
<template>
  <KitPlace v-bind="place(props)">
    <g v-if="!open">
      <rect x="-60" y="-150" width="120" height="150" rx="8" :fill="c(cover)" />
      <rect x="46" y="-144" width="12" height="138" :fill="c('paper')" />
      <rect
        x="-60"
        y="-150"
        width="18"
        height="150"
        rx="6"
        :fill="c('ink')"
        opacity="0.22"
      />
      <rect
        x="-26"
        y="-118"
        width="56"
        height="70"
        rx="4"
        fill="none"
        :stroke="c('gold')"
        stroke-width="5"
      />
      <circle cx="2" cy="-83" r="9" :fill="c('gold')" />
    </g>
    <g v-else>
      <path
        d="M -132 -4 L -128 -128 Q -60 -144 0 -118 Q 60 -144 128 -128 L 132 -4 Q 60 -22 0 4 Q -60 -22 -132 -4 Z"
        :fill="c(cover)"
      />
      <g data-part="pages">
        <path
          d="M -120 -16 L -118 -132 Q -56 -148 -4 -120 L -4 -8 Q -56 -34 -120 -16 Z"
          :fill="c('paper')"
        />
        <path
          d="M 120 -16 L 118 -132 Q 56 -148 4 -120 L 4 -8 Q 56 -34 120 -16 Z"
          :fill="c('paper')"
        />
        <path
          d="M 4 -120 L 4 -8 Q 30 -20 60 -26 L 60 -136 Q 30 -134 4 -120 Z"
          :fill="c('ink')"
          opacity="0.06"
        />
        <path
          v-for="i in 5"
          :key="i"
          :d="`M -100 ${-120 + i * 18} Q -60 ${-128 + i * 18} -22 ${-112 + i * 18} M 22 ${-112 + i * 18} Q 60 ${-128 + i * 18} 100 ${-120 + i * 18}`"
          :stroke="c('paper-ink')"
          stroke-width="3"
          opacity="0.3"
          fill="none"
        />
      </g>
    </g>
  </KitPlace>
</template>

<script setup lang="ts">
import KitPlace from '../KitPlace.vue'
import { c, place, type Placement } from '../util'

const props = withDefaults(
  defineProps<Placement & { cover?: string; open?: boolean }>(),
  { cover: 'cloth-a', open: false }
)
</script>
