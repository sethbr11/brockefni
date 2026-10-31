<!--
  Sir Gawain and the Green Knight — the Green Knight gallops into Camelot's Christmas feast,
  offers his neck, and Gawain swings the axe… and the Knight calmly holds up his own head.
-->
<template>
  <SceneStage :build="build">
    <Backdrop variant="castle-hall" />

    <!-- the high table -->
    <!-- each royal is drawn twice at the same spot: a pleasant face, and an astonished one on top (faded in when the Knight picks up his head) -->
    <Figure
      part="arthur"
      :x="1060"
      :y="640"
      :scale="0.82"
      hat="crown"
      beard
      robe="cloth-b"
      cape="cloth-a"
      :look="-1"
      mood="happy"
    />
    <Figure
      part="arthur-aghast"
      :x="1060"
      :y="640"
      :scale="0.82"
      hat="crown"
      beard
      robe="cloth-b"
      cape="cloth-a"
      :look="-1"
      mood="alarmed"
    />
    <Figure
      part="guinevere"
      :x="1250"
      :y="640"
      :scale="0.8"
      hat="crown"
      hair="long"
      hair-color="gold"
      robe="cloth-d"
      :look="-1"
      mood="happy"
    />
    <Figure
      part="guinevere-aghast"
      :x="1250"
      :y="640"
      :scale="0.8"
      hat="crown"
      hair="long"
      hair-color="gold"
      robe="cloth-d"
      :look="-1"
      mood="alarmed"
    />
    <Table :x="1150" :y="640" :width="640" cloth="highlight" />

    <!-- Gawain, axe in hand (the Knight hands it over as he dismounts) -->
    <Figure
      part="gawain"
      :x="1010"
      :y="780"
      :scale="0.95"
      flip
      body="tunic"
      robe="cloth-a"
      trim="gold"
      belt="gold"
      legs="cloth-b"
      mood="stern"
      :arm-r="-150"
      :arm-l="20"
    >
      <template #hand-r
        ><Axe part="gawain-axe" :rotate="180" :scale="0.9" haft="green-2"
      /></template>
      <template #held-l
        ><Shield
          shape="heater"
          color="red"
          emblem="pentangle"
          :scale="0.55"
          :rotate="-20"
          :x="-4"
          :y="8"
      /></template>
    </Figure>

    <!-- the Green Knight, green all over, on his green horse caparisoned in gold -->
    <KitPlace part="rider" :x="300" :y="780">
      <Horse
        :scale="0.95"
        coat="green"
        mane="green-2"
        saddle="gold"
        braid="gold"
      />
      <Figure
        part="knight"
        :x="0"
        :y="-120"
        :scale="1"
        skin="green"
        skin2="green-2"
        robe="green-2"
        sleeve="green-2"
        trim="gold"
        ornament="gold"
        belt="gold"
        hair="short"
        hair-color="green-2"
        beard="long"
        beard-color="green-2"
        mood="happy"
        :arm-l="40"
      >
        <!-- a bough of holly in one hand… -->
        <template #hand-l>
          <g data-part="holly" transform="scale(1.3)">
            <path
              d="M 0 14 L 0 -96"
              :stroke="c('wood-2')"
              stroke-width="5"
              stroke-linecap="round"
            />
            <path
              v-for="(l, i) in holly"
              :key="i"
              :d="leaf"
              :fill="c('green-4')"
              :stroke="c('ink')"
              stroke-opacity="0.4"
              stroke-width="2.5"
              stroke-linejoin="round"
              :transform="`translate(0 ${l[0]}) rotate(${l[1]}) scale(0.8)`"
            />
            <!-- glossy midribs -->
            <path
              v-for="(l, i) in holly"
              :key="`v${i}`"
              d="M 0 -6 L 0 -44"
              :stroke="c('green-3')"
              stroke-width="3"
              stroke-linecap="round"
              opacity="0.75"
              :transform="`translate(0 ${l[0]}) rotate(${l[1]}) scale(0.8)`"
            />
            <circle
              v-for="(b, i) in berries"
              :key="`b${i}`"
              :cx="b[0]"
              :cy="b[1]"
              r="6.5"
              :fill="c('red')"
              :stroke="c('highlight')"
              stroke-opacity="0.55"
              stroke-width="1.5"
            />
          </g>
        </template>
        <!-- …and a huge axe in the other -->
        <template #hand-r
          ><Axe part="knight-axe" :scale="1" haft="green-2"
        /></template>
      </Figure>
    </KitPlace>

    <Burst part="burst" :x="636" :y="606" :scale="0.85" />
  </SceneStage>
</template>

<script setup lang="ts">
import {
  Axe,
  Backdrop,
  Burst,
  Figure,
  Horse,
  KitPlace,
  SceneStage,
  Shield,
  Table,
  c,
  type SceneApi,
} from './kit'

defineProps<{ period: string; title: string; initial?: string }>()

