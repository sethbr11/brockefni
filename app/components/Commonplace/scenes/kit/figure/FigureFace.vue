<template>
  <g :transform="`translate(${look * 10} -60)`">
    <g data-part="eyes" data-pivot>
      <!-- closed eyes keep a hidden open pair, so a scene can wake the figure (crossfade the two) -->
      <template v-if="eyes === 'closed'">
        <path
          data-part="eyes-closed"
          d="M -30 2 Q -20 8 -10 2 M 10 2 Q 20 8 30 2"
          fill="none"
          :stroke="eyeColor"
          stroke-width="5"
          stroke-linecap="round"
        />
        <g data-part="eyes-open" style="opacity: 0">
          <circle cx="-20" cy="0" r="7.5" :fill="eyeColor" />
          <circle cx="20" cy="0" r="7.5" :fill="eyeColor" />
        </g>
      </template>
      <template v-else>
        <circle cx="-20" cy="0" r="7.5" :fill="eyeColor" />
        <circle cx="20" cy="0" r="7.5" :fill="eyeColor" />
      </template>
    </g>
    <!-- expression layer(s): `face` shows `mood`; `face-alt` (only when moodTo is set) starts hidden --
                 a timeline crossfades the two (opacity) to change expression mid-scene -->
    <template v-if="!silhouette">
      <g
        v-for="f in faces"
        :key="f.part"
        :data-part="f.part"
        :style="f.hidden ? 'opacity:0' : undefined"
        fill="none"
        :stroke="c('ink')"
        stroke-width="5"
        stroke-linecap="round"
      >
        <path
          v-if="f.mood === 'stern'"
          d="M -34 -22 L -10 -14 M 34 -22 L 10 -14"
        />
        <path
          v-if="f.mood === 'alarmed'"
          d="M -32 -22 Q -20 -32 -8 -24 M 32 -22 Q 20 -32 8 -24"
        />
        <path
          v-if="f.mood === 'sad'"
          d="M -32 -16 L -10 -24 M 32 -16 L 10 -24"
        />
        <path v-if="f.mood === 'happy' && !beard" d="M -14 24 Q 0 36 14 24" />
        <path
          v-if="f.mood === 'happy' && beard"
          d="M -12 34 Q 0 42 12 34"
          :stroke="c('highlight')"
        />
        <ellipse
          v-if="f.mood === 'alarmed'"
          cx="0"
          cy="30"
          rx="7"
          ry="9"
          :fill="c('ink')"
          stroke="none"
        />
        <path v-if="f.mood === 'sad'" d="M -12 32 Q 0 24 12 32" />
      </g>
    </template>
  </g>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { c } from '../util'

export type Mood = 'neutral' | 'happy' | 'stern' | 'alarmed' | 'sad'

const props = defineProps<{
  mood: Mood
  moodTo?: Mood | Mood[]
  eyes: 'open' | 'closed'
  look: number
  beard?: boolean | 'long'
  silhouette?: boolean
}>()

const eyeColor = computed(() => (props.silhouette ? c('glow') : c('ink')))
const faces = computed(() => [
  { part: 'face', mood: props.mood, hidden: false },
  ...[props.moodTo ?? []].flat().map((mood, i) => ({
    part: i ? `face-alt-${i + 1}` : 'face-alt',
    mood,
    hidden: true,
  })),
])
</script>
