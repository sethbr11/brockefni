<!--
  Mephistopheles: a tall, elegant devil in a friar's habit (Marlowe's "old Franciscan friar") —
  ink habit and thrown-back cowl, knotted rope girdle, red face, swept horns, widow's peak,
  pointed beard, a closed-mouth half-smile, glowing eyes and a spade-tipped tail. Faces the viewer.
  Anchor = between the feet (hem). ~430 tall at scale 1 (horn tips).
  Parts: pose (feet pivot), head (neck pivot), eyes, eyeglow, tail, arm-l / arm-r (shoulder
  pivots; arm-r negative raises outward to the right, arm-l positive raises to the left).
  Slots #hand-l / #hand-r: drawn at the hand, +y pointing along the arm.
-->
<template>
  <KitPlace v-bind="place(props)">
    <g data-part="pose" data-pivot>
      <!-- tail (behind the habit) -->
      <g transform="translate(40 -60)">
        <g data-part="tail" data-pivot>
          <path
            d="M 0 0 C 46 8 84 -10 90 -48 C 94 -76 76 -92 86 -118"
            fill="none"
            :stroke="c(robe)"
            stroke-width="10"
            stroke-linecap="round"
          />
          <path
            d="M 86 -118 L 70 -122 L 96 -150 L 100 -112 Z"
            :fill="c(skin)"
          />
        </g>
      </g>

      <!-- cowl thrown back behind the head -->
      <path
        d="M -70 -246 C -80 -300 -44 -322 0 -322 C 44 -322 80 -300 70 -246 Z"
        :fill="c(robe)"
      />
      <path
        d="M -70 -246 C -80 -300 -44 -322 0 -322 C 44 -322 80 -300 70 -246"
        fill="none"
        :stroke="c(skin)"
        stroke-width="4"
        opacity="0.45"
      />

      <!-- habit -->
      <path
        d="M -50 -264 C -68 -264 -76 -250 -78 -234 L -104 -10 Q -106 0 -96 0 L 96 0 Q 106 0 104 -10 L 78 -234 C 76 -250 68 -264 50 -264 Z"
        :fill="c(robe)"
      />
      <path
        d="M -78 -234 L -104 -10 Q -106 0 -96 0 L -84 0 L -66 -230 Z"
        :fill="c(skin)"
        opacity="0.22"
      />
      <path
        d="M 10 -150 L 22 -4"
        :stroke="c('highlight')"
        stroke-width="3"
        opacity="0.07"
        stroke-linecap="round"
      />
      <path
        d="M -26 -140 L -40 -4"
        :stroke="c('highlight')"
        stroke-width="3"
        opacity="0.07"
        stroke-linecap="round"
      />
      <!-- the cowl's collar -->
      <path
        d="M -60 -262 Q 0 -206 60 -262 L 66 -244 Q 0 -186 -66 -244 Z"
        :fill="c(robe)"
      />
      <path
        d="M -60 -262 Q 0 -206 60 -262"
        fill="none"
        :stroke="c(skin)"
        stroke-width="4"
        opacity="0.5"
      />
      <!-- knotted rope girdle -->
      <rect x="-82" y="-160" width="164" height="11" rx="5.5" :fill="c(rope)" />
      <path
        d="M 26 -152 C 30 -120 24 -96 32 -62"
        fill="none"
        :stroke="c(rope)"
        stroke-width="6"
        stroke-linecap="round"
      />
      <circle cx="28" cy="-122" r="6.5" :fill="c(rope)" />
      <circle cx="27" cy="-96" r="6.5" :fill="c(rope)" />
      <circle cx="31" cy="-70" r="6.5" :fill="c(rope)" />

      <!-- head -->
      <g transform="translate(0 -262)">
        <g data-part="head" data-pivot>
          <rect x="-12" y="-16" width="24" height="22" rx="5" :fill="c(skin)" />
          <rect
            x="-12"
            y="-16"
            width="24"
            height="22"
            rx="5"
            :fill="c('ink')"
            opacity="0.25"
          />
          <!-- horns -->
          <path
            d="M -30 -104 C -58 -112 -72 -140 -62 -172 C -54 -144 -40 -130 -14 -118 Z"
            :fill="c(horn)"
          />
          <path
            d="M 30 -104 C 58 -112 72 -140 62 -172 C 54 -144 40 -130 14 -118 Z"
            :fill="c(horn)"
          />
          <path
            d="M 30 -104 C 58 -112 72 -140 62 -172 C 62 -142 50 -122 30 -112 Z"
            :fill="c('ink')"
            opacity="0.15"
          />
          <!-- pointed ears -->
          <path d="M -40 -70 L -70 -92 L -42 -46 Z" :fill="c(skin)" />
          <path d="M 40 -70 L 70 -92 L 42 -46 Z" :fill="c(skin)" />
          <!-- long face -->
          <path
            d="M -44 -78 C -44 -112 -24 -124 0 -124 C 24 -124 44 -112 44 -78 C 44 -46 24 -16 0 -8 C -24 -16 -44 -46 -44 -78 Z"
            :fill="c(skin)"
          />
          <path
            d="M 18 -122 C 36 -114 44 -98 44 -78 C 44 -46 24 -16 0 -8 C 22 -30 30 -60 18 -122 Z"
            :fill="c('ink')"
            opacity="0.13"
          />
          <!-- widow's peak -->
          <path
            d="M -45 -78 C -48 -114 -24 -130 0 -130 C 24 -130 48 -114 45 -78 C 38 -96 24 -104 10 -104 L 0 -90 L -10 -104 C -24 -104 -38 -96 -45 -78 Z"
            :fill="c(robe)"
          />
          <!-- brows -->
          <path
            d="M -34 -84 L -9 -74 M 34 -84 L 9 -74"
            fill="none"
            :stroke="c(robe)"
            stroke-width="5.5"
            stroke-linecap="round"
          />
          <!-- glowing eyes -->
          <g transform="translate(0 -64)">
            <g data-part="eyeglow" data-pivot :fill="c('glow')" opacity="0.45">
              <circle cx="-19" cy="0" r="13" />
              <circle cx="19" cy="0" r="13" />
            </g>
            <g data-part="eyes" data-pivot>
              <path
                d="M -31 1 Q -20 -8 -8 -1 Q -20 6 -31 1 Z M 31 1 Q 20 -8 8 -1 Q 20 6 31 1 Z"
                :fill="c('glow')"
              />
              <circle cx="-17" cy="-0.5" r="2.6" :fill="c('ink')" />
              <circle cx="17" cy="-0.5" r="2.6" :fill="c('ink')" />
            </g>
          </g>
          <!-- moustache, sly smile, pointed beard -->
          <path
            d="M -3 -42 C -12 -47 -24 -44 -32 -54 M 3 -42 C 12 -47 24 -44 32 -54"
            fill="none"
            :stroke="c(robe)"
            stroke-width="4"
            stroke-linecap="round"
          />
          <path
            d="M -10 -32 Q 2 -29 13 -37 M 13 -37 L 16 -40"
            fill="none"
            :stroke="c(robe)"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M -12 -22 C -7 -14 -3 -2 2 22 C 4 0 8 -14 12 -22 C 6 -18 -6 -18 -12 -22 Z"
            :fill="c(robe)"
          />
        </g>
      </g>

      <!-- arms: bell sleeves with red lining, slender hands -->
      <g transform="translate(-62 -248)">
        <g
          data-part="arm-l"
          data-pivot
          :transform="armL ? `rotate(${armL})` : undefined"
        >
          <path
            d="M -17 -10 Q 0 -20 17 -10 L 32 104 Q 0 116 -32 104 Z"
            :fill="c(robe)"
          />
          <ellipse
            cx="0"
            cy="106"
            rx="30"
            ry="8"
            :fill="c(skin)"
            opacity="0.7"
          />
          <g transform="translate(0 116)"><slot name="hand-l" /></g>
          <path
            d="M -11 108 C -14 124 -6 140 0 140 C 6 140 14 124 11 108 Z"
            :fill="c(skin)"
          />
        </g>
      </g>
      <g transform="translate(62 -248)">
        <g
          data-part="arm-r"
          data-pivot
          :transform="armR ? `rotate(${armR})` : undefined"
        >
          <path
            d="M -17 -10 Q 0 -20 17 -10 L 32 104 Q 0 116 -32 104 Z"
            :fill="c(robe)"
          />
          <ellipse
            cx="0"
            cy="106"
            rx="30"
            ry="8"
            :fill="c(skin)"
            opacity="0.7"
          />
          <g transform="translate(0 116)"><slot name="hand-r" /></g>
          <path
            d="M -11 108 C -14 124 -6 140 0 140 C 6 140 14 124 11 108 Z"
            :fill="c(skin)"
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
      robe?: string
      skin?: string
      horn?: string
      rope?: string
      armL?: number
      armR?: number
    }
  >(),
  {
    robe: 'ink',
    skin: 'cloth-a',
    horn: 'cloth-c',
    rope: 'cloth-c',
    armL: 0,
    armR: 0,
  }
)
</script>
