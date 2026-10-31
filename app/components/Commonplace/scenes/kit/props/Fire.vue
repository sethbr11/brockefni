<!-- Fire / hearth flames. Anchor = base centre. ~150 tall at scale 1. Parts: flame (flicker it), glow. -->
<template>
  <KitPlace v-bind="place(props)">
    <g
      data-part="glow"
      data-pivot
      transform="translate(0 -60)"
      :fill="c('glow')"
    >
      <circle r="150" opacity="0.1" />
      <circle r="100" opacity="0.12" />
    </g>
    <g data-part="flame" data-pivot>
      <path
        d="M 0 0 C -70 0 -84 -50 -56 -92 C -46 -66 -30 -62 -26 -74 C -38 -110 -10 -140 10 -160 C 6 -126 30 -112 40 -96 C 46 -110 44 -122 40 -130 C 76 -96 82 -40 56 -14 C 44 -4 24 0 0 0 Z"
        :fill="c('glow-2')"
      />
      <path
        d="M 0 0 C -46 0 -54 -36 -34 -64 C -28 -48 -16 -46 -12 -56 C -18 -82 -2 -100 12 -112 C 10 -88 26 -76 32 -62 C 50 -40 44 -10 30 -4 C 22 0 12 0 0 0 Z"
        :fill="c('glow')"
      />
      <path
        d="M 0 0 C -20 0 -26 -18 -16 -34 C -12 -26 -6 -26 -4 -32 C -6 -46 4 -56 10 -62 C 10 -48 20 -40 20 -26 C 22 -10 14 0 0 0 Z"
        :fill="c('highlight')"
        opacity="0.9"
      />
    </g>
    <g v-if="logs">
      <rect
        x="-80"
        y="-14"
        width="160"
        height="22"
        rx="11"
        :fill="c('wood-2')"
        transform="rotate(-8)"
      />
      <rect
        x="-80"
        y="-14"
        width="160"
        height="22"
        rx="11"
        :fill="c('wood')"
        transform="rotate(9)"
      />
    </g>
  </KitPlace>
</template>

<script setup lang="ts">
import KitPlace from '../KitPlace.vue'
import { c, place, type Placement } from '../util'

const props = withDefaults(defineProps<Placement & { logs?: boolean }>(), {
  logs: true,
})
</script>
