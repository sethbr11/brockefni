<template>
  <g v-for="m in modes" :key="m" :class="cls(m)">
    <g data-part="sky">
      <rect
        width="1600"
        height="900"
        :fill="c(m === 'night' ? 'night' : 'sky')"
      />
      <ellipse
        cx="800"
        cy="760"
        rx="1200"
        ry="420"
        :fill="c(m === 'night' ? 'night-2' : 'sky-2')"
        opacity="0.9"
      />
      <ellipse
        cx="800"
        cy="820"
        rx="900"
        ry="300"
        :fill="c(m === 'night' ? 'night-2' : 'sky-2')"
      />
      <g v-if="m === 'night'" data-part="stars">
        <circle
          v-for="(s, i) in stars"
          :key="i"
          :cx="s.x"
          :cy="s.y"
          :r="s.r"
          :fill="c('star')"
          :opacity="s.o"
        />
      </g>
      <g
        v-if="m === 'night'"
        data-part="moon"
        data-pivot
        :transform="`translate(${cel[0]} ${cel[1]})`"
      >
        <circle r="110" :fill="c('moon')" opacity="0.12" />
        <circle r="64" :fill="c('moon')" />
        <circle cx="-18" cy="-14" r="12" :fill="c('ink')" opacity="0.06" />
        <circle cx="20" cy="18" r="8" :fill="c('ink')" opacity="0.06" />
      </g>
      <g
        v-else
        data-part="sun"
        data-pivot
        :transform="`translate(${cel[0]} ${cel[1]})`"
      >
        <circle r="150" :fill="c('sun')" opacity="0.12" />
        <circle r="120" :fill="c('sun')" opacity="0.2" />
        <path
          v-for="i in 12"
          :key="i"
          d="M -9 -96 L 0 -134 L 9 -96 Z"
          :fill="c('sun')"
          opacity="0.55"
          :transform="`rotate(${i * 30})`"
        />
        <circle r="72" :fill="c('sun')" />
      </g>
      <g
        v-if="m === 'day'"
        data-part="clouds"
        :fill="c('highlight')"
        opacity="0.85"
      >
        <path :d="cloud" transform="translate(300 170)" />
        <path :d="cloud" transform="translate(800 110) scale(0.7)" />
        <path :d="cloud" transform="translate(1480 320) scale(0.6)" />
      </g>
    </g>

    <!-- hills / night-sky -->
    <g v-if="variant === 'hills' || variant === 'night-sky'">
      <path
        d="M 0 560 C 200 470 380 500 560 540 C 760 585 900 480 1120 470 C 1320 460 1460 520 1600 500 L 1600 900 L 0 900 Z"
        v-bind="layer(0, m)"
      />
      <path
        d="M 0 650 C 180 600 360 610 520 640 C 720 680 880 600 1080 590 C 1280 580 1440 640 1600 630 L 1600 900 L 0 900 Z"
        v-bind="layer(1, m)"
      />
      <path
        d="M 0 760 C 240 700 480 720 700 750 C 960 785 1200 700 1600 730 L 1600 900 L 0 900 Z"
        v-bind="layer(2, m)"
      />
    </g>

    <!-- sea -->
    <g v-if="variant === 'sea'">
      <rect
        y="540"
        width="1600"
        height="360"
        :fill="c(m === 'night' ? 'night-2' : 'water')"
      />
      <rect
        v-if="m === 'night'"
        y="540"
        width="1600"
        height="360"
        :fill="c('ink')"
        opacity="0.25"
      />
      <rect
        y="540"
        width="1600"
        height="10"
        :fill="c(m === 'night' ? 'moon' : 'water-2')"
        opacity="0.5"
      />
      <rect
        x="1190"
        y="550"
        width="120"
        height="350"
        :fill="c(m === 'night' ? 'moon' : 'sun')"
        :opacity="m === 'night' ? 0.1 : 0.14"
        :transform="`translate(${cel[0] - 1250} 0)`"
      />
      <g
        v-for="(row, i) in waveRows"
        :key="i"
        :data-part="`waves-${i + 1}`"
        data-pivot
      >
        <path
          :d="row.d"
          fill="none"
          :stroke="c(m === 'night' ? 'water-2' : 'foam')"
          :stroke-width="row.w"
          stroke-linecap="round"
          :opacity="row.o"
        />
      </g>
    </g>

    <!-- forest -->
    <g v-if="variant === 'forest'">
      <path
        d="M 0 600 C 300 560 700 590 1000 570 C 1250 555 1450 580 1600 570 L 1600 900 L 0 900 Z"
        v-bind="layer(0, m)"
      />
      <g data-part="trees">
        <path
          v-for="(t, i) in pinesFar"
          :key="`f${i}`"
          :d="t"
          v-bind="layer(0, m)"
        />
        <path
          v-for="(t, i) in pinesMid"
          :key="`m${i}`"
          :d="t"
          v-bind="layer(1, m)"
        />
      </g>
      <path
        d="M 0 770 C 300 740 600 760 900 750 C 1200 740 1400 760 1600 750 L 1600 900 L 0 900 Z"
        v-bind="layer(2, m)"
      />
    </g>

    <!-- garden -->
    <g v-if="variant === 'garden'">
      <path
        d="M 0 600 C 300 560 600 590 900 560 C 1200 540 1400 580 1600 560 L 1600 900 L 0 900 Z"
        v-bind="layer(0, m)"
      />
      <g
        v-for="(t, i) in [180, 520, 1080, 1420]"
        :key="i"
        :transform="`translate(${t} 600)`"
      >
        <rect
          x="-8"
          y="-90"
          width="16"
          height="90"
          :fill="c(m === 'night' ? 'ink' : 'wood-2')"
        />
        <circle cx="0" cy="-120" r="62" v-bind="layer(1, m)" />
      </g>
      <rect
        x="0"
        y="640"
        width="1600"
        height="90"
        rx="40"
        v-bind="layer(2, m)"
      />
      <circle
        v-for="(f, i) in flowers"
        :key="i"
        :cx="f.x"
        :cy="f.y"
        r="9"
        :fill="c(f.c)"
        :opacity="m === 'night' ? 0.55 : 1"
      />
      <path d="M 0 730 L 1600 730 L 1600 900 L 0 900 Z" v-bind="layer(1, m)" />
      <path
        d="M 560 900 C 680 820 740 760 800 730 C 860 760 920 820 1040 900 Z"
        :fill="c(m === 'night' ? 'stone-2' : 'paper-2')"
        :opacity="m === 'night' ? 0.5 : 0.9"
      />
    </g>
  </g>
