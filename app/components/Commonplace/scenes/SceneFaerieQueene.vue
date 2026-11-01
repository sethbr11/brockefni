<!--
  The Faerie Queene — the Redcrosse Knight strikes at the serpent Error in her cave,
  while Una, in white with her lamb, looks on.
-->
<template>
  <SceneStage :build="build">
    <Backdrop variant="forest" :celestial="[560, 160]" />

    <!-- Error's cave -->
    <KitPlace :x="CAVE_X" :y="780">
      <path
        d="M -260 0 C -260 -230 -120 -380 40 -380 C 200 -380 300 -230 300 0 Z"
        :fill="c('stone-2')"
      />
      <path
        d="M -170 0 C -170 -160 -80 -280 40 -280 C 160 -280 210 -160 210 0 Z"
        :fill="c('ink')"
      />
      <circle
        data-part="cave-eyes"
        cx="20"
        cy="-150"
        r="10"
        :fill="c('glow')"
      />
      <circle
        data-part="cave-eyes"
        cx="70"
        cy="-150"
        r="10"
        :fill="c('glow')"
      />
      <!-- her brood, left in the den once she slithers out (I.i.15: they flee into her mouth at the light) -->
      <g data-part="brood">
        <g
          v-for="(b, i) in BROOD"
          :key="i"
          :transform="`translate(${b[0]} ${b[1]})`"
        >
          <circle cx="-5" cy="0" r="3.5" :fill="c('glow')" />
          <circle cx="5" cy="0" r="3.5" :fill="c('glow')" />
        </g>
      </g>
    </KitPlace>
    <!-- Error: "Halfe like a serpent horribly displaide, / But th'other halfe did womans shape retaine" (I.i.14) -->
    <Serpent
      part="error"
      :x="ERR_X"
      :y="785"
      :scale="2.1"
      flip
      color="green-2"
      pattern
    >
      <template #head>
        <!-- scaly bodice blends the coils into her woman's half -->
        <path
          d="M -15 8 C -17 -12 -19 -30 -17 -40 L 17 -40 C 19 -30 17 -12 15 8 Z"
          :fill="c('green-2')"
        />
        <path
          d="M -12 -8 L 12 -8 M -14 -22 L 14 -22"
          :stroke="c('gold')"
          stroke-width="2.5"
          stroke-linecap="round"
        />
        <!-- clawing arms reach forward -->
        <g data-part="error-arms">
          <path
            d="M 14 -36 C 30 -34 40 -26 50 -32"
            fill="none"
            :stroke="c('skin-2')"
            stroke-width="7"
            stroke-linecap="round"
          />
          <path
            d="M 50 -32 L 58 -38 M 50 -32 L 59 -31 M 50 -32 L 56 -25"
            :stroke="c('skin-2')"
            stroke-width="3"
            stroke-linecap="round"
          />
          <path
            d="M -12 -36 C 2 -26 22 -20 36 -22"
            fill="none"
            :stroke="c('skin-2')"
            stroke-width="7"
            stroke-linecap="round"
          />
          <path
            d="M 36 -22 L 44 -27 M 36 -22 L 45 -20 M 36 -22 L 42 -14"
            :stroke="c('skin-2')"
            stroke-width="3"
            stroke-linecap="round"
          />
        </g>
        <!-- wild hair behind, then neck and head -->
        <path
          d="M -20 -54 C -26 -78 -6 -88 8 -82 C 22 -78 26 -62 22 -48 C 20 -34 26 -26 30 -18 C 18 -22 12 -34 10 -44 C 0 -40 -12 -36 -22 -24 C -22 -36 -18 -44 -20 -54 Z"
          :fill="c('ink')"
        />
        <rect x="-5" y="-48" width="10" height="10" :fill="c('skin-2')" />
        <circle cx="2" cy="-60" r="15" :fill="c('skin')" />
        <!-- glaring eyes, furrowed brows, snarl -->
        <path
          d="M -3 -68 L 4 -64 M 10 -64 L 16 -68"
          :stroke="c('ink')"
          stroke-width="2.5"
          stroke-linecap="round"
        />
        <circle cx="3" cy="-61" r="2.4" :fill="c('ink')" />
        <circle cx="12" cy="-61" r="2.4" :fill="c('ink')" />
        <path
          d="M 2 -52 C 6 -55 10 -55 14 -52"
          fill="none"
          :stroke="c('ink')"
          stroke-width="2.2"
          stroke-linecap="round"
        />
      </template>
    </Serpent>

    <!-- Una and her lamb -->
    <Figure
      part="una"
      :x="UNA_X"
      :y="790"
      flip
      :scale="0.9"
      robe="highlight"
      trim="gold"
      hat="wimple"
      hat-color="highlight"
      mood="neutral"
      :mood-to="['alarmed', 'happy']"
      :look="1"
      :arm-r="-14"
      :arm-l="14"
    />
    <KitPlace part="lamb" :x="LAMB_X" :y="790" flip>
      <ellipse cx="0" cy="-46" rx="46" ry="34" :fill="c('highlight')" />
      <circle
        v-for="(o, i) in [-30, -10, 14, 30]"
        :key="i"
        :cx="o"
        :cy="-70 + (i % 2) * 6"
        r="18"
        :fill="c('highlight')"
      />
      <circle cx="46" cy="-62" r="18" :fill="c('cloth-c')" />
      <circle cx="53" cy="-66" r="3" :fill="c('ink')" />
      <path
        d="M -26 -16 L -26 0 M 24 -16 L 24 0"
        :stroke="c('ink')"
        stroke-width="7"
        stroke-linecap="round"
      />
    </KitPlace>

    <!-- the Redcrosse Knight -->
    <Figure
      part="knight"
      :x="KNIGHT_X"
      :y="785"
      :scale="1.15"
      body="tunic"
      robe="metal"
      sleeve="metal-2"
      trim="metal-2"
      legs="metal-2"
      belt="gold"
      hat="helmet"
      cape="cloth-a"
      mood="stern"
      :arm-r="-70"
      :arm-l="30"
    >
      <!-- sword: blade runs along the forearm, away from the shoulder; the shield is strapped on in front of the hand -->
      <template #hand-r><Sword :rotate="180" :scale="0.8" /></template>
      <template #held-l
        ><Shield
          shape="heater"
          color="highlight"
          emblem="cross"
          mark="red"
          :scale="0.7"
          :rotate="-30"
          :x="-6"
          :y="8"
      /></template>
    </Figure>
    <Burst part="burst" :x="BURST_X" :y="BURST_Y" :scale="0.9" />
  </SceneStage>
