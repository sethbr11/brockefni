<!--
  Dev-only scene preview (404 in production). ?id=<scene>&t=<seconds> pauses at a time,
  &dark=1 previews dark mode, ?id=kit shows every primitive.
-->
<template>
  <div class="sp">
    <header class="sp-bar">
      <strong>Scene preview</strong>
      <NuxtLink
        v-for="s in scenes"
        :key="s.id"
        :to="{ query: { ...route.query, id: s.id, t: undefined } }"
        :class="{ on: id === s.id }"
        >{{ s.id }}</NuxtLink
      >
      <NuxtLink
        :to="{ query: { ...route.query, id: 'kit' } }"
        :class="{ on: id === 'kit' }"
        >kit</NuxtLink
      >
      <span class="sp-sep" />
      <button type="button" @click="replay">Replay</button>
      <button type="button" @click="toggleDark">
        {{ isDark ? 'Light' : 'Dark' }}
      </button>
      <label>hold <input v-model="hold" type="checkbox" /></label>
      <label v-if="id !== 'kit'"
        >t
        <input
          v-model.number="scrub"
          type="range"
          min="0"
          max="6"
          step="0.05"
          @change="seekTo"
        />
        {{ seek ?? '—' }}</label
      >
      <button v-if="seek != null" type="button" @click="clearSeek">play</button>
      <select v-if="id === 'fallback'" v-model="fbPeriod">
        <option v-for="p in periodIds" :key="p" :value="p">{{ p }}</option>
      </select>
      <span class="sp-status">{{ status }}</span>
    </header>

    <main class="sp-main">
      <div v-if="id === 'kit'" class="cp-scene sp-kit">
        <svg viewBox="0 0 1600 1800" class="sp-kit-svg">
          <rect width="1600" height="1800" :fill="c('paper')" />
          <Figure
            :x="130"
            :y="360"
            :scale="0.8"
            hat="crown"
            beard="long"
            robe="cloth-b"
            mood="happy"
          />
          <Figure
            :x="330"
            :y="360"
            :scale="0.8"
            hat="helmet"
            body="tunic"
            robe="metal"
            cape="cloth-a"
            belt="gold"
            mood="stern"
            :arm-r="-150"
          >
            <template #hand-r><Sword :rotate="180" :scale="0.8" /></template>
          </Figure>
          <Figure
            :x="530"
            :y="360"
            :scale="0.8"
            hat="wimple"
            robe="cloth-c"
            hat-color="cloth-b"
          />
          <Figure
            :x="730"
            :y="360"
            :scale="0.8"
            hat="hood"
            robe="cloth-d"
            mood="sad"
            :arm-l="40"
          />
          <Figure
            :x="930"
            :y="360"
            :scale="0.8"
            hat="hat"
            robe="ink"
            trim="highlight"
            mood="alarmed"
          />
          <Figure
            :x="1130"
            :y="360"
            :scale="0.8"
            hat="cap"
            hair="long"
            robe="cloth-a"
            :arm-r="-60"
          >
            <template #hand-r><Book :scale="0.5" :rotate="60" /></template>
          </Figure>
          <Figure
            :x="1330"
            :y="360"
            :scale="0.8"
            wings
            robe="highlight"
            hair="long"
            hair-color="gold"
          />
          <Figure :x="1500" :y="360" :scale="0.8" silhouette hair="long" />
          <Monster :x="200" :y="860" :scale="0.9" />
          <Horse
            :x="560"
            :y="860"
            :scale="0.8"
            coat="green"
            mane="green-2"
            saddle="gold"
          />
          <Figure
            :x="560"
            :y="740"
            :scale="0.7"
            skin="green"
            robe="green"
            hair="long"
            hair-color="green-2"
            beard="long"
          />
          <Claw :x="860" :y="700" :arm="120" />
          <Ship :x="1250" :y="860" :scale="0.7" />
          <Sword :x="80" :y="1240" />
          <Axe :x="200" :y="1260" color="green" />
          <Book :x="380" :y="1240" />
          <Book :x="580" :y="1240" open />
          <Rood :x="800" :y="1260" :scale="0.7" glow />
          <Tree :x="1000" :y="1260" :scale="0.7" kind="apple" />
          <Tree :x="1200" :y="1260" :scale="0.6" kind="pine" />
          <Tree :x="1400" :y="1260" :scale="0.6" kind="bare" />
          <Cat :x="100" :y="1500" />
          <Mouse :x="260" :y="1500" />
          <Rooster :x="420" :y="1500" :scale="0.8" />
          <Candle :x="580" :y="1500" />
          <Scroll :x="740" :y="1300" :length="180" :width="150" />
          <Quill :x="900" :y="1500" />
          <Apple :x="1050" :y="1440" />
          <Apple :x="1140" :y="1440" bitten />
          <Serpent :x="1300" :y="1500" :scale="0.7" />
          <Ring :x="1500" :y="1440" />
          <Shield
            :x="100"
            :y="1650"
            shape="heater"
            color="red"
            emblem="pentangle"
          />
          <Shield :x="280" :y="1650" />
          <Goblet :x="420" :y="1720" />
          <Table :x="700" :y="1760" :width="400" />
          <Fire :x="1050" :y="1760" />
          <Burst :x="1300" :y="1650" />
        </svg>
        <div class="sp-backdrops">
          <svg v-for="v in backdrops" :key="v" viewBox="0 0 1600 900">
            <Backdrop :variant="v" />
            <text
              x="40"
              y="70"
              font-size="48"
              :fill="c('highlight')"
              stroke-width="8"
              :stroke="c('ink')"
              paint-order="stroke"
            >
              {{ v }}
            </text>
          </svg>
          <svg
            v-for="v in nightBackdrops"
            :key="`n${v}`"
            viewBox="0 0 1600 900"
          >
            <Backdrop :variant="v" night door-open />
            <text
              x="40"
              y="70"
              font-size="48"
              :fill="c('highlight')"
              stroke-width="8"
              :stroke="c('ink')"
              paint-order="stroke"
            >
              {{ v }} (night)
            </text>
          </svg>
        </div>
      </div>

      <div v-else class="sp-reader">
        <article class="sp-page">
          <h1>{{ cur.title }}</h1>
          <p v-for="i in 6" :key="i">
            Lorem ipsum stand-in for the reader page. The overlay covers this
            container (position:relative) and fades to reveal it when the scene
            finishes, is clicked, or Esc is pressed.
          </p>
        </article>
        <SceneOverlay
          v-if="showOverlay"
          :key="runKey"
          :scene-id="id === 'fallback' ? undefined : id"
          :period="cur.period"
          :title="cur.title"
          @done="onDone"
        />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, provide, reactive, ref, watch } from 'vue'
