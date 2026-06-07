<template>
  <section class="resume-section edu-section">
    <h2 class="section-title">
      <Icon name="lucide:graduation-cap" class="section-icon" />
      Education
    </h2>
    <div class="edu-timeline">
      <!-- BYU Masters (Clickable to open Coursework Modal) -->
      <div
        id="byu-education"
        class="edu-card glass-panel clickable-card"
        :class="{ 'highlighted-edu': isAcademicSkillHovered }"
        @click="$emit('show-coursework')"
      >
        <div class="education-header">
          <div class="edu-title-group">
            <h3 class="degree">
              Master of Information Systems Management (MISM)
            </h3>
            <span class="school"
              >Brigham Young University - Marriott School of Business</span
            >
          </div>
          <div class="edu-meta-group">
            <span class="dates">Aug 2020 – Apr 2021, Aug 2023 – Apr 2026 </span>
            <span class="location">
              <Icon name="lucide:map-pin" class="loc-icon" /> Provo, UT
            </span>
          </div>
        </div>
        <div class="edu-details">
          <div class="gpa-badge">
            <span class="gpa-num">3.86</span>
            <span class="gpa-label">MISM GPA</span>
          </div>
          <ul class="edu-bullets">
            <li>
              Integrated Program (simultaneous completion of Bachelor's and
              Master's degrees).
            </li>
            <li>Web Development Emphasis, STEM-Certified Technical Program.</li>
            <li>
              Leave of absence taken for voluntary LDS mission service (2021 -
              2023).
            </li>
            <li>
              Brigham Young academic scholarship recipient (2020, 2023, 2024).
            </li>
            <li>Active Member — Association for Information Systems.</li>
          </ul>
        </div>
        <div class="edu-click-indicator">
          <Icon name="lucide:info" class="indicator-icon" /> Click to view
          specialized MISM coursework
        </div>
      </div>

      <!-- UVU Associates -->
      <div class="edu-card glass-panel">
        <div class="education-header">
          <div class="edu-title-group">
            <h3 class="degree">Associate of Science in University Studies</h3>
            <span class="school">Utah Valley University</span>
          </div>
          <div class="edu-meta-group">
            <span class="dates">2018 – 2020</span>
            <span class="location">
              <Icon name="lucide:map-pin" class="loc-icon" /> Orem, UT
            </span>
          </div>
        </div>
        <div class="edu-details">
          <div class="gpa-badge">
            <span class="gpa-num">3.90</span>
            <span class="gpa-label">GPA</span>
          </div>
          <p class="edu-description-text">
            Completed through Timpview's concurrent enrollment and distance
            learning programs, as well as AP exam scores.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'ResumeEducation',
  props: {
    hoveredSkill: {
      type: String as PropType<string | null>,
      default: null,
    },
  },
  emits: ['show-coursework'],
  setup(props) {
    const isAcademicSkillHovered = computed(() => {
      const academicSkills = [
        'Terraform',
        'Swift',
        'C++',
        'C#',
        'R',
        'NoSQL',
        'DBT',
        'Prefect',
        'MCPs',
        'Scrum',
      ]
      return props.hoveredSkill
        ? academicSkills.includes(props.hoveredSkill)
        : false
    })

    return {
      isAcademicSkillHovered,
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
