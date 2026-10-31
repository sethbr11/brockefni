<!--
  Full-stage background (1600×900). Put it first inside <SceneStage>.
  variant: 'mead-hall' | 'castle-hall' | 'night-sky' | 'hills' | 'sea' | 'forest' | 'chapel' |
           'study' | 'garden' | 'parchment'
  time:    'auto' (default) | 'day' | 'night'. Which sky the backdrop (and any window/doorway in it) shows.
           'auto' draws BOTH a sunny day and a moonlit night version and lets CSS pick one from the site
           theme (day in light mode, night under `html.darkmode`) -- no JS, so SSR / seek / reduced-motion
           all work. 'day' / 'night' pin it (use for stories that need a specific hour).
  night:   legacy alias for time="night".
  celestial: [x, y] of the sun / moon (default [1250, 185]).
  showWindow: study only; false omits the backdrop's own window (for scenes that draw a bigger one).
  Floor / horizon line (where figures stand): mead-hall 720, castle-hall 640–900, chapel 720,
  study 760, hills ~740, garden ~760, forest ~770, sea 540 (waterline), night-sky ~760.
  Parts: sky, sun, moon, stars, clouds, waves (sea), fire + glow (mead-hall), door + moonlight
  (mead-hall), banners (castle-hall), rays + flame (chapel), window (study).
  Slot #doorway (mead-hall): drawn inside the open doorway, behind the door panel.
