<!--
  Doctor Faustus — by candlelight Faustus conjures: a magic circle draws itself on the floor,
  flames and smoke burst up, and Mephistopheles, in his friar's habit, rises up through the floor inside
  the circle: he is clipped to everything above the floor line (with a rounded front edge, like a cylinder
  standing in the circle), starts wholly beneath it and never shows below it. He offers the contract; it is
  signed in red as the clock strikes.
-->
<template>
  <SceneStage :build="build">
    <Backdrop variant="study" time="night" />

    <!-- the clock -->
    <KitPlace part="clock" :x="720" :y="200" :scale="0.8">
      <circle r="84" :fill="c('wood-2')" />
      <circle r="70" :fill="c('paper')" />
      <path
        v-for="i in 12"
        :key="i"
        d="M 0 -62 L 0 -52"
        :stroke="c('ink')"
        stroke-width="4"
        :transform="`rotate(${i * 30})`"
      />
      <path
        d="M 0 0 L 0 -34"
        data-part="hand-h"
        data-pivot
        :stroke="c('ink')"
        stroke-width="7"
        stroke-linecap="round"
      />
      <path
        d="M 0 0 L 0 -54"
        data-part="hand-m"
        data-pivot
        :stroke="c('ink')"
        stroke-width="5"
        stroke-linecap="round"
      />
      <circle r="7" :fill="c('cloth-a')" />
    </KitPlace>
    <g
      data-part="dong"
      data-pivot
      transform="translate(720 200)"
      :stroke="c('gold-2')"
      stroke-width="6"
      stroke-linecap="round"
      fill="none"
    >
      <path
        d="M -92 -30 Q -104 0 -92 30 M -110 -44 Q -126 0 -110 44 M 92 -30 Q 104 0 92 30 M 110 -44 Q 126 0 110 44"
      />
    </g>

    <!-- the scholar's desk -->
    <Table :x="300" :y="FLOOR" :width="360" cloth="cloth-d" />
    <Book :x="250" :y="655" :scale="0.7" cover="wood-2" open />
    <Candle part="candle" :x="410" :y="655" :scale="0.8" />

    <!-- the magic circle, chalked on the floor -->
    <ellipse
      data-part="circle-glow"
      :cx="CX"
      :cy="CY"
      :rx="RX"
      :ry="RY"
      :fill="c('glow-2')"
      opacity="0"
    />
    <g
      fill="none"
      :stroke="c('glow')"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <ellipse
        data-part="ring"
        :cx="CX"
        :cy="CY"
        :rx="RX"
        :ry="RY"
        stroke-width="8"
        pathLength="1"
      />
      <ellipse
        data-part="ring"
        :cx="CX"
        :cy="CY"
        :rx="RX * 0.86"
        :ry="RY * 0.86"
        stroke-width="4"
        pathLength="1"
      />
      <path data-part="star" :d="star" stroke-width="4" pathLength="1" />
    </g>

    <!-- fire column and the flames behind him -->
    <path
      data-part="column"
      :d="`M ${CX - 150} ${CY} L ${CX - 60} 60 L ${CX + 60} 60 L ${CX + 150} ${CY} Z`"
      :fill="c('glow-2')"
      opacity="0"
    />
    <Fire
      v-for="(f, i) in flamesBack"
      :key="`b${i}`"
      part="flame-b"
      :x="f.x"
      :y="f.y"
      :scale="0.36"
      :logs="false"
    />

    <Burst part="burst" :x="CX" :y="CY - 60" :scale="0.9" color="glow-2" />

    <!-- smoke rolls along the floor behind him … -->
    <g :fill="c('stone')">
      <circle
        v-for="(s, i) in smokeBack"
        :key="i"
        data-part="puff"
        data-pivot
        :r="s.r"
        :transform="`translate(${s.x} ${s.y})`"
        opacity="0.92"
      />
    </g>

    <!-- Mephistopheles: clipped to everything above the floor, he starts wholly beneath it and rises up through the circle -->
    <clipPath id="df-floor"><path :d="floorClip" /></clipPath>
    <g clip-path="url(#df-floor)">
      <Devil
        part="meph"
        :x="CX"
        :y="BELOW_Y"
        :scale="1.12"
        :arm-r="-14"
        :arm-l="10"
      />
    </g>

    <!-- … and the front puffs and the glow of the opening hide the cut where he meets the floor -->
    <ellipse
      data-part="hole-glow"
      :cx="CX"
      :cy="CY"
      :rx="CUT_R + 10"
      :ry="CUT_RY + 8"
      :fill="c('glow')"
      opacity="0"
    />
    <g :fill="c('stone')">
      <circle
        v-for="(s, i) in smokeFront"
        :key="i"
        data-part="puff"
        data-pivot
        :r="s.r"
        :transform="`translate(${s.x} ${s.y})`"
        opacity="0.92"
      />
    </g>

    <!-- flames in front -->
    <Fire
      v-for="(f, i) in flamesFront"
      :key="`f${i}`"
      part="flame-f"
      :x="f.x"
      :y="f.y"
      :scale="0.4"
      :logs="false"
    />

    <!-- Faustus, wand in hand -->
    <Figure
      part="faustus"
      :x="590"
      :y="FLOOR"
      :scale="1.1"
      robe="cloth-b"
      trim="gold"
      hat="cap"
      hat-color="ink"
      beard
      hair-color="hair"
      :look="-0.6"
      :arm-r="-20"
    >
      <template #hand-r>
        <g>
          <rect
            x="-4"
            y="-4"
            width="8"
            height="74"
            rx="4"
            :fill="c('wood-2')"
          />
          <circle
            data-part="wand-tip"
            data-pivot
            cx="0"
            cy="0"
            r="9"
            :fill="c('glow')"
            transform="translate(0 74)"
          />
        </g>
      </template>
    </Figure>

    <!-- the contract -->
    <Scroll part="contract" :x="880" :y="250" :width="150" :length="200" />
    <path
      data-part="sign"
      d="M 832 420 C 846 392 858 440 872 410 C 884 386 894 432 928 402"
      fill="none"
      :stroke="c('red')"
      stroke-width="6"
      stroke-linecap="round"
      pathLength="1"
    />
  </SceneStage>
