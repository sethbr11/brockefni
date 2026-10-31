<!--
  Tree. Anchor = base of the trunk. kind: 'round' | 'pine' | 'bare' | 'apple' (round + fruit).
  ~380 tall. Parts: canopy (sway: small rotation), apples (apple kind).
-->
<template>
  <KitPlace v-bind="place(props)">
    <path d="M -22 0 L -16 -200 L 16 -200 L 22 0 Z" :fill="c(trunk)" />
    <g
      v-if="kind === 'bare'"
      fill="none"
      :stroke="c(trunk)"
      stroke-linecap="round"
    >
      <path
        d="M 0 -150 C -40 -200 -90 -230 -130 -300 M -60 -210 L -40 -290 M 0 -190 C 20 -260 10 -320 0 -380 M 6 -160 C 60 -200 110 -240 140 -300 M 90 -230 L 130 -250"
        stroke-width="16"
      />
    </g>
    <g v-else data-part="canopy" data-pivot transform="translate(0 -200)">
      <template v-if="kind === 'pine'">
        <path
          d="M -150 40 L 0 -180 L 150 40 Z M -120 -50 L 0 -230 L 120 -50 Z"
          :fill="c(leaves)"
        />
        <path
          d="M 0 -230 L 120 -50 L 60 -50 L 150 40 L 0 40 Z"
          :fill="c('ink')"
          opacity="0.12"
        />
      </template>
      <template v-else>
        <circle cx="-70" cy="-30" r="90" :fill="c(leaves)" />
        <circle cx="70" cy="-40" r="96" :fill="c(leaves)" />
        <circle cx="0" cy="-120" r="110" :fill="c(leaves)" />
        <path
          d="M 40 -222 A 110 110 0 0 1 40 -18 A 130 130 0 0 0 40 -222 Z M 120 -116 A 96 96 0 0 1 120 36 A 116 116 0 0 0 120 -116 Z"
          :fill="c('ink')"
          opacity="0.1"
        />
        <g v-if="kind === 'apple'" data-part="apples">
          <circle
            v-for="(a, i) in apples"
            :key="i"
            :cx="a[0]"
            :cy="a[1]"
            r="15"
            :fill="c(fruit)"
          />
        </g>
      </template>
    </g>
  </KitPlace>
</template>

<script setup lang="ts">
import KitPlace from '../KitPlace.vue'
import { c, place, type Placement } from '../util'

const props = withDefaults(
  defineProps<
    Placement & {
      kind?: 'round' | 'pine' | 'bare' | 'apple'
      leaves?: string
      trunk?: string
      fruit?: string
    }
  >(),
  { kind: 'round', leaves: 'green', trunk: 'wood-2', fruit: 'red' }
)
const apples = [
  [-80, -40],
  [-20, -150],
  [60, -110],
  [90, -10],
  [-10, -40],
  [30, -200],
  [-90, -120],
]
</script>