-->
<template>
  <g class="cp-backdrop">
    <!-- ================= OUTDOOR (sky + landscape), one copy per time of day ================= -->
    <template v-if="outdoor">
      <g v-for="m in modes" :key="m" :class="cls(m)">
        <g data-part="sky">
          <rect
            width="1600"
            height="900"
            :fill="c(m === 'night' ? 'night' : 'sky')"
          />
          <ellipse
            cx="800"
            cy="760"
            rx="1200"
            ry="420"
            :fill="c(m === 'night' ? 'night-2' : 'sky-2')"
            opacity="0.9"
          />
          <ellipse
            cx="800"
            cy="820"
            rx="900"
            ry="300"
            :fill="c(m === 'night' ? 'night-2' : 'sky-2')"
          />
          <g v-if="m === 'night'" data-part="stars">
            <circle
              v-for="(s, i) in stars"
              :key="i"
              :cx="s.x"
              :cy="s.y"
              :r="s.r"
              :fill="c('star')"
              :opacity="s.o"
            />
          </g>
          <g
            v-if="m === 'night'"
            data-part="moon"
            data-pivot
            :transform="`translate(${cel[0]} ${cel[1]})`"
          >
            <circle r="110" :fill="c('moon')" opacity="0.12" />
            <circle r="64" :fill="c('moon')" />
            <circle cx="-18" cy="-14" r="12" :fill="c('ink')" opacity="0.06" />
            <circle cx="20" cy="18" r="8" :fill="c('ink')" opacity="0.06" />
          </g>
          <g
            v-else
            data-part="sun"
            data-pivot
            :transform="`translate(${cel[0]} ${cel[1]})`"
          >
            <circle r="150" :fill="c('sun')" opacity="0.12" />
            <circle r="120" :fill="c('sun')" opacity="0.2" />
            <path
              v-for="i in 12"
              :key="i"
              d="M -9 -96 L 0 -134 L 9 -96 Z"
              :fill="c('sun')"
              opacity="0.55"
              :transform="`rotate(${i * 30})`"
            />
            <circle r="72" :fill="c('sun')" />
          </g>
          <g
            v-if="m === 'day'"
            data-part="clouds"
            :fill="c('highlight')"
            opacity="0.85"
          >
            <path :d="cloud" transform="translate(300 170)" />
            <path :d="cloud" transform="translate(800 110) scale(0.7)" />
            <path :d="cloud" transform="translate(1480 320) scale(0.6)" />
          </g>
        </g>

        <!-- hills / night-sky -->
        <g v-if="variant === 'hills' || variant === 'night-sky'">
          <path
            d="M 0 560 C 200 470 380 500 560 540 C 760 585 900 480 1120 470 C 1320 460 1460 520 1600 500 L 1600 900 L 0 900 Z"
            v-bind="layer(0, m)"
          />
          <path
            d="M 0 650 C 180 600 360 610 520 640 C 720 680 880 600 1080 590 C 1280 580 1440 640 1600 630 L 1600 900 L 0 900 Z"
            v-bind="layer(1, m)"
          />
          <path
            d="M 0 760 C 240 700 480 720 700 750 C 960 785 1200 700 1600 730 L 1600 900 L 0 900 Z"
            v-bind="layer(2, m)"
          />
        </g>

        <!-- sea -->
        <g v-if="variant === 'sea'">
          <rect
            y="540"
            width="1600"
            height="360"
            :fill="c(m === 'night' ? 'night-2' : 'water')"
          />
          <rect
            v-if="m === 'night'"
            y="540"
            width="1600"
            height="360"
            :fill="c('ink')"
            opacity="0.25"
          />
          <rect
            y="540"
            width="1600"
            height="10"
            :fill="c(m === 'night' ? 'moon' : 'water-2')"
            opacity="0.5"
          />
          <rect
            x="1190"
            y="550"
            width="120"
            height="350"
            :fill="c(m === 'night' ? 'moon' : 'sun')"
            :opacity="m === 'night' ? 0.1 : 0.14"
            :transform="`translate(${cel[0] - 1250} 0)`"
          />
          <g
            v-for="(row, i) in waveRows"
            :key="i"
            :data-part="`waves-${i + 1}`"
            data-pivot
          >
            <path
              :d="row.d"
              fill="none"
              :stroke="c(m === 'night' ? 'water-2' : 'foam')"
              :stroke-width="row.w"
              stroke-linecap="round"
              :opacity="row.o"
            />
          </g>
        </g>

        <!-- forest -->
        <g v-if="variant === 'forest'">
          <path
            d="M 0 600 C 300 560 700 590 1000 570 C 1250 555 1450 580 1600 570 L 1600 900 L 0 900 Z"
            v-bind="layer(0, m)"
          />
          <g data-part="trees">
            <path
              v-for="(t, i) in pinesFar"
              :key="`f${i}`"
              :d="t"
              v-bind="layer(0, m)"
            />
            <path
              v-for="(t, i) in pinesMid"
              :key="`m${i}`"
              :d="t"
              v-bind="layer(1, m)"
            />
          </g>
          <path
            d="M 0 770 C 300 740 600 760 900 750 C 1200 740 1400 760 1600 750 L 1600 900 L 0 900 Z"
            v-bind="layer(2, m)"
          />
        </g>

        <!-- garden -->
        <g v-if="variant === 'garden'">
          <path
            d="M 0 600 C 300 560 600 590 900 560 C 1200 540 1400 580 1600 560 L 1600 900 L 0 900 Z"
            v-bind="layer(0, m)"
          />
          <g
            v-for="(t, i) in [180, 520, 1080, 1420]"
            :key="i"
            :transform="`translate(${t} 600)`"
          >
            <rect
              x="-8"
              y="-90"
              width="16"
              height="90"
              :fill="c(m === 'night' ? 'ink' : 'wood-2')"
            />
            <circle cx="0" cy="-120" r="62" v-bind="layer(1, m)" />
          </g>
          <rect
            x="0"
            y="640"
            width="1600"
            height="90"
            rx="40"
            v-bind="layer(2, m)"
          />
          <circle
            v-for="(f, i) in flowers"
            :key="i"
            :cx="f.x"
            :cy="f.y"
            r="9"
            :fill="c(f.c)"
            :opacity="m === 'night' ? 0.55 : 1"
          />
          <path
            d="M 0 730 L 1600 730 L 1600 900 L 0 900 Z"
            v-bind="layer(1, m)"
          />
          <path
            d="M 560 900 C 680 820 740 760 800 730 C 860 760 920 820 1040 900 Z"
            :fill="c(m === 'night' ? 'stone-2' : 'paper-2')"
            :opacity="m === 'night' ? 0.5 : 0.9"
          />
        </g>
      </g>
    </template>

    <!-- ================= MEAD-HALL (Heorot) ================= -->
    <g v-if="variant === 'mead-hall'">
      <rect width="1600" height="900" :fill="c('wood')" />
      <rect
        v-for="i in 20"
        :key="i"
        :x="i * 80 - 40"
        y="0"
        width="5"
        height="720"
        :fill="c('wood-2')"
        opacity="0.35"
      />
      <path
        d="M 0 0 L 1600 0 L 1600 270 L 800 -30 L 0 270 Z"
        :fill="c('wood-2')"
      />
      <path
        d="M -20 286 L 800 -22 L 1620 286"
        fill="none"
        :stroke="c('wood-3')"
        stroke-width="30"
      />
      <rect x="0" y="236" width="1600" height="30" :fill="c('wood-3')" />
      <rect
        x="0"
        y="262"
        width="1600"
        height="10"
        :fill="c('ink')"
        opacity="0.2"
      />
      <!-- wall shields -->
      <g
        v-for="(s, i) in [
          { x: 320, k: 'cloth-a' },
          { x: 520, k: 'gold' },
          { x: 720, k: 'cloth-b' },
          { x: 920, k: 'cloth-a' },
        ]"
        :key="i"
        :transform="`translate(${s.x} 360)`"
      >
        <circle r="54" :fill="c(s.k)" />
        <circle r="54" fill="none" :stroke="c('wood-2')" stroke-width="7" />
        <circle r="16" :fill="c('metal')" />
        <path
          d="M 0 -54 L 0 54 M -54 0 L 54 0"
          :stroke="c('ink')"
          stroke-width="3"
          opacity="0.15"
        />
      </g>
      <!-- posts -->
      <rect x="110" y="250" width="56" height="480" :fill="c('wood-2')" />
      <rect x="1124" y="250" width="56" height="480" :fill="c('wood-2')" />
      <!-- floor -->
      <rect x="0" y="715" width="1600" height="185" :fill="c('wood-2')" />
      <rect
        x="0"
        y="715"
        width="1600"
        height="8"
        :fill="c('ink')"
        opacity="0.25"
      />
      <path
        d="M 0 790 L 1600 790 M 0 860 L 1600 860"
        :stroke="c('ink')"
        stroke-width="4"
        opacity="0.15"
      />
      <!-- hearth glow on the wall -->
      <g
        data-part="glow"
        data-pivot
        transform="translate(500 700)"
        :fill="c('glow')"
      >
        <circle r="380" opacity="0.07" />
        <circle r="270" opacity="0.08" />
        <circle r="170" opacity="0.1" />
      </g>

      <!-- doorway -->
      <g :clip-path="`url(#${uid}-door)`">
        <g v-for="m in modes" :key="m" :class="cls(m)">
          <rect
            x="1200"
            y="320"
            width="240"
            height="400"
            :fill="c(m === 'night' ? 'night' : 'sky')"
          />
          <rect
            x="1200"
            y="560"
            width="240"
            height="160"
            :fill="c(m === 'night' ? 'night-2' : 'sky-2')"
          />
          <template v-if="m === 'night'">
            <circle cx="1390" cy="410" r="22" :fill="c('moon')" />
            <circle
              v-for="(s, i) in stars.slice(0, 6)"
              :key="i"
              :cx="1210 + (s.x % 220)"
              :cy="350 + (s.y % 150)"
              :r="s.r * 0.8"
              :fill="c('star')"
            />
          </template>
          <template v-else>
            <circle cx="1390" cy="410" r="40" :fill="c('sun')" opacity="0.25" />
            <circle cx="1390" cy="410" r="24" :fill="c('sun')" />
            <path
              :d="cloud"
              :fill="c('highlight')"
              opacity="0.85"
              transform="translate(1300 380) scale(0.3)"
            />
          </template>
        </g>
        <path
          d="M 1200 640 C 1260 610 1320 630 1440 600 L 1440 720 L 1200 720 Z"
          :fill="c('ink')"
          opacity="0.55"
        />
        <slot name="doorway" />
      </g>
      <clipPath :id="`${uid}-door`">
        <path :d="doorPath" />
      </clipPath>
      <path :d="doorPath" fill="none" :stroke="c('wood-3')" stroke-width="24" />
      <path
        :d="doorPath"
        fill="none"
        :stroke="c('ink')"
        stroke-width="4"
        opacity="0.25"
        transform="translate(4 4)"
      />
      <!-- antlers of Heorot -->
      <g :fill="c('gold')" transform="translate(1315 300)">
        <path
          d="M -8 0 C -40 -10 -70 -40 -80 -90 L -68 -92 C -62 -64 -52 -48 -40 -38 C -44 -58 -42 -74 -34 -88 L -24 -84 C -30 -64 -26 -44 -14 -26 C -10 -18 -2 -12 6 -8 Z"
        />
        <path
          d="M 8 0 C 40 -10 70 -40 80 -90 L 68 -92 C 62 -64 52 -48 40 -38 C 44 -58 42 -74 34 -88 L 24 -84 C 30 -64 26 -44 14 -26 C 10 -18 2 -12 -6 -8 Z"
        />
      </g>
      <!-- moonlight spilling in -->
      <g
        v-if="mode !== 'day'"
        data-part="moonlight"
        :class="mode === 'auto' ? 'cp-night' : undefined"
        :opacity="doorOpen ? 1 : 0"
      >
        <path
          d="M 1206 718 L 1426 718 L 1150 900 L 640 900 Z"
          :fill="c('moon')"
          opacity="0.28"
        />
      </g>
      <!-- door panel (hinge on the left; tween scaleX → ~0.1 to swing open) -->
      <g transform="translate(1200 0)">
        <g
          data-part="door"
          data-pivot
          :transform="doorOpen ? 'scale(0.1 1)' : undefined"
        >
          <path :d="doorPanel" :fill="c('wood-3')" />
          <path
            v-for="x in [55, 110, 165]"
            :key="x"
            :d="`M ${x} 340 L ${x} 715`"
            :stroke="c('wood')"
            stroke-width="5"
          />
          <rect x="0" y="430" width="230" height="16" :fill="c('metal-2')" />
          <rect x="0" y="610" width="230" height="16" :fill="c('metal-2')" />
          <circle cx="196" cy="530" r="10" :fill="c('metal-2')" />
        </g>
      </g>
      <!-- hearth -->
      <g transform="translate(500 790)">
        <ellipse cx="0" cy="10" rx="170" ry="34" :fill="c('stone-2')" />
        <ellipse
          cx="0"
          cy="4"
          rx="140"
          ry="22"
          :fill="c('ink')"
          opacity="0.5"
        />
        <Fire part="fire" :y="10" :scale="0.95" />
        <g :fill="c('stone')">
          <ellipse
            v-for="(s, i) in hearthStones"
            :key="i"
            :cx="s.x"
            :cy="s.y"
            :rx="s.r"
            :ry="s.r * 0.6"
          />
        </g>
      </g>
    </g>

    <!-- ================= CASTLE HALL (Camelot) ================= -->
    <g v-if="variant === 'castle-hall'">
      <rect width="1600" height="900" :fill="c('stone')" />
      <path
        :d="brickPath"
        fill="none"
        :stroke="c('stone-2')"
        stroke-width="4"
        opacity="0.45"
      />
      <g
        v-for="wx in [400, 800, 1200]"
        :key="wx"
        :transform="`translate(${wx} 0)`"
      >
        <path
          d="M -78 470 L -78 210 Q -78 120 0 92 Q 78 120 78 210 L 78 470 Z"
          :fill="c('stone-3')"
        />
        <g v-for="m in modes" :key="m" :class="cls(m)">
          <path
            d="M -60 456 L -60 214 Q -60 140 0 116 Q 60 140 60 214 L 60 456 Z"
            :fill="c(m === 'night' ? 'night' : 'sky')"
          />
          <template v-if="m === 'night'">
            <circle cx="22" cy="190" r="16" :fill="c('moon')" opacity="0.9" />
            <circle cx="-26" cy="260" r="3" :fill="c('star')" />
            <circle cx="30" cy="330" r="2.5" :fill="c('star')" />
            <circle cx="-14" cy="380" r="3" :fill="c('star')" />
          </template>
          <template v-else>
            <path
              d="M -60 456 L -60 400 C -30 380 20 410 60 392 L 60 456 Z"
              :fill="c('far')"
            />
            <circle cx="22" cy="190" r="26" :fill="c('sun')" opacity="0.28" />
            <circle cx="22" cy="190" r="16" :fill="c('sun')" />
            <path
              :d="cloud"
              :fill="c('highlight')"
              opacity="0.9"
              transform="translate(-14 290) scale(0.28)"
            />
          </template>
        </g>
        <path
          d="M 0 116 L 0 456 M -60 300 L 60 300"
          :stroke="c('stone-3')"
          stroke-width="8"
        />
      </g>
      <g data-part="banners">
        <g
          v-for="(b, i) in banners"
          :key="i"
          :transform="`translate(${b.x} 150)`"
        >
          <g data-part="banner" data-pivot>
            <rect
              x="-62"
              y="-8"
              width="124"
              height="14"
              rx="7"
              :fill="c('wood-2')"
            />
            <path
              d="M -50 0 L 50 0 L 50 250 L 0 216 L -50 250 Z"
              :fill="c(b.k)"
            />
            <path
              d="M 18 0 L 50 0 L 50 250 L 18 228 Z"
              :fill="c('ink')"
              opacity="0.12"
            />
            <circle cx="0" cy="96" r="26" :fill="c(b.e)" />
            <path d="M -50 22 L 50 22" :stroke="c(b.e)" stroke-width="6" />
          </g>
        </g>
      </g>
      <rect x="0" y="600" width="1600" height="300" :fill="c('stone-2')" />
      <rect
        x="0"
        y="600"
        width="1600"
        height="12"
        :fill="c('ink')"
        opacity="0.2"
      />
      <g :fill="c('stone')" opacity="0.5">
        <rect
          v-for="(t, i) in tiles"
          :key="i"
          :x="t.x"
          :y="t.y"
          :width="t.w"
          :height="t.h"
        />
      </g>
      <!-- sunbeams by day, moonbeams + a warm hearth-glow by night -->
      <g v-for="m in modes" :key="m" :class="cls(m)" pointer-events="none">
        <path
          v-for="wx in [400, 800, 1200]"
          :key="wx"
          :d="`M ${wx - 56} 130 L ${wx + 56} 130 L ${wx + 300} 760 L ${wx + 120} 760 Z`"
          :fill="c(m === 'night' ? 'moon' : 'sun')"
          :opacity="m === 'night' ? 0.07 : 0.13"
        />
        <g v-if="m === 'night'" :fill="c('glow')">
          <ellipse cx="800" cy="640" rx="760" ry="200" opacity="0.06" />
          <ellipse cx="800" cy="660" rx="520" ry="140" opacity="0.07" />
          <ellipse cx="1150" cy="560" rx="320" ry="160" opacity="0.07" />
        </g>
      </g>
    </g>

    <!-- ================= CHAPEL ================= -->
    <g v-if="variant === 'chapel'">
      <rect width="1600" height="900" :fill="c('stone')" />
      <path
        :d="brickPath"
        fill="none"
        :stroke="c('stone-2')"
        stroke-width="4"
        opacity="0.4"
      />
      <g v-for="px in [250, 1350]" :key="px" :transform="`translate(${px} 0)`">
        <path
          d="M -150 720 L -150 300 Q -150 130 0 60 Q 150 130 150 300 L 150 720"
          fill="none"
          :stroke="c('stone-2')"
          stroke-width="22"
        />
        <rect
          x="-40"
          y="0"
          width="80"
          height="720"
          :fill="c('stone-3')"
          opacity="0"
        />
      </g>
      <rect x="140" y="0" width="60" height="720" :fill="c('stone-3')" />
      <rect x="1400" y="0" width="60" height="720" :fill="c('stone-3')" />
      <g v-for="m in modes" :key="m" :class="cls(m)" pointer-events="none">
        <path
          data-part="rays"
          d="M 690 300 L 910 300 L 1180 900 L 420 900 Z"
          :fill="c(m === 'night' ? 'moon' : 'glow')"
          :opacity="m === 'night' ? 0.1 : 0.14"
        />
      </g>
      <g data-part="window">
        <path
          d="M 670 540 L 670 270 Q 670 130 800 70 Q 930 130 930 270 L 930 540 Z"
          :fill="c('stone-3')"
        />
        <path
          d="M 690 524 L 690 274 Q 690 150 800 96 Q 910 150 910 274 L 910 524 Z"
          :fill="c('period')"
        />
        <path
          d="M 800 96 L 800 524 M 690 330 L 910 330 M 690 430 L 910 430"
          :stroke="c('stone-3')"
          stroke-width="8"
        />
        <path
          d="M 745 220 L 760 250 L 745 280 L 730 250 Z M 855 220 L 870 250 L 855 280 L 840 250 Z"
          :fill="c('gold')"
        />
        <circle cx="745" cy="380" r="18" :fill="c('red')" />
        <circle cx="855" cy="380" r="18" :fill="c('cloth-b')" />
        <circle cx="745" cy="478" r="14" :fill="c('gold')" />
        <circle cx="855" cy="478" r="14" :fill="c('green')" />
        <circle cx="800" cy="170" r="22" :fill="c('glow')" />
        <!-- night: the glass sits dark, only the moon-struck colours glimmer -->
        <path
          v-if="mode !== 'day'"
          :class="mode === 'auto' ? 'cp-night' : undefined"
          d="M 690 524 L 690 274 Q 690 150 800 96 Q 910 150 910 274 L 910 524 Z"
          :fill="c('night')"
          opacity="0.5"
        />
      </g>
      <rect x="0" y="720" width="1600" height="180" :fill="c('stone-2')" />
      <rect
        x="0"
        y="720"
        width="1600"
        height="10"
        :fill="c('ink')"
        opacity="0.2"
      />
      <g>
        <rect x="600" y="590" width="400" height="140" :fill="c('stone-3')" />
        <rect
          x="580"
          y="566"
          width="440"
          height="34"
          rx="4"
          :fill="c('highlight')"
        />
        <rect x="740" y="600" width="120" height="130" :fill="c('period')" />
        <path
          d="M 800 616 L 800 700 M 772 640 L 828 640"
          :stroke="c('gold')"
          stroke-width="10"
          stroke-linecap="round"
        />
        <Candle :x="640" :y="566" :scale="0.85" />
        <Candle :x="960" :y="566" :scale="0.85" />
        <g
          v-if="mode !== 'day'"
          :class="mode === 'auto' ? 'cp-night' : undefined"
          :fill="c('glow')"
          pointer-events="none"
        >
          <circle
            v-for="cx in [640, 960]"
            :key="cx"
            :cx="cx"
            cy="520"
            r="150"
            opacity="0.1"
          />
          <circle
            v-for="cx in [640, 960]"
            :key="`b${cx}`"
            :cx="cx"
            cy="520"
            r="80"
            opacity="0.14"
          />
        </g>
      </g>
    </g>

    <!-- ================= STUDY ================= -->
    <g v-if="variant === 'study'">
      <rect width="1600" height="900" :fill="c('stone-3')" />
      <rect x="0" y="540" width="1600" height="220" :fill="c('wood')" />
      <path
        v-for="x in 16"
        :key="x"
        :d="`M ${x * 100} 560 L ${x * 100} 740`"
        :stroke="c('wood-2')"
        stroke-width="5"
        opacity="0.5"
      />
      <rect x="0" y="540" width="1600" height="16" :fill="c('wood-3')" />
      <rect x="0" y="760" width="1600" height="140" :fill="c('wood-2')" />
      <!-- shelf -->
      <rect x="70" y="120" width="440" height="640" :fill="c('wood-2')" />
      <rect
        x="90"
        y="140"
        width="400"
        height="600"
        :fill="c('ink')"
        opacity="0.35"
      />
      <rect
        v-for="y in [290, 450, 610, 740]"
        :key="y"
        x="80"
        :y="y"
        width="420"
        height="16"
        :fill="c('wood-3')"
      />
      <rect
        v-for="(b, i) in books"
        :key="i"
        :x="b.x"
        :y="b.y"
        :width="b.w"
        :height="b.h"
        rx="3"
        :fill="c(b.c)"
        :transform="b.t"
      />
      <!-- window -->
      <g v-if="showWindow" data-part="window">
        <path
          d="M 1050 480 L 1050 230 Q 1050 120 1200 100 Q 1350 120 1350 230 L 1350 480 Z"
          :fill="c('wood-3')"
        />
        <g v-for="m in modes" :key="m" :class="cls(m)">
          <path
            d="M 1072 460 L 1072 236 Q 1072 140 1200 122 Q 1328 140 1328 236 L 1328 460 Z"
            :fill="c(m === 'night' ? 'night' : 'sky')"
          />
          <template v-if="m === 'night'">
            <circle cx="1260" cy="210" r="26" :fill="c('moon')" />
            <circle cx="1120" cy="260" r="3" :fill="c('star')" />
            <circle cx="1160" cy="350" r="2.5" :fill="c('star')" />
            <circle cx="1290" cy="400" r="3" :fill="c('star')" />
          </template>
          <template v-else>
            <path
              d="M 1072 460 L 1072 410 C 1130 380 1200 420 1328 396 L 1328 460 Z"
              :fill="c('far')"
            />
            <circle cx="1260" cy="210" r="46" :fill="c('sun')" opacity="0.25" />
            <circle cx="1260" cy="210" r="28" :fill="c('sun')" />
            <path
              :d="cloud"
              :fill="c('highlight')"
              opacity="0.9"
              transform="translate(1150 320) scale(0.4)"
            />
          </template>
        </g>
        <path
          d="M 1200 122 L 1200 460 M 1072 300 L 1328 300"
          :stroke="c('wood-3')"
          stroke-width="10"
        />
        <rect x="1040" y="470" width="320" height="20" :fill="c('wood-3')" />
      </g>
      <g
        v-for="m in showWindow ? modes : []"
        :key="m"
        :class="cls(m)"
        pointer-events="none"
      >
        <path
          d="M 1072 480 L 1328 480 L 1330 760 L 640 760 Z"
          :fill="c(m === 'night' ? 'moon' : 'sun')"
          :opacity="m === 'night' ? 0.06 : 0.12"
        />
      </g>
    </g>

    <!-- ================= PARCHMENT ================= -->
    <g v-if="variant === 'parchment'">
      <rect width="1600" height="900" :fill="c('paper-2')" />
      <path
        d="M 50 40 Q 400 30 800 44 Q 1200 30 1550 40 Q 1566 450 1552 860 Q 1200 872 800 858 Q 400 872 48 860 Q 34 450 50 40 Z"
        :fill="c('paper')"
      />
      <rect
        x="90"
        y="80"
        width="1420"
        height="740"
        rx="6"
        fill="none"
        :stroke="c('period')"
        stroke-width="10"
      />
      <rect
        x="112"
        y="102"
        width="1376"
        height="696"
        rx="3"
        fill="none"
        :stroke="c('gold')"
        stroke-width="3"
      />
      <g :fill="c('gold')">
        <path
          v-for="(p, i) in corners"
          :key="i"
          d="M 0 -22 L 10 0 L 0 22 L -10 0 Z"
          :transform="`translate(${p[0]} ${p[1]})`"
        />
      </g>
      <g :fill="c('period')">
        <circle
          v-for="(p, i) in corners"
          :key="i"
          :cx="p[0]"
          :cy="p[1]"
          r="5"
        />
      </g>
      <path
        v-for="y in ruled"
        :key="y"
        :d="`M 180 ${y} L 1420 ${y}`"
        :stroke="c('paper-2')"
        stroke-width="2"
        opacity="0.8"
      />
      <path
        d="M 180 130 L 180 770"
        :stroke="c('red')"
        stroke-width="2"
        opacity="0.35"
      />
    </g>

    <slot />
  </g>
