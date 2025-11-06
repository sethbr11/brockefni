<template>
  <div>
    <!-- Trigger Button -->
    <button class="filter-trigger" @click="toggleModal">
      <svg
        class="filter-icon"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
        />
      </svg>
      <span>Filter by Technology</span>
      <span v-if="selectedBadges.length > 0" class="filter-count">
        {{ selectedBadges.length }}
      </span>
    </button>

    <!-- Overlay -->
    <transition name="fade">
      <div v-if="isOpen" class="modal-overlay" @click="closeModal"></div>
    </transition>

    <!-- Slide-out Panel -->
    <transition name="slide">
      <div v-if="isOpen" class="modal-panel">
        <div class="modal-header">
          <h3>Filter by Technology</h3>
          <button class="close-button" @click="closeModal">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Search Bar -->
        <div class="search-container">
          <svg
            class="search-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            class="search-input"
            placeholder="Search technologies..."
            @input="handleSearch"
          />
          <button v-if="searchQuery" class="clear-search" @click="clearSearch">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div class="modal-body">
          <div class="badge-grid">
            <button
              v-for="badge in sortedAndFilteredBadges"
              :key="badge.name"
              class="badge-filter-item"
              :class="{ selected: isSelected(badge.name) }"
              @click="toggleBadge(badge.name)"
            >
              <img
                v-if="badge.icon"
                :src="badge.icon"
                :alt="badge.name"
                class="badge-icon"
              />
              <span class="badge-name">{{ badge.name }}</span>
            </button>
            <div v-if="sortedAndFilteredBadges.length === 0" class="no-results">
              No technologies found matching "{{ searchQuery }}"
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button
            v-if="selectedBadges.length > 0"
            class="clear-button"
            @click="clearFilters"
          >
            Clear All ({{ selectedBadges.length }})
          </button>
          <button class="apply-button" @click="closeModal">
            Apply Filters
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import type { PropType } from 'vue'
import type { Badge } from '@/assets/data/badges'

export default defineComponent({
  name: 'BadgeFilter',
  props: {
    availableBadges: {
      type: Array as PropType<Badge[]>,
      required: true,
    },
    selectedBadges: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
  emits: ['toggle-badge', 'clear-filters'],
  setup(props) {
    const isOpen = ref(false)
    const searchQuery = ref('')

    const toggleModal = () => {
      isOpen.value = !isOpen.value
      if (!isOpen.value) {
        searchQuery.value = ''
      }
    }

    const closeModal = () => {
      isOpen.value = false
      searchQuery.value = ''
    }

    const handleSearch = () => {
      // Search is reactive through computed property
    }

    const clearSearch = () => {
      searchQuery.value = ''
    }

    // Fuzzy match function
    const fuzzyMatch = (str: string, pattern: string): boolean => {
      const patternLower = pattern.toLowerCase()
      const strLower = str.toLowerCase()

      // Direct substring match
      if (strLower.includes(patternLower)) {
        return true
      }

      // Fuzzy character-by-character match
      let patternIdx = 0
      for (
        let i = 0;
        i < strLower.length && patternIdx < patternLower.length;
        i++
      ) {
        if (strLower[i] === patternLower[patternIdx]) {
          patternIdx++
        }
      }
      return patternIdx === patternLower.length
    }

    // Sort selected badges to top and filter by search
    const sortedAndFilteredBadges = computed(() => {
      let badges = [...props.availableBadges]

      // Filter by search query
      if (searchQuery.value.trim()) {
        badges = badges.filter((badge) =>
          fuzzyMatch(badge.name, searchQuery.value.trim())
        )
      }

      // Sort: selected badges first, then alphabetically within each group
      return badges.sort((a, b) => {
        const aSelected = props.selectedBadges.includes(a.name)
        const bSelected = props.selectedBadges.includes(b.name)

        if (aSelected && !bSelected) return -1
        if (!aSelected && bSelected) return 1

        return a.name.localeCompare(b.name)
      })
    })

    return {
      isOpen,
      searchQuery,
      toggleModal,
      closeModal,
      handleSearch,
      clearSearch,
      sortedAndFilteredBadges,
    }
  },
  methods: {
    isSelected(badgeName: string): boolean {
      return this.selectedBadges.includes(badgeName)
    },
    toggleBadge(badgeName: string) {
      this.$emit('toggle-badge', badgeName)
    },
    clearFilters() {
      this.$emit('clear-filters')
    },
  },
})
</script>

<style scoped>
/* Trigger Button */
.filter-trigger {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: var(--background-variant);
  border: 2px solid var(--outline-color);
  border-radius: 50px;
  color: var(--text-color);
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 0;
  height: 100%;
  box-sizing: border-box;
  white-space: nowrap;
}

.filter-trigger:hover {
  border-color: var(--link-text);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px var(--shadow);
}

.filter-icon {
  width: 20px;
  height: 20px;
}

.filter-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  height: 24px;
  padding: 0 0.5rem;
  background: var(--link-text);
  color: white;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
}

/* Overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  backdrop-filter: blur(2px);
}

/* Slide-out Panel */
.modal-panel {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 400px;
  max-width: 90vw;
  background: var(--background-color);
  box-shadow: -4px 0 24px var(--heavy-shadow);
  z-index: 1000;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid var(--outline-color);
}

.modal-header h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-color);
}

.close-button {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: var(--text-color);
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.close-button:hover {
  background: var(--background-variant);
}

.close-button svg {
  width: 20px;
  height: 20px;
}

/* Search Container */
.search-container {
  position: relative;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--outline-color);
  box-sizing: border-box;
}

.search-icon {
  position: absolute;
  left: 2rem;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: var(--secondary-text-color);
  pointer-events: none;
  z-index: 1;
}

.search-input {
  width: 100%;
  padding: 0.75rem 2.5rem 0.75rem 2.5rem;
  background: var(--background-variant);
  border: 2px solid var(--outline-color);
  border-radius: 8px;
  color: var(--text-color);
  font-size: 0.95rem;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.search-input:focus {
  outline: none;
  border-color: var(--link-text);
}

.search-input::placeholder {
  color: var(--secondary-text-color);
}

.clear-search {
  position: absolute;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: var(--secondary-text-color);
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.clear-search:hover {
  background: var(--background-color);
  color: var(--text-color);
}

.clear-search svg {
  width: 16px;
  height: 16px;
}

/* Modal Body */
.modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
}

.badge-grid {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.badge-filter-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: var(--background-variant);
  border: 2px solid var(--outline-color);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text-color);
  text-align: left;
}

.badge-filter-item:hover {
  border-color: var(--link-text);
  transform: translateX(-4px);
}

.badge-filter-item.selected {
  background: var(--link-text);
  color: white;
  border-color: var(--link-text);
}

.badge-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
  flex-shrink: 0;
}

.badge-name {
  flex: 1;
}

/* No Results */
.no-results {
  padding: 2rem;
  text-align: center;
  color: var(--secondary-text-color);
  font-size: 0.95rem;
}

/* Modal Footer */
.modal-footer {
  padding: 1.5rem;
  border-top: 1px solid var(--outline-color);
  display: flex;
  gap: 0.75rem;
}

.clear-button,
.apply-button {
  flex: 1;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.clear-button {
  background: var(--background-variant);
  color: var(--text-color);
  border: 2px solid var(--outline-color);
}

.clear-button:hover {
  border-color: var(--link-text);
}

.apply-button {
  background: var(--link-text);
  color: white;
}

.apply-button:hover {
  background: var(--link-text-hover);
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .modal-panel {
    width: 100vw;
    max-width: 100vw;
  }

  .filter-trigger {
    width: 100%;
    justify-content: center;
  }

  .search-container {
    padding: 1rem;
  }

  .search-icon {
    left: 1.5rem;
  }

  .clear-search {
    right: 1.5rem;
  }
}
</style>
