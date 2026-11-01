<!--
  Feast table / bench, front view. Anchor = floor at the centre. Top surface at y -130.
  width (default 520). cloth: a color role or false. items: goblets & plates on top.
  Figures standing behind it show from the waist up — place them at the same y.
-->
<template>
  <KitPlace v-bind="place(props)">
    <rect
      :x="-width / 2 + 30"
      y="-120"
      width="24"
      height="120"
      :fill="c('wood-2')"
    />
    <rect
      :x="width / 2 - 54"
      y="-120"
      width="24"
      height="120"
      :fill="c('wood-2')"
    />
    <rect
      :x="-width / 2"
      y="-140"
      :width="width"
      height="22"
      rx="4"
      :fill="c(top)"
    />
    <template v-if="cloth">
      <path
        :d="`M ${-width / 2 - 6} -140 L ${width / 2 + 6} -140 L ${width / 2 + 6} -50 Q ${width / 4} -40 0 -50 Q ${-width / 4} -40 ${-width / 2 - 6} -50 Z`"
        :fill="c(cloth)"
      />
      <rect
        :x="-width / 2 - 6"
        y="-74"
        :width="width + 12"
        height="10"
        :fill="c('gold')"
        opacity="0.9"
      />
    </template>
    <g v-if="items">
      <Goblet :x="-width / 3" :y="-140" :scale="0.8" />
      <Goblet :x="width / 5" :y="-140" :scale="0.8" />
      <ellipse :cx="-width / 12" cy="-146" rx="44" ry="10" :fill="c('metal')" />
      <circle :cx="-width / 12 - 10" cy="-160" r="16" :fill="c('red')" />
      <circle :cx="-width / 12 + 14" cy="-158" r="14" :fill="c('gold')" />
      <ellipse :cx="width / 2.6" cy="-146" rx="36" ry="9" :fill="c('metal')" />
    </g>
  </KitPlace>
</template>

<script setup lang="ts">
import KitPlace from '../KitPlace.vue'
import Goblet from './Goblet.vue'
import { c, place, type Placement } from '../util'

const props = withDefaults(
  defineProps<
    Placement & {
      width?: number
      cloth?: string | false
      top?: string
      items?: boolean
    }
  >(),
  {
    width: 520,
    cloth: 'highlight',
    top: 'wood-3',
    items: true,
  }
)
</script>
