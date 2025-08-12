<template>
  <div
    class="badges-container"
    :class="{
      stacked: badges.length > 2 && !expanded,
      expanded: expanded && badges.length > 2,
      'hover-lift': badges.length > 2,
    }"
    @click.stop="$emit('toggle-badges')"
  >
    <!-- Show first 2 badges when stacked, all badges when expanded -->
    <span
      v-for="(badge, badgeIndex) in getVisibleBadges(badges, expanded)"
      :key="badgeIndex"
      class="badge"
      :class="{
        'badge-stacked': badges.length > 2 && !expanded && badgeIndex > 0,
        'badge-blurred': badges.length > 2 && !expanded && badgeIndex > 0,
      }"
      :style="getBadgeStyle(badges.length, badgeIndex, expanded)"
      :title="
        shouldShowTooltip(badges.length, expanded)
          ? badge.title || badge.name
          : ''
      "
    >
      <img v-if="badge.icon" :src="badge.icon" :alt="badge.name" />
      <span v-else class="badge-text">{{ badge.name }}</span>
    </span>

    <!-- Stack count indicator for 3+ badges -->
    <div v-if="badges.length > 2 && !expanded" class="badge-stack-indicator">
      <span class="stack-count">{{ badges.length }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardBadge',
  props: {
    badges: {
      type: Array,
      required: true,
    },
    expanded: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['toggle-badges'],
  methods: {
    getVisibleBadges(badges, isExpanded) {
      if (badges.length <= 2 || isExpanded) {
        return badges
      }
      return badges.slice(0, 2)
    },
    shouldShowTooltip(totalBadges, isExpanded) {
      return totalBadges <= 2 || isExpanded
    },
    getBadgeStyle(totalBadges, badgeIndex, isExpanded) {
      if (totalBadges <= 2 || isExpanded) {
        return {}
      }

      // Stack the first 2 badges
      if (badgeIndex === 0) {
        return { zIndex: 12 }
      }

      if (badgeIndex === 1) {
        return {
          zIndex: 11,
          transform: 'translateX(-12px)',
        }
      }

      return {}
    },
  },
}
</script>

<style scoped>
.badges-container {
  display: flex;
  gap: 0.25rem;
  justify-content: flex-end;
  position: relative;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.badges-container.hover-lift:hover {
  transform: translateY(-2px);
}

.badges-container.stacked {
  gap: 0;
  width: fit-content;
  margin-left: auto;
}

.badges-container.expanded {
  gap: 0.5rem;
  justify-content: flex-end;
  width: 100%;
  flex-wrap: wrap;
}

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
}

.badge-stacked {
  margin-right: -12px;
}

.badge-blurred {
  filter: blur(1.5px);
  opacity: 0.8;
}

.badge img {
  width: 18px;
  height: 18px;
  object-fit: contain;
}

.badge-text {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--text-color);
}

.badge-stack-indicator {
  position: absolute;
  top: 0;
  right: 0;
  width: 28px;
  height: 28px;
  background: var(--primary-color);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 15;
  transition: all 0.3s ease;
}

.badges-container.hover-lift:hover .badge-stack-indicator {
  transform: scale(1.05);
}

.stack-count {
  font-size: 0.7rem;
  font-weight: 700;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

/* Expanded state animations */
.badges-container.expanded .badge {
  transform: none !important;
  filter: none !important;
  opacity: 1 !important;
  margin-right: 0 !important;
}

.badges-container.expanded .badge-stack-indicator {
  opacity: 0;
  transform: scale(0) rotate(180deg);
  pointer-events: none;
}

/* Dark mode adjustments */
.darkmode .badge {
  background: var(--secondary-lighter-variant);
  border: 1px solid var(--outline-color);
}

.darkmode .badge-stack-indicator {
  background: var(--primary-darker-variant);
}
</style>
