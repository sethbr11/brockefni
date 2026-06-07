<template>
  <div class="panel">
    <div class="panel-header">
      <h3 class="panel-title">1. Materials</h3>
      <div class="panel-header-actions">
        <button class="btn-text-action" @click="$emit('add-material-type')">
          🎨 Add Material Type
        </button>
        <button class="btn-text-action" @click="$emit('add-dimension-row')">
          ➕ Add Material Row
        </button>
      </div>
    </div>

    <div class="table-container">
      <table class="planner-table stock-table">
        <thead>
          <tr>
            <th style="width: 32%">Dimension (W x H)</th>
            <th style="width: 22%; text-align: center">
              <span
                class="hover-term"
                @mouseenter="
                  $emit(
                    'show-tooltip',
                    $event,
                    'The raw length of a single sheet, pipe, or board before cutting.'
                  )
                "
                @mouseleave="$emit('hide-tooltip')"
                >Stock Length</span
              >
            </th>
            <th style="width: 18%; text-align: center">
              <span
                class="hover-term"
                @mouseenter="
                  $emit(
                    'show-tooltip',
                    $event,
                    'The width of material removed by the saw blade during each cut (usually 1/8 inch).'
                  )
                "
                @mouseleave="$emit('hide-tooltip')"
                >Kerf</span
              >
            </th>
            <th style="width: 23%">Material Type</th>
            <th style="width: 5%"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(dim, idx) in dimensions" :key="idx">
            <td>
              <div class="dim-select-group">
                <div class="combobox-container">
                  <input
                    type="text"
                    v-model="dim.dim1"
                    class="table-input dim-part-input combobox-input"
                    placeholder="W"
                    @input="$emit('trigger-recalculate-flash')"
                  />
                  <select
                    class="combobox-select"
                    @change="onDim1Change(dim, $event)"
                  >
                    <option value="" disabled selected></option>
                    <option v-for="opt in commonDims" :key="opt" :value="opt">
                      {{ opt }}
                    </option>
                  </select>
                </div>
                <span class="dim-separator">x</span>
                <div class="combobox-container">
                  <input
                    type="text"
                    v-model="dim.dim2"
                    class="table-input dim-part-input combobox-input"
                    placeholder="H"
                    @input="$emit('trigger-recalculate-flash')"
                  />
                  <select
                    class="combobox-select"
                    @change="onDim2Change(dim, $event)"
                  >
                    <option value="" disabled selected></option>
                    <option v-for="opt in commonDims" :key="opt" :value="opt">
                      {{ opt }}
                    </option>
                  </select>
                </div>
              </div>
            </td>
            <td>
              <input
                v-model="dim.stockLength"
                type="text"
                class="table-input num"
                placeholder="e.g. 8' or 96"
                @input="$emit('trigger-recalculate-flash')"
              />
            </td>
            <td>
              <input
                v-model="dim.kerf"
                type="text"
                class="table-input num"
                placeholder="e.g. 1/8"
                @input="$emit('trigger-recalculate-flash')"
              />
            </td>
            <td>
              <div class="finish-selector-wrapper">
                <select
                  v-model="dim.materialId"
                  class="table-select"
                  @change="$emit('trigger-recalculate-flash')"
                >
                  <option
                    v-for="mat in materials"
                    :key="mat.id"
                    :value="mat.id"
                  >
                    {{ mat.name }}
                  </option>
                </select>
                <input
                  v-if="isCustomMaterial(dim.materialId)"
                  v-model="getMaterialRef(dim.materialId).color"
                  type="color"
                  class="color-picker-input"
                  title="Click to tweak custom material color"
                  @input="$emit('trigger-recalculate-flash')"
                />
              </div>
            </td>
            <td>
              <button
                class="delete-row-btn"
                @click="$emit('remove-dimension', idx)"
                :disabled="dimensions.length <= 1"
                title="Delete row"
              >
                &times;
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="utility-tip">
      💡 Tip: Enter lengths in inches, or use ' for feet (e.g. 8' = 96) and "
      for inches.
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { Dimension, MaterialType } from './scripts/types'

export default defineComponent({
  name: 'MaterialsTable',
  props: {
    dimensions: {
      type: Array as PropType<Dimension[]>,
      required: true,
    },
    materials: {
      type: Array as PropType<MaterialType[]>,
      required: true,
    },
    commonDims: {
      type: Array as PropType<string[]>,
      required: true,
    },
    isCustomMaterial: {
      type: Function as PropType<(id: string) => boolean>,
      required: true,
    },
    getMaterialRef: {
      type: Function as PropType<(id: string) => MaterialType>,
      required: true,
    },
  },
  emits: [
    'add-material-type',
    'add-dimension-row',
    'remove-dimension',
    'trigger-recalculate-flash',
    'show-tooltip',
    'hide-tooltip',
  ],
  setup(props, { emit }) {
    const onDim1Change = (dim: Dimension, event: Event) => {
      const target = event.target as HTMLSelectElement | null
      if (target) {
        dim.dim1 = target.value
        emit('trigger-recalculate-flash')
      }
    }

    const onDim2Change = (dim: Dimension, event: Event) => {
      const target = event.target as HTMLSelectElement | null
      if (target) {
        dim.dim2 = target.value
        emit('trigger-recalculate-flash')
      }
    }

    return {
      onDim1Change,
      onDim2Change,
    }
  },
})
</script>
