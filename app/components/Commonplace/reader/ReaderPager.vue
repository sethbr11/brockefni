<template>
  <nav class="cp-pager" aria-label="Works">
    <NuxtLink
      v-if="prev"
      :to="prev.to"
      class="cp-pager__btn cp-pager__btn--prev"
      rel="prev"
    >
      <span class="cp-pager__dir"
        ><span aria-hidden="true">←</span> Previous</span
      >
      <span class="cp-pager__title">{{ prev.title }}</span>
    </NuxtLink>
    <span v-else class="cp-pager__spacer" />

    <NuxtLink :to="backTo" class="cp-pager__back">
      <span>{{ backLabel }}</span>
      <kbd class="cp-pager__kbd">Esc</kbd>
    </NuxtLink>

    <NuxtLink
      v-if="next"
      :to="next.to"
      class="cp-pager__btn cp-pager__btn--next"
      rel="next"
    >
      <span class="cp-pager__dir">Next <span aria-hidden="true">→</span></span>
      <span class="cp-pager__title">{{ next.title }}</span>
    </NuxtLink>
    <span v-else class="cp-pager__spacer" />
  </nav>
</template>

<script setup lang="ts">
export interface ReaderPagerLink {
  title: string
  to: string
}

defineProps<{
  prev?: ReaderPagerLink
  next?: ReaderPagerLink
  backTo: string
  backLabel: string
}>()
</script>

<style scoped>
.cp-pager {
  flex: none;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 1rem;
  padding: 0.6rem 1.25rem;
  border-top: 1px solid var(--cp-rule);
  background: var(--cp-bg);
}
.cp-pager__btn {
  display: grid;
  gap: 0.1rem;
  min-width: 0;
  padding: 0.35rem 0.6rem;
  border-radius: 4px;
  color: inherit;
  text-decoration: none;
  transition: background-color var(--cp-dur) ease;
}
.cp-pager__btn:hover {
  background: var(--cp-chip-bg);
}
.cp-pager__btn--prev {
  justify-self: start;
  text-align: left;
}
.cp-pager__btn--next {
  justify-self: end;
  text-align: right;
}
.cp-pager__dir {
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--cp-text-muted);
}
.cp-pager__title {
  font-family: var(--cp-serif);
  font-size: 1rem;
  color: var(--cp-ink);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 28ch;
}
.cp-pager__btn:hover .cp-pager__title {
  color: var(--cp-accent-ink);
}

.cp-pager__back {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.78rem;
  color: var(--cp-text-muted);
  text-decoration: none;
}
.cp-pager__back:hover {
  color: var(--cp-accent-ink);
}
.cp-pager__kbd {
  font-family: var(--cp-sans);
  font-size: 0.65rem;
  padding: 0.05rem 0.35rem;
  border: 1px solid var(--cp-rule-strong);
  border-radius: 3px;
  color: var(--cp-text-faint);
}

@media (max-width: 820px) {
  .cp-pager {
    position: sticky;
    bottom: 0;
    padding: 0.5rem 0.75rem;
    gap: 0.5rem;
  }
  .cp-pager__title {
    max-width: 14ch;
    font-size: 0.92rem;
  }
  .cp-pager__kbd {
    display: none;
  }
}
</style>
