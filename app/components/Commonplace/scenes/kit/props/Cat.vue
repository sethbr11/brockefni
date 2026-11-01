<!--
  Cat facing right. Anchor = bottom centre (on the ground).
  pose="sit" (default): sitting cat, ~170 tall. Parts: head, eyes, tail.
  pose="rig": standing, fully articulated cat (~150 long, ~110 tall at scale 1) driven by
    catRig() from ./catRig.ts — torso, four two-bone legs with IK-pinned paws, contact shadow.
    Parts tweenable directly: head (neck pivot), eyes, pupil (scaleX to dilate), tail (base
    pivot), tail-tip (mid pivot). Rig-owned (do not tween): torso, shadow, leg-*.
-->
<template>
  <KitPlace v-bind="place(props)">
    <template v-if="pose === 'sit'">
      <g transform="translate(-50 -10)">
        <g data-part="tail" data-pivot>
          <path
            d="M 0 0 C -60 0 -80 -40 -60 -90 C -50 -110 -30 -110 -36 -92 C -54 -50 -40 -24 4 -18 Z"
            :fill="c(color)"
          />
        </g>
      </g>
      <path
        d="M -64 0 C -80 -60 -60 -120 0 -126 C 50 -128 66 -70 60 0 Z"
        :fill="c(color)"
      />
      <path
        d="M 20 -124 C 56 -110 66 -60 60 0 L 30 0 C 40 -50 40 -100 20 -124 Z"
        :fill="c('ink')"
        opacity="0.14"
      />
      <path
        d="M -40 -70 L -20 -76 M -46 -46 L -24 -50"
        :stroke="c('ink')"
        stroke-width="6"
        stroke-linecap="round"
        opacity="0.25"
      />
      <g transform="translate(10 -126)">
        <g data-part="head" data-pivot>
          <path
            d="M -44 -30 L -40 -88 L -12 -56 Z M 44 -30 L 40 -88 L 12 -56 Z"
            :fill="c(color)"
          />
          <circle cx="0" cy="-36" r="48" :fill="c(color)" />
          <g transform="translate(6 -40)">
            <g data-part="eyes" data-pivot>
              <ellipse cx="-16" cy="0" rx="6" ry="9" :fill="c(eye)" />
              <ellipse cx="22" cy="0" rx="6" ry="9" :fill="c(eye)" />
            </g>
          </g>
          <path d="M 2 -20 l 6 6 l 6 -6 Z" :fill="c('red')" />
          <path
            d="M 30 -18 L 70 -26 M 30 -12 L 70 -8"
            :stroke="c('ink')"
            stroke-width="2.5"
            opacity="0.4"
          />
        </g>
      </g>
    </template>

    <template v-else>
      <!-- contact shadow -->
      <ellipse
        data-part="shadow"
        cx="0"
        cy="0"
        rx="86"
        ry="8"
        :fill="c('ink')"
        opacity="0.2"
        :transform="rest.shadow"
      />

      <!-- far legs (behind the body) -->
      <g
        v-for="l in farLegs"
        :key="l.id"
        :data-part="`leg-${l.id}`"
        :transform="rest.legs[l.id].root"
      >
        <rect
          :x="-l.w1 / 2"
          y="-16"
          :width="l.w1"
          :height="l.a + 16"
          :rx="l.w1 / 2"
          :fill="c(color)"
        />
        <g :data-part="`leg-${l.id}-lo`" :transform="rest.legs[l.id].lo">
          <rect
            :x="-l.w2 / 2"
            :y="-l.w2 / 2"
            :width="l.w2"
            :height="l.b + l.w2 / 2"
            :rx="l.w2 / 2"
            :fill="c(color)"
          />
          <g :data-part="`leg-${l.id}-paw`" :transform="rest.legs[l.id].paw">
            <ellipse cx="5" cy="-7" rx="13" ry="7" :fill="c(color)" />
            <ellipse
              cx="5"
              cy="-7"
              rx="13"
              ry="7"
              :fill="c('ink')"
              opacity="0.2"
            />
          </g>
          <rect
            :x="-l.w2 / 2"
            :y="-l.w2 / 2"
            :width="l.w2"
            :height="l.b + l.w2 / 2"
            :rx="l.w2 / 2"
            :fill="c('ink')"
            opacity="0.2"
          />
        </g>
        <rect
          :x="-l.w1 / 2"
          y="-16"
          :width="l.w1"
          :height="l.a + 16"
          :rx="l.w1 / 2"
          :fill="c('ink')"
          opacity="0.2"
        />
      </g>

      <!-- torso (tail, body, head) -->
      <g data-part="torso" :transform="rest.torso">
        <g transform="translate(-68 -14)">
          <g data-part="tail" data-pivot>
            <path
              d="M 0 0 C -18 -2 -34 -16 -40 -40"
              fill="none"
              :stroke="c(color)"
              stroke-width="13"
              stroke-linecap="round"
            />
            <g transform="translate(-40 -40)">
              <g data-part="tail-tip" data-pivot>
                <path
                  d="M 0 0 C -5 -18 -2 -34 12 -44"
                  fill="none"
                  :stroke="c(color)"
                  stroke-width="12"
                  stroke-linecap="round"
                />
                <path
                  d="M 0 0 C -5 -18 -2 -34 12 -44"
                  fill="none"
                  :stroke="c('ink')"
                  stroke-width="12"
                  stroke-linecap="round"
                  opacity="0.08"
                />
              </g>
            </g>
          </g>
        </g>
        <path
          d="M -72 -6 C -74 -30 -50 -36 -20 -32 C 10 -28 40 -34 62 -26 C 82 -18 84 8 66 20 C 46 30 10 26 -16 28 C -46 30 -70 22 -72 -6 Z"
          :fill="c(color)"
        />
        <path
          d="M -60 18 C -30 30 20 24 66 20 C 50 30 10 28 -16 30 C -40 32 -54 26 -60 18 Z"
          :fill="c('ink')"
          opacity="0.1"
        />
        <ellipse cx="-46" cy="2" rx="30" ry="28" :fill="c(color)" />
        <path
          d="M -26 -18 C -14 -4 -16 16 -30 28"
          fill="none"
          :stroke="c('ink')"
          stroke-width="4"
          stroke-linecap="round"
          opacity="0.12"
        />
        <circle cx="54" cy="-12" r="22" :fill="c(color)" />
        <g transform="translate(56 -20)">
          <g data-part="head" data-pivot>
            <path d="M 2 -36 L 2 -72 L 24 -52 Z" :fill="c(color)" />
            <path
              d="M 2 -36 L 2 -72 L 24 -52 Z"
              :fill="c('ink')"
              opacity="0.15"
            />
            <ellipse cx="26" cy="-24" rx="34" ry="30" :fill="c(color)" />
            <path d="M 26 -52 L 44 -78 L 54 -40 Z" :fill="c(color)" />
            <path
              d="M 33 -52 L 43 -69 L 48 -45 Z"
              :fill="c('red')"
              opacity="0.3"
            />
            <ellipse cx="50" cy="-12" rx="15" ry="11" :fill="c(color)" />
            <path
              d="M 4 -4 C 14 6 34 8 50 0"
              fill="none"
              :stroke="c('ink')"
              stroke-width="3"
              opacity="0.1"
              stroke-linecap="round"
            />
            <g transform="translate(38 -30)">
              <g data-part="eyes" data-pivot>
                <ellipse cx="-11" cy="0" rx="5.5" ry="7.5" :fill="c(eye)" />
                <ellipse cx="9" cy="1" rx="5" ry="7" :fill="c(eye)" />
                <g transform="translate(-10 0)"
                  ><g data-part="pupil" data-pivot
                    ><ellipse rx="1.8" ry="5.6" :fill="c('ink')" /></g
                ></g>
                <g transform="translate(10 1)"
                  ><g data-part="pupil" data-pivot
                    ><ellipse rx="1.7" ry="5.2" :fill="c('ink')" /></g
                ></g>
              </g>
            </g>
            <path
              d="M 58 -21 L 66 -21 L 62 -15 Z"
              :fill="c('red')"
              opacity="0.8"
            />
            <path
              d="M 62 -15 Q 61 -9 55 -9"
              fill="none"
              :stroke="c('ink')"
              stroke-width="2.2"
              stroke-linecap="round"
              opacity="0.6"
            />
            <path
              d="M 52 -12 L 88 -20 M 52 -8 L 90 -6"
              :stroke="c('ink')"
              stroke-width="2"
              stroke-linecap="round"
              opacity="0.35"
            />
          </g>
        </g>
      </g>

      <!-- near legs (in front) -->
      <g
        v-for="l in nearLegs"
        :key="l.id"
        :data-part="`leg-${l.id}`"
        :transform="rest.legs[l.id].root"
      >
        <rect
          :x="-l.w1 / 2"
          y="-16"
          :width="l.w1"
          :height="l.a + 16"
          :rx="l.w1 / 2"
          :fill="c(color)"
        />
        <g :data-part="`leg-${l.id}-lo`" :transform="rest.legs[l.id].lo">
          <rect
            :x="-l.w2 / 2"
            :y="-l.w2 / 2"
            :width="l.w2"
            :height="l.b + l.w2 / 2"
            :rx="l.w2 / 2"
            :fill="c(color)"
          />
          <g :data-part="`leg-${l.id}-paw`" :transform="rest.legs[l.id].paw">
            <ellipse cx="5" cy="-7" rx="13" ry="7" :fill="c(color)" />
            <path
              d="M 6 -7 L 6 -1 M 12 -7 L 12 -1"
              :stroke="c('ink')"
              stroke-width="1.6"
              stroke-linecap="round"
              opacity="0.25"
            />
          </g>
        </g>
      </g>
    </template>
  </KitPlace>
</template>

<script setup lang="ts">
import KitPlace from '../KitPlace.vue'
import { CAT_LEGS, CAT_STAND, solveCat, type CatLegId } from './catRig'
import { c, place, type Placement } from '../util'

const props = withDefaults(
  defineProps<
    Placement & { color?: string; eye?: string; pose?: 'sit' | 'rig' }
  >(),
  {
    color: 'wood-3',
    eye: 'ink',
    pose: 'sit',
  }
)

const rest = solveCat(CAT_STAND)
const leg = (id: CatLegId) => ({
  id,
  ...CAT_LEGS[id],
  w1: CAT_LEGS[id].front ? 20 : 26,
  w2: 15,
})
const farLegs = [leg('bf'), leg('ff')]
const nearLegs = [leg('bn'), leg('fn')]
</script>
