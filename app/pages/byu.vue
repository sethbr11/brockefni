<template>
  <div class="byu-page">
    <!-- Hero Banner Section -->
    <section class="hero-section">
      <div class="hero-bg-container">
        <img
          src="~/assets/images/tanner-building.png"
          alt="BYU Tanner Building"
          class="hero-bg-image"
        />
        <div class="hero-overlay"></div>
      </div>

      <div class="container hero-content-wrapper">
        <!-- Back Link -->
        <NuxtLink to="/resume" class="back-link glass-panel">
          <ArrowLeftIcon class="icon" /> Back to Resume
        </NuxtLink>

        <!-- School Info Card -->
        <div class="school-card glass-panel animate-fade-in">
          <div class="school-logo-container">
            <img
              src="~/assets/icons/byu.png"
              alt="BYU Logo"
              class="school-logo"
            />
          </div>
          <div class="school-info">
            <span class="institution">Brigham Young University</span>
            <span class="college">Marriott School of Business</span>
            <h1 class="degree-title">
              Master of Information Systems Management (MISM)
            </h1>
            <div class="academic-meta">
              <span class="meta-item">
                <CalendarIcon class="meta-icon" /> 2020 – 2021, 2023 – 2026
              </span>
              <span class="meta-item">
                <MapPinIcon class="meta-icon" /> Provo, UT
              </span>
              <span class="meta-item gpa-pill">
                <AwardIcon class="meta-icon" /> MISM GPA: 3.86
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content Section -->
    <main class="container page-content">
      <!-- Program Overview -->
      <section class="overview-section glass-panel">
        <h2 class="section-title">
          <GraduationCapIcon class="section-icon" /> Program Overview
        </h2>
        <p class="overview-text">
          The BYU Master of Information Systems Management (MISM) is a
          STEM-certified integrated program that awards both a Bachelor of
          Science in Information Systems and a Master of Science in Information
          Systems simultaneously. The program emphasizes enterprise application
          design, cloud architecture, cybersecurity controls, data analytics,
          and software testing. During my time in the program, I specialized in
          <strong>Web Development &amp; Cloud DevOps</strong>.
        </p>
        <div class="achievements-grid">
          <div class="achievement-card">
            <BookmarkIcon class="ach-icon" />
            <h3>Academic Scholarships</h3>
            <p>
              Received BYU Marriott School academic scholarships in 2020, 2023,
              and 2024.
            </p>
          </div>
          <div class="achievement-card">
            <CpuIcon class="ach-icon" />
            <h3>Web &amp; DevOps Focus</h3>
            <p>
              Specialized in cloud automation, serverless architecture, and
              full-stack web application development.
            </p>
          </div>
          <div class="achievement-card">
            <BookOpenIcon class="ach-icon" />
            <h3>Graduate TA &amp; RA</h3>
            <p>
              Tutored junior cores and constructed specialized data wrangling
              curriculum for Marriott School courses.
            </p>
          </div>
        </div>
      </section>

      <!-- Semester Timeline -->
      <section class="timeline-section">
        <h2 class="section-title">
          <CalendarRangeIcon class="section-icon" />
          Semester-by-Semester Breakdown
        </h2>
        <p class="section-subtitle">
          Click on any semester card to view coursework, key projects, and
          experiences.
        </p>

        <div class="timeline-container">
          <div
            v-for="(sem, index) in semesters"
            :key="index"
            class="semester-card glass-panel"
            :class="{ 'is-expanded': expandedSemesters.includes(index) }"
            @click="toggleSemester(index)"
          >
            <div class="semester-header">
              <div class="header-main">
                <span class="semester-term">{{ sem.term }}</span>
                <h3 class="semester-focus">{{ sem.focus }}</h3>
              </div>
              <div class="header-action">
                <span class="credits-indicator" v-if="sem.credits"
                  >{{ sem.credits }} Credits</span
                >
                <button class="expand-btn">
                  <ChevronDownIcon class="chevron-icon" />
                </button>
              </div>
            </div>

            <!-- Expanded Contents -->
            <div class="semester-body" v-if="expandedSemesters.includes(index)">
              <div class="body-grid">
                <!-- Coursework -->
                <div class="detail-column courses-col">
                  <h4>
                    <BookMarkedIcon class="sub-icon" /> Featured Coursework
                  </h4>
                  <ul class="courses-list">
                    <li v-for="(course, cIdx) in sem.courses" :key="cIdx">
                      <span class="course-code">{{ course.code }}</span> –
                      {{ course.name }}
                    </li>
                  </ul>
                </div>

                <!-- Details / Experience -->
                <div class="detail-column desc-col">
                  <h4>
                    <SparklesIcon class="sub-icon" /> Academic Focus &amp;
                    Experience
                  </h4>
                  <p class="description">{{ sem.description }}</p>

                  <!-- Projects if applicable -->
                  <div
                    class="semester-projects-container"
                    v-if="sem.projects && sem.projects.length"
                  >
                    <h5 class="projects-section-header">Featured Projects</h5>
                    <div
                      class="semester-project"
                      v-for="(proj, pIdx) in sem.projects"
                      :key="pIdx"
                    >
                      <h6 class="project-title">
                        <GitForkIcon class="proj-icon" />
                        {{ proj.name }}
                      </h6>
                      <p class="project-desc">{{ proj.description }}</p>
                      <NuxtLink
                        v-if="proj.url && proj.url.startsWith('/')"
                        :to="proj.url"
                        class="project-link"
                        @click.stop
                      >
                        <LinkIcon class="link-icon" /> View Product Page
                      </NuxtLink>
                      <a
                        v-else-if="proj.url"
                        :href="proj.url"
                        target="_blank"
                        class="project-link"
                        @click.stop
                      >
                        <ExternalLinkIcon class="link-icon" />
                        View Project Source
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Religion Coursework Section -->
      <section class="religion-section glass-panel">
        <h2 class="section-title">
          <BookIcon class="section-icon" /> Religious Education Core
        </h2>
        <p class="overview-text">
          Completed as part of the core graduation requirements at BYU,
          fostering doctrinal study, historical perspective, and ethical
          principles:
        </p>
        <div class="religion-grid">
          <div
            v-for="rel in religionCourses"
            :key="rel.code"
            class="rel-course-card"
          >
            <div class="rel-icon-container">
              <BookOpenIcon class="rel-icon" />
            </div>
            <div class="rel-course-details">
              <span class="rel-code">{{ rel.code }}</span>
              <span class="rel-name">{{ rel.name }}</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script lang="ts">
