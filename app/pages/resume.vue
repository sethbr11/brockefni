<template>
  <div class="resume-page">
    <!-- Scroll Progress indicator -->
    <div class="scroll-progress-container">
      <div class="scroll-bar" :style="{ width: scrollProgress + '%' }"></div>
    </div>

    <!-- Resume Header / Hero -->
    <ResumeHero />

    <!-- Main Content Layout -->
    <main class="interactive-layout container">
      <!-- Intro Hook -->
      <section class="intro-card glass-panel">
        <p>
          Passionate Software Engineer and DevOps Specialist focused on
          designing robust developer tools, managing cloud infrastructure, and
          automating complex workflows. BYU MISM graduate with an emphasis on
          Web Development, Cloud DevOps, and Machine Learning.
        </p>
      </section>

      <div class="grid-container">
        <!-- Left Column: Experience, Education, Hobbies -->
        <div class="main-column">
          <!-- Work Experience -->
          <section class="resume-section">
            <h2 class="section-title">
              <BriefcaseIcon class="section-icon" /> Work Experience
            </h2>
            <div class="timeline">
              <ResumeJobCard
                v-for="(job, idx) in jobs"
                :key="idx"
                :job="job"
                :idx="idx"
                :is-active="activeJob === idx"
                :is-expanded="expandedJob === idx"
                :hovered-skill="hoveredSkill"
                @update-active="activeJob = $event"
                @toggle-expand="toggleJobExpand"
              />
            </div>
          </section>

          <!-- Education -->
          <ResumeEducation
            :education="education"
            :active-edu="activeEdu"
            :hovered-skill="hoveredSkill"
            @update-active="activeEdu = $event"
          />

          <!-- Achievements & Hobbies -->
          <ResumeAchievements
            :interests="interests"
            :active-note="activeNote"
            @trigger-interest-note="triggerInterestNote"
          />
        </div>

        <!-- Right Column: Sticky Skills Directory -->
        <ResumeSkillsSidebar
          :skill-categories="skillCategories"
          :hovered-skill="hoveredSkill"
          :active-job="activeJob"
          :jobs="jobs"
          :active-edu="activeEdu"
          :education="education"
          @update-hovered-skill="hoveredSkill = $event"
          @skill-click="handleSkillClick"
        />
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { BriefcaseIcon } from 'lucide-vue-next'

import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import { useHead } from '#app'

// Explicit component imports
import ResumeHero from '../components/ResumePage/ResumeHero.vue'
import ResumeJobCard from '../components/ResumePage/ResumeJobCard.vue'
import ResumeEducation from '../components/ResumePage/ResumeEducation.vue'
import ResumeSkillsSidebar from '../components/ResumePage/ResumeSkillsSidebar.vue'
import ResumeAchievements from '../components/ResumePage/ResumeAchievements.vue'

// Import data
import {
  jobs,
  skillCategories,
  education,
  interests,
} from '../assets/data/resumeData.js'

