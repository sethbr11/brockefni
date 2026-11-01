<!--
  Bisclavret — a noble ducks behind a stone in the forest and strips; a wolf bounds out,
  and his clothes (the key to his return) are snatched.
-->
<template>
  <SceneStage :build="build">
    <Backdrop variant="forest" time="night" />

    <!-- nothing of him may ever show below the stone's base line -->
    <clipPath :id="clipId"
      ><rect x="-400" y="0" width="2400" :height="GY + 2"
    /></clipPath>
    <g :clip-path="`url(#${clipId})`">
      <Figure
        part="noble"
        :x="330"
        :y="GY"
        :scale="0.95"
        body="tunic"
        robe="cloth-a"
        sleeve="cloth-a"
        trim="gold"
        legs="cloth-b"
        belt="gold"
        cape="cloth-d"
        hair="short"
        hair-color="hair"
        beard
        mood="neutral"
      />
    </g>

    <!-- his clothes: drawn BEHIND the stone, so they only ever appear over its top edge when he tosses them up -->
    <g data-part="clothes" data-pivot transform="translate(560 775)">
      <path
        d="M -46 -176 C -50 -220 -20 -236 10 -228 C 50 -236 70 -210 56 -176 Z"
        :fill="c('cloth-a')"
      />
      <path
        d="M -30 -200 L 40 -194"
        :stroke="c('gold')"
        stroke-width="7"
        stroke-linecap="round"
      />
      <rect
        x="-12"
        y="-244"
        width="40"
        height="22"
        rx="8"
        :fill="c('cloth-d')"
      />
    </g>

    <!-- the stone he undresses behind -->
    <g data-part="stone" data-pivot transform="translate(560 775)">
      <ellipse cx="0" cy="3" rx="150" ry="14" :fill="c('ink')" opacity="0.3" />
      <path
        d="M -130 2 C -140 -90 -90 -170 0 -176 C 90 -170 140 -90 130 2 Z"
        :fill="c('stone')"
      />
      <path
        d="M -10 -176 C 90 -170 140 -90 130 0 L 60 0 C 80 -80 50 -150 -10 -176 Z"
        :fill="c('stone-3')"
        opacity="0.5"
      />
      <path
        d="M -80 -60 L -40 -80 M 20 -110 L 60 -100"
        :stroke="c('stone-3')"
        stroke-width="6"
        stroke-linecap="round"
      />
    </g>
    <Wolf part="wolf" :x="560" :y="GY" :scale="1.15" />
    <Burst part="burst" :x="560" :y="665" :scale="0.8" color="highlight" />

    <!-- the faithless wife's knight, darting in for the clothes -->
    <Figure
      part="thief"
      :x="140"
      :y="GY"
      :scale="0.8"
      body="tunic"
      robe="cloth-d"
      sleeve="cloth-d"
      legs="ink"
      hat="hood"
      mood="alarmed"
      :look="1"
      :arm-l="30"
    >
      <!-- the stolen clothes, bundled in his hand (appears the instant he snatches them) -->
      <template #held-l>
        <g data-part="loot" data-pivot transform="translate(6 -6) scale(0.8)">
          <path
            d="M -46 0 C -50 -44 -20 -60 10 -52 C 50 -60 70 -34 56 0 Z"
            :fill="c('cloth-a')"
          />
          <path
            d="M -30 -24 L 40 -18"
            :stroke="c('gold')"
            stroke-width="7"
            stroke-linecap="round"
          />
          <rect
            x="-12"
            y="-68"
            width="40"
            height="22"
            rx="8"
            :fill="c('cloth-d')"
          />
        </g>
      </template>
    </Figure>
  </SceneStage>
</template>

<script setup lang="ts">
import { useId } from 'vue'
import { Backdrop, Burst, Figure, SceneStage, c, type SceneApi } from './kit'
import Wolf from './kit/props/Wolf.vue'

defineProps<{ period: string; title: string; initial?: string }>()

/** ground line the figures and the stone stand on (the forest's near ground starts ≈ 750) */
const GY = 775
const clipId = `cp-bis-${useId()}`

function build({ tl, p, establish, pop, shake, turn, blink, sway }: SceneApi) {
  tl.set(p('wolf'), { opacity: 0, scale: 0.2, x: 560 }, 0)
  tl.set(p('burst'), { scale: 0, opacity: 0 }, 0)
  // the clothes wait hidden behind the stone (their top, y ≈ GY+90-244, is below the stone's crown)
  tl.set(p('clothes'), { opacity: 0, y: GY + 100 }, 0)
  tl.set(p('loot'), { opacity: 0, scale: 0.4 }, 0)
  tl.set(p('thief'), { x: -160 }, 0)
  sway(p('trees'), 0, undefined, 0.6, 2)

  establish()
  blink('noble', 0.2)
  // he walks behind the stone
  tl.to(p('noble'), { x: 560, duration: 0.55, ease: 'power1.inOut' }, 0.15)
  // …ducks right down behind it (squashing, feet planted on the ground line: he never sinks below it)…
  tl.to(
    p('noble', 'pose'),
    { scaleY: 0.5, scaleX: 1.06, duration: 0.2, ease: 'power2.in' },
    0.7
  )
  tl.to(p('noble'), { opacity: 0, duration: 0.1 }, 0.92)
  // …and tosses his clothes up over the top (they rise from behind the stone, so they only show once clear of it)
  tl.set(p('clothes'), { opacity: 1 }, 0.85)
  tl.to(p('clothes'), { y: GY + 6, duration: 0.3, ease: 'back.out(2)' }, 0.85)

  // the wolf bursts out
  pop(p('burst'), 1.0, 0.3)
  tl.to(p('burst'), { opacity: 0, scale: 1.4, duration: 0.25 }, 1.25)
  tl.to(
    p('wolf'),
    { opacity: 1, scale: 1.15, duration: 0.2, ease: 'back.out(2)' },
    1.0
  )
  tl.to(
    p('wolf'),
    {
      keyframes: [
        { x: 760, y: GY - 110, duration: 0.25, ease: 'power2.out' },
        { x: 960, y: GY, duration: 0.25, ease: 'power2.in' },
        { x: 1120, y: GY - 90, duration: 0.2, ease: 'power2.out' },
        { x: 1230, y: GY, duration: 0.2, ease: 'power2.in' },
      ],
    },
    1.15
  )
  turn(p('wolf', 'head'), 1.95, -14, 0.2)
  tl.from(
    p('wolf', 'eyes'),
    { scale: 0, duration: 0.2, ease: 'back.out(3)' },
    1.95
  )

  // the clothes are snatched
  tl.to(p('thief'), { x: 540, duration: 0.45, ease: 'power2.out' }, 1.5)
  // the pile flips off the stone into his hands (it leaves upward, so it's never seen below the stone's crown)
  tl.to(
    p('clothes'),
    {
      x: 500,
      y: GY - 60,
      scale: 0.7,
      opacity: 0,
      duration: 0.14,
      ease: 'power2.out',
    },
    1.93
  )
  tl.to(
    p('loot'),
    { opacity: 1, scale: 0.8, duration: 0.12, ease: 'back.out(2)' },
    1.97
  )
  tl.to(p('thief'), { x: -260, duration: 0.5, ease: 'power2.in' }, 2.05)
  shake(1.95, 6, 0.2)
}
</script>
