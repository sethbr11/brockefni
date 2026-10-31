<!-- Quill pen. Anchor = the nib tip (move the anchor along a line to "write"). ~240 long, leaning right. -->
<template>
  <KitPlace v-bind="place(props)">
    <path d="M 0 0 L 4 -16 L 12 -14 Z" :fill="c('ink')" />
    <path
      d="M 2 -8 C 30 -80 70 -160 120 -230"
      fill="none"
      :stroke="c('paper-2')"
      stroke-width="5"
      stroke-linecap="round"
    />
    <path
      d="M 30 -70 C 20 -120 60 -190 128 -236 C 116 -180 90 -110 30 -70 Z"
      :fill="c(color)"
    />
    <path
      d="M 30 -70 C 70 -100 110 -150 128 -236 C 134 -170 110 -110 44 -64 Z"
      :fill="c(color)"
    />
    <path
      d="M 44 -64 C 100 -110 124 -170 128 -236 C 134 -170 110 -110 44 -64 Z"
      :fill="c('ink')"
      opacity="0.15"
    />
    <path
      d="M 40 -90 C 60 -130 90 -170 118 -214"
      fill="none"
      :stroke="c('paper-2')"
      stroke-width="3"
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
