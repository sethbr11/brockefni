<!--
  Oroonoko — the African prince and his beloved Imoinda stand together at dusk on the shore,
  while a ship on the horizon foreshadows the voyage that will part them.
-->
<template>
  <SceneStage :build="build">
    <Backdrop variant="sea" />

    <!-- dusk -->
    <rect
      data-part="dusk"
      width="1600"
      height="900"
      :fill="c('cloth-d')"
      opacity="0"
    />

    <Ship part="ship" :x="1500" :y="548" :scale="0.55" />

    <!-- the shore -->
    <path
      d="M 0 800 C 300 740 700 760 1000 790 C 1200 810 1450 780 1600 800 L 1600 900 L 0 900 Z"
      :fill="c('ground')"
    />
    <path
      d="M 0 840 C 400 810 900 850 1600 830 L 1600 900 L 0 900 Z"
      :fill="c('wood-3')"
      opacity="0.5"
    />
    <Tree kind="round" :x="180" :y="800" :scale="0.8" leaves="green-2" />

    <Figure
      part="oroonoko"
      :x="660"
      :y="808"
      :scale="1.25"
      skin="skin-3"
      skin2="skin-3-shade"
      robe="cloth-d"
      trim="gold"
      cape="cloth-a"
      belt="gold"
      hat="crown"
      hair-color="ink"
      mood="neutral"
      :look="1"
      :arm-l="10"
      :arm-r="-18"
    />
    <Figure
      part="imoinda"
      :x="900"
      :y="812"
      :scale="1.18"
      flip
      skin="skin-4"
      skin2="skin-4-shade"
      robe="gold"
      trim="cloth-a"
      hair="long"
      hair-color="ink"
      hat="cap"
      hat-color="gold-2"
      mood="sad"
      :look="1"
      :arm-l="10"
      :arm-r="-18"
    />
    <KitPlace part="glow" :x="770" :y="360"
      ><circle r="40" :fill="c('glow')" opacity="0"
    /></KitPlace>
  </SceneStage>
</template>

<script setup lang="ts">
import {
  Backdrop,
  Figure,
  KitPlace,
  SceneStage,
  Ship,
  Tree,
  c,
  type SceneApi,
} from './kit'

defineProps<{ period: string; title: string; initial?: string }>()

function build({ tl, p, establish, bob, sway, blink, turn }: SceneApi) {
  establish()
  bob(p('ship'), 0, undefined, 5, 1.8)
  sway(p('trees'), 0, undefined, 1, 2)
  sway(p('oroonoko', 'cape'), 0.2, undefined, 2, 1.6)

  // the pair draw close and join hands
  tl.from(
    p('oroonoko'),
    { x: '-=140', opacity: 0, duration: 0.6, ease: 'power2.out' },
    0.2
  )
  tl.from(
    p('imoinda'),
    { x: '+=140', opacity: 0, duration: 0.6, ease: 'power2.out' },
    0.2
  )
  blink('oroonoko', 0.9)
  turn(p('oroonoko', 'arm-r'), 1.1, -52, 0.5, 'power2.out')
  turn(p('imoinda', 'arm-l'), 1.1, 52, 0.5, 'power2.out')

  // dusk falls; the ship slides across the horizon
  tl.to(p('dusk'), { opacity: 0.38, duration: 1.8, ease: 'power1.inOut' }, 0.6)
  tl.to(p('sun'), { y: '+=160', duration: 1.8, ease: 'power1.inOut' }, 0.6)
  // (night theme: the moon climbs and the stars come out instead)
  tl.from(
    p('moon'),
    { y: '+=190', opacity: 0, duration: 1.8, ease: 'power1.out' },
    0.6
  )
  tl.from(p('stars'), { opacity: 0, duration: 1.6, ease: 'power1.in' }, 0.7)
  tl.to(p('ship'), { x: 1180, duration: 2.0, ease: 'power1.out' }, 0.7)

  // they turn to watch it go
  tl.to(p('oroonoko', 'head'), { rotation: 6, duration: 0.4 }, 2.0)
  tl.to(p('imoinda', 'head'), { rotation: -6, duration: 0.4 }, 2.1)
}
</script>
