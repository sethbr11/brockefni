<template>
  <div class="reading-page" v-if="piece">
    <div class="reading-container">
      <!-- Top Navigation -->
      <div class="reading-top-nav">
        <NuxtLink to="/humanities/writing" class="back-link glass-panel">
          <ArrowLeftIcon class="icon" /> Back to Writings
        </NuxtLink>
        <NuxtLink to="/uvu" class="context-link glass-panel" v-if="piece.courseCode && piece.courseCode.includes('UVU')">
          <GraduationCapIcon class="icon" /> {{ piece.courseContext }}
        </NuxtLink>
        <NuxtLink to="/byu" class="context-link glass-panel" v-else-if="piece.courseCode && piece.courseCode.includes('BYU')">
          <GraduationCapIcon class="icon" /> {{ piece.courseContext }}
        </NuxtLink>
        <span class="context-link glass-panel" v-else-if="piece.courseContext">
          <GraduationCapIcon class="icon" /> {{ piece.courseContext }}
        </span>
      </div>

      <!-- Article Header -->
      <header class="article-header animate-fade-in">
        <div class="article-meta-tags">
          <span class="type-badge">{{ formatType(piece.type) }}</span>
          <span class="read-time"><ClockIcon class="meta-icon" /> {{ piece.readTime }}</span>
          <span class="date-badge"><CalendarIcon class="meta-icon" /> {{ piece.date }}</span>
        </div>

        <h1 class="article-title">{{ piece.title }}</h1>

        <!-- External Publication Links if available -->
        <div class="external-links-bar" v-if="piece.externalLinks && piece.externalLinks.length">
          <a
            v-for="(ext, eIdx) in piece.externalLinks"
            :key="eIdx"
            :href="ext.url"
            target="_blank"
            rel="noopener noreferrer"
            class="ext-action-btn"
          >
            <ExternalLinkIcon class="ext-icon" /> {{ ext.label }}
          </a>
        </div>

        <div class="author-row">
          <img
            src="~/assets/images/SethBrockLight.jpeg"
            alt="Seth Brock"
            class="author-avatar"
          />
          <div class="author-meta">
            <span class="author-name">By {{ piece.author }}</span>
            <span class="author-sub">
              {{ piece.type === 'creative' ? 'Utah Valley University • B.A. in English' : 'Software Engineer • B.A. in English (UVU) / MISM (BYU)' }}
            </span>
          </div>
        </div>
      </header>

      <!-- Decorative Divider -->
      <div class="reading-divider">
        <span>§</span>
      </div>

      <!-- Article Body -->
      <article class="article-body">
        <div
          v-for="(para, pIdx) in piece.content"
          :key="pIdx"
          class="para-wrapper"
          :class="{ 'drop-cap-wrapper': pIdx === 0 && piece.type === 'creative' }"
        >
          <div v-html="para"></div>
        </div>
      </article>

      <!-- Decorative End Divider -->
      <div class="article-end-ornament">
        <span class="end-dot"></span>
        <span class="end-dot"></span>
        <span class="end-dot"></span>
      </div>

      <!-- Article Footer -->
      <footer class="article-footer glass-panel">
        <div class="footer-tags">
          <span class="tag-title">Topics:</span>
          <span v-for="tag in piece.tags" :key="tag" class="topic-tag">
            #{{ tag }}
          </span>
        </div>

        <div class="footer-actions">
          <NuxtLink to="/humanities/writing" class="footer-btn">
            <ArrowLeftIcon class="btn-icon" /> All Writings
          </NuxtLink>
          <NuxtLink to="/humanities/books" class="footer-btn">
            <BookOpenIcon class="btn-icon" /> Explore Bookshelf
          </NuxtLink>
          <NuxtLink to="/uvu" class="footer-btn" v-if="piece.courseCode?.includes('UVU')">
            <GraduationCapIcon class="btn-icon" /> UVU Degree Overview
          </NuxtLink>
        </div>
      </footer>
    </div>
  </div>

  <!-- 404 / Not Found State -->
  <div v-else class="not-found-page container">
    <h2>Piece Not Found</h2>
    <p>The writing piece you are looking for could not be found.</p>
    <NuxtLink to="/humanities/writing" class="btn-primary">
      Return to Writings
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  ArrowLeftIcon,
  GraduationCapIcon,
  ClockIcon,
  CalendarIcon,
  BookOpenIcon,
  ExternalLinkIcon,
} from 'lucide-vue-next'
import { useHead } from '#app'
import { writings } from '@/assets/data/writingData'

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const piece = computed(() => {
  return writings.find((w) => w.slug === slug.value)
})

