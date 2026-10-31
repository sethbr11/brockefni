<template>
  <div class="cp-root cp-landing">
    <section class="cp-landing__inner">
      <p class="cp-landing__eyebrow">A personal literary archive</p>
      <h1 class="cp-landing__title">Commonplace Book</h1>

      <div class="cp-landing__text">
        <p class="cp-landing__lede">
          A digital commonplace book: memorable passages copied out by hand,
          with close readings and reflections, gathered from what I read across
          eras, genres, and disciplines.
        </p>
        <p class="cp-landing__history">
          From the Renaissance onward, readers kept commonplace books: notebooks
          of quotations and ideas sorted under thematic headings, the
          <em>loci communes</em>. Erasmus taught the method, Milton kept one,
          and so did Virginia Woolf. This is my continuation of the practice.
        </p>
      </div>

      <NuxtLink to="/commonplace/library" class="cp-landing__enter">
        Enter the Library <span aria-hidden="true">→</span>
      </NuxtLink>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '#app'
import '@/components/Commonplace/commonplace-tokens.css'

const description =
  'A personal literary archive and digital commonplace book: memorable passages, close readings, and reflections from everything I read.'

useHead({
  title: 'Commonplace Book | Seth Brock',
  meta: [
    { name: 'description', content: description },
    { property: 'og:title', content: 'Commonplace Book' },
    { property: 'og:description', content: description },
    { property: 'og:url', content: 'https://brockefni.com/commonplace' },
    { property: 'og:type', content: 'website' },
  ],
  link: [{ rel: 'canonical', href: 'https://brockefni.com/commonplace' }],
})
</script>

<style scoped>
/* one hero-sized screen: viewport minus the site header */
.cp-landing {
  min-height: calc(100vh - 58px);
  min-height: calc(100dvh - 58px);
  display: flex;
  align-items: center;
  box-sizing: border-box;
  background: var(--cp-bg);
  color: var(--cp-text);
  padding: 3rem 1.5rem;
  transition: background-color 0.3s ease;
}

.cp-landing__inner {
  width: 100%;
  max-width: 44rem;
  margin: 0 auto;
}

.cp-landing__eyebrow {
  margin: 0 0 0.9rem;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--cp-accent-ink);
}

.cp-landing__title {
  margin: 0;
  font-family: var(--cp-serif);
  font-weight: 600;
  font-size: clamp(2.6rem, 6.5vw, 4.2rem);
  line-height: 1.05;
  letter-spacing: -0.02em;
  color: var(--cp-ink);
}

.cp-landing__text {
  margin-top: 1.75rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--cp-rule);
  display: grid;
  gap: 1rem;
}

.cp-landing__text p {
  margin: 0;
  font-family: var(--cp-serif);
  line-height: 1.6;
  max-width: 60ch;
}
.cp-landing__lede {
  font-size: clamp(1.08rem, 1.8vw, 1.22rem);
  color: var(--cp-ink);
}
.cp-landing__history {
  font-size: 1rem;
  color: var(--cp-text-muted);
}

.cp-landing__enter {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 2rem;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  background: var(--cp-accent);
  color: var(--cp-on-accent);
  font-weight: 600;
  letter-spacing: 0.02em;
  text-decoration: none;
  transition:
    transform var(--cp-dur) var(--cp-ease),
    box-shadow var(--cp-dur) ease;
}
.cp-landing__enter:hover {
  transform: translateY(-1px);
  box-shadow: var(--cp-shadow-lift);
}
.cp-landing__enter span {
  transition: transform var(--cp-dur) var(--cp-ease);
}
.cp-landing__enter:hover span {
  transform: translateX(3px);
}
</style>
