# Commonplace scene kit

Short (~3.5 s) intro scenes that play over a work's page in the Commonplace reader.
Flat-vector, Crash-Course-ish: bold shapes, limited palette, confident eased motion.
**Compose scenes only from the pieces below.** Preview: `/commonplace/_scenes?id=<scene-id>`
(`&t=1.4` pauses at a time, `&t=99` shows the final frame, `&dark=1`, `?id=kit` shows every primitive).

## Adding a scene

1. Copy `../SceneBeowulf.vue` to `../SceneMyWork.vue` (props: `period`, `title`, `initial`).
2. Inside `<SceneStage :build="build">` draw a `<Backdrop>`, then figures/props, each with a `part="…"` name.
3. Write `build(api)` – add tweens to `api.tl` at explicit times (see recipe below).
4. Register it in `../index.ts`: `'my-work': () => import('./SceneMyWork.vue').then((m) => m.default)`
   (key = the entry's `scene` id). The title card is appended automatically.

## Stage & coordinates

- Stage is `viewBox 0 0 1600 900`. Floor lines are listed in `Backdrop.vue`'s header (most ≈ 720–840).
- The title card covers roughly **y 630–870** at the end: keep the key final image above y ≈ 600.
- Every primitive takes **placement props**: `x`, `y` (the anchor), `scale`, `flip` (mirror), `rotate`, `part`.
- Tween a primitive by its part: `p('beowulf')`. Nested parts: `p('beowulf', 'arm-r')`.
- `x` / `y` in tweens are **absolute stage positions** of the anchor; use `'+=120'` for relative moves.
- `rotation` / `scale` always pivot at the anchor (or at the shoulder/neck/feet for figure parts).

## Colors (never write literal colors)

Color props take a **role name**; it renders as `var(--scene-<role>)` (defined in `scene-tokens.css`,
with a night version under `html.darkmode`). In custom shapes use `:fill="c('gold')"`.

| group       | roles                                                                                                                                                                        |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sky & light | `sky` `sky-2` `night` `night-2` `moon` `star` `sun` `glow` `glow-2`                                                                                                          |
| landscape   | `far` `mid` `near` `ground` `water` `water-2` `foam`                                                                                                                         |
| materials   | `wood` `wood-2` `wood-3` `stone` `stone-2` `stone-3` `metal` `metal-2` `gold` `gold-2`                                                                                       |
| people      | `ink` (outlines, eyes, silhouettes) `skin` `skin-2` `hair` `cloth-a` (red) `cloth-b` (blue) `cloth-c` (linen) `cloth-d` (purple) `green` `green-2` `red` `highlight` (white) |
| paper       | `paper` `paper-2` `paper-ink` `text`                                                                                                                                         |
| period      | `period` (the current work's tint: OE deep red, ME lapis, EM verdigris, Restoration ochre)                                                                                   |

## Primitives

All import from `./kit`: `import { SceneStage, Backdrop, Figure, Sword, c, type SceneApi } from './kit'`.

### `SceneStage`

`build` (callback), `caption` (default true), `captionAt` (s; default = end of your beats),
`captionInitial` (illuminated-initial box, default true), `captionDim` (0–1, default 0.25).

### `Backdrop` — full-stage background, put it first

`variant`: `mead-hall` · `castle-hall` · `night-sky` · `hills` · `sea` · `forest` · `chapel` · `study` · `garden` · `parchment`.
**`time`**: `'auto'` (default) · `'day'` · `'night'` — which sky the backdrop (and the windows / doorway / chapel glass in it) shows.
`'auto'` draws **both** a sunny day and a moonlit night version and CSS shows one: day in light mode, night under
`html.darkmode` (see "Time of day" below). `'day'` / `'night'` pin it for stories that need a specific hour
(`night` is the old boolean, kept as an alias for `time="night"`; `night-sky` is always night).
`celestial` `[x, y]` moves the sun/moon (default `[1250, 185]`; move it when a tree/portal would hide it).
`doorOpen` (mead-hall), `showWindow={false}` (study: omit its window when the scene draws a bigger one).
Slot `#doorway` (mead-hall: drawn inside the doorway, clipped). Parts: `sky` `sun` `moon` `stars` `clouds` `waves-1..4` `trees`
`fire` `glow` `door` (scaleX → 0.1 opens it) `moonlight` (opacity 0 → 1) `banner` `rays` `flame` `window`.
Both skies exist in the DOM in auto mode, so a tween on `sun`/`moon`/`stars` simply acts on the one that is shown.

### Time of day (sun by day, moon by night)

Pure CSS, no JS: `scene-tokens.css` hides `.cp-night` in light mode and `.cp-day` under `html.darkmode`.

- Put `class="cp-day"` / `class="cp-night"` on any `<g>` to draw a day-only / night-only variant (a window view, a lit
  window, a lantern's glow, an aurora). Draw both versions of a sky you paint yourself.
- `<Celestial :x :y :scale time="auto|day|night" />` (kit/props) is the sun in light mode / the moon in dark mode, same spot.
- Pin the hour when the story needs it (`time="night"` for Beowulf, Dream of the Rood, Cædmon…), otherwise leave `auto`.

### `Figure` — a person (~320 tall at scale 1, anchor between the feet)

- `body`: `robe` | `tunic` (shows `legs`). Colors: `skin` `skin2` (neck; set it when recolouring skin) `robe` `sleeve` `trim` `legs` `hairColor` `beardColor` `hatColor` `wingColor` `ornament` (gold-work down the front + cuffs).
- `hair`: `short` | `long` | `bald` · `beard`: `true` | `'long'` · `hat`: `none` `crown` `helmet` `hood` `wimple` `hat` `cap`
- `cape` / `belt`: `true` or a role · `wings` · `arms` (default true)
- `armL` / `armR`: static degrees. **arm-r: negative raises** (-90 straight out, -180 overhead);
  **arm-l: positive raises**. `tilt` (head), `lean` (body), `look` (-1…1 eyes), `mood`: `neutral` `happy` `stern` `alarmed` `sad`, `eyes`: `open` | `closed`
- **Changing expression mid-scene**: add `mood-to="sad"` (any mood) next to `mood="happy"`. The figure then draws a
  second brows+mouth layer as the hidden part `face-alt` (opacity 0) beside the normal `face` layer. For a sequence pass
  an array, `:mood-to="['alarmed', 'happy']"`, which adds `face-alt` and `face-alt-2`. Crossfade them:
  `tl.to(p('poet','face'), { opacity: 0, duration: 0.15 }, t); tl.to(p('poet','face-alt'), { opacity: 1, duration: 0.15 }, t)`.
  (The `eyes` part still blinks / looks; `face` / `face-alt` are only brows + mouth.) Without `mood-to`, nothing changes.
- `silhouette`: all ink with glowing eyes.
- Slots `#hand-l` / `#hand-r`: drawn at the hand; props are upright (toward -y) with the arm hanging.
  With the arm raised overhead, give the prop `:rotate="180"` so it extends along the arm.
- Parts: `pose` (feet pivot: lean/bow/lie down/hop), `head` (neck pivot; can fly off), `eyes`, `face` / `face-alt` (see above), `arm-l`, `arm-r`, `cape`, `wing-l`, `wing-r`.

### `Monster` — hulking creature (~400 tall, faces right, silhouette by default)

`color` (ink), `eyes` (glow), `talon`, `armL`, `armR`, `rim` (rim-light outline role, e.g. `night-2`).
Parts: `pose` `head` `eyes` `jaw` `arm-l` `arm-r`.

### Props (`kit/props/`)

| prop        | anchor                                   | key props                                                                                           | parts                                                    |
| ----------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `Sword`     | grip                                     | `blade` `hilt`                                                                                      | `glint`                                                  |
| `Axe`       | grip (low on haft), blade up, edge right | `haft` `blade`                                                                                      | —                                                        |
| `Book`      | bottom centre                            | `cover`, `open`                                                                                     | `pages`                                                  |
| `Rood`      | foot of cross (~420 tall)                | `color`, `glow` (rays + gems)                                                                       | `rays` `gems`                                            |
| `Tree`      | base                                     | `kind` `round`/`pine`/`bare`/`apple`, `leaves` `trunk` `fruit`                                      | `canopy` `apples`                                        |
| `Cat`       | bottom centre, faces right               | `color` `eye`                                                                                       | `head` `eyes` `tail`                                     |
| `Mouse`     | bottom centre, faces right               | `color`                                                                                             | `tail`                                                   |
| `Rooster`   | feet, faces right                        | `color`                                                                                             | `head` `tail`                                            |
| `Ship`      | waterline centre, faces right            | `hull` `sail` `stripe`                                                                              | `hull` `sail`                                            |
| `Candle`    | base                                     | `h` `wax` `holder`                                                                                  | `flame` `halo`                                           |
| `Celestial` | centre of the disc                       | `time` `auto`/`day`/`night` (sun ⇄ moon, CSS-swapped)                                               | `sun` `moon`                                             |
| `Fire`      | base                                     | `logs`                                                                                              | `flame` `glow`                                           |
| `Scroll`    | top roller                               | `width` `length` `paper` `roller` `sonnet` (14 lines: 3 quatrains + indented couplet; length ≈ 404) | `paper` (scaleY to unroll) `roller-b` `lines`            |
| `Quill`     | nib tip                                  | `color`                                                                                             | —                                                        |
| `Apple`     | centre                                   | `color` `leaf` `bitten`                                                                             | —                                                        |
| `Serpent`   | tail end, head right                     | `color` `pattern`                                                                                   | `body` `head` `tongue`                                   |
| `Ring`      | centre                                   | `color` `gem`                                                                                       | `glint`                                                  |
| `Shield`    | centre                                   | `shape` `round`/`heater`, `color`, `emblem` `boss`/`pentangle`/`cross`/`none`, `mark`               | —                                                        |
| `Claw`      | wrist, talons right                      | `color` `talon` `arm` (forearm length, trails left)                                                 | `fingers`                                                |
| `Horse`     | ground under body, faces right           | `coat` `mane` `saddle` `braid` (gold thread in mane + tail tie)                                     | `body` `head` `tail` `leg-fl` `leg-fr` `leg-bl` `leg-br` |
| `Table`     | floor centre (top at y -130)             | `width` `cloth` (role or false) `top` `items`                                                       | —                                                        |
| `Goblet`    | base                                     | `color`                                                                                             | —                                                        |
| `Burst`     | centre                                   | `color`                                                                                             | — (`pop` it, then fade)                                  |
| `KitPlace`  | —                                        | plain group with placement props (`part`, `x`, `y`…) — group a rider + horse, etc.                  | —                                                        |

## Timeline API (`build(api)`)

`api.tl` is a paused GSAP timeline; always pass an explicit time. Helpers (all return `tl`):

- `establish()` — slight camera push-in at the start (call it first).
- `enter(sel, at, { from: 'left'|'right'|'up'|'down'|'fade', distance, dur })`, `exit(sel, at, dur)`, `pop(sel, at)`
- `turn(sel, at, rotation, dur, ease)` — rotate a pivot part to an absolute angle.
- `blink(figurePart, at)`, `shake(at, strength)`, `zoom(at, scale, dur, focus?)`
- `draw(sel, at, dur)` — stroke drawing; give the path `pathLength="1"` (for `<text>` pass a length, e.g. 2000).
- Ambient loops — **omit `dur` and they run to the end and never delay the title card**:
  `flicker(sel, at)` (flames), `bob(sel, at, dur?, amount, period)`, `sway(sel, at, dur?, degrees, period)`.
- Raw GSAP is fine too: `tl.to(p('door'), { scaleX: 0.1, duration: 0.3, ease: 'power4.out' }, 0.6)`.
  Initial states: `tl.set(sel, {...}, 0)` or `tl.from(...)`. **Never use `repeat: -1`.**

## Recipe (≈ 3.5 s)

| beat       | time       | what                                                                                                                                                          |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| establish  | 0 – 0.6    | `establish()`, ambient loops start, small set-up motion (a blink, a sway)                                                                                     |
| action     | 0.6 – 2.6  | 2–3 staged moves telling the one memorable moment. Overlap them slightly; use `back.out` for arrivals, `power4.in` for strikes, a `shake` + `Burst` on impact |
| title card | ~2.6 – 3.5 | automatic (starts when your last non-ambient tween ends)                                                                                                      |

Tips: one idea per scene; big readable silhouettes; let figures _anticipate_ (wind up before a swing);
end on a strong final pose above the title card — reduced-motion users see only that frame.