export default defineComponent({
  name: 'ResumePage',
  components: {
    BriefcaseIcon,
    ResumeHero,
    ResumeJobCard,
    ResumeEducation,
    ResumeSkillsSidebar,
    ResumeAchievements,
  },
  setup() {
    // SEO setup
    useHead({
      title: 'Seth Brock - Interactive Resume & Portfolio',
      meta: [
        {
          name: 'description',
          content:
            'Interactive professional resume of Seth Brock, Software Engineer and DevOps Specialist. Explore work history, education, and technical expertise.',
        },
        {
          name: 'keywords',
          content:
            'Seth Brock resume, interactive resume, software engineer resume, DevOps specialist portfolio, BYU MISM, PLUNJ, DesktopHero',
        },
        {
          property: 'og:title',
          content: 'Seth Brock - Interactive Resume & Portfolio',
        },
        {
          property: 'og:description',
          content:
            'Interactive professional resume of Seth Brock, Software Engineer and DevOps Specialist. Explore work history, education, and technical expertise.',
        },
        {
          property: 'og:url',
          content: 'https://brockefni.com/resume',
        },
        {
          property: 'og:type',
          content: 'profile',
        },
        {
          property: 'og:image',
          content: 'https://brockefni.com/og_image.png',
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          name: 'twitter:title',
          content: 'Seth Brock - Interactive Resume & Portfolio',
        },
        {
          name: 'twitter:description',
          content:
            'Interactive professional resume of Seth Brock, Software Engineer and DevOps Specialist. Explore work history, education, and technical expertise.',
        },
        {
          name: 'twitter:image',
          content: 'https://brockefni.com/og_image.png',
        },
      ],
      link: [
        {
          rel: 'canonical',
          href: 'https://brockefni.com/resume',
        },
      ],
    })

    const scrollProgress = ref(0)
    const activeJob = ref<number | null>(null)
    const activeEdu = ref<number | null>(null)
    const expandedJob = ref<number | null>(null)
    const hoveredSkill = ref<string | null>(null)
    const activeNote = ref<string | null>(null)

    const handleScroll = () => {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight
      if (docHeight > 0) {
        scrollProgress.value = (window.scrollY / docHeight) * 100
      }
    }

    const handleSkillClick = (skill: string) => {
      const jobIdx = jobs.findIndex((job) => job.skills.includes(skill))
      if (jobIdx !== -1) {
        const element = document.getElementById(`job-${jobIdx}`)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' })
          activeJob.value = jobIdx
          expandedJob.value = jobIdx // Automatically expand!
        }
      } else {
        const edu = education.find((e) => e.skills.includes(skill))
        if (edu) {
          const element = document.getElementById(edu.id)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }
        }
      }
    }

    const toggleJobExpand = (idx: number) => {
      expandedJob.value = expandedJob.value === idx ? null : idx
    }

    let noteTimeout: NodeJS.Timeout | null = null
    const triggerInterestNote = (interestName: string) => {
      activeNote.value = interestName
      if (noteTimeout) clearTimeout(noteTimeout)
      noteTimeout = setTimeout(() => {
        activeNote.value = null
      }, 1200)
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      scrollProgress,
      activeJob,
      activeEdu,
      expandedJob,
      hoveredSkill,
      activeNote,
      jobs,
      skillCategories,
      education,
      interests,
      handleSkillClick,
      toggleJobExpand,
      triggerInterestNote,
    }
  },
})
</script>

<style scoped>
.resume-page {
  min-height: 100vh;
  background: var(--background-color);
  color: var(--text-color);
  padding-bottom: 5rem;
  --page-accent: #d87628;
  --page-accent-hover: #f2a05e;
  --page-accent-glow: rgba(216, 118, 40, 0.18);
  --page-accent-light: rgba(216, 118, 40, 0.1);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Scroll Progress */
.scroll-progress-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: transparent;
  z-index: 1000;
}

.scroll-bar {
  height: 100%;
  background: var(--page-accent);
  transition: width 0.1s ease-out;
}

/* Glass panel */
.glass-panel {
  background: var(--background-variant);
  border: 1px solid var(--outline-color);
  border-radius: 16px;
  box-shadow: 0 8px 30px var(--shadow);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* Interactive Layout */
.interactive-layout {
  margin-top: 3rem;
}

.intro-card {
  padding: 1.5rem 2rem;
  font-size: 1.15rem;
  line-height: 1.6;
  text-align: center;
  color: var(--text-color);
  max-width: 900px;
  margin: 0 auto 3rem auto;
}

.grid-container {
  display: grid;
  grid-template-columns: 1.25fr 0.75fr;
  gap: 3.5rem;
  align-items: start;
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

/* Timeline */
.timeline {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;
}

.main-column {
  text-align: left;
}

/* Responsiveness */
@media (max-width: 992px) {
  .grid-container {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }
}
</style>
