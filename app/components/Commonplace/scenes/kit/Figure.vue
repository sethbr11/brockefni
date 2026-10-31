<!--
  Flat character. Anchor (x, y) = between the feet. ~320 units tall at scale 1, faces the viewer.
  Animatable parts (all pivot correctly — just tween `rotation`, `x`, `y`, `scale`):
    [data-part=<part>]          whole figure (move it around: x / y)
      pose                      pivot at the feet (lean, bow, lie down, hop)
      head                      pivot at the neck (nod, tilt, pop off!)
      eyes                      blink (scaleY)
      arm-l / arm-r             pivot at the shoulders. 0 = hanging down.
                                arm-r: negative raises it (-90 = straight out, -180 = overhead)
                                arm-l: positive raises it (90 = straight out, 180 = overhead)
      cape, wing-l, wing-r      flutter / flap
      face                      brows + mouth for `mood` (fade it out to change expression)
      face-alt, face-alt-2, …   only with the `moodTo` prop: brows + mouth for each later mood, starting at
                                opacity 0. Crossfade: face → 0, face-alt → 1 (then face-alt → 0, face-alt-2 → 1)
  Slots: #hand-l / #hand-r — content is drawn at the hand. +y points along the arm, away from
  the shoulder; upright props (drawn toward -y) stand up when the arm hangs down.
  #hand-l / #hand-r are drawn BEHIND the hand (a fist closing over a grip); #held-l / #held-r are
  drawn IN FRONT of the hand and sleeve (a shield strapped to the forearm, a book held open).
