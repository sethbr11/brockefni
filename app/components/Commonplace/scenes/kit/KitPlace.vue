<!--
  Positioning wrapper used by every primitive.
  Outer <g> (data-part, data-pivot) = what timelines tween: x/y/rotation/scale/opacity.
  Its local origin (0,0) is the primitive's anchor, so rotation/scale pivot there.
  Inner <g> carries the static scale/flip/rotate and is never tweened.
-->
<template>
  <g :data-part="part" data-pivot :transform="`translate(${x ?? 0} ${y ?? 0})`">
    <g :transform="inner">
      <slot />
    </g>
  </g>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  x?: number
  y?: number
  scale?: number
  flip?: boolean
  rotate?: number
  part?: string
}>()

const inner = computed(() => {
  const s = props.scale ?? 1
  const parts: string[] = []
  if (props.rotate) parts.push(`rotate(${props.rotate})`)
  if (s !== 1 || props.flip) parts.push(`scale(${props.flip ? -s : s} ${s})`)
  return parts.join(' ') || undefined
})
</script>
