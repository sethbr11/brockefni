<!-- Glossary card for a literary device: definition plus an example from the syllabus. -->
<template>
  <dialog
    ref="dialog"
    class="cp-device"
    :aria-labelledby="titleId"
    @close="emit('close')"
    @click="onBackdrop"
  >
    <div v-if="device" class="cp-device__body">
      <header class="cp-device__head">
        <h2 :id="titleId" class="cp-device__title">{{ device.label }}</h2>
        <button
          type="button"
          class="cp-device__close"
          aria-label="Close"
          @click="dialog?.close()"
        >
          ×
        </button>
      </header>

      <p v-if="device.definition" class="cp-device__def">
        {{ device.definition }}
      </p>
      <p v-else class="cp-device__def cp-device__def--pending">
        A definition and example for this device haven’t been added to the
        glossary yet.
      </p>
      <p v-if="detail" class="cp-device__detail">
        In this work: <em>{{ detail }}</em>
      </p>

      <figure v-if="device.example" class="cp-device__example">
        <h3 class="cp-label">Example</h3>
        <blockquote class="cp-device__quote" v-text="device.example.text" />
        <p
          v-if="device.example.translation"
          class="cp-device__translation"
          v-text="device.example.translation"
        />
        <figcaption class="cp-device__cite">
          —
          <NuxtLink
            v-if="exampleLink"
            :to="exampleLink"
            class="cp-device__work"
            >{{ device.example.work }}</NuxtLink
          >
          <span v-else class="cp-device__work">{{ device.example.work }}</span>
          <template v-if="device.example.citation"
            >, {{ device.example.citation }}</template
          >
        </figcaption>
      </figure>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, useId, watch } from 'vue'
import { getEntry } from '@/assets/data/commonplaceData'
import type { Device } from '@/assets/data/commonplaceDevices'
import './reader-shared.css'

const props = defineProps<{
  device: Device | null
  detail?: string
  /** the work being read, so the example doesn't link back to itself */
  currentEntryId: string
}>()
const emit = defineEmits<{ (e: 'close'): void }>()

const dialog = ref<HTMLDialogElement | null>(null)
const titleId = `cp-device-${useId()}`

const exampleLink = computed(() => {
  const id = props.device?.example?.entryId
  if (!id || id === props.currentEntryId || !getEntry(id)) return undefined
  return `/commonplace/read/${id}`
})

watch(
  () => props.device,
  async (d) => {
    await nextTick()
    if (d && !dialog.value?.open) dialog.value?.showModal()
    else if (!d && dialog.value?.open) dialog.value.close()
  }
)

/** clicks on the dialog element itself land on the backdrop area */
function onBackdrop(e: MouseEvent) {
  if (e.target === dialog.value) dialog.value?.close()
}
</script>

<style scoped>
.cp-device {
  width: min(34rem, calc(100vw - 2rem));
  max-height: calc(100dvh - 3rem);
  padding: 0;
  border: 1px solid var(--cp-rule);
  border-radius: 10px;
  background: var(--cp-surface);
  color: var(--cp-text);
  box-shadow: var(--cp-shadow-lift);
}
.cp-device::backdrop {
  background: var(--cp-overlay);
}

.cp-device__body {
  padding: 1.5rem 1.75rem 1.75rem;
}

.cp-device__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
}
.cp-device__title {
  margin: 0;
  font-family: var(--cp-serif);
  font-size: 1.45rem;
  font-weight: 600;
  color: var(--cp-ink);
}
.cp-device__close {
  border: 0;
  background: none;
  padding: 0 0.25rem;
  font-size: 1.6rem;
  line-height: 1;
  color: var(--cp-text-muted);
  cursor: pointer;
}
@media (hover: hover) {
  .cp-device__close:hover {
    color: var(--cp-text);
  }
}
.cp-device__close:focus-visible {
  outline: 2px solid var(--cp-focus);
  outline-offset: 2px;
  border-radius: 4px;
}

.cp-device__def {
  margin: 0.75rem 0 0;
  font-family: var(--cp-serif);
  font-size: 1.05rem;
  line-height: 1.6;
  color: var(--cp-ink);
}
.cp-device__def--pending {
  font-style: italic;
  color: var(--cp-text-muted);
}
.cp-device__detail {
  margin: 0.5rem 0 0;
  font-size: 0.9rem;
  color: var(--cp-text-muted);
}

.cp-device__example {
  margin: 1.5rem 0 0;
  padding-top: 1.25rem;
  border-top: 1px solid var(--cp-rule);
}
.cp-device__quote {
  margin: 0;
  padding-left: 1rem;
  border-left: 2px solid var(--cp-period);
  font-family: var(--cp-serif);
  font-size: 1.05rem;
  line-height: 1.6;
  color: var(--cp-ink);
  white-space: pre-wrap;
}
.cp-device__translation {
  margin: 0.6rem 0 0;
  padding-left: 1rem;
  font-style: italic;
  font-size: 0.95rem;
  line-height: 1.55;
  color: var(--cp-text-muted);
  white-space: pre-wrap;
}
.cp-device__cite {
  margin-top: 0.75rem;
  padding-left: 1rem;
  font-size: 0.85rem;
  color: var(--cp-text-muted);
}
.cp-device__work {
  font-style: italic;
  color: inherit;
}
a.cp-device__work {
  color: var(--cp-accent-ink);
  text-decoration: none;
}
@media (hover: hover) {
  a.cp-device__work:hover {
    text-decoration: underline;
  }
}
</style>
