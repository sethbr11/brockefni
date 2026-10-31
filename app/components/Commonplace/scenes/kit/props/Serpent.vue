<!--
  Serpent rising in an S-curve, head facing right. Anchor = tail end on the ground (or wrap
  it round a Tree trunk). ~300 tall. Parts: body (sway), head (neck pivot), tongue.
-->
<template>
  <KitPlace v-bind="place(props)">
    <g data-part="body" data-pivot>
      <path
        :d="spine"
        fill="none"
        :stroke="c(color)"
        stroke-width="30"
        stroke-linecap="round"
      />
      <path
        :d="spine"
        fill="none"
        :stroke="c(pattern)"
        stroke-width="10"
        stroke-linecap="round"
        stroke-dasharray="4 22"
      />
      <g transform="translate(20 -270)">
        <g data-part="head" data-pivot>
          <!-- #head replaces the snake head (e.g. Spenser's Error, half woman); origin = top of the neck -->
          <slot name="head">
            <g data-part="tongue" data-pivot transform="translate(52 6)">
              <path
                d="M 0 0 L 26 0 L 36 -8 M 26 0 L 36 8"
                fill="none"
                :stroke="c('red')"
                stroke-width="4"
                stroke-linecap="round"
              />
            </g>
            <path
              d="M -16 -8 C -10 -30 30 -30 52 -6 C 56 2 52 10 44 12 C 20 18 -6 16 -16 8 Z"
              :fill="c(color)"
            />
            <circle cx="24" cy="-10" r="6" :fill="c('highlight')" />
            <circle cx="26" cy="-10" r="3.5" :fill="c('ink')" />
          </slot>
        </g>
      </g>
    </g>
  </KitPlace>
</template>

<script setup lang="ts">
import KitPlace from '../KitPlace.vue'
import { c, place, type Placement } from '../util'

const props = withDefaults(
  defineProps<Placement & { color?: string; pattern?: string }>(),
  { color: 'green', pattern: 'gold' }
)
const spine =
  'M -80 0 C -20 6 40 -10 40 -60 C 40 -110 -50 -110 -50 -160 C -50 -210 0 -230 20 -270'
</script>
