<template>
  <div>
    <!-- Tab Filters to prevent infinite scroll -->
    <div v-if="activeDimensionGroups.length > 1" class="tab-filters-container">
      <button
        class="tab-btn"
        :class="{ active: selectedFilter === 'all' }"
        @click="$emit('update:selectedFilter', 'all')"
      >
        ALL
      </button>
      <button
        v-for="tab in filterTabs"
        :key="tab"
        class="tab-btn"
        :class="{ active: selectedFilter === tab }"
        @click="$emit('update:selectedFilter', tab)"
      >
        {{ tab }}
      </button>
    </div>

    <!-- Grouped Results -->
    <div v-if="filteredDimensionGroups.length === 0" class="no-results-panel">
      <div class="no-results-icon">📏</div>
      <p>
        Define matching stock dimensions and parts to run layout calculations.
      </p>
    </div>

    <div
      v-for="group in filteredDimensionGroups"
      :key="group.dimension"
      class="dimension-group-card"
      :class="{ 'recalculating-flash': isFlashing }"
    >
      <div class="group-header">
        <h3 class="group-title">
          Material: <span class="highlight">{{ group.dimension }}</span>
          <span class="group-stock-badge"
            >({{ getMaterialRef(group.materialId).name }})</span
          >
        </h3>
        <div class="group-stats">
          <span
            >Stock Length:
            <strong>{{ group.stockLength.toFixed(1) }}"</strong></span
          >
          <span class="divider">|</span>
          <span
            >Boards: <strong>{{ group.layouts.length }}</strong></span
          >
          <span class="divider">|</span>
          <span>
            <span
              class="hover-term"
              @mouseenter="
                $emit(
                  'show-tooltip',
                  $event,
                  'The percentage of stock material successfully used for parts.'
                )
              "
              @mouseleave="$emit('hide-tooltip')"
              >Yield</span
            >:
            <strong class="text-green">{{ group.yieldPercent }}%</strong>
          </span>
        </div>
      </div>

      <!-- Board Visualization Track -->
      <div class="board-layouts-track">
        <div v-for="board in group.layouts" :key="board.id" class="board-row">
          <div class="board-meta">
            <span class="board-name">Stock #{{ board.id }}</span>
            <span class="board-detail"
              >Used: {{ board.usedLength.toFixed(1) }}" /
              {{ group.stockLength.toFixed(1) }}"</span
            >
          </div>
          <div class="board-track-container">
            <div
              v-for="(seg, sIdx) in board.segments"
              :key="sIdx"
              class="board-segment"
              :class="[
                seg.isWaste ? 'seg-waste' : '',
                seg.isKerf ? 'seg-kerf' : '',
                !seg.isWaste && !seg.isKerf
                  ? getMaterialClass(group.materialId)
                  : '',
              ]"
              :style="[
                { width: (seg.length / group.stockLength) * 100 + '%' },
                !seg.isWaste && !seg.isKerf
                  ? getMaterialStyle(group.materialId, seg.partId)
                  : {},
              ]"
              @mouseenter="
                $emit(
                  'show-tooltip',
                  $event,
                  getSegmentTooltipHtml(seg, group.materialId)
                )
              "
              @mouseleave="$emit('hide-tooltip')"
            >
              <!-- Label with scale checks and badge for waste contrast -->
              <span
                v-if="!seg.isKerf"
                class="seg-label"
                :class="{ 'waste-label-badge': seg.isWaste }"
              >
                <template v-if="seg.length / group.stockLength > 0.15">
                  {{ seg.isWaste ? 'Waste' : seg.name }}
                  <span class="seg-len">{{ seg.length.toFixed(1) }}"</span>
                </template>
                <template v-else-if="seg.length / group.stockLength > 0.06">
                  {{ seg.length.toFixed(1) }}"
                </template>
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Parts Summary Table for this Dimension -->
      <h4 class="summary-table-title">Parts Summary ({{ group.dimension }})</h4>
      <div class="table-container">
        <table class="summary-table">
          <thead>
            <tr>
              <th style="width: 10%">ID</th>
              <th style="width: 30%">Part Label</th>
              <th style="width: 15%; text-align: center">Length</th>
              <th style="width: 15%; text-align: center">Qty</th>
              <th style="width: 15%; text-align: center">Stocks</th>
              <th style="width: 15%">Dimension</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(pSummary, pIdx) in group.partsSummary" :key="pIdx">
              <td>{{ pIdx + 1 }}</td>
              <td class="text-bold">{{ pSummary.name }}</td>
              <td class="num text-center">{{ pSummary.length.toFixed(2) }}"</td>
              <td class="num text-center">{{ pSummary.qty }}</td>
              <td class="text-center">
                {{ pSummary.stocksUsed.join(', ') }}
              </td>
              <td>{{ group.dimension }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { DimensionGroup, MaterialType } from './types'

export default defineComponent({
  name: 'VisualizerPanel',
  props: {
    activeDimensionGroups: {
      type: Array as PropType<DimensionGroup[]>,
      required: true,
    },
    filteredDimensionGroups: {
      type: Array as PropType<DimensionGroup[]>,
      required: true,
    },
    filterTabs: {
      type: Array as PropType<string[]>,
      required: true,
    },
    selectedFilter: {
      type: String,
      required: true,
    },
    isFlashing: {
      type: Boolean,
      default: false,
    },
    getMaterialRef: {
      type: Function as PropType<(id: string) => MaterialType>,
      required: true,
    },
    getMaterialClass: {
      type: Function as PropType<(id: string) => string>,
      required: true,
    },
    getMaterialStyle: {
      type: Function as PropType<
        (id: string, partId?: string) => Record<string, string>
      >,
      required: true,
    },
    getSegmentTooltipHtml: {
      type: Function as PropType<(seg: any, materialId: string) => string>,
      required: true,
    },
  },
  emits: ['update:selectedFilter', 'show-tooltip', 'hide-tooltip'],
})
</script>