</template>

<script setup lang="ts">
import { computed, useId } from 'vue'
import Fire from './props/Fire.vue'
import Candle from './props/Candle.vue'
import { c, rng } from './util'

type Time = 'auto' | 'day' | 'night'
type Variant =
  | 'mead-hall'
  | 'castle-hall'
  | 'night-sky'
  | 'hills'
  | 'sea'
  | 'forest'
  | 'chapel'
  | 'study'
  | 'garden'
  | 'parchment'

const props = withDefaults(
  defineProps<{
    variant: Variant
    night?: boolean
    time?: Time
    doorOpen?: boolean
    celestial?: [number, number]
    showWindow?: boolean
  }>(),
  {
    night: false,
    time: 'auto',
    doorOpen: false,
    showWindow: true,
    celestial: () => [1250, 185],
  }
)

const uid = `cp-bd-${useId()}`
const outdoor = computed(() =>
  ['night-sky', 'hills', 'sea', 'forest', 'garden'].includes(props.variant)
)
/** resolved time of day ('night' alias + the night-sky variant pin it) */
const mode = computed<Time>(() =>
  props.time !== 'auto'
    ? props.time
    : props.night || props.variant === 'night-sky'
      ? 'night'
      : 'auto'
)
/** which skies to draw: auto = both, CSS (.cp-day / .cp-night in scene-tokens.css) shows one */
const modes = computed<Exclude<Time, 'auto'>[]>(() =>
  mode.value === 'auto' ? ['day', 'night'] : [mode.value]
)
const cls = (m: string) => (mode.value === 'auto' ? `cp-${m}` : undefined)
const cel = computed(() => props.celestial)

