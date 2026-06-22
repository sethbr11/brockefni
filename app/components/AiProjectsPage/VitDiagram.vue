<template>
  <div class="diagram-wrapper">
    <div class="vit-visual">
      <div class="patch-grid">
        <div
          v-for="i in 16"
          :key="i"
          class="patch"
          :style="{ animationDelay: `${i * 0.1}s` }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Simple visual component, no complex state required
</script>

<style scoped>
.diagram-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 1rem 0;
}

.vit-visual {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.patch-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.patch {
  width: 65px;
  height: 65px;
  background: #333;
  border: 1px solid #555;
  border-radius: 6px;
  animation: patchGlow 2s infinite alternate;
}

@keyframes patchGlow {
  0% {
    background: #333;
    border-color: #555;
  }
  100% {
    background: rgba(255, 128, 8, 0.6);
    border-color: #ff8008;
    box-shadow: 0 0 10px rgba(255, 128, 8, 0.4);
  }
}

@media (max-width: 992px) {
  .patch {
    width: 50px;
    height: 50px;
  }
}

@media (max-width: 768px) {
  .patch {
    width: 40px;
    height: 40px;
  }
}
</style>
