<!--
  The Elizabethan sonnet — Petrarchan courtly love. A lovesick poet sighs in the garden below his
  lady's balcony, holding up a rose; fourteen lines (three quatrains and a closing couplet) write
  themselves on a scroll hung from a garden post; the cruel fair turns her back, and the rose
  becomes a heart pierced by Cupid's arrow.
-->
<template>
  <SceneStage :build="build">
    <Backdrop variant="garden" :celestial="[640, 160]" />

    <!-- the lady's house: a stone wall, joined to a balcony that grows out of it -->
    <g>
      <rect x="900" y="150" width="720" :height="GY - 150" :fill="c('stone')" />
      <path
        :d="bricks"
        fill="none"
        :stroke="c('stone-2')"
        stroke-width="3"
        opacity="0.45"
      />
      <rect
        x="900"
        y="150"
        width="16"
        :height="GY - 150"
        :fill="c('ink')"
        opacity="0.12"
      />
      <!-- eaves -->
      <rect
        x="884"
        y="112"
        width="740"
        height="40"
        rx="6"
        :fill="c('wood-2')"
      />
      <rect
        x="900"
        y="152"
        width="720"
        height="14"
        :fill="c('ink')"
        opacity="0.18"
      />
      <!-- the open French window -->
      <path
        d="M 1105 486 L 1105 340 Q 1105 262 1185 262 Q 1265 262 1265 340 L 1265 486 Z"
        :fill="c('stone-3')"
      />
      <path
        d="M 1117 486 L 1117 344 Q 1117 276 1185 276 Q 1253 276 1253 344 L 1253 486 Z"
        :fill="c('wood-2')"
      />
      <path
        d="M 1117 486 L 1117 344 Q 1117 276 1185 276 Q 1253 276 1253 344 L 1253 486 Z"
        :fill="c('ink')"
        opacity="0.45"
      />
      <g class="cp-night">
        <path
          d="M 1117 486 L 1117 344 Q 1117 276 1185 276 Q 1253 276 1253 344 L 1253 486 Z"
          :fill="c('glow')"
          opacity="0.65"
        />
      </g>
      <path
        d="M 1117 486 L 1117 344 Q 1117 276 1185 276 Q 1190 330 1160 486 Z"
        :fill="c('cloth-a')"
        opacity="0.9"
      />
      <path
        d="M 1253 486 L 1253 344 Q 1253 276 1185 276 Q 1180 330 1210 486 Z"
        :fill="c('cloth-a')"
        opacity="0.9"
      />
      <rect x="1074" y="300" width="30" height="186" rx="4" :fill="c('wood')" />
      <rect x="1266" y="300" width="30" height="186" rx="4" :fill="c('wood')" />
      <rect
        x="1080"
        y="312"
        width="18"
        height="70"
        rx="3"
        :fill="c('wood-3')"
      />
      <rect
        x="1272"
        y="312"
        width="18"
        height="70"
        rx="3"
        :fill="c('wood-3')"
      />
      <!-- a second, small window -->
      <path
        d="M 1488 400 L 1488 320 Q 1488 280 1524 280 Q 1560 280 1560 320 L 1560 400 Z"
        :fill="c('stone-3')"
      />
      <path
        d="M 1496 394 L 1496 322 Q 1496 288 1524 288 Q 1552 288 1552 322 L 1552 394 Z"
        :fill="c('night')"
      />
      <g class="cp-day">
        <path
          d="M 1496 394 L 1496 322 Q 1496 288 1524 288 Q 1552 288 1552 322 L 1552 394 Z"
          :fill="c('sky')"
        />
      </g>
      <g class="cp-night">
        <path
          d="M 1496 394 L 1496 322 Q 1496 288 1524 288 Q 1552 288 1552 322 L 1552 394 Z"
          :fill="c('glow')"
          opacity="0.7"
        />
      </g>
      <path
        d="M 1524 288 L 1524 394 M 1496 340 L 1552 340"
        :stroke="c('stone-3')"
        stroke-width="5"
      />
      <!-- lantern bracketed to the wall -->
      <path
        d="M 1320 330 L 1346 330 M 1346 330 L 1346 346"
        fill="none"
        :stroke="c('metal-2')"
        stroke-width="5"
        stroke-linecap="round"
      />
      <rect
        x="1336"
        y="346"
        width="20"
        height="30"
        rx="4"
        :fill="c('metal-2')"
      />
      <rect x="1341" y="351" width="10" height="20" rx="3" :fill="c('glow')" />
      <g class="cp-night" :fill="c('glow')" pointer-events="none">
        <circle cx="1346" cy="361" r="80" opacity="0.12" />
        <circle cx="1346" cy="361" r="44" opacity="0.18" />
      </g>
    </g>

    <!-- the lady, on the balcony; the balustrade hides her from the waist down -->
    <Figure
      part="lady"
      :x="1185"
      :y="BAL"
      :scale="0.7"
      hair="long"
      hair-color="gold"
      robe="cloth-d"
      trim="gold"
      hat="cap"
      hat-color="cloth-a"
      mood="neutral"
      :look="-1"
      :arm-r="-18"
      :arm-l="8"
    />
    <g>
      <!-- slab, corbels (bolted into the wall) -->
      <rect
        x="930"
        :y="BAL"
        width="510"
        height="22"
        rx="3"
        :fill="c('stone-3')"
      />
      <rect
        x="930"
        :y="BAL + 22"
        width="510"
        height="8"
        :fill="c('ink')"
        opacity="0.2"
      />
      <path
        v-for="x in [976, 1096, 1224, 1344]"
        :key="x"
        :d="`M ${x} ${BAL + 30} L ${x + 36} ${BAL + 30} L ${x + 36} ${BAL + 44} Q ${x + 36} ${BAL + 78} ${x} ${BAL + 84} Z`"
        :fill="c('stone-2')"
      />
      <!-- balustrade -->
      <rect
        x="930"
        :y="BAL - 70"
        width="510"
        height="16"
        rx="6"
        :fill="c('stone-3')"
      />
      <rect
        v-for="i in 12"
        :key="i"
        :x="946 + (i - 1) * 42"
        :y="BAL - 54"
        width="20"
        height="54"
        rx="8"
        :fill="c('stone-3')"
      />
      <rect
        x="930"
        :y="BAL - 54"
        width="510"
        height="54"
        :fill="c('ink')"
        opacity="0.06"
      />
      <rect
        x="920"
        :y="BAL - 78"
        width="26"
        height="78"
        rx="5"
        :fill="c('stone-3')"
      />
      <rect
        x="1424"
        :y="BAL - 78"
        width="26"
        height="78"
        rx="5"
        :fill="c('stone-3')"
      />
    </g>

    <!-- hedge of roses along the foot of the wall -->
    <g>
      <circle
        v-for="(b, i) in bushes"
        :key="i"
        :cx="b[0]"
        :cy="GY - b[2] * 0.6"
        :r="b[2]"
        :fill="c(i % 2 ? 'mid' : 'near')"
      />
      <circle
        v-for="(d, i) in blooms"
        :key="`d${i}`"
        :cx="d[0]"
        :cy="d[1]"
        r="7"
        :fill="c(i % 3 ? 'red' : 'highlight')"
      />
    </g>

    <!-- a post in the garden with the sonnet hung from it -->
    <g>
      <rect
        x="388"
        y="104"
        width="24"
        :height="GY - 104"
        rx="5"
        :fill="c('wood-2')"
      />
      <rect x="236" y="96" width="328" height="20" rx="8" :fill="c('wood')" />
      <path
        d="M 262 116 L 262 142 M 538 116 L 538 142"
        :stroke="c('ink')"
        stroke-width="4"
        stroke-linecap="round"
        opacity="0.7"
      />
      <ellipse
        cx="400"
        :cy="GY + 2"
        rx="48"
        ry="9"
        :fill="c('ink')"
        opacity="0.2"
      />
    </g>
    <Scroll part="sonnet" :x="400" :y="148" :width="280" :length="404" sonnet />

    <!-- the poet -->
    <ellipse
      data-part="poet-shadow"
      :cx="790"
      :cy="GY - 4"
      rx="86"
      ry="9"
      :fill="c('ink')"
      opacity="0.25"
    />
    <Figure
      part="poet"
      :x="780"
      :y="GY - 8"
      :scale="1.05"
      body="tunic"
      robe="cloth-b"
      trim="gold"
      legs="cloth-a"
      belt="gold"
      hat="cap"
      hat-color="cloth-a"
      hair-color="hair"
      mood="happy"
      mood-to="sad"
      :look="1"
      :tilt="-8"
      :arm-r="-40"
    >
      <!-- the rose rides at the far end of the raised arm … -->
      <template #hand-r>
        <g data-part="rose" data-pivot>
          <path
            d="M 0 -14 L 0 40"
            :stroke="c('green-2')"
            stroke-width="5"
            stroke-linecap="round"
          />
          <path
            d="M 0 22 Q 16 18 22 8"
            fill="none"
            :stroke="c('green-2')"
            stroke-width="4"
            stroke-linecap="round"
          />
          <circle cy="52" r="15" :fill="c('red')" />
          <circle cy="52" r="6" :fill="c('cloth-a')" />
        </g>
        <!-- … then becomes a heart pierced by Cupid's arrow -->
        <g data-part="love" data-pivot transform="translate(0 72) rotate(180)">
          <g transform="scale(0.5)">
            <circle r="110" :fill="c('glow')" opacity="0.4" />
            <path
              d="M 0 52 C -100 -20 -62 -90 0 -44 C 62 -90 100 -20 0 52 Z"
              :fill="c('red')"
            />
            <path
              d="M -40 -30 C -30 -50 -14 -48 -8 -38"
              fill="none"
              :stroke="c('highlight')"
              stroke-width="8"
              stroke-linecap="round"
              opacity="0.7"
            />
            <path
              d="M -130 -64 L 118 40"
              :stroke="c('wood-3')"
              stroke-width="9"
              stroke-linecap="round"
            />
            <path d="M 104 20 L 146 48 L 108 62 Z" :fill="c('metal')" />
            <path
              d="M -130 -64 L -158 -62 L -146 -84 Z M -112 -56 L -140 -54 L -128 -76 Z"
              :fill="c('highlight')"
            />
          </g>
        </g>
      </template>
    </Figure>

    <!-- his sighs -->
    <g :fill="c('highlight')" opacity="0.9">
      <g
        v-for="i in 3"
        :key="i"
        data-part="sigh"
        :transform="`translate(${850 + i * 16} ${526 - i * 8})`"
      >
        <circle r="9" />
        <circle cx="12" cy="-4" r="6" />
        <circle cx="-9" cy="-3" r="5" />
      </g>
    </g>
  </SceneStage>
