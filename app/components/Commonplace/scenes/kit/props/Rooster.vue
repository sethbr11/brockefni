<!-- Rooster (Chauntecleer) facing right. Anchor = between the feet. ~260 tall. Parts: head, tail. -->
<template>
  <KitPlace v-bind="place(props)">
    <path
      d="M -20 0 L -16 -60 M 20 0 L 16 -60"
      :stroke="c('gold')"
      stroke-width="8"
      stroke-linecap="round"
    />
    <path
      d="M -34 0 L 0 0 M 6 0 L 40 0"
      :stroke="c('gold')"
      stroke-width="7"
      stroke-linecap="round"
    />
    <g transform="translate(-60 -110)">
      <g data-part="tail" data-pivot>
        <path
          d="M 0 0 C -40 -40 -70 -110 -40 -170 C -30 -120 -10 -80 20 -50 Z"
          :fill="c('green-2')"
        />
        <path
          d="M 0 0 C -60 -20 -110 -70 -100 -130 C -80 -90 -40 -60 10 -30 Z"
          :fill="c('cloth-b')"
        />
        <path
          d="M 4 10 C -50 10 -100 -20 -110 -60 C -80 -40 -40 -30 10 -14 Z"
          :fill="c('ink')"
        />
      </g>
    </g>
    <path
      d="M -86 -100 C -80 -150 -10 -170 40 -150 C 70 -136 80 -110 70 -80 C 54 -50 -50 -40 -86 -100 Z"
      :fill="c(color)"
    />
    <path
      d="M -60 -110 C -30 -90 10 -100 30 -120"
      fill="none"
      :stroke="c('gold-2')"
      stroke-width="8"
      stroke-linecap="round"
      opacity="0.6"
    />
    <g transform="translate(40 -150)">
      <g data-part="head" data-pivot>
        <path
          d="M -20 10 C -30 -30 -10 -70 20 -76 C 44 -78 54 -60 50 -36 C 46 -10 30 10 -20 10 Z"
          :fill="c(color)"
        />
        <path
          d="M 4 -72 C 0 -96 16 -100 20 -84 C 24 -104 40 -102 38 -82 C 50 -96 62 -84 50 -68 Z"
          :fill="c('red')"
        />
        <path d="M 48 -50 L 74 -44 L 48 -36 Z" :fill="c('gold')" />
        <path
          d="M 40 -32 C 52 -26 52 -10 40 -8 C 34 -14 34 -26 40 -32 Z"
          :fill="c('red')"
        />
        <circle cx="30" cy="-52" r="6" :fill="c('ink')" />
      </g>
    </g>
  </KitPlace>
</template>

<script setup lang="ts">
import KitPlace from '../KitPlace.vue'
import { c, place, type Placement } from '../util'

const props = withDefaults(defineProps<Placement & { color?: string }>(), {
  color: 'gold',
})
</script>
