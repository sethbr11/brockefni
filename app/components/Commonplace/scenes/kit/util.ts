/**
 * Shared helpers for kit primitives.
 *
 * Color roles: every color prop takes a ROLE NAME (e.g. 'cloth-a', 'gold', 'green'), never a
 * literal color. `c('gold')` → 'var(--scene-gold)'. Roles are defined in scene-tokens.css.
 */
export type ColorRole =
  | 'sky'
  | 'sky-2'
  | 'night'
  | 'night-2'
  | 'moon'
  | 'star'
  | 'sun'
  | 'glow'
  | 'glow-2'
  | 'far'
  | 'mid'
  | 'near'
  | 'ground'
  | 'water'
  | 'water-2'
  | 'foam'
  | 'wood'
  | 'wood-2'
  | 'wood-3'
  | 'stone'
  | 'stone-2'
  | 'stone-3'
  | 'metal'
  | 'metal-2'
  | 'gold'
  | 'gold-2'
  | 'ink'
  | 'skin'
  | 'skin-2'
  | 'hair'
  | 'cloth-a'
  | 'cloth-b'
  | 'cloth-c'
  | 'cloth-d'
  | 'green'
  | 'green-2'
  | 'red'
  | 'highlight'
  | 'paper'
  | 'paper-2'
  | 'paper-ink'
  | 'text'
  | 'period'

export const c = (role: string | undefined, fallback: ColorRole = 'ink') =>
  `var(--scene-${role || fallback})`

/** Placement props shared by every kit primitive. */
export interface Placement {
  /** anchor position in stage units (stage is 1600×900) */
  x?: number
  y?: number
  scale?: number
  /** mirror horizontally (primitives face right by default unless noted) */
  flip?: boolean
  /** static rotation in degrees */
  rotate?: number
  /** data-part name so the scene timeline can target it */
  part?: string
}

/** Props for <KitPlace> from a primitive's props. */
export function place(p: Placement) {
  return {
    x: p.x,
    y: p.y,
    scale: p.scale,
    flip: p.flip,
    rotate: p.rotate,
    part: p.part,
  }
}

/** Tiny deterministic PRNG (mulberry32) so generated shapes are stable per seed. */
export function rng(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function hashString(s: string) {
  let h = 2166136261
  for (let i = 0; i < s.length; i++)
    h = Math.imul(h ^ s.charCodeAt(i), 16777619)
  return h >>> 0
}