if (piece.value?.externalUrl && (!piece.value.content || piece.value.content.length === 0)) {
  await navigateTo(piece.value.externalUrl, { external: true })
}

const formatType = (type: string) => {
  switch (type) {
    case 'creative':
      return 'Creative Writing'
    case 'essay':
      return 'Strategy & Essay'
    case 'technical':
      return 'Technical Tutorial'
    case 'literary-analysis':
      return 'Literary Analysis'
    default:
      return 'Writing'
  }
}

useHead({
  title: computed(() =>
    piece.value
      ? `${piece.value.title} | Seth Brock`
      : 'Writing | Seth Brock'
  ),
  meta: [
    {
      name: 'description',
      content: computed(() => piece.value?.summary || ''),
    },
  ],
})
</script>

<style scoped>
.reading-page {
  min-height: 100vh;
  background: var(--background-color);
  color: var(--text-color);
  padding: 3rem 0 6rem 0;
}

.reading-container {
  max-width: 780px;
  margin: 0 auto;
  padding: 0 1.5rem;
  text-align: left;
}

/* Top Nav */
.reading-top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.back-link,
.context-link {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  font-weight: 700;
  text-decoration: none;
  color: var(--text-color);
  border-radius: 30px;
  background: var(--background-variant);
  border: 1px solid var(--outline-color);
  transition: all 0.2s ease;
}

.back-link:hover,
.context-link:hover {
  color: var(--primary-color);
  border-color: var(--primary-color);
  transform: translateY(-2px);
}

.back-link .icon,
.context-link .icon {
  width: 15px;
  height: 15px;
}

/* Header */
.article-header {
  margin-bottom: 2.5rem;
}

.article-meta-tags {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 1rem;
  font-size: 0.85rem;
  color: var(--text-color-muted);
  flex-wrap: wrap;
}

.type-badge {
  font-size: 0.75rem;
  font-weight: 800;
  color: var(--primary-color);
  background: rgba(216, 118, 40, 0.12);
  padding: 0.2rem 0.65rem;
  border-radius: 4px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.read-time,
.date-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.meta-icon {
  width: 14px;
  height: 14px;
  color: var(--primary-color);
}

.article-title {
  font-size: clamp(2.2rem, 5vw, 3.2rem);
  font-weight: 900;
  line-height: 1.2;
  margin: 0.5rem 0 1.25rem 0;
  font-family: Georgia, 'Times New Roman', serif;
  letter-spacing: -0.5px;
  color: var(--text-color);
}

.external-links-bar {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.ext-action-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.9rem;
  border-radius: 50px;
  font-size: 0.82rem;
  font-weight: 700;
  text-decoration: none;
  background: var(--background-lighter-variant);
  border: 1px solid var(--outline-color);
  color: var(--primary-color);
  transition: all 0.2s ease;
}

.ext-action-btn:hover {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(216, 118, 40, 0.25);
}

.ext-icon {
  width: 14px;
  height: 14px;
}

.author-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--outline-color);
}

.author-avatar {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--primary-color);
}

.author-meta {
  display: flex;
  flex-direction: column;
}

.author-name {
  font-weight: 800;
  font-size: 1.05rem;
  color: var(--text-color);
}

.author-sub {
  font-size: 0.85rem;
  color: var(--text-color-muted);
}

/* Divider */
.reading-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2.5rem 0;
  color: var(--primary-color);
  font-size: 1.5rem;
  position: relative;
}

.reading-divider::before,
.reading-divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid var(--outline-color);
  margin: 0 1.5rem;
}

