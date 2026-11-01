<template>
  <g v-if="hat === 'crown'">
    <path
      d="M -46 -110 L -50 -158 L -26 -132 L 0 -168 L 26 -132 L 50 -158 L 46 -110 Z"
      :fill="col(hatColor ?? 'gold')"
    />
    <rect
      x="-48"
      y="-118"
      width="96"
      height="14"
      rx="3"
      :fill="col(hatColor ?? 'gold')"
    />
    <path
      d="M -48 -110 L 48 -110 L 48 -104 L -48 -104 Z"
      :fill="col('ink')"
      opacity="0.15"
    />
    <circle cx="0" cy="-122" r="7" :fill="col('red')" />
    <circle cx="-50" cy="-160" r="5" :fill="col(hatColor ?? 'gold')" />
    <circle cx="50" cy="-160" r="5" :fill="col(hatColor ?? 'gold')" />
    <circle cx="0" cy="-170" r="6" :fill="col(hatColor ?? 'gold')" />
  </g>
  <g v-if="hat === 'helmet'">
    <path
      d="M -66 -64 C -68 -128 -36 -140 0 -140 C 36 -140 68 -128 66 -64 Z"
      :fill="col(hatColor ?? 'metal')"
    />
    <path
      d="M 18 -138 C 50 -132 68 -112 66 -64 L 40 -64 C 44 -100 36 -124 18 -138 Z"
      :fill="col('ink')"
      opacity="0.12"
    />
    <rect x="-5" y="-140" width="10" height="76" :fill="col('gold')" />
    <rect
      x="-68"
      y="-82"
      width="136"
      height="16"
      rx="4"
      :fill="col(hatColor ? hatColor : 'metal-2')"
    />
    <path
      d="M -42 -82 Q -24 -96 -6 -82 M 42 -82 Q 24 -96 6 -82"
      fill="none"
      :stroke="col('gold')"
      stroke-width="5"
      stroke-linecap="round"
    />
    <rect x="-6" y="-80" width="12" height="44" rx="4" :fill="col('metal-2')" />
    <path
      d="M -68 -70 L -50 -70 L -48 -22 Q -60 -24 -68 -34 Z M 68 -70 L 50 -70 L 48 -22 Q 60 -24 68 -34 Z"
      :fill="col(hatColor ?? 'metal')"
    />
  </g>
  <path
    v-if="hat === 'hood'"
    d="M -72 -46 C -76 -130 -38 -146 0 -146 C 38 -146 76 -130 72 -46 L 58 -54 C 58 -110 30 -124 0 -124 C -30 -124 -58 -110 -58 -54 Z"
    :fill="col(hatColor ?? 'cloth-d')"
  />
  <g v-if="hat === 'hat'">
    <path
      d="M -42 -112 L -36 -196 Q -36 -204 -28 -204 L 28 -204 Q 36 -204 36 -196 L 42 -112 Z"
      :fill="col(hatColor ?? 'ink')"
    />
    <rect
      x="-42"
      y="-136"
      width="84"
      height="16"
      :fill="col('gold')"
      opacity="0.9"
    />
    <ellipse cx="0" cy="-112" rx="88" ry="15" :fill="col(hatColor ?? 'ink')" />
  </g>
  <g v-if="hat === 'cap'">
    <ellipse
      cx="12"
      cy="-118"
      rx="74"
      ry="28"
      :fill="col(hatColor ?? 'cloth-a')"
    />
    <path
      d="M -56 -104 Q 12 -88 82 -104 L 80 -96 Q 12 -80 -54 -96 Z"
      :fill="col('ink')"
      opacity="0.18"
    />
    <circle cx="40" cy="-144" r="8" :fill="col(hatColor ?? 'cloth-a')" />
  </g>
</template>

<script setup lang="ts">
import { useCol } from './useCol'

export type Hat =
  | 'none'
  | 'crown'
  | 'helmet'
  | 'hood'
  | 'wimple'
  | 'hat'
  | 'cap'

const props = defineProps<{
  hat: Hat
  hatColor?: string
  silhouette?: boolean
}>()

const col = useCol(props)
</script>
