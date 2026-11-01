<!--
  Angel: a simple flat figure in a long gown, golden curls and halo, with real feathered wings.
  Faces the viewer. Anchor = the hem's bottom centre (it floats; there are no feet).
  ~340 tall at scale 1 (halo), wingspan ~500.
  Parts: body (whole figure, for bobbing), glow, halo, head (neck pivot), eyes,
  wing-l / wing-r (shoulder-blade pivots; wing-r positive / wing-l negative = downstroke),
  arm-l / arm-r (shoulder pivots, arm-l positive / arm-r negative raise outward).
-->
<template>
  <KitPlace v-bind="place(props)">
    <g data-part="glow" data-pivot transform="translate(0 -190)">
      <circle r="250" :fill="c('glow')" opacity="0.16" />
      <circle r="160" :fill="c('glow')" opacity="0.22" />
    </g>
    <g data-part="body" data-pivot>
      <!-- wings -->
      <g transform="translate(-20 -200)">
        <g data-part="wing-l" data-pivot>
          <g transform="scale(-1 1)">
            <path
              :d="WING"
              :fill="c(wing)"
              :stroke="c(rim)"
              stroke-width="6"
              stroke-opacity="0.45"
              stroke-linejoin="round"
              paint-order="stroke"
            />
            <path :d="COVERT" :fill="c(wing2)" />
            <path
              :d="QUILLS"
              fill="none"
              :stroke="c('ink')"
              stroke-width="3"
              stroke-linecap="round"
              opacity="0.14"
            />
          </g>
        </g>
      </g>
      <g transform="translate(20 -200)">
        <g data-part="wing-r" data-pivot>
          <path
            :d="WING"
            :fill="c(wing)"
            :stroke="c(rim)"
            stroke-width="6"
            stroke-opacity="0.45"
            stroke-linejoin="round"
            paint-order="stroke"
          />
          <path :d="COVERT" :fill="c(wing2)" />
          <path
            :d="QUILLS"
            fill="none"
            :stroke="c('ink')"
            stroke-width="3"
            stroke-linecap="round"
            opacity="0.14"
          />
        </g>
      </g>

      <!-- gown -->
      <path
        d="M -36 -214 C -52 -214 -58 -202 -60 -188 L -84 -18 C -60 -4 -40 -12 -20 -2 C 0 6 20 -6 40 -2 C 60 2 74 -8 84 -18 L 60 -188 C 58 -202 52 -214 36 -214 Z"
        :fill="c(robe)"
      />
      <path
        d="M 18 -214 L 36 -214 C 52 -214 58 -202 60 -188 L 84 -18 C 74 -8 60 2 40 -2 L 30 -2 Z"
        :fill="c('ink')"
        opacity="0.08"
      />
      <path
        d="M -6 -150 L -14 -10 M 24 -150 L 34 -6"
        :stroke="c('ink')"
        stroke-width="3"
        stroke-linecap="round"
        opacity="0.07"
      />
      <path
        d="M -84 -18 C -60 -4 -40 -12 -20 -2 C 0 6 20 -6 40 -2 C 60 2 74 -8 84 -18 L 82 -32 C 72 -22 60 -14 40 -16 C 20 -20 0 -8 -20 -16 C -40 -26 -60 -18 -82 -32 Z"
        :fill="c(trim)"
      />
      <rect x="-62" y="-140" width="124" height="12" rx="6" :fill="c(trim)" />
      <path d="M -22 -212 Q 0 -190 22 -212 Z" :fill="c(trim)" />

      <!-- head -->
      <g transform="translate(0 -212)">
        <g data-part="head" data-pivot>
          <rect
            x="-11"
            y="-14"
            width="22"
            height="18"
            rx="5"
            :fill="c('skin-2')"
          />
          <circle
            v-for="(h, i) in curlsBack"
            :key="`b${i}`"
            :cx="h[0]"
            :cy="h[1]"
            :r="h[2]"
            :fill="c(hair)"
          />
          <circle cx="0" cy="-54" r="46" :fill="c('skin')" />
          <path
            d="M 24 -94 A 46 46 0 0 1 24 -14 A 54 54 0 0 0 24 -94 Z"
            :fill="c('ink')"
            opacity="0.06"
          />
          <circle
            v-for="(h, i) in curlsTop"
            :key="`t${i}`"
            :cx="h[0]"
            :cy="h[1]"
            :r="h[2]"
            :fill="c(hair)"
          />
          <g transform="translate(0 -50)">
            <g data-part="eyes" data-pivot>
              <circle cx="-16" cy="0" r="6" :fill="c('ink')" />
              <circle cx="16" cy="0" r="6" :fill="c('ink')" />
            </g>
          </g>
          <circle cx="-26" cy="-34" r="7" :fill="c('cloth-a')" opacity="0.25" />
          <circle cx="26" cy="-34" r="7" :fill="c('cloth-a')" opacity="0.25" />
          <path
            d="M -9 -28 Q 0 -21 9 -28"
            fill="none"
            :stroke="c('ink')"
            stroke-width="4"
            stroke-linecap="round"
          />
          <g data-part="halo" data-pivot transform="translate(0 -120)">
            <ellipse
              rx="42"
              ry="11"
              fill="none"
              :stroke="c('gold')"
              stroke-width="8"
            />
            <ellipse
              rx="42"
              ry="11"
              fill="none"
              :stroke="c('glow')"
              stroke-width="3"
              opacity="0.8"
            />
          </g>
        </g>
      </g>

      <!-- arms: wide sleeves, open hands -->
      <g transform="translate(-44 -196)">
        <g
          data-part="arm-l"
          data-pivot
          :transform="armL ? `rotate(${armL})` : undefined"
        >
          <path
            d="M -14 -10 Q 0 -18 14 -10 L 24 82 Q 0 92 -24 82 Z"
            :fill="c(robe)"
          />
          <path
            d="M -14 -10 Q 0 -18 14 -10 L 24 82 Q 0 92 -24 82 Z"
            :fill="c('ink')"
            opacity="0.06"
          />
          <circle cx="0" cy="96" r="13" :fill="c('skin')" />
        </g>
      </g>
      <g transform="translate(44 -196)">
        <g
          data-part="arm-r"
          data-pivot
          :transform="armR ? `rotate(${armR})` : undefined"
        >
          <path
            d="M -14 -10 Q 0 -18 14 -10 L 24 82 Q 0 92 -24 82 Z"
            :fill="c(robe)"
          />
          <path
            d="M -14 -10 Q 0 -18 14 -10 L 24 82 Q 0 92 -24 82 Z"
            :fill="c('ink')"
            opacity="0.12"
          />
          <circle cx="0" cy="96" r="13" :fill="c('skin')" />
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
      robe?: string
      trim?: string
      wing?: string
      wing2?: string
      rim?: string
      hair?: string
      armL?: number
      armR?: number
    }
  >(),
  {
    robe: 'highlight',
    trim: 'gold',
    wing: 'highlight',
    wing2: 'cloth-c',
    rim: 'gold',
    hair: 'gold',
    armL: 0,
    armR: 0,
  }
)

