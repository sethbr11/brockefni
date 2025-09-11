<template>
  <div
    class="card"
    :class="{
      clickable: card.link,
      'badges-expanded':
        badgesExpanded && card.badges && card.badges.length > 2,
      'project-card-mode': projectCardMode,
    }"
    @click="handleCardClick"
  >
    <!-- Project Card Mode - Structured Content -->
    <template v-if="projectCardMode">
      <!-- Badges -->
      <div
        v-if="showBadges && card.badges && card.badges.length > 0"
        class="card-badges"
      >
        <CardBadge
          :badges="card.badges"
          :expanded="badgesExpanded"
          @toggle-badges="$emit('toggle-badges')"
        />
      </div>

      <!-- Card Header -->
      <div
        class="card-header"
        :class="{
          'header-pushed':
            badgesExpanded && card.badges && card.badges.length > 2,
        }"
      >
        <h3 class="card-title">{{ card.title }}</h3>
      </div>

      <!-- Card Body -->
      <div class="card-body">
        <p v-if="card.description" class="card-description">
          {{ card.description }}
        </p>
        <slot name="body"></slot>
      </div>

      <!-- Card Footer -->
      <div class="card-footer">
        <!-- Main Link -->
        <a
          v-if="card.link && card.link.text"
          :href="card.link.url"
          class="card-link"
          :target="card.link.external ? '_blank' : '_self'"
          @click.stop
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
          <div class="actions">
            <button
              v-for="(action, actionIndex) in card.actions"
              :key="actionIndex"
              class="action-button"
              :style="{ backgroundColor: action.color || '#6366f1' }"
              @click.stop="handleActionClick(action)"
            >
              <span v-if="action.icon" class="action-icon">
                <img :src="action.icon" :alt="action.text" />
              </span>
              <span class="action-text">{{ action.text }}</span>
            </button>
          </div>
        </div>
        <slot name="footer"></slot>
      </div>
    </template>

    <!-- Standard Mode - Custom Content -->
    <template v-else>
      <slot></slot>
    </template>
  </div>
</template>

<script>
import CardBadge from './CardBadge.vue'

export default {
  name: 'CardComponent',
  components: {
    CardBadge,
  },
  props: {
    card: {
      type: Object,
      required: false,
      default: () => ({}),
      validator: (card) => {
        return !card.title || typeof card.title === 'string'
      },
    },
    badgesExpanded: {
      type: Boolean,
      default: false,
    },
    showBadges: {
      type: Boolean,
      default: true,
    },
    projectCardMode: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['toggle-badges', 'action-click'],
  methods: {
    handleCardClick(event) {
      if (
        event.target.closest('.action-button') ||
        event.target.closest('.card-link') ||
        event.target.closest('.badges-container')
      ) {
        return
      }

      if (this.card.link) {
        if (this.card.link.external) {
          window.open(this.card.link.url, '_blank')
        } else {
          window.location.href = this.card.link.url
        }
      }
    },
    handleActionClick(action) {
      this.$emit('action-click', action)

      if (action.link) {
        if (action.link.startsWith('http')) {
          window.open(action.link, '_blank')
        } else {
          window.location.href = action.link
        }
      }

      if (action.callback && typeof action.callback === 'function') {
        action.callback()
      }
    },
  },
}
</script>

<style scoped>
/* Card styles with badge expansion support */
.card {
  background: var(--background-variant);
  border-radius: 12px;
  box-shadow: 0 2px 8px var(--shadow);
  border: 1px solid var(--outline-color);
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  position: relative;
}

.card.badges-expanded {
  /* Add extra space at top when badges are expanded */
  padding-top: 1rem;
}

.card.clickable {
  cursor: pointer;
}

.card.clickable:hover,
.card:hover {
  box-shadow: 0 8px 25px var(--heavy-shadow);
  transform: translateY(-4px);
}

.card.project-card-mode {
  /* Project card mode uses structured layout */
  padding: 0;
}

.card-header {
  padding: 1.5rem 1.5rem 0;
  transition: all 0.3s ease;
}

.card-header.header-pushed {
  padding-top: 2.5rem;
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
  left: 0.75rem;
  z-index: 10;
  transition: all 0.3s ease;
}

@media (max-width: 480px) {
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