/** landscape layer i (0 far → 2 near): day tones, or ink washes over the night sky */
function layer(i: number, m: string) {
  if (m === 'night') return { fill: c('ink'), opacity: [0.3, 0.52, 0.78][i] }
  return { fill: c((['far', 'mid', 'near'] as const)[i]) }
}

const cloud =
  'M -90 20 C -114 20 -114 -10 -88 -12 C -86 -42 -46 -50 -30 -28 C -18 -60 34 -58 42 -24 C 72 -36 100 -8 86 20 Z'

const r = rng(7)
const stars = Array.from({ length: 46 }, () => ({
  x: r() * 1600,
  y: r() * 470,
  r: 1.5 + r() * 2.5,
  o: 0.5 + r() * 0.5,
}))

const waveRows = [540, 600, 680, 780].map((y, i) => {
  const step = 60 + i * 30
  let d = ''
  for (let x = -40 - i * 23; x < 1640; x += step * 2.2)
    d += `M ${x} ${y + 20 + i * 8} q ${step / 2} ${-12 - i * 4} ${step} 0 `
  return { d, w: 4 + i * 2, o: 0.35 + i * 0.15 }
})

const pinesFar = Array.from({ length: 22 }, (_, i) => {
  const x = i * 78 - 20
  const h = 150 + ((i * 53) % 90)
  return `M ${x - 44} 610 L ${x} ${610 - h} L ${x + 44} 610 Z`
})
const pinesMid = Array.from({ length: 12 }, (_, i) => {
  const x = i * 150 + 30
  const h = 260 + ((i * 71) % 100)
  return `M ${x - 70} 780 L ${x - 30} ${780 - h * 0.55} L ${x - 50} ${780 - h * 0.55} L ${x} ${780 - h} L ${x + 50} ${780 - h * 0.55} L ${x + 30} ${780 - h * 0.55} L ${x + 70} 780 Z`
})

