<!--
  Beowulf — night in Heorot. The door bursts open, Grendel looms in the moonlight and reaches
  for the sleepers; Beowulf springs up, grapples, and tears off the monster's arm.
-->
<template>
  <SceneStage :build="build">
    <Backdrop variant="mead-hall" time="night">
      <template #doorway>
        <Monster
          part="grendel"
          :x="1450"
          :y="840"
          :scale="1.4"
          flip
          rim="night-2"
        />
      </template>
    </Backdrop>

    <!-- Grendel's shadow stretching across the moonlit floor -->
    <g data-part="shadow" data-pivot transform="translate(1300 724)">
      <path
        d="M -90 0 C -200 40 -420 120 -520 160 C -470 176 -380 176 -330 150 C -250 110 -120 50 60 0 Z"
        :fill="c('ink')"
        opacity="0.5"
      />
    </g>

    <!-- sleeping thanes at the mead table -->
    <Figure
      part="thane-1"
      :x="160"
      :y="720"
      :scale="0.86"
      robe="cloth-b"
      hair-color="hair"
      beard
      eyes="closed"
      :tilt="16"
      :lean="-4"
    />
    <Figure
      part="thane-2"
      :x="320"
      :y="720"
      :scale="0.86"
      robe="cloth-d"
      hair="long"
      hair-color="gold"
      eyes="closed"
      :tilt="-14"
      :lean="5"
    />
    <Table :x="240" :y="720" :width="380" cloth="cloth-c" />
    <g
      :fill="c('highlight')"
      class="cp-serif"
      font-size="40"
      font-style="italic"
    >
      <text data-part="zzz" x="215" y="400">z</text>
      <text data-part="zzz" x="245" y="368" font-size="30">z</text>
      <text data-part="zzz" x="385" y="410">z</text>
    </g>

    <!-- Beowulf, lying on the bench, waiting -->
    <Table
      :x="760"
      :y="720"
      :width="440"
      :scale="0.7"
      :cloth="false"
      :items="false"
      top="wood-3"
    />
    <Figure
      part="beowulf"
      :x="930"
      :y="720"
      body="tunic"
      robe="metal"
      sleeve="metal-2"
      cape="cloth-a"
      belt="gold"
      hat="helmet"
      hair-color="gold"
      mood="stern"
      trim="gold-2"
    >
      <template #hand-r>
        <g data-part="trophy" opacity="0"
          ><Claw :rotate="90" :scale="0.75" :x="0" :y="10"
        /></g>
      </template>
    </Figure>

    <!-- the claw reaching in through the door -->
    <Claw part="claw" :x="1196" :y="562" :arm="240" flip />
    <Burst part="burst" :x="1070" :y="556" :scale="0.8" />
  </SceneStage>
</template>

<script setup lang="ts">
import {
  Backdrop,
  Burst,
  Claw,
  Figure,
  Monster,
  SceneStage,
  Table,
  c,
  type SceneApi,
} from './kit'

defineProps<{ period: string; title: string; initial?: string }>()

function build({
  tl,
  p,
  establish,
  flicker,
  shake,
  pop,
  exit,
  blink,
  turn,
}: SceneApi) {
  // initial state
  tl.set(p('beowulf', 'pose'), { rotation: -90, y: -171 }, 0)
  tl.set(p('claw'), { opacity: 0 }, 0)
  tl.set(p('burst'), { scale: 0, opacity: 0 }, 0)
  tl.set(p('shadow'), { scaleX: 0.2, opacity: 0 }, 0)
  tl.set(p('grendel'), { x: '+=300' }, 0)

  // establish: a quiet hall, fire crackling, thanes snoring
  establish()
  flicker(p('fire', 'flame'), 0)
  flicker(p('glow'), 0.05)
  tl.from(
    p('zzz'),
    { y: '+=40', opacity: 0, duration: 0.5, stagger: 0.12, ease: 'power2.out' },
    0.05
  )

  // the door bursts open
  tl.to(p('door'), { scaleX: 0.1, duration: 0.28, ease: 'power4.out' }, 0.6)
  shake(0.62, 16)
  tl.to(p('moonlight'), { opacity: 1, duration: 0.35 }, 0.62)
  exit(p('zzz'), 0.62, 0.15)

  // Grendel looms; his shadow stretches in
  tl.to(p('grendel'), { x: '-=300', duration: 0.55, ease: 'power3.out' }, 0.72)
  tl.to(
    p('shadow'),
    { scaleX: 1, opacity: 1, duration: 0.6, ease: 'power2.out' },
    0.75
  )
  tl.from(
    p('grendel', 'eyes'),
    { scale: 0, duration: 0.25, ease: 'back.out(3)' },
    1.05
  )
  turn(p('grendel', 'arm-r'), 1.1, -70, 0.35)

  // the claw reaches for the sleepers
  tl.to(p('claw'), { opacity: 1, duration: 0.1 }, 1.15)
  tl.to(p('claw'), { x: 1064, duration: 0.5, ease: 'power3.out' }, 1.15)

  // Beowulf was not asleep
  blink('beowulf', 1.3)
  tl.to(
    p('beowulf', 'pose'),
    { rotation: 0, y: 0, duration: 0.45, ease: 'back.out(1.5)' },
    1.45
  )
  turn(p('beowulf', 'arm-r'), 1.68, -80, 0.25, 'power3.out')

  // the grapple
  pop(p('burst'), 1.92, 0.3)
  shake(1.92, 20, 0.45)
  tl.to(
    p('claw'),
    { x: '+=26', duration: 0.07, yoyo: true, repeat: 3, ease: 'sine.inOut' },
    1.95
  )
  tl.to(p('burst'), { opacity: 0, scale: 1.4, duration: 0.25 }, 2.2)

  // the arm torn away; Grendel flees
  exit(p('claw'), 2.22, 0.08)
  tl.set(p('trophy'), { opacity: 1 }, 2.24)
  turn(p('beowulf', 'arm-r'), 2.22, -168, 0.35, 'back.out(1.8)')
  tl.to(p('grendel'), { x: '+=320', duration: 0.45, ease: 'power2.in' }, 2.25)
  tl.to(
    p('shadow'),
    { scaleX: 0, opacity: 0, duration: 0.4, ease: 'power2.in' },
    2.25
  )
  tl.to(
    p('beowulf', 'pose'),
    { y: -18, duration: 0.15, yoyo: true, repeat: 1, ease: 'power1.out' },
    2.45
  )
}
</script>
