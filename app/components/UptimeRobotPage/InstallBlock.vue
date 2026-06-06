<template>
  <div class="install-block" @click="copyCommand">
    <div class="block-header">
      <span class="label">INSTALL</span>
      <div class="copy-hint" :class="{ copied }">
        {{ copied ? 'Copied!' : 'Click to copy' }}
      </div>
    </div>
    <div class="block-body">
      <code class="command">{{ command }}</code>
      <div class="copy-icon desktop-only">
        <img src="@/assets/icons/copy.png" alt="Copy" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'InstallBlock',
  props: {
    command: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const copied = ref(false)

    const copyCommand = () => {
      navigator.clipboard.writeText(props.command).then(() => {
        copied.value = true
        setTimeout(() => {
          copied.value = false
        }, 2000)
      })
    }

    return { copied, copyCommand }
  },
})
</script>

<style scoped>
.install-block {
  background: #1e1e1e;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  overflow: hidden;
  margin: 1.5rem auto 0;
  max-width: 500px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  container-type: inline-size;
}

.install-block:hover {
  border-color: #3bd671;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

.block-header {
  background: #2d2d2d;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.label {
  font-size: 0.65rem;
  font-weight: 800;
  color: #888;
  letter-spacing: 0.1em;
}

.copy-hint {
  font-size: 0.65rem;
  color: #3bd671;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.install-block:hover .copy-hint {
  opacity: 1;
}

.copy-hint.copied {
  opacity: 1;
}

.block-body {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.command {
  font-family: 'Fira Code', monospace;
  font-size: clamp(0.65rem, 3.2cqi, 0.9rem);
  color: #3bd671;
  white-space: pre-wrap;
  word-break: break-all;
  overflow-x: hidden;
}

.copy-icon img {
  width: 16px;
  height: 16px;
  filter: invert(1) opacity(0.5);
}

.install-block:hover .copy-icon img {
  filter: invert(1) opacity(1) sepia(1) saturate(5) hue-rotate(90deg);
}
</style>
