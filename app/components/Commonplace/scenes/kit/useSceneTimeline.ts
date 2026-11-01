import {
  inject,
  onMounted,
  onUnmounted,
  shallowRef,
  type InjectionKey,
  type Ref,
} from 'vue'
import { gsap } from 'gsap'
import type { PeriodId } from '@/assets/data/commonplaceData'

/* ------------------------------------------------------------------------------------------
 * Overlay <-> stage wiring
 * ---------------------------------------------------------------------------------------- */

/** Provided by SceneOverlay; SceneStage registers its timeline here. */
export interface SceneController {
  title: string
  initial: string
  period: PeriodId
  register(tl: gsap.core.Timeline): void
}
export const SCENE_CONTROLLER: InjectionKey<SceneController> = Symbol(
  'cp-scene-controller'
)

/** Optional, for the preview page only: pause at a time and/or never auto-dismiss. */
export interface SceneDebug {
  seek?: number | null
  hold?: boolean
}
export const SCENE_DEBUG: InjectionKey<SceneDebug> = Symbol('cp-scene-debug')

/* ------------------------------------------------------------------------------------------
 * Scene API handed to a scene's build() callback
 * ---------------------------------------------------------------------------------------- */

type Target = string | Element | Element[] | null
type Pos = number | string

export interface SceneApi {
  /** the paused master timeline; add tweens with explicit positions (seconds) */
  tl: gsap.core.Timeline
  gsap: typeof gsap
  root: SVGSVGElement
  /** selector for a (nested) part: p('beowulf', 'arm-r') → '[data-part="beowulf"] [data-part="arm-r"]' */
  p: (...parts: string[]) => string

  /* ---- beats (each returns the timeline so calls can chain) ---- */
  /** soft opening: camera eases in from a slight zoom (0 → ~1.1s). The curtain lifts automatically. */
  establish: (dur?: number) => gsap.core.Timeline
  /** fade/slide something in. from: 'left'|'right'|'up'|'down' (distance px) or 'fade' */
  enter: (
    t: Target,
    at: Pos,
    opts?: {
      from?: 'left' | 'right' | 'up' | 'down' | 'fade'
      distance?: number
      dur?: number
      ease?: string
    }
  ) => gsap.core.Timeline
  /** fade something out */
  exit: (t: Target, at: Pos, dur?: number) => gsap.core.Timeline
  /** pop in from scale 0 with a springy overshoot */
  pop: (t: Target, at: Pos, dur?: number) => gsap.core.Timeline
  /** blink a figure's eyes: blink('beowulf', 1.2) */
  blink: (figurePart: string, at: Pos) => gsap.core.Timeline
  /** camera shake (impacts, door bangs) */
  shake: (at: Pos, strength?: number, dur?: number) => gsap.core.Timeline
  /** camera push-in / pull-out to `scale` around the stage centre (or a focus point) */
  zoom: (
    at: Pos,
    scale: number,
    dur?: number,
    focus?: { x: number; y: number }
  ) => gsap.core.Timeline
  /** draw strokes: paths need pathLength="1" (or pass length for <text>/<rect>) */
  draw: (
    t: Target,
    at: Pos,
    dur?: number,
    length?: number
  ) => gsap.core.Timeline
  /**
   * Ambient loops. Omit `dur` to loop until the end of the whole scene (they're trimmed to
   * finish with the caption and never delay it). Never use repeat:-1 yourself.
   */
  /** flame / glow flicker from `at` (for `dur` seconds, or to the end) */
  flicker: (t: Target, at: Pos, dur?: number) => gsap.core.Timeline
  /** gentle up/down bob (breathing, riding, floating) from `at` (for `dur`, or to the end) */
  bob: (
    t: Target,
    at: Pos,
    dur?: number,
    amount?: number,
    period?: number
  ) => gsap.core.Timeline
  /** gentle back-and-forth rotation (banners, branches, tails) from `at` (for `dur`, or to the end) */
  sway: (
    t: Target,
    at: Pos,
    dur?: number,
    degrees?: number,
    period?: number
  ) => gsap.core.Timeline
  /** rotate a pivot part (arm/head/pose/leg) to an absolute angle */
  turn: (
    t: Target,
    at: Pos,
    rotation: number,
    dur?: number,
    ease?: string
  ) => gsap.core.Timeline
}

export type SceneBuild = (api: SceneApi) => void

const sel = (...parts: string[]) =>
  parts.map((n) => `[data-part="${n}"]`).join(' ')

/**
 * Every element marked data-pivot pivots around its own local origin (0,0) — the anchor of a
 * kit primitive, a figure's shoulder/neck/feet, etc. GSAP's transformOrigin for SVG is
 * relative to the element's local bbox, so offset by the bbox corner. (svgOrigin looks like
 * the obvious tool but gets clobbered when from() tweens revert on translated elements.)
 */
