<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="book"
        class="book-modal-backdrop"
        @click.self="$emit('close')"
        @keydown.esc="$emit('close')"
        tabindex="-1"
      >
        <div class="book-modal-container glass-panel" role="dialog" aria-modal="true">
          <!-- Close Button -->
          <button class="close-btn" @click="$emit('close')" aria-label="Close modal">
            <XIcon class="icon" />
          </button>

          <div class="modal-content-grid">
            <!-- Left: Book Cover / Spine graphic -->
            <div class="modal-cover-side">
              <div class="cover-wrapper" :style="{ backgroundColor: book.spineColor || '#2c3e50' }">
                <img
                  v-if="book.isbn"
                  :src="`https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg?default=false`"
                  :alt="book.title"
                  class="book-cover-img"
                  @error="onImageError"
                  v-show="!imageError"
                />
                <div v-if="imageError || !book.isbn" class="fallback-cover" :style="{ backgroundColor: book.spineColor || '#2c3e50', color: book.spineTextColor || '#fff' }">
                  <div class="cover-emboss-top"></div>
                  <h3 class="fallback-title">{{ book.title }}</h3>
                  <p class="fallback-author">{{ book.author }}</p>
                  <div class="cover-emboss-bottom">
                    <BookOpenIcon class="fallback-icon" />
                  </div>
                </div>
              </div>

              <!-- Status & Rating Pills -->
              <div class="cover-meta">
                <div
                  class="status-badge"
                  :class="{
                    'status-reading': book.status === 'reading',
                    'status-read': book.status === 'read',
                    'status-want': book.status === 'want-to-read',
                  }"
                >
                  <span class="status-dot"></span>
                  {{
                    book.status === 'reading'
                      ? 'Currently Reading'
                      : book.status === 'read'
                      ? 'Completed'
                      : 'Want to Read'
                  }}
                </div>

                <div class="rating-display" v-if="book.rating">
                  <StarIcon
                    v-for="star in 5"
                    :key="star"
                    class="star-icon"
                    :class="{ 'star-filled': star <= book.rating }"
                  />
                </div>
              </div>
            </div>

            <!-- Right: Book Info & Personal Notes -->
            <div class="modal-info-side">
              <div class="book-header">
                <span class="author-name">{{ book.author }}</span>
                <h2 class="book-title">{{ book.title }}</h2>
                <div class="reading-meta">
                  <span class="meta-item" v-if="book.dateRead">
                    <CalendarIcon class="meta-icon" /> Read {{ book.dateRead }}
                  </span>
                  <span class="meta-item" v-if="book.isbn">
                    <HashIcon class="meta-icon" /> ISBN: {{ book.isbn }}
                  </span>
                </div>
              </div>

              <!-- Genre Badges -->
              <div class="genre-tags">
                <span
                  v-for="genre in book.genres"
                  :key="genre"
                  class="genre-tag"
                >
                  {{ genre }}
                </span>
                <span
                  v-for="tag in book.tags"
                  :key="tag"
                  class="custom-tag"
                >
                  #{{ tag }}
                </span>
              </div>

              <!-- Personal Notes Section -->
              <div class="notes-section" v-if="book.notes">
                <h4 class="section-heading">
                  <BookmarkIcon class="heading-icon" /> Personal Reflections &amp; Takeaways
                </h4>
                <p class="notes-text">{{ book.notes }}</p>
              </div>

              <!-- Favorite Quotes Section -->
              <div
                class="quotes-section"
                v-if="book.favoriteQuotes && book.favoriteQuotes.length"
              >
                <h4 class="section-heading">
                  <QuoteIcon class="heading-icon" /> Key Quotes &amp; Passages
                </h4>
                <blockquote
                  v-for="(quote, qIdx) in book.favoriteQuotes"
                  :key="qIdx"
                  class="book-quote"
                >
                  "{{ quote }}"
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import {
  XIcon,
  BookOpenIcon,
  CalendarIcon,
  HashIcon,
  StarIcon,
  BookmarkIcon,
  QuoteIcon,
} from 'lucide-vue-next'
import type { Book } from '@/assets/data/booksData'

const props = defineProps<{
  book: Book | null
}>()

defineEmits<{
  (e: 'close'): void
}>()

const imageError = ref(false)

watch(
  () => props.book,
  () => {
    imageError.value = false
  }
)

const onImageError = () => {
  imageError.value = true
}
</script>

<style scoped>
.book-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1.5rem;
  overflow-y: auto;
}

