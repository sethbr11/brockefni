<!--
  A rider's near leg, seen from the side: it hangs from the hip down the horse's flank to a boot.
  Anchor = the hip (where the leg leaves the seat); the leg runs ~140 down (+y) and the boot points
  forward (+x, the direction a right-facing horse looks). Draw it AFTER the horse and (for a robed rider)
  BEFORE the figure, so the hem covers the top of the leg. Colors: `color` (stocking / hose), `boot`.
-->
<template>
  <KitPlace v-bind="place(props)">
    <path
      d="M -16 -12 L 24 -12 C 32 30 40 68 36 112 L 6 112 C 12 68 0 30 -16 -12 Z"
      :fill="c(color)"
    />
    <path
      d="M 24 -12 C 32 30 40 68 36 112 L 24 112 C 26 70 20 30 14 -12 Z"
      :fill="c('ink')"
      opacity="0.14"
    />
    <path
      d="M 4 100 L 38 100 L 40 122 C 54 124 64 128 64 136 C 64 142 58 144 50 144 L 6 144 C 0 144 0 140 0 134 Z"
      :fill="c(boot)"
    />
    <path
      d="M 4 100 L 38 100 L 38 107 L 4 107 Z"
      :fill="c('ink')"
      opacity="0.2"
    />
  </KitPlace>
</template>

<script setup lang="ts">
import KitPlace from '../KitPlace.vue'
import { c, place, type Placement } from '../util'

const props = withDefaults(
  defineProps<Placement & { color?: string; boot?: string }>(),
  { color: 'wood-2', boot: 'ink' }
)
</script>