import {
  ArrowLeftIcon,
  CalendarIcon,
  MapPinIcon,
  AwardIcon,
  GraduationCapIcon,
  BookmarkIcon,
  CpuIcon,
  BookOpenIcon,
  CalendarRangeIcon,
  ChevronDownIcon,
  BookMarkedIcon,
  SparklesIcon,
  GitForkIcon,
  LinkIcon,
  ExternalLinkIcon,
  BookIcon,
} from 'lucide-vue-next'

import { defineComponent, ref } from 'vue'
import { useHead } from '#app'

interface Course {
  code: string
  name: string
}

interface Project {
  name: string
  description: string
  url?: string
}

interface Semester {
  term: string
  focus: string
  gpa?: string
  credits?: string
  courses: Course[]
  description: string
  projects?: Project[]
}

export default defineComponent({
  components: {
    ArrowLeftIcon,
    CalendarIcon,
    MapPinIcon,
    AwardIcon,
    GraduationCapIcon,
    BookmarkIcon,
    CpuIcon,
    BookOpenIcon,
    CalendarRangeIcon,
    ChevronDownIcon,
    BookMarkedIcon,
    SparklesIcon,
    GitForkIcon,
    LinkIcon,
    ExternalLinkIcon,
    BookIcon,
  },
  name: 'ByuExperiencePage',
  setup() {
    useHead({
      title: 'BYU MISM Experience | Seth Brock Portfolio',
      meta: [
        {
          name: 'description',
          content:
            "Detailed breakdown of Seth Brock's courses, projects, and semesters at Brigham Young University Marriott School of Business.",
        },
      ],
    })

    const expandedSemesters = ref<number[]>([]) // All semesters start collapsed

    const semesters = ref<Semester[]>([
      {
        term: 'Winter 2026',
        focus: 'Capstone & Advanced Core Studies',
        gpa: '3.62',
        credits: '15',
        courses: [
          { code: 'IS 552', name: 'MISM Capstone Project' },
          { code: 'IS 555', name: 'Data Science for Organizations (using R)' },
          {
            code: 'IS 566',
            name: 'Advanced Database Systems (NoSQL, DBT, Prefect, MCP)',
          },
        ],
        description:
          'My final semester in the MISM program. Worked on a cybersecurity training platform for Hill Air Force Base and built business data pipelines in R. Covered advanced database architectures, model context protocol integrations, and pipeline automation.',
        projects: [
          {
            name: 'Hill Air Force Base Red/Blue Cybersecurity Training Platform',
            description:
              'Worked with Hill AFB to create a Red Team/Blue Team training platform simulating real-world network topographies and system vulnerabilities.',
          },
        ],
      },
      {
        term: 'Fall 2025',
        focus: 'Mobile Platforms & Software Startups',
        gpa: '3.68',
        credits: '16',
        courses: [
          { code: 'IS 543', name: 'Mobile Platform Development (iOS/Swift)' },
          { code: 'IS 550', name: 'Capstone Introduction' },
          { code: 'IS 551', name: 'User Experience Design' },
          { code: 'IS 581', name: 'Managing a Software Startup' },
        ],
        description:
          'Focused heavily on native iOS development in Swift, User Experience design principles in Figma, and the fundamentals of launching and managing software startups.',
        projects: [
          {
            name: 'Talum iOS App',
            description:
              'A native iOS mobile application developed in Swift/SwiftUI.',
            url: 'https://github.com/sethbr11/Talum',
          },
          {
            name: 'UpSkrift iOS App',
            description:
              'A native iOS mobile application developed in Swift/SwiftUI.',
            url: 'https://github.com/sethbr11/UpSkrift',
          },
          {
            name: 'LCR Tools',
            description:
              'A Google Chrome extension for enhancing the functionality and user experience of LCR (Leader and Clerk Resources).',
            url: '/lcr',
          },
        ],
      },
      {
        term: 'Winter 2025',
        focus: 'Serverless Infrastructure & AI Models',
        gpa: '3.96',
        credits: '12',
        courses: [
          { code: 'IS 515', name: 'Advanced Spreadsheets Business Analysis' },
          { code: 'IS 590R', name: 'AWS Serverless Infrastructure' },
          { code: 'IS 693R', name: 'Readings & Conference (AI/ML)' },
        ],
        description:
          'A lighter semester to recover from the previous 18-credit load. Built serverless workflows in AWS using CDK/SDK and conducted a self-designed readings course building transformer models from the ground up.',
        projects: [
          {
            name: 'AWS CDK Serverless App',
            description:
              'An automated serverless infrastructure deployment using the AWS Cloud Development Kit (CDK) to orchestrate API Gateway, Lambda, and DynamoDB.',
            url: 'https://github.com/sethbr11/CdkExample',
          },
          {
            name: 'Translation Transformer',
            description:
              'An AI sequence-to-sequence translator model built from the ground up using custom transformer architectures.',
            url: 'https://github.com/sethbr11/PyTorch-Transformer',
          },
          {
            name: 'T5 Bible Styling',
            description:
              'Fine-tuned Text-to-Text Transfer Transformer (T5) model to style texts into Biblical prose.',
            url: 'https://github.com/sethbr11/t5-bible-styling',
          },
          {
            name: 'Vision Transformer (ViT)',
            description:
              'An image classification model utilizing attention mechanisms and custom patch embedding layers.',
            url: 'https://github.com/sethbr11/PyTorch-ImgClassification',
          },
          {
            name: 'Diffusion Model',
            description:
              'Generative image network trained to synthesize images from noise inputs.',
            url: 'https://github.com/sethbr11/DiffusionModel',
          },
        ],
      },
      {
        term: 'Fall 2024',
        focus: 'Enterprise Infrastructure & Digital Forensics',
        gpa: '3.66',
        credits: '18',
        courses: [
          { code: 'IS 531', name: 'Enterprise Infrastructure' },
          { code: 'IS 560', name: 'Information Security Management' },
          { code: 'IS 565', name: 'Digital Forensics for Organizations' },
          { code: 'IS 599R', name: 'Academic Internship (TitanCraft)' },
        ],
        description:
          'A highly intensive 18-credit semester focusing on cloud architecture, forensic investigations, packet analysis, active directory, and systems security monitoring.',
        projects: [
          {
            name: 'Terraform AWS Fargate App',
            description:
              'An Infrastructure-as-Code deployment script using Terraform to provision containerized Fargate microservices.',
            url: 'https://github.com/sethbr11/dotnet-serverless-example',
          },
        ],
      },
      {
        term: 'Spring/Summer Terms 2024',
        focus: 'Accelerated Terms & Professional Communication',
        gpa: '4.0',
        credits: '5',
        courses: [{ code: 'M COM 320', name: 'Management Communication' }],
        description:
          'Explored core business communication methods, writing styles, and corporate presentations to maintain an accelerated graduation schedule.',
        projects: [
          {
            name: 'Management Communication Article Portfolio',
            description:
              'Authored business articles and presentation decks as part of corporate writing benchmarks.',
            url: '/startup-article',
          },
        ],
      },
      {
        term: 'Winter 2024',
        focus: 'Enterprise Architecture & ML Foundations',
        gpa: '3.9',
        credits: '18',
        courses: [
          { code: 'IS 401', name: 'Project Management and Systems Design' },
          { code: 'IS 413', name: 'Enterprise Application Development (.NET)' },
          { code: 'IS 414', name: 'IS Security and Controls' },
          { code: 'IS 455', name: 'Machine Learning' },
        ],
        description:
          'Deepened my application engineering skills with enterprise C# development and Scrum system design, and started applying data science skills to machine learning.',
      },
      {
        term: 'Fall 2023',
        focus: 'Information Systems Junior Core',
        gpa: '4.0',
        credits: '14',
        courses: [
          { code: 'IS 402', name: 'Database Systems (SQL)' },
          {
            code: 'IS 403',
            name: 'Principles of Business Programming (Node.js)',
          },
          { code: 'IS 404', name: 'Data Communication (Networking)' },
          { code: 'IS 415', name: 'Exploratory Data Analysis (Python)' },
        ],
        description:
          'Returned from my 2-year volunteer mission and entered the intense IS Junior Core. It was a rigorous introduction to database systems, core business programming, cloud networking, and exploratory data analysis.',
      },
      {
        term: 'Winter 2021',
        focus: 'Engineering & CS Exploration',
        gpa: '4.0',
        credits: '14.5',
        courses: [
          { code: 'CS 235', name: 'Data Structures (C++)' },
          { code: 'CE EN 112', name: 'Civil Engineering Drafting w/ CAD' },
          { code: 'DIGHT 210', name: 'Intro to Coding: Desktop Apps' },
          { code: 'IS 201', name: 'Intro to Management Information Systems' },
        ],
        description:
          'Explored other majors like Computer Science and Civil Engineering while completing more of the required prerequisites for Information Systems, which I applied to over the summer after that semester as I left for my mission.',
      },
      {
        term: 'Fall 2020',
        focus: 'High School Transition & Tech Discovery',
        gpa: '3.87',
        credits: '14',
        courses: [
          { code: 'CS 142', name: 'Intro to Computer Programming (C++)' },
          { code: 'IS 110', name: 'Intro to the Program (Excel)' },
          { code: 'ACC 200', name: 'Principles of Accounting' },
          { code: 'STAT 121', name: 'Principles of Statistics' },
        ],
        description:
          'My first semester at university, straight out of high school. Since my UVU Associate degree covered my general education requirements, I focused on exploring business, math, and programming fields.',
      },
    ])

    const religionCourses = ref<Course[]>([
      {
        code: 'REL A 275',
        name: 'Teachings and Doctrine of the Book of Mormon',
      },
      { code: 'REL C 200', name: 'The Eternal Family' },
      { code: 'REL A 212', name: 'The New Testament' },
      { code: 'REL C 225', name: 'Foundations of the Restoration' },
      { code: 'REL A 250', name: 'Christ & the Everlasting Gospel' },
    ])

    const toggleSemester = (index: number) => {
      if (expandedSemesters.value.includes(index)) {
        expandedSemesters.value = expandedSemesters.value.filter(
          (i) => i !== index
        )
      } else {
        expandedSemesters.value.push(index)
      }
    }

    return {
      semesters,
      religionCourses,
      expandedSemesters,
      toggleSemester,
    }
  },
})
</script>

