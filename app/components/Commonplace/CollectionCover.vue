<!-- Collection cover: the image if provided, otherwise a generated binding. -->
<template>
  <div class="cp-cover" :class="`cp-cover--${size}`">
    <img
      v-if="collection.cover"
      :src="collection.cover"
      :alt="`Cover of ${collection.title}`"
      class="cp-cover__img"
    />
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
import type { Collection } from '@/assets/data/commonplaceData'
import IlluminatedInitial from './IlluminatedInitial.vue'

const props = withDefaults(
  defineProps<{ collection: Collection; size?: 'sm' | 'md' | 'lg' }>(),
  { size: 'md' }
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