function initPivots(root: SVGSVGElement) {
  root.querySelectorAll<SVGGraphicsElement>('[data-pivot]').forEach((el) => {
    let b = { x: 0, y: 0 }
    try {
      b = el.getBBox()
    } catch {
      /* not rendered */
    }
    gsap.set(el, { transformOrigin: `${-b.x}px ${-b.y}px` })
  })
}

interface Ambient {
  tween: gsap.core.Tween
  step: number
}

function makeApi(
  tl: gsap.core.Timeline,
  root: SVGSVGElement,
  ambient: Ambient[]
): SceneApi {
  const q = (t: Target) =>
    typeof t === 'string' ? root.querySelectorAll(t) : t
  const has = (t: Target) => {
    const r = q(t)
    if (!r) return false
    return r instanceof Element ? true : (r as ArrayLike<Element>).length > 0
  }
  const camera = sel('camera')

  const api: SceneApi = {
    tl,
    gsap,
    root,
    p: sel,
    establish(dur = 1.1) {
      return tl.from(
        camera,
        { scale: 1.07, duration: dur, ease: 'power2.out' },
        0
      )
    },
    enter(t, at, o = {}) {
      if (!has(t)) return tl
      const d = o.distance ?? 260
      const from = o.from ?? 'fade'
      const vars: gsap.TweenVars = {
        opacity: 0,
        duration: o.dur ?? 0.5,
        ease: o.ease ?? 'power3.out',
      }
      if (from === 'left') vars.x = `-=${d}`
      if (from === 'right') vars.x = `+=${d}`
      if (from === 'up') vars.y = `-=${d}`
      if (from === 'down') vars.y = `+=${d}`
      return tl.from(q(t), vars, at)
    },
    exit(t, at, dur = 0.3) {
      if (!has(t)) return tl
      return tl.to(q(t), { opacity: 0, duration: dur, ease: 'power1.in' }, at)
    },
    pop(t, at, dur = 0.45) {
      if (!has(t)) return tl
      return tl.from(
        q(t),
        { scale: 0, opacity: 0, duration: dur, ease: 'back.out(2.2)' },
        at
      )
    },
    blink(fig, at) {
      const eyes = sel(fig, 'eyes')
      if (!has(eyes)) return tl
      return tl.to(
        eyes,
        {
          scaleY: 0.1,
          duration: 0.07,
          yoyo: true,
          repeat: 1,
          ease: 'power1.inOut',
        },
        at
      )
    },
    shake(at, strength = 12, dur = 0.35) {
      const n = Math.max(3, Math.round(dur / 0.045))
      const off = Array.from({ length: n }, (_, i) => {
        const k = 1 - i / n
        return [
          (i % 2 ? -1 : 1) * strength * k,
          (i % 3 ? 1 : -1) * strength * 0.5 * k,
        ]
      })
      off.push([0, 0])
      // relative deltas that sum to zero, so the camera ends exactly where it started
      const kf = off.map(([x, y], i) => {
        const [px, py] = i ? off[i - 1]! : [0, 0]
        return {
          x: `+=${x! - px!}`,
          y: `+=${y! - py!}`,
          duration: dur / off.length,
        }
      })
      return tl.to(camera, { keyframes: kf, ease: 'none' }, at)
    },
    zoom(at, scale, dur = 0.8, focus) {
      const vars: gsap.TweenVars = {
        scale,
        duration: dur,
        ease: 'power2.inOut',
      }
      if (focus) {
        vars.x = 800 - (focus.x - 800) * (scale - 1)
        vars.y = 450 - (focus.y - 450) * (scale - 1)
      }
      return tl.to(camera, vars, at)
    },
    draw(t, at, dur = 0.6, length = 1) {
      if (!has(t)) return tl
      tl.set(q(t), { strokeDasharray: length, strokeDashoffset: length }, 0)
      return tl.to(
        q(t),
        { strokeDashoffset: 0, duration: dur, ease: 'power1.inOut' },
        at
      )
    },
    flicker(t, at, dur) {
      if (!has(t)) return tl
      const step = 0.11
      const tween = gsap.to(q(t), {
        scaleY: 1.1,
        scaleX: 0.95,
        duration: step,
        yoyo: true,
        repeat: Math.max(1, Math.floor((dur ?? 60) / step)),
        ease: 'sine.inOut',
      })
      if (dur === undefined) ambient.push({ tween, step })
      return tl.add(tween, at)
    },
    bob(t, at, dur, amount = 8, period = 0.3) {
      if (!has(t)) return tl
      const step = period / 2
      const tween = gsap.to(q(t), {
        y: `-=${amount}`,
        duration: step,
        yoyo: true,
        repeat: Math.max(1, Math.round((dur ?? 60) / step) - 1) | 1,
        ease: 'sine.inOut',
      })
      if (dur === undefined) ambient.push({ tween, step })
      return tl.add(tween, at)
    },
    sway(t, at, dur, degrees = 3, period = 1.2) {
      if (!has(t)) return tl
      const step = period / 2
      const tween = gsap.fromTo(
        q(t),
        { rotation: -degrees / 2 },
        {
          rotation: degrees / 2,
          duration: step,
          yoyo: true,
          repeat: Math.max(1, Math.round((dur ?? 60) / step) - 1) | 1,
          ease: 'sine.inOut',
        }
      )
      if (dur === undefined) ambient.push({ tween, step })
      return tl.add(tween, at)
    },
    turn(t, at, rotation, dur = 0.35, ease = 'power2.inOut') {
      if (!has(t)) return tl
      return tl.to(q(t), { rotation, duration: dur, ease }, at)
    },
  }
  return api
}

