<!--
See https://www.youtube.com/watch?v=_gKEUYarehE

Dark mode toggle feature for the site
-->

<script setup>
import { onMounted } from "vue";

onMounted(async () => {
  const module = await import("@/assets/scripts/darkmode");
  module.init?.();
});
</script>

<template>
  <button id="theme-switch">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="20px"
      viewBox="0 -960 960 960"
      width="20px"
      class="moon-icon"
    >
      <path
        d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Z"
      />
    </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="20px"
      viewBox="0 -960 960 960"
      width="20px"
      class="sun-icon"
    >
      <path
        d="M480-280q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Z"
      />
    </svg>
  </button>
</template>

<style scoped>
#theme-switch {
  height: 50px;
  width: 50px;
  padding: 0;
  border-radius: 50%;
  background: var(--background-variant);
  border: 2px solid var(--outline-color);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 8px var(--shadow);
}

#theme-switch:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px var(--heavy-shadow);
  border-color: var(--primary-color);
}

#theme-switch:active {
  transform: translateY(0);
  transition: transform 0.1s ease;
}

#theme-switch::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, var(--primary-color) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

#theme-switch:hover::before {
  opacity: 0.1;
}

.moon-icon,
.sun-icon {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: absolute;
}

.moon-icon {
  fill: var(--text-color);
  opacity: 1;
  transform: rotate(0deg) scale(1);
}

.sun-icon {
  fill: var(--primary-color);
  opacity: 0;
  transform: rotate(180deg) scale(0.5);
}

/* Dark mode states */
.darkmode .moon-icon {
  opacity: 0;
  transform: rotate(-180deg) scale(0.5);
}

.darkmode .sun-icon {
  opacity: 1;
  transform: rotate(0deg) scale(1);
}

.darkmode #theme-switch {
  background: var(--background-variant);
  border-color: var(--primary-color);
}

.darkmode #theme-switch:hover {
  border-color: var(--primary-variant);
  box-shadow: 0 4px 16px rgba(216, 118, 40, 0.3);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  #theme-switch {
    height: 45px;
    width: 45px;
  }

  .moon-icon,
  .sun-icon {
    height: 18px;
    width: 18px;
  }
}
</style>
