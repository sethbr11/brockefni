<template>
  <g>
    <rect width="1600" height="900" :fill="c('stone')" />
    <path
      :d="brickPath"
      fill="none"
      :stroke="c('stone-2')"
      stroke-width="4"
      opacity="0.4"
    />
    <g v-for="px in [250, 1350]" :key="px" :transform="`translate(${px} 0)`">
      <path
        d="M -150 720 L -150 300 Q -150 130 0 60 Q 150 130 150 300 L 150 720"
        fill="none"
        :stroke="c('stone-2')"
        stroke-width="22"
      />
      <rect
        x="-40"
        y="0"
        width="80"
        height="720"
        :fill="c('stone-3')"
        opacity="0"
      />
    </g>
    <rect x="140" y="0" width="60" height="720" :fill="c('stone-3')" />
    <rect x="1400" y="0" width="60" height="720" :fill="c('stone-3')" />
    <g v-for="m in modes" :key="m" :class="cls(m)" pointer-events="none">
      <path
        data-part="rays"
        d="M 690 300 L 910 300 L 1180 900 L 420 900 Z"
        :fill="c(m === 'night' ? 'moon' : 'glow')"
        :opacity="m === 'night' ? 0.1 : 0.14"
      />
    </g>
    <g data-part="window">
      <path
        d="M 670 540 L 670 270 Q 670 130 800 70 Q 930 130 930 270 L 930 540 Z"
        :fill="c('stone-3')"
      />
      <path
        d="M 690 524 L 690 274 Q 690 150 800 96 Q 910 150 910 274 L 910 524 Z"
        :fill="c('period')"
      />
      <path
        d="M 800 96 L 800 524 M 690 330 L 910 330 M 690 430 L 910 430"
        :stroke="c('stone-3')"
        stroke-width="8"
      />
      <path
        d="M 745 220 L 760 250 L 745 280 L 730 250 Z M 855 220 L 870 250 L 855 280 L 840 250 Z"
        :fill="c('gold')"
      />
      <circle cx="745" cy="380" r="18" :fill="c('red')" />
      <circle cx="855" cy="380" r="18" :fill="c('cloth-b')" />
      <circle cx="745" cy="478" r="14" :fill="c('gold')" />
      <circle cx="855" cy="478" r="14" :fill="c('green')" />
      <circle cx="800" cy="170" r="22" :fill="c('glow')" />
      <!-- night: the glass sits dark, only the moon-struck colours glimmer -->
      <path
        v-if="mode !== 'day'"
        :class="mode === 'auto' ? 'cp-night' : undefined"
        d="M 690 524 L 690 274 Q 690 150 800 96 Q 910 150 910 274 L 910 524 Z"
        :fill="c('night')"
        opacity="0.5"
      />
    </g>
    <rect x="0" y="720" width="1600" height="180" :fill="c('stone-2')" />
    <rect
      x="0"
      y="720"
      width="1600"
      height="10"
      :fill="c('ink')"
      opacity="0.2"
    />
    <g>
      <rect x="600" y="590" width="400" height="140" :fill="c('stone-3')" />
      <rect
        x="580"
        y="566"
        width="440"
        height="34"
        rx="4"
        :fill="c('highlight')"
      />
      <rect x="740" y="600" width="120" height="130" :fill="c('period')" />
      <path
        d="M 800 616 L 800 700 M 772 640 L 828 640"
        :stroke="c('gold')"
        stroke-width="10"
        stroke-linecap="round"
      />
      <Candle :x="640" :y="566" :scale="0.85" />
      <Candle :x="960" :y="566" :scale="0.85" />
      <g
        v-if="mode !== 'day'"
        :class="mode === 'auto' ? 'cp-night' : undefined"
        :fill="c('glow')"
        pointer-events="none"
      >
        <circle
          v-for="cx in [640, 960]"
          :key="cx"
          :cx="cx"
          cy="520"
          r="150"
          opacity="0.1"
        />
        <circle
          v-for="cx in [640, 960]"
          :key="`b${cx}`"
          :cx="cx"
          cy="520"
          r="80"
          opacity="0.14"
        />
      </g>
    </g>
  </g>
</template>

<script setup lang="ts">
import Candle from '../props/Candle.vue'
import { c } from '../util'
import { brickPath } from './shared'
import { useBackdropTime, type Time } from './useBackdropTime'

const props = withDefaults(defineProps<{ time?: Time; night?: boolean }>(), {
  time: 'auto',
  night: false,
})

const { mode, modes, cls } = useBackdropTime(props)
</script>
