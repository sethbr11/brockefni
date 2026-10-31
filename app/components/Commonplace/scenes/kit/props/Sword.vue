<!-- Sword, upright. Anchor = middle of the grip (put it in a Figure hand slot). ~290 long. Parts: glint. -->
<template>
  <KitPlace v-bind="place(props)">
    <path
      d="M -11 -24 L -11 -236 L 0 -262 L 11 -236 L 11 -24 Z"
      :fill="c(blade)"
    />
    <path
      d="M 0 -24 L 0 -258 L 11 -236 L 11 -24 Z"
      :fill="c('ink')"
      opacity="0.15"
    />
    <path
      data-part="glint"
      d="M -5 -60 L -5 -200"
      :stroke="c('highlight')"
      stroke-width="4"
      stroke-linecap="round"
      opacity="0.8"
    />
    <rect x="-52" y="-30" width="104" height="14" rx="7" :fill="c(hilt)" />
    <rect x="-8" y="-16" width="16" height="40" rx="5" :fill="c('wood-2')" />
    <circle cx="0" cy="30" r="11" :fill="c(hilt)" />
  </KitPlace>
</template>

<script setup lang="ts">
import KitPlace from '../KitPlace.vue'
import { c, place, type Placement } from '../util'

const props = withDefaults(
  defineProps<Placement & { blade?: string; hilt?: string }>(),
  { blade: 'metal', hilt: 'gold' }
)
</script>
