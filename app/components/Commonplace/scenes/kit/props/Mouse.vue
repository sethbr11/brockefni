<!-- Mouse facing right. Anchor = bottom centre. ~50 tall, ~90 long. Parts: tail. -->
<template>
  <KitPlace v-bind="place(props)">
    <g transform="translate(-36 -10)">
      <path
        data-part="tail"
        data-pivot
        d="M 0 0 C -30 4 -40 -24 -70 -14"
        fill="none"
        :stroke="c(color)"
        stroke-width="5"
        stroke-linecap="round"
      />
    </g>
    <path
      d="M -44 0 C -48 -40 -6 -54 30 -34 C 44 -26 56 -16 62 -6 C 50 -2 40 0 30 0 Z"
      :fill="c(color)"
    />
    <circle cx="12" cy="-44" r="14" :fill="c(color)" />
    <circle cx="12" cy="-44" r="7" :fill="c('red')" opacity="0.35" />
    <circle cx="40" cy="-22" r="4" :fill="c('ink')" />
    <circle cx="62" cy="-6" r="4" :fill="c('ink')" />
  </KitPlace>
</template>

<script setup lang="ts">
import KitPlace from '../KitPlace.vue'
import { c, place, type Placement } from '../util'

const props = withDefaults(defineProps<Placement & { color?: string }>(), {
  color: 'stone-2',
})
</script>
