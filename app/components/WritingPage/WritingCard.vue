<template>
  <!-- External Piece Link -->
  <a
    v-if="writing.externalUrl"
    :href="writing.externalUrl"
    target="_blank"
    rel="noopener noreferrer"
    class="writing-card glass-panel"
  >
    <div class="card-header">
      <div class="meta-row">
        <span class="type-pill" :class="`type-${writing.type}`">
          {{ formatType(writing.type) }}
        </span>
        <span class="read-time">{{ writing.readTime }}</span>
      </div>
      <div class="course-and-links">
        <span v-if="writing.courseContext" class="course-pill">
          <GraduationCapIcon class="pill-icon" /> {{ writing.courseContext }}
        </span>
        <span v-if="writing.externalUrl?.includes('medium.com')" class="ext-pill medium-pill">
          <GlobeIcon class="pill-icon" /> Medium
        </span>
        <span v-else-if="writing.pdfUrl" class="ext-pill pdf-pill">
          <FileTextIcon class="pill-icon" /> PDF
        </span>
      </div>
    </div>

    <div class="card-body">
      <h3 class="writing-title">
        {{ writing.title }}
        <ExternalLinkIcon class="title-ext-icon" />
      </h3>
      <p class="writing-summary">{{ writing.summary }}</p>
    </div>

    <div class="card-footer">
      <div class="writing-tags">
        <span v-for="tag in writing.tags" :key="tag" class="tag-item">
          #{{ tag }}
        </span>
      </div>
      <span class="read-action">
        <template v-if="writing.externalUrl?.includes('medium.com')">
          Read on Medium
        </template>
        <template v-else-if="writing.externalUrl?.includes('.pdf') || writing.pdfUrl">
          View PDF Article
        </template>
        <template v-else>
          View Publication
        </template>
        <ExternalLinkIcon class="action-icon" />
      </span>
    </div>
  </a>

  <!-- Internal Piece Route Link -->
  <NuxtLink
    v-else
    :to="`/humanities/writing/${writing.slug}`"
    class="writing-card glass-panel"
  >
    <div class="card-header">
      <div class="meta-row">
        <span class="type-pill" :class="`type-${writing.type}`">
          {{ formatType(writing.type) }}
        </span>
        <span class="read-time">{{ writing.readTime }}</span>
      </div>
      <div class="course-and-links">
        <span v-if="writing.courseContext" class="course-pill">
          <GraduationCapIcon class="pill-icon" /> {{ writing.courseContext }}
        </span>
        <span v-if="writing.pdfUrl" class="ext-pill pdf-pill">
          <FileTextIcon class="pill-icon" /> PDF Included
        </span>
      </div>
    </div>

    <div class="card-body">
      <h3 class="writing-title">{{ writing.title }}</h3>
      <p class="writing-summary">{{ writing.summary }}</p>
    </div>

    <div class="card-footer">
      <div class="writing-tags">
        <span v-for="tag in writing.tags" :key="tag" class="tag-item">
          #{{ tag }}
        </span>
      </div>
      <span class="read-action">
        {{ writing.type === 'creative' ? 'Read Story' : 'Read Piece' }}
        <ArrowRightIcon class="action-icon" />
      </span>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import {
  ArrowRightIcon,
  GraduationCapIcon,
  FileTextIcon,
  GlobeIcon,
  ExternalLinkIcon,
} from 'lucide-vue-next'
import type { WritingPiece } from '@/assets/data/writingData'

defineProps<{
  writing: WritingPiece
}>()

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
</script>

<style scoped>
.writing-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.75rem;
  border-radius: 16px;
  background: var(--background-variant);
  border: 1px solid var(--outline-color);
  text-decoration: none;
  color: var(--text-color);
  text-align: left;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.writing-card:hover {
  transform: translateY(-4px);
  border-color: var(--primary-color);
  box-shadow: 0 12px 30px var(--shadow);
}

.card-header {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  margin-bottom: 1rem;
}

.meta-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.type-pill {
  font-size: 0.72rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.25rem 0.65rem;
  border-radius: 50px;
}

.type-creative {
  background: rgba(216, 118, 40, 0.15);
  color: var(--primary-color);
  border: 1px solid rgba(216, 118, 40, 0.3);
}

.type-essay {
  background: rgba(99, 102, 241, 0.15);
  color: #6366f1;
  border: 1px solid rgba(99, 102, 241, 0.3);
}

.type-technical {
  background: rgba(14, 165, 233, 0.15);
  color: #0284c7;
  border: 1px solid rgba(14, 165, 233, 0.3);
}

.type-literary-analysis {
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.read-time {
  font-size: 0.8rem;
  color: var(--text-color-muted);
}

.course-and-links {
  display: flex;
  gap: 0.45rem;
  flex-wrap: wrap;
}

.course-pill,
.ext-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.2rem 0.55rem;
  border-radius: 6px;
}

.course-pill {
  color: var(--primary-color);
  background: rgba(216, 118, 40, 0.08);
}

.pdf-pill {
  color: #dc2626;
  background: rgba(220, 38, 38, 0.08);
}

.medium-pill {
  color: #059669;
  background: rgba(5, 150, 105, 0.08);
}

.pill-icon {
  width: 13px;
  height: 13px;
}

.card-body {
  margin-bottom: 1.5rem;
}

.writing-title {
  font-size: 1.4rem;
  font-weight: 800;
  margin: 0 0 0.6rem 0;
  line-height: 1.3;
  font-family: Georgia, serif;
  color: var(--text-color);
  transition: color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.title-ext-icon {
  width: 18px;
  height: 18px;
  color: var(--text-color-muted);
  flex-shrink: 0;
}

.writing-card:hover .writing-title {
  color: var(--primary-color);
}

.writing-card:hover .title-ext-icon {
  color: var(--primary-color);
}

.writing-summary {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text-color-muted);
  margin: 0;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid var(--outline-color);
  flex-wrap: wrap;
  gap: 0.75rem;
}

.writing-tags {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.tag-item {
  font-size: 0.75rem;
  color: var(--secondary-text-color);
}

.read-action {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--primary-color);
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  transition: gap 0.2s ease;
}

.writing-card:hover .read-action {
  gap: 0.6rem;
}

.action-icon {
  width: 14px;
  height: 14px;
}
</style>
