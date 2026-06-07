<template>
  <div class="uvu-page">
    <!-- Hero Banner Section -->
    <section class="hero-section">
      <div class="hero-bg-container">
        <img
          src="~/assets/images/clark-building.png"
          alt="UVU Clark Building"
          class="hero-bg-image"
        />
        <div class="hero-overlay"></div>
      </div>

      <div class="container hero-content-wrapper">
        <!-- Back Link -->
        <NuxtLink to="/resume" class="back-link glass-panel">
          <Icon name="lucide:arrow-left" class="icon" /> Back to Resume
        </NuxtLink>

        <!-- School Info Card -->
        <div class="school-card glass-panel animate-fade-in">
          <div class="school-logo-container">
            <img
              src="~/assets/icons/uvu.png"
              alt="UVU Logo"
              class="school-logo"
            />
          </div>
          <div class="school-info">
            <span class="institution">Utah Valley University</span>
            <span class="college"
              >College of Humanities &amp; Social Sciences</span
            >
            <h1 class="degree-title">
              Bachelor of Arts in English &amp; Associate of Science
            </h1>
            <div class="academic-meta">
              <span class="meta-item">
                <Icon name="lucide:calendar" class="meta-icon" /> 2018 – 2020,
                2026 – Present
              </span>
              <span class="meta-item">
                <Icon name="lucide:map-pin" class="meta-icon" /> Orem, UT
              </span>
              <span class="meta-item gpa-pill">
                <Icon name="lucide:award" class="meta-icon" /> GPA: 3.90
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content Section -->
    <main class="container page-content">
      <!-- Chapter 1: Bachelor of Arts in English (Literature Emphasis) -->
      <section class="overview-section glass-panel">
        <div class="program-badge current-badge">Current Program</div>
        <h2 class="section-title">
          <Icon name="lucide:book-open" class="section-icon" /> Bachelor of Arts
          in English (Literature)
        </h2>
        <p class="overview-text">
          Beginning in June 2026, I am returning to Utah Valley University to
          pursue a Bachelor of Arts in English with a Literature emphasis. This
          degree focuses on advanced text analysis, critical literary theory,
          creative and expository writing, and historical literary movements. I
          aim to merge my technical background in Information Systems and
          software automation with deep analytical and communication skills
          gained from literary studies.
        </p>

        <div class="academic-focus-pills">
          <span class="focus-pill">Literary Criticism</span>
          <span class="focus-pill">Technical &amp; Expository Writing</span>
          <span class="focus-pill">Digital Humanities</span>
          <span class="focus-pill">Narrative Theory</span>
        </div>

        <div class="timeline-container uvu-ba-timeline">
          <div
            v-for="(sem, index) in baSemesters"
            :key="'ba-' + index"
            class="semester-card glass-panel"
            :class="{
              'is-expanded': expandedSemesters.includes('ba-' + index),
            }"
            @click="toggleSemester('ba-' + index)"
          >
            <div class="semester-header">
              <div class="header-main">
                <span class="semester-term">{{ sem.term }}</span>
                <h3 class="semester-focus">{{ sem.focus }}</h3>
              </div>
              <div class="header-action">
                <span class="status-indicator">{{ sem.status }}</span>
                <button class="expand-btn">
                  <Icon name="lucide:chevron-down" class="chevron-icon" />
                </button>
              </div>
            </div>

            <!-- Expanded Contents -->
            <div
              class="semester-body"
              v-if="expandedSemesters.includes('ba-' + index)"
            >
              <div class="body-grid">
                <!-- Coursework -->
                <div class="detail-column courses-col">
                  <h4>
                    <Icon name="lucide:book-marked" class="sub-icon" /> Planned
                    Coursework
                  </h4>
                  <ul class="courses-list">
                    <li v-for="(course, cIdx) in sem.courses" :key="cIdx">
                      <span class="course-code">{{ course.code }}</span> –
                      {{ course.name }}
                    </li>
                  </ul>
                </div>

                <!-- Description -->
                <div class="detail-column desc-col">
                  <h4>
                    <Icon name="lucide:sparkles" class="sub-icon" /> Semester
                    Focus
                  </h4>
                  <p class="description">{{ sem.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Chapter 2: Associate of Science in University Studies -->
      <section class="overview-section glass-panel">
        <div class="program-badge past-badge">Completed Program</div>
        <h2 class="section-title">
          <Icon name="lucide:graduation-cap" class="section-icon" /> Associate
          of Science in University Studies
        </h2>
        <p class="overview-text">
          Completed in 2020 with a cumulative GPA of 3.90, this associate degree
          was earned through a combination of Timpview High School concurrent
          enrollment courses, UVU distance learning, and AP examination scores.
          This pathway allowed me to complete general education requirements and
          foundational coursework before matriculating to BYU.
        </p>

        <div class="timeline-container uvu-as-timeline">
          <div
            v-for="(sem, index) in asSemesters"
            :key="'as-' + index"
            class="semester-card glass-panel"
            :class="{
              'is-expanded': expandedSemesters.includes('as-' + index),
            }"
            @click="toggleSemester('as-' + index)"
          >
            <div class="semester-header">
              <div class="header-main">
                <span class="semester-term">{{ sem.term }}</span>
                <h3 class="semester-focus">{{ sem.focus }}</h3>
              </div>
              <div class="header-action">
                <button class="expand-btn">
                  <Icon name="lucide:chevron-down" class="chevron-icon" />
                </button>
              </div>
            </div>

            <!-- Expanded Contents -->
            <div
              class="semester-body"
              v-if="expandedSemesters.includes('as-' + index)"
            >
              <div class="body-grid">
                <!-- Coursework -->
                <div class="detail-column courses-col">
                  <h4>
                    <Icon name="lucide:book-marked" class="sub-icon" /> Core
                    Credits &amp; Courses
                  </h4>
                  <ul class="courses-list">
                    <li v-for="(course, cIdx) in sem.courses" :key="cIdx">
                      <span class="course-code">{{ course.code }}</span> –
                      {{ course.name }}
                    </li>
                  </ul>
                </div>

                <!-- Description -->
                <div class="detail-column desc-col">
                  <h4>
                    <Icon name="lucide:sparkles" class="sub-icon" /> Chapter
                    Description
                  </h4>
                  <p class="description">{{ sem.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useHead } from '#app'

interface Course {
  code: string
  name: string
}

interface Semester {
  term: string
  focus: string
  status?: string
  courses: Course[]
  description: string
}

export default defineComponent({
  name: 'UvuExperiencePage',
  setup() {
    useHead({
      title: 'UVU Experience | Seth Brock Portfolio',
      meta: [
        {
          name: 'description',
          content:
            "Overview of Seth Brock's academic journey at Utah Valley University, including his current Bachelor of Arts in English (Literature) and Associate of Science.",
        },
      ],
    })

    const expandedSemesters = ref<string[]>([]) // All semesters start collapsed

    const baSemesters = ref<Semester[]>([
      {
        term: 'Fall 2026',
        focus: 'Literary History & Positionality',
        status: 'Upcoming',
        courses: [
          { code: 'ENGL 2600', name: 'Critical Introduction to Literature' },
          { code: 'ENGL 2700G', name: 'Positionality and Methods' },
          {
            code: 'ENGL 2850',
            name: 'Literary History 1 (British Isles to approx 1700)',
          },
          { code: 'ENGL 3760G', name: 'World Literature' },
        ],
        description:
          'Focusing on core literary studies, researching narrative methods and positionality, and covering British Isles literary history up to 1700 alongside world literature survey modules.',
      },
      {
        term: 'Summer 2026',
        focus: 'Introduction to the English Major',
        status: 'Starting Jun 2026',
        courses: [{ code: 'ENGL 2800', name: 'Intro to the English Major' }],
        description:
          'Beginning my coursework in the Bachelor of Arts program, focusing exclusively on the foundational concepts, research methodologies, and career paths within the English discipline.',
      },
    ])

    const asSemesters = ref<Semester[]>([
      {
        term: '2019 – 2020',
        focus: 'Distance Learning Courses',
        courses: [
          { code: 'ART 1010', name: 'Introduction to Visual Arts' },
          { code: 'COMM 1020', name: 'Public Speaking' },
          { code: 'ENGL 2010', name: 'Intermediate Writing' },
          { code: 'GEO 1010', name: 'Introduction to Geology' },
          { code: 'PHIL 205G', name: 'Ethics and Values' },
        ],
        description:
          'Completed a variety of general education and university studies courses via distance learning to finish the remaining credits for the Associate of Science degree.',
      },
      {
        term: '2016 – 2020',
        focus: 'Timpview AP Exam Credits',
        courses: [
          { code: 'AP GEOG', name: 'AP Human Geography' },
          { code: 'AP HIST', name: 'AP World History' },
          { code: 'AP HIST', name: 'AP US History' },
          { code: 'AP BIOL', name: 'AP Biology' },
          { code: 'AP ENGL', name: 'AP English Language' },
          { code: 'AP GERM', name: 'AP German' },
          { code: 'AP CALC', name: 'AP Calculus BC' },
          { code: 'AP GOVT', name: 'AP US Government' },
        ],
        description:
          'Earned foundational college credits through AP exams completed during high school, satisfying the majority of the Associate of Science general education requirements.',
      },
    ])

    const toggleSemester = (id: string) => {
      if (expandedSemesters.value.includes(id)) {
        expandedSemesters.value = expandedSemesters.value.filter(
          (i) => i !== id
        )
      } else {
        expandedSemesters.value.push(id)
      }
    }

    return {
      baSemesters,
      asSemesters,
      expandedSemesters,
      toggleSemester,
    }
  },
})
</script>

<style scoped>
.uvu-page {
  min-height: 100vh;
  background: var(--background-color);
  color: var(--text-color);
  padding-bottom: 5rem;
  --school-primary: #006241;
  --school-accent: #276e56;
  --school-glow: rgba(0, 98, 65, 0.12);
  --school-accent-glow: rgba(39, 110, 86, 0.18);
  --school-light: rgba(0, 98, 65, 0.08);
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Glass panel background */
.glass-panel {
  background: var(--background-variant);
  border: 1px solid var(--outline-color);
  border-radius: 16px;
  box-shadow: 0 8px 30px var(--shadow);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* Hero Section */
.hero-section {
  position: relative;
  min-height: 380px;
  display: flex;
  align-items: flex-end;
  padding: 4rem 0 2rem 0;
  overflow: hidden;
}

.hero-bg-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.hero-bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.65) contrast(1.05);
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 98, 65, 0.25) 0%,
    var(--background-color) 95%
  );
}

