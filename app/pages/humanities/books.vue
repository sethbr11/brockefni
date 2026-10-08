<template>
  <div class="books-page">
    <div class="container">
      <!-- Top Navigation / Breadcrumb -->
      <div class="page-top-bar">
        <NuxtLink to="/humanities" class="back-link glass-panel">
          <ArrowLeftIcon class="icon" /> Back to Humanities
        </NuxtLink>
      </div>

      <!-- Page Header -->
      <header class="page-header animate-fade-in">
        <span class="sub-badge">HUMANITIES &amp; READING LOG</span>
        <h1 class="page-title">Interactive Bookshelf</h1>
        <p class="page-subtitle">
          A personal catalogue of literary theory, classic literature, speculative fiction, and historical texts explored throughout my academic and personal reading.
        </p>
      </header>

      <!-- Controls Bar: Search, Status Filter, View Toggle -->
      <section class="controls-section glass-panel">
        <div class="search-and-status">
          <!-- Search Bar -->
          <div class="search-box">
            <SearchIcon class="search-icon" />
            <input
              v-model="searchQuery"
              type="text"
              class="search-input"
              placeholder="Search books, authors, or topics..."
            />
            <button
              v-if="searchQuery"
              class="clear-search-btn"
              @click="searchQuery = ''"
              aria-label="Clear search"
            >
              <XIcon class="clear-icon" />
            </button>
          </div>

          <!-- Status Filters -->
          <div class="status-filters">
            <button
              class="status-btn"
              :class="{ active: selectedStatus === 'all' }"
              @click="selectedStatus = 'all'"
            >
              All ({{ books.length }})
            </button>
            <button
              class="status-btn"
              :class="{ active: selectedStatus === 'reading' }"
              @click="selectedStatus = 'reading'"
            >
              <span class="reading-dot"></span>
              Reading ({{ readingCount }})
            </button>
            <button
              class="status-btn"
              :class="{ active: selectedStatus === 'read' }"
              @click="selectedStatus = 'read'"
            >
              <CheckCircleIcon class="btn-icon" />
              Completed ({{ readCount }})
            </button>
          </div>
        </div>

        <!-- Genre Pill Filter & View Switcher -->
        <div class="genres-and-view">
          <div class="genre-pills">
            <button
              class="genre-pill"
              :class="{ active: selectedGenre === '' }"
              @click="selectedGenre = ''"
            >
              All Genres
            </button>
            <button
              v-for="genre in allGenres"
              :key="genre"
              class="genre-pill"
              :class="{ active: selectedGenre === genre }"
              @click="selectedGenre = selectedGenre === genre ? '' : genre"
            >
              {{ genre }}
            </button>
          </div>

          <!-- View Mode Toggle -->
          <div class="view-toggle-group" role="group" aria-label="Bookshelf View Mode">
            <button
              class="view-btn"
              :class="{ active: viewMode === 'shelf' }"
              @click="viewMode = 'shelf'"
              title="Shelf View"
            >
              <LayoutListIcon class="icon" />
              <span>Shelf</span>
            </button>
            <button
              class="view-btn"
              :class="{ active: viewMode === 'grid' }"
              @click="viewMode = 'grid'"
              title="Grid View"
            >
              <LayoutGridIcon class="icon" />
              <span>Grid</span>
            </button>
          </div>
        </div>
      </section>

      <!-- Main Display Area -->
      <main class="books-display-area">
        <!-- If results found -->
        <div v-if="filteredBooks.length">
          <!-- 1. Shelf View -->
          <div v-if="viewMode === 'shelf'" class="animate-fade-in">
            <BookshelfView :books="filteredBooks" @select="openBookModal" />
          </div>

          <!-- 2. Grid View -->
          <div v-else class="books-grid-layout animate-fade-in">
            <BookCard
              v-for="book in filteredBooks"
              :key="book.id"
              :book="book"
              @select="openBookModal"
            />
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="empty-state glass-panel">
          <BookXIcon class="empty-icon" />
          <h3>No books found</h3>
          <p>Try resetting your search query or changing selected filters.</p>
          <button class="reset-filters-btn" @click="resetFilters">
            Reset All Filters
          </button>
        </div>
      </main>
    </div>

    <!-- Book Detail Modal -->
    <BookDetailModal :book="selectedBook" @close="selectedBook = null" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import {
  ArrowLeftIcon,
  SearchIcon,
  XIcon,
  CheckCircleIcon,
  LayoutListIcon,
  LayoutGridIcon,
  BookXIcon,
} from 'lucide-vue-next'
import { useHead } from '#app'
import { books, type Book } from '@/assets/data/booksData'
import BookshelfView from '@/components/BooksPage/BookshelfView.vue'
import BookCard from '@/components/BooksPage/BookCard.vue'
import BookDetailModal from '@/components/BooksPage/BookDetailModal.vue'

