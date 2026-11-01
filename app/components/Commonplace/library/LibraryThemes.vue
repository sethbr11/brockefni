<template>
  <section
    id="cp-panel-themes"
    role="tabpanel"
    aria-labelledby="cp-tab-themes"
    class="cp-lib__panel"
  >
    <ul v-if="themeRows.length" class="cp-list">
      <li v-for="t in themeRows" :key="t.theme.id">
        <NuxtLink
          v-if="t.first"
          :to="`/commonplace/read/${t.first.id}?from=tag:${t.theme.id}`"
          class="cp-list__row"
        >
          <span class="cp-list__main">
            <span class="cp-list__title">{{ t.theme.label }}</span>
            <span v-if="t.theme.description" class="cp-list__desc">{{
              t.theme.description
            }}</span>
          </span>
          <span class="cp-list__count"
            >{{ t.count }} {{ t.count === 1 ? 'work' : 'works' }}</span
          >
        </NuxtLink>
        <div v-else class="cp-list__row is-empty">
          <span class="cp-list__main">
            <span class="cp-list__title">{{ t.theme.label }}</span>
            <span v-if="t.theme.description" class="cp-list__desc">{{
              t.theme.description
            }}</span>
          </span>
          <span class="cp-list__count"
            >{{ t.count }} {{ t.count === 1 ? 'work' : 'works' }}</span
          >
        </div>
      </li>
    </ul>
    <div v-else class="cp-empty">
      <IlluminatedInitial letter="T" size="3.25rem" faint />
      <h2 class="cp-empty__title">No headings yet</h2>
      <p>
        Themes are the commonplace headings, the <em>loci communes</em> under
        which passages are gathered: love, kingship, the fall, fortune. Once
        headings exist, every work and passage filed under one can be read in
        sequence here.
      </p>
      <p class="cp-empty__hint">
        Add themes to <code>themes</code> in
        <code>app/assets/data/commonplaceData.ts</code>, then reference their
        ids in an entry's or passage's <code>tags</code>.
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { themes, getEntriesByTag } from '@/assets/data/commonplaceData'
import IlluminatedInitial from '@/components/Commonplace/IlluminatedInitial.vue'

const themeRows = computed(() =>
  themes.map((theme) => {
    const list = getEntriesByTag(theme.id)
    return { theme, count: list.length, first: list[0] }
  })
)
</script>

<style scoped>
.cp-list {
  list-style: none;
  margin: 0;
  padding: 0;
  border-top: 1px solid var(--cp-rule);
}
.cp-list__row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.9rem 0.25rem;
  border-bottom: 1px solid var(--cp-rule);
  color: inherit;
  text-decoration: none;
}
@media (hover: hover) {
  a.cp-list__row:hover .cp-list__title {
    color: var(--cp-accent-ink);
  }
}
.cp-list__row.is-empty {
  opacity: 0.6;
}
.cp-list__main {
  display: grid;
  gap: 0.2rem;
}
.cp-list__title {
  font-family: var(--cp-serif);
  font-size: 1.2rem;
  color: var(--cp-ink);
}
.cp-list__desc {
  font-size: 0.85rem;
  color: var(--cp-text-muted);
}
.cp-list__count {
  font-size: 0.78rem;
  color: var(--cp-text-muted);
  white-space: nowrap;
}

.cp-empty {
  max-width: 34rem;
  margin: 2rem auto;
  text-align: center;
  color: var(--cp-text-muted);
}
.cp-empty__title {
  margin: 1.1rem 0 0.6rem;
  font-family: var(--cp-serif);
  font-weight: 500;
  font-size: 1.5rem;
  color: var(--cp-ink);
}
.cp-empty p {
  margin: 0 0 0.8rem;
  line-height: 1.6;
  font-size: 0.95rem;
}
.cp-empty__hint {
  font-size: 0.82rem !important;
}
.cp-empty code {
  font-size: 0.85em;
  padding: 0.05rem 0.3rem;
  border-radius: 3px;
  background: var(--cp-chip-bg);
  color: var(--cp-text);
}
</style>