import { allEntries, type PeriodId } from '@/assets/data/commonplaceData'
import SceneOverlay from '@/components/Commonplace/scenes/SceneOverlay.vue'
import { SCENE_DEBUG } from '@/components/Commonplace/scenes/kit/useSceneTimeline'
import {
  Apple,
  Axe,
  Backdrop,
  Book,
  Burst,
  Candle,
  Cat,
  Claw,
  Figure,
  Fire,
  Goblet,
  Horse,
  Monster,
  Mouse,
  Quill,
  Ring,
  Rood,
  Rooster,
  Scroll,
  Serpent,
  Shield,
  Ship,
  Sword,
  Table,
  Tree,
  c,
} from '@/components/Commonplace/scenes/kit'
import '@/components/Commonplace/scenes/kit/scene-tokens.css'

definePageMeta({ layout: false })

// Dev-only scene preview; not part of the published site.
if (!import.meta.dev)
  throw createError({ statusCode: 404, statusMessage: 'Not Found' })

const route = useRoute()
const router = useRouter()
const isDark = useState('isDark', () => false)

const periodIds: PeriodId[] = [
  'old-english',
  'middle-english',
  'early-modern',
  'restoration',
]
const scenes = [
  ...allEntries().map((e) => ({ id: e.id, title: e.title, period: e.period })),
  {
    id: 'fallback',
    title: 'The Dream of the Rood',
    period: 'old-english' as PeriodId,
  },
]
const backdrops = [
  'mead-hall',
  'castle-hall',
  'night-sky',
  'hills',
  'sea',
  'forest',
  'chapel',
  'study',
  'garden',
  'parchment',
] as const
const nightBackdrops = [
  'hills',
  'sea',
  'forest',
  'garden',
  'mead-hall',
] as const

