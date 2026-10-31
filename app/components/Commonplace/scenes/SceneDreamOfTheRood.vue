<!--
  The Dream of the Rood — a dreamer sleeps under the night sky; a great jeweled cross rises,
  gleaming gold and gems, then shows the blood beneath.
-->
<template>
  <SceneStage :build="build">
    <Backdrop variant="night-sky" time="night" />

    <g data-part="halo" data-pivot transform="translate(800 480)">
      <circle r="330" :fill="c('glow')" opacity="0.12" />
      <circle r="230" :fill="c('glow')" opacity="0.14" />
    </g>

    <!-- the Rood: gold-and-gems, with a blood-stained twin crossfading in -->
    <Rood part="rood" :x="800" :y="GROUND + 6" :scale="1" color="gold" glow />
    <Rood part="rood-red" :x="800" :y="GROUND + 6" :scale="1" color="red" />
    <g data-part="drops">
      <circle
        v-for="(d, i) in [
          [650, 512],
          [950, 512],
          [800, 650],
        ]"
        :key="i"
        :cx="d[0]"
        :cy="d[1]"
        r="9"
        :fill="c('red')"
      />
    </g>

    <!-- the ground (drawn over the rood's base so it grows out of the earth) -->
    <g>
      <rect x="-20" :y="GROUND" width="1640" height="140" :fill="c('night')" />
      <rect
        x="-20"
        :y="GROUND"
        width="1640"
        height="140"
        :fill="c('ink')"
        opacity="0.74"
      />
      <rect
        x="-20"
        :y="GROUND"
        width="1640"
        height="3"
        :fill="c('night-2')"
        opacity="0.55"
      />
    </g>

    <!-- the dreamer, flat on his back on the ground line, with his contact shadow -->
    <ellipse
      :cx="196"
      :cy="GROUND + 3"
      rx="170"
      ry="9"
      :fill="c('ink')"
      opacity="0.9"
    />
    <Figure
      part="dreamer"
      :x="330"
      :y="GROUND + 4"
      :scale="0.85"
      body="tunic"
      robe="cloth-b"
      legs="wood-3"
      hair="short"
      hair-color="hair"
      eyes="closed"
      :arm-l="0"
      :arm-r="0"
    />
    <!-- grass in front of him, so he settles into the ground -->
    <g :fill="c('ink')" opacity="0.9">
      <path
        v-for="(g, i) in tufts"
        :key="i"
        :d="`M ${g[0] - 5} ${GROUND + 8} L ${g[0] + 1} ${GROUND + 8 - g[1]} L ${g[0] + 8} ${GROUND + 8} Z`"
      />
    </g>
    <g
      :fill="c('highlight')"
      class="cp-serif"
      font-size="40"
      font-style="italic"
    >
      <text data-part="zzz" x="130" y="640">z</text>
      <text data-part="zzz" x="162" y="604" font-size="30">z</text>
    </g>
  </SceneStage>
</template>

<script setup lang="ts">
import { Backdrop, Figure, Rood, SceneStage, c, type SceneApi } from './kit'

defineProps<{ period: string; title: string; initial?: string }>()

/** the ground line the dreamer lies on and the cross is planted in */
const GROUND = 784
const tufts = [
  [96, 14],
  [124, 10],
  [178, 12],
  [232, 9],
  [262, 14],
  [312, 11],
  [352, 13],
  [398, 10],
]

function build({ tl, p, establish, exit, shake }: SceneApi) {
  // flat on his back: rotated about the feet, then lifted so his side rests exactly on the ground line
  tl.set(p('dreamer', 'pose'), { rotation: -90, y: -78 }, 0)
  tl.set(p('rood'), { y: 1080, opacity: 0 }, 0)
  tl.set(p('rood-red'), { y: GROUND + 6, opacity: 0 }, 0)
  tl.set(p('drops'), { opacity: 0, y: -20 }, 0)
  tl.set(p('halo'), { scale: 0, opacity: 0 }, 0)

  establish()
  tl.from(
    p('zzz'),
    { y: '+=40', opacity: 0, duration: 0.5, stagger: 0.14, ease: 'power2.out' },
    0.05
  )
  tl.to(p('stars'), { opacity: 0.4, duration: 0.3, yoyo: true, repeat: 3 }, 0.1)

  // the cross rises, glowing
  exit(p('zzz'), 0.7, 0.2)
  tl.to(
    p('rood'),
    { y: GROUND + 6, opacity: 1, duration: 0.8, ease: 'power3.out' },
    0.75
  )
  tl.to(
    p('halo'),
    { scale: 1, opacity: 1, duration: 0.7, ease: 'power2.out' },
    0.9
  )
  tl.to(p('rood', 'rays'), { rotation: 60, duration: 3, ease: 'none' }, 0.9)
  // the whole cross pulses from its planted base (gold and blood twins together so they stay aligned)
  tl.to(
    [p('rood'), p('rood-red')],
    { scale: 1.05, duration: 0.16, yoyo: true, repeat: 3, ease: 'sine.inOut' },
    1.56
  )

  // gold gives way to blood
  tl.to(
    p('rood-red'),
    { opacity: 0.92, duration: 0.5, ease: 'power2.inOut' },
    2.0
  )
  tl.to(p('rood', 'rays'), { opacity: 0.55, duration: 0.4 }, 2.0)
  tl.to(
    p('drops'),
    { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: 'back.out(2)' },
    2.1
  )
  shake(2.05, 6, 0.3)
}
</script>
