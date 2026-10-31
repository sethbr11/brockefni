<template>
  <g>
    <rect width="1600" height="900" :fill="c('stone-3')" />
    <rect x="0" y="540" width="1600" height="220" :fill="c('wood')" />
    <path
      v-for="x in 16"
      :key="x"
      :d="`M ${x * 100} 560 L ${x * 100} 740`"
      :stroke="c('wood-2')"
      stroke-width="5"
      opacity="0.5"
    />
    <rect x="0" y="540" width="1600" height="16" :fill="c('wood-3')" />
    <rect x="0" y="760" width="1600" height="140" :fill="c('wood-2')" />
    <!-- shelf -->
    <rect x="70" y="120" width="440" height="640" :fill="c('wood-2')" />
    <rect
      x="90"
      y="140"
      width="400"
      height="600"
      :fill="c('ink')"
      opacity="0.35"
    />
    <rect
      v-for="y in [290, 450, 610, 740]"
      :key="y"
      x="80"
      :y="y"
      width="420"
      height="16"
      :fill="c('wood-3')"
    />
    <rect
      v-for="(b, i) in books"
      :key="i"
      :x="b.x"
      :y="b.y"
      :width="b.w"
      :height="b.h"
      rx="3"
      :fill="c(b.c)"
      :transform="b.t"
    />
    <!-- window -->
    <g v-if="showWindow" data-part="window">
      <path
        d="M 1050 480 L 1050 230 Q 1050 120 1200 100 Q 1350 120 1350 230 L 1350 480 Z"
        :fill="c('wood-3')"
      />
      <g v-for="m in modes" :key="m" :class="cls(m)">
        <path
          d="M 1072 460 L 1072 236 Q 1072 140 1200 122 Q 1328 140 1328 236 L 1328 460 Z"
          :fill="c(m === 'night' ? 'night' : 'sky')"
        />
        <template v-if="m === 'night'">
          <circle cx="1260" cy="210" r="26" :fill="c('moon')" />
          <circle cx="1120" cy="260" r="3" :fill="c('star')" />
          <circle cx="1160" cy="350" r="2.5" :fill="c('star')" />
          <circle cx="1290" cy="400" r="3" :fill="c('star')" />
        </template>
        <template v-else>
          <path
            d="M 1072 460 L 1072 410 C 1130 380 1200 420 1328 396 L 1328 460 Z"
            :fill="c('far')"
          />
          <circle cx="1260" cy="210" r="46" :fill="c('sun')" opacity="0.25" />
          <circle cx="1260" cy="210" r="28" :fill="c('sun')" />
          <path
            :d="cloud"
            :fill="c('highlight')"
            opacity="0.9"
            transform="translate(1150 320) scale(0.4)"
          />
        </template>
      </g>
      <path
        d="M 1200 122 L 1200 460 M 1072 300 L 1328 300"
        :stroke="c('wood-3')"
        stroke-width="10"
      />
      <rect x="1040" y="470" width="320" height="20" :fill="c('wood-3')" />
    </g>
    <g
      v-for="m in showWindow ? modes : []"
      :key="m"
      :class="cls(m)"
      pointer-events="none"
    >
      <path
        d="M 1072 480 L 1328 480 L 1330 760 L 640 760 Z"
        :fill="c(m === 'night' ? 'moon' : 'sun')"
        :opacity="m === 'night' ? 0.06 : 0.12"
      />
    </g>
  </g>
</template>

<script setup lang="ts">
import { c, rng } from '../util'
import { cloud } from './shared'
import { useBackdropTime, type Time } from './useBackdropTime'

const props = withDefaults(
  defineProps<{ time?: Time; night?: boolean; showWindow?: boolean }>(),
  { time: 'auto', night: false, showWindow: true }
)

const { modes, cls } = useBackdropTime(props)

const br = rng(11)
const books = (() => {
  const out: {
    x: number
    y: number
    w: number
    h: number
    c: string
    t?: string
  }[] = []
  const colors = [
    'cloth-a',
    'cloth-b',
    'cloth-d',
    'green-2',
    'gold',
    'wood-3',
    'red',
  ]
  for (const shelf of [290, 450, 610, 740]) {
    let x = 100
    while (x < 470) {
      const w = 18 + br() * 22
      const h = 90 + br() * 46
      const lean = br() > 0.88 && x < 420
      out.push({
        x,
        y: shelf - h,
        w,
        h,
        c: colors[Math.floor(br() * colors.length)]!,
        t: lean ? `rotate(14 ${x} ${shelf})` : undefined,
      })
      x += w + 3 + (lean ? 26 : 0)
    }
  }
  return out
})()
</script>