</template>

<script setup lang="ts">
import {
  Backdrop,
  Book,
  Burst,
  Candle,
  Fire,
  Figure,
  KitPlace,
  SceneStage,
  Scroll,
  Table,
  c,
  type SceneApi,
} from './kit'
import Devil from './kit/props/Devil.vue'

defineProps<{ period: string; title: string; initial?: string }>()

const FLOOR = 795
const CX = 1200
const CY = 800
const RX = 200
const RY = 36
// Mephistopheles is clipped to everything above the floor line y = CY, except that the cut is the rounded front
// edge of his footprint (half-width CUT_R, depth CUT_RY): the way a figure standing in the circle meets the floor.
const CUT_R = 132
const CUT_RY = 24
const floorClip = `M -100 -100 H 1700 V ${CY} H ${CX + CUT_R} A ${CUT_R} ${CUT_RY} 0 0 1 ${CX - CUT_R} ${CY} H -100 Z`
// start with his horn tips (~490 above the hem at this scale) still below the whole cut, so nothing peeks out early
const BELOW_Y = CY + 580

const onRing = (deg: number, k = 1) => ({
  x: CX + RX * k * Math.cos((deg * Math.PI) / 180),
  y: CY + RY * k * Math.sin((deg * Math.PI) / 180),
})
const star = [0, 1, 2, 3, 4, 5]
  .map((i, n) => {
    const q = onRing(-90 + i * 144, 0.84)
    return `${n ? 'L' : 'M'} ${q.x.toFixed(1)} ${q.y.toFixed(1)}`
  })
  .join(' ')
