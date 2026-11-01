<!-- Fox facing right. Anchor = between the paws. ~120 tall, ~240 long. Parts: head, tail. -->
<template>
  <KitPlace v-bind="place(props)">
    <g transform="translate(-80 -60)">
      <g data-part="tail" data-pivot>
        <path
          d="M 0 0 C -60 -20 -110 20 -120 70 C -70 70 -30 50 10 30 Z"
          :fill="c(color)"
        />
        <path
          d="M -100 52 C -112 64 -118 66 -120 70 C -90 70 -76 64 -66 58 Z"
          :fill="c('highlight')"
        />
      </g>
    </g>
    <path
      d="M -86 -50 C -60 -110 30 -110 62 -80 L 66 0 L 40 0 L 30 -36 L -10 -36 L -40 0 L -70 0 L -76 -20 Z"
      :fill="c(color)"
    />
    <path d="M 36 0 L 66 0 L 66 -20 L 36 -20 Z" :fill="c('ink')" />
    <g transform="translate(62 -84)">
      <g data-part="head" data-pivot>
        <path
          d="M -20 -4 L -16 -50 L 6 -26 L 22 -28 L 66 6 L 22 30 L -14 24 Z"
          :fill="c(color)"
        />
        <path d="M 6 14 L 66 6 L 22 30 Z" :fill="c('highlight')" />
        <circle cx="66" cy="6" r="5" :fill="c('ink')" />
        <path
          d="M 8 -8 L 24 -2"
          :stroke="c('ink')"
          stroke-width="4"
          stroke-linecap="round"
        />
      </g>
    </g>
  </KitPlace>
</template>

<script setup lang="ts">
import KitPlace from '../KitPlace.vue'
import { c, place, type Placement } from '../util'

const props = withDefaults(defineProps<Placement & { color?: string }>(), {
  color: 'cloth-a',
})
</script>
