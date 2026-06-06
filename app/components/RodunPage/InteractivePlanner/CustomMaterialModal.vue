<template>
  <Transition name="modal-fade">
    <div v-if="show" class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-card">
        <div class="blueprint-theme-grid"></div>

        <div class="modal-header">
          <h3 class="modal-title">🎨 Create Custom Material</h3>
          <button class="modal-close-btn" @click="$emit('close')">
            &times;
          </button>
        </div>

        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">Material Name</label>
            <input
              :value="name"
              @input="onNameInput"
              type="text"
              class="form-input"
              placeholder="e.g. Purpleheart Wood, T-6061 Aluminum"
            />
          </div>

          <div class="form-group">
            <label class="form-label">Material Color Tint</label>
            <div class="color-picker-row">
              <input
                :value="color"
                @input="onColorInput"
                type="color"
                class="color-picker-large"
              />
              <input
                :value="color"
                @input="onColorInput"
                type="text"
                class="form-input color-hex-text"
                placeholder="#hexcolor"
              />
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn btn-secondary" @click="$emit('close')">
            Cancel
          </button>
          <button
            class="btn btn-primary"
            @click="$emit('create')"
            :disabled="!name.trim()"
          >
            Create Material
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CustomMaterialModal',
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
  emits: ['close', 'create', 'update:name', 'update:color'],
  setup(props, { emit }) {
    const onNameInput = (event: Event) => {
      const target = event.target as HTMLInputElement | null
      if (target) {
        emit('update:name', target.value)
      }
    }

    const onColorInput = (event: Event) => {
      const target = event.target as HTMLInputElement | null
      if (target) {
        emit('update:color', target.value)
      }
    }

    return {
      onNameInput,
      onColorInput,
    }
  },
})
</script>
