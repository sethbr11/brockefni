<template>
  <g>
    <!-- plank walls -->
    <rect width="1600" height="900" :fill="c('wood')" />
    <path
      v-for="x in 31"
      :key="x"
      :d="`M ${x * 52} 0 L ${x * 52} 760`"
      :stroke="c('wood-2')"
      stroke-width="4"
      opacity="0.45"
    />
    <!-- roof beam and braces -->
    <rect x="0" y="120" width="1600" height="34" :fill="c('wood-2')" />
    <path
      v-for="x in [80, 620, 1160]"
      :key="x"
      :d="`M ${x} 154 L ${x} 760 M ${x} 300 L ${x + 120} 154`"
      :stroke="c('wood-2')"
      stroke-width="26"
      stroke-linecap="square"
    />

    <!-- open doorway onto the night (or day) -->
    <g data-part="door">
      <rect x="196" y="316" width="268" height="444" :fill="c('wood-2')" />
      <g v-for="m in modes" :key="m" :class="cls(m)">
        <rect
          x="210"
          y="330"
          width="240"
          height="430"
          :fill="c(m === 'night' ? 'night' : 'sky')"
        />
        <path
          d="M 210 700 C 270 670 360 690 450 664 L 450 760 L 210 760 Z"
          :fill="c(m === 'night' ? 'night-2' : 'far')"
        />
        <template v-if="m === 'night'">
          <circle cx="380" cy="400" r="24" :fill="c('moon')" />
          <circle cx="250" cy="380" r="3" :fill="c('star')" />
          <circle cx="300" cy="470" r="2.5" :fill="c('star')" />
          <circle cx="420" cy="520" r="3" :fill="c('star')" />
        </template>
        <template v-else>
          <circle cx="380" cy="400" r="40" :fill="c('sun')" opacity="0.25" />
          <circle cx="380" cy="400" r="24" :fill="c('sun')" />
        </template>
      </g>
      <!-- the door swung back against the wall -->
      <path d="M 464 316 L 540 336 L 540 742 L 464 760 Z" :fill="c('wood-3')" />
      <path
        d="M 480 380 L 526 390 M 480 690 L 526 690"
        :stroke="c('wood-2')"
        stroke-width="8"
      />
    </g>
    <!-- light spilling in through the doorway -->
    <g
      v-for="m in modes"
      :key="`spill-${m}`"
      :class="cls(m)"
      pointer-events="none"
    >
      <path
        d="M 210 760 L 450 760 L 700 900 L 120 900 Z"
        :fill="c(m === 'night' ? 'moon' : 'sun')"
        :opacity="m === 'night' ? 0.08 : 0.14"
      />
    </g>

    <!-- hayloft -->
    <rect x="1040" y="290" width="560" height="24" :fill="c('wood-2')" />
    <path
      d="M 1060 290 C 1080 230 1140 214 1200 236 C 1250 196 1330 200 1370 236 C 1420 210 1500 214 1530 250 C 1570 240 1600 256 1600 290 Z"
      :fill="c('gold-2')"
    />
    <path
      v-for="(s, i) in loftStraws"
      :key="i"
      :d="s"
      :stroke="c('gold')"
      stroke-width="4"
      stroke-linecap="round"
    />

    <!-- straw-strewn floor -->
    <rect y="760" width="1600" height="140" :fill="c('wood-2')" />
    <path
      v-for="(s, i) in floorStraws"
      :key="`f${i}`"
      :d="s"
      :stroke="c('gold-2')"
      stroke-width="4"
      stroke-linecap="round"
      opacity="0.6"
    />
  </g>
</template>

<script setup lang="ts">
import { c, rng } from '../util'
import { useBackdropTime, type Time } from './useBackdropTime'

const props = withDefaults(defineProps<{ time?: Time; night?: boolean }>(), {
  time: 'auto',
  night: false,
})

const { modes, cls } = useBackdropTime(props)

const r = rng(23)
/** short strands hanging off the loft edge */
const loftStraws = Array.from({ length: 14 }, () => {
  const x = 1070 + r() * 510
  const len = 14 + r() * 26
  return `M ${x} 312 L ${x + (r() - 0.5) * 16} ${312 + len}`
})
/** scattered strands on the floor */
const floorStraws = Array.from({ length: 34 }, () => {
  const x = r() * 1600
  const y = 780 + r() * 110
  const a = (r() - 0.5) * 1.4
  return `M ${x} ${y} L ${x + Math.cos(a) * 30} ${y + Math.sin(a) * 30}`
})
</script>