.book-modal-container {
  background: var(--background-variant);
  border: 1px solid var(--outline-color);
  border-radius: 20px;
  max-width: 820px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.35);
  padding: 2.5rem;
  color: var(--text-color);
  text-align: left;
}

.close-btn {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  background: var(--background-lighter-variant);
  border: 1px solid var(--outline-color);
  color: var(--text-color);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 10;
}

.close-btn:hover {
  background: var(--primary-color);
  color: white;
  transform: rotate(90deg);
}

.close-btn .icon {
  width: 18px;
  height: 18px;
}

.modal-content-grid {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 2.5rem;
  align-items: start;
}

/* Left Cover Side */
.modal-cover-side {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
}

.cover-wrapper {
  width: 210px;
  height: 315px;
  border-radius: 8px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25), -6px 0 12px rgba(0, 0, 0, 0.15) inset;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.cover-wrapper:hover {
  transform: scale(1.02);
}

.book-cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.fallback-cover {
  width: 100%;
  height: 100%;
  padding: 1.75rem 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  box-sizing: border-box;
  position: relative;
}

.cover-emboss-top {
  border-top: 2px solid rgba(255, 255, 255, 0.25);
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  height: 6px;
  width: 80%;
  margin: 0 auto;
}

.fallback-title {
  font-size: 1.15rem;
  font-weight: 800;
  line-height: 1.3;
  margin: 0;
  font-family: Georgia, serif;
}

.fallback-author {
  font-size: 0.85rem;
  font-weight: 600;
  opacity: 0.9;
  margin-top: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.cover-emboss-bottom {
  display: flex;
  justify-content: center;
  opacity: 0.6;
}

.fallback-icon {
  width: 24px;
  height: 24px;
}

.cover-meta {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.85rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.status-reading {
  background: rgba(216, 118, 40, 0.15);
  color: var(--primary-color);
  border: 1px solid rgba(216, 118, 40, 0.3);
}

.status-reading .status-dot {
  background: var(--primary-color);
  animation: pulse 2s infinite;
}

.status-read {
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.status-read .status-dot {
  background: #10b981;
}

.status-want {
  background: rgba(99, 102, 241, 0.15);
  color: #6366f1;
  border: 1px solid rgba(99, 102, 241, 0.3);
}

.status-want .status-dot {
  background: #6366f1;
}

.rating-display {
  display: flex;
  gap: 3px;
}

.star-icon {
  width: 16px;
  height: 16px;
  color: var(--outline-color);
}

.star-filled {
  color: #f59e0b;
  fill: #f59e0b;
}

/* Right Info Side */
.modal-info-side {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.author-name {
  font-size: 0.95rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--primary-color);
}

.book-title {
  font-size: 1.85rem;
  font-weight: 800;
  margin: 0.25rem 0 0.6rem 0;
  line-height: 1.25;
  font-family: Georgia, serif;
}

.reading-meta {
  display: flex;
  gap: 1.25rem;
  flex-wrap: wrap;
  font-size: 0.85rem;
  color: var(--text-color-muted);
}

.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.meta-icon {
  width: 14px;
  height: 14px;
  color: var(--primary-color);
}

.genre-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.genre-tag {
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.25rem 0.7rem;
  border-radius: 6px;
  background: var(--background-lighter-variant);
  border: 1px solid var(--outline-color);
  color: var(--text-color);
}

.custom-tag {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.7rem;
  border-radius: 6px;
  background: rgba(216, 118, 40, 0.08);
  color: var(--primary-color);
}

.section-heading {
  font-size: 0.95rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 0.6rem 0;
  display: flex;
  align-items: center;
  gap: 0.45rem;
  color: var(--text-color);
}

.heading-icon {
  width: 16px;
  height: 16px;
  color: var(--primary-color);
}

.notes-text {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--text-color-muted);
  margin: 0;
}

.book-quote {
  font-family: Georgia, serif;
  font-style: italic;
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text-color);
  border-left: 3px solid var(--primary-color);
  padding-left: 1rem;
  margin: 0.75rem 0;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.85); }
}

/* Modal Transitions */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .modal-content-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .modal-cover-side {
    flex-direction: row;
    justify-content: flex-start;
    gap: 1.5rem;
  }

  .cover-wrapper {
    width: 120px;
    height: 180px;
    flex-shrink: 0;
  }

  .cover-meta {
    align-items: flex-start;
  }

  .book-modal-container {
    padding: 1.75rem 1.25rem;
  }

  .book-title {
    font-size: 1.45rem;
  }
}
</style>