</template>

<script setup lang="ts">
import {
  Backdrop,
  Burst,
  Figure,
  KitPlace,
  SceneStage,
  Serpent,
  Shield,
  Sword,
  c,
  type SceneApi,
} from './kit'

defineProps<{ period: string; title: string; initial?: string }>()

// stage layout, left to right: knight · Error (in front of her cave) · lamb · Una
const CAVE_X = 940
const ERR_X = 940 // Error's resting (tail) anchor once she is out of the cave
const KNIGHT_X = 390 // where he stops to strike
const LAMB_X = 1335
const UNA_X = 1480
const BURST_X = 840
const BURST_Y = 600
/** tiny eye-pairs of Error's brood in the cave dark (cave-local coords) */
const BROOD: [number, number][] = [
  [-60, -60],
  [-10, -95],
  [40, -40],
  [95, -80],
  [130, -30],
  [-110, -25],
]

function build({
  tl,
  p,
  establish,
  sway,
  blink,
  turn,
  pop,
  shake,
  flicker,
}: SceneApi) {
  tl.set(p('burst'), { scale: 0, opacity: 0 }, 0)
  // Error waits unseen in the dark of her cave
  tl.set(p('error'), { x: ERR_X + 90, scale: 0.7, opacity: 0 }, 0)
  establish()
  sway(p('trees'), 0, undefined, 1.5, 2)
  tl.set(p('brood'), { opacity: 0 }, 0)
  flicker(p('cave-eyes'), 0, 0.4)
  blink('una', 0.4)

  // Error slithers out of the dark, toward the knight; her own eyes leave the cave with her
  tl.to(p('cave-eyes'), { opacity: 0, duration: 0.2 }, 0.42)
  tl.to(p('error'), { opacity: 1, duration: 0.25 }, 0.4)
  // her brood glints in the den behind her, then hides when the light of the strike flashes
  tl.to(p('brood'), { opacity: 0.85, duration: 0.3 }, 0.75)
  tl.to(p('brood'), { opacity: 0, duration: 0.12 }, 2.02)
  tl.to(
    p('error'),
    { x: ERR_X, scale: 1, duration: 0.7, ease: 'power2.out' },
    0.4
  )
  tl.to(
    p('error', 'head'),
    { rotation: -12, duration: 0.3, yoyo: true, repeat: 3, ease: 'sine.inOut' },
    0.8
  )
  tl.to(
    p('error', 'error-arms'),
    { rotation: -14, duration: 0.2, yoyo: true, repeat: 3, ease: 'sine.inOut' },
    0.9
  )

  // the knight advances, guarding with the shield
  tl.to(p('knight'), { x: KNIGHT_X, duration: 0.8, ease: 'power2.out' }, 0.5)

  // Una has been watching calmly; as Error rears up she gasps, leans away and throws up her hands
  turn(p('una', 'head'), 0.5, 6, 0.4, 'sine.inOut')
  tl.to(p('una', 'face'), { opacity: 0, duration: 0.12 }, 1.0)
  tl.to(p('una', 'face-alt'), { opacity: 1, duration: 0.12 }, 1.0)
  tl.to(
    p('una', 'eyes'),
    { scale: 1.3, duration: 0.15, ease: 'back.out(2)' },
    1.0
  )
  turn(p('una', 'arm-r'), 1.0, -78, 0.28, 'back.out(2)')
  turn(p('una', 'arm-l'), 1.0, 78, 0.28, 'back.out(2)')
  turn(p('una', 'pose'), 1.0, 8, 0.28, 'back.out(2)')
  tl.to(p('lamb'), { y: '-=14', duration: 0.12, yoyo: true, repeat: 3 }, 1.0)

  // wind up… strike
  turn(p('knight', 'arm-r'), 1.45, -185, 0.35, 'power2.out')
  turn(p('knight', 'pose'), 1.5, -8, 0.3, 'power2.out')
  turn(p('knight', 'arm-r'), 1.9, -92, 0.14, 'power4.in')
  turn(p('knight', 'pose'), 1.9, 10, 0.14, 'power4.in')
  pop(p('burst'), 2.02, 0.3)
  shake(2.02, 16)
  tl.to(p('burst'), { opacity: 0, scale: 1.4, duration: 0.22 }, 2.28)
  tl.to(p('error'), { x: '+=40', duration: 0.25, ease: 'power2.out' }, 2.05)
  tl.to(p('error', 'head'), { rotation: 22, duration: 0.25 }, 2.05)

  // Error reels back — and Una's fear turns to joy: arms overhead, a little hop
  tl.to(p('una', 'face-alt'), { opacity: 0, duration: 0.12 }, 2.16)
  tl.to(p('una', 'face-alt-2'), { opacity: 1, duration: 0.12 }, 2.16)
  tl.to(p('una', 'eyes'), { scale: 1, duration: 0.15 }, 2.16)
  turn(p('una', 'arm-r'), 2.16, -158, 0.3, 'back.out(2)')
  turn(p('una', 'arm-l'), 2.16, 158, 0.3, 'back.out(2)')
  turn(p('una', 'pose'), 2.16, -3, 0.3, 'back.out(2)')
  tl.to(
    p('una', 'pose'),
    { y: -16, duration: 0.1, yoyo: true, repeat: 3, ease: 'power1.out' },
    2.22
  )
  tl.to(
    p('lamb'),
    { y: '-=18', duration: 0.1, yoyo: true, repeat: 3, ease: 'power1.out' },
    2.25
  )
}
</script>