const fr = rng(3)
const flowers = Array.from({ length: 34 }, () => ({
  x: fr() * 1600,
  y: 650 + fr() * 70,
  c: ['red', 'highlight', 'gold', 'cloth-d'][Math.floor(fr() * 4)]!,
}))

const doorPath =
  'M 1200 718 L 1200 400 Q 1200 330 1315 330 Q 1430 330 1430 400 L 1430 718 Z'
const doorPanel =
  'M 0 718 L 0 400 Q 0 330 115 330 Q 230 330 230 400 L 230 718 Z'
const hearthStones = Array.from({ length: 9 }, (_, i) => {
  const a = Math.PI * (i / 8)
  return { x: Math.cos(a) * 160, y: 10 + Math.sin(a) * 30, r: 22 + (i % 3) * 4 }
})

const brickPath = (() => {
  let d = ''
  for (let y = 60; y < 720; y += 60) {
    d += `M 0 ${y} L 1600 ${y} `
    const off = (y / 60) % 2 ? 0 : 60
    for (let x = off; x < 1600; x += 120) d += `M ${x} ${y} L ${x} ${y + 60} `
  }
  return d
})()

const banners = [
  { x: 200, k: 'period', e: 'gold' },
  { x: 600, k: 'red', e: 'gold' },
  { x: 1000, k: 'cloth-b', e: 'gold' },
  { x: 1400, k: 'period', e: 'gold' },
]

