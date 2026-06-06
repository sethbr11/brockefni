<template>
  <section class="planner-section" :class="{ 'is-visible': isVisible }">
    <!-- Blueprint Theme Grid Background -->
    <div class="blueprint-theme-grid"></div>

    <!-- Mobile Portrait Hero Section -->
    <div class="mobile-portrait-hero">
      <img
        src="@/assets/images/rodunLogo.png"
        class="mobile-hero-logo"
        alt="Rodun Logo"
      />
      <h1 class="mobile-hero-title gradient-text">Röðun</h1>
      <p class="mobile-hero-desc">
        A responsive 1D cutting stock solver designed to maximize yield and
        minimize scrap.
      </p>
    </div>

    <!-- Mobile Portrait Rotate Prompt / Desktop Resize Prompt -->
    <div class="rotate-prompt">
      <div v-if="isMobileDevice" class="phone-icon"></div>
      <div v-else class="resize-icon"></div>
      <h3>
        {{ isMobileDevice ? 'Rotate Your Device' : 'Expand Your Window' }}
      </h3>
      <p>
        {{
          isMobileDevice
            ? 'Please turn your phone sideways for the best experience with the cut planner.'
            : 'Please make your browser window wider to use the cut planner.'
        }}
      </p>
    </div>

    <div class="content-container">
      <!-- Unified Header Block (Title, Icelandic notes, Presets, and PDF Export) -->
      <PlannerHeader
        :isGeneratingPDF="isGeneratingPDF"
        @show-tooltip="showGlobalTooltip"
        @hide-tooltip="hideGlobalTooltip"
        @load-preset="loadPreset"
        @export-pdf="exportToPDF"
      />

      <!-- Main Workspace -->
      <div class="workspace-grid">
        <!-- LEFT COLUMN: Configurations (Stock Dimensions and Required Parts) -->
        <div class="config-column">
          <!-- 1. Stock Materials / Dimensions -->
          <MaterialsTable
            :dimensions="dimensions"
            :materials="materials"
            :commonDims="commonDims"
            :isCustomMaterial="isCustomMaterial"
            :getMaterialRef="getMaterialRef"
            @add-material-type="showAddMaterialModal = true"
            @add-dimension-row="addDimensionRow"
            @remove-dimension="removeDimension"
            @trigger-recalculate-flash="triggerRecalculateFlash"
            @show-tooltip="showGlobalTooltip"
            @hide-tooltip="hideGlobalTooltip"
          />

          <!-- 2. Required Parts -->
          <PartsTable
            :parts="parts"
            :dimensions="dimensions"
            :getDimensionProfileLabel="getDimensionProfileLabel"
            @clear-parts="clearParts"
            @remove-part="removePart"
            @add-part-row="addPartRow"
            @trigger-recalculate-flash="triggerRecalculateFlash"
            @show-tooltip="showGlobalTooltip"
            @hide-tooltip="hideGlobalTooltip"
          />
        </div>

        <!-- RIGHT COLUMN: Solver Visualizations & Summary -->
        <div class="results-column-wrapper">
          <div class="results-column">
            <!-- Overall Stats Summary -->
            <OverallStats
              :activeDimensionGroupsLength="activeDimensionGroups.length"
              :totalBoardsNeeded="totalBoardsNeeded"
              :averageYield="averageYield"
              @show-tooltip="showGlobalTooltip"
              @hide-tooltip="hideGlobalTooltip"
            />

            <!-- Visualizer Panel -->
            <VisualizerPanel
              v-model:selectedFilter="selectedFilter"
              :activeDimensionGroups="activeDimensionGroups"
              :filteredDimensionGroups="filteredDimensionGroups"
              :filterTabs="filterTabs"
              :isFlashing="isFlashing"
              :getMaterialRef="getMaterialRef"
              :getMaterialClass="getMaterialClass"
              :getMaterialStyle="getMaterialStyle"
              :getSegmentTooltipHtml="getSegmentTooltipHtml"
              @show-tooltip="showGlobalTooltip"
              @hide-tooltip="hideGlobalTooltip"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Create Custom Material Modal -->
    <CustomMaterialModal
      :show="showAddMaterialModal"
      v-model:name="newMaterialName"
      v-model:color="newMaterialColor"
      @close="showAddMaterialModal = false"
      @create="addCustomMaterial"
    />

    <!-- Global Tooltip Teleport -->
    <Teleport to="body">
      <div
        class="global-term-tooltip"
        :style="globalTooltipStyle"
        v-html="globalTooltipText"
      ></div>
    </Teleport>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, nextTick } from 'vue'
