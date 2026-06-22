<template>
  <div class="ai-projects-page">
    <SharedScrollProgress color1="#ffc837" color2="#ff8008" />
    
    <SharedHeroSection 
      label="AI & Deep Learning"
      title="Building the "
      highlightText="Future."
      themeColor="#ff8008"
    >
      <template #background-animation>
        <div class="neural-network">
          <div v-for="n in 30" :key="n" class="node" :style="nodeStyle(n)"></div>
          <svg class="connections" width="100%" height="100%">
            <line x1="10%" y1="20%" x2="40%" y2="50%" stroke="rgba(255, 128, 8, 0.2)" stroke-width="2" />
            <line x1="40%" y1="50%" x2="80%" y2="30%" stroke="rgba(255, 128, 8, 0.2)" stroke-width="2" />
            <line x1="80%" y1="30%" x2="60%" y2="80%" stroke="rgba(255, 128, 8, 0.2)" stroke-width="2" />
            <line x1="60%" y1="80%" x2="20%" y2="60%" stroke="rgba(255, 128, 8, 0.2)" stroke-width="2" />
            <line x1="20%" y1="60%" x2="10%" y2="20%" stroke="rgba(255, 128, 8, 0.2)" stroke-width="2" />
          </svg>
        </div>
      </template>
      <template #subtitle>
        A collection of custom PyTorch models, fine-tuned transformers, and deep learning architectures built from the ground up for <strong>Natural Language Processing</strong> and <strong>Computer Vision</strong>.
      </template>
    </SharedHeroSection>

    <main class="page-content">

      <!-- ═══════════ 1. TRANSFORMER ═══════════ -->
      <SharedProjectSection 
        title="Sequence-to-Sequence Transformer" 
        subtitle="PyTorch Custom Architecture"
        themeColor="#ff8008"
        :features="[
          'Built completely from scratch using standard PyTorch nn.Module',
          'Implements full Multi-Head Attention mechanisms',
          'Positional Encoding layer for sequence awareness',
          'Trained for language translation tasks'
        ]"
      >
        <template #visual>
          <TransformerDiagram />
        </template>
        <template #description>
          This project was an educational deep-dive into the &quot;Attention Is All You Need&quot; architecture. Instead of using pre-built library models, this implements the core encoder-decoder transformer blocks, multi-head attention, and masking entirely from the ground up in PyTorch.
        </template>
        <template #actions>
          <a href="https://github.com/sethbr11/PyTorch-Transformer" target="_blank" class="btn btn-primary">GitHub Repository</a>
          <a href="https://arxiv.org/abs/1706.03762" target="_blank" class="btn btn-secondary">Read Paper</a>
        </template>
      </SharedProjectSection>

      <!-- ═══════════ 2. VISION TRANSFORMER ═══════════ -->
      <SharedProjectSection 
        title="Vision Transformer (ViT)" 
        subtitle="Computer Vision"
        themeColor="#ff8008"
        :reverse="true"
        :features="[
          'Custom patch embedding layers',
          'Self-attention for image classification',
          'Improved baseline accuracy from 10% to 80%+',
          'Built for academic research in IS Masters program'
        ]"
      >
        <template #visual>
          <VitDiagram />
        </template>
        <template #description>
          Adapting transformer architecture for images. This project breaks down images into patches, linearly embeds them, and feeds them into a standard transformer encoder, demonstrating how sequence models can perform state-of-the-art computer vision tasks without standard Convolutional Neural Networks (CNNs).
        </template>
        <template #actions>
          <a href="https://github.com/sethbr11/PyTorch-ImgClassification" target="_blank" class="btn btn-primary">GitHub Repository</a>
          <a href="https://arxiv.org/abs/2010.11929" target="_blank" class="btn btn-secondary">Read Paper</a>
        </template>
      </SharedProjectSection>

      <!-- ═══════════ 3. T5 BIBLE STYLING ═══════════ -->
      <SharedProjectSection 
        title="T5 Text Styling Model" 
        subtitle="Hugging Face Fine-Tuning"
        themeColor="#ff8008"
        :features="[
          'Fine-tuned Google T5 (Text-to-Text Transfer Transformer)',
          'Translates modern English into KJV-style prose',
          'Utilizes Hugging Face transformers pipeline',
          'Deployed inside Jupyter Notebooks for testing'
        ]"
      >
        <template #visual>
          <T5Diagram />
        </template>
        <template #description>
          Using transfer learning, I took a pre-trained T5 model and fine-tuned it on a parallel corpus of modern English and King James Version text. The resulting model can take standard sentences and re-style them with biblical vocabulary and sentence structure.
        </template>
        <template #actions>
          <a href="https://github.com/sethbr11/t5-bible-styling" target="_blank" class="btn btn-primary">GitHub Repository</a>
          <a href="https://arxiv.org/abs/1910.10683" target="_blank" class="btn btn-secondary">Read Paper</a>
        </template>
      </SharedProjectSection>

      <!-- ═══════════ 4. DIFFUSION / U-NET ═══════════ -->
      <SharedProjectSection 
        title="Diffusion Generative Models" 
        subtitle="Latent Space Generation"
        themeColor="#ff8008"
        :reverse="true"
        :features="[
          'Built a from-scratch U-Net architecture',
          'Experiments with Hugging Face UNet2DModel',
          'VAE-based latent space processing',
          'Forward noise addition and reverse denoising loops'
        ]"
      >
        <template #visual>
          <UNetDiagram />
        </template>
        <template #description>
          An exploration into generative AI. This project covers the mathematics and implementation of diffusion models, starting from adding Gaussian noise to an image and training a U-Net to predict and subtract that noise, eventually creating novel images from pure noise.
        </template>
        <template #actions>
          <a href="https://github.com/sethbr11/DiffusionModel" target="_blank" class="btn btn-primary">GitHub Repository</a>
          <a href="https://arxiv.org/abs/2006.11239" target="_blank" class="btn btn-secondary">Read Paper</a>
        </template>
      </SharedProjectSection>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useHead, useSeoMeta } from '#app'