<style scoped>
.byu-page {
  min-height: 100vh;
  background: var(--background-color);
  color: var(--text-color);
  padding-bottom: 5rem;
  --school-primary: #002e5d;
  --school-accent: #d87628;
  --school-glow: rgba(0, 46, 93, 0.15);
  --school-accent-glow: rgba(216, 118, 40, 0.18);
  --school-light: rgba(0, 46, 93, 0.08);
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
    rgba(0, 46, 93, 0.2) 0%,
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
  border-color: var(--school-accent);
  color: var(--school-accent);
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
  color: var(--primary-lighter-variant);
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
  color: var(--school-accent);
}

.gpa-pill {
  background: var(--school-accent-glow);
  color: var(--school-accent);
  padding: 0.2rem 0.75rem;
  border-radius: 50px;
  font-weight: 700;
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
  color: var(--primary-lighter-variant);
}

.overview-text {
  font-size: 1.12rem;
  line-height: 1.7;
  color: var(--text-color-muted);
  margin-bottom: 2rem;
}

.achievements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.achievement-card {
  background: var(--background-lighter-variant);
  border: 1px solid var(--outline-color);
  border-radius: 12px;
  padding: 1.5rem;
}

.ach-icon {
  width: 26px;
  height: 26px;
  color: var(--school-accent);
  margin-bottom: 0.75rem;
}

