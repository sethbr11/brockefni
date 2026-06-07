<template>
  <aside class="sidebar-column">
    <div class="skills-card glass-panel sticky-sidebar">
      <h2 class="section-title">
        <Code2Icon class="section-icon" /> Skills Directory
      </h2>
      <p class="skills-tip">Click a skill pill to locate it in the timeline.</p>

      <div
        v-for="(category, catName) in skillCategories"
        :key="catName"
        class="skill-category"
      >
        <h3 class="category-title">{{ catName }}</h3>
        <div class="skills-grid">
          <span
            v-for="skill in category"
            :key="skill"
            class="skill-pill"
            :class="{
              'highlighted-skill': isSkillHighlighted(skill),
              'active-skill': hoveredSkill === skill,
            }"
            @mouseenter="$emit('update-hovered-skill', skill)"
            @mouseleave="$emit('update-hovered-skill', null)"
            @click="$emit('skill-click', skill)"
          >
            {{ skill }}
          </span>
        </div>
      </div>
    </div>
  </aside>
</template>

<script lang="ts">
import { Code2Icon } from 'lucide-vue-next'

import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { Job, Education } from '../../assets/data/resumeData'

export default defineComponent({
  components: { Code2Icon },
  name: 'ResumeSkillsSidebar',
  props: {
    skillCategories: {
      type: Object as PropType<Record<string, string[]>>,
      required: true,
    },
    hoveredSkill: {
      type: String as PropType<string | null>,
      default: null,
    },
    activeJob: {
      type: Number as PropType<number | null>,
      default: null,
    },
    jobs: {
      type: Array as PropType<Job[]>,
      required: true,
    },
    activeEdu: {
      type: Number as PropType<number | null>,
      default: null,
    },
    education: {
      type: Array as PropType<Education[]>,
      required: true,
    },
  },
  emits: ['update-hovered-skill', 'skill-click'],
  setup(props) {
    const isSkillHighlighted = (skill: string): boolean => {
      if (props.hoveredSkill === skill) return true
      if (props.activeJob !== null) {
        const job = props.jobs[props.activeJob]
        if (job && job.skills.includes(skill)) return true
      }
      if (props.activeEdu !== null) {
        const edu = props.education[props.activeEdu]
        if (edu && edu.skills.includes(skill)) return true
      }
      return false
    }

    return {
      isSkillHighlighted,
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

/* Sidebar Columns: Sticky Skills */
.sidebar-column {
  position: relative;
  height: 100%;
}

.sticky-sidebar {
  position: sticky;
  top: 2rem;
  z-index: 10;
  padding: 1.25rem;
  text-align: left;
  max-height: calc(100vh - 4rem);
  overflow-y: auto;
}

.sticky-sidebar::-webkit-scrollbar {
  width: 4px;
}
.sticky-sidebar::-webkit-scrollbar-track {
  background: transparent;
}
.sticky-sidebar::-webkit-scrollbar-thumb {
  background: var(--outline-color);
  border-radius: 2px;
}
.sticky-sidebar::-webkit-scrollbar-thumb:hover {
  background: var(--page-accent);
}

.skills-tip {
  font-size: 0.75rem;
  color: var(--secondary-text-color);
  margin-top: -0.5rem;
  margin-bottom: 1.25rem;
  font-style: italic;
  line-height: 1.35;
}

.skill-category {
  margin-bottom: 1.15rem;
}

.skill-category:last-child {
  margin-bottom: 0;
}

.category-title {
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--text-color);
  margin-top: 0;
  margin-bottom: 0.5rem;
  letter-spacing: 0.5px;
}

.skills-grid {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.skill-pill {
  font-size: 0.76rem;
  font-weight: 600;
  padding: 0.3rem 0.65rem;
  border-radius: 50px;
  background: var(--background-lighter-variant);
  border: 1px solid var(--outline-color);
  color: var(--text-color-muted);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.skill-pill:hover,
.skill-pill.active-skill {
  border-color: var(--page-accent);
  color: var(--page-accent);
  transform: translateY(-1px);
}

.skill-pill.highlighted-skill {
  background: var(--page-accent);
  border-color: var(--page-accent);
  color: white !important;
  box-shadow: 0 4px 12px var(--page-accent-glow);
  transform: scale(1.05);
}

@media (max-width: 992px) {
  .sidebar-column {
    display: none;
  }
}
</style>
