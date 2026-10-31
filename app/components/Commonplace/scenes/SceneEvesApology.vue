<!--
  Eve's Apology in Defense of Women — Eve holds the apple under the tree while the serpent
  watches and Adam looks away; then the scales tip: her defense outweighs the blame.
-->
<template>
  <SceneStage :build="build">
    <Backdrop variant="garden" />

    <Tree kind="apple" :x="250" :y="800" :scale="1.15" leaves="green-3" />
    <Serpent
      part="serpent"
      :x="200"
      :y="808"
      :scale="0.8"
      color="green-4"
      pattern
    />

    <Figure
      part="adam"
      :x="900"
      :y="770"
      :scale="1.1"
      flip
      body="tunic"
      robe="green-2"
      legs="green-2"
      trim="green"
      mood="sad"
      :look="-1"
    />
    <Figure
      part="eve"
      :x="650"
      :y="780"
      :scale="1.15"
      hair="long"
      hair-color="gold"
      robe="cloth-c"
      trim="green"
      mood="neutral"
      :look="1"
      :arm-r="-50"
    >
      <!-- the apple is drawn over the hand (held-r), so it is held out on its own, with no hand showing beside it -->
      <template #held-r
        ><Apple part="apple" :scale="0.8" color="red"
      /></template>
    </Figure>

    <!-- the scales of judgement -->
    <KitPlace :x="1270" :y="420">
      <rect x="-9" y="-10" width="18" height="400" :fill="c('wood-2')" />
      <rect
        x="-80"
        y="380"
        width="160"
        height="22"
        rx="8"
        :fill="c('wood-2')"
      />
      <circle cy="-10" r="18" :fill="c('gold')" />
    </KitPlace>
    <g>
      <KitPlace part="beam" :x="1270" :y="410"
        ><rect x="-170" y="-8" width="340" height="16" rx="8" :fill="c('gold')"
      /></KitPlace>
      <KitPlace part="pan-l" :x="1100" :y="410">
        <path
          d="M 0 0 L -60 80 M 0 0 L 60 80"
          :stroke="c('gold-2')"
          stroke-width="4"
        />
        <path
          d="M -70 80 L 70 80 Q 60 110 0 110 Q -60 110 -70 80 Z"
          :fill="c('gold')"
        />
        <Apple :y="76" :scale="0.7" color="red" />
      </KitPlace>
      <KitPlace part="pan-r" :x="1440" :y="410">
        <path
          d="M 0 0 L -60 80 M 0 0 L 60 80"
          :stroke="c('gold-2')"
          stroke-width="4"
        />
        <path
          d="M -70 80 L 70 80 Q 60 110 0 110 Q -60 110 -70 80 Z"
          :fill="c('gold')"
        />
        <Book :y="80" :scale="0.7" cover="period" />
        <Quill :x="-4" :y="30" :scale="0.4" :rotate="-20" />
      </KitPlace>
    </g>
  </SceneStage>
</template>

<script setup lang="ts">
import {
  Apple,
  Backdrop,
  Book,
  Figure,
  KitPlace,
  Quill,
  SceneStage,
  Serpent,
  Tree,
  c,
  type SceneApi,
} from './kit'

defineProps<{ period: string; title: string; initial?: string }>()

function build({ tl, p, establish, sway, blink, turn }: SceneApi) {
  // blame side starts heavy
  tl.set(p('beam'), { rotation: -14 }, 0)
  tl.set(p('pan-l'), { y: 450 }, 0)
  tl.set(p('pan-r'), { y: 370 }, 0)

  establish()
  sway(p('serpent'), 0, undefined, 4, 1.2)
  blink('eve', 0.4)
  tl.from(p('eve'), { x: '-=200', duration: 0.5, ease: 'power2.out' }, 0.1)
  tl.from(p('adam'), { x: '+=200', duration: 0.5, ease: 'power2.out' }, 0.2)
  turn(p('eve', 'arm-r'), 0.7, -85, 0.35, 'back.out(1.5)')
  // the apple counter-rotates with the arm, so it always stays upright in her grip
  tl.set(p('apple'), { rotation: 50 }, 0)
  turn(p('apple'), 0.7, 85, 0.35, 'back.out(1.5)')
  tl.to(
    p('serpent', 'tongue'),
    { scaleX: 1.5, duration: 0.15, yoyo: true, repeat: 3 },
    0.8
  )

  // the scales fall into place
  tl.from(
    [p('beam'), p('pan-l'), p('pan-r')].join(','),
    { opacity: 0, y: '-=50', duration: 0.35, ease: 'back.out(1.6)' },
    1.1
  )

  // the tip: Eve's defense outweighs the blame
  tl.to(
    p('beam'),
    { rotation: 14, duration: 0.7, ease: 'elastic.out(1,0.6)' },
    1.7
  )
  tl.to(p('pan-l'), { y: 370, duration: 0.7, ease: 'elastic.out(1,0.6)' }, 1.7)
  tl.to(p('pan-r'), { y: 450, duration: 0.7, ease: 'elastic.out(1,0.6)' }, 1.7)
  turn(p('eve', 'arm-r'), 1.8, -30, 0.4, 'power2.out')
  turn(p('apple'), 1.8, 30, 0.4, 'power2.out')
  tl.to(
    p('eve', 'pose'),
    { y: -10, duration: 0.15, yoyo: true, repeat: 1 },
    2.0
  )
  turn(p('adam', 'pose'), 2.0, 6, 0.3)
}
</script>
