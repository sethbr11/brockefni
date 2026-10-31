<!--
  Long-hafted axe, upright (blade at the top, edge facing right). Anchor = grip, near the
  bottom of the haft. ~360 long. For the Green Knight use color="green" / blade="metal".
-->
<template>
  <KitPlace v-bind="place(props)">
    <rect x="-9" y="-330" width="18" height="380" rx="8" :fill="c(haft)" />
    <rect x="-11" y="-300" width="22" height="12" rx="3" :fill="c('gold')" />
    <rect x="-11" y="-80" width="22" height="12" rx="3" :fill="c('gold')" />
    <path
      d="M 6 -320 C 60 -350 110 -330 128 -296 C 140 -260 132 -214 112 -190 C 90 -212 54 -224 6 -222 Z"
      :fill="c(blade)"
    />
    <path
      d="M 112 -190 C 132 -214 140 -260 128 -296 C 124 -304 120 -310 114 -316 C 124 -280 122 -230 100 -200 Z"
      :fill="c('highlight')"
      opacity="0.7"
    />
    <path d="M -6 -300 L -44 -282 L -6 -262 Z" :fill="c(blade)" />
  </KitPlace>
</template>

<script setup lang="ts">
import KitPlace from '../KitPlace.vue'
import { c, place, type Placement } from '../util'

const props = withDefaults(
  defineProps<Placement & { haft?: string; blade?: string }>(),
  { haft: 'wood', blade: 'metal' }
)
</script>
