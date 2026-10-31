<!-- Apple. Anchor = centre. ~70 across. bitten=true takes a bite out (Eden). -->
<template>
  <KitPlace v-bind="place(props)">
    <path
      d="M 0 -30 C -6 -42 -10 -46 -14 -48"
      fill="none"
      :stroke="c('wood-2')"
      stroke-width="5"
      stroke-linecap="round"
    />
    <path
      d="M -2 -36 C 10 -56 30 -52 34 -44 C 22 -36 10 -34 -2 -36 Z"
      :fill="c(leaf)"
    />
    <path
      :d="
        bitten
          ? 'M 0 -26 C 20 -40 44 -24 38 4 C 33 24 18 36 0 30 C -18 36 -34 24 -38 4 C -40 -6 -30 -10 -28 -18 C -18 -14 -14 -24 -20 -32 C -12 -34 -6 -30 0 -26 Z'
          : 'M 0 -26 C 20 -40 44 -24 38 4 C 33 24 18 36 0 30 C -18 36 -33 24 -38 4 C -44 -24 -20 -40 0 -26 Z'
      "
      :fill="c(color)"
    />
    <path
      d="M -24 -10 C -24 -18 -18 -22 -12 -22"
      fill="none"
      :stroke="c('highlight')"
      stroke-width="5"
      stroke-linecap="round"
      opacity="0.7"
    />
  </KitPlace>
</template>

<script setup lang="ts">
import KitPlace from '../KitPlace.vue'
import { c, place, type Placement } from '../util'

const props = withDefaults(
  defineProps<
    Placement & { color?: string; leaf?: string; bitten?: boolean }
  >(),
  {
    color: 'red',
    leaf: 'green',
    bitten: false,
  }
)
</script>