// holly: a spiky leaf (base at 0,0, pointing up), placed around the bough; red berries in clusters
const leaf =
  'M 0 0 C 9 -6 11 -14 6 -18 L 14 -22 L 8 -28 L 15 -34 L 6 -38 L 0 -54 L -6 -38 L -15 -34 L -8 -28 L -14 -22 L -6 -18 C -11 -14 -9 -6 0 0 Z'
const holly = [
  [-92, 0],
  [-60, -62],
  [-60, 62],
  [-30, -52],
  [-30, 52],
  [0, -60],
  [0, 60],
]
const berries = [
  [-9, -52],
  [7, -48],
  [-1, -42],
  [-10, -20],
  [8, -16],
]

function build({
  tl,
  p,
  establish,
  shake,
  pop,
  blink,
  turn,
  bob,
  sway,
}: SceneApi) {
  tl.set(p('burst'), { scale: 0, opacity: 0 }, 0)
  tl.set(`${p('arthur-aghast')},${p('guinevere-aghast')}`, { opacity: 0 }, 0)
  tl.set(p('gawain-axe'), { opacity: 0 }, 0)
  // empty-handed until the Knight hands over his axe
  tl.set(p('gawain', 'arm-r'), { rotation: -20 }, 0)
  turn(p('gawain', 'arm-r'), 1.2, -150, 0.25, 'power2.out')
  establish()
  sway(p('banner'), 0, undefined, 3, 1.4)

  // he gallops in…
  tl.from(p('rider'), { x: -560, duration: 0.85, ease: 'power2.out' }, 0.25)
  const legs = ['leg-fl', 'leg-br', 'leg-fr', 'leg-bl']
  legs.forEach((l, i) =>
    tl.fromTo(
      p('rider', l),
      { rotation: i % 2 ? -26 : 26 },
      {
        rotation: i % 2 ? 26 : -26,
        duration: 0.12,
        yoyo: true,
        repeat: 5,
        ease: 'sine.inOut',
      },
      0.25 + (i > 1 ? 0.04 : 0)
    )
  )
  bob(p('rider', 'body'), 0.25, 0.72, 10, 0.24)
  tl.to(
    legs.map((l) => p('rider', l)).join(','),
    { rotation: 0, duration: 0.15 },
    1.0
  )
  // …and pulls up with a little rear
  tl.to(
    p('rider'),
    { rotation: -6, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' },
    0.98
  )
  blink('arthur', 1.0)
  blink('guinevere', 1.08)

  // he hands his axe to Gawain, hops down and bares his neck
  tl.to(p('knight-axe'), { opacity: 0, duration: 0.1 }, 1.22)
  tl.to(p('gawain-axe'), { opacity: 1, duration: 0.1 }, 1.22)
  tl.to(
    p('knight'),
    {
      keyframes: [
        { x: 120, y: -190, duration: 0.16, ease: 'power2.out' },
        { x: 236, y: 0, duration: 0.2, ease: 'power2.in' },
      ],
    },
    1.25
  )
  tl.to(
    p('knight', 'pose'),
    { rotation: 30, duration: 0.25, ease: 'power2.inOut' },
    1.62
  )

  // Gawain winds up… and swings
  turn(p('gawain', 'arm-r'), 1.45, -205, 0.32, 'power2.out')
  turn(p('gawain', 'arm-r'), 1.8, -82, 0.13, 'power4.in')
  pop(p('burst'), 1.92, 0.25)
  shake(1.92, 18)
  tl.to(p('burst'), { opacity: 0, scale: 1.4, duration: 0.2 }, 2.12)

  // off comes the head — and the Knight catches it
  const head = p('knight', 'head')
  tl.to(
    head,
    {
      keyframes: [
        { x: 40, y: -320, rotation: 220, duration: 0.3, ease: 'power2.out' },
        { x: 65, y: -92, rotation: 360, duration: 0.24, ease: 'power2.in' },
      ],
    },
    1.94
  )
  tl.to(
    p('knight', 'pose'),
    { rotation: 0, duration: 0.35, ease: 'back.out(1.4)' },
    2.05
  )
  turn(p('knight', 'arm-r'), 2.1, -175, 0.35, 'back.out(1.6)')
  tl.to(
    p('knight', 'arm-r'),
    { rotation: -168, duration: 0.1, yoyo: true, repeat: 1 },
    2.44
  )
  tl.to(head, { y: -82, duration: 0.1, yoyo: true, repeat: 1 }, 2.44)
  turn(p('gawain', 'arm-r'), 2.2, -150, 0.4, 'power2.out')
  blink('knight', 2.68)

  // the court is astonished the moment he lifts his head: faces swap to the aghast versions and they start
  const aghast = (who: string, at: number) => {
    tl.to(p(`${who}-aghast`), { opacity: 1, duration: 0.06 }, at)
    tl.to(
      `${p(who, 'pose')},${p(`${who}-aghast`, 'pose')}`,
      { y: -14, duration: 0.12, yoyo: true, repeat: 1 },
      at
    )
  }
  turn(p('gawain', 'pose'), 2.45, -9, 0.2, 'power2.out')
  aghast('arthur', 2.42)
  aghast('guinevere', 2.46)
}
</script>
