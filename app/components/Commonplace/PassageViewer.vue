<!-- Passage area: one passage at a time, with optional translation toggle. -->
<template>
  <div class="cp-pv">
    <div v-if="passages.length > 1" class="cp-pv__nav">
      <button
        type="button"
        class="cp-pv__arrow"
        :disabled="index === 0"
        aria-label="Previous passage"
        @click="go(index - 1)"
      >
        <span aria-hidden="true">‹</span>
      </button>
      <span class="cp-pv__count" aria-live="polite"
        >Passage {{ index + 1 }} / {{ passages.length }}</span
      >
      <span class="cp-pv__dots">
        <button
          v-for="(_, i) in passages"
          :key="i"
          type="button"
          class="cp-pv__dot"
          :class="{ 'is-active': i === index }"
          :aria-label="`Passage ${i + 1}`"
          :aria-current="i === index ? 'true' : undefined"
          @click="go(i)"
        />
      </span>
      <button
        type="button"
        class="cp-pv__arrow"
        :disabled="index === passages.length - 1"
        aria-label="Next passage"
        @click="go(index + 1)"
      >
        <span aria-hidden="true">›</span>
      </button>
    </div>

    <Transition
      :name="dir > 0 ? 'cp-slide-next' : 'cp-slide-prev'"
      mode="out-in"
    >
      <figure v-if="current" :key="index" class="cp-pv__passage">
        <div
          v-if="current.translation"
          class="cp-pv__toggle"
          role="group"
          aria-label="Text version"
        >
          <button
            type="button"
            :aria-pressed="!showTranslation"
            @click="setTranslation(false)"
          >
            Original
          </button>
          <button
            type="button"
            :aria-pressed="showTranslation"
            @click="setTranslation(true)"
          >
            Translation
          </button>
        </div>
        <Transition name="cp-fade" mode="out-in">
          <blockquote
            :key="showTranslation ? 't' : 'o'"
            class="cp-pv__text"
            :lang="showTranslation ? 'en' : undefined"
            v-text="showTranslation ? current.translation : current.text"
          />
        </Transition>
        <figcaption class="cp-pv__cite">{{ current.citation }}</figcaption>
        <p v-if="current.note" class="cp-pv__note">{{ current.note }}</p>
      </figure>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { Passage } from '@/assets/data/commonplaceData'

const props = defineProps<{ passages: Passage[] }>()

const index = ref(0)
const dir = ref(1)
const translated = ref<Record<number, boolean>>({})

const current = computed(() => props.passages[index.value])
const showTranslation = computed(
  () => !!current.value?.translation && !!translated.value[index.value]
)

watch(
  () => props.passages,
  () => {
    index.value = 0
    translated.value = {}
  }
)

function go(i: number) {
  if (i < 0 || i >= props.passages.length || i === index.value) return
  dir.value = i > index.value ? 1 : -1
  index.value = i
}

function setTranslation(v: boolean) {
  translated.value = { ...translated.value, [index.value]: v }
}

defineExpose({
  next: () => go(index.value + 1),
  prev: () => go(index.value - 1),
})
</script>

<style scoped>
.cp-pv__nav {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  font-size: 0.75rem;
  color: var(--cp-text-muted);
}
.cp-pv__count {
  letter-spacing: 0.06em;
}
.cp-pv__dots {
  display: inline-flex;
  gap: 0.15rem;
}
.cp-pv__dot {
  width: 18px;
  height: 18px;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  position: relative;
}
.cp-pv__dot::after {
  content: '';
  position: absolute;
  inset: 6px;
  border-radius: 50%;
  border: 1px solid var(--cp-text-faint);
  transition:
    background-color var(--cp-dur) ease,
    border-color var(--cp-dur) ease;
}
.cp-pv__dot.is-active::after {
  background: var(--cp-period);
  border-color: var(--cp-period);
}

.cp-pv__arrow {
  width: 28px;
  height: 28px;
  display: inline-grid;
  place-items: center;
  border: 1px solid var(--cp-rule-strong);
  border-radius: 50%;
  background: transparent;
  color: var(--cp-text);
  font-size: 1.1rem;
  line-height: 1;
  cursor: pointer;
}
.cp-pv__arrow:hover:not(:disabled) {
  border-color: var(--cp-period);
  color: var(--cp-period);
}
.cp-pv__arrow:disabled {
  opacity: 0.35;
  cursor: default;
}

.cp-pv__passage {
  margin: 0;
}

.cp-pv__toggle {
  display: inline-flex;
  margin-bottom: 1.25rem;
  border: 1px solid var(--cp-rule-strong);
  border-radius: 999px;
  padding: 2px;
}
.cp-pv__toggle button {
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--cp-text-muted);
  font: inherit;
  font-size: 0.74rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  padding: 0.3rem 0.8rem;
  cursor: pointer;
}
.cp-pv__toggle button[aria-pressed='true'] {
  background: var(--cp-control-bg);
  color: var(--cp-text);
}

.cp-pv__text {
  margin: 0;
  padding-left: 1.25rem;
  border-left: 2px solid var(--cp-period);
  font-family: var(--cp-serif);
  font-size: clamp(1.15rem, 1.6vw, 1.4rem);
  line-height: 1.62;
  color: var(--cp-ink);
  /* keep line breaks and poetic spacing */
  white-space: pre-wrap;
  hanging-punctuation: first;
}

.cp-pv__cite {
  margin-top: 0.9rem;
  padding-left: 1.25rem;
  font-family: var(--cp-serif);
  font-style: italic;
  font-size: 0.98rem;
  color: var(--cp-text-muted);
}
.cp-pv__cite::before {
  content: '— ';
}

.cp-pv__note {
  margin: 0.9rem 0 0 1.25rem;
  max-width: 60ch;
  font-size: 0.85rem;
  line-height: 1.55;
  color: var(--cp-text-muted);
}

.cp-fade-enter-active,
.cp-fade-leave-active {
  transition: opacity var(--cp-dur) ease;
}
.cp-fade-enter-from,
.cp-fade-leave-to {
  opacity: 0;
}

.cp-slide-next-enter-active,
.cp-slide-next-leave-active,
.cp-slide-prev-enter-active,
.cp-slide-prev-leave-active {
  transition:
    opacity var(--cp-dur) ease,
    transform var(--cp-dur) var(--cp-ease);
}
.cp-slide-next-enter-from,
.cp-slide-prev-leave-to {
  opacity: 0;
  transform: translateX(12px);
}
.cp-slide-next-leave-to,
.cp-slide-prev-enter-from {
  opacity: 0;
  transform: translateX(-12px);
}
</style>
