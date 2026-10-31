<!-- Impact burst / flash (comic "pow"). Anchor = centre. ~200 across. Hidden by default style is up to the scene: pop() it in, then exit(). -->
<template>
  <KitPlace v-bind="place(props)">
    <path :d="star(110, 54, 10)" :fill="c(color)" />
    <path :d="star(64, 30, 10)" :fill="c('highlight')" />
    <path
      v-for="i in 8"
      :key="i"
      d="M 0 -130 L 0 -170"
      :stroke="c(color)"
      stroke-width="8"
      stroke-linecap="round"
      :transform="`rotate(${i * 45 + 22})`"
    />
  </KitPlace>
</template>

<script setup lang="ts">
import KitPlace from '../KitPlace.vue'
import { c, place, type Placement } from '../util'

const props = withDefaults(defineProps<Placement & { color?: string }>(), {
  color: 'glow',
})
function star(R: number, r: number, n: number) {
  let d = ''
  for (let i = 0; i < n * 2; i++) {
    const a = (Math.PI * i) / n - Math.PI / 2
    const rr = i % 2 ? r : R
    d += `${i ? 'L' : 'M'} ${(Math.cos(a) * rr).toFixed(1)} ${(Math.sin(a) * rr).toFixed(1)} `
  }
  return d + 'Z'
}
</script>