.achievement-card h3 {
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
}

.achievement-card p {
  font-size: 0.92rem;
  line-height: 1.45;
  color: var(--text-color-muted);
  margin: 0;
}

/* Timeline/Semesters */
.timeline-section {
  margin-bottom: 3rem;
}

.section-subtitle {
  font-size: 1.05rem;
  color: var(--text-color-muted);
  margin-top: -0.75rem;
  margin-bottom: 2rem;
  font-style: italic;
}

.timeline-container {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.semester-card {
  padding: 1.5rem 2rem;
  cursor: pointer;
  overflow: hidden;
  border-left: 4px solid var(--school-primary);
}

.darkmode .semester-card {
  border-left-color: var(--primary-lighter-variant);
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
  color: var(--school-accent);
  text-transform: uppercase;
  letter-spacing: 1px;
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

.gpa-indicator,
.credits-indicator {
  font-size: 0.82rem;
  font-weight: 700;
  background: var(--background-lighter-variant);
  border: 1px solid var(--outline-color);
  padding: 0.25rem 0.6rem;
  border-radius: 4px;
  color: var(--text-color-muted);
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
  color: var(--school-accent);
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
  color: var(--school-accent);
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
  margin-top: 0;
  margin-bottom: 1.5rem;
}

.semester-projects-container {
  border-top: 1px dashed var(--outline-color);
  padding-top: 1.25rem;
  margin-top: 1.25rem;
}

.projects-section-header {
  font-size: 0.95rem;
  font-weight: 800;
  text-transform: uppercase;
  color: var(--text-color-muted);
  margin-top: 0;
  margin-bottom: 1rem;
  letter-spacing: 0.5px;
}

.semester-project {
  background: var(--background-lighter-variant);
  border: 1px solid var(--outline-color);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.semester-project:last-child {
  margin-bottom: 0;
}

.project-title {
  font-size: 0.95rem;
  font-weight: 800;
  margin: 0 0 0.4rem 0;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--text-color);
}

.proj-icon {
  width: 16px;
  height: 16px;
  color: var(--school-accent);
}

.project-desc {
  font-size: 0.9rem;
  line-height: 1.45;
  color: var(--text-color-muted);
  margin: 0 0 0.75rem 0;
}

.project-link {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--link-text);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

.project-link:hover {
  color: var(--link-text-hover);
  text-decoration: underline;
}

.link-icon {
  width: 14px;
  height: 14px;
}

/* Religion Section */
.religion-section {
  padding: 2.25rem;
  margin-top: 3rem;
  margin-bottom: 2rem;
}

.religion-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.25rem;
  margin-top: 1.5rem;
}

.rel-course-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: var(--background-lighter-variant);
  border: 1px solid var(--outline-color);
  border-radius: 12px;
  transition:
    transform 0.2s,
    border-color 0.2s;
}

.rel-course-card:hover {
  transform: translateY(-2px);
  border-color: var(--school-accent);
}

.rel-icon-container {
  width: 38px;
  height: 38px;
  background: var(--school-light);
  border: 1px solid var(--school-glow);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--school-primary);
  flex-shrink: 0;
}

.darkmode .rel-icon-container {
  color: var(--primary-lighter-variant);
}

.rel-icon {
  width: 18px;
  height: 18px;
}

.rel-course-details {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.rel-code {
  font-size: 0.82rem;
  font-weight: 800;
  color: var(--school-accent);
  text-transform: uppercase;
}

.rel-name {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-color);
  line-height: 1.35;
  margin-top: 0.1rem;
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
}
</style>
