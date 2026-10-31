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

            <!-- face -->
            <g :transform="`translate(${look * 10} -60)`">
              <g data-part="eyes" data-pivot>
                <template v-if="eyes === 'closed'">
                  <path
                    d="M -30 2 Q -20 8 -10 2 M 10 2 Q 20 8 30 2"
                    fill="none"
                    :stroke="eyeColor"
                    stroke-width="5"
                    stroke-linecap="round"
                  />
                </template>
                <template v-else>
                  <circle cx="-20" cy="0" r="7.5" :fill="eyeColor" />
                  <circle cx="20" cy="0" r="7.5" :fill="eyeColor" />
                </template>
              </g>
              <!-- expression layer(s): `face` shows `mood`; `face-alt` (only when moodTo is set) starts hidden --
                 a timeline crossfades the two (opacity) to change expression mid-scene -->
              <template v-if="!silhouette">
                <g
                  v-for="f in faces"
                  :key="f.part"
                  :data-part="f.part"
                  :style="f.hidden ? 'opacity:0' : undefined"
                  fill="none"
                  :stroke="c('ink')"
                  stroke-width="5"
                  stroke-linecap="round"
                >
                  <path
                    v-if="f.mood === 'stern'"
                    d="M -34 -22 L -10 -14 M 34 -22 L 10 -14"
                  />
                  <path
                    v-if="f.mood === 'alarmed'"
                    d="M -32 -22 Q -20 -32 -8 -24 M 32 -22 Q 20 -32 8 -24"
                  />
                  <path
                    v-if="f.mood === 'sad'"
                    d="M -32 -16 L -10 -24 M 32 -16 L 10 -24"
                  />
                  <path
                    v-if="f.mood === 'happy' && !beard"
                    d="M -14 24 Q 0 36 14 24"
                  />
                  <path
                    v-if="f.mood === 'happy' && beard"
                    d="M -12 34 Q 0 42 12 34"
                    :stroke="c('highlight')"
                  />
                  <ellipse
                    v-if="f.mood === 'alarmed'"
                    cx="0"
                    cy="30"
                    rx="7"
                    ry="9"
                    :fill="c('ink')"
                    stroke="none"
                  />
                  <path v-if="f.mood === 'sad'" d="M -12 32 Q 0 24 12 32" />
                </g>
              </template>
            </g>

            <!-- headwear -->
            <g v-if="hat === 'crown'">
              <path
                d="M -46 -110 L -50 -158 L -26 -132 L 0 -168 L 26 -132 L 50 -158 L 46 -110 Z"
                :fill="col(hatColor ?? 'gold')"
              />
              <rect
                x="-48"
                y="-118"
                width="96"
                height="14"
                rx="3"
                :fill="col(hatColor ?? 'gold')"
              />
              <path
                d="M -48 -110 L 48 -110 L 48 -104 L -48 -104 Z"
                :fill="col('ink')"
                opacity="0.15"
              />
              <circle cx="0" cy="-122" r="7" :fill="col('red')" />
              <circle
                cx="-50"
                cy="-160"
                r="5"
                :fill="col(hatColor ?? 'gold')"
              />
              <circle cx="50" cy="-160" r="5" :fill="col(hatColor ?? 'gold')" />
              <circle cx="0" cy="-170" r="6" :fill="col(hatColor ?? 'gold')" />
            </g>
            <g v-if="hat === 'helmet'">
              <path
                d="M -66 -64 C -68 -128 -36 -140 0 -140 C 36 -140 68 -128 66 -64 Z"
                :fill="col(hatColor ?? 'metal')"
              />
              <path
                d="M 18 -138 C 50 -132 68 -112 66 -64 L 40 -64 C 44 -100 36 -124 18 -138 Z"
                :fill="col('ink')"
                opacity="0.12"
              />
              <rect
                x="-5"
                y="-140"
                width="10"
                height="76"
                :fill="col('gold')"
              />
              <rect
                x="-68"
                y="-82"
                width="136"
                height="16"
                rx="4"
                :fill="col(hatColor ? hatColor : 'metal-2')"
              />
              <path
                d="M -42 -82 Q -24 -96 -6 -82 M 42 -82 Q 24 -96 6 -82"
                fill="none"
                :stroke="col('gold')"
                stroke-width="5"
                stroke-linecap="round"
              />
              <rect
                x="-6"
                y="-80"
                width="12"
                height="44"
                rx="4"
                :fill="col('metal-2')"
              />
              <path
                d="M -68 -70 L -50 -70 L -48 -22 Q -60 -24 -68 -34 Z M 68 -70 L 50 -70 L 48 -22 Q 60 -24 68 -34 Z"
                :fill="col(hatColor ?? 'metal')"
              />
            </g>
            <path
              v-if="hat === 'hood'"
              d="M -72 -46 C -76 -130 -38 -146 0 -146 C 38 -146 76 -130 72 -46 L 58 -54 C 58 -110 30 -124 0 -124 C -30 -124 -58 -110 -58 -54 Z"
              :fill="col(hatColor ?? 'cloth-d')"
            />
            <g v-if="hat === 'hat'">
              <path
                d="M -42 -112 L -36 -196 Q -36 -204 -28 -204 L 28 -204 Q 36 -204 36 -196 L 42 -112 Z"
                :fill="col(hatColor ?? 'ink')"
              />
              <rect
                x="-42"
                y="-136"
                width="84"
                height="16"
                :fill="col('gold')"
                opacity="0.9"
              />
              <ellipse
                cx="0"
                cy="-112"
                rx="88"
                ry="15"
                :fill="col(hatColor ?? 'ink')"
              />
            </g>
            <g v-if="hat === 'cap'">
              <ellipse
                cx="12"
                cy="-118"
                rx="74"
                ry="28"
                :fill="col(hatColor ?? 'cloth-a')"
              />
              <path
                d="M -56 -104 Q 12 -88 82 -104 L 80 -96 Q 12 -80 -54 -96 Z"
                :fill="col('ink')"
                opacity="0.18"
              />
              <circle
                cx="40"
                cy="-144"
                r="8"
                :fill="col(hatColor ?? 'cloth-a')"
              />
            </g>
          </g>
        </g>

        <!-- arms -->
        <g v-if="arms" transform="translate(-56 -190)">
          <g
            data-part="arm-l"
            data-pivot
            :transform="armL ? `rotate(${armL})` : undefined"
          >
            <rect
              x="-16"
              y="-14"
              width="32"
              height="104"
              rx="16"
              :fill="col(sleeve ?? robe)"
            />
            <rect
              x="-16"
              y="-14"
              width="32"
              height="104"
              rx="16"
              :fill="col('ink')"
              opacity="0.1"
            />
            <rect
              v-if="ornament"
              x="-16"
              y="66"
              width="32"
              height="8"
              :fill="col(ornament)"
            />
            <g transform="translate(0 100)"><slot name="hand-l" /></g>
            <circle cx="0" cy="100" r="16" :fill="col(skin)" />
            <g transform="translate(0 100)"><slot name="held-l" /></g>
          </g>
        </g>
        <g v-if="arms" transform="translate(56 -190)">
          <g
            data-part="arm-r"
            data-pivot
            :transform="armR ? `rotate(${armR})` : undefined"
          >
            <rect
              x="-16"
              y="-14"
              width="32"
              height="104"
              rx="16"
              :fill="col(sleeve ?? robe)"
            />
            <rect
              x="-16"
              y="-14"
              width="32"
              height="104"
              rx="16"
              :fill="col('ink')"
              opacity="0.18"
            />
            <rect
              v-if="ornament"
              x="-16"
              y="66"
              width="32"
              height="8"
              :fill="col(ornament)"
            />
            <g transform="translate(0 100)"><slot name="hand-r" /></g>
            <circle cx="0" cy="100" r="16" :fill="col(skin)" />
            <g transform="translate(0 100)"><slot name="held-r" /></g>
          </g>
        </g>
      </g>
    </g>
  </KitPlace>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import KitPlace from './KitPlace.vue'
import { c, place, type Placement } from './util'

type Mood = 'neutral' | 'happy' | 'stern' | 'alarmed' | 'sad'
type Hat = 'none' | 'crown' | 'helmet' | 'hood' | 'wimple' | 'hat' | 'cap'

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

const col = (role: string) => (props.silhouette ? c('ink') : c(role))
const faces = computed(() => [
  { part: 'face', mood: props.mood, hidden: false },
  ...[props.moodTo ?? []].flat().map((mood, i) => ({
    part: i ? `face-alt-${i + 1}` : 'face-alt',
    mood,
    hidden: true,
  })),
])
const eyeColor = computed(() => (props.silhouette ? c('glow') : c('ink')))

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
