/**
 * Rig for the articulated cat (`<Cat pose="rig">`): a pure pose solver plus a timeline helper.
 *
 * Everything is in the cat's own units (scale 1, facing right, ground at y = 0). The torso is
 * placed by (bx, by, rot, sx, sy); each leg is a two-bone limb whose paw is pinned to a target
 * (ffx/ffy … bnx/bny) by inverse kinematics, so planted paws never float or slide. `air` blends
 * every paw from its target to a flight pose that follows the body (`reach` −1 tucked … 1 stretched).
 *
 *   const cat = catRig(api, 'cat')                         // poses the parts immediately
 *   cat.to({ bx: 60, duration: 0.8, ease: 'none' }, 0.3)   // tween any state key on api.tl
 */
import type { gsap } from 'gsap'
import type { SceneApi } from '../useSceneTimeline'

export type CatLegId = 'ff' | 'fn' | 'bf' | 'bn'

/** leg attach points in torso space + bone lengths. f = front, b = back; f/n = far/near side */
export const CAT_LEGS: Record<
  CatLegId,
  { ax: number; ay: number; a: number; b: number; front: boolean }
> = {
  ff: { ax: 32, ay: 10, a: 32, b: 34, front: true },
  fn: { ax: 46, ay: 12, a: 32, b: 34, front: true },
  bf: { ax: -56, ay: 8, a: 34, b: 34, front: false },
  bn: { ax: -42, ay: 12, a: 34, b: 34, front: false },
}
export const CAT_LEG_IDS = Object.keys(CAT_LEGS) as CatLegId[]

export interface CatPose {
  /** torso centre */
  bx: number
  by: number
  /** torso rotation (deg, + = nose down) and squash / stretch */
  rot: number
  sx: number
  sy: number
  /** 0 = paws on their targets, 1 = flight pose */
  air: number
  /** flight pose: −1 tucked … 1 stretched */
  reach: number
  ffx: number
  ffy: number
  fnx: number
  fny: number
  bfx: number
  bfy: number
  bnx: number
  bny: number
}

/** standing, all four paws under the body */
export const CAT_STAND: CatPose = {
  bx: 0,
  by: -76,
  rot: 0,
  sx: 1,
  sy: 1,
  air: 0,
  reach: 0,
  ffx: 36,
  ffy: 0,
  fnx: 50,
  fny: 0,
  bfx: -54,
  bfy: 0,
  bnx: -40,
  bny: 0,
}

const D = 180 / Math.PI
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const rotPt = (x: number, y: number, deg: number) => {
  const r = deg / D
  return {
    x: x * Math.cos(r) - y * Math.sin(r),
    y: x * Math.sin(r) + y * Math.cos(r),
  }
}

export interface CatTransforms {
  torso: string
  shadow: string
  legs: Record<CatLegId, { root: string; lo: string; paw: string }>
}

/** Solve a pose → SVG transform strings for every rigged part. */
export function solveCat(s: CatPose): CatTransforms {
  const legs = {} as CatTransforms['legs']
  for (const id of CAT_LEG_IDS) {
    const L = CAT_LEGS[id]
    const o = rotPt(L.ax * s.sx, L.ay * s.sy, s.rot)
    const P = { x: s.bx + o.x, y: s.by + o.y }
    // flight pose, relative to the attach point in torso space
    const k = (s.reach + 1) / 2
    const rel = L.front
      ? rotPt(lerp(4, 48, k), lerp(46, 40, k), s.rot)
      : rotPt(lerp(-2, -56, k), lerp(46, 34, k), s.rot)
    const tx = (s as unknown as Record<string, number>)[`${id}x`]!
    const ty = (s as unknown as Record<string, number>)[`${id}y`]!
    const F = {
      x: lerp(tx, P.x + rel.x, s.air),
      y: lerp(ty, P.y + rel.y, s.air),
    }
    // two-bone IK, knee/elbow pointing backwards (−x)
    const dx = F.x - P.x
    const dy = F.y - P.y
    const d = Math.min(
      Math.max(Math.hypot(dx, dy), Math.abs(L.a - L.b) + 0.5),
      L.a + L.b - 0.01
    )
    const phi = Math.atan2(dy, dx)
    const alpha = Math.acos((L.a * L.a + d * d - L.b * L.b) / (2 * L.a * d))
    const t1 = phi + alpha
    const K = { x: P.x + L.a * Math.cos(t1), y: P.y + L.a * Math.sin(t1) }
    const t2 = Math.atan2(F.y - K.y, F.x - K.x)
    const r1 = t1 * D - 90
    const r2 = (t2 - t1) * D
    // planted: paw flat on the ground; in flight: paw follows the shin with a slight curl
    const pawFlat = -(r1 + r2)
    const paw = lerp(pawFlat, L.front ? -20 : 25, s.air)
    legs[id] = {
      root: `translate(${P.x.toFixed(2)} ${P.y.toFixed(2)}) rotate(${r1.toFixed(2)})`,
      lo: `translate(0 ${L.a}) rotate(${r2.toFixed(2)})`,
      paw: `translate(0 ${L.b}) rotate(${paw.toFixed(2)})`,
    }
  }
  // contact shadow shrinks as the body leaves the ground
  const lift = Math.max(0, -s.by - 76)
  const k = Math.max(0.35, 1 - lift / 220)
  return {
    torso: `translate(${s.bx.toFixed(2)} ${s.by.toFixed(2)}) rotate(${s.rot.toFixed(2)}) scale(${s.sx.toFixed(3)} ${s.sy.toFixed(3)})`,
    shadow: `translate(${s.bx.toFixed(2)} 0) scale(${k.toFixed(3)} 1)`,
    legs,
  }
}

/** Bind the rig to a `<Cat pose="rig" part="…">` and add tweens of its pose to the timeline. */
export function catRig(
  api: SceneApi,
  part: string,
  init: Partial<CatPose> = {}
) {
  const q = (n: string) => api.root.querySelector(api.p(part, n))
  const torso = q('torso')
  const shadow = q('shadow')
  const legEls = CAT_LEG_IDS.map((id) => ({
    id,
    root: q(`leg-${id}`),
    lo: q(`leg-${id}-lo`),
    paw: q(`leg-${id}-paw`),
  }))

  const raw: CatPose = { ...CAT_STAND, ...init }
  const apply = () => {
    const t = solveCat(raw)
    torso?.setAttribute('transform', t.torso)
    shadow?.setAttribute('transform', t.shadow)
    for (const l of legEls) {
      l.root?.setAttribute('transform', t.legs[l.id].root)
      l.lo?.setAttribute('transform', t.legs[l.id].lo)
      l.paw?.setAttribute('transform', t.legs[l.id].paw)
    }
  }
  // GSAP writes the pose keys; re-solve once per batch of writes (seeks suppress onUpdate,
  // so a setter is the only hook that also fires when the preview scrubs the timeline)
  let queued = false
  const state = new Proxy(raw, {
    set(target, key, value) {
      ;(target as unknown as Record<string | symbol, unknown>)[key] = value
      if (!queued) {
        queued = true
        queueMicrotask(() => {
          queued = false
          apply()
        })
      }
      return true
    },
  })
  apply()

  return {
    state,
    apply,
    /** tween pose keys (plus duration / ease / keyframes) at a time on the scene timeline */
    to: (vars: gsap.TweenVars, at: number) => api.tl.to(state, vars, at),
    set: (vars: gsap.TweenVars, at: number) => api.tl.set(state, vars, at),
  }
}
