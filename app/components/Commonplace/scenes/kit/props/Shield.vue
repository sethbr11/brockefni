<!--
  Shield. shape: 'round' (Saxon, with boss) | 'heater' (knightly). emblem: 'boss' | 'pentangle'
  | 'cross' | 'none'. Anchor = centre. ~150 across. Gawain: shape="heater" color="red" emblem="pentangle".
-->
<template>
  <KitPlace v-bind="place(props)">
    <template v-if="shape === 'round'">
      <circle r="76" :fill="c(color)" />
      <circle r="76" fill="none" :stroke="c('wood-2')" stroke-width="9" />
      <path
        d="M 30 -70 A 76 76 0 0 1 30 70 A 90 90 0 0 0 30 -70 Z"
        :fill="c('ink')"
        opacity="0.14"
      />
    </template>
    <template v-else>
      <path
        d="M -70 -80 L 70 -80 L 70 -10 C 70 50 30 80 0 96 C -30 80 -70 50 -70 -10 Z"
        :fill="c(color)"
      />
      <path
        d="M -70 -80 L 70 -80 L 70 -10 C 70 50 30 80 0 96 C -30 80 -70 50 -70 -10 Z"
        fill="none"
        :stroke="c('gold')"
        stroke-width="7"
      />
      <path
        d="M 0 -80 L 70 -80 L 70 -10 C 70 50 30 80 0 96 Z"
        :fill="c('ink')"
        opacity="0.12"
      />
    </template>
    <circle v-if="emblem === 'boss'" r="22" :fill="c('metal')" />
    <path
      v-if="emblem === 'pentangle'"
      d="M 0 -52 L 30 40 L -48 -16 L 48 -16 L -30 40 Z"
      fill="none"
      :stroke="c(mark)"
      stroke-width="8"
      stroke-linejoin="round"
    />
    <path
      v-if="emblem === 'cross'"
      d="M 0 -56 L 0 60 M -46 -10 L 46 -10"
      :stroke="c(mark)"
      stroke-width="16"
    />
  </KitPlace>
</template>

<script setup lang="ts">
import KitPlace from '../KitPlace.vue'
import { c, place, type Placement } from '../util'

const props = withDefaults(
  defineProps<
    Placement & {
      shape?: 'round' | 'heater'
      color?: string
      emblem?: 'boss' | 'pentangle' | 'cross' | 'none'
      mark?: string
    }
  >(),
  { shape: 'round', color: 'cloth-a', emblem: 'boss', mark: 'gold' }
)
</script>