-->
<template>
  <KitPlace v-bind="place(props)">
    <g :transform="lean ? `rotate(${lean})` : undefined">
      <g data-part="pose" data-pivot>
        <!-- wings -->
        <template v-if="wings">
          <g transform="translate(-40 -175)">
            <g data-part="wing-l" data-pivot>
              <path
                d="M 0 0 C -50 -80 -160 -110 -230 -70 C -200 -50 -190 -30 -196 -10 C -170 -20 -150 -6 -150 14 C -124 4 -104 16 -100 36 C -76 26 -50 34 -40 54 C -24 44 -10 46 0 56 Z"
                :fill="col(wingColor)"
              />
              <path
                d="M -60 18 C -100 10 -150 -20 -190 -50"
                fill="none"
                :stroke="col('ink')"
                stroke-width="4"
                opacity="0.15"
                stroke-linecap="round"
              />
            </g>
          </g>
          <g transform="translate(40 -175)">
            <g data-part="wing-r" data-pivot>
              <path
                d="M 0 0 C 50 -80 160 -110 230 -70 C 200 -50 190 -30 196 -10 C 170 -20 150 -6 150 14 C 124 4 104 16 100 36 C 76 26 50 34 40 54 C 24 44 10 46 0 56 Z"
                :fill="col(wingColor)"
              />
              <path
                d="M 60 18 C 100 10 150 -20 190 -50"
                fill="none"
                :stroke="col('ink')"
                stroke-width="4"
                opacity="0.15"
                stroke-linecap="round"
              />
            </g>
          </g>
        </template>

        <!-- cape (behind) -->
        <g
          v-if="cape"
          data-part="cape"
          data-pivot
          transform="translate(0 -204)"
        >
          <path
            d="M -54 0 L 54 0 C 76 60 100 150 112 200 Q 114 210 104 210 L -104 210 Q -114 210 -112 200 C -100 150 -76 60 -54 0 Z"
            :fill="col(cape === true ? 'cloth-b' : cape)"
          />
          <path
            d="M 20 0 L 54 0 C 76 60 100 150 112 200 Q 114 210 104 210 L 60 210 Z"
            :fill="col('ink')"
            opacity="0.14"
          />
        </g>

        <!-- veil / hood back (behind body) -->
        <path
          v-if="hat === 'wimple'"
          d="M -80 -264 C -84 -350 -40 -366 0 -366 C 40 -366 84 -350 80 -264 L 98 -188 L -98 -188 Z"
          :fill="col(hatColor ?? 'cloth-b')"
        />
        <path
          v-if="hat === 'hood'"
          d="M -78 -262 C -80 -340 -40 -356 0 -356 C 40 -356 80 -340 78 -262 L 92 -190 L -92 -190 Z"
          :fill="col(hatColor ?? 'cloth-d')"
        />

        <!-- legs (tunic) -->
        <g v-if="body === 'tunic'">
          <rect
            x="-36"
            y="-92"
            width="28"
            height="86"
            rx="8"
            :fill="col(legs)"
          />
          <rect x="8" y="-92" width="28" height="86" rx="8" :fill="col(legs)" />
          <path
            d="M -44 0 C -44 -16 -32 -18 -22 -18 C -10 -18 -6 -10 -6 0 Z"
            :fill="col('ink')"
          />
          <path
            d="M 44 0 C 44 -16 32 -18 22 -18 C 10 -18 6 -10 6 0 Z"
            :fill="col('ink')"
          />
        </g>

        <!-- body -->
        <path :d="bodyPath" :fill="col(robe)" />
        <path :d="shadePath" :fill="col('ink')" opacity="0.14" />
        <path :d="hemPath" :fill="col(trim)" />
        <path d="M -26 -205 Q 0 -176 26 -205 Z" :fill="col(trim)" />
        <rect
          v-if="belt"
          x="-71"
          :y="body === 'tunic' ? -128 : -116"
          width="142"
          height="14"
          :fill="col(belt === true ? 'wood-2' : belt)"
        />
        <path
          d="M -10 -196 L 10 -196 L 8 -186 L -8 -186 Z"
          :fill="col(skin2)"
        />
        <!-- embroidery (gold work down the front and at the cuffs) -->
        <g v-if="ornament" :fill="col(ornament)">
          <path
            v-for="k in 4"
            :key="k"
            :d="`M 0 ${-176 + (k - 1) * 14} l 5 7 l -5 7 l -5 -7 Z`"
          />
          <path
            d="M -36 -196 Q -30 -170 -30 -150 M 36 -196 Q 30 -170 30 -150"
            fill="none"
            :stroke="col(ornament)"
            stroke-width="4"
            stroke-linecap="round"
          />
        </g>

        <!-- head -->
        <g :transform="`translate(0 -200)${tilt ? ` rotate(${tilt})` : ''}`">
          <g data-part="head" data-pivot>
            <rect
              x="-15"
              y="-16"
              width="30"
              height="22"
              rx="6"
              :fill="col(skin2)"
            />
            <path
              v-if="hair === 'long'"
              d="M -66 -60 C -70 -120 -36 -132 0 -132 C 36 -132 70 -120 66 -60 L 70 6 Q 70 14 62 14 L -62 14 Q -70 14 -70 6 Z"
              :fill="col(hairColor)"
            />
            <!-- long hair hangs to the shoulders and would swallow the neck: draw the neck in front of it, under the chin -->
            <rect
              v-if="hair === 'long' && hat !== 'wimple'"
              x="-12"
              y="-16"
              width="24"
              height="30"
              rx="5"
              :fill="col(skin2)"
            />
            <template v-if="hat === 'wimple'">
              <path
                d="M -66 -62 C -66 -134 66 -134 66 -62 C 66 -2 32 8 0 8 C -32 8 -66 -2 -66 -62 Z"
                :fill="col('highlight')"
              />
              <ellipse cx="0" cy="-62" rx="44" ry="50" :fill="col(skin)" />
            </template>
            <circle v-else cx="0" cy="-62" r="60" :fill="col(skin)" />
            <path
              v-if="!silhouette && hat !== 'wimple'"
              d="M 30 -114 A 60 60 0 0 1 30 -10 A 70 70 0 0 0 30 -114 Z"
              :fill="col('ink')"
              opacity="0.07"
            />

            <!-- hair cap -->
            <path
              v-if="
                hair !== 'bald' && !['helmet', 'hood', 'wimple'].includes(hat)
              "
              d="M -62 -58 C -66 -112 -34 -128 0 -128 C 34 -128 66 -112 62 -58 C 52 -84 30 -96 2 -96 C -20 -96 -44 -88 -62 -58 Z"
              :fill="col(hairColor)"
            />

            <!-- beard -->
            <g v-if="beard">
              <path
                :d="
                  beard === 'long'
                    ? 'M -56 -54 C -56 10 -28 50 0 64 C 28 50 56 10 56 -54 C 44 -34 24 -28 0 -28 C -24 -28 -44 -34 -56 -54 Z'
                    : 'M -56 -54 C -52 -8 -24 12 0 12 C 24 12 52 -8 56 -54 C 44 -34 24 -28 0 -28 C -24 -28 -44 -34 -56 -54 Z'
                "
                :fill="col(beardColor ?? hairColor)"
              />
              <path
                d="M -24 -30 C -14 -40 -4 -38 0 -32 C 4 -38 14 -40 24 -30 C 14 -26 6 -26 0 -28 C -6 -26 -14 -26 -24 -30 Z"
                :fill="col(beardColor ?? hairColor)"
              />
            </g>

            <FigureFace
              :mood="mood"
              :mood-to="moodTo"
              :eyes="eyes"
              :look="look"
              :beard="beard"
              :silhouette="silhouette"
            />

            <FigureHeadwear
              :hat="hat"
              :hat-color="hatColor"
              :silhouette="silhouette"
            />
          </g>
        </g>

        <!-- arms -->
        <FigureArm
          v-if="arms"
          side="l"
          :angle="armL"
          :sleeve="sleeve ?? robe"
          :skin="skin"
          :ornament="ornament"
          :silhouette="silhouette"
        >
          <template #hand><slot name="hand-l" /></template>
          <template #held><slot name="held-l" /></template>
        </FigureArm>
        <FigureArm
          v-if="arms"
          side="r"
          :angle="armR"
          :sleeve="sleeve ?? robe"
          :skin="skin"
          :ornament="ornament"
          :silhouette="silhouette"
        >
          <template #hand><slot name="hand-r" /></template>
          <template #held><slot name="held-r" /></template>
        </FigureArm>
      </g>
    </g>
  </KitPlace>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import KitPlace from './KitPlace.vue'
