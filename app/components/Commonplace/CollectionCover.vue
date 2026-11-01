<!-- Collection cover: one of its images (picked per page load), otherwise a generated binding. -->
<template>
  <div
    class="cp-cover"
    :class="[`cp-cover--${size}`, { 'cp-cover--tinted': tint }]"
    :style="{
      '--cp-tint': tint,
      '--cp-band': collection.institutionColor ?? cover?.tint,
    }"
  >
    <template v-if="cover">
      <img
        :src="cover.src"
        :alt="describeCover(cover)"
        :title="describeCover(cover)"
        class="cp-cover__img"
        :class="{ 'cp-cover__img--waiting': !ready }"
      />
      <span v-if="showBand && band && size !== 'sm'" class="cp-cover__band">{{
        band
      }}</span>
    </template>
    <div v-else class="cp-cover__gen">
      <span class="cp-cover__kind">{{
        collection.kind === 'course' ? 'Course' : 'Reading'
      }}</span>
      <IlluminatedInitial :letter="collection.initial" :size="initialSize" />
      <span class="cp-cover__title">{{ collection.title }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { describeCover, type Collection } from '@/assets/data/commonplaceData'
import IlluminatedInitial from './IlluminatedInitial.vue'
import { useCollectionCover, useCoversReady } from './useCollectionCover'

const props = withDefaults(
  defineProps<{
    collection: Collection
    size?: 'sm' | 'md' | 'lg'
    /** show this one of the collection's covers instead of the page's pick */
    coverIndex?: number
    /** show the institution/term band across image covers */
    showBand?: boolean
    /** print black-ink covers in their tint colour (off shows the original) */
    showTint?: boolean
  }>(),
  { size: 'md', coverIndex: undefined, showBand: true, showTint: true }
)

const picked = useCollectionCover(props.collection)
const ready = useCoversReady()
const cover = computed(() =>
  props.coverIndex === undefined
    ? picked.value
    : props.collection.covers?.[props.coverIndex]
)
const tint = computed(() => (props.showTint ? cover.value?.tint : undefined))
const band = computed(() =>
  [props.collection.institution, props.collection.term]
    .filter(Boolean)
    .join(' · ')
)

const initialSize = computed(
  () => ({ sm: '2.6rem', md: '4.25rem', lg: '4.25rem' })[props.size]
)
</script>

<style scoped>
.cp-cover {
  position: relative;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  border: 1px solid var(--cp-rule-strong);
  background: var(--cp-surface);
}
.cp-cover--sm {
  width: 4.5rem;
}
.cp-cover--md {
  width: 100%;
}
.cp-cover--lg {
  width: 9.5rem;
}

.cp-cover__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: opacity var(--cp-dur) ease;
}
/* static pages: hidden until the browser has picked this load's cover */
.cp-cover__img--waiting {
  opacity: 0;
}

/* duotone: ink takes the tint, parchment becomes paper (same in both themes) */
.cp-cover--tinted {
  background: var(--cp-cover-paper);
}
.cp-cover--tinted .cp-cover__img {
  filter: grayscale(1) brightness(1.35) contrast(1.55);
  mix-blend-mode: multiply;
}
.cp-cover--tinted::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--cp-tint);
  mix-blend-mode: lighten;
  pointer-events: none;
}
.cp-cover__band {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  padding: 0.4rem 0.5rem;
  background: var(--cp-band, var(--cp-ink));
  color: var(--cp-cover-paper);
  font-family: var(--cp-sans);
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-align: center;
  text-transform: uppercase;
}

.cp-cover__gen {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.9rem;
  padding: 1rem;
  background-color: var(--cp-surface);
  background-image:
    repeating-linear-gradient(
      45deg,
      var(--cp-pattern-line) 0 1px,
      transparent 1px 14px
    ),
    repeating-linear-gradient(
      -45deg,
      var(--cp-pattern-line) 0 1px,
      transparent 1px 14px
    );
}

/* inner rule, like a blind-tooled border */
.cp-cover__gen::before {
  content: '';
  position: absolute;
  inset: 7px;
  border: 1px solid var(--cp-rule);
  pointer-events: none;
}

.cp-cover__kind,
.cp-cover__title {
  font-family: var(--cp-sans);
  font-size: 0.62rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--cp-text-muted);
  background: var(--cp-surface);
  padding: 0.1rem 0.4rem;
  text-align: center;
}
.cp-cover__title {
  font-family: var(--cp-serif);
  font-size: 0.95rem;
  letter-spacing: 0.06em;
  text-transform: none;
  color: var(--cp-ink);
}

.cp-cover--sm .cp-cover__kind,
.cp-cover--sm .cp-cover__title {
  display: none;
}
</style>
