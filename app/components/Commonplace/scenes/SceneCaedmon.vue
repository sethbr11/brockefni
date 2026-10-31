<!--
  Caedmon's Hymn — the cowherd sleeps in the stable beside an ox; a glowing figure appears in
  his dream; he wakes and sings, and the song rises as notes of light.
-->
<template>
  <SceneStage :build="build">
    <Backdrop variant="study" time="night" />

    <!-- straw bed + sleeping cowherd -->
    <ellipse :cx="520" :cy="780" rx="300" ry="34" :fill="c('gold-2')" />
    <Figure
      part="caedmon"
      :x="560"
      :y="770"
      body="tunic"
      robe="cloth-c"
      sleeve="cloth-c"
      legs="wood-3"
      belt="wood-2"
      hair="short"
      hair-color="hair"
      eyes="closed"
      mood="neutral"
      :arm-l="0"
      :arm-r="0"
    />
    <g
      :fill="c('highlight')"
      class="cp-serif"
      font-size="40"
      font-style="italic"
    >
      <text data-part="zzz" x="400" y="440">z</text>
      <text data-part="zzz" x="430" y="404" font-size="30">z</text>
    </g>

    <!-- the ox, chewing placidly -->
    <Cow
      part="ox"
      :x="1330"
      :y="780"
      :scale="1.1"
      color="wood-3"
      spots="wood-2"
    />
    <path
      d="M 1120 780 L 1560 780"
      :stroke="c('gold-2')"
      stroke-width="30"
      stroke-linecap="round"
    />

    <!-- the dream: a radiant visitor -->
    <g data-part="dream" data-pivot transform="translate(880 400)">
      <g data-part="aura" data-pivot>
        <circle r="210" :fill="c('glow')" opacity="0.22" />
        <circle r="140" :fill="c('glow')" opacity="0.3" />
        <path
          v-for="i in 10"
          :key="i"
          d="M 0 -170 L 12 -250 L -12 -250 Z"
          :fill="c('glow')"
          opacity="0.5"
          :transform="`rotate(${i * 36})`"
        />
      </g>
      <Figure
        part="visitor"
        :x="0"
        :y="150"
        :scale="0.62"
        wings
        robe="highlight"
        sleeve="highlight"
        trim="gold"
        hair="long"
        hair-color="gold"
        mood="happy"
        :arm-r="-60"
      />
    </g>

    <!-- the song -->
    <Note
      v-for="(n, i) in 5"
      :key="i"
      part="note"
      :x="560 + i * 70"
      :y="400"
      :scale="0.9"
      color="gold"
    />
  </SceneStage>
</template>

<script setup lang="ts">
import { Backdrop, Figure, SceneStage, c, type SceneApi } from './kit'
import Cow from './kit/props/Cow.vue'
import Note from './kit/props/Note.vue'

defineProps<{ period: string; title: string; initial?: string }>()

function build({
  tl,
  p,
  establish,
  bob,
  flicker,
  exit,
  turn,
  blink,
}: SceneApi) {
  tl.set(p('caedmon', 'pose'), { rotation: -90, y: -40 }, 0)
  tl.set(p('dream'), { scale: 0, opacity: 0 }, 0)
  tl.set(p('note'), { opacity: 0, scale: 0 }, 0)

  establish()
  flicker(p('glow'), 0)
  bob(p('ox', 'head'), 0, undefined, 6, 0.9)
  tl.from(
    p('zzz'),
    { y: '+=40', opacity: 0, duration: 0.5, stagger: 0.14, ease: 'power2.out' },
    0.05
  )

  // the dream arrives
  exit(p('zzz'), 0.7, 0.2)
  tl.to(
    p('dream'),
    { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.6)' },
    0.75
  )
  tl.to(p('aura'), { rotation: 90, duration: 3, ease: 'none' }, 0.75)
  turn(p('visitor', 'arm-r'), 1.1, -110, 0.3, 'back.out(1.8)')

  // he wakes: eyes open as he rises
  tl.to(p('caedmon', 'eyes-closed'), { opacity: 0, duration: 0.1 }, 1.3)
  tl.to(p('caedmon', 'eyes-open'), { opacity: 1, duration: 0.1 }, 1.3)
  tl.to(
    p('caedmon', 'pose'),
    { rotation: 0, y: 0, duration: 0.5, ease: 'back.out(1.4)' },
    1.3
  )
  blink('caedmon', 1.5)
  turn(p('caedmon', 'arm-r'), 1.75, -120, 0.3, 'back.out(1.8)')
  turn(p('caedmon', 'arm-l'), 1.75, 120, 0.3, 'back.out(1.8)')

  // he sings: notes rise toward the glowing visitor
  tl.to(
    p('note'),
    {
      opacity: 1,
      scale: 1,
      duration: 0.25,
      stagger: 0.16,
      ease: 'back.out(2)',
    },
    1.9
  )
  tl.to(
    p('note'),
    { y: '-=170', duration: 0.9, stagger: 0.16, ease: 'power1.out' },
    1.9
  )
  tl.to(
    p('note'),
    { rotation: 12, duration: 0.2, yoyo: true, repeat: 3, stagger: 0.16 },
    1.95
  )
  tl.to(
    p('caedmon', 'pose'),
    { y: -14, duration: 0.14, yoyo: true, repeat: 3, ease: 'power1.out' },
    1.95
  )
}
</script>
