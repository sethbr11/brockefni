<!--
  Flea, side view, facing right. Anchor = the line the feet rest on (round foot caps reach ~1.5 below it). ~45 wide, ~42 tall at scale 1.
  Jointed little legs (big springy hind leg), feelers, a beady eye, and a belly that fills
  with blood. Parts: body (pivot at the feet: dip to bite, squash), belly (scale it up as it
  feeds), legs (scaleY to spring), hind (the hind leg; rotate to kick).
-->
<template>
  <KitPlace v-bind="place(props)">
    <g data-part="body" data-pivot>
      <!-- far legs -->
      <path
        d="M 4 -10 L 9 -4 L 6 0 M -6 -10 L -10 -4 L -14 0"
        fill="none"
        :stroke="c(color)"
        stroke-width="2.6"
        stroke-linecap="round"
        stroke-linejoin="round"
        opacity="0.55"
      />
      <!-- shell -->
      <path
        d="M -24 -16 C -26 -32 -10 -40 6 -36 C 16 -33 20 -26 18 -18 C 16 -10 6 -8 -6 -8 C -16 -8 -23 -10 -24 -16 Z"
        :fill="c(color)"
      />
      <g transform="translate(-4 -18)">
        <g data-part="belly" data-pivot>
          <ellipse cx="0" cy="0" rx="13" ry="8" :fill="c('red')" />
          <ellipse
            cx="-3"
            cy="-3"
            rx="4"
            ry="2"
            :fill="c('highlight')"
            opacity="0.5"
          />
        </g>
      </g>
      <path
        d="M -14 -36 C -10 -28 -10 -16 -14 -9 M -4 -38 C 0 -30 0 -16 -4 -8"
        fill="none"
        :stroke="c('ink')"
        stroke-width="1.6"
        opacity="0.35"
      />
      <!-- head, eye, feeler, beak -->
      <circle cx="20" cy="-24" r="7" :fill="c(color)" />
      <circle cx="22" cy="-26" r="2.6" :fill="c('highlight')" />
      <circle cx="22.6" cy="-26" r="1.3" :fill="c('ink')" />
      <path
        d="M 18 -30 C 20 -38 26 -40 30 -38"
        fill="none"
        :stroke="c(color)"
        stroke-width="1.8"
        stroke-linecap="round"
      />
      <path
        d="M 25 -20 L 30 -12"
        :stroke="c(color)"
        stroke-width="2"
        stroke-linecap="round"
      />
      <!-- near legs -->
      <g data-part="legs" data-pivot>
        <path
          d="M 10 -12 L 16 -6 L 13 0 M 0 -10 L 3 -4 L -1 0"
          fill="none"
          :stroke="c(color)"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <g transform="translate(-14 -12)">
          <g data-part="hind" data-pivot>
            <path
              d="M 0 0 L -8 -8 L -10 12 L -14 12"
              fill="none"
              :stroke="c(color)"
              stroke-width="3.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
        </g>
      </g>
    </g>
  </KitPlace>
</template>

<script setup lang="ts">
import KitPlace from '../KitPlace.vue'
import { c, place, type Placement } from '../util'

const props = withDefaults(defineProps<Placement & { color?: string }>(), {
  color: 'wood-2',
})
</script>
