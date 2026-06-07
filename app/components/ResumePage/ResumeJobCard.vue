<template>
  <div
    :id="'job-' + idx"
    class="job-card glass-panel clickable-card"
    :class="{
      'highlighted-job': isHighlighted,
      'active-job': isActive || isExpanded,
      'expanded-job': isExpanded,
    }"
    @mouseenter="$emit('update-active', idx)"
    @mouseleave="$emit('update-active', null)"
    @click="$emit('toggle-expand', idx)"
  >
    <div class="job-header">
      <div class="job-meta">
        <h3 class="role">{{ job.role }}</h3>
        <span class="company">{{ job.company }}</span>
      </div>
      <div class="job-date-loc-chevron">
        <div class="job-date-loc">
          <span class="date">{{ job.dates }}</span>
          <span class="location">
            <MapPinIcon class="loc-icon" />
            {{ job.location }}
          </span>
        </div>
        <ChevronDownIcon
          class="expand-chevron"
          :class="{ rotated: isExpanded }"
        />
      </div>
    </div>

    <div class="job-kpis-grid">
      <template v-for="kpi in job.kpis" :key="kpi.label">
        <a
          v-if="kpi.url"
          :href="kpi.url"
          class="kpi-mini-card clickable-kpi"
          :class="kpi.type"
          :target="kpi.url.startsWith('http') ? '_blank' : '_self'"
          @click.stop
        >
          <div class="kpi-logo-wrapper">
            <!-- Custom UptimeRobot circle logo path -->
            <svg
              v-if="kpi.type === 'uptimerobot'"
              viewBox="0 0 24 24"
              class="kpi-icon-svg-ur"
            >
              <circle cx="12" cy="12" r="10" />
            </svg>
            <!-- Custom TitanCraft SVG logo -->
            <svg
              v-else-if="kpi.type === 'titancraft'"
              viewBox="0 0 55 53"
              class="kpi-icon-svg-tc"
            >
              <g
                transform="translate(0.000000,53.000000) scale(0.100000,-0.100000)"
                fill="currentColor"
                stroke="none"
              >
                <path
                  d="M189 511 c-14 -3 -40 -22 -57 -42 -37 -43 -42 -84 -11 -94 18 -6 19 -8 4 -19 -21 -15 -11 -61 17 -80 18 -13 18 -16 5 -42 -14 -26 -15 -27 -21 -7 -12 38 -47 73 -72 73 -30 0 -42 -25 -22 -48 9 -9 18 -35 21 -57 3 -22 8 -47 12 -56 4 -11 -5 -29 -25 -53 -51 -58 -15 -94 40 -41 l27 26 28 -23 c25 -20 41 -23 107 -22 64 0 84 4 107 22 24 18 30 19 35 7 8 -22 36 -18 36 5 0 10 8 24 19 29 14 8 24 4 46 -19 30 -31 65 -40 65 -16 0 8 -15 32 -34 55 -35 42 -39 81 -8 81 12 0 14 9 9 50 -4 29 -2 50 3 50 18 0 10 28 -15 58 -14 17 -25 37 -25 45 0 9 -8 22 -18 29 -10 7 -21 21 -25 30 -3 9 -22 20 -42 24 -19 3 -39 12 -43 19 -8 14 -124 26 -163 16z m35 -25 c-5 -12 0 -13 31 -5 29 8 44 7 70 -5 18 -9 38 -16 44 -16 6 0 15 -9 21 -19 5 -11 19 -23 30 -26 11 -3 20 -15 20 -25 0 -10 11 -28 24 -41 20 -19 21 -25 10 -36 -9 -10 -11 -21 -4 -38 7 -19 6 -25 -4 -25 -8 0 -17 16 -20 38 -8 43 -26 92 -34 92 -3 0 -16 -9 -28 -21 -33 -31 -47 -15 -23 25 19 33 19 34 0 39 -15 4 -18 1 -14 -12 5 -11 -1 -10 -19 7 -42 38 -138 21 -138 -25 0 -7 -4 -13 -9 -13 -5 0 -7 9 -4 20 6 22 -8 26 -38 10 -15 -8 -19 -7 -19 4 0 8 3 16 8 18 4 2 17 16 30 32 12 16 22 23 22 16 0 -9 6 -8 23 3 28 20 27 20 21 3z m63 -92 c3 -8 0 -21 -7 -27 -10 -9 -11 -9 -6 1 5 7 1 12 -9 12 -10 0 -13 -5 -9 -12 4 -6 3 -8 -4 -5 -14 10 -3 47 14 47 8 0 17 -7 21 -16z m42 -58 l22 -23 -32 -7 c-23 -4 -41 0 -65 15 -42 25 -43 33 -5 24 17 -3 32 -2 36 4 9 16 19 13 44 -13z m-139 -1 c0 -2 -9 -9 -19 -14 -14 -8 -20 -7 -25 4 -4 11 2 15 19 15 14 0 25 -2 25 -5z m60 -40 l34 -35 -27 0 c-17 0 -27 5 -27 14 0 9 -7 12 -20 9 -21 -5 -25 3 -14 31 9 23 16 20 54 -19z m100 1 c0 -11 -19 -15 -25 -6 -3 5 1 10 9 10 9 0 16 -2 16 -4z m44 -12 c5 -14 4 -15 -9 -4 -17 14 -19 20 -6 20 5 0 12 -7 15 -16z m-89 -12 c-3 -3 -11 0 -18 7 -9 10 -8 11 6 5 10 -3 15 -9 12 -12z m60 -13 c11 -17 -1 -21 -15 -4 -8 9 -8 15 -2 15 6 0 14 -5 17 -11z m-170 -19 c-20 -23 -29 -21 -19 4 3 9 13 16 22 16 13 0 12 -3 -3 -20z m72 -6 c-3 -3 -12 -4 -19 -1 -8 3 -5 6 6 6 11 1 17 -2 13 -5z m-164 -42 c4 -21 3 -31 -3 -27 -6 3 -10 20 -10 37 0 38 5 34 13 -10z m224 22 c3 -9 13 -14 24 -11 11 3 19 0 19 -5 0 -6 7 -16 15 -22 16 -12 30 -70 14 -60 -6 3 -7 -5 -4 -23 l7 -28 -22 32 c-12 19 -27 30 -35 27 -8 -3 -20 4 -27 16 -7 12 -34 33 -60 46 -54 27 -61 39 -20 31 15 -2 36 -1 47 3 29 12 35 12 42 -6z m140 -77 c35 -39 61 -73 58 -75 -4 -5 -41 34 -109 116 -54 63 -10 29 51 -41z m-312 52 c4 -6 1 -16 -7 -22 -8 -7 -36 -38 -63 -70 -26 -32 -50 -55 -53 -53 -2 3 21 33 52 68 31 35 54 69 51 76 -5 15 11 16 20 1z m85 -17 c0 -11 -34 -42 -47 -42 -17 0 -17 10 2 37 13 19 45 23 45 5z m-43 -108 c-3 -3 -12 -4 -19 -1 -8 3 -5 6 6 6 11 1 17 -2 13 -5z"
                />
                <path
                  d="M380 140 c0 -5 5 -10 11 -10 5 0 7 5 4 10 -3 6 -8 10 -11 10 -2 0 -4 -4 -4 -10z"
                />
              </g>
            </svg>
            <!-- Default Icon for others -->
            <GithubIcon v-else-if="kpi.type === 'github'" class="kpi-icon" />
            <ExternalLinkIcon v-else class="kpi-icon" />
          </div>
          <div class="kpi-text-column">
            <span class="kpi-value">{{ kpi.value }}</span>
            <span class="kpi-label">{{ kpi.label }}</span>
          </div>
        </a>
        <div v-else class="kpi-mini-card">
          <span class="kpi-value">{{ kpi.value }}</span>
          <span class="kpi-label">{{ kpi.label }}</span>
        </div>
      </template>
    </div>

    <Transition name="expand">
      <div v-if="isExpanded" class="expanded-content" @click.stop>
        <ul class="responsibilities">
          <li v-for="(bullet, bIdx) in job.bullets" :key="bIdx">
            {{ bullet }}
          </li>
        </ul>
      </div>
    </Transition>

    <!-- Tagged Technologies -->
    <div class="job-tags">
      <span
        v-for="skill in job.skills"
        :key="skill"
        class="job-tag"
        :class="{ 'glowing-tag': hoveredSkill === skill }"
      >
        {{ skill }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import {
  MapPinIcon,
  ChevronDownIcon,
  ExternalLinkIcon,
  GithubIcon,
} from 'lucide-vue-next'

import { defineComponent, computed } from 'vue'
import type { PropType } from 'vue'
import type { Job } from '../../assets/data/resumeData'

export default defineComponent({
  components: { MapPinIcon, ChevronDownIcon, ExternalLinkIcon, GithubIcon },
  name: 'ResumeJobCard',
  props: {
    job: {
      type: Object as PropType<Job>,
      required: true,
    },
    idx: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isExpanded: {
      type: Boolean,
      default: false,
    },
    hoveredSkill: {
      type: String as PropType<string | null>,
      default: null,
    },
  },
  emits: ['update-active', 'toggle-expand'],
  setup(props) {
    const isHighlighted = computed(() => {
      return props.hoveredSkill
        ? props.job.skills.includes(props.hoveredSkill)
        : false
    })

    return {
      isHighlighted,
    }
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

.job-card {
  padding: 1.5rem;
  position: relative;
  text-align: left;
}

.clickable-card {
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.clickable-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 1px solid transparent;
  border-radius: 16px;
  pointer-events: none;
  transition: all 0.3s ease;
}

.clickable-card:hover::after {
  border-color: var(--page-accent);
  box-shadow: inset 0 0 10px var(--page-accent-glow);
}

.job-card::before {
  content: '';
  position: absolute;
  left: -1.45rem;
  top: 2rem;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--background-color);
  border: 2px solid var(--outline-color);
  transition: all 0.3s ease;
}

.job-card:hover::before,
.job-card.active-job::before,
.job-card.highlighted-job::before {
  border-color: var(--page-accent);
  background: var(--page-accent);
  box-shadow: 0 0 8px var(--page-accent);
}

.job-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
  text-align: left;
}

.role {
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0;
  color: var(--text-color);
  text-align: left;
}

.company {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--page-accent);
  display: block;
  text-align: left;
}

.job-date-loc {
  text-align: right;
}

.date {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-color-muted);
  display: block;
}

