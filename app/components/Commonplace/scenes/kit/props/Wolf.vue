<!-- Wolf facing right (werewolf of Bisclavret). Anchor = between the paws. ~170 tall, ~280 long. Parts: head, tail, eyes. -->
<template>
  <KitPlace v-bind="place(props)">
    <g transform="translate(-100 -100)">
      <path
        data-part="tail"
        data-pivot
        d="M 0 0 C -50 10 -80 50 -90 90 C -60 70 -30 50 10 40 Z"
        :fill="c(color)"
      />
    </g>
    <path
      d="M -110 -90 C -80 -140 20 -150 70 -120 L 90 -40 L 70 0 L 40 0 L 40 -50 L -10 -50 L -50 0 L -90 0 L -90 -40 Z"
      :fill="c(color)"
    />
    <path d="M 50 0 L 80 0 L 80 -50 L 50 -50 Z" :fill="c(color)" />
    <g transform="translate(70 -120)">
      <g data-part="head" data-pivot>
        <path
          d="M -30 -10 L -24 -64 L 4 -34 L 24 -40 L 74 -4 L 92 6 L 40 30 L -20 30 Z"
          :fill="c(color)"
        />
        <g data-part="eyes" data-pivot
          ><ellipse
            cx="24"
            cy="-8"
            rx="9"
            ry="6"
            :fill="c(eyes)"
            transform="rotate(20 24 -8)"
        /></g>
        <path d="M 52 14 L 60 24 L 68 14 Z" :fill="c('highlight')" />
      </g>
    </g>
  </KitPlace>
</template>

<script setup lang="ts">
import KitPlace from '../KitPlace.vue'
import { c, place, type Placement } from '../util'

const props = withDefaults(
  defineProps<Placement & { color?: string; eyes?: string }>(),
  { color: 'ink', eyes: 'glow' }
)
</script>
