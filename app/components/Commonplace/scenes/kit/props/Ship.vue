<!-- Viking longship facing right. Anchor = waterline centre. ~560 long, ~360 tall. Parts: sail (billow: scaleX), hull (rock: rotation). -->
<template>
  <KitPlace v-bind="place(props)">
    <g data-part="hull" data-pivot>
      <rect x="-8" y="-330" width="16" height="320" :fill="c('wood-2')" />
      <g transform="translate(0 -320)">
        <g data-part="sail" data-pivot>
          <path
            d="M -130 0 L 130 0 C 150 80 150 150 130 210 L -130 210 C -110 150 -110 80 -130 0 Z"
            :fill="c(sail)"
          />
          <path
            v-for="x in [-78, 0, 78]"
            :key="x"
            :d="`M ${x - 22} 0 L ${x + 22} 0 L ${x + 22 + (x > 0 ? 8 : 0)} 210 L ${x - 22} 210 Z`"
            :fill="c(stripe)"
          />
          <path
            d="M 70 0 L 130 0 C 150 80 150 150 130 210 L 90 210 C 108 150 104 80 70 0 Z"
            :fill="c('ink')"
            opacity="0.12"
          />
        </g>
      </g>
      <rect
        x="-150"
        y="-322"
        width="300"
        height="12"
        rx="6"
        :fill="c('wood-2')"
      />
      <path
        d="M -300 -120 C -310 -170 -290 -200 -260 -210 C -270 -180 -262 -150 -240 -120 L 240 -120 C 262 -150 270 -180 260 -210 C 300 -212 320 -180 304 -150 C 290 -100 230 0 0 0 C -230 0 -290 -60 -300 -120 Z"
        :fill="c(hull)"
      />
      <path
        d="M -280 -70 C -200 -30 200 -30 280 -70"
        fill="none"
        :stroke="c('ink')"
        stroke-width="5"
        opacity="0.2"
      />
      <path
        d="M 260 -210 C 280 -240 320 -250 330 -224 C 316 -224 300 -214 300 -200 Z"
        :fill="c(hull)"
      />
      <circle cx="306" cy="-226" r="4" :fill="c('ink')" />
      <g>
        <circle
          v-for="(x, i) in [-200, -130, -60, 10, 80, 150]"
          :key="x"
          :cx="x"
          cy="-122"
          r="28"
          :fill="c(i % 2 ? 'gold' : 'cloth-a')"
        />
        <circle
          v-for="x in [-200, -130, -60, 10, 80, 150]"
          :key="`b${x}`"
          :cx="x"
          cy="-122"
          r="8"
          :fill="c('metal')"
        />
      </g>
    </g>
  </KitPlace>
</template>

<script setup lang="ts">
import KitPlace from '../KitPlace.vue'
import { c, place, type Placement } from '../util'

const props = withDefaults(
  defineProps<Placement & { hull?: string; sail?: string; stripe?: string }>(),
  {
    hull: 'wood',
    sail: 'highlight',
    stripe: 'red',
  }
)
</script>