useHead({
  title: 'Interactive Bookshelf | Seth Brock',
  meta: [
    {
      name: 'description',
      content:
        'Explore Seth Brock’s interactive bookshelf and reading catalogue featuring literary criticism, classic literature, sci-fi, and digital humanities works.',
    },
  ],
})

const viewMode = ref<'shelf' | 'grid'>('shelf')
const searchQuery = ref('')
const selectedStatus = ref<'all' | 'reading' | 'read' | 'want-to-read'>('all')
const selectedGenre = ref('')
const selectedBook = ref<Book | null>(null)

// Adapt initial view mode on mobile screens to grid
onMounted(() => {
  if (window.innerWidth < 768) {
    viewMode.value = 'grid'
  }
})

// Genre list extracted from all books
const allGenres = computed(() => {
  const genreSet = new Set<string>()
  books.forEach((b) => b.genres.forEach((g) => genreSet.add(g)))
  return Array.from(genreSet).sort()
})

const readingCount = computed(
  () => books.filter((b) => b.status === 'reading').length
)
const readCount = computed(
  () => books.filter((b) => b.status === 'read').length
)

// Filtered books based on search, status, and genre
const filteredBooks = computed(() => {
  return books.filter((book) => {
    // Status match
    if (selectedStatus.value !== 'all' && book.status !== selectedStatus.value) {
      return false
    }

    // Genre match
    if (selectedGenre.value && !book.genres.includes(selectedGenre.value)) {
      return false
    }

    // Search query match
    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase()
      const titleMatch = book.title.toLowerCase().includes(q)
      const authorMatch = book.author.toLowerCase().includes(q)
      const notesMatch = book.notes?.toLowerCase().includes(q) || false
      const tagsMatch = book.tags?.some((t) => t.toLowerCase().includes(q)) || false
      const genresMatch = book.genres.some((g) => g.toLowerCase().includes(q))
      if (!titleMatch && !authorMatch && !notesMatch && !tagsMatch && !genresMatch) {
        return false
      }
    }

    return true
  })
})

const openBookModal = (book: Book) => {
  selectedBook.value = book
}

const resetFilters = () => {
  searchQuery.value = ''
  selectedStatus.value = 'all'
  selectedGenre.value = ''
}
</script>

<style scoped>
.books-page {
  min-height: 100vh;
  background: var(--background-color);
  color: var(--text-color);
  padding: 2.5rem 0 6rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Top Bar */
.page-top-bar {
  display: flex;
  margin-bottom: 2rem;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  font-weight: 700;
  text-decoration: none;
  color: var(--text-color);
  border-radius: 30px;
  transition: all 0.2s ease;
}

.back-link:hover {
  color: var(--primary-color);
  border-color: var(--primary-color);
  transform: translateX(-3px);
}

.back-link .icon {
  width: 16px;
  height: 16px;
}

/* Page Header */
.page-header {
  text-align: center;
  max-width: 760px;
  margin: 0 auto 2.5rem auto;
}

.sub-badge {
  font-size: 0.85rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--primary-color);
}

.page-title {
  font-size: clamp(2.2rem, 5vw, 3.2rem);
  font-weight: 900;
  margin: 0.4rem 0 0.8rem 0;
  letter-spacing: -0.5px;
}

