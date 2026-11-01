<!--
  Easter Wings — Herbert's pattern poem on an open page: each stanza's lines write themselves
  out, shrinking and swelling, then turn on their sides into a pair of wings… and an angel
  rises out of the book's gutter on real wings, in a gentle golden glow.
-->
<template>
  <SceneStage :build="build">
    <Backdrop variant="parchment" />

    <!-- the book's gutter -->
    <rect
      x="770"
      y="84"
      width="60"
      height="732"
      :fill="c('paper-2')"
      opacity="0.45"
    />
    <path
      d="M 800 84 L 800 816"
      :stroke="c('paper-ink')"
      stroke-width="3"
      opacity="0.18"
    />

    <!-- the two stanzas: thin inked lines of verse, word by word -->
    <KitPlace
      v-for="(s, si) in stanzas"
      :key="si"
      :part="`stanza-${si}`"
      :x="s.x"
      :y="S_Y"
    >
      <g
        fill="none"
        :stroke="c('paper-ink')"
        stroke-width="7"
        stroke-linecap="round"
        opacity="0.85"
      >
        <g
          v-for="(ln, i) in s.lines"
          :key="i"
          data-part="line"
          data-pivot
          :transform="`translate(0 ${(i - 4.5) * 30})`"
        >
          <path
            v-for="(w, j) in ln"
            :key="j"
            data-part="word"
            :d="`M ${w[0]} 0 L ${w[1]} 0`"
            pathLength="1"
          />
        </g>
      </g>
    </KitPlace>

    <!-- light welling up from the gutter -->
    <g data-part="spark" data-pivot transform="translate(800 620)">
      <circle r="120" :fill="c('glow')" opacity="0.3" />
      <circle r="60" :fill="c('glow')" opacity="0.5" />
      <circle r="24" :fill="c('highlight')" />
    </g>

    <Angel part="angel" :x="800" :y="HEM" :scale="1" :arm-l="14" :arm-r="-14" />
  </SceneStage>
</template>

<script setup lang="ts">
import { Backdrop, KitPlace, SceneStage, c, type SceneApi } from './kit'
import { rng } from './kit/util'
import Angel from './kit/props/Angel.vue'

defineProps<{ period: string; title: string; initial?: string }>()

const S_Y = 385
const HEM = 622
// Herbert's stanzas shrink and swell: "Most poore: / With thee / O let me rise"
const LINE_W = [300, 240, 180, 120, 56, 56, 120, 180, 240, 300]
const GAP = 12

function lineWords(width: number, seed: number) {
  const r = rng(seed)
  const out: [number, number][] = []
  let x = -width / 2
  while (x < width / 2 - 1) {
    let len = 22 + r() * 44
    if (x + len > width / 2 - 20) len = width / 2 - x
    out.push([x, x + len])
    x += len + GAP
  }
  return out
}
const stanzas = [380, 1220].map((x, si) => ({
  x,
  lines: LINE_W.map((w, i) => lineWords(w, 7 + si * 31 + i * 3)),
}))

function build({ tl, p, root, establish, bob, blink, turn }: SceneApi) {
  const words0 = p('stanza-0', 'word')
  const words1 = p('stanza-1', 'word')
  tl.set(
    [words0, words1],
    { strokeDasharray: 1, strokeDashoffset: 1, opacity: 0 },
    0
  )
  tl.set(p('spark'), { scale: 0, opacity: 0 }, 0)
  tl.set(p('angel'), { y: HEM + 150, scale: 0.6, opacity: 0 }, 0)
  tl.set(p('angel', 'glow'), { scale: 0.4 }, 0)

  establish()

  // the lines write themselves, word by word, shrinking and swelling
  tl.to(
    words0,
    {
      strokeDashoffset: 0,
      opacity: 1,
      duration: 0.07,
      stagger: 0.013,
      ease: 'none',
    },
    0.2
  )
  tl.to(
    words1,
    {
      strokeDashoffset: 0,
      opacity: 1,
      duration: 0.07,
      stagger: 0.013,
      ease: 'none',
    },
    0.34
  )

  // each stanza turns on its side: a pair of wings
  // (each line fans out a little, outer lines lifted: the feathers of a spread wing)
  tl.to(
    p('stanza-0'),
    { rotation: -90, duration: 0.55, ease: 'back.out(1.5)' },
    1.0
  )
  tl.to(
    p('stanza-1'),
    { rotation: 90, duration: 0.55, ease: 'back.out(1.5)' },
    1.06
  )
  ;[0, 1].forEach((si) => {
    const sign = si ? -1 : 1
    root
      .querySelectorAll<SVGGElement>(p(`stanza-${si}`, 'line'))
      .forEach((el, i) => {
        const k = i - 4.5
        tl.to(
          el,
          {
            rotation: sign * k * 2.4,
            x: sign * Math.abs(k) * 3.5,
            duration: 0.5,
            ease: 'back.out(1.6)',
          },
          1.12 + si * 0.06
        )
      })
  })

  // light wells up in the gutter…
  tl.to(
    p('spark'),
    { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(2.5)' },
    1.3
  )
  tl.to(
    p('spark'),
    { scale: 1.8, opacity: 0, duration: 0.4, ease: 'power2.out' },
    1.6
  )

  // …and an angel rises out of it, wings beating
  tl.to(p('angel'), { opacity: 1, duration: 0.25, ease: 'power1.out' }, 1.45)
  tl.to(
    p('angel'),
    { y: HEM, scale: 1, duration: 1.0, ease: 'power2.out' },
    1.45
  )
  tl.to(
    p('angel', 'glow'),
    { scale: 1, duration: 0.8, ease: 'power2.out' },
    1.5
  )
  tl.fromTo(
    p('angel', 'wing-r'),
    { rotation: 34 },
    { rotation: -18, duration: 0.2, yoyo: true, repeat: 4, ease: 'sine.inOut' },
    1.45
  )
  tl.fromTo(
    p('angel', 'wing-l'),
    { rotation: -34 },
    { rotation: 18, duration: 0.2, yoyo: true, repeat: 4, ease: 'sine.inOut' },
    1.45
  )
  tl.to(
    p('angel', 'wing-r'),
    { rotation: -6, duration: 0.45, ease: 'sine.inOut' },
    2.45
  )
  tl.to(
    p('angel', 'wing-l'),
    { rotation: 6, duration: 0.45, ease: 'sine.inOut' },
    2.45
  )
  tl.to(
    p('angel', 'body'),
    { y: -8, duration: 0.2, yoyo: true, repeat: 4, ease: 'sine.inOut' },
    1.55
  )
  tl.from(
    p('angel', 'halo'),
    { scale: 0, opacity: 0, duration: 0.35, ease: 'back.out(2.5)' },
    1.95
  )
  turn(p('angel', 'arm-l'), 2.05, 48, 0.45, 'back.out(1.4)')
  turn(p('angel', 'arm-r'), 2.05, -48, 0.45, 'back.out(1.4)')
  turn(p('angel', 'head'), 2.2, -5, 0.4)
  blink('angel', 2.6)

  // the poem's wings drift with it
  bob(p('stanza-0'), 1.6, undefined, 5, 1.4)
  bob(p('stanza-1'), 1.75, undefined, 5, 1.4)
  bob(p('angel', 'body'), 2.6, undefined, 6, 1.6)
}
</script>
