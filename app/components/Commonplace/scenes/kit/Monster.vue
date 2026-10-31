<!--
  Hulking creature (Grendel, his mother, giants, demons). Anchor = between the feet, faces right.
  ~400 tall at scale 1. Default is a silhouette (ink) with glowing eyes.
  Parts: pose (feet pivot), head (neck pivot), eyes, jaw, arm-l / arm-r (shoulder pivot;
  0 = hanging, negative swings forward/up for arm-r and arm-l alike).
  rim: optional color role for a rim-light outline (e.g. 'night-2' / 'moon' against a dark doorway).
-->
<template>
  <KitPlace v-bind="place(props)">
    <g data-part="pose" data-pivot>
      <!-- back arm -->
      <g transform="translate(-30 -250)">
        <g
          data-part="arm-l"
          data-pivot
          :transform="armL ? `rotate(${armL})` : undefined"
        >
          <path
            d="M -26 -10 C -34 60 -30 140 -22 196 L 22 196 C 30 130 30 60 26 -10 Z"
            :fill="col"
          />
          <path
            d="M -26 -10 C -34 60 -30 140 -22 196 L 22 196 C 30 130 30 60 26 -10 Z"
            :fill="c('ink')"
            opacity="0.25"
          />
          <Claw
            :y="200"
            :rotate="90"
            :color="color"
            :talon="talon"
            :scale="0.8"
          />
        </g>
      </g>
      <!-- legs -->
      <path
        d="M -96 -130 L -100 -6 Q -100 0 -94 0 L -30 0 L -36 -130 Z M 26 -130 L 30 0 L 96 0 Q 102 0 100 -6 L 92 -130 Z"
        :fill="col"
      />
      <path
        d="M -30 0 l 12 -2 l -6 10 Z M 96 0 l 14 -2 l -6 10 Z"
        :fill="c(talon)"
      />
      <!-- body + shaggy back -->
      <g
        v-if="rim"
        fill="none"
        :stroke="c(rim)"
        stroke-width="12"
        stroke-linejoin="round"
      >
        <path
          d="M -118 -96 C -150 -190 -132 -320 -40 -360 C 40 -392 130 -360 148 -280 C 160 -220 140 -150 116 -96"
        />
        <path
          d="M -126 -150 L -160 -176 L -134 -196 L -170 -230 L -138 -246 L -164 -290 L -122 -296 L -132 -340 L -88 -334 L -84 -380 L -44 -356 L -22 -396 L 4 -364 L 30 -392 L 46 -364"
        />
      </g>
      <path
        d="M -118 -96 C -150 -190 -132 -320 -40 -360 C 40 -392 130 -360 148 -280 C 160 -220 140 -150 116 -96 C 60 -70 -60 -70 -118 -96 Z"
        :fill="col"
      />
      <path
        d="M -126 -150 L -160 -176 L -134 -196 L -170 -230 L -138 -246 L -164 -290 L -122 -296 L -132 -340 L -88 -334 L -84 -380 L -44 -356 L -22 -396 L 4 -364 L 30 -392 L 46 -364 L 0 -340 L -100 -300 Z"
        :fill="col"
      />
      <path
        d="M 40 -380 C 110 -370 150 -320 148 -280 C 160 -220 140 -150 116 -96 C 100 -88 80 -84 60 -82 C 100 -170 104 -300 40 -380 Z"
        :fill="c('ink')"
        opacity="0.18"
      />
      <!-- head -->
      <g transform="translate(90 -300)">
        <g data-part="head" data-pivot>
          <path
            v-if="rim"
            d="M -40 -40 C -30 -78 40 -84 70 -50 C 90 -28 92 6 76 26 M -20 -66 L -10 -100 L 10 -70 M 30 -76 L 50 -108 L 56 -66"
            fill="none"
            :stroke="c(rim)"
            stroke-width="12"
            stroke-linejoin="round"
          />
          <path
            d="M -40 -40 C -30 -78 40 -84 70 -50 C 90 -28 92 6 76 26 C 56 48 0 50 -30 30 C -50 14 -52 -14 -40 -40 Z"
            :fill="col"
          />
          <path
            d="M -20 -66 L -10 -100 L 10 -70 Z M 30 -76 L 50 -108 L 56 -66 Z"
            :fill="col"
          />
          <g data-part="jaw" data-pivot transform="translate(10 26)">
            <path
              d="M -20 -6 L 70 -10 C 66 14 40 30 10 26 C -6 24 -18 12 -20 -6 Z"
              :fill="col"
            />
            <path
              d="M 0 -6 l 8 14 l 8 -14 Z M 24 -7 l 8 14 l 8 -14 Z M 48 -8 l 7 12 l 7 -12 Z"
              :fill="c(talon)"
            />
          </g>
          <g transform="translate(36 -22)">
            <g data-part="eyes" data-pivot>
              <path
                d="M -26 -6 L -4 -2 L -8 8 L -24 4 Z M 14 -2 L 36 -8 L 34 4 L 18 8 Z"
                :fill="c(eyes)"
              />
            </g>
          </g>
        </g>
      </g>
      <!-- front arm -->
      <g transform="translate(96 -236)">
        <g
          data-part="arm-r"
          data-pivot
          :transform="armR ? `rotate(${armR})` : undefined"
        >
          <path
            d="M -30 -14 C -38 60 -32 140 -24 200 L 24 200 C 32 130 34 60 30 -14 Z"
            :fill="col"
          />
          <Claw :y="204" :rotate="90" :color="color" :talon="talon" />
        </g>
      </g>
    </g>
  </KitPlace>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import KitPlace from './KitPlace.vue'
import Claw from './props/Claw.vue'
import { c, place, type Placement } from './util'

const props = withDefaults(
  defineProps<
    Placement & {
      color?: string
      eyes?: string
      talon?: string
      armL?: number
      armR?: number
      rim?: string
    }
  >(),
  {
    color: 'ink',
    eyes: 'glow',
    talon: 'stone-3',
    armL: 0,
    armR: 0,
    rim: undefined,
  }
)
const col = computed(() => c(props.color))
</script>