.page-subtitle {
  font-size: 1.1rem;
  line-height: 1.65;
  color: var(--text-color-muted);
  margin: 0;
}

/* Controls Section */
.controls-section {
  padding: 1.5rem 1.75rem;
  border-radius: 18px;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  background: var(--background-variant);
  border: 1px solid var(--outline-color);
  box-shadow: 0 8px 24px var(--shadow);
}

.search-and-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.25rem;
  flex-wrap: wrap;
}

/* Search Box */
.search-box {
  position: relative;
  flex: 1;
  min-width: 260px;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 1rem;
  width: 18px;
  height: 18px;
  color: var(--secondary-text-color);
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 0.75rem 2.8rem 0.75rem 2.75rem;
  background: var(--background-lighter-variant);
  border: 1px solid var(--outline-color);
  border-radius: 50px;
  color: var(--text-color);
  font-size: 0.95rem;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(216, 118, 40, 0.15);
}

.clear-search-btn {
  position: absolute;
  right: 0.85rem;
  background: none;
  border: none;
  color: var(--text-color-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
}

.clear-icon {
  width: 16px;
  height: 16px;
}

/* Status Filters */
.status-filters {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.status-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.55rem 1rem;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 700;
  background: var(--background-lighter-variant);
  border: 1px solid var(--outline-color);
  color: var(--text-color-muted);
  cursor: pointer;
  transition: all 0.2s ease;
}

.status-btn:hover {
  border-color: var(--primary-color);
  color: var(--text-color);
}

.status-btn.active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
  box-shadow: 0 4px 12px rgba(216, 118, 40, 0.25);
}

.reading-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #f59e0b;
}

.btn-icon {
  width: 14px;
  height: 14px;
}

/* Genres & View switcher */
.genres-and-view {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  padding-top: 0.75rem;
  border-top: 1px solid var(--outline-color);
}

.genre-pills {
  display: flex;
  gap: 0.45rem;
  flex-wrap: wrap;
}

.genre-pill {
  padding: 0.35rem 0.75rem;
  font-size: 0.78rem;
  font-weight: 700;
  border-radius: 6px;
  background: var(--background-lighter-variant);
  border: 1px solid var(--outline-color);
  color: var(--text-color-muted);
  cursor: pointer;
  transition: all 0.2s ease;
}

.genre-pill:hover {
  border-color: var(--primary-color);
  color: var(--text-color);
}

.genre-pill.active {
  background: rgba(216, 118, 40, 0.15);
  color: var(--primary-color);
  border-color: var(--primary-color);
}

/* View Toggle */
.view-toggle-group {
  display: flex;
  background: var(--background-lighter-variant);
  border: 1px solid var(--outline-color);
  border-radius: 50px;
  padding: 3px;
}

.view-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.4rem 0.85rem;
  border-radius: 50px;
  font-size: 0.82rem;
  font-weight: 700;
  background: transparent;
  border: none;
  color: var(--text-color-muted);
  cursor: pointer;
  transition: all 0.2s ease;
}

.view-btn.active {
  background: var(--background-variant);
  color: var(--primary-color);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.view-btn .icon {
  width: 15px;
  height: 15px;
}

/* Main Display */
.books-display-area {
  min-height: 400px;
}

.books-grid-layout {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.75rem;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  border-radius: 18px;
  background: var(--background-variant);
  border: 1px solid var(--outline-color);
}

.empty-icon {
  width: 48px;
  height: 48px;
  color: var(--secondary-text-color);
  margin-bottom: 1rem;
}

.empty-state h3 {
  font-size: 1.4rem;
  margin: 0 0 0.5rem 0;
}

.empty-state p {
  color: var(--text-color-muted);
  margin: 0 0 1.5rem 0;
}

.reset-filters-btn {
  padding: 0.6rem 1.4rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 50px;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.reset-filters-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(216, 118, 40, 0.35);
}

@media (max-width: 768px) {
  .search-and-status {
    flex-direction: column;
    align-items: stretch;
  }

  .genres-and-view {
    flex-direction: column;
    align-items: stretch;
  }

  .view-toggle-group {
    align-self: center;
  }
}
</style>
