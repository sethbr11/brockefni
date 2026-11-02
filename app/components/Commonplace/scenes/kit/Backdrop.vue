<!--
  Full-stage background (1600×900). Put it first inside <SceneStage>.
  variant: 'mead-hall' | 'castle-hall' | 'night-sky' | 'hills' | 'sea' | 'forest' | 'chapel' |
           'study' | 'stable' | 'garden' | 'parchment'
  time:    'auto' (default) | 'day' | 'night'. Which sky the backdrop (and any window/doorway in it) shows.
           'auto' draws BOTH a sunny day and a moonlit night version and lets CSS pick one from the site
           theme (day in light mode, night under `html.darkmode`) -- no JS, so SSR / seek / reduced-motion
           all work. 'day' / 'night' pin it (use for stories that need a specific hour).
  night:   legacy alias for time="night".
  celestial: [x, y] of the sun / moon (default [1250, 185]).
  showWindow: study only; false omits the backdrop's own window (for scenes that draw a bigger one).
  Floor / horizon line (where figures stand): mead-hall 720, castle-hall 640–900, chapel 720,
  study 760, stable 760, hills ~740, garden ~760, forest ~770, sea 540 (waterline), night-sky ~760.
  Parts: sky, sun, moon, stars, clouds, waves (sea), fire + glow (mead-hall), door + moonlight
  (mead-hall), banners (castle-hall), rays + flame (chapel), window (study),
  door (stable).
  Slot #doorway (mead-hall): drawn inside the open doorway, behind the door panel.
-->
<template>
  <g class="cp-backdrop">
    <Outdoor
      v-if="outdoor"
      :variant="variant as OutdoorVariant"
      :time="time"
      :night="night"
      :celestial="celestial"
    />
    <MeadHall
      v-else-if="variant === 'mead-hall'"
      :time="time"
      :night="night"
      :door-open="doorOpen"
    >
      <template #doorway><slot name="doorway" /></template>
    </MeadHall>
    <CastleHall
      v-else-if="variant === 'castle-hall'"
      :time="time"
      :night="night"
    />
    <Chapel v-else-if="variant === 'chapel'" :time="time" :night="night" />
    <Study
      v-else-if="variant === 'study'"
      :time="time"
      :night="night"
      :show-window="showWindow"
    />
    <Stable v-else-if="variant === 'stable'" :time="time" :night="night" />
    <Parchment v-else-if="variant === 'parchment'" />

    <slot />
  </g>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import CastleHall from './backdrops/CastleHall.vue'
import Chapel from './backdrops/Chapel.vue'
import MeadHall from './backdrops/MeadHall.vue'
import Outdoor from './backdrops/Outdoor.vue'
import Parchment from './backdrops/Parchment.vue'
import Stable from './backdrops/Stable.vue'
import Study from './backdrops/Study.vue'
import type { Time } from './backdrops/useBackdropTime'

type OutdoorVariant = 'night-sky' | 'hills' | 'sea' | 'forest' | 'garden'
type Variant =
  | OutdoorVariant
  | 'mead-hall'
  | 'castle-hall'
  | 'chapel'
  | 'study'
  | 'stable'
  | 'parchment'

const props = withDefaults(
  defineProps<{
    variant: Variant
    night?: boolean
    time?: Time
    doorOpen?: boolean
    celestial?: [number, number]
    showWindow?: boolean
  }>(),
  {
    night: false,
    time: 'auto',
    doorOpen: false,
    showWindow: true,
    celestial: () => [1250, 185],
  }
)

const outdoor = computed(() =>
  ['night-sky', 'hills', 'sea', 'forest', 'garden'].includes(props.variant)
)
</script>
