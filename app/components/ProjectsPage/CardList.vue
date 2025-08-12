<template>
  <div class="card-list-container">
    <div class="card-grid" :class="`columns-${columns}`">
      <CardComponent
        v-for="(card, index) in cards"
        :key="index"
        :card="card"
        :badges-expanded="expandedBadges[index]"
        :show-badges="true"
        @toggle-badges="toggleBadges(index)"
        @action-click="handleActionClick"
      />
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import CardComponent from '@/components/CardComponent.vue'

export default {
  name: 'CardList',
  components: {
    CardComponent,
  },
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
    const expandedBadges = reactive({})

    const toggleBadges = (cardIndex) => {
      expandedBadges[cardIndex] = !expandedBadges[cardIndex]
    }

    const handleActionClick = (action) => {
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
    }

    return {
      expandedBadges,
      toggleBadges,
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
</style>
