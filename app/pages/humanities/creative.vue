<template>
  <div class="creative-page">
    <div class="container">
      <!-- Back Link -->
      <div class="page-top-bar">
        <NuxtLink to="/humanities" class="back-link glass-panel">
          <ArrowLeftIcon class="icon" /> Back to Humanities
        </NuxtLink>
      </div>

      <!-- Page Header -->
      <header class="page-header animate-fade-in">
        <span class="sub-badge">CREATIVE LAB &amp; MUSIC</span>
        <h1 class="page-title">Creative Studio &amp; Music</h1>
        <p class="page-subtitle">
          A showcase of visual art experiments, collaborative sketch-to-painting transformations, and musical explorations across saxophone, piano, and singing.
        </p>
      </header>

      <!-- Section 1: Sketch to Painting Transformation -->
      <section class="studio-section glass-panel">
        <div class="section-badge">Featured Collaboration</div>
        <div class="section-header-block">
          <h2 class="section-title">
            <SparklesIcon class="section-icon" /> From Pencil Sketch to Painting
          </h2>
          <p class="section-desc">
            Drag the interactive slider below to transition between my original hand-drawn graphite value sketch and the commissioned painted realization.
          </p>
        </div>

        <!-- Interactive Comparison Slider -->
        <div class="slider-wrapper">
          <BeforeAfterSlider
            :before-image="featuredArt.beforeImage"
            :after-image="featuredArt.afterImage"
            :before-label="featuredArt.beforeLabel"
            :after-label="featuredArt.afterLabel"
          />
        </div>

        <div class="art-story-box">
          <h4><PaletteIcon class="box-icon" /> The Process &amp; Medium</h4>
          <p>{{ featuredArt.description }}</p>
          <div class="art-tags">
            <span v-for="tag in featuredArt.tags" :key="tag" class="tag-pill">
              #{{ tag }}
            </span>
          </div>
        </div>
      </section>

      <!-- Section 2: Music & Instrumental Pursuits -->
      <section class="studio-section glass-panel music-section">
        <div class="section-header-block">
          <h2 class="section-title">
            <MusicIcon class="section-icon" /> Musical Pursuits
          </h2>
          <p class="section-desc">
            Balancing analytical logic with harmonic expression through acoustic saxophone, piano repertoire, and choral performance.
          </p>
        </div>

        <div class="music-grid">
          <!-- Saxophone Card -->
          <div class="music-card glass-panel">
            <div class="music-card-header">
              <div class="music-icon-box sax-box">
                <span class="emoji-icon">🎷</span>
              </div>
              <div>
                <span class="instrument-tag">Woodwinds</span>
                <h3 class="instrument-title">Saxophone</h3>
              </div>
            </div>
            <p class="music-desc">
              Focusing on jazz articulation, tone development, chord substitutions, and melodic improvisation on alto and tenor saxophone.
            </p>
            <div class="music-meta">
              <span class="meta-pill">Jazz Standards</span>
              <span class="meta-pill">Tone Studies</span>
            </div>
          </div>

          <!-- Piano Card -->
          <div class="music-card glass-panel">
            <div class="music-card-header">
              <div class="music-icon-box piano-box">
                <span class="emoji-icon">🎹</span>
              </div>
              <div>
                <span class="instrument-tag">Keys</span>
                <h3 class="instrument-title">Piano</h3>
              </div>
            </div>
            <p class="music-desc">
              Practicing classical repertoire, dynamic control, voice leading, and contemporary song accompaniments on piano.
            </p>
            <div class="music-meta">
              <span class="meta-pill">Classical Pieces</span>
              <span class="meta-pill">Harmonic Progression</span>
            </div>
          </div>

          <!-- Vocal Card -->
          <div class="music-card glass-panel">
            <div class="music-card-header">
              <div class="music-icon-box vocal-box">
                <span class="emoji-icon">🎤</span>
              </div>
              <div>
                <span class="instrument-tag">Vocal</span>
                <h3 class="instrument-title">Singing &amp; Choir</h3>
              </div>
            </div>
            <p class="music-desc">
              Ensemble choral harmony, breath support, and vocal performance across varied choral and contemporary arrangements.
            </p>
            <div class="music-meta">
              <span class="meta-pill">Choral Ensemble</span>
              <span class="meta-pill">Harmony</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowLeftIcon,
  SparklesIcon,
  PaletteIcon,
  MusicIcon,
} from 'lucide-vue-next'
import { useHead } from '#app'
import { creativeWorks } from '@/assets/data/creativeData'
import BeforeAfterSlider from '@/components/CreativePage/BeforeAfterSlider.vue'

