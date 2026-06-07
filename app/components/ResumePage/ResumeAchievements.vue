<template>
  <section class="resume-section">
    <h2 class="section-title">
      <AwardIcon class="section-icon" /> Achievements &amp; Interests
    </h2>
    <div class="achievements-layout glass-panel">
      <div class="credentials-row">
        <!-- Lean Six Sigma White Belt -->
        <a
          href="https://badges.parchment.com/public/assertions/8Zz5-dk3TGeFiKcQ4wiszA?utm_source=url_copy"
          target="_blank"
          rel="noopener"
          class="credential-item linkable"
        >
          <div class="icon-glow-wrapper">
            <img
              src="@/assets/icons/six-sigma-white-belt.svg"
              alt="Lean Six Sigma White Belt"
              class="credential-icon"
            />
          </div>
          <div class="credential-text">
            <strong>Lean Six Sigma</strong>
          </div>
          <span class="tooltip">Council for Six Sigma Certification</span>
        </a>

        <!-- FinOps Certified Practitioner -->
        <a
          href="https://www.credly.com/badges/8da1dceb-25de-4b6f-941a-13df30d96b94"
          target="_blank"
          rel="noopener"
          class="credential-item linkable"
        >
          <div class="icon-glow-wrapper">
            <div class="cropped-badge-container">
              <img
                src="https://images.credly.com/images/08a5010a-0c0a-448c-981e-c116fedd380c/image.png"
                alt="FinOps Certified Practitioner"
                class="credential-icon cropped-badge-icon"
              />
            </div>
          </div>
          <div class="credential-text">
            <strong>FinOps Practitioner</strong>
          </div>
          <span class="tooltip">The Linux Foundation / FinOps Foundation</span>
        </a>

        <!-- AWS Academy Graduate - Cloud Web Application Builder -->
        <a
          href="https://www.credly.com/badges/330aa8cf-b26d-49d6-82ac-b28b40e85caa"
          target="_blank"
          rel="noopener"
          class="credential-item linkable"
        >
          <div class="icon-glow-wrapper">
            <div class="cropped-badge-container">
              <img
                src="https://images.credly.com/images/7b3f119b-ada8-4ff6-817a-f2a8bbb7fe97/twitter_thumb_201604_blob"
                alt="AWS Academy Graduate - Cloud Web Application Builder"
                class="credential-icon cropped-badge-icon"
              />
            </div>
          </div>
          <div class="credential-text">
            <strong>AWS Cloud Builder</strong>
          </div>
          <span class="tooltip"
            >Amazon Web Services Training and Certification</span
          >
        </a>

        <!-- AWS Academy Graduate - Machine Learning Foundations -->
        <a
          href="https://www.credly.com/badges/073da9a0-1c60-43e9-97ca-e43893de1674"
          target="_blank"
          rel="noopener"
          class="credential-item linkable"
        >
          <div class="icon-glow-wrapper">
            <div class="cropped-badge-container">
              <img
                src="https://images.credly.com/images/727c2754-d727-4e27-a1aa-3de2425ce239/twitter_thumb_201604_blob"
                alt="AWS Academy Graduate - Machine Learning Foundations"
                class="credential-icon cropped-badge-icon"
              />
            </div>
          </div>
          <div class="credential-text">
            <strong>AWS Machine Learning</strong>
          </div>
          <span class="tooltip"
            >Amazon Web Services Training and Certification</span
          >
        </a>

        <!-- Eagle Scout -->
        <div class="credential-item">
          <div class="icon-glow-wrapper">
            <img
              :src="bsaPng"
              alt="Eagle Scout"
              class="credential-icon bsa-icon"
            />
          </div>
          <div class="credential-text">
            <strong>Eagle Scout</strong>
          </div>
          <span class="tooltip">Boy Scouts of America</span>
        </div>

        <div class="credential-item">
          <div class="icon-glow-wrapper">
            <img :src="htbPng" alt="Hack the Box" class="credential-icon" />
          </div>
          <div class="credential-text">
            <strong>10 HTB Badges</strong>
          </div>
          <span class="tooltip"
            ><strong>Hack the Box Badges:</strong><br />1) The eye that sees
            all<br />2) Your white belt training begins<br />3) Lurk in the
            packets<br />4) Light in the dark<br />5) Panoptic<br />6)
            Anticipate the next attack<br />7) SPL Witchcraft<br />8) Packet
            carver<br />9) The packet protector<br />10) Chronicle
            champion</span
          >
        </div>
      </div>

      <div class="interests-list">
        <h3 class="category-title">Hobbies &amp; Talents</h3>
        <div class="interests-grid">
          <span
            v-for="interest in interests"
            :key="interest.name"
            class="interest-chip"
            @click="$emit('trigger-interest-note', interest.name)"
          >
            <span class="interest-emoji">{{ interest.emoji }}</span>
            <span class="interest-name">{{ interest.name }}</span>
            <Transition name="fade-up">
              <span v-if="activeNote === interest.name" class="floating-note">
                {{ getInterestCateredNote(interest.name) }}
              </span>
            </Transition>
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { AwardIcon } from 'lucide-vue-next'

import { defineComponent, computed } from 'vue'
import type { PropType } from 'vue'
import type { Interest } from '../../assets/data/resumeData'

