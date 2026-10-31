<!--
  16:9 SVG stage (1600×900 units). Wrap a scene's artwork in it and pass `build`, a callback
  that adds tweens to the master timeline (see useSceneTimeline.ts / README.md).
  The stage adds: a "camera" group around the slot (zoom / shake), a curtain for the opening
  fade, and the closing title card (appended automatically after the scene's beats).
-->
<template>
  <svg
    ref="svg"
    class="cp-scene-svg"
    viewBox="0 0 1600 900"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
    focusable="false"
  >
    <rect width="1600" height="900" :fill="c('paper-2')" />
    <g data-part="camera" data-pivot transform="translate(800 450)">
      <g transform="translate(-800 -450)">
        <slot />
      </g>
    </g>
    <rect
      data-part="curtain"
      x="-10"
      y="-10"
      width="1620"
      height="920"
      :fill="c('paper')"
      opacity="1"
    />
    <template v-if="caption">
      <rect
        data-part="dim"
        x="-10"
        y="-10"
        width="1620"
        height="920"
        :fill="c('ink')"
        opacity="0"
      />
      <SceneCaption
        :title="ctl?.title ?? ''"
        :initial="ctl?.initial"
        :label="label"
        :show-initial="captionInitial"
      />
    </template>
  </svg>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { periods } from '@/assets/data/commonplaceData'
import SceneCaption from './SceneCaption.vue'
import {
  SCENE_CONTROLLER,
  useSceneTimeline,
  type SceneBuild,
} from './useSceneTimeline'
import { c } from './util'

const props = withDefaults(
  defineProps<{
    /** adds the scene's tweens to the master timeline */
    build?: SceneBuild
    /** show the closing title card (default true) */
    caption?: boolean
    /** start time of the title card; default = when the scene's own beats end */
    captionAt?: number
    /** show the illuminated-initial box on the title card (default true) */
    captionInitial?: boolean
    /** how much the scene darkens behind the title card (0–1, default 0.25) */
    captionDim?: number
  }>(),
  {
    build: undefined,
    caption: true,
    captionAt: undefined,
    captionInitial: true,
    captionDim: 0.25,
  }
)

const svg = ref<SVGSVGElement | null>(null)
const ctl = inject(SCENE_CONTROLLER, null)
const label = computed(() => (ctl ? (periods[ctl.period]?.label ?? '') : ''))

const { timeline, finish } = useSceneTimeline(svg, props.build, {
  caption: props.caption,
  captionAt: props.captionAt,
  captionDim: props.captionDim,
})

defineExpose({ timeline, finish })
</script>

<style>
.cp-scene-svg {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
