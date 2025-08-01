<template>
  <div class="card-list-container">
    <div class="card-grid" :class="`columns-${columns}`">
      <div
        v-for="(card, index) in cards"
        :key="index"
        class="card"
        :class="{ clickable: card.link }"
        @click="handleCardClick(card, $event)"
      >
        <!-- Badges -->
        <div v-if="card.badges && card.badges.length > 0" class="card-badges">
          <span
            v-for="(badge, badgeIndex) in card.badges"
            :key="badgeIndex"
            class="badge"
            :title="badge.title || badge.name"
          >
            <img v-if="badge.icon" :src="badge.icon" :alt="badge.name" />
            <span v-else class="badge-text">{{ badge.name }}</span>
          </span>
        </div>

        <!-- Card Header -->
        <div class="card-header">
          <h3 class="card-title">{{ card.title }}</h3>
        </div>

        <!-- Card Body -->
        <div class="card-body">
          <p v-if="card.description" class="card-description">
            {{ card.description }}
          </p>
        </div>

        <!-- Card Footer -->
        <div class="card-footer">
          <!-- Main Link -->
          <a
            v-if="card.link && card.link.text"
            :href="card.link.url"
            class="card-link"
            :target="card.link.external ? '_blank' : '_self'"
          >
            {{ card.link.text }}
            <svg
              class="external-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>

          <!-- Actions -->
          <div
            v-if="card.actions && card.actions.length > 0"
            class="actions-container"
          >
            <!-- Desktop Actions -->
            <div class="actions">
              <button
                v-for="(action, actionIndex) in card.actions"
                :key="actionIndex"
                class="action-button"
                :style="{ backgroundColor: action.color || '#6366f1' }"
                @click="handleActionClick(action)"
              >
                <span v-if="action.icon" class="action-icon">
                  <img :src="action.icon" :alt="action.text" />
                </span>
                <span class="action-text">{{ action.text }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'CardList',
  props: {
    cards: {
      type: Array,
      required: true,
      validator: (cards) => {
        return cards.every(
          (card) => card.title && typeof card.title === 'string'
        )
      },
    },
    columns: {
      type: Number,
      default: 2,
      validator: (value) => value >= 1 && value <= 4,
    },
  },
  setup() {
    const activeMenuIndex = ref(null)

    const handleCardClick = (card, event) => {
      // Don't navigate if clicking on action buttons or links
      if (
        event.target.closest('.action-button') ||
        event.target.closest('.card-link')
      ) {
        return
      }

      if (card.link) {
        if (card.link.external) {
          window.open(card.link.url, '_blank')
        } else {
          window.location.href = card.link.url
        }
      }
    }

    const handleActionClick = (action) => {
      if (action.link) {
        if (action.link.startsWith('http')) {
          window.open(action.link, '_blank')
        } else {
          window.location.href = action.link
        }
      }

      // Emit custom event for parent component handling
      if (action.callback && typeof action.callback === 'function') {
        action.callback()
      }
    }

    return {
      activeMenuIndex,
      handleCardClick,
      handleActionClick,
    }
  },
}
</script>

<style scoped>
.card-list-container {
  width: 100%;
  height: 100%;
  padding: 1rem;
  box-sizing: border-box;
  overflow-x: hidden;
}

.card-grid {
  display: grid;
  gap: 1.5rem;
  width: 100%;
  max-width: 100%;
}

/* Column configurations */
.columns-1 {
  grid-template-columns: 1fr;
}

.columns-2 {
  grid-template-columns: repeat(2, 1fr);
}

.columns-3 {
  grid-template-columns: repeat(3, 1fr);
}

.columns-4 {
  grid-template-columns: repeat(4, 1fr);
}

/* Card styles */
.card {
  background: var(--background-variant);
  border-radius: 12px;
  box-shadow: 0 2px 8px var(--shadow);
  border: 1px solid var(--outline-color);
  overflow: hidden;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  position: relative;
}

.card.clickable {
  cursor: pointer;
}

.card.clickable:hover {
  box-shadow: 0 4px 16px var(--heavy-shadow);
  transform: translateY(-2px);
}

.card-header {
  padding: 1.5rem 1.5rem 0;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-color);
  margin: 0;
  line-height: 1.4;
}

.card-body {
  padding: 1rem 1.5rem;
  flex-grow: 1;
}

.card-description {
  color: var(--secondary-text-color);
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
}

.card-footer {
  padding: 0 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.card-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--link-text);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  transition: color 0.2s ease;
  justify-content: center;
}

.card-link:hover {
  color: var(--link-text-hover);
}

.external-icon {
  width: 16px;
  height: 16px;
}

/* Actions */
.actions-container {
  position: relative;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.action-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #6366f1;
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
}

.action-button:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.action-icon {
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.action-text {
  white-space: nowrap;
}

/* Badges */
.card-badges {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
  justify-content: flex-end;
  z-index: 10;
}

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.2s ease;
}

.badge:hover {
  transform: scale(1.1);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.badge img {
  width: 16px;
  height: 16px;
  object-fit: contain;
}

.badge-text {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--text-color);
}

/* Dark mode styles */
.darkmode {
  .badge {
    background: var(--secondary-lighter-variant);
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .columns-4 {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .columns-3,
  .columns-4 {
    grid-template-columns: repeat(2, 1fr);
  }

  .card-list-container {
    padding: 0.75rem;
  }

  .card-grid {
    gap: 1rem;
  }
}

@media (max-width: 640px) {
  .columns-2,
  .columns-3,
  .columns-4 {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .actions-desktop {
    display: none;
  }

  .actions-mobile {
    display: block;
  }

  .card-header,
  .card-body,
  .card-footer {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .card-header {
    padding-top: 1rem;
  }

  .card-footer {
    padding-bottom: 1rem;
  }
}
</style>