import PlannerHeader from './PlannerHeader.vue'
import MaterialsTable from './MaterialsTable.vue'
import PartsTable from './PartsTable.vue'
import OverallStats from './OverallStats.vue'
import VisualizerPanel from './VisualizerPanel.vue'
import CustomMaterialModal from './CustomMaterialModal.vue'

import type {
  Dimension,
  Part,
  MaterialType,
  DimensionGroup,
  CutSegment,
} from './types'
import {
  getPartColorByIndex,
  adjustColorBrightness,
  isColorDark,
  parseImperialLength,
} from './utils'
import { solve1DCuttingStock } from './solver'
import { exportActiveLayoutsToPDF } from './pdfExporter'

export default defineComponent({
  name: 'InteractivePlanner',
  components: {
    PlannerHeader,
    MaterialsTable,
    PartsTable,
    OverallStats,
    VisualizerPanel,
    CustomMaterialModal,
  },
  setup() {
    const isVisible = ref(false)
    const isMobileDevice = ref(false)
    const isGeneratingPDF = ref(false)
    const showAddMaterialModal = ref(false)
    const isFlashing = ref(false)
    const selectedFilter = ref('all')

    // Recalculation flash micro-animation trigger
    const triggerRecalculateFlash = () => {
      isFlashing.value = true
      setTimeout(() => {
        isFlashing.value = false
      }, 400)
    }

    // Material Types Definitions
    const materials = ref<MaterialType[]>([
      { id: 'wood-oak', name: 'Wood (Oak)', finish: 'wood', color: '#b5804c' },
      {
        id: 'wood-walnut',
        name: 'Wood (Walnut)',
        finish: 'wood',
        color: '#5c4033',
      },
      {
        id: 'wood-cherry',
        name: 'Wood (Cherry)',
        finish: 'wood',
        color: '#8b4513',
      },
      {
        id: 'carbon-steel',
        name: 'Carbon Steel',
        finish: 'steel',
        color: '#70757a',
      },
      {
        id: 'brushed-aluminum',
        name: 'Brushed Aluminum',
        finish: 'aluminum',
        color: '#d1d5db',
      },
      { id: 'copper', name: 'Copper', finish: 'copper', color: '#ea580c' },
      { id: 'brass', name: 'Brass', finish: 'steel', color: '#b5a642' },
      {
        id: 'acrylic-clear',
        name: 'Acrylic (Clear)',
        finish: 'acrylic',
        color: '#e2f1f8',
      },
      {
        id: 'acrylic-blue',
        name: 'Acrylic (Blue)',
        finish: 'acrylic',
        color: '#0ea5e9',
      },
      { id: 'pvc-white', name: 'PVC (White)', finish: 'pvc', color: '#f3f4f6' },
      { id: 'abs-black', name: 'ABS (Black)', finish: 'pvc', color: '#1f2937' },
    ])

    const newMaterialName = ref('')
    const newMaterialColor = ref('#a2703f')

    // Core Dimensions Configuration
    const dimensions = ref<Dimension[]>([
      {
        id: 'mat-1',
        dim1: '1-1/2',
        dim2: '3-1/2',
        stockLength: '96',
        kerf: '0.125',
        materialId: 'wood-oak',
      },
      {
        id: 'mat-2',
        dim1: '3/4',
        dim2: '3-1/2',
        stockLength: '96',
        kerf: '0.125',
        materialId: 'wood-oak',
      },
      {
        id: 'mat-3',
        dim1: '1.5',
        dim2: '1.5',
        stockLength: '72',
        kerf: '0.0625',
        materialId: 'carbon-steel',
      },
    ])

    // Required Parts Configuration
    const parts = ref<Part[]>([
      {
        id: '1',
        name: 'Workbench Legs',
        length: '34.5',
        qty: 4,
        color: getPartColorByIndex(0),
        materialId: 'mat-1',
      },
      {
        id: '2',
        name: 'Top Frame Rails',
        length: '50',
        qty: 4,
        color: getPartColorByIndex(1),
        materialId: 'mat-1',
      },
      {
        id: '3',
        name: 'Top Deck Boards',
        length: '50',
        qty: 8,
        color: getPartColorByIndex(2),
        materialId: 'mat-2',
      },
      {
        id: '4',
        name: 'Bracing Angles',
        length: '14.25',
        qty: 4,
        color: getPartColorByIndex(3),
        materialId: 'mat-3',
      },
    ])

    const isCustomMaterial = (materialId: string) => {
      return materialId.startsWith('custom-')
    }

    const getMaterialRef = (materialId: string) => {
      const mat = materials.value.find((m) => m.id === materialId)
      return (
        mat || {
          id: 'unknown',
          name: 'Unknown',
          color: '#d87628',
          finish: 'custom' as const,
        }
      )
    }

    const addCustomMaterial = () => {
      if (!newMaterialName.value.trim()) return
      const id = `custom-${Date.now()}`
      materials.value.push({
        id,
        name: newMaterialName.value.trim(),
        finish: 'custom',
        color: newMaterialColor.value,
      })

      // Auto-assign custom material to the latest stock row
      const latestDim = dimensions.value[dimensions.value.length - 1]
      if (latestDim) {
        latestDim.materialId = id
      }

      // Reset fields and close modal
      newMaterialName.value = ''
      newMaterialColor.value = '#a2703f'
      showAddMaterialModal.value = false
      triggerRecalculateFlash()
    }

    const addDimensionRow = () => {
      const id = `mat-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      dimensions.value.push({
        id,
        dim1: '2',
        dim2: '4',
        stockLength: '96',
        kerf: '0.125',
        materialId: 'wood-oak',
      })
      triggerRecalculateFlash()
    }

    const removeDimension = (index: number) => {
      if (dimensions.value.length > 1) {
        const removedId = dimensions.value[index]?.id || ''
        dimensions.value.splice(index, 1)
        const newFirstId = dimensions.value[0]?.id || ''
        parts.value.forEach((p) => {
          if (p.materialId === removedId) {
            p.materialId = newFirstId
          }
        })
        triggerRecalculateFlash()
      }
    }

    const addPartRow = () => {
      const id = (parts.value.length + 1).toString()
      const color = getPartColorByIndex(parts.value.length)
      const firstDim = dimensions.value[0]
      parts.value.push({
        id,
        name: `Part ${id}`,
        length: '12',
        qty: 2,
        color,
        materialId: firstDim ? firstDim.id : '',
      })
      triggerRecalculateFlash()
    }

    const removePart = (index: number) => {
      parts.value.splice(index, 1)
      triggerRecalculateFlash()
    }

    const clearParts = () => {
      parts.value = []
      triggerRecalculateFlash()
    }

    const getPartColor = (partId?: string) => {
      const part = parts.value.find((p) => p.id === partId)
      return part ? part.color : 'rgba(216, 118, 40, 0.75)'
    }

    const loadPreset = (presetName: string) => {
      if (presetName === 'workbench') {
        dimensions.value = [
          {
            id: 'mat-1',
            dim1: '1-1/2',
            dim2: '3-1/2',
            stockLength: '96',
            kerf: '0.125',
            materialId: 'wood-oak',
          },
          {
            id: 'mat-2',
            dim1: '3/4',
            dim2: '3-1/2',
            stockLength: '96',
            kerf: '0.125',
            materialId: 'wood-oak',
          },
          {
            id: 'mat-3',
            dim1: '1.5',
            dim2: '1.5',
            stockLength: '72',
            kerf: '0.0625',
            materialId: 'carbon-steel',
          },
        ]
        parts.value = [
          {
            id: '1',
            name: 'Workbench Legs',
            length: '34.5',
            qty: 4,
            color: getPartColorByIndex(0),
            materialId: 'mat-1',
          },
          {
            id: '2',
            name: 'Top Frame Rails',
            length: '50',
            qty: 4,
            color: getPartColorByIndex(1),
            materialId: 'mat-1',
          },
          {
            id: '3',
            name: 'Top Deck Boards',
            length: '50',
            qty: 8,
            color: getPartColorByIndex(2),
            materialId: 'mat-2',
          },
          {
            id: '4',
            name: 'Bracing Angles',
            length: '14.25',
            qty: 4,
            color: getPartColorByIndex(3),
            materialId: 'mat-3',
          },
        ]
      } else if (presetName === 'tech-desk') {
        dimensions.value = [
          {
            id: 'mat-1',
            dim1: '2',
            dim2: '2',
            stockLength: '60',
            kerf: '0.0625',
            materialId: 'carbon-steel',
          },
          {
            id: 'mat-2',
            dim1: '1-1/2',
            dim2: '12',
            stockLength: '72',
            kerf: '0.125',
            materialId: 'wood-walnut',
          },
          {
            id: 'mat-3',
            dim1: '1/2',
            dim2: '1/2',
            stockLength: '48',
            kerf: '0',
            materialId: 'acrylic-clear',
          },
        ]
        parts.value = [
          {
            id: '1',
            name: 'Steel Leg Left',
            length: '28.5',
            qty: 2,
            color: getPartColorByIndex(0),
            materialId: 'mat-1',
          },
          {
            id: '2',
            name: 'Steel Leg Right',
            length: '28.5',
            qty: 2,
            color: getPartColorByIndex(1),
            materialId: 'mat-1',
          },
          {
            id: '3',
            name: 'Cross Brace',
            length: '48',
            qty: 2,
            color: getPartColorByIndex(2),
            materialId: 'mat-1',
          },
          {
            id: '4',
            name: 'Walnut Slab Left',
            length: '60',
            qty: 2,
            color: getPartColorByIndex(3),
            materialId: 'mat-2',
          },
          {
            id: '5',
            name: 'Walnut Slab Center',
            length: '60',
            qty: 1,
            color: getPartColorByIndex(4),
            materialId: 'mat-2',
          },
          {
            id: '6',
            name: 'LED Track Diffuser',
            length: '42',
            qty: 2,
            color: getPartColorByIndex(5),
            materialId: 'mat-3',
          },
        ]
      } else if (presetName === 'shelving-unit') {
        dimensions.value = [
          {
            id: 'mat-1',
            dim1: '3/4',
            dim2: '3/4',
            stockLength: '120',
            kerf: '0.0625',
            materialId: 'copper',
          },
          {
            id: 'mat-2',
            dim1: '3/4',
            dim2: '8',
            stockLength: '96',
            kerf: '0.125',
            materialId: 'wood-walnut',
          },
        ]
        parts.value = [
          {
            id: '1',
            name: 'Pipe Upright A',
            length: '36',
            qty: 4,
            color: getPartColorByIndex(0),
            materialId: 'mat-1',
          },
          {
            id: '2',
            name: 'Pipe Crossbar',
            length: '12',
            qty: 6,
            color: getPartColorByIndex(1),
            materialId: 'mat-1',
          },
          {
            id: '3',
            name: 'Walnut Shelf Planks',
            length: '42',
            qty: 3,
            color: getPartColorByIndex(2),
            materialId: 'mat-2',
          },
          {
            id: '4',
            name: 'Support Pipe B',
            length: '18',
            qty: 4,
            color: getPartColorByIndex(3),
            materialId: 'mat-1',
          },
        ]
      } else if (presetName === 'blank') {
        dimensions.value = []
        parts.value = []
      }
      selectedFilter.value = 'all'
      triggerRecalculateFlash()
    }

    // Solve 1D Cutting Stock per Dimension Group
    const activeDimensionGroups = computed<DimensionGroup[]>(() => {
      return solve1DCuttingStock(
        dimensions.value,
        parts.value,
        materials.value,
        getMaterialRef
      )
    })

    const totalBoardsNeeded = computed(() => {
      return activeDimensionGroups.value.reduce(
        (acc, g) => acc + g.layouts.length,
        0
      )
    })

    const averageYield = computed(() => {
      if (activeDimensionGroups.value.length === 0) return 0
      const totalYield = activeDimensionGroups.value.reduce(
        (acc, g) => acc + g.yieldPercent,
        0
      )
      return Math.round(totalYield / activeDimensionGroups.value.length)
    })

    // Filter Navigation Tabs list
    const filterTabs = computed(() => {
      const tabs = new Set<string>()
      activeDimensionGroups.value.forEach((g) => {
        tabs.add(g.tabLabel)
      })
      return Array.from(tabs)
    })

    // Filtered Groups list
    const filteredDimensionGroups = computed(() => {
      if (selectedFilter.value === 'all') {
        return activeDimensionGroups.value
      }
      if (!filterTabs.value.includes(selectedFilter.value)) {
        return activeDimensionGroups.value
      }
      return activeDimensionGroups.value.filter(
        (g) => g.tabLabel === selectedFilter.value
      )
    })

    const getMaterialClass = (materialId: string) => {
      const mat = materials.value.find((m) => m.id === materialId)
      if (!mat) return 'finish-wood'
      return `finish-${mat.finish}`
    }

    const getMaterialStyle = (
      materialId: string,
      partId?: string
    ): Record<string, string> => {
      const mat = materials.value.find((m) => m.id === materialId)
      if (!mat) return {}

      const color = mat.color
      const light = adjustColorBrightness(color, 25)
      const mid = color
      const dark = adjustColorBrightness(color, -25)
      const textColor = isColorDark(color) ? '#ffffff' : '#191b20'

      return {
        '--mat-light': light,
        '--mat-mid': mid,
        '--mat-dark': dark,
        '--mat-text': textColor,
      }
    }

    // jsPDF Cut Sheet Exporter
    const exportToPDF = async () => {
      isGeneratingPDF.value = true
      try {
        await exportActiveLayoutsToPDF(
          activeDimensionGroups.value,
          materials.value
        )
      } catch (err) {
        console.error(err)
        alert('Failed to generate PDF')
      } finally {
        isGeneratingPDF.value = false
      }
    }

    const globalTooltipText = ref('')
    const globalTooltipStyle = ref<Record<string, string | number>>({
      position: 'fixed',
      top: '0px',
      left: '0px',
      opacity: 0,
      pointerEvents: 'none',
      zIndex: 99999,
    })

    const showGlobalTooltip = (event: MouseEvent, text: string) => {
      globalTooltipText.value = text
      const target = event.currentTarget as HTMLElement
      if (!target) return

      const rect = target.getBoundingClientRect()

      nextTick(() => {
        const tooltipEl = document.querySelector(
          '.global-term-tooltip'
        ) as HTMLElement
        const tooltipWidth = tooltipEl ? tooltipEl.offsetWidth : 220
        const tooltipHeight = tooltipEl ? tooltipEl.offsetHeight : 60

        let left = rect.left + rect.width / 2 - tooltipWidth / 2
        let top = rect.bottom + 8

        // Flip above trigger if tooltip would overflow bottom of viewport
        if (top + tooltipHeight > window.innerHeight - 10) {
          top = rect.top - tooltipHeight - 8
        }

        if (left < 10) {
          left = 10
        } else if (left + tooltipWidth > window.innerWidth - 10) {
          left = window.innerWidth - tooltipWidth - 10
        }

        globalTooltipStyle.value = {
          position: 'fixed',
          top: `${top}px`,
          left: `${left}px`,
          opacity: 1,
          pointerEvents: 'none',
          zIndex: 99999,
        }
      })
    }

    const hideGlobalTooltip = () => {
      globalTooltipStyle.value = {
        ...globalTooltipStyle.value,
        opacity: 0,
      }
    }

    const getDimensionProfileLabel = (dim: Dimension) => {
      const mat = getMaterialRef(dim.materialId)
      const d1 = dim.dim1 || ''
      const d2 = dim.dim2 || ''
      return `${d1}" x ${d2}" ${mat.name} (${dim.stockLength}" stock)`
    }

    const commonDims = [
      '1/4',
      '1/2',
      '3/4',
      '1',
      '1-1/4',
      '1-1/2',
      '1-3/4',
      '2',
      '2-1/4',
      '2-1/2',
    ]

    const getSegmentTooltipHtml = (seg: CutSegment, materialId: string) => {
      const title = seg.isWaste
        ? 'Waste Piece'
        : seg.isKerf
          ? 'Saw Kerf'
          : seg.name || 'Part'
      let html = `<strong>${title}</strong><br>Length: ${seg.length.toFixed(2)} in`
      if (!seg.isWaste && !seg.isKerf) {
        const mat = getMaterialRef(materialId)
        html += `<div class="tooltip-detail">Material: ${mat.name}</div>`
      }
      return html
    }

    onMounted(() => {
      const ua = navigator.userAgent
      isMobileDevice.value =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          ua
        ) ||
        (navigator.maxTouchPoints > 0 && window.innerWidth < 1024)

      setTimeout(() => {
        isVisible.value = true
      }, 100)
    })

    return {
      isVisible,
      isMobileDevice,
      materials,
      newMaterialName,
      newMaterialColor,
      showAddMaterialModal,
      isFlashing,
      triggerRecalculateFlash,
      dimensions,
      parts,
      selectedFilter,
      filterTabs,
      filteredDimensionGroups,
      isCustomMaterial,
      getMaterialRef,
      addCustomMaterial,
      addDimensionRow,
      removeDimension,
      addPartRow,
      removePart,
      clearParts,
      loadPreset,
      activeDimensionGroups,
      totalBoardsNeeded,
      averageYield,
      getPartColor,
      getMaterialClass,
      getMaterialStyle,
      exportToPDF,
      isGeneratingPDF,
      globalTooltipText,
      globalTooltipStyle,
      showGlobalTooltip,
      hideGlobalTooltip,
      getDimensionProfileLabel,
      commonDims,
      getSegmentTooltipHtml,
    }
  },
})
</script>

<style src="./styles.css"></style>