</template>

<script setup lang="ts">
import { Backdrop, Figure, Scroll, SceneStage, c, type SceneApi } from './kit'

defineProps<{ period: string; title: string; initial?: string }>()

/** ground line; the balcony floor */
const GY = 790
const BAL = 486

const bricks = (() => {
  let d = ''
  for (let y = 190, r = 0; y < GY; y += 40, r++) {
    d += `M 900 ${y} L 1620 ${y} `
    for (let x = 900 + (r % 2 ? 40 : 0); x < 1620; x += 80)
      d += `M ${x} ${y} L ${x} ${Math.min(y + 40, GY)} `
  }
  return d
})()
const bushes = [
  [930, 0, 46],
  [1010, 0, 54],
  [1100, 0, 42],
  [1330, 0, 50],
  [1420, 0, 56],
  [1510, 0, 46],
  [1590, 0, 52],
]
const blooms = [
  [920, 746],
  [1000, 732],
  [1020, 752],
  [1092, 750],
  [1336, 740],
  [1320, 758],
  [1410, 728],
  [1432, 750],
  [1500, 748],
  [1580, 738],
]

function build({ tl, p, establish, bob, blink, turn }: SceneApi) {
  tl.set(p('sonnet', 'paper'), { scaleY: 0, transformOrigin: '50% 0%' }, 0)
  tl.set(p('sonnet', 'roller-b'), { y: 0 }, 0)
  tl.set(`${p('sonnet', 'lines')} path`, { opacity: 0 }, 0)
  tl.set(p('love'), { scale: 0, opacity: 0 }, 0)
  tl.set(p('sigh'), { opacity: 0 }, 0)

  establish()
  bob(p('poet'), 0.1, undefined, 3, 1.4)
  blink('lady', 0.5)

  // the poet arrives, leans toward the balcony and holds up his rose
  tl.from(p('poet'), { x: '-=300', duration: 0.6, ease: 'power2.out' }, 0.1)
  tl.from(
    p('poet-shadow'),
    { x: '-=300', duration: 0.6, ease: 'power2.out' },
    0.1
  )
  tl.to(
    p('poet', 'pose'),
    { rotation: 7, duration: 0.3, ease: 'back.out(1.6)' },
    0.65
  )
  turn(p('poet', 'arm-r'), 0.7, -150, 0.35, 'back.out(1.6)')

  // he sighs…
  tl.fromTo(
    p('sigh'),
    { opacity: 0.9, y: 0, scale: 0.5 },
    {
      opacity: 0,
      y: -54,
      scale: 1.25,
      duration: 0.7,
      stagger: 0.2,
      ease: 'power1.out',
    },
    0.8
  )

  // …and the sonnet writes itself: 14 lines, the last two set off as a couplet
  tl.from(
    p('sonnet'),
    { y: '-=40', opacity: 0, duration: 0.3, ease: 'power2.out' },
    0.55
  )
  tl.to(
    p('sonnet', 'paper'),
    { scaleY: 1, duration: 0.45, ease: 'power2.out' },
    0.7
  )
  tl.from(
    p('sonnet', 'roller-b'),
    { y: -404, duration: 0.45, ease: 'power2.out' },
    0.7
  )
  tl.fromTo(
    `${p('sonnet', 'lines')} path`,
    { opacity: 0, scaleX: 0 },
    {
      opacity: 0.6,
      scaleX: 1,
      duration: 0.12,
      stagger: 0.075,
      ease: 'power1.out',
      transformOrigin: '0% 50%',
    },
    1.1
  )

  // the cruel fair turns her back, nose in the air
  tl.to(p('lady'), { scaleX: 0, duration: 0.12, ease: 'power1.in' }, 2.05)
  tl.to(p('lady'), { scaleX: -1, duration: 0.2, ease: 'back.out(2)' }, 2.17)
  turn(p('lady', 'head'), 2.2, -9, 0.25)
  tl.to(p('lady', 'eyes'), { scaleY: 0.1, duration: 0.1 }, 2.2)

  // the rose becomes a heart pierced by Cupid's arrow
  tl.to(p('rose'), { scale: 0, duration: 0.15, ease: 'power2.in' }, 2.15)
  tl.to(
    p('love'),
    { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2.4)' },
    2.25
  )

  // his hopeful smile falls: the face crossfades to a sad one, eyes drop, head and shoulders slump
  tl.to(
    p('poet', 'face'),
    { opacity: 0, duration: 0.14, ease: 'power1.in' },
    2.17
  )
  tl.to(
    p('poet', 'face-alt'),
    { opacity: 1, duration: 0.14, ease: 'power1.out' },
    2.17
  )
  tl.to(p('poet', 'eyes'), { y: 7, duration: 0.25, ease: 'power2.out' }, 2.2)
  turn(p('poet', 'head'), 2.2, 12, 0.4, 'power2.out')
  tl.to(
    p('poet', 'pose'),
    { rotation: -2, scaleY: 0.955, duration: 0.45, ease: 'power2.out' },
    2.25
  )
  turn(p('poet', 'arm-r'), 2.35, -128, 0.45, 'power2.out')
}
</script>