// right wing, root at the shoulder blade, sweeping up and out; scalloped primaries below
const WING =
  'M 0 6 C 26 -40 92 -112 204 -150 C 236 -160 256 -148 240 -128 C 224 -110 200 -100 180 -96 ' +
  'C 202 -84 206 -66 188 -58 C 170 -52 152 -54 142 -56 C 158 -40 158 -22 138 -18 C 120 -14 106 -20 98 -24 ' +
  'C 108 -6 100 10 80 10 C 62 10 52 4 46 -2 C 46 16 32 28 14 24 Z'
const COVERT =
  'M 0 6 C 26 -40 86 -104 176 -134 C 162 -104 132 -84 104 -72 C 78 -60 40 -34 6 18 Z'
const QUILLS =
  'M 60 -40 C 110 -70 160 -100 214 -136 M 66 -28 C 110 -44 150 -60 180 -80 M 64 -16 C 96 -24 120 -32 140 -40 M 54 -6 C 72 -8 84 -10 94 -14'

const curlsBack: [number, number, number][] = [
  [-44, -40, 16],
  [44, -40, 16],
  [-40, -18, 13],
  [40, -18, 13],
]
const curlsTop: [number, number, number][] = [
  [-38, -78, 16],
  [-22, -96, 17],
  [0, -102, 18],
  [22, -96, 17],
  [38, -78, 16],
  [-46, -58, 13],
  [46, -58, 13],
]
</script>