</template>

<script setup lang="ts">
import { c, rng } from '../util'
import { cloud, stars } from './shared'
import { useBackdropTime, type Time } from './useBackdropTime'

const props = withDefaults(
  defineProps<{
    variant: 'night-sky' | 'hills' | 'sea' | 'forest' | 'garden'
    time?: Time
    night?: boolean
    celestial?: [number, number]
  }>(),
  { time: 'auto', night: false, celestial: () => [1250, 185] }
)

const { modes, cls, cel } = useBackdropTime(props)

/** landscape layer i (0 far → 2 near): day tones, or ink washes over the night sky */
function layer(i: number, m: string) {
  if (m === 'night') return { fill: c('ink'), opacity: [0.3, 0.52, 0.78][i] }
  return { fill: c((['far', 'mid', 'near'] as const)[i]) }
}

const waveRows = [540, 600, 680, 780].map((y, i) => {
  const step = 60 + i * 30
  let d = ''
  for (let x = -40 - i * 23; x < 1640; x += step * 2.2)
    d += `M ${x} ${y + 20 + i * 8} q ${step / 2} ${-12 - i * 4} ${step} 0 `
  return { d, w: 4 + i * 2, o: 0.35 + i * 0.15 }
})

const pinesFar = Array.from({ length: 22 }, (_, i) => {
  const x = i * 78 - 20
  const h = 150 + ((i * 53) % 90)
  return `M ${x - 44} 610 L ${x} ${610 - h} L ${x + 44} 610 Z`
})
const pinesMid = Array.from({ length: 12 }, (_, i) => {
  const x = i * 150 + 30
  const h = 260 + ((i * 71) % 100)
  return `M ${x - 70} 780 L ${x - 30} ${780 - h * 0.55} L ${x - 50} ${780 - h * 0.55} L ${x} ${780 - h} L ${x + 50} ${780 - h * 0.55} L ${x + 30} ${780 - h * 0.55} L ${x + 70} 780 Z`
})

const fr = rng(3)
const flowers = Array.from({ length: 34 }, () => ({
  x: fr() * 1600,
  y: 650 + fr() * 70,
  c: ['red', 'highlight', 'gold', 'cloth-d'][Math.floor(fr() * 4)]!,
}))
</script>