useHead({
  title: 'Creative Studio & Music | Seth Brock',
  meta: [
    {
      name: 'description',
      content:
        'Explore Seth Brock’s creative works, sketch-to-painting art collaborations, and musical pursuits across saxophone, piano, and singing.',
    },
  ],
})

const featuredArt = creativeWorks[0]
</script>

<style scoped>
.creative-page {
  min-height: 100vh;
  background: var(--background-color);
  color: var(--text-color);
  padding: 2.5rem 0 6rem 0;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.page-top-bar {
  display: flex;
  margin-bottom: 2rem;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  font-weight: 700;
  text-decoration: none;
  color: var(--text-color);
  border-radius: 30px;
  transition: all 0.2s ease;
}

.back-link:hover {
  color: var(--primary-color);
  border-color: var(--primary-color);
  transform: translateX(-3px);
}

.back-link .icon {
  width: 16px;
  height: 16px;
}

.page-header {
  text-align: center;
  max-width: 750px;
  margin: 0 auto 3rem auto;
}

.sub-badge {
  font-size: 0.85rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--primary-color);
}

.page-title {
  font-size: clamp(2.2rem, 5vw, 3.2rem);
  font-weight: 900;
  margin: 0.4rem 0 0.8rem 0;
  letter-spacing: -0.5px;
}

.page-subtitle {
  font-size: 1.1rem;
  line-height: 1.65;
  color: var(--text-color-muted);
  margin: 0;
}

.studio-section {
  padding: 2.5rem;
  border-radius: 20px;
  margin-bottom: 3.5rem;
  position: relative;
  background: var(--background-variant);
  border: 1px solid var(--outline-color);
  text-align: left;
}

.section-badge {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  background: rgba(216, 118, 40, 0.15);
  color: var(--primary-color);
  border: 1px solid rgba(216, 118, 40, 0.3);
  padding: 0.3rem 0.75rem;
  border-radius: 50px;
}

.section-header-block {
  max-width: 700px;
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.75rem;
  font-weight: 800;
  margin: 0 0 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: var(--text-color);
}

.section-icon {
  width: 24px;
  height: 24px;
  color: var(--primary-color);
}

.section-desc {
  font-size: 1.05rem;
  line-height: 1.6;
  color: var(--text-color-muted);
  margin: 0;
}

.slider-wrapper {
  margin: 2rem 0;
}

.art-story-box {
  padding-top: 1.5rem;
  border-top: 1px solid var(--outline-color);
}

.art-story-box h4 {
  font-size: 1rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--primary-color);
}

.box-icon {
  width: 16px;
  height: 16px;
}

.art-story-box p {
  font-size: 1rem;
  line-height: 1.65;
  color: var(--text-color-muted);
  margin: 0 0 1rem 0;
}

.art-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tag-pill {
  font-size: 0.78rem;
  font-weight: 600;
  padding: 0.2rem 0.65rem;
  border-radius: 6px;
  background: var(--background-lighter-variant);
  color: var(--text-color-muted);
}

/* Music Section */
.music-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.75rem;
  margin-top: 1.5rem;
}

.music-card {
  padding: 1.75rem;
  border-radius: 16px;
  background: var(--background-lighter-variant);
  border: 1px solid var(--outline-color);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.music-card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.music-icon-box {
  width: 52px;
  height: 52px;
  border-radius: 12px;
  background: var(--background-variant);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.emoji-icon {
  font-size: 1.6rem;
}

.instrument-tag {
  font-size: 0.72rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--primary-color);
  display: block;
}

.instrument-title {
  font-size: 1.35rem;
  font-weight: 800;
  margin: 0.15rem 0 0 0;
}

.music-desc {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text-color-muted);
  margin: 0 0 1.25rem 0;
}

.music-meta {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.meta-pill {
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.2rem 0.6rem;
  border-radius: 50px;
  background: var(--background-variant);
  border: 1px solid var(--outline-color);
  color: var(--text-color-muted);
}
</style>