.hero-content-wrapper {
  position: relative;
  z-index: 2;
  width: 100%;
}

.back-link {
  position: absolute;
  top: -2.5rem;
  left: 1.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  font-weight: 700;
  text-decoration: none;
  color: var(--text-color);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 30px;
  backdrop-filter: blur(10px);
}

.back-link:hover {
  border-color: var(--school-primary);
  color: var(--school-primary);
  transform: translateX(-3px);
}

.back-link .icon {
  width: 16px;
  height: 16px;
}

.school-card {
  display: flex;
  gap: 2rem;
  padding: 2.25rem;
  align-items: center;
  backdrop-filter: blur(16px);
  background: rgba(255, 255, 255, 0.85);
  margin-top: 1rem;
  text-align: left;
}

.darkmode .school-card {
  background: rgba(35, 48, 62, 0.8);
}

.school-logo-container {
  width: 100px;
  height: 100px;
  background: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  flex-shrink: 0;
}

.school-logo {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.school-info {
  flex: 1;
}

.institution {
  font-size: 0.9rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: var(--school-primary);
  display: block;
}

.darkmode .institution {
  color: #4fb992;
}

.college {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-color-muted);
  display: block;
  margin-top: 0.15rem;
}

.degree-title {
  font-size: 1.85rem;
  font-weight: 900;
  margin: 0.4rem 0 0.8rem 0;
  letter-spacing: -0.5px;
  line-height: 1.2;
}

