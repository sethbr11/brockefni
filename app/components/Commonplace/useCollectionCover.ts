import { computed } from 'vue'
import { useNuxtApp, useState } from '#app'
import type { Collection } from '@/assets/data/commonplaceData'

/**
 * False while a prerendered (static) page still shows the cover picked when
 * the site was generated; covers stay hidden until the browser picks again.
 */
export function useCoversReady() {
  return useState('cp-covers-ready', () => !import.meta.prerender)
}

/**
 * The cover shown for a collection on this page load: one of its `covers`,
 * picked at random once and shared (and serialised from the server, so the
 * client renders the same pick). A full reload picks again.
 */
export function useCollectionCover(collection: Collection) {
  const count = collection.covers?.length ?? 0
  const pick = () => (count ? Math.floor(Math.random() * count) : 0)
  const index = useState(`cp-cover-${collection.id}`, pick)

  const ready = useCoversReady()
  if (import.meta.client && !ready.value) {
    // a static page carries the build-time pick: choose again once hydrated
    useNuxtApp().hooks.hookOnce('app:suspense:resolve', () => {
      if (!ready.value) index.value = pick()
      ready.value = true
    })
  }

  return computed(() => collection.covers?.[index.value % (count || 1)])
}
