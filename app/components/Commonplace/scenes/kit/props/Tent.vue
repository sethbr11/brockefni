<!-- Fairy pavilion. Anchor = bottom centre. ~320 tall, ~340 wide. Parts: flap, pennant. -->
<template>
  <KitPlace v-bind="place(props)">
    <path d="M -150 0 L -130 -150 L 130 -150 L 150 0 Z" :fill="c(cloth)" />
    <path d="M -160 -150 L 0 -300 L 160 -150 Z" :fill="c(roof)" />
    <path
      d="M -160 -150 Q -120 -120 -80 -150 Q -40 -120 0 -150 Q 40 -120 80 -150 Q 120 -120 160 -150"
      fill="none"
      :stroke="c('gold')"
      stroke-width="8"
    />
    <path d="M 0 -300 L 0 -350" :stroke="c('gold-2')" stroke-width="6" />
    <!-- the pennant pivots where it meets the pole (pole top at y -350), so it never leaves the pole -->
    <g transform="translate(0 -334)">
      <path
        data-part="pennant"
        data-pivot
        d="M 0 -16 L 56 -2 L 0 16 Z"
        :fill="c('gold')"
      />
    </g>
    <path
      data-part="flap"
      data-pivot
      d="M -50 0 L -36 -110 L 0 -130 L 0 0 Z"
      :fill="c('gold-2')"
    />
    <path
      d="M 0 0 L 0 -130 L 36 -110 L 50 0 Z"
      :fill="c('night')"
      opacity="0.85"
    />
  </KitPlace>
</template>

<script setup lang="ts">
import KitPlace from '../KitPlace.vue'
import { c, place, type Placement } from '../util'

const props = withDefaults(
  defineProps<Placement & { cloth?: string; roof?: string }>(),
  { cloth: 'highlight', roof: 'cloth-d' }
)
</script>
