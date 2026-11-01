<!--
  The Rood (cross). Anchor = foot of the cross. ~420 tall. glow=true adds radiating rays and
  jewels (Dream of the Rood). Parts: rays (spin / pulse), gems.
-->
<template>
  <KitPlace v-bind="place(props)">
    <g v-if="glow" data-part="rays" data-pivot transform="translate(0 -300)">
      <circle r="210" :fill="c('glow')" opacity="0.18" />
      <path
        v-for="i in 12"
        :key="i"
        d="M 0 -150 L 14 -260 L -14 -260 Z"
        :fill="c('glow')"
        opacity="0.55"
        :transform="`rotate(${i * 30})`"
      />
    </g>
    <rect x="-22" y="-420" width="44" height="420" rx="4" :fill="c(color)" />
    <rect x="-150" y="-322" width="300" height="44" rx="4" :fill="c(color)" />
    <path
      d="M 4 -420 L 22 -420 L 22 0 L 4 0 Z M 4 -278 L 150 -278 L 150 -296 L 4 -296 Z"
      :fill="c('ink')"
      opacity="0.14"
    />
    <g v-if="glow" data-part="gems">
      <circle cx="0" cy="-300" r="16" :fill="c('red')" />
      <circle cx="-122" cy="-300" r="10" :fill="c('cloth-b')" />
      <circle cx="122" cy="-300" r="10" :fill="c('cloth-b')" />
      <circle cx="0" cy="-392" r="10" :fill="c('cloth-b')" />
      <circle cx="0" cy="-160" r="10" :fill="c('green')" />
      <circle cx="0" cy="-80" r="10" :fill="c('red')" />
    </g>
  </KitPlace>
</template>

<script setup lang="ts">
import KitPlace from '../KitPlace.vue'
import { c, place, type Placement } from '../util'

const props = withDefaults(
  defineProps<Placement & { color?: string; glow?: boolean }>(),
  { color: 'gold', glow: false }
)
</script>
