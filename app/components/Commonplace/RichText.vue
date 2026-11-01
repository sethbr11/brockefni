<!--
  Light formatting for summaries and commentary, written as plain strings:
  blank line = new paragraph, an ALL-CAPS line = section heading,
  "1. " lines = numbered list, "- " lines = bullet list, *text* = italics,
  **text** = bold. Renders elements directly (no v-html).
-->
<template>
  <div class="cp-rich">
    <template v-for="(b, i) in blocks" :key="i">
      <h3 v-if="b.type === 'h'" class="cp-rich__h">
        <RichInline :segs="b.segs" />
      </h3>
      <p v-else-if="b.type === 'p'" class="cp-rich__p">
        <RichInline :segs="b.segs" />
      </p>
      <component
        :is="b.type"
        v-else
        class="cp-rich__list"
        :class="`cp-rich__list--${b.type}`"
      >
        <li v-for="(item, j) in b.items" :key="j">
          <RichInline :segs="item" />
        </li>
      </component>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, defineComponent, h, type PropType } from 'vue'

interface Seg {
  text: string
  em?: boolean
  strong?: boolean
}
type Block =
  | { type: 'h' | 'p'; segs: Seg[] }
  | { type: 'ol' | 'ul'; items: Seg[][] }

const props = defineProps<{ text: string }>()

const OL = /^\d+\.\s+/
const UL = /^[-•]\s+/
/** a line with letters and no lowercase reads as a heading ("THE COSMIC ROOF") */
const isHeading = (l: string) =>
  l.length <= 90 && /\p{L}/u.test(l) && !/\p{Ll}/u.test(l)

function inline(text: string): Seg[] {
  const out: Seg[] = []
  const re = /\*\*([^*]+)\*\*|\*([^*]+)\*/g
  let last = 0
  for (const m of text.matchAll(re)) {
    const at = m.index ?? 0
    if (at > last) out.push({ text: text.slice(last, at) })
    out.push(m[1] ? { text: m[1], strong: true } : { text: m[2]!, em: true })
    last = at + m[0].length
  }
  if (last < text.length) out.push({ text: text.slice(last) })
  return out
}

const blocks = computed<Block[]>(() => {
  const out: Block[] = []
  for (const chunk of props.text.split(/\n\s*\n/)) {
    let para: string[] = []
    const flush = () => {
      if (para.length) out.push({ type: 'p', segs: inline(para.join(' ')) })
      para = []
    }
    for (const raw of chunk.split('\n')) {
      const line = raw.trim()
      if (!line) continue
      const list = OL.test(line) ? 'ol' : UL.test(line) ? 'ul' : null
      if (list) {
        flush()
        const item = inline(line.replace(list === 'ol' ? OL : UL, ''))
        const prev = out[out.length - 1]
        if (prev?.type === list) prev.items.push(item)
        else out.push({ type: list, items: [item] })
      } else if (isHeading(line)) {
        flush()
        out.push({ type: 'h', segs: inline(line) })
      } else {
        para.push(line)
      }
    }
    flush()
  }
  return out
})

const RichInline = defineComponent({
  props: { segs: { type: Array as PropType<Seg[]>, required: true } },
  setup(p) {
    return () =>
      p.segs.map((s) =>
        s.strong ? h('strong', s.text) : s.em ? h('em', s.text) : s.text
      )
  },
})
</script>

<style scoped>
.cp-rich {
  font-family: var(--cp-serif);
  font-size: 1.08rem;
  line-height: 1.7;
  color: var(--cp-ink);
}

.cp-rich__p {
  margin: 0 0 1em;
}
.cp-rich__p:last-child {
  margin-bottom: 0;
}

.cp-rich__h {
  margin: 1.9em 0 0.6em;
  padding-top: 1.1em;
  border-top: 1px solid var(--cp-rule);
  font-family: var(--cp-sans);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  line-height: 1.4;
  color: var(--cp-text-muted);
}
.cp-rich__h:first-child {
  margin-top: 0;
  padding-top: 0;
  border-top: 0;
}

.cp-rich__list {
  margin: 0 0 1.1em;
  padding: 0;
  list-style: none;
}
.cp-rich__list li {
  position: relative;
  padding-left: 2rem;
  margin-bottom: 0.55em;
}
.cp-rich__list--ol {
  counter-reset: cp-rich;
}
.cp-rich__list--ol li {
  counter-increment: cp-rich;
}
.cp-rich__list--ol li::before {
  content: counter(cp-rich);
  position: absolute;
  left: 0;
  top: 0.1em;
  width: 1.4rem;
  font-family: var(--cp-sans);
  font-size: 0.8em;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  text-align: right;
  color: var(--cp-period);
}
.cp-rich__list--ul li::before {
  content: '';
  position: absolute;
  left: 0.7rem;
  top: 0.72em;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--cp-period);
}

.cp-rich :deep(em) {
  font-style: italic;
}
.cp-rich :deep(strong) {
  font-weight: 600;
}
</style>