const id = computed(() => String(route.query.id ?? 'beowulf'))
const fbPeriod = ref<PeriodId>(
  (route.query.period as PeriodId) || 'old-english'
)
const cur = computed(() => {
  const s = scenes.find((x) => x.id === id.value) ?? scenes[scenes.length - 1]!
  if (s.id !== 'fallback') return s
  return {
    ...s,
    title: String(route.query.title ?? s.title),
    period: fbPeriod.value,
  }
})

const seek = computed(() =>
  route.query.t != null && route.query.t !== '' ? Number(route.query.t) : null
)
const scrub = ref(seek.value ?? 0)
const hold = ref(route.query.hold !== '0')
const debug = reactive({ seek: seek.value, hold: hold.value })
provide(SCENE_DEBUG, debug)

const runKey = ref(0)
const showOverlay = ref(true)
const status = ref('playing')

function replay() {
  debug.seek = seek.value
  debug.hold = hold.value
  showOverlay.value = true
  status.value = debug.seek != null ? `paused @ ${debug.seek}s` : 'playing'
  runKey.value++
}
function onDone() {
  showOverlay.value = false
  status.value = 'done (emitted)'
}
function seekTo() {
  router.replace({ query: { ...route.query, t: String(scrub.value) } })
}
function clearSeek() {
  router.replace({ query: { ...route.query, t: undefined } })
}
watch([id, seek, fbPeriod, hold], replay)
replay()

// ?dark=1 keeps dark mode across reloads (app.vue re-reads the site preference on mount)
function applyDark() {
  isDark.value = route.query.dark === '1'
  document.documentElement.classList.toggle('darkmode', isDark.value)
}
function toggleDark() {
  router.replace({
    query: { ...route.query, dark: isDark.value ? undefined : '1' },
  })
}
watch(() => route.query.dark, applyDark)
onMounted(() => setTimeout(applyDark, 0))
</script>

<style scoped>
.sp {
  min-height: 100vh;
  background: #f3efe6;
  color: #222;
  font:
    14px/1.4 system-ui,
    sans-serif;
}
:global(html.darkmode) .sp {
  background: #161412;
  color: #eee;
}
.sp-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  padding: 10px 16px;
  border-bottom: 1px solid #8884;
}
.sp-bar a {
  color: inherit;
  padding: 3px 8px;
  border-radius: 6px;
}
.sp-bar a.on {
  background: #d87628;
  color: #fff;
}
.sp-sep {
  flex: 1;
}
.sp-status {
  opacity: 0.6;
}
/* screenshots in a background pane don't advance CSS animations */
.sp-reader :deep(.cp-scene-overlay) {
  animation: none;
}
.sp-reader {
  position: relative;
  min-height: calc(100vh - 56px);
}
.sp-page {
  max-width: 680px;
  margin: 0 auto;
  padding: 40px 16px;
}
.sp-kit {
  padding: 16px;
}
.sp-kit-svg {
  width: 100%;
  max-width: 1200px;
  display: block;
  margin: 0 auto;
}
.sp-backdrops {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 12px;
  margin-top: 16px;
}
.sp-backdrops svg {
  width: 100%;
  border-radius: 8px;
}
</style>
