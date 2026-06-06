<template>
  <div class="app-header-block">
    <div class="header-logo-title">
      <img
        src="@/assets/images/rodunLogo.png"
        class="app-logo"
        alt="Rodun Logo"
      />
      <div class="header-text-group">
        <div class="title-row">
          <h1 class="app-title gradient-text">Röðun</h1>
          <span class="icelandic-note">
            [röð-un] • noun •
            <span
              class="hover-term"
              @mouseenter="
                $emit(
                  'show-tooltip',
                  $event,
                  'The spatial sorting and grouping of parts onto stock dimensions, optimized for assembly.'
                )
              "
              @mouseleave="$emit('hide-tooltip')"
              >arrangement</span
            >,
            <span
              class="hover-term"
              @mouseenter="
                $emit(
                  'show-tooltip',
                  $event,
                  'The visual cutting blueprint showing exactly where each piece must be cut on each board.'
                )
              "
              @mouseleave="$emit('hide-tooltip')"
              >layout</span
            >,
            <span
              class="hover-term"
              @mouseenter="
                $emit(
                  'show-tooltip',
                  $event,
                  'The solver logic (FFD) calculating cut configurations to maximize yield and minimize scrap.'
                )
              "
              @mouseleave="$emit('hide-tooltip')"
              >optimization</span
            >
          </span>
        </div>
        <p class="app-description">
          Browser version of the C++ application. A responsive 1D cutting stock
          solver designed to maximize yield and minimize scrap. Supports
          imperial inputs (e.g. 8' for feet, 6" for inches).
        </p>
      </div>
    </div>

    <div class="header-actions">
      <div class="presets-wrapper">
        <span class="presets-label">Load Preset Project:</span>
        <div class="presets-buttons">
          <button
            class="preset-btn"
            @click="$emit('load-preset', 'workbench')"
            title="Load Workbench project"
          >
            Workbench
          </button>
          <button
            class="preset-btn"
            @click="$emit('load-preset', 'tech-desk')"
            title="Load Tech Desk project"
          >
            Tech Desk
          </button>
          <button
            class="preset-btn"
            @click="$emit('load-preset', 'shelving-unit')"
            title="Load Shelving Unit project"
          >
            Shelving Unit
          </button>
          <button
            class="preset-btn"
            @click="$emit('load-preset', 'blank')"
            title="Start with a blank template"
          >
            Blank
          </button>
        </div>
      </div>

      <button
        class="btn btn-primary btn-export"
        @click="$emit('export-pdf')"
        :disabled="isGeneratingPDF"
      >
        <span v-if="isGeneratingPDF">Generating PDF...</span>
        <span v-else>💾 Export PDF</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PlannerHeader',
  props: {
    isGeneratingPDF: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['show-tooltip', 'hide-tooltip', 'load-preset', 'export-pdf'],
})
</script>
