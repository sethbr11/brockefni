import type { Component } from 'vue'

/**
 * Intro scenes, keyed by scene id (== entry id, e.g. 'beowulf'). Each loader is lazy so only
 * the scene that plays gets downloaded. Entries without a key here use FallbackScene.
 * To add a scene: create SceneXxx.vue in this folder and add one line below.
 */
export const sceneRegistry: Record<string, () => Promise<Component>> = {}

export const loadFallbackScene = (): Promise<Component> =>
  import('./FallbackScene.vue').then((m) => m.default)

/** Loader for a scene id; unknown/missing ids (or a failed load) resolve to the fallback. */
export function sceneLoader(id?: string): () => Promise<Component> {
  const load = id ? sceneRegistry[id] : undefined
  if (!load) return loadFallbackScene
  return () => load().catch(loadFallbackScene)
}
