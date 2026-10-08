<template>
  <div class="humanities-hub-page">
    <div class="container">
      <!-- Page Header -->
      <header class="hub-header animate-fade-in">
        <span class="hub-badge">DIGITAL GARDEN &amp; HUMANITIES</span>
        <h1 class="hub-title">The Humanities &amp; Arts</h1>
        <p class="hub-subtitle">
          Balancing software engineering and DevOps with studies in English Literature at Utah Valley University, critical reading, creative prose, visual art, and music.
        </p>
      </header>

      <!-- 4 Pillars Grid -->
      <div class="pillars-grid">
        <!-- 1. The Bookshelf -->
        <NuxtLink to="/humanities/books" class="pillar-card glass-panel">
          <div class="pillar-top">
            <div class="pillar-icon-box books-icon-box">
              <BookOpenIcon class="pillar-icon" />
            </div>
            <span class="pillar-count">{{ books.length }} Books Logged</span>
          </div>
          <div class="pillar-content">
            <h2 class="pillar-title">Interactive Bookshelf</h2>
            <p class="pillar-desc">
              Explore an interactive 3D shelf and catalogue of classic literature, literary criticism, speculative fiction, and reading notes.
            </p>
          </div>
          <div class="pillar-footer">
            <span class="pillar-action">
              Browse Bookshelf <ArrowRightIcon class="action-arrow" />
            </span>
          </div>
        </NuxtLink>

        <!-- 2. Writing & Essays -->
        <NuxtLink to="/humanities/writing" class="pillar-card glass-panel">
          <div class="pillar-top">
            <div class="pillar-icon-box writing-icon-box">
              <PenToolIcon class="pillar-icon" />
            </div>
            <span class="pillar-count">{{ writings.length }} Works</span>
          </div>
          <div class="pillar-content">
            <h2 class="pillar-title">Writing &amp; Essays</h2>
            <p class="pillar-desc">
              Creative stories, academic essays, and literary analyses written during my UVU coursework, including "I'll Shave Tomorrow".
            </p>
          </div>
          <div class="pillar-footer">
            <span class="pillar-action">
              Read Pieces <ArrowRightIcon class="action-arrow" />
            </span>
          </div>
        </NuxtLink>

        <!-- 3. Creative Studio & Music -->
        <NuxtLink to="/humanities/creative" class="pillar-card glass-panel">
          <div class="pillar-top">
            <div class="pillar-icon-box creative-icon-box">
              <SparklesIcon class="pillar-icon" />
            </div>
            <span class="pillar-count">Art &amp; Music</span>
          </div>
          <div class="pillar-content">
            <h2 class="pillar-title">Creative Studio &amp; Music</h2>
            <p class="pillar-desc">
              An interactive sketch-to-painting comparison slider, graphite concept studies, and instrumental practice across saxophone and piano.
            </p>
          </div>
          <div class="pillar-footer">
            <span class="pillar-action">
              Visit Studio <ArrowRightIcon class="action-arrow" />
            </span>
          </div>
        </NuxtLink>

        <!-- 4. UVU Academic Journey -->
        <NuxtLink to="/uvu" class="pillar-card glass-panel">
          <div class="pillar-top">
            <div class="pillar-icon-box uvu-icon-box">
              <GraduationCapIcon class="pillar-icon" />
            </div>
            <span class="pillar-count">UVU B.A.</span>
          </div>
          <div class="pillar-content">
            <h2 class="pillar-title">UVU Degree Overview</h2>
            <p class="pillar-desc">
              Detailed breakdown of my Bachelor of Arts in English (Literature Emphasis) degree plan, coursework schedule, and academic timeline.
            </p>
          </div>
          <div class="pillar-footer">
            <span class="pillar-action">
              View Degree Timeline <ArrowRightIcon class="action-arrow" />
            </span>
          </div>
        </NuxtLink>
      </div>

      <!-- Featured Spotlight: Currently Reading & Featured Story -->
      <section class="spotlight-section">
        <div class="spotlight-grid">
          <!-- Spotlight: Featured Writing -->
          <div class="spotlight-card glass-panel">
            <div class="spotlight-header">
              <span class="spotlight-label">Featured Story</span>
              <NuxtLink to="/humanities/writing" class="view-all-link">All Writings &rarr;</NuxtLink>
            </div>
            <div class="spotlight-body">
              <h3 class="spotlight-title">{{ featuredWriting.title }}</h3>
              <p class="spotlight-desc">{{ featuredWriting.summary }}</p>
              <div class="spotlight-meta">
                <span class="meta-tag">{{ featuredWriting.courseContext }}</span>
                <span class="meta-tag">{{ featuredWriting.readTime }}</span>
              </div>
            </div>
            <NuxtLink :to="`/humanities/writing/${featuredWriting.slug}`" class="spotlight-btn">
              Read Story <ArrowRightIcon class="btn-icon" />
            </NuxtLink>
          </div>

          <!-- Spotlight: Currently Reading Preview -->
          <div class="spotlight-card glass-panel">
            <div class="spotlight-header">
              <span class="spotlight-label">Currently Reading</span>
              <NuxtLink to="/humanities/books" class="view-all-link">Full Bookshelf &rarr;</NuxtLink>
            </div>
            <div class="currently-reading-list">
              <div
                v-for="book in currentlyReadingBooks"
                :key="book.id"
                class="reading-item"
              >
                <div
                  class="reading-spine-color"
                  :style="{ backgroundColor: book.spineColor || '#2c3e50' }"
                ></div>
                <div class="reading-details">
                  <h4 class="reading-title">{{ book.title }}</h4>
                  <span class="reading-author">{{ book.author }}</span>
                </div>
              </div>
            </div>
            <NuxtLink to="/humanities/books" class="spotlight-btn">
              Open Bookshelf <ArrowRightIcon class="btn-icon" />
            </NuxtLink>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  BookOpenIcon,
  PenToolIcon,
  SparklesIcon,
  GraduationCapIcon,
  ArrowRightIcon,
} from 'lucide-vue-next'
import { useHead } from '#app'
import { books } from '@/assets/data/booksData'
import { writings } from '@/assets/data/writingData'

