<template>
  <section class="resume-section edu-section">
    <h2 class="section-title">
      <GraduationCapIcon class="section-icon" />
      Education
    </h2>
    <div class="edu-timeline">
      <template v-for="(edu, idx) in education" :key="idx">
        <NuxtLink
          v-if="edu.link"
          :to="edu.link"
          :id="edu.id"
          class="edu-card glass-panel clickable-card"
          :class="{
            'highlighted-edu': isSkillInEdu(edu, hoveredSkill),
          }"
        >
          <div class="education-header">
            <div class="edu-title-group">
              <h3 class="degree">
                {{ edu.degree }}
              </h3>
              <span class="school">{{ edu.school }}</span>
            </div>
            <div class="edu-meta-group">
              <span class="dates">{{ edu.dates }}</span>
              <span class="location">
                <MapPinIcon class="loc-icon" />
                {{ edu.location }}
              </span>
            </div>
          </div>
          <div class="edu-details">
            <div class="gpa-badge" v-if="edu.gpa">
              <span class="gpa-num">{{ edu.gpa }}</span>
              <span class="gpa-label">{{ edu.gpaLabel || 'GPA' }}</span>
            </div>
            <ul class="edu-bullets" v-if="edu.bullets && edu.bullets.length">
              <li v-for="(bullet, bIdx) in edu.bullets" :key="bIdx">
                {{ bullet }}
              </li>
            </ul>
          </div>
          <div class="edu-click-indicator">
            <ArrowRightIcon class="indicator-icon" />
            {{ edu.linkText || 'Click to view details' }}
          </div>
        </NuxtLink>

        <div
          v-else
          :id="edu.id"
          class="edu-card glass-panel"
          :class="{
            'highlighted-edu': isSkillInEdu(edu, hoveredSkill),
          }"
        >
          <div class="education-header">
            <div class="edu-title-group">
              <h3 class="degree">
                {{ edu.degree }}
              </h3>
              <span class="school">{{ edu.school }}</span>
            </div>
            <div class="edu-meta-group">
              <span class="dates">{{ edu.dates }}</span>
              <span class="location">
                <MapPinIcon class="loc-icon" />
                {{ edu.location }}
              </span>
            </div>
          </div>
          <div class="edu-details">
            <div class="gpa-badge" v-if="edu.gpa">
              <span class="gpa-num">{{ edu.gpa }}</span>
              <span class="gpa-label">{{ edu.gpaLabel || 'GPA' }}</span>
            </div>
            <ul class="edu-bullets" v-if="edu.bullets && edu.bullets.length">
              <li v-for="(bullet, bIdx) in edu.bullets" :key="bIdx">
                {{ bullet }}
              </li>
            </ul>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<script lang="ts">
import { GraduationCapIcon, MapPinIcon, ArrowRightIcon } from 'lucide-vue-next'

import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { Education } from '../../assets/data/resumeData'

export default defineComponent({
  components: { GraduationCapIcon, MapPinIcon, ArrowRightIcon },
  name: 'ResumeEducation',
  props: {
    education: {
      type: Array as PropType<Education[]>,
      required: true,
    },
    hoveredSkill: {
      type: String as PropType<string | null>,
      default: null,
    },
  },
  setup() {
    const isSkillInEdu = (edu: Education, skill: string | null): boolean => {
      if (!skill) return false
      return edu.skills.includes(skill)
    }

    return {
      isSkillInEdu,
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

.resume-section {
  margin-bottom: 3.5rem;
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

.edu-timeline {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  text-align: left;
}

.edu-card {
  padding: 1.5rem;
  text-align: left;
  text-decoration: none;
  color: inherit;
  display: block;
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

.edu-card.highlighted-edu {
  border-color: var(--page-accent);
  background: var(--page-accent-light);
}

.edu-click-indicator {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--page-accent);
  margin-top: 1.25rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--outline-color);
}

.indicator-icon {
  width: 14px;
  height: 14px;
}

.education-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
  border-bottom: 1px solid var(--outline-color);
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  text-align: left;
}

.edu-title-group {
  flex: 1;
  text-align: left;
}

.degree {
  font-size: 1.15rem;
  font-weight: 700;
  margin: 0;
  color: var(--text-color);
  text-align: left;
}

.school {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--page-accent);
  display: block;
  margin-top: 0.2rem;
  text-align: left;
}

.edu-meta-group {
  text-align: right;
}

.edu-meta-group .dates {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-color-muted);
  display: block;
}

.edu-meta-group .location {
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

.edu-details {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  text-align: left;
}

.gpa-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--page-accent-light);
  border: 1px solid var(--page-accent);
  color: var(--page-accent);
  width: 65px;
  height: 65px;
  border-radius: 12px;
  flex-shrink: 0;
}

.gpa-num {
  font-size: 1.35rem;
  font-weight: 800;
  line-height: 1;
}

.gpa-label {
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  text-align: center;
}

.edu-bullets {
  margin: 0;
  padding-left: 1.2rem;
  font-size: 0.9rem;
  color: var(--secondary-text-color);
  line-height: 1.5;
  text-align: left;
}

.edu-bullets li {
  margin-bottom: 0.4rem;
}

.edu-description-text {
  font-size: 0.9rem;
  color: var(--secondary-text-color);
  line-height: 1.5;
  margin: 0;
  text-align: left;
}

@media (max-width: 768px) {
  .education-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .edu-meta-group {
    text-align: left;
    margin-top: 0.2rem;
  }
}
</style>