.academic-meta {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-color-muted);
}

.meta-icon {
  width: 16px;
  height: 16px;
  color: var(--school-primary);
}

.darkmode .meta-icon {
  color: #4fb992;
}

.gpa-pill {
  background: var(--school-accent-glow);
  color: var(--school-primary);
  padding: 0.2rem 0.75rem;
  border-radius: 50px;
  font-weight: 700;
}

.darkmode .gpa-pill {
  color: #4fb992;
  background: rgba(79, 185, 146, 0.15);
}

/* Page Content */
.page-content {
  margin-top: 2rem;
  text-align: left;
}

/* Overview Section */
.overview-section {
  padding: 2.25rem;
  margin-bottom: 3rem;
  position: relative;
}

.program-badge {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  padding: 0.35rem 0.75rem;
  border-radius: 6px;
  letter-spacing: 0.5px;
}

.current-badge {
  background: rgba(79, 185, 146, 0.15);
  color: #006241;
  border: 1px solid rgba(0, 98, 65, 0.3);
}

.darkmode .current-badge {
  color: #4fb992;
  border-color: rgba(79, 185, 146, 0.4);
}

.past-badge {
  background: var(--background-lighter-variant);
  color: var(--text-color-muted);
  border: 1px solid var(--outline-color);
}

.section-title {
  font-size: 1.65rem;
  font-weight: 800;
  margin-top: 0;
  margin-bottom: 1.25rem;
  color: var(--text-color);
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.section-icon {
  color: var(--school-primary);
  width: 28px;
  height: 28px;
}

.darkmode .section-icon {
  color: #4fb992;
}

.overview-text {
  font-size: 1.12rem;
  line-height: 1.7;
  color: var(--text-color-muted);
  margin-bottom: 1.5rem;
  max-width: 90%;
}

.academic-focus-pills {
  display: flex;
  gap: 0.65rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.focus-pill {
  font-size: 0.82rem;
  font-weight: 700;
  padding: 0.3rem 0.8rem;
  border-radius: 50px;
  background: var(--background-lighter-variant);
  border: 1px solid var(--outline-color);
  color: var(--text-color-muted);
}

/* Timeline/Semesters */
.timeline-container {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-top: 1.5rem;
}

.semester-card {
  padding: 1.5rem 2rem;
  cursor: pointer;
  overflow: hidden;
  border-left: 4px solid var(--school-primary);
}

.darkmode .semester-card {
  border-left-color: #4fb992;
}

.semester-card:hover {
  transform: translateY(-2px);
  border-color: var(--school-accent);
  box-shadow: 0 8px 24px var(--school-glow);
}

.semester-card.is-expanded {
  border-left-color: var(--school-accent);
  box-shadow: 0 10px 30px var(--school-glow);
}

.semester-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.semester-term {
  font-size: 0.85rem;
  font-weight: 800;
  color: var(--school-primary);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.darkmode .semester-term {
  color: #4fb992;
}

.semester-focus {
  font-size: 1.25rem;
  font-weight: 800;
  margin: 0.15rem 0 0 0;
}

.header-action {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.status-indicator {
  font-size: 0.78rem;
  font-weight: 800;
  background: var(--school-accent-glow);
  color: var(--school-primary);
  border: 1px solid rgba(0, 98, 65, 0.15);
  padding: 0.25rem 0.6rem;
  border-radius: 4px;
  text-transform: uppercase;
}

.darkmode .status-indicator {
  color: #4fb992;
  background: rgba(79, 185, 146, 0.12);
  border-color: rgba(79, 185, 146, 0.2);
}

.expand-btn {
  background: none;
  border: none;
  color: var(--text-color-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.semester-card:hover .expand-btn {
  background: var(--background-lighter-variant);
}

.chevron-icon {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}

.semester-card.is-expanded .chevron-icon {
  transform: rotate(180deg);
  color: var(--school-primary);
}

.darkmode .semester-card.is-expanded .chevron-icon {
  color: #4fb992;
}

/* Semester Body */
.semester-body {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--outline-color);
}

.body-grid {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 2.5rem;
}

.detail-column h4 {
  font-size: 1.05rem;
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-color);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.sub-icon {
  width: 18px;
  height: 18px;
  color: var(--school-primary);
}

.darkmode .sub-icon {
  color: #4fb992;
}

.courses-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.courses-list li {
  font-size: 0.95rem;
  color: var(--text-color-muted);
  line-height: 1.4;
}

.course-code {
  font-weight: 700;
  color: var(--text-color);
}

.description {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-color-muted);
  margin: 0;
}

/* Animations */
.animate-fade-in {
  animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive adjustments */
@media (max-width: 850px) {
  .body-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .school-card {
    flex-direction: column;
    text-align: center;
    padding: 1.5rem;
  }

  .school-logo-container {
    width: 80px;
    height: 80px;
  }

  .degree-title {
    font-size: 1.45rem;
  }

  .academic-meta {
    justify-content: center;
    gap: 0.75rem;
  }

  .semester-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .header-action {
    width: 100%;
    justify-content: space-between;
  }

  .program-badge {
    position: relative;
    top: 0;
    right: 0;
    display: inline-block;
    margin-bottom: 1rem;
  }
}
</style>