/* Body */
.article-body {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 1.18rem;
  line-height: 1.95;
  color: var(--text-color);
}

.para-wrapper {
  margin-bottom: 1.75rem;
}

/* Inner HTML Elements Styling */
.article-body :deep(h3) {
  font-size: 1.6rem;
  font-weight: 800;
  margin: 2.5rem 0 1rem 0;
  font-family: Georgia, serif;
  color: var(--text-color);
  letter-spacing: -0.3px;
  border-bottom: 1px solid var(--outline-color);
  padding-bottom: 0.5rem;
}

.article-body :deep(em),
.article-body :deep(i) {
  font-style: italic;
  font-family: Georgia, 'Times New Roman', serif;
}

.article-body :deep(strong) {
  font-weight: 700;
  color: var(--text-color);
}

.article-body :deep(blockquote) {
  margin: 2rem 0;
  padding: 1.25rem 1.75rem;
  background: var(--background-lighter-variant);
  border-left: 4px solid var(--primary-color);
  border-radius: 0 12px 12px 0;
  font-style: italic;
  font-size: 1.1rem;
  line-height: 1.7;
}

.article-body :deep(blockquote small) {
  display: block;
  font-style: normal;
  font-size: 0.9rem;
  font-weight: 700;
  margin-top: 0.5rem;
  color: var(--primary-color);
}

.article-body :deep(pre) {
  background: #1e293b;
  color: #f8fafc;
  padding: 1.25rem 1.5rem;
  border-radius: 12px;
  overflow-x: auto;
  font-size: 0.88rem;
  line-height: 1.6;
  margin: 1.75rem 0;
  border: 1px solid var(--outline-color);
  font-family: Consolas, Monaco, 'Courier New', monospace;
}

.article-body :deep(code) {
  font-family: Consolas, Monaco, 'Courier New', monospace;
  background: var(--background-lighter-variant);
  padding: 0.2rem 0.45rem;
  border-radius: 4px;
  font-size: 0.9em;
  border: 1px solid var(--outline-color);
}

.article-body :deep(pre code) {
  background: transparent;
  padding: 0;
  border: none;
  color: inherit;
}

.article-body :deep(ul),
.article-body :deep(ol) {
  padding-left: 1.5rem;
  margin: 1.25rem 0;
}

.article-body :deep(li) {
  margin-bottom: 0.5rem;
  line-height: 1.7;
}

.article-body :deep(a) {
  color: var(--primary-color);
  text-decoration: underline;
}

/* Drop Cap on First Paragraph */
.drop-cap-wrapper :deep(p::first-letter),
.drop-cap-wrapper :deep(div::first-letter) {
  font-size: 4.2rem;
  float: left;
  line-height: 0.8;
  margin: 0.15rem 0.6rem 0.15rem 0;
  font-weight: 900;
  color: var(--primary-color);
  font-family: Georgia, serif;
}

/* End Ornament */
.article-end-ornament {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin: 3.5rem 0 2.5rem 0;
}

.end-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--primary-color);
}

/* Footer */
.article-footer {
  padding: 1.75rem;
  border-radius: 16px;
  background: var(--background-variant);
  border: 1px solid var(--outline-color);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.footer-tags {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  flex-wrap: wrap;
}

.tag-title {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--text-color-muted);
}

.topic-tag {
  font-size: 0.82rem;
  font-weight: 600;
  padding: 0.2rem 0.65rem;
  border-radius: 50px;
  background: var(--background-lighter-variant);
  color: var(--primary-color);
}

.footer-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  padding-top: 1rem;
  border-top: 1px solid var(--outline-color);
}

.footer-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.6rem 1.15rem;
  font-size: 0.88rem;
  font-weight: 700;
  text-decoration: none;
  color: var(--text-color);
  background: var(--background-lighter-variant);
  border: 1px solid var(--outline-color);
  border-radius: 50px;
  transition: all 0.2s ease;
}

.footer-btn:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
  transform: translateY(-2px);
}

.btn-icon {
  width: 16px;
  height: 16px;
  color: var(--primary-color);
}

.not-found-page {
  padding: 6rem 1.5rem;
  text-align: center;
}
</style>
