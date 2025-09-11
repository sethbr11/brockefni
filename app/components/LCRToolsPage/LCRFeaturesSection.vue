<template>
  <div class="lcr-features">
    <div class="features-container">
      <div class="section-header">
        <h2 class="section-title">Powerful Features</h2>
        <p class="section-subtitle">
          Streamline your LCR workflow with these essential tools
        </p>
      </div>

      <div class="features-grid">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="feature-card"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="feature-icon">
            <img :src="feature.icon" :alt="feature.title" />
          </div>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-description">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import wand from '@/assets/icons/wand.png'
import pencil from '@/assets/icons/pencil.png'
import camera from '@/assets/icons/camera.png'
import upload from '@/assets/icons/upload.png'
import exportIcon from '@/assets/icons/export.png'
import loading from '@/assets/icons/loading.png'

export default defineComponent({
  name: 'LCRFeaturesSection',
  setup() {
    const features = [
      {
        title: 'Context-Aware Actions',
        description:
          "The extension icon displays a menu with actions relevant to the current LCR page you're viewing.",
        icon: wand,
      },
      {
        title: 'Optimized Profile Editing',
        description:
          'Quickly enter edit mode on member profiles with an option to remove performance-impacting elements.',
        icon: pencil,
      },
      {
        title: 'Photo Management',
        description:
          'Export a list of names for individuals who do not have a photo in LCR for easy identification.',
        icon: camera,
      },
      {
        title: 'Attendance Input',
        description:
          'Injects a UI onto the LCR attendance page for selecting a date and uploading a CSV of attendees.',
        icon: upload,
      },
      {
        title: 'Report Data Export',
        description:
          'Download data from various LCR reports directly into a CSV file for external analysis.',
        icon: exportIcon,
      },
      {
        title: 'Loading Indicators',
        description:
          'Visual feedback for long-running operations so you know when processes are working.',
        icon: loading,
      },
    ]

    return {
      features,
    }
  },
})
</script>

<style scoped>
.lcr-features {
  padding: 5rem 1rem;
  background: var(--background-color);
}

.features-container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-color);
  margin: 0 0 1rem 0;
}

.section-subtitle {
  font-size: 1.2rem;
  color: var(--secondary-text-color);
  margin: 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: var(--background-variant);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  border: 1px solid var(--outline-color);
  box-shadow: 0 4px 16px var(--shadow);
  transition: all 0.3s ease;
  animation: fadeInUp 0.6s ease-out both;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 32px var(--heavy-shadow);
}

.feature-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 1.5rem;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.3);
}

.feature-icon img {
  width: 32px;
  height: 32px;
  object-fit: contain;
  filter: brightness(0) invert(1);
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-color);
  margin: 0 0 1rem 0;
}

.feature-description {
  color: var(--secondary-text-color);
  line-height: 1.6;
  margin: 0;
  font-size: 0.95rem;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .lcr-features {
    padding: 3rem 1rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .feature-card {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 1.75rem;
  }

  .section-subtitle {
    font-size: 1rem;
  }

  .feature-card {
    padding: 1.25rem;
  }

  .feature-icon {
    width: 56px;
    height: 56px;
  }

  .feature-icon img {
    width: 28px;
    height: 28px;
  }
}
</style>