import SharedHeroSection from '@/components/SharedProject/SharedHeroSection.vue'
import SharedScrollProgress from '@/components/SharedProject/SharedScrollProgress.vue'
import SharedProjectSection from '@/components/SharedProject/SharedProjectSection.vue'
import TransformerDiagram from '@/components/AiProjectsPage/TransformerDiagram.vue'
import VitDiagram from '@/components/AiProjectsPage/VitDiagram.vue'
import T5Diagram from '@/components/AiProjectsPage/T5Diagram.vue'
import UNetDiagram from '@/components/AiProjectsPage/UNetDiagram.vue'

export default defineComponent({
  name: 'AiProjectsPage',
  components: {
    SharedHeroSection,
    SharedScrollProgress,
    SharedProjectSection,
    TransformerDiagram,
    VitDiagram,
    T5Diagram,
    UNetDiagram
  },
  setup() {
    // Rich SEO Meta Tags for Search Engines & Social Media Previewing
    useHead({
      title: 'AI & Deep Learning Projects | Seth Brock Portfolio',
      link: [
        { rel: 'canonical', href: 'https://brockefni.com/ai-projects' }
      ]
    })

    useSeoMeta({
      title: 'AI & Deep Learning Projects | Seth Brock Portfolio',
      ogTitle: 'AI & Deep Learning Projects | Seth Brock Portfolio',
      description: 'Explore custom PyTorch transformers, fine-tuned NLP models, and computer vision architectures built by Seth Brock.',
      ogDescription: 'Explore custom PyTorch transformers, fine-tuned NLP models, and computer vision architectures built by Seth Brock.',
      ogType: 'website',
      ogUrl: 'https://brockefni.com/ai-projects',
      twitterCard: 'summary_large_image',
      twitterTitle: 'AI & Deep Learning Projects | Seth Brock Portfolio',
      twitterDescription: 'Explore custom PyTorch transformers, fine-tuned NLP models, and computer vision architectures built by Seth Brock.'
    })

    const nodeStyle = (n: number) => {
      const top = Math.random() * 100
      const left = Math.random() * 100
      const delay = Math.random() * 2
      const size = 4 + Math.random() * 8
      return {
        top: `${top}%`,
        left: `${left}%`,
        width: `${size}px`,
        height: `${size}px`,
        animationDelay: `${delay}s`
      }
    }

    return { nodeStyle }
  }
})
</script>

<style scoped>
.ai-projects-page {
  background: var(--background-color);
  min-height: 100vh;
  border: none !important;
  outline: none !important;
}

/* Hero */
.neural-network {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.4;
}

.node {
  position: absolute;
  background: #ff8008;
  border-radius: 50%;
  box-shadow: 0 0 10px #ff8008;
  animation: pulse 2s infinite alternate;
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 0.5; }
  100% { transform: scale(1.5); opacity: 1; }
}

.connections {
  position: absolute;
  top: 0;
  left: 0;
}

/* Buttons */
.btn {
  display: inline-block;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
  text-align: center;
}

.btn-primary {
  background: #ff8008;
  color: #fff;
  border: 1px solid #ff8008;
}

.btn-primary:hover {
  background: #e06d00;
  transform: translateY(-2px);
}

.btn-secondary {
  background: transparent;
  color: var(--text-color);
  border: 2px solid var(--outline-color);
}

.btn-secondary:hover {
  border-color: #ff8008;
  color: #ff8008;
  transform: translateY(-2px);
}
</style>
