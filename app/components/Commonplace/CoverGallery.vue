<!-- Every cover a collection can show, each linking to the page its image came from. -->
<template>
  <dialog
    ref="dialog"
    class="cp-gallery"
    :aria-labelledby="titleId"
    @close="open = false"
    @click="onBackdrop"
  >
    <div class="cp-gallery__body">
      <header class="cp-gallery__head">
        <div>
          <h2 :id="titleId" class="cp-gallery__title">
            Covers for {{ collection.title }}
          </h2>
          <p class="cp-gallery__hint">
            One is picked each time the page loads. Select an image to open its
            source.
          </p>
        </div>
        <button
          type="button"
          class="cp-gallery__close"
          aria-label="Close"
          @click="dialog?.close()"
        >
          ×
        </button>
      </header>

      <ul class="cp-gallery__grid">
        <li v-for="(c, i) in collection.covers" :key="c.source">
          <a
            :href="c.source"
            target="_blank"
            rel="noopener noreferrer"
            class="cp-gallery__link"
          >
            <CollectionCover
              :collection="collection"
              :cover-index="i"
              :show-band="false"
              :show-tint="false"
              class="cp-gallery__cover"
            />
            <span class="cp-sr-only">(opens its source in a new tab)</span>
          </a>
          <p class="cp-gallery__name">{{ c.title }}</p>
          <p v-if="c.artist || c.date" class="cp-gallery__meta">
            {{ [c.artist, c.date].filter(Boolean).join(', ') }}
          </p>
          <p v-if="c.holder || c.license" class="cp-gallery__meta">
            {{ [c.holder, c.license].filter(Boolean).join(' · ') }}
          </p>
          <p v-if="c === current" class="cp-gallery__now">On the cover now</p>
        </li>
      </ul>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { nextTick, ref, useId, watch } from 'vue'
import type { Collection } from '@/assets/data/commonplaceData'
import CollectionCover from './CollectionCover.vue'
import { useCollectionCover } from './useCollectionCover'

const props = defineProps<{ collection: Collection }>()
const open = defineModel<boolean>('open', { default: false })

const dialog = ref<HTMLDialogElement | null>(null)
const titleId = `cp-gallery-${useId()}`
const current = useCollectionCover(props.collection)

watch(open, async (isOpen) => {
  await nextTick()
  if (isOpen && !dialog.value?.open) dialog.value?.showModal()
  else if (!isOpen && dialog.value?.open) dialog.value.close()
})

/** clicks on the dialog element itself land on the backdrop area */
function onBackdrop(e: MouseEvent) {
  if (e.target === dialog.value) dialog.value?.close()
}
</script>

<style scoped>
/* a full-page lightbox: the dialog itself is the dark layer and scrolls */
.cp-gallery {
  width: 100vw;
  height: 100dvh;
  max-width: none;
  max-height: none;
  margin: 0;
  padding: 0;
  border: 0;
  background: var(--cp-lightbox);
  color: var(--cp-cover-paper);
  overflow-y: auto;
  overscroll-behavior: contain;
}
.cp-gallery::backdrop {
  background: transparent;
}
.cp-gallery[open] {
  animation: cp-gallery-in var(--cp-dur) var(--cp-ease);
}
@keyframes cp-gallery-in {
  from {
    opacity: 0;
  }
}
/* the page behind stays put while the gallery is up */
:global(html:has(.cp-gallery[open])) {
  overflow: hidden;
}

.cp-gallery__body {
  --gap: 2rem;
  max-width: calc(4 * 13rem + 3 * var(--gap));
  margin: 0 auto;
  padding: 3.5rem 1.5rem 4rem;
}

.cp-gallery__head {
  text-align: center;
}
.cp-gallery__title {
  margin: 0;
  font-family: var(--cp-serif);
  font-size: 1.7rem;
  font-weight: 500;
}
.cp-gallery__hint {
  margin: 0.4rem 0 0;
  font-size: 0.8rem;
  opacity: 0.7;
}
.cp-gallery__close {
  position: fixed;
  top: 0.9rem;
  right: 1rem;
  z-index: 1;
  width: 2.4rem;
  height: 2.4rem;
  border: 0;
  border-radius: 50%;
  background: var(--cp-cover-scrim);
  font-size: 1.8rem;
  line-height: 1;
  color: inherit;
  opacity: 0.75;
  cursor: pointer;
}
@media (hover: hover) {
  .cp-gallery__close:hover {
    opacity: 1;
  }
}
.cp-gallery__close:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

/* four to a row, centred; tiles keep one size when a row isn't full */
.cp-gallery__grid {
  list-style: none;
  margin: 2.5rem 0 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2.5rem var(--gap);
}
.cp-gallery__grid > li {
  width: calc((100% - 3 * var(--gap)) / 4);
}

.cp-gallery__link {
  display: block;
  border-radius: 2px;
}
.cp-gallery__cover {
  border-color: transparent;
  transition: transform var(--cp-dur) var(--cp-ease);
}
.cp-gallery__link:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 4px;
}
@media (hover: hover) {
  .cp-gallery__link:hover .cp-gallery__cover {
    transform: translateY(-3px);
  }
}

.cp-gallery__name {
  margin: 0.8rem 0 0;
  font-family: var(--cp-serif);
  font-size: 1rem;
  line-height: 1.3;
}
.cp-gallery__meta {
  margin: 0.25rem 0 0;
  font-size: 0.72rem;
  line-height: 1.4;
  opacity: 0.7;
}
.cp-gallery__now {
  display: inline-block;
  margin: 0.5rem 0 0;
  padding-top: 0.3rem;
  border-top: 1px solid currentColor;
  font-size: 0.64rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.cp-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

@media (max-width: 820px) {
  .cp-gallery__body {
    --gap: 1.1rem;
    padding: 3.25rem 1rem 3rem;
  }
  .cp-gallery__grid > li {
    width: calc((100% - var(--gap)) / 2);
  }
}
</style>
