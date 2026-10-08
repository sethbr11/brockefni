<template>
  <div class="book-card glass-panel" @click="$emit('select', book)">
    <!-- Book Cover Container -->
    <div class="book-cover-box" :style="{ backgroundColor: book.spineColor || '#2c3e50' }">
      <img
        v-if="book.isbn"
        :src="`https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg?default=false`"
        :alt="book.title"
        class="card-cover-img"
        @error="imageError = true"
        v-show="!imageError"
        loading="lazy"
      />
      <div
        v-if="imageError || !book.isbn"
        class="card-fallback-cover"
        :style="{
          backgroundColor: book.spineColor || '#2c3e50',
          color: book.spineTextColor || '#fff',
        }"
      >
        <span class="fallback-genre">{{ book.genres[0] || 'Literature' }}</span>
        <h4 class="fallback-title">{{ book.title }}</h4>
        <p class="fallback-author">{{ book.author }}</p>
      </div>

      <!-- Status Tag -->
      <div
        class="card-status-tag"
        :class="{
          'status-reading': book.status === 'reading',
          'status-read': book.status === 'read',
          'status-want': book.status === 'want-to-read',
        }"
      >
        {{
          book.status === 'reading'
            ? 'Reading'
            : book.status === 'read'
            ? 'Read'
            : 'Want'
        }}
      </div>
    </div>

    <!-- Book Info -->
    <div class="book-info">
      <span class="author-label">{{ book.author }}</span>
      <h3 class="title-label" :title="book.title">{{ book.title }}</h3>

      <div class="card-footer">
        <span class="date-label" v-if="book.dateRead">{{ book.dateRead }}</span>
        <div class="rating-stars" v-if="book.rating">
          <StarIcon
            v-for="star in 5"
            :key="star"
            class="star-icon"
            :class="{ 'star-active': star <= book.rating }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { StarIcon } from 'lucide-vue-next'
import type { Book } from '@/assets/data/booksData'

defineProps<{
  book: Book
}>()

defineEmits<{
  (e: 'select', book: Book): void
}>()

const imageError = ref(false)
</script>

<style scoped>
.book-card {
  display: flex;
  flex-direction: column;
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  background: var(--background-variant);
  border: 1px solid var(--outline-color);
  text-align: left;
  position: relative;
}

.book-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 30px var(--shadow);
  border-color: var(--primary-color);
}

.book-cover-box {
  position: relative;
  width: 100%;
  aspect-ratio: 2 / 3;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #23303e;
}

.card-cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.book-card:hover .card-cover-img {
  transform: scale(1.04);
}

.card-fallback-cover {
  width: 100%;
  height: 100%;
  padding: 1.25rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  box-sizing: border-box;
}

.fallback-genre {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0.75;
}

.fallback-title {
  font-size: 1.05rem;
  font-weight: 800;
  margin: 0;
  line-height: 1.3;
  font-family: Georgia, serif;
}

.fallback-author {
  font-size: 0.8rem;
  opacity: 0.9;
  margin: 0;
}

.card-status-tag {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  backdrop-filter: blur(8px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.status-reading {
  background: rgba(216, 118, 40, 0.9);
  color: white;
}

.status-read {
  background: rgba(16, 185, 129, 0.9);
  color: white;
}

.status-want {
  background: rgba(99, 102, 241, 0.9);
  color: white;
}

.book-info {
  padding: 1rem 1.15rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.author-label {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--primary-color);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.title-label {
  font-size: 1.05rem;
  font-weight: 800;
  margin: 0.25rem 0 0.75rem 0;
  color: var(--text-color);
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-family: Georgia, serif;
}

.card-footer {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: var(--text-color-muted);
}

.rating-stars {
  display: flex;
  gap: 2px;
}

.star-icon {
  width: 13px;
  height: 13px;
  color: var(--outline-color);
}

.star-active {
  color: #f59e0b;
  fill: #f59e0b;
}
</style>
