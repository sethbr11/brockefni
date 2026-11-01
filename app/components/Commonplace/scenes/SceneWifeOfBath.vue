<!--
  The Wife of Bath's Prologue — she rides among the pilgrims in her wide hat and red stockings,
  counting off her five husbands (five rings), and grins.
-->
<template>
  <SceneStage :build="build">
    <Backdrop variant="hills" />

    <!-- every rider sits the same way: hips on the saddle (tunic hem resting on its top), one leg hanging down the horse's near side.
         The figure's own front-facing legs are clipped away at the hem. -->
    <clipPath :id="clipId"
      ><rect x="-300" y="-900" width="600" :height="900 + HEM + 0.5"
    /></clipPath>

    <!-- fellow pilgrims, farther along the road -->
    <KitPlace part="pilgrim-1" :x="260" :y="730" :scale="0.6">
      <Horse coat="stone-3" mane="ink" saddle="cloth-a" />
      <KitPlace part="rider">
        <SaddleLeg :x="4" :y="LEG_Y" :scale="0.85" color="wood-3" />
        <g :clip-path="`url(#${clipId})`">
          <Figure
            :y="SEAT_Y"
            body="tunic"
            robe="cloth-b"
            sleeve="cloth-b"
            trim="gold"
            hair="short"
            hat="hood"
            mood="neutral"
          />
        </g>
      </KitPlace>
    </KitPlace>
    <KitPlace part="pilgrim-2" :x="1450" :y="730" :scale="0.6" flip>
      <Horse coat="wood-2" mane="ink" saddle="cloth-d" />
      <KitPlace part="rider">
        <SaddleLeg :x="4" :y="LEG_Y" :scale="0.85" color="cloth-a" />
        <g :clip-path="`url(#${clipId})`">
          <Figure
            :y="SEAT_Y"
            body="tunic"
            robe="green-2"
            sleeve="green-2"
            trim="gold"
            hair="short"
            beard
            hat="cap"
            mood="neutral"
          />
        </g>
      </KitPlace>
    </KitPlace>

    <!-- the Wife -->
    <KitPlace part="wife" :x="780" :y="760" :scale="0.9">
      <Horse coat="wood-3" mane="wood-2" saddle="cloth-b" />
      <KitPlace part="rider">
        <SaddleLeg
          part="wife-leg"
          :x="4"
          :y="LEG_Y"
          :scale="0.85"
          color="cloth-a"
          boot="ink"
        />
        <g :clip-path="`url(#${clipId})`">
          <Figure
            part="wife-fig"
            :x="0"
            :y="SEAT_Y"
            body="tunic"
            robe="cloth-d"
            sleeve="cloth-d"
            trim="gold"
            legs="cloth-a"
            hat="hat"
            hat-color="gold"
            hair="long"
            hair-color="gold"
            skin="skin"
            mood="happy"
            :arm-l="0"
            :arm-r="0"
          />
        </g>
      </KitPlace>
    </KitPlace>

    <!-- five husbands -->
    <Ring
      v-for="(r, i) in 5"
      :key="i"
      part="ring"
      :x="640 + i * 80"
      :y="170 - Math.abs(i - 2) * -16"
      :scale="0.9"
    />
    <g
      :fill="c('highlight')"
      :stroke="c('ink')"
      stroke-width="7"
      stroke-linejoin="round"
      paint-order="stroke"
      class="cp-serif"
      font-size="44"
      font-weight="700"
    >
      <text
        v-for="(r, i) in 5"
        :key="'n' + i"
        data-part="num"
        :x="640 + i * 80"
        :y="84"
        text-anchor="middle"
        >{{ i + 1 }}</text
      >
    </g>
    <Burst part="burst" :x="880" :y="190" :scale="0.7" color="gold" />
  </SceneStage>
</template>

<script setup lang="ts">
import { useId } from 'vue'
import {
  Backdrop,
  Burst,
  Figure,
  Horse,
  KitPlace,
  Ring,
  SceneStage,
  c,
  type SceneApi,
} from './kit'
import SaddleLeg from './kit/props/SaddleLeg.vue'

defineProps<{ period: string; title: string; initial?: string }>()

/* seating, in horse units (the saddle cloth's top is at y ≈ -272, its lower edge at -150) */
/** the seat: figure origin; the tunic hem (figure y -84) rests on the saddle */
const SEAT_Y = -178
const HEM = SEAT_Y - 84
const LEG_Y = HEM + 4
const clipId = `cp-wob-${useId()}`

function build({ tl, p, establish, bob, sway, pop, turn, blink }: SceneApi) {
  tl.set(p('ring'), { scale: 0, opacity: 0 }, 0)
  tl.set(p('num'), { opacity: 0 }, 0)
  tl.set(p('burst'), { scale: 0, opacity: 0 }, 0)
  const horses = ['wife', 'pilgrim-1', 'pilgrim-2']
  const legs = ['leg-fl', 'leg-br', 'leg-fr', 'leg-bl']

  establish()
  sway(p('clouds'), 0, undefined, 1, 3)
  // amble along
  horses.forEach((h, k) => {
    // the rider bobs with the horse's body, so the seat never floats or sinks
    bob(`${p(h, 'body')},${p(h, 'rider')}`, 0, undefined, 6, 0.5 + k * 0.05)
    legs.forEach((l, i) =>
      tl.fromTo(
        p(h, l),
        { rotation: i % 2 ? -14 : 14 },
        {
          rotation: i % 2 ? 14 : -14,
          duration: 0.3,
          yoyo: true,
          repeat: 5,
          ease: 'sine.inOut',
        },
        0.05 * k
      )
    )
  })
  tl.from(p('pilgrim-1'), { x: '-=200', duration: 1.6, ease: 'none' }, 0)
  tl.from(p('pilgrim-2'), { x: '+=200', duration: 1.6, ease: 'none' }, 0)
  tl.from(p('wife'), { x: '-=160', duration: 0.9, ease: 'power2.out' }, 0)
  blink('wife-fig', 0.5)

  // counting on her fingers: one ring per husband
  tl.to(
    p('ring'),
    {
      scale: 0.9,
      opacity: 1,
      duration: 0.25,
      stagger: 0.24,
      ease: 'back.out(3)',
    },
    0.8
  )
  tl.to(p('num'), { opacity: 1, duration: 0.15, stagger: 0.24 }, 0.85)
  tl.to(
    p('wife-fig', 'arm-l'),
    { rotation: 70, duration: 0.15, yoyo: true, repeat: 9, ease: 'sine.inOut' },
    0.8
  )
  tl.to(
    p('wife-fig', 'head'),
    { rotation: -5, duration: 0.2, yoyo: true, repeat: 9 },
    0.8
  )

  // the grin
  pop(p('burst'), 2.1, 0.3)
  tl.to(p('burst'), { opacity: 0, scale: 1.2, duration: 0.25 }, 2.35)
  tl.to(
    `${p('wife-fig', 'pose')},${p('wife-leg')}`,
    { y: `-=14`, duration: 0.14, yoyo: true, repeat: 1, ease: 'power1.out' },
    2.1
  )
  turn(p('wife-fig', 'arm-r'), 2.1, -100, 0.3, 'back.out(2)')
  tl.to(
    p('ring'),
    { y: '-=14', duration: 0.12, yoyo: true, repeat: 1, stagger: 0.04 },
    2.15
  )
}
</script>
