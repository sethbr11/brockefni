<!-- Cow facing right. Anchor = ground under body. ~190 tall, ~300 long. Parts: head, tail. -->
<template>
  <KitPlace v-bind="place(props)">
    <path
      data-part="tail"
      data-pivot
      d="M -130 -120 C -160 -100 -165 -50 -150 -10"
      fill="none"
      :stroke="c(color)"
      stroke-width="10"
      stroke-linecap="round"
    />
    <path
      d="M -110 -50 L -110 0 L -84 0 L -84 -50 Z M -50 -50 L -50 0 L -24 0 L -24 -50 Z M 40 -50 L 40 0 L 66 0 L 66 -50 Z M 96 -50 L 96 0 L 122 0 L 122 -50 Z"
      :fill="c(color)"
    />
    <path
      d="M -140 -80 C -140 -150 -100 -160 0 -160 C 100 -160 140 -150 140 -90 C 140 -40 100 -30 0 -30 C -100 -30 -140 -30 -140 -80 Z"
      :fill="c(color)"
    />
    <ellipse cx="-30" cy="-110" rx="40" ry="28" :fill="c(spots)" />
    <ellipse cx="60" cy="-80" rx="26" ry="18" :fill="c(spots)" />
    <path d="M -20 -34 C -20 -10 20 -10 20 -34 Z" :fill="c('skin-2')" />
    <g transform="translate(130 -130)">
      <g data-part="head" data-pivot>
        <path
          d="M -20 -30 L -34 -56 M 10 -34 L 24 -60"
          :stroke="c('highlight')"
          stroke-width="8"
          stroke-linecap="round"
        />
        <path
          d="M -30 -20 C -30 -40 20 -44 40 -30 L 56 20 C 56 40 20 50 0 40 C -20 30 -30 10 -30 -20 Z"
          :fill="c(color)"
        />
        <ellipse cx="42" cy="22" rx="22" ry="18" :fill="c('skin-2')" />
        <circle cx="10" cy="-12" r="5" :fill="c('ink')" />
        <path d="M -34 -14 L -52 -6 L -30 0 Z" :fill="c(spots)" />
      </g>
    </g>
  </KitPlace>
</template>

<script setup lang="ts">
import KitPlace from '../KitPlace.vue'
import { c, place, type Placement } from '../util'

const props = withDefaults(
  defineProps<Placement & { color?: string; spots?: string }>(),
  { color: 'highlight', spots: 'wood-3' }
)
</script>
