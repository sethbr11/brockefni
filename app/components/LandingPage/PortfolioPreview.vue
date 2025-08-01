<template>
  <section class="portfolio-preview" id="portfolio">
    <div class="container">
      <h2 class="section-title">Featured Work</h2>
      <div class="portfolio-grid">
        <a
          href="https://chromewebstore.google.com/detail/lcr-tools/camjilfjkjmgcpmnheoeoomfndedpmbn"
        >
          <div class="portfolio-item">
            <div class="portfolio-image">
              <img
                src="@/assets/images/lcrToolsThumbnail.jpg"
                alt="LCR Tools"
                class="portfolio-img"
              />
            </div>
            <div class="portfolio-overlay">
              <h3>LCR Tools: Custom Chrome Extension</h3>
              <p>
                Improves the usability of the Church of Jesus Christ of
                Latter-day Saints' LCR tool
              </p>
            </div>
          </div>
        </a>
        <a href="/rodun">
          <div class="portfolio-item">
            <div class="portfolio-image">
              <img
                src="@/assets/images/rodunThumbnail.jpg"
                alt="Rodun"
                class="portfolio-img"
              />
            </div>
            <div class="portfolio-overlay">
              <h3>Rodun</h3>
              <p>
                A fast, simple desktop app to help optimize the use of materials
                by planning cuts based on user-provided specifications
              </p>
            </div>
          </div>
        </a>
        <a href="https://docsite.brockefni.com/">
          <div class="portfolio-item">
            <div class="portfolio-image">
              <img
                src="@/assets/images/docSiteThumbnail.png"
                alt="DocSite"
                class="portfolio-img"
              />
            </div>
            <div class="portfolio-overlay">
              <h3>Docs Site Boilerplate</h3>
              <p>Complete visual identity for tech startup</p>
            </div>
          </div>
        </a>
      </div>
      <div class="portfolio-cta">
        <router-link to="/projects" class="btn btn-primary">
          View All Projects
        </router-link>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PortfolioPreview",
});
</script>

<style scoped>
.portfolio-preview {
  padding: 5rem 0;
  position: relative;
  z-index: 2;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-title {
  font-size: 3rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 3rem;
  background: linear-gradient(45deg, #d87628, #ac5a17);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.portfolio-item {
  position: relative;
  height: 250px;
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.6s ease;
  z-index: 3;
}

.portfolio-item.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.portfolio-image {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #d87628, #ac5a17);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.portfolio-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.portfolio-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
  padding: 2rem 1.5rem 1.5rem;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.portfolio-item:hover .portfolio-overlay {
  transform: translateY(0);
}

.portfolio-item:hover .portfolio-image {
  transform: scale(1.05);
  filter: blur(8px);
}

.portfolio-overlay h3 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
}

.portfolio-cta {
  text-align: center;
}

.btn {
  padding: 1rem 2rem;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
}

.btn-primary {
  background: linear-gradient(45deg, #d87628, #ac5a17);
  color: white;
  box-shadow: 0 4px 15px rgba(216, 118, 40, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(216, 118, 40, 0.4);
}
</style>
