<!-- Gold ring with a gem. Anchor = centre of the band. ~70 across. Parts: glint (pop / spin). -->
<template>
  <KitPlace v-bind="place(props)">
    <ellipse
      cx="0"
      cy="0"
      rx="34"
      ry="30"
      fill="none"
      :stroke="c(color)"
      stroke-width="12"
    />
    <path d="M -14 -34 L 0 -52 L 14 -34 L 0 -24 Z" :fill="c(gem)" />
    <g data-part="glint" data-pivot transform="translate(18 -48)">
      <path
        d="M 0 -14 L 3 -3 L 14 0 L 3 3 L 0 14 L -3 3 L -14 0 L -3 -3 Z"
        :fill="c('highlight')"
      />
    </g>
  </KitPlace>
</template>

<script setup lang="ts">
import KitPlace from '../KitPlace.vue'
import { c, place, type Placement } from '../util'

const props = withDefaults(
  defineProps<Placement & { color?: string; gem?: string }>(),
  { color: 'gold', gem: 'red' }
)
</script>
