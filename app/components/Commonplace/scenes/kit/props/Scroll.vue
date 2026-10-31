<!--
  Hanging scroll. Anchor = centre of the top roller. width × length of paper.
  `sonnet`: instead of evenly spaced lines, writes exactly 14 lines -- three quatrains and an
  indented closing couplet, set off by stanza gaps (needs length ≈ 400; 14 × 24 + 3 × 12 + padding).
  Parts: paper (scaleY from the top to unroll), roller-b (move its y with the unroll), lines.
-->
<template>
  <KitPlace v-bind="place(props)">
    <g data-part="paper" data-pivot>
      <rect
        :x="-width / 2"
        y="0"
        :width="width"
        :height="length"
        :fill="c(paper)"
      />
      <rect
        :x="width / 2 - 18"
        y="0"
        width="18"
        :height="length"
        :fill="c('ink')"
        opacity="0.08"
      />
      <g data-part="lines">
        <path
          v-for="(l, i) in lines"
          :key="i"
          :d="`M ${l.x1} ${l.y} L ${l.x2} ${l.y}`"
          :stroke="c('paper-ink')"
          stroke-width="4"
          stroke-linecap="round"
          opacity="0.35"
        />
      </g>
    </g>
    <rect
      :x="-width / 2 - 20"
      y="-14"
      :width="width + 40"
      height="28"
      rx="14"
      :fill="c(roller)"
    />
    <g data-part="roller-b" data-pivot :transform="`translate(0 ${length})`">
      <rect
        :x="-width / 2 - 20"
        y="-14"
        :width="width + 40"
        height="28"
        rx="14"
        :fill="c(roller)"
      />
    </g>
  </KitPlace>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import KitPlace from '../KitPlace.vue'
import { c, place, type Placement } from '../util'

const props = withDefaults(
  defineProps<
    Placement & {
      width?: number
      length?: number
      paper?: string
      roller?: string
      sonnet?: boolean
    }
  >(),
  {
    sonnet: false,
    width: 200,
    length: 260,
    paper: 'paper',
    roller: 'wood',
  }
)

const lines = computed(() => {
  const w = props.width
  if (props.sonnet) {
    return Array.from({ length: 14 }, (_, i) => {
      const couplet = i >= 12
      const y = 28 + i * 24 + Math.floor(i / 4) * 12
      return {
        y,
        x1: -w / 2 + 24 + (couplet ? 36 : 0),
        x2: w / 2 - 24 - ((i * 37) % 5) * 9,
      }
    })
  }
  return Array.from(
    { length: Math.floor((props.length - 40) / 30) },
    (_, k) => {
      const i = k + 1
      return { y: 10 + i * 30, x1: -w / 2 + 24, x2: w / 2 - 24 - (i % 3) * 22 }
    }
  )
})
</script>