const flamesBack = [205, 245, 295, 335].map((d) => onRing(d))
const flamesFront = [25, 65, 115, 155].map((d) => onRing(d))
const smoke = [
  { x: CX - 120, y: CY - 10, r: 40 },
  { x: CX - 60, y: CY + 8, r: 52, front: true },
  { x: CX + 10, y: CY + 14, r: 58, front: true },
  { x: CX + 80, y: CY + 6, r: 50, front: true },
  { x: CX + 135, y: CY - 8, r: 38 },
  { x: CX - 20, y: CY - 30, r: 44 },
  { x: CX + 50, y: CY - 34, r: 40 },
]
const smokeBack = smoke.filter((s) => !s.front)
const smokeFront = smoke.filter((s) => s.front)
/** same order as the puffs in the document: back puffs, then front puffs */
const smokeInDomOrder = [...smokeBack, ...smokeFront]

function build({
  tl,
  p,
  root,
  establish,
  flicker,
  blink,
  turn,
  pop,
  shake,
  draw,
  sway,
}: SceneApi) {
  tl.set(p('burst'), { scale: 0, opacity: 0 }, 0)
  tl.set(p('meph'), { y: BELOW_Y }, 0)
  tl.set(p('hole-glow'), { opacity: 0 }, 0)
  tl.set([p('flame-b'), p('flame-f')], { scale: 0, opacity: 0 }, 0)
  tl.set(p('puff'), { scale: 0, opacity: 0 }, 0)
  tl.set(p('dong'), { scale: 0.6, opacity: 0 }, 0)
  tl.set(p('faustus', 'wand-tip'), { scale: 0.4 }, 0)
  tl.set(p('contract', 'paper'), { scaleY: 0, transformOrigin: '50% 0%' }, 0)
  tl.set(`${p('contract', 'lines')} path`, { opacity: 0 }, 0)
  tl.set(p('sign'), { strokeDasharray: 1, strokeDashoffset: 1 }, 0)
  tl.set(p('contract'), { opacity: 0 }, 0)

  establish()
  flicker(p('candle', 'flame'), 0)
  flicker(p('candle', 'halo'), 0.05)
  // the hour runs from eleven to midnight as he signs — the play ends when the clock strikes twelve
  tl.set(p('hand-h'), { rotation: -30 }, 0)
  tl.to(p('hand-m'), { rotation: 360, duration: 2.6, ease: 'none' }, 0)
  tl.to(p('hand-h'), { rotation: 0, duration: 2.6, ease: 'none' }, 0)
  blink('faustus', 0.25)

  // he looks up from his book and points his wand at the floor
  tl.to(
    p('faustus', 'eyes'),
    { x: '+=16', duration: 0.2, ease: 'power2.out' },
    0.4
  )
  turn(p('faustus', 'arm-r'), 0.45, -62, 0.3, 'back.out(1.6)')
  tl.to(
    p('faustus', 'wand-tip'),
    { scale: 1.3, duration: 0.2, ease: 'back.out(3)' },
    0.62
  )
  tl.to(
    p('faustus', 'wand-tip'),
    { scale: 0.9, duration: 0.12, yoyo: true, repeat: 3, ease: 'sine.inOut' },
    0.82
  )

  // the circle draws itself
  draw(p('ring'), 0.62, 0.45)
  draw(p('star'), 0.82, 0.38)
  tl.to(p('circle-glow'), { opacity: 0.35, duration: 0.3 }, 1.0)

  // fire and smoke burst up…
  pop(p('burst'), 1.16, 0.3)
  shake(1.16, 14)
  tl.to(p('burst'), { opacity: 0, scale: 1.5, duration: 0.25 }, 1.4)
  tl.to(
    [p('flame-b'), p('flame-f')],
    {
      scale: 1,
      opacity: 1,
      duration: 0.25,
      stagger: 0.03,
      ease: 'back.out(2.5)',
    },
    1.16
  )
  flicker(p('flame-b', 'flame'), 1.42)
  flicker(p('flame-f', 'flame'), 1.45)
  tl.to(p('column'), { opacity: 0.28, duration: 0.2 }, 1.16)
  tl.to(p('column'), { opacity: 0.1, duration: 0.6 }, 1.6)
  tl.to(
    p('puff'),
    {
      scale: 1,
      opacity: 0.92,
      duration: 0.28,
      stagger: 0.02,
      ease: 'back.out(2)',
    },
    1.17
  )
  // the smoke rolls outward along the floor and thins as he arrives
  // (the front puffs, which hide the cut where he meets the floor, linger until he is up)
  root.querySelectorAll(p('puff')).forEach((el, i) => {
    const s = smokeInDomOrder[i]!
    const dx = (s.x - CX) * 0.9 + (i % 2 ? 30 : -30)
    tl.to(
      el,
      {
        x: `+=${dx}`,
        y: '-=26',
        scale: 1.3,
        opacity: 0,
        duration: 0.5,
        ease: 'power1.in',
      },
      s.front ? 1.7 + i * 0.03 : 1.5 + i * 0.02
    )
  })
  tl.to(
    p('hole-glow'),
    { opacity: 0.75, duration: 0.2, ease: 'power2.out' },
    1.14
  )
  tl.to(p('hole-glow'), { opacity: 0, duration: 0.5, ease: 'power1.in' }, 1.75)
  tl.to(
    p('faustus', 'pose'),
    { rotation: -7, duration: 0.2, ease: 'power2.out' },
    1.2
  )
  blink('faustus', 1.3)

  // …and Mephistopheles rises out of the circle
  tl.to(p('meph'), { y: CY, duration: 0.9, ease: 'power1.out' }, 1.18)
  tl.from(
    p('meph', 'arm-l'),
    { rotation: 75, duration: 0.5, ease: 'power2.out' },
    1.25
  )
  tl.from(
    p('meph', 'arm-r'),
    { rotation: -75, duration: 0.5, ease: 'power2.out' },
    1.25
  )
  tl.from(
    p('meph', 'tail'),
    { rotation: -30, duration: 0.6, ease: 'back.out(2)' },
    1.4
  )
  tl.from(
    p('meph', 'eyeglow'),
    { scale: 0, duration: 0.3, ease: 'back.out(3)' },
    1.65
  )
  tl.to(
    p('meph', 'eyeglow'),
    { scale: 1.5, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut' },
    1.72
  )
  turn(p('meph', 'head'), 1.75, -8, 0.3, 'back.out(2)')
  sway(p('meph', 'tail'), 2.0, undefined, 10, 1.1)

  // he offers the contract
  turn(p('meph', 'arm-l'), 1.9, 100, 0.32, 'back.out(1.6)')
  turn(p('faustus', 'arm-r'), 2.0, -40, 0.3)
  tl.to(p('contract'), { opacity: 1, duration: 0.1 }, 2.05)
  tl.to(
    p('contract', 'paper'),
    { scaleY: 1, duration: 0.35, ease: 'power2.out' },
    2.05
  )
  tl.from(
    p('contract', 'roller-b'),
    { y: -200, duration: 0.35, ease: 'power2.out' },
    2.05
  )
  tl.to(
    `${p('contract', 'lines')} path`,
    { opacity: 0.5, duration: 0.1, stagger: 0.03 },
    2.18
  )
  tl.to(
    p('contract'),
    { y: 244, duration: 0.6, yoyo: true, repeat: 1, ease: 'sine.inOut' },
    2.1
  )

  // signed in red — and the clock strikes
  tl.to(
    p('sign'),
    { strokeDashoffset: 0, duration: 0.4, ease: 'power1.inOut' },
    2.32
  )
  tl.to(
    p('clock'),
    { rotation: 6, duration: 0.06, yoyo: true, repeat: 3, ease: 'sine.inOut' },
    2.6
  )
  tl.to(
    p('dong'),
    { scale: 1.1, opacity: 1, duration: 0.18, ease: 'back.out(2)' },
    2.6
  )
  tl.to(p('dong'), { opacity: 0, scale: 1.25, duration: 0.25 }, 2.8)
}
</script>
