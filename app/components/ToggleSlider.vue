<!--
See https://www.w3schools.com/howto/howto_css_switch.asp

Example Usage:

<ToggleSlider
  :tooltip="'Toggle Dark Mode'"
  :checked="false"
  :onToggle="toggleDarkMode"
  color="#ff0000"
/>
-->

<template>
  <label class="switch" :title="tooltip">
    <input type="checkbox" :checked="checked" @change="handleToggle" />
    <span class="slider round"></span>
  </label>
</template>

<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  display: flex;
  justify-content: center;
  align-items: center;
}

.slider:before {
  position: absolute;
  content: '';
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider .icon {
  font-size: 16px;
  color: white;
  z-index: 1;
}

input:checked + .slider {
  background-color: var(--primary-color);
}

input:focus + .slider {
  box-shadow: 0 0 1px var(--primary-color);
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ToggleSlider',
  props: {
    checked: {
      type: Boolean,
      default: false,
    },
    onToggle: {
      type: Function,
      default: null,
    },
    tooltip: {
      type: String,
      default: null,
    },
  },
  methods: {
    handleToggle(event: Event) {
      if (this.onToggle) {
        this.onToggle(event)
      }
    },
  },
})
</script>
