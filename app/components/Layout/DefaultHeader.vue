<template>
  <header>
    <a href="/">
      <div class="logo">
        <img
          src="@/assets/brockefni_logo.png"
          alt="Brockefni Logo"
          height="38"
        />
      </div>
    </a>

    <!-- Mobile hamburger button -->
    <button
      class="mobile-menu-toggle"
      @click="toggleMobileMenu"
      :class="{ active: isMobileMenuOpen }"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>

    <nav :class="{ 'mobile-open': isMobileMenuOpen }">
      <ul>
        <li><a href="/projects" @click="closeMobileMenu">Projects</a></li>
        <li>
          <a href="/support-my-work" @click="closeMobileMenu">Support</a>
        </li>
        <li><a href="/contact" @click="closeMobileMenu">Contact</a></li>
      </ul>
    </nav>
    <DarkModeSwitch class="dark-mode-switch" />
  </header>
</template>

<script lang="ts">
import { ref } from 'vue'
import DarkModeSwitch from '@/components/DarkModeSwitch.vue'

export default {
  name: 'DefaultHeader',
  components: {
    DarkModeSwitch,
  },
  setup() {
    const isMobileMenuOpen = ref(false)

    const toggleMobileMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value
    }

    const closeMobileMenu = () => {
      isMobileMenuOpen.value = false
    }

    return {
      isMobileMenuOpen,
      toggleMobileMenu,
      closeMobileMenu,
    }
  },
}
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
  gap: 15px;
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

.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  gap: 4px;
}

.mobile-menu-toggle span {
  width: 25px;
  height: 3px;
  background: var(--primary-color);
  transition: all 0.3s ease;
  transform-origin: center;
}

.mobile-menu-toggle.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.mobile-menu-toggle.active span:nth-child(2) {
  opacity: 0;
}

.mobile-menu-toggle.active span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

@media (max-width: 768px) {
  .mobile-menu-toggle {
    display: flex;
    order: 2;
  }

  .dark-mode-switch {
    order: 3;
  }

  nav {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--background-variant);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 9;
  }

  nav.mobile-open {
    display: block;
  }

  nav ul {
    flex-direction: column;
    padding: 20px;
    gap: 20px;
  }

  nav ul li a {
    display: block;
    padding: 10px 0;
    border-bottom: 1px solid var(--border-color, rgba(0, 0, 0, 0.1));
  }
}

@media (max-width: 480px) {
  header {
    padding: 10px 15px;
  }

  .logo img {
    height: 32px;
  }
}
</style>
