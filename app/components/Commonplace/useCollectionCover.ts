import { computed } from 'vue'
import { useState } from '#app'
import type { Collection } from '@/assets/data/commonplaceData'

/**
 * The cover shown for a collection on this page load: one of its `covers`,
 * picked at random once and shared (and serialised from the server, so the
 * client renders the same pick). A full reload picks again.
 */
export function useCollectionCover(collection: Collection) {
  const count = collection.covers?.length ?? 0
  const index = useState(`cp-cover-${collection.id}`, () =>
    count ? Math.floor(Math.random() * count) : 0
  )
  return computed(() => collection.covers?.[index.value % (count || 1)])
}
