<template>
  <div class="code-window">
    <div class="window-header">
      <span class="dot red"></span>
      <span class="dot yellow"></span>
      <span class="dot green"></span>
      <span class="file-name">{{ filename }}</span>
    </div>
    <div class="code-body">
      <pre><code><slot></slot></code></pre>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SharedCodeWindow',
  props: {
    filename: {
      type: String,
      default: 'example.ts'
    }
  }
})
</script>

<style scoped>
.code-window {
  background: #1e1e1e;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 40px var(--heavy-shadow);
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: left;
  width: 100%;
}

.window-header {
  background: #2d2d2d;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.red { background: #ff5f56; }
.yellow { background: #ffbd2e; }
.green { background: #27c93f; }

.file-name {
  color: #999;
  font-size: 0.8rem;
  margin-left: 0.5rem;
  font-family: monospace;
}

.code-body {
  padding: 1.5rem;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  color: #d4d4d4;
  overflow-x: auto;
}

.code-body pre {
  margin: 0;
  white-space: pre;
  width: max-content;
}

:deep(.keyword) { color: #569cd6; }
:deep(.string) { color: #ce9178; }
:deep(.comment) { color: #6a9955; }
:deep(.function) { color: #dcdcaa; }
:deep(.class) { color: #4ec9b0; }
:deep(.variable) { color: #9cdcfe; }

@media (max-width: 992px) {
  .code-body {
    font-size: 0.75rem;
    padding: 1rem;
  }
}
</style>
