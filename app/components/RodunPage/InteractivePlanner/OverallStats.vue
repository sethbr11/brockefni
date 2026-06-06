<template>
  <div class="overall-stats-panel">
    <div class="o-stat">
      <span
        class="o-label hover-term"
        @mouseenter="
          $emit(
            'show-tooltip',
            $event,
            'The number of unique material & size profiles processed in this plan.'
          )
        "
        @mouseleave="$emit('hide-tooltip')"
      >
        Materials
      </span>
      <span class="o-val">{{ activeDimensionGroupsLength }}</span>
    </div>
    <div class="o-stat">
      <span
        class="o-label hover-term"
        @mouseenter="
          $emit(
            'show-tooltip',
            $event,
            'The total number of raw stock boards needed to complete all cuts.'
          )
        "
        @mouseleave="$emit('hide-tooltip')"
      >
        Total Boards
      </span>
      <span class="o-val text-orange">{{ totalBoardsNeeded }}</span>
    </div>
    <div class="o-stat">
      <span
        class="o-label hover-term"
        @mouseenter="
          $emit(
            'show-tooltip',
            $event,
            'The average material efficiency. A higher percentage means less discarded scrap.'
          )
        "
        @mouseleave="$emit('hide-tooltip')"
      >
        Avg Yield
      </span>
      <span class="o-val text-green">{{ averageYield }}%</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'OverallStats',
  props: {
    activeDimensionGroupsLength: {
      type: Number,
      required: true,
    },
    totalBoardsNeeded: {
      type: Number,
      required: true,
    },
    averageYield: {
      type: Number,
      required: true,
    },
  },
  emits: ['show-tooltip', 'hide-tooltip'],
})
</script>
