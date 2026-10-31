<!-- Goblet / mead cup. Anchor = base. ~70 tall. -->
<template>
  <KitPlace v-bind="place(props)">
    <path
      d="M -24 -70 L 24 -70 C 24 -40 12 -30 4 -28 L 4 -8 L 18 -2 L 18 0 L -18 0 L -18 -2 L -4 -8 L -4 -28 C -12 -30 -24 -40 -24 -70 Z"
      :fill="c(color)"
    />
    <path
      d="M 8 -70 L 24 -70 C 24 -40 12 -30 4 -28 Z"
      :fill="c('ink')"
      opacity="0.15"
    />
  </KitPlace>
</template>

<script setup lang="ts">
import KitPlace from '../KitPlace.vue'
import { c, place, type Placement } from '../util'

const props = withDefaults(defineProps<Placement & { color?: string }>(), {
  color: 'gold',
})
</script>