/* ------------------------------------------------------------------------------------------
 * Caption beat (the closing title card rendered by SceneStage/SceneCaption)
 * ---------------------------------------------------------------------------------------- */

export const CAPTION_LENGTH = 0.95

export function addCaption(
  tl: gsap.core.Timeline,
  root: SVGSVGElement,
  at: number,
  dim = 0.25
) {
  const s = (n: string) => root.querySelectorAll(sel(n))
  tl.to(s('dim'), { opacity: dim, duration: 0.45, ease: 'power1.out' }, at)
  tl.from(
    s('caption'),
    { y: '+=260', opacity: 0, duration: 0.55, ease: 'back.out(1.3)' },
    at
  )
  tl.from(
    s('caption-initial'),
    { scale: 0, rotation: -14, duration: 0.5, ease: 'back.out(2)' },
    at + 0.12
  )
  const letter = s('caption-letter')
  tl.set(
    letter,
    { strokeDasharray: 900, strokeDashoffset: 900, fillOpacity: 0 },
    0
  )
  tl.to(
    letter,
    { strokeDashoffset: 0, duration: 0.45, ease: 'power1.inOut' },
    at + 0.22
  )
  tl.to(letter, { fillOpacity: 1, duration: 0.25 }, at + 0.5)
  tl.from(
    s('caption-flourish'),
    {
      scale: 0,
      opacity: 0,
      duration: 0.35,
      stagger: 0.05,
      ease: 'back.out(2.5)',
    },
    at + 0.45
  )
  tl.from(
    s('caption-label'),
    { opacity: 0, x: '-=24', duration: 0.4, ease: 'power2.out' },
    at + 0.3
  )
  tl.from(
    s('caption-wipe'),
    { scaleX: 0, duration: 0.6, ease: 'power2.inOut' },
    at + 0.32
  )
  tl.from(
    s('caption-rule'),
    { scaleX: 0, duration: 0.5, ease: 'power2.out' },
    at + 0.5
  )
  return tl
}

/* ------------------------------------------------------------------------------------------
 * Composable used by SceneStage
 * ---------------------------------------------------------------------------------------- */

export interface UseSceneTimelineOptions {
  caption?: boolean
  /** caption start time; default = end of the scene's own beats */
  captionAt?: number
  /** scene darkening behind the caption (0–1) */
  captionDim?: number
}

export function useSceneTimeline(
  svgRef: Ref<SVGSVGElement | null>,
  build: SceneBuild | undefined,
  opts: UseSceneTimelineOptions = {}
) {
  const controller = inject(SCENE_CONTROLLER, null)
  const timeline = shallowRef<gsap.core.Timeline | null>(null)
  let ctx: gsap.Context | null = null

  onMounted(() => {
    const svg = svgRef.value
    if (!svg) return
    let tl!: gsap.core.Timeline
    ctx = gsap.context(() => {
      initPivots(svg)
      tl = gsap.timeline({
        paused: true,
        defaults: { ease: 'power2.out', duration: 0.5 },
      })
      const ambient: Ambient[] = []
      tl.to(
        svg.querySelectorAll(sel('curtain')),
        { opacity: 0, duration: 0.35, ease: 'power1.out' },
        0
      )
      build?.(makeApi(tl, svg, ambient))
      // the scene's "real" length ignores open-ended ambient loops
      const loops = new Set(ambient.map((a) => a.tween))
      let end = 0.3
      tl.getChildren(false, true, true).forEach((ch) => {
        if (!loops.has(ch as gsap.core.Tween)) end = Math.max(end, ch.endTime())
      })
      const at = opts.captionAt ?? end
      if (opts.caption !== false) addCaption(tl, svg, at, opts.captionDim)
      const finish = opts.caption !== false ? at + CAPTION_LENGTH : end
      ambient.forEach(({ tween, step }) => {
        const n = Math.max(
          1,
          Math.floor((finish - tween.startTime()) / step) - 1
        )
        tween.repeat(n % 2 ? n : n + 1)
      })
    }, svg)
    timeline.value = tl
    if (controller) controller.register(tl)
    else tl.play(0)
  })

  onUnmounted(() => {
    ctx?.revert()
    ctx = null
  })

  return {
    timeline,
    /** jump to the final frame (skip / reduced motion) */
    finish: () => timeline.value?.progress(1),
  }
}