useHead({
  title: 'Humanities & Digital Garden | Seth Brock',
  meta: [
    {
      name: 'description',
      content:
        'Explore Seth Brock’s humanities works, interactive bookshelf, literary essays, creative writing, and music pursuits.',
    },
  ],
})

const featuredWriting = writings[0]

const currentlyReadingBooks = computed(() => {
  return books.filter((b) => b.status === 'reading').slice(0, 3)
})
</script>

<style scoped>
.humanities-hub-page {
  min-height: 100vh;
  background: var(--background-color);
  color: var(--text-color);
  padding: 3.5rem 0 6rem 0;
}

.container {
  max-width: 1150px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.hub-header {
  text-align: center;
  max-width: 780px;
  margin: 0 auto 3.5rem auto;
}

.hub-badge {
  font-size: 0.85rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--primary-color);
}

.hub-title {
  font-size: clamp(2.4rem, 5vw, 3.6rem);
  font-weight: 900;
  margin: 0.4rem 0 0.8rem 0;
  letter-spacing: -0.5px;
}

.hub-subtitle {
  font-size: 1.15rem;
  line-height: 1.7;
  color: var(--text-color-muted);
  margin: 0;
}

/* Pillars Grid */
.pillars-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.75rem;
  margin-bottom: 4rem;
}

.pillar-card {
  padding: 2rem;
  border-radius: 18px;
  background: var(--background-variant);
  border: 1px solid var(--outline-color);
  text-decoration: none;
  color: var(--text-color);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 6px 20px var(--shadow);
}

.pillar-card:hover {
  transform: translateY(-6px);
  border-color: var(--primary-color);
  box-shadow: 0 14px 35px var(--shadow);
}

.pillar-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
}

.pillar-icon-box {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.books-icon-box {
  background: rgba(216, 118, 40, 0.15);
  color: var(--primary-color);
}

.writing-icon-box {
  background: rgba(99, 102, 241, 0.15);
  color: #6366f1;
}

.creative-icon-box {
  background: rgba(236, 72, 153, 0.15);
  color: #ec4899;
}

.uvu-icon-box {
  background: rgba(0, 98, 65, 0.15);
  color: #006241;
}

.darkmode .uvu-icon-box {
  color: #4fb992;
}

.pillar-icon {
  width: 24px;
  height: 24px;
}

.pillar-count {
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-color-muted);
}

.pillar-title {
  font-size: 1.35rem;
  font-weight: 800;
  margin: 0 0 0.6rem 0;
  color: var(--text-color);
  transition: color 0.2s ease;
}

.pillar-card:hover .pillar-title {
  color: var(--primary-color);
}

.pillar-desc {
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--text-color-muted);
  margin: 0 0 1.5rem 0;
}

.pillar-action {
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--primary-color);
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  transition: gap 0.2s ease;
}

.pillar-card:hover .pillar-action {
  gap: 0.6rem;
}

.action-arrow {
  width: 15px;
  height: 15px;
}

/* Spotlight Section */
.spotlight-section {
  text-align: left;
}

.spotlight-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}

.spotlight-card {
  padding: 2rem;
  border-radius: 18px;
  background: var(--background-variant);
  border: 1px solid var(--outline-color);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.spotlight-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
}

.spotlight-label {
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--primary-color);
}

.view-all-link {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--text-color-muted);
  text-decoration: none;
  transition: color 0.2s ease;
}

.view-all-link:hover {
  color: var(--primary-color);
}

.spotlight-title {
  font-size: 1.45rem;
  font-weight: 800;
  font-family: Georgia, serif;
  margin: 0 0 0.5rem 0;
}

.spotlight-desc {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text-color-muted);
  margin: 0 0 1.25rem 0;
}

.spotlight-meta {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.meta-tag {
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
  background: var(--background-lighter-variant);
  color: var(--text-color-muted);
}

.currently-reading-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.reading-item {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.reading-spine-color {
  width: 6px;
  height: 38px;
  border-radius: 3px;
  flex-shrink: 0;
}

.reading-details {
  display: flex;
  flex-direction: column;
}

.reading-title {
  font-size: 0.95rem;
  font-weight: 700;
  margin: 0;
  line-height: 1.3;
}

.reading-author {
  font-size: 0.8rem;
  color: var(--text-color-muted);
}

.spotlight-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.7rem 1.4rem;
  border-radius: 50px;
  background: var(--background-lighter-variant);
  border: 1px solid var(--outline-color);
  color: var(--text-color);
  font-size: 0.9rem;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.2s ease;
}

.spotlight-btn:hover {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
  box-shadow: 0 4px 15px rgba(216, 118, 40, 0.25);
}

.btn-icon {
  width: 15px;
  height: 15px;
}
</style>