// @ts-ignore
import bsaPng from '@/assets/icons/bsa.png'
import htbPng from '@/assets/icons/htb.png'

export default defineComponent({
  components: { AwardIcon },
  name: 'ResumeAchievements',
  props: {
    interests: {
      type: Array as PropType<Interest[]>,
      required: true,
    },
    activeNote: {
      type: String as PropType<string | null>,
      default: null,
    },
  },
  emits: ['trigger-interest-note'],
  setup() {
    return {
      bsaPng,
      htbPng,
    }
  },
  methods: {
    getInterestCateredNote(name: string): string {
      switch (name.toLowerCase()) {
        case 'soccer':
          return 'Goal! ⚽'
        case 'basketball':
          return 'Swish! 🏀'
        case 'skiing':
          return 'Shred! ❄️'
        case 'bowling':
          return 'Strike! 🎳'
        case 'saxophone':
          return 'Jazz! 🎷'
        case 'piano':
          return 'Melody! 🎹'
        case 'singing':
          return 'Harmony! 🎤'
        default:
          return '♫'
      }
    },
  },
})
</script>

<style scoped>
/* Glass panel */
.glass-panel {
  background: var(--background-variant);
  border: 1px solid var(--outline-color);
  border-radius: 16px;
  box-shadow: 0 8px 30px var(--shadow);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.resume-section {
  margin-bottom: 2.25rem;
  text-align: left;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: var(--text-color);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-align: left;
}

.section-icon {
  color: var(--page-accent);
  width: 24px;
  height: 24px;
}

.achievements-layout {
  padding: 1.5rem;
  text-align: left;
}

/* Credentials Grid - 4 Columns Layout */
.credentials-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  padding-top: 0rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid var(--outline-color);
  margin-bottom: 0.8rem;
}

@media (max-width: 576px) {
  .credentials-row {
    grid-template-columns: repeat(2, 1fr);
  }
}

.credential-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  text-decoration: none;
  color: inherit;
  position: relative;
  cursor: pointer;
  padding: 0.5rem 0;
}

/* Tooltip design respecting theme */
.tooltip {
  position: absolute;
  bottom: 82%;
  left: 50%;
  transform: translate(-50%, -8px);
  background: white;
  border: 1px solid #e5e7eb;
  color: #2c3e50;
  padding: 0.4rem 0.75rem;
  border-radius: 8px;
  font-size: 0.72rem;
  font-weight: 600;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  z-index: 50;
}

.tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-width: 5px;
  border-style: solid;
  border-color: white transparent transparent transparent;
}

/* Dark mode tooltip overrides */
:deep(.darkmode) .tooltip,
.darkmode .tooltip {
  background: var(--secondary-variant);
  border-color: var(--outline-color);
  color: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

:deep(.darkmode) .tooltip::after,
.darkmode .tooltip::after {
  border-color: var(--secondary-variant) transparent transparent transparent;
}

.credential-item:hover .tooltip {
  opacity: 1;
  transform: translate(-50%, -14px);
}

/* Glow and Wrapper */
.icon-glow-wrapper {
  position: relative;
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.icon-glow-wrapper::before {
  content: '';
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--page-accent);
  filter: blur(14px);
  opacity: 0.18;
  z-index: 0;
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.credential-item:hover .icon-glow-wrapper::before {
  opacity: 0.42;
  transform: scale(1.35);
}

/* Icon Sizing & Sfx */
.credential-icon {
  width: 46px;
  height: 46px;
  object-fit: contain;
  z-index: 2;
  transition: transform 0.2s ease;
}

/* Cropped Credly Badge Custom Sizing & glow */
.cropped-badge-container {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  transition: transform 0.2s ease;
}

.cropped-badge-icon {
  width: 46px;
  height: 46px;
  object-fit: cover;
}

/* Hover effects */
.credential-item:hover .credential-icon:not(.cropped-badge-icon) {
  transform: scale(1.08);
}

.credential-item:hover .cropped-badge-container {
  transform: scale(1.08);
}

.credential-text {
  margin-top: 0.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.credential-text strong {
  display: block;
  font-size: 0.85rem;
  color: var(--text-color);
  font-weight: 700;
  line-height: 1.3;
  transition: color 0.2s ease;
}

.credential-item.linkable:hover strong {
  color: var(--page-accent);
}

.category-title {
  font-size: 0.95rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--text-color);
  margin-top: 0;
  margin-bottom: 0.75rem;
  letter-spacing: 0.5px;
}

.interests-grid {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  text-align: left;
}

.interest-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.45rem 0.9rem;
  border-radius: 50px;
  background: var(--background-lighter-variant);
  border: 1px solid var(--outline-color);
  color: var(--text-color);
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
}

.interest-chip:hover {
  border-color: var(--page-accent);
  background: var(--background-variant);
  transform: translateY(-1px);
}

.floating-note {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  color: var(--page-accent);
  font-size: 0.85rem;
  font-weight: 700;
  white-space: nowrap;
  pointer-events: none;
}

/* Hobbies float up transition */
.fade-up-enter-active {
  transition: all 0.8s cubic-bezier(0.18, 0.89, 0.32, 1.28);
}
.fade-up-leave-active {
  transition: all 0.4s ease-in;
}

.fade-up-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(10px) scale(0.5);
}

.fade-up-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-20px) scale(1.2);
}
</style>
