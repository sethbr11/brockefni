import type { Component } from 'vue'

/**
 * Intro scenes, keyed by scene id (== entry id, e.g. 'beowulf'). Each loader is lazy so only
 * the scene that plays gets downloaded. Entries without a key here use FallbackScene.
 * To add a scene: create SceneXxx.vue in this folder and add one line below.
 */
export const sceneRegistry: Record<string, () => Promise<Component>> = {
  // Old & Middle English
  'caedmons-hymn': () => import('./SceneCaedmon.vue').then((m) => m.default),
  'dream-of-the-rood': () =>
    import('./SceneDreamOfTheRood.vue').then((m) => m.default),
  beowulf: () => import('./SceneBeowulf.vue').then((m) => m.default),
  bisclavret: () => import('./SceneBisclavret.vue').then((m) => m.default),
  lanval: () => import('./SceneLanval.vue').then((m) => m.default),
  'pangur-ban': () => import('./ScenePangurBan.vue').then((m) => m.default),
  'sir-gawain': () => import('./SceneSirGawain.vue').then((m) => m.default),
  'sumer-is-icumen-in': () => import('./SceneSumer.vue').then((m) => m.default),
  'wife-of-bath': () => import('./SceneWifeOfBath.vue').then((m) => m.default),
  'nuns-priests-tale': () =>
    import('./SceneNunsPriest.vue').then((m) => m.default),
  'julian-of-norwich': () => import('./SceneJulian.vue').then((m) => m.default),
}

export const loadFallbackScene = (): Promise<Component> =>
  import('./FallbackScene.vue').then((m) => m.default)

/** Loader for a scene id; unknown/missing ids (or a failed load) resolve to the fallback. */
export function sceneLoader(id?: string): () => Promise<Component> {
  const load = id ? sceneRegistry[id] : undefined
  if (!load) return loadFallbackScene
  return () => load().catch(loadFallbackScene)
}
