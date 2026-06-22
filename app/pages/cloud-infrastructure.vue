<template>
  <div class="cloud-page">
    <SharedScrollProgress color1="#844fba" color2="#ff9900" />

    <SharedHeroSection
      label="Cloud & DevOps"
      title="Architecting the "
      highlightText="Cloud."
      themeColor="#844fba"
    >
      <template #background-animation>
        <div class="cloud-background">
          <div
            v-for="n in 20"
            :key="n"
            class="data-stream"
            :style="streamStyle(n)"
          ></div>
          <svg class="cloud-grid" width="100%" height="100%">
            <defs>
              <pattern
                id="cloud-pattern"
                width="80"
                height="80"
                patternUnits="userSpaceOnUse"
              >
                <circle
                  cx="40"
                  cy="40"
                  r="1.5"
                  fill="rgba(132, 79, 186, 0.15)"
                />
                <path
                  d="M 80 0 L 0 0 0 80"
                  fill="none"
                  stroke="rgba(132, 79, 186, 0.02)"
                  stroke-width="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cloud-pattern)" />
          </svg>
        </div>
      </template>
      <template #subtitle>
        Production-ready architectures designed with
        <strong>Infrastructure as Code (IaC)</strong>. Leveraging
        <strong>AWS CDK</strong> and <strong>Terraform</strong> to deploy highly
        available, serverless, and containerized environments.
      </template>
    </SharedHeroSection>

    <main class="page-content">
      <!-- ═══════════ 1. AWS CDK SERVERLESS APP ═══════════ -->
      <SharedProjectSection
        title="Serverless AWS CDK App"
        subtitle="C# Infrastructure as Code"
        themeColor="#844fba"
        :features="[
          'AWS CDK deployment stacks written in C# (.NET)',
          'Automated CodePipeline with Source, Build, and Deploy stages',
          'API Gateway routing requests to Node.js Lambda functions',
          'CloudFront CDN edge-caching static assets hosted on S3',
          'Fully automated DynamoDB database provisioning',
        ]"
      >
        <template #visual>
          <CdkDiagram />
        </template>
        <template #description>
          A serverless web application architecture designed and deployed
          entirely with C# using the AWS Cloud Development Kit (CDK). This
          blueprint splits static frontend hosting from compute backend
          services, integrating S3 and CloudFront caching with an API Gateway
          routing requests to Node.js backend Lambdas that interface with
          DynamoDB, all built and deployed via an automated AWS CodePipeline.
        </template>
        <template #actions>
          <a
            href="https://github.com/sethbr11/CdkExample"
            target="_blank"
            class="btn btn-primary"
            >CDK Infrastructure Repo</a
          >
          <a
            href="https://github.com/sethbr11/sample-site"
            target="_blank"
            class="btn btn-secondary"
            >Vue Frontend Repo</a
          >
        </template>
      </SharedProjectSection>

      <!-- ═══════════ 2. TERRAFORM DOCKER ECS APP ═══════════ -->
      <SharedProjectSection
        title="ECS Fargate Orchestration"
        subtitle="Multi-Stage Terraform Provisioning"
        themeColor="#844fba"
        :reverse="true"
        :features="[
          'Modular Terraform templates splitting ECR, Fargate, Networking, and RDS',
          'Provisioned multi-AZ VPC with public and isolated private subnets',
          'ECS Fargate serverless container orchestration running .NET tasks',
          'Secure relational database configuration deploying Amazon RDS MySQL',
          'Application Load Balancer (ALB) routing to secure target groups',
        ]"
      >
        <template #visual>
          <TerraformDiagram />
        </template>
        <template #description>
          A multi-stage infrastructure-as-code configuration using Terraform to
          provision a secure, highly available environment on AWS. It builds a
          public-private network topology, sets up an AWS ECR registry for
          custom Dockerized .NET application images, runs container tasks
          serverlessly under ECS Fargate, and deploys an isolated Amazon RDS
          MySQL database instance, all coordinated with bash deployment scripts.
        </template>
        <template #actions>
          <a
            href="https://github.com/sethbr11/dotnet-serverless-example"
            target="_blank"
            class="btn btn-primary"
            >Terraform Repo</a
          >
          <a
            href="https://github.com/sethbr11/pdcdonuts"
            target="_blank"
            class="btn btn-secondary"
            >Web App Repo</a
          >
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
import CdkDiagram from '@/components/CloudInfrastructurePage/CdkDiagram.vue'
import TerraformDiagram from '@/components/CloudInfrastructurePage/TerraformDiagram.vue'

export default defineComponent({
  name: 'CloudInfrastructurePage',
  components: {
    SharedHeroSection,
    SharedScrollProgress,
    SharedProjectSection,
    CdkDiagram,
    TerraformDiagram,
  },
  setup() {
    useHead({
      title: 'Cloud Infrastructure & DevOps | Seth Brock Portfolio',
      link: [
        {
          rel: 'canonical',
          href: 'https://brockefni.com/cloud-infrastructure',
        },
      ],
    })

    useSeoMeta({
      title: 'Cloud Infrastructure & DevOps | Seth Brock Portfolio',
      ogTitle: 'Cloud Infrastructure & DevOps | Seth Brock Portfolio',
      description:
        'Explore serverless architectures, AWS CDK, and automated container orchestration with Terraform built by Seth Brock.',
      ogDescription:
        'Explore serverless architectures, AWS CDK, and automated container orchestration with Terraform built by Seth Brock.',
      ogType: 'website',
      ogUrl: 'https://brockefni.com/cloud-infrastructure',
      twitterCard: 'summary_large_image',
      twitterTitle: 'Cloud Infrastructure & DevOps | Seth Brock Portfolio',
      twitterDescription:
        'Explore serverless architectures, AWS CDK, and automated container orchestration with Terraform built by Seth Brock.',
    })

    const streamStyle = (n: number) => {
      const top = Math.random() * 100
      const duration = 15 + Math.random() * 20
      const delay = Math.random() * -20
      const opacity = 0.05 + Math.random() * 0.15
      const width = 50 + Math.random() * 150
      return {
        top: `${top}%`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        opacity: opacity,
        width: `${width}px`,
      }
    }

    return { streamStyle }
  },
})
</script>

<style scoped>
.cloud-page {
  background: var(--background-color);
  min-height: 100vh;
  border: none !important;
  outline: none !important;
}

.cloud-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  pointer-events: none;
}

.data-stream {
  position: absolute;
  left: -200px;
  height: 1.5px;
  background: linear-gradient(
    to right,
    transparent,
    #844fba,
    #ff9900,
    transparent
  );
  animation: streamMove 20s infinite linear;
}

.cloud-grid {
  position: absolute;
  top: 0;
  left: 0;
}

@keyframes streamMove {
  0% {
    left: -200px;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    left: 100%;
    opacity: 0;
  }
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
  background: #844fba;
  color: #fff;
  border: 1px solid #844fba;
}

.btn-primary:hover {
  background: #6a3a9b;
  transform: translateY(-2px);
}

.btn-secondary {
  background: transparent;
  color: var(--text-color);
  border: 2px solid var(--outline-color);
}

.btn-secondary:hover {
  border-color: #844fba;
  color: #844fba;
  transform: translateY(-2px);
}
</style>
