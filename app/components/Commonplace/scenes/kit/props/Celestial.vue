<!--
  The sun / the moon, same spot. Anchor = centre of the disc (sun r 72, moon r 64 at scale 1).
  time: 'auto' (default) draws both and CSS shows the sun in light mode and the moon in dark mode
        (`html.darkmode`); 'day' / 'night' pin one. Use it for scenes that draw their own sky
        (a window view, a portal, a dusk) -- Backdrop already does this for its own sky.
  Parts: sun, moon (nested; tween either — the hidden one is display:none).
-->
<template>
  <KitPlace v-bind="place(props)">
    <g v-if="time !== 'night'" :class="time === 'auto' ? 'cp-day' : undefined">
      <g data-part="sun" data-pivot>
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
    </g>
    <g v-if="time !== 'day'" :class="time === 'auto' ? 'cp-night' : undefined">
      <g data-part="moon" data-pivot>
        <circle r="110" :fill="c('moon')" opacity="0.12" />
        <circle r="64" :fill="c('moon')" />
        <circle cx="-18" cy="-14" r="12" :fill="c('ink')" opacity="0.06" />
        <circle cx="20" cy="18" r="8" :fill="c('ink')" opacity="0.06" />
      </g>
    </g>
  </KitPlace>
</template>

<script setup lang="ts">
import KitPlace from '../KitPlace.vue'
import { c, place, type Placement } from '../util'

const props = withDefaults(
  defineProps<Placement & { time?: 'auto' | 'day' | 'night' }>(),
  { time: 'auto' }
)
</script>