import FigureArm from './figure/FigureArm.vue'
import FigureFace, { type Mood } from './figure/FigureFace.vue'
import FigureHeadwear, { type Hat } from './figure/FigureHeadwear.vue'
import { useCol } from './figure/useCol'
import { place, type Placement } from './util'

const props = withDefaults(
  defineProps<
    Placement & {
      /** 'robe' (long, to the floor) or 'tunic' (knee-length, shows legs) */
      body?: 'robe' | 'tunic'
      /** color roles */
      skin?: string
      /** neck / shading tone (default 'skin-2'); set it when you recolour `skin` */
      skin2?: string
      /** color role for gold-work embroidery down the front and on the cuffs */
      ornament?: string
      robe?: string
      sleeve?: string
      trim?: string
      legs?: string
      hairColor?: string
      beardColor?: string
      hatColor?: string
      wingColor?: string
      hair?: 'short' | 'long' | 'bald'
      beard?: boolean | 'long'
      hat?: Hat
      /** true (cloth-b) or a color role */
      cape?: boolean | string
      /** true (wood-2) or a color role */
      belt?: boolean | string
      wings?: boolean
      arms?: boolean
      /** static arm angles in degrees (see header) */
      armL?: number
      armR?: number
      mood?: Mood
      /**
       * Later expression(s) the face can change to mid-scene: one mood, or a list for a sequence
       * (e.g. ['alarmed', 'happy']). Each renders a hidden layer (brows + mouth) named `face-alt`,
       * `face-alt-2`, … beside the normal `face` layer; a timeline crossfades them with opacity.
       * Omit for a static face.
       */
      moodTo?: Mood | Mood[]
      eyes?: 'open' | 'closed'
      /** -1 (look left) … 1 (look right) */
      look?: number
      /** static head tilt (deg, + = clockwise) and whole-body lean (deg, pivot at the feet) */
      tilt?: number
      lean?: number
      /** paint everything in ink with glowing eyes (shadows, monsters, villains) */
      silhouette?: boolean
    }
  >(),
  {
    body: 'robe',
    skin: 'skin',
    skin2: 'skin-2',
    ornament: undefined,
    robe: 'cloth-a',
    sleeve: undefined,
    trim: 'gold',
    legs: 'wood-2',
    hairColor: 'hair',
    beardColor: undefined,
    hatColor: undefined,
    wingColor: 'highlight',
    hair: 'short',
    beard: false,
    hat: 'none',
    cape: false,
    belt: false,
    wings: false,
    arms: true,
    armL: 0,
    armR: 0,
    mood: 'neutral',
    moodTo: undefined,
    eyes: 'open',
    look: 0,
    tilt: 0,
    lean: 0,
    silhouette: false,
  }
)

const col = useCol(props)

const bodyPath = computed(() =>
  props.body === 'tunic'
    ? 'M -46 -205 C -62 -205 -66 -192 -67 -178 L -76 -96 Q -76 -84 -64 -84 L 64 -84 Q 76 -84 76 -96 L 67 -178 C 66 -192 62 -205 46 -205 Z'
    : 'M -46 -205 C -62 -205 -66 -192 -67 -178 L -80 -8 Q -80 0 -72 0 L 72 0 Q 80 0 80 -8 L 67 -178 C 66 -192 62 -205 46 -205 Z'
)
const shadePath = computed(() =>
  props.body === 'tunic'
    ? 'M 22 -205 L 46 -205 C 62 -205 66 -192 67 -178 L 76 -96 Q 76 -84 64 -84 L 34 -84 Z'
    : 'M 22 -205 L 46 -205 C 62 -205 66 -192 67 -178 L 80 -8 Q 80 0 72 0 L 34 0 Z'
)
const hemPath = computed(() =>
  props.body === 'tunic'
    ? 'M -75 -100 L 75 -100 L 76 -96 Q 76 -84 64 -84 L -64 -84 Q -76 -84 -76 -96 Z'
    : 'M -79 -16 L 79 -16 L 80 -8 Q 80 0 72 0 L -72 0 Q -80 0 -80 -8 Z'
)
</script>
