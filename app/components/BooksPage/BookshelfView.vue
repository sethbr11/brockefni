<template>
  <div class="bookshelf-container">
    <div
      v-for="(shelfRow, rIdx) in shelfRows"
      :key="rIdx"
      class="shelf-unit"
    >
      <!-- Books Lined Up on the Shelf -->
      <div class="shelf-books-row">
        <div
          v-for="book in shelfRow"
          :key="book.id"
          class="book-spine"
          :style="{
            backgroundColor: book.spineColor || '#2c3e50',
            color: book.spineTextColor || '#ffffff',
            height: `${Math.round(280 * (book.heightMultiplier || 1))}px`,
            width: `${Math.round(48 * (book.widthMultiplier || 1))}px`,
          }"
          @click="$emit('select', book)"
          :title="`${book.title} by ${book.author} (Click to open details)`"
          role="button"
          tabindex="0"
          @keydown.enter="$emit('select', book)"
          @keydown.space.prevent="$emit('select', book)"
        >
          <!-- Spine 3D Highlight & Shadow Overlay -->
          <div class="spine-lighting"></div>

          <!-- Top Decorative Band -->
          <div class="spine-band top-band"></div>

          <!-- Spine Text Content (Rotated) -->
          <div class="spine-content">
            <span class="spine-title">{{ book.title }}</span>
            <span class="spine-author">{{ book.author }}</span>
          </div>

          <!-- Bottom Decorative Band -->
          <div class="spine-band bottom-band"></div>

          <!-- Bookmark Ribbon or Status Notch -->
          <div
            v-if="book.status === 'reading'"
            class="reading-ribbon"
            title="Currently Reading"
          ></div>
        </div>
      </div>

      <!-- Realistic Wooden / Modern Shelf Ledge -->
      <div class="shelf-ledge">
        <div class="shelf-top"></div>
        <div class="shelf-front"></div>
        <div class="shelf-shadow"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Book } from '@/assets/data/booksData'

const props = defineProps<{
  books: Book[]
}>()

defineEmits<{
  (e: 'select', book: Book): void
}>()

// Split books into shelf rows (approx 8-10 books per shelf on wide screens)
const shelfRows = computed(() => {
  const rows: Book[][] = []
  const booksPerRow = 8
  for (let i = 0; i < props.books.length; i += booksPerRow) {
    rows.push(props.books.slice(i, i + booksPerRow))
  }
  return rows.length ? rows : [[]]
})
</script>

<style scoped>
.bookshelf-container {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 2rem 0;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
}

.shelf-unit {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.shelf-books-row {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 6px;
  min-height: 320px;
  padding: 0 2rem;
  width: 100%;
  box-sizing: border-box;
  flex-wrap: wrap;
  z-index: 2;
}

/* 3D Book Spine */
.book-spine {
  position: relative;
  border-radius: 4px 4px 1px 1px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px 4px;
  box-sizing: border-box;
  cursor: pointer;
  box-shadow: 
    -2px 0 5px rgba(0, 0, 0, 0.25) inset,
    2px 0 5px rgba(255, 255, 255, 0.15) inset,
    3px 4px 12px rgba(0, 0, 0, 0.3);
  transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform-origin: bottom center;
  user-select: none;
}

.book-spine:hover,
.book-spine:focus-visible {
  transform: translateY(-16px) scale(1.04) rotate(-1deg);
  box-shadow: 
    -3px 0 6px rgba(0, 0, 0, 0.3) inset,
    3px 0 6px rgba(255, 255, 255, 0.25) inset,
    0 18px 30px rgba(0, 0, 0, 0.45);
  z-index: 10;
  outline: none;
}

.spine-lighting {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.35) 0%,
    rgba(255, 255, 255, 0.15) 30%,
    rgba(255, 255, 255, 0) 65%,
    rgba(0, 0, 0, 0.3) 100%
  );
  border-radius: inherit;
  pointer-events: none;
}

.spine-band {
  width: 75%;
  height: 3px;
  border-top: 1px solid rgba(255, 255, 255, 0.4);
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 3;
}

.top-band {
  margin-top: 4px;
}

.bottom-band {
  margin-bottom: 4px;
}

.spine-content {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80%;
  width: 100%;
  gap: 8px;
  position: relative;
  z-index: 3;
  overflow: hidden;
  padding: 4px 0;
}

.spine-title {
  font-family: Georgia, 'Times New Roman', serif;
  font-weight: 800;
  font-size: 0.88rem;
  letter-spacing: 0.5px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-height: 180px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.spine-author {
  font-size: 0.68rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0.88;
  white-space: nowrap;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.reading-ribbon {
  position: absolute;
  top: 0;
  right: 6px;
  width: 6px;
  height: 18px;
  background: #f59e0b;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  border-radius: 0 0 3px 3px;
  z-index: 4;
}

/* Realistic Shelf Structure */
.shelf-ledge {
  width: 100%;
  position: relative;
  z-index: 1;
}

.shelf-top {
  width: 100%;
  height: 14px;
  background: linear-gradient(
    to bottom,
    #5c3d2e,
    #4a2f22
  );
  border-radius: 4px 4px 0 0;
  box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.15);
}

.shelf-front {
  width: 100%;
  height: 18px;
  background: linear-gradient(
    to bottom,
    #3b2216,
    #2a160d
  );
  border-radius: 0 0 4px 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.darkmode .shelf-top {
  background: linear-gradient(
    to bottom,
    #3f4854,
    #2a333f
  );
}

.darkmode .shelf-front {
  background: linear-gradient(
    to bottom,
    #202934,
    #151b22
  );
}

.shelf-shadow {
  width: 96%;
  margin: 0 auto;
  height: 12px;
  background: radial-gradient(ellipse at top, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0) 75%);
}

@media (max-width: 768px) {
  .shelf-books-row {
    gap: 4px;
    padding: 0 0.5rem;
  }

  .book-spine {
    width: 40px !important;
  }

  .spine-title {
    font-size: 0.78rem;
  }

  .spine-author {
    display: none;
  }
}
</style>
