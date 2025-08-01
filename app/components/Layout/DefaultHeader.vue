<template>
  <header>
    <div class="logo">
      <img
        src="../../assets/brockefni_logo.png"
        alt="Brockefni Logo"
        height="50"
      />
    </div>
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/projects">Projects</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
    <DarkModeSwitch />
  </header>
</template>

<script lang="ts">
import DarkModeSwitch from "../DarkModeSwitch.vue";

export default {
  name: "DefaultHeader",
  components: {
    DarkModeSwitch,
  },
};
</script>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
nav ul {
  list-style: none;
  display: flex;
  gap: 20px;
  margin: 0;
  padding: 0;
}
nav ul li a {
  text-decoration: none;
  color: var(--text-color);
  font-weight: bold;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  color: var(--text-color);
  background: var(--background-variant);
  position: relative;
  z-index: 10;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>
