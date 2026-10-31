<template>
  <g :transform="`translate(${side === 'l' ? -56 : 56} -190)`">
    <g
      :data-part="`arm-${side}`"
      data-pivot
      :transform="angle ? `rotate(${angle})` : undefined"
    >
      <rect
        x="-16"
        y="-14"
        width="32"
        height="104"
        rx="16"
        :fill="col(sleeve)"
      />
      <rect
        x="-16"
        y="-14"
        width="32"
        height="104"
        rx="16"
        :fill="col('ink')"
        :opacity="side === 'l' ? 0.1 : 0.18"
      />
      <rect
        v-if="ornament"
        x="-16"
        y="66"
        width="32"
        height="8"
        :fill="col(ornament)"
      />
      <g transform="translate(0 100)"><slot name="hand" /></g>
      <circle cx="0" cy="100" r="16" :fill="col(skin)" />
      <g transform="translate(0 100)"><slot name="held" /></g>
    </g>
  </g>
</template>

<script setup lang="ts">
import { useCol } from './useCol'

const props = defineProps<{
  /** l = left arm (positive angle raises it), r = right arm (negative raises) */
  side: 'l' | 'r'
  angle: number
  sleeve: string
  skin: string
  ornament?: string
  silhouette?: boolean
}>()

const col = useCol(props)
</script>
