<template>
  <section class="featured">
    <h1>PORTFOLIO PROJECTS</h1>
    <div class="filters-container">
      <div class="search-bar">
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
          placeholder="Search projects..."
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
      <BadgeFilter
        :available-badges="availableBadges"
        :selected-badges="selectedBadges"
        @toggle-badge="toggleBadge"
        @clear-filters="clearFilters"
      />
    </div>
    <CardList :cards="filteredCards" :columns="4" project-card-mode />
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CardList from '../components/ProjectsPage/CardList.vue'
import BadgeFilter from '../components/ProjectsPage/BadgeFilter.vue'
import cardData from '../assets/data/projectsCardData'
import type { Badge } from '../assets/data/badges'
import { useHead } from '#app'

export default defineComponent({
  components: {
    CardList,
    BadgeFilter,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()

    useHead({
      title: 'Projects',
      meta: [
        {
          name: 'description',
          content:
            'Explore Seth Brock’s portfolio of web development and design projects. Discover innovative solutions and creative designs tailored to meet diverse needs.',
        },
        {
          name: 'author',
          content: 'Seth Brock',
        },
        {
          name: 'keywords',
          content:
            'Seth Brock projects, web development portfolio, design portfolio, creative solutions',
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0',
        },
      ],
    })

    const selectedBadges = ref<string[]>([])
    const searchQuery = ref('')

    // Get all unique badges from all cards
    const availableBadges = computed<Badge[]>(() => {
      const badgeMap = new Map<string, Badge>()
      cardData.forEach((card) => {
        card.badges?.forEach((badge) => {
          if (!badgeMap.has(badge.name)) {
            badgeMap.set(badge.name, badge)
          }
        })
      })
      return Array.from(badgeMap.values()).sort((a, b) =>
        a.name.localeCompare(b.name)
      )
    })

    // Filter cards based on selected badges AND search query
    const filteredCards = computed(() => {
      let filtered = cardData

      // Filter by search query
      if (searchQuery.value.trim()) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter((card) => {
          const titleMatch = card.title.toLowerCase().includes(query)
          const descriptionMatch =
            card.description?.toLowerCase().includes(query) || false
          return titleMatch || descriptionMatch
        })
      }

      // Filter by selected badges
      if (selectedBadges.value.length > 0) {
        filtered = filtered.filter((card) => {
          if (!card.badges || card.badges.length === 0) return false
          return selectedBadges.value.some((selectedBadge) =>
            card.badges?.some((badge) => badge.name === selectedBadge)
          )
        })
      }

      return filtered
    })

    // Initialize filters from URL on mount
    onMounted(() => {
      const filterParam = route.query.filters
      if (filterParam) {
        const filters = Array.isArray(filterParam) ? filterParam : [filterParam]
        // Only keep string values and ones that exist in availableBadges
        selectedBadges.value = filters
          .filter((f): f is string => typeof f === 'string')
          .filter((f) =>
            availableBadges.value.some((badge) => badge.name === f)
          )
      }

      const searchParam = route.query.search
      if (searchParam && typeof searchParam === 'string') {
        searchQuery.value = searchParam
      }
    })

    // Update URL when filters or search changes
    const updateURL = () => {
      const query: Record<string, string | string[]> = {}

      if (selectedBadges.value.length > 0) {
        query.filters = selectedBadges.value
      }

      if (searchQuery.value.trim()) {
        query.search = searchQuery.value.trim()
      }

      router.push({
        path: route.path,
        query,
      })
    }

    const toggleBadge = (badgeName: string) => {
      const index = selectedBadges.value.indexOf(badgeName)
      if (index > -1) {
        selectedBadges.value.splice(index, 1)
      } else {
        selectedBadges.value.push(badgeName)
      }
      updateURL()
    }

    const clearFilters = () => {
      selectedBadges.value = []
      updateURL()
    }

    const clearSearch = () => {
      searchQuery.value = ''
      updateURL()
    }

    // Watch search query and update URL
    const searchTimeout = ref<NodeJS.Timeout | null>(null)
    const handleSearchChange = () => {
      if (searchTimeout.value) {
        clearTimeout(searchTimeout.value)
      }
      searchTimeout.value = setTimeout(() => {
        updateURL()
      }, 500)
    }

    return {
      selectedBadges,
      searchQuery,
      availableBadges,
      filteredCards,
      toggleBadge,
      clearFilters,
      clearSearch,
    }
  },
  watch: {
    searchQuery() {
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout)
      }
      this.searchTimeout = setTimeout(() => {
        this.updateURL()
      }, 500)
    },
  },
  data() {
    return {
      searchTimeout: null as NodeJS.Timeout | null,
    }
  },
  methods: {
    updateURL() {
      const query: Record<string, string | string[]> = {}

      if (this.selectedBadges.length > 0) {
        query.filters = this.selectedBadges
      }

      if (this.searchQuery.trim()) {
        query.search = this.searchQuery.trim()
      }

      this.$router.push({
        path: this.$route.path,
        query,
      })
    },
  },
})
</script>

<style scoped>
.filters-container {
  display: flex;
  gap: 1rem;
  align-items: stretch;
  justify-content: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.search-bar {
  position: relative;
  flex: 1;
  max-width: 400px;
  min-width: 250px;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: var(--secondary-text-color);
  pointer-events: none;
}

.search-input {
  width: 100%;
  height: 100%;
  padding: 0.75rem 3rem 0.75rem 2.75rem;
  background: var(--background-variant);
  border: 2px solid var(--outline-color);
  border-radius: 50px;
  color: var(--text-color);
  font-size: 0.95rem;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.search-input:focus {
  outline: none;
  border-color: var(--link-text);
  box-shadow: 0 4px 12px var(--shadow);
}

.search-input::placeholder {
  color: var(--secondary-text-color);
}

.clear-search {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: var(--secondary-text-color);
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.clear-search:hover {
  background: var(--outline-color);
  color: var(--text-color);
}

.clear-search svg {
  width: 16px;
  height: 16px;
}

@media (max-width: 768px) {
  .filters-container {
    flex-direction: column;
    align-items: stretch;
    width: 100%;
  }

  .search-bar {
    width: 100%;
    max-width: 100%;
  }
}
</style>
