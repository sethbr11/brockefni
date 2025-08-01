<template>
  <div class="home">
    <FloatingShapes :shapes="floatingShapes" />
    <HeroSection :logo="logo" @scroll-to-section="scrollToSection" />
    <AboutSection />
    <ServicesSection />
    <PortfolioPreview />
    <CTASection />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import FloatingShapes from "@/components/LandingPage/FloatingShapes.vue";
import HeroSection from "@/components/LandingPage/HeroSection.vue";
import AboutSection from "@/components/LandingPage/AboutSection.vue";
import ServicesSection from "@/components/LandingPage/ServicesSection.vue";
import PortfolioPreview from "@/components/LandingPage/PortfolioPreview.vue";
import CTASection from "@/components/LandingPage/CTASection.vue";
import { generateFloatingShapes } from "@/assets/scripts/shapeGenerator";
import type { FloatingShape } from "@/assets/scripts/FloatingShape";

export default defineComponent({
  name: "HomeView",
  components: {
    FloatingShapes,
    HeroSection,
    AboutSection,
    ServicesSection,
    PortfolioPreview,
    CTASection,
  },
  setup() {
    const logo = ref<HTMLElement | null>(null);
    const floatingShapes = ref<FloatingShape[]>([]);

    const scrollToSection = (sectionId: string) => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    };

    onMounted(() => {
      // Generate floating shapes
      floatingShapes.value = generateFloatingShapes(25);

      // Animate elements on scroll
      const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      }, observerOptions);

      // Observe all animatable elements
      const animatableElements = document.querySelectorAll(
        ".service-card, .portfolio-item, .about-content, .stat"
      );
      animatableElements.forEach((el) => observer.observe(el));
    });

    return {
      logo,
      floatingShapes,
      scrollToSection,
    };
  },
});
</script>

<style scoped>
.home {
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

@media (max-width: 768px) {
  .home {
    padding-top: 70px;
  }
}
</style>
