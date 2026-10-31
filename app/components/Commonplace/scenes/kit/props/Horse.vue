<!--
  Horse, side view facing right. Anchor = ground under the middle of the body. ~400 tall
  (to ear tip), ~470 long at scale 1. Saddle top ≈ y -262 (seat a Figure at y ≈ -150 so
  its robe drapes over the back).
  braid: color role → gold-thread bands along the mane and a tie on the tail.
  Parts: body (bob it), head (neck pivot), tail, leg-fl / leg-fr / leg-bl / leg-br (hip pivot).
  Gallop: rotate legs ±25° yoyo with offsets, bob the body.
-->
<template>
  <KitPlace v-bind="place(props)">
    <g data-part="body" data-pivot>
      <!-- far legs -->
      <g
        v-for="l in farLegs"
        :key="l.part"
        :transform="`translate(${l.x} -180)`"
      >
        <g :data-part="l.part" data-pivot>
          <rect
            x="-15"
            y="-10"
            width="30"
            height="176"
            rx="12"
            :fill="c(coat)"
          />
          <rect
            x="-15"
            y="-10"
            width="30"
            height="176"
            rx="12"
            :fill="c('ink')"
            opacity="0.28"
          />
          <rect
            x="-17"
            y="150"
            width="34"
            height="20"
            rx="4"
            :fill="c('ink')"
          />
        </g>
      </g>
      <!-- tail -->
      <g transform="translate(-150 -235)">
        <g data-part="tail" data-pivot>
          <path
            d="M 0 0 C -50 10 -70 60 -66 140 C -50 110 -40 90 -30 70 C -26 96 -20 110 -8 124 C -10 80 -6 40 10 16 Z"
            :fill="c(mane)"
          />
          <rect
            v-if="braid"
            x="-24"
            y="38"
            width="22"
            height="8"
            rx="3"
            :fill="c(braid)"
            transform="rotate(-24 -13 42)"
          />
        </g>
      </g>
      <!-- body -->
      <ellipse cx="0" cy="-208" rx="168" ry="72" :fill="c(coat)" />
      <path
        d="M -120 -160 C -60 -140 60 -140 140 -170 C 120 -150 60 -134 0 -134 C -60 -134 -100 -144 -120 -160 Z"
        :fill="c('ink')"
        opacity="0.15"
      />
      <!-- neck + head -->
      <g transform="translate(130 -240)">
        <g data-part="head" data-pivot>
          <path
            d="M -40 30 C -20 -40 10 -110 50 -140 L 100 -110 C 80 -60 60 -10 40 40 Z"
            :fill="c(coat)"
          />
          <path
            d="M 30 -150 C 60 -176 110 -170 140 -120 L 168 -84 C 176 -70 168 -56 152 -58 L 100 -64 C 70 -68 40 -90 30 -110 Z"
            :fill="c(coat)"
          />
          <path d="M 44 -160 L 52 -196 L 70 -162 Z" :fill="c(coat)" />
          <path
            d="M 150 -78 L 168 -84 C 176 -70 168 -56 152 -58 Z"
            :fill="c('ink')"
            opacity="0.35"
          />
          <circle cx="94" cy="-124" r="7" :fill="c('ink')" />
          <path
            d="M 40 -150 C 10 -120 -20 -60 -40 20 L -20 26 C -8 -40 20 -110 56 -144 Z"
            :fill="c(mane)"
          />
          <!-- mane braided with thread of gold -->
          <g v-if="braid" :fill="c(braid)">
            <rect
              v-for="(b, i) in braids"
              :key="i"
              x="-9"
              y="-3.5"
              width="18"
              height="7"
              rx="3"
              :transform="`translate(${b[0]} ${b[1]}) rotate(${b[2]})`"
            />
          </g>
          <path
            v-if="saddle"
            d="M 98 -64 L 60 -100 M 60 -100 L 30 -60"
            fill="none"
            :stroke="c(saddle === true ? 'cloth-a' : saddle)"
            stroke-width="7"
            stroke-linecap="round"
          />
        </g>
      </g>
      <!-- saddle cloth -->
      <g v-if="saddle">
        <path
          d="M -78 -268 C -20 -280 40 -280 74 -268 L 84 -150 L -88 -150 Z"
          :fill="c(saddle === true ? 'cloth-a' : saddle)"
        />
        <path
          d="M -88 -164 L 84 -164 L 84 -150 L -88 -150 Z"
          :fill="c('gold')"
        />
      </g>
      <!-- near legs -->
      <g
        v-for="l in nearLegs"
        :key="l.part"
        :transform="`translate(${l.x} -180)`"
      >
        <g :data-part="l.part" data-pivot>
          <rect
            x="-16"
            y="-14"
            width="32"
            height="180"
            rx="13"
            :fill="c(coat)"
          />
          <rect
            x="-18"
            y="150"
            width="36"
            height="20"
            rx="4"
            :fill="c('ink')"
          />
        </g>
      </g>
    </g>
  </KitPlace>
</template>

<script setup lang="ts">
import KitPlace from '../KitPlace.vue'
import { c, place, type Placement } from '../util'

const props = withDefaults(
  defineProps<
    Placement & {
      coat?: string
      mane?: string
      saddle?: boolean | string
      braid?: string
    }
  >(),
  {
    coat: 'wood',
    mane: 'ink',
    saddle: true,
    braid: undefined,
  }
)
const braids = [
  [34, -140, 52],
  [18, -112, 60],
  [2, -82, 70],
  [-12, -50, 76],
  [-24, -18, 80],
  [-32, 8, 84],
]
const farLegs = [
  { part: 'leg-bl', x: -90 },
  { part: 'leg-fl', x: 96 },
]
const nearLegs = [
  { part: 'leg-br', x: -122 },
  { part: 'leg-fr', x: 124 },
]
</script>
