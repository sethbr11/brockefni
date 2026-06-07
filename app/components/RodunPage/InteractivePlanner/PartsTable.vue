<template>
  <div class="panel">
    <div class="panel-header">
      <h3 class="panel-title">2. Required Parts</h3>
      <button class="btn-text text-danger" @click="$emit('clear-parts')">
        Clear All
      </button>
    </div>

    <div class="table-container">
      <table class="planner-table parts-table">
        <thead>
          <tr>
            <th style="width: 25%">Part Label</th>
            <th style="width: 37%">Material</th>
            <th style="width: 20%; text-align: center">
              <span
                class="hover-term"
                @mouseenter="
                  $emit(
                    'show-tooltip',
                    $event,
                    'The final desired length of the cut part.'
                  )
                "
                @mouseleave="$emit('hide-tooltip')"
                >Cut Length</span
              >
            </th>
            <th style="width: 13%; text-align: center">
              <span
                class="hover-term"
                @mouseenter="
                  $emit(
                    'show-tooltip',
                    $event,
                    'Quantity: The total number of identical parts required.'
                  )
                "
                @mouseleave="$emit('hide-tooltip')"
                >Qty</span
              >
            </th>
            <th style="width: 5%"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(part, idx) in parts" :key="part.id">
            <td>
              <input
                v-model="part.name"
                type="text"
                class="table-input"
                placeholder="e.g. Leg"
              />
            </td>
            <td>
              <select
                v-model="part.materialId"
                class="table-select"
                @change="$emit('trigger-recalculate-flash')"
              >
                <option v-for="dim in dimensions" :key="dim.id" :value="dim.id">
                  {{ getDimensionProfileLabel(dim) }}
                </option>
              </select>
            </td>
            <td>
              <input
                v-model="part.length"
                type="text"
                class="table-input num"
                placeholder="e.g. 34-1/2"
                @input="$emit('trigger-recalculate-flash')"
              />
            </td>
            <td>
              <input
                v-model.number="part.qty"
                type="number"
                min="1"
                class="table-input num"
                @input="$emit('trigger-recalculate-flash')"
              />
            </td>
            <td>
              <button
                class="delete-row-btn"
                @click="$emit('remove-part', idx)"
                title="Delete row"
              >
                &times;
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <button class="btn btn-secondary btn-full" @click="$emit('add-part-row')">
      ➕ Add Part Row
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { Part, Dimension } from './scripts/types'

export default defineComponent({
  name: 'PartsTable',
  props: {
    parts: {
      type: Array as PropType<Part[]>,
      required: true,
    },
    dimensions: {
      type: Array as PropType<Dimension[]>,
      required: true,
    },
    getDimensionProfileLabel: {
      type: Function as PropType<(dim: Dimension) => string>,
      required: true,
    },
  },
  emits: [
    'clear-parts',
    'remove-part',
    'add-part-row',
    'trigger-recalculate-flash',
    'show-tooltip',
    'hide-tooltip',
  ],
})
</script>
