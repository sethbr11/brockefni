<!-- Sheep/lamb facing right. Anchor = ground under body. ~110 tall, ~150 long. Parts: head. -->
<template>
  <KitPlace v-bind="place(props)">
    <path
      d="M -40 -30 L -40 0 M -14 -30 L -14 0 M 22 -30 L 22 0 M 46 -30 L 46 0"
      :stroke="c('ink')"
      stroke-width="9"
      stroke-linecap="round"
    />
    <g :fill="c(wool)">
      <circle cx="-44" cy="-56" r="30" /><circle
        cx="-8"
        cy="-76"
        r="34"
      /><circle cx="34" cy="-62" r="32" />
      <circle cx="-14" cy="-44" r="34" /><circle cx="20" cy="-40" r="30" />
    </g>
    <g transform="translate(62 -66)">
      <g data-part="head" data-pivot>
        <ellipse cx="14" cy="0" rx="24" ry="20" :fill="c('ink')" />
        <path d="M -6 -12 L -26 -4 L -4 4 Z" :fill="c('ink')" />
        <circle cx="20" cy="-6" r="3.5" :fill="c('highlight')" />
      </g>
    </g>
  </KitPlace>
</template>

<script setup lang="ts">
import KitPlace from '../KitPlace.vue'
import { c, place, type Placement } from '../util'

const props = withDefaults(defineProps<Placement & { wool?: string }>(), {
  wool: 'highlight',
})
</script>