.location {
  font-size: 0.85rem;
  color: var(--secondary-text-color);
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

.loc-icon {
  width: 12px;
  height: 12px;
}

.job-date-loc-chevron {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.expand-chevron {
  width: 20px;
  height: 20px;
  color: var(--text-color-muted);
  transition:
    transform 0.3s ease,
    color 0.2s ease;
}

.job-card:hover .expand-chevron {
  color: var(--page-accent);
}

.expand-chevron.rotated {
  transform: rotate(180deg);
  color: var(--page-accent);
}

.responsibilities {
  margin: 0 0 1.5rem 0;
  padding-left: 1.2rem;
  color: var(--secondary-text-color);
  font-size: 0.95rem;
  line-height: 1.55;
  text-align: left;
}

.responsibilities li {
  margin-bottom: 0.5rem;
}

.expanded-content {
  margin-top: 1rem;
  border-top: 1px dashed var(--outline-color);
  padding-top: 1rem;
  animation: fadeIn 0.3s ease;
}

.clickable-kpi {
  cursor: pointer;
  text-decoration: none;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.kpi-logo-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0 0 0.8rem;
  flex-shrink: 0;
}

.kpi-text-column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0.4rem 0.75rem;
  flex-grow: 1;
  min-width: 0;
}

.kpi-logo-wrapper .kpi-icon,
.kpi-logo-wrapper .kpi-icon-svg-ur,
.kpi-logo-wrapper .kpi-icon-svg-tc {
  width: 22px;
  height: 22px;
  flex-shrink: 0;
  display: inline-block;
  vertical-align: middle;
}

.kpi-logo-wrapper .kpi-icon-svg-ur {
  fill: #3bd671;
  transition: fill 0.25s ease;
}
.clickable-kpi.uptimerobot:hover .kpi-icon-svg-ur {
  fill: #1a1b1c !important;
}

.kpi-logo-wrapper .kpi-icon-svg-tc {
  fill: #e5c158;
  transition: fill 0.25s ease;
}
.clickable-kpi.titancraft:hover .kpi-icon-svg-tc,
.clickable-kpi.titancraft:hover .kpi-icon-svg-tc g,
.clickable-kpi.titancraft:hover .kpi-icon-svg-tc path {
  fill: #000000 !important;
  color: #000000 !important;
}

/* UptimeRobot clickable KPI theme */
.clickable-kpi.uptimerobot {
  border-color: rgba(59, 214, 113, 0.25);
  background: rgba(59, 214, 113, 0.04);
}
.clickable-kpi.uptimerobot .kpi-icon-svg-ur,
.clickable-kpi.uptimerobot .kpi-value {
  color: #3bd671;
}
.clickable-kpi.uptimerobot:hover {
  background: #3bd671 !important;
  border-color: #3bd671 !important;
}
.clickable-kpi.uptimerobot:hover .kpi-value,
.clickable-kpi.uptimerobot:hover .kpi-label {
  color: #1a1b1c !important;
}

/* GitHub clickable KPI theme */
.clickable-kpi.github {
  border-color: rgba(110, 64, 201, 0.25);
  background: rgba(110, 64, 201, 0.04);
}
.clickable-kpi.github .kpi-icon,
.clickable-kpi.github .kpi-value {
  color: #a074f0;
}
.clickable-kpi.github:hover {
  background: #6e40c9 !important;
  border-color: #6e40c9 !important;
}
.clickable-kpi.github:hover .kpi-value,
.clickable-kpi.github:hover .kpi-label,
.clickable-kpi.github:hover .kpi-icon {
  color: white !important;
}

/* TitanCraft clickable KPI theme (Gold/Bronze) */
.clickable-kpi.titancraft {
  border-color: rgba(229, 193, 88, 0.3);
  background: rgba(229, 193, 88, 0.05);
}
.clickable-kpi.titancraft .kpi-icon-svg-tc,
.clickable-kpi.titancraft .kpi-value {
  color: #e5c158;
}
.clickable-kpi.titancraft:hover {
  background: #e5c158 !important;
  border-color: #e5c158 !important;
}
.clickable-kpi.titancraft:hover .kpi-icon-svg-tc,
.clickable-kpi.titancraft:hover .kpi-value,
.clickable-kpi.titancraft:hover .kpi-label {
  color: #000000 !important;
}

/* Long text formatting for clickable project KPI links */
.kpi-mini-card.clickable-kpi {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  max-width: 240px;
  padding: 0;
  overflow: hidden;
}

.kpi-mini-card.clickable-kpi .kpi-value {
  font-size: 0.92rem;
  line-height: 1.3;
}

/* KPI Badges Styling */
.job-kpis-grid {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin: 1rem 0;
  text-align: left;
}

.kpi-mini-card {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  text-align: left;
  background: var(--background-lighter-variant);
  border: 1px solid var(--outline-color);
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  min-width: 100px;
  flex: 1;
  max-width: 180px;
  transition: all 0.25s ease;
}

.job-card:hover .kpi-mini-card,
.job-card.active-job .kpi-mini-card,
.job-card.highlighted-job .kpi-mini-card {
  border-color: var(--page-accent-glow);
  background: var(--background-variant);
}

.kpi-value {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--page-accent);
  line-height: 1.2;
}

.kpi-label {
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--text-color-muted);
  text-transform: uppercase;
  letter-spacing: 0.2px;
  margin-top: 0.15rem;
}

.job-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  text-align: left;
}

.job-tag {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.2rem 0.6rem;
  background: var(--background-lighter-variant);
  border: 1px solid var(--outline-color);
  color: var(--text-color-muted);
  border-radius: 4px;
  transition: all 0.2s ease;
}

.glowing-tag {
  background: var(--page-accent);
  border-color: var(--page-accent);
  color: white !important;
  box-shadow: 0 0 10px var(--page-accent-glow);
}

.job-card.active-job {
  border-color: var(--page-accent);
  box-shadow: 0 8px 30px var(--page-accent-glow);
  transform: translateY(-2px);
}

.job-card.highlighted-job {
  border-color: var(--page-accent);
  background: var(--page-accent-light);
}

/* Transitions */
.expand-enter-active,
.expand-leave-active {
  transition:
    max-height 0.4s cubic-bezier(0.25, 0.8, 0.25, 1),
    opacity 0.25s ease;
  max-height: 500px;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
