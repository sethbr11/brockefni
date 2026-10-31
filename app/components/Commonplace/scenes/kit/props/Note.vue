<!-- Music note (eighth). Anchor = centre. ~70 tall. -->
<template>
  <KitPlace v-bind="place(props)">
    <ellipse
      cx="-8"
      cy="22"
      rx="16"
      ry="12"
      :fill="c(color)"
      transform="rotate(-20 -8 22)"
    />
    <path
      d="M 6 20 L 6 -30 C 6 -14 30 -14 28 8"
      fill="none"
      :stroke="c(color)"
      stroke-width="6"
      stroke-linecap="round"
    />
  </KitPlace>
</template>

<script setup lang="ts">
import KitPlace from '../KitPlace.vue'
import { c, place, type Placement } from '../util'

const props = withDefaults(defineProps<Placement & { color?: string }>(), {
  color: 'highlight',
})
</script>
