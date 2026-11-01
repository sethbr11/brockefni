<!--
  Monstrous hand. Anchor = wrist; talons point right (+x). `arm` draws a forearm of that
  length extending left from the wrist (flip it to reach left with the arm trailing right).
  Parts: fingers (scaleX to curl / clench).
-->
<template>
  <KitPlace v-bind="place(props)">
    <rect
      v-if="arm"
      :x="-arm"
      y="-26"
      :width="arm + 20"
      height="52"
      rx="22"
      :fill="c(color)"
    />
    <ellipse cx="34" cy="0" rx="46" ry="36" :fill="c(color)" />
    <g data-part="fingers" data-pivot transform="translate(60 0)">
      <path
        d="M -10 -32 C 30 -50 70 -46 92 -26 C 70 -30 40 -24 10 -12 Z"
        :fill="c(color)"
      />
      <path
        d="M -6 -8 C 40 -14 80 -6 104 12 C 76 8 40 8 0 10 Z"
        :fill="c(color)"
      />
      <path
        d="M -10 16 C 30 22 64 36 82 60 C 56 48 26 42 -6 34 Z"
        :fill="c(color)"
      />
      <path
        d="M 84 -32 L 112 -22 L 90 -20 Z M 98 6 L 128 20 L 100 18 Z M 76 52 L 98 76 L 76 64 Z"
        :fill="c(talon)"
      />
    </g>
    <path
      d="M 20 -32 C 22 -60 40 -74 58 -78 C 50 -60 46 -44 44 -28 Z"
      :fill="c(color)"
    />
    <path d="M 54 -78 L 76 -88 L 60 -70 Z" :fill="c(talon)" />
  </KitPlace>
</template>

<script setup lang="ts">
import KitPlace from '../KitPlace.vue'
import { c, place, type Placement } from '../util'

const props = withDefaults(
  defineProps<Placement & { color?: string; talon?: string; arm?: number }>(),
  {
    color: 'ink',
    talon: 'stone-3',
    arm: 0,
  }
)
</script>
