import { onMounted } from 'vue'
import { useState } from '#app'

const STORAGE_KEY = 'cp-scenes'

/**
 * Whether intro scenes play when entering a work. Persisted in localStorage
 * ('on' | 'off'). Read on mount only, so SSR and first client render agree.
 */
export function useScenePref() {
  const enabled = useState<boolean>('cp-scenes', () => true)
  const loaded = useState<boolean>('cp-scenes-loaded', () => false)

  function load() {
    if (loaded.value || typeof window === 'undefined') return
    try {
      const v = window.localStorage.getItem(STORAGE_KEY)
      if (v === 'off') enabled.value = false
      else if (v === 'on') enabled.value = true
    } catch {
      /* storage unavailable: keep default */
    }
    loaded.value = true
  }

  function set(value: boolean) {
    enabled.value = value
    loaded.value = true
    try {
      window.localStorage.setItem(STORAGE_KEY, value ? 'on' : 'off')
    } catch {
      /* ignore */
    }
  }

  onMounted(load)

  return { enabled, loaded, load, set, toggle: () => set(!enabled.value) }
}

/** Monotonic counter; the layout's Replay button bumps it, the reader watches it. */
export function useSceneReplay() {
  return useState<number>('cp-scene-replay', () => 0)
}