const tiles = (() => {
  const out: { x: number; y: number; w: number; h: number }[] = []
  const rows = [
    { y: 612, h: 70, w: 100 },
    { y: 682, h: 90, w: 130 },
    { y: 772, h: 128, w: 170 },
  ]
  rows.forEach((row, ri) => {
    for (let x = ri % 2 ? 0 : -row.w / 2, k = 0; x < 1600; x += row.w, k++)
      if (k % 2) out.push({ x, y: row.y, w: row.w, h: row.h })
  })
  return out
})()

const br = rng(11)
const books = (() => {
  const out: {
    x: number
    y: number
    w: number
    h: number
    c: string
    t?: string
  }[] = []
  const colors = [
    'cloth-a',
    'cloth-b',
    'cloth-d',
    'green-2',
    'gold',
    'wood-3',
    'red',
  ]
  for (const shelf of [290, 450, 610, 740]) {
    let x = 100
    while (x < 470) {
      const w = 18 + br() * 22
      const h = 90 + br() * 46
      const lean = br() > 0.88 && x < 420
      out.push({
        x,
        y: shelf - h,
        w,
        h,
        c: colors[Math.floor(br() * colors.length)]!,
        t: lean ? `rotate(14 ${x} ${shelf})` : undefined,
      })
      x += w + 3 + (lean ? 26 : 0)
    }
  }
  return out
})()

const corners = [
  [90, 80],
  [1510, 80],
  [1510, 820],
  [90, 820],
]
const ruled = Array.from({ length: 12 }, (_, i) => 160 + i * 52)
</script>
