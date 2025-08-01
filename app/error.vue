<script setup lang="ts">
import type { NuxtError } from "#app";
import { onMounted, ref } from "vue";
import FloatingShapes from "./components/LandingPage/FloatingShapes.vue";
import { generateFloatingShapes } from "./assets/scripts/shapeGenerator";
import type { FloatingShape } from "./assets/scripts/FloatingShape";

const props = defineProps({
  error: Object as () => NuxtError,
});

definePageMeta({
  layout: "default",
});

const floatingShapes = ref<FloatingShape[]>([]);
const errorRef = ref<HTMLElement | null>(null);

const getErrorMessage = () => {
  const status = props.error?.statusCode;
  switch (status) {
    case 404:
      return "Page Not Found";
    case 500:
      return "Internal Server Error";
    case 403:
      return "Access Forbidden";
    default:
      return "Something Went Wrong";
  }
};

const getErrorDescription = () => {
  const status = props.error?.statusCode;
  switch (status) {
    case 404:
      return "The page you're looking for seems to have wandered off into the digital void.";
    case 500:
      return "Our servers are having a moment. We're working to fix this issue.";
    case 403:
      return "You don't have permission to access this resource.";
    default:
      return "An unexpected error occurred. Let's get you back on track.";
  }
};

onMounted(() => {
  floatingShapes.value = generateFloatingShapes(15);

  setTimeout(() => {
    if (errorRef.value) {
      errorRef.value.classList.add("animate-in");
    }
  }, 100);
});
</script>

<template>
  <div class="error-page">
    <FloatingShapes :shapes="floatingShapes" />

    <div class="error-container" ref="errorRef">
      <div class="error-content">
        <div class="logo-container">
          <img
            src="@/assets/brockefni_logo.png"
            alt="Brockefni Logo"
            class="error-logo"
          />
        </div>

        <div class="error-code">
          {{ error?.statusCode || "ERROR" }}
        </div>

        <h1 class="error-title">
          {{ getErrorMessage() }}
        </h1>

        <p class="error-description">
          {{ getErrorDescription() }}
        </p>

        <div class="error-buttons">
          <NuxtLink to="/" class="btn btn-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9,22 9,12 15,12 15,22" />
            </svg>
            Go Home
          </NuxtLink>

          <button @click="$router.go(-1)" class="btn btn-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            Go Back
          </button>
        </div>

        <div class="error-details" v-if="error?.message">
          <details>
            <summary>Technical Details</summary>
            <pre>{{ error.message }}</pre>
          </details>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.error-page {
  min-height: calc(100vh - 90px);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: linear-gradient(
    135deg,
    var(--background-color) 0%,
    var(--background-variant) 100%
  );
  padding: 2rem;
  overflow: hidden; /* Ensure shapes don't cause scroll issues */
}

.error-container {
  max-width: 600px;
  width: 100%;
  text-align: center;
  position: relative;
  z-index: 10;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease;
}

.error-container.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.error-content {
  background: var(--background-variant);
  border-radius: 20px;
  padding: 3rem 2rem;
  box-shadow: 0 20px 60px var(--shadow);
  border: 1px solid var(--outline-color);
}

.logo-container {
  margin-bottom: 2rem;
}

.error-logo {
  width: 120px;
  height: auto;
  opacity: 0.8;
  animation: pulse 2s ease-in-out infinite;
}

.error-code {
  font-size: 6rem;
  font-weight: 900;
  color: var(--primary-color);
  line-height: 1;
  margin-bottom: 1rem;
  text-shadow: 0 4px 20px rgba(216, 118, 40, 0.3);
  animation: slideDown 0.8s ease 0.3s both;
}

.error-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 1rem;
  animation: slideDown 0.8s ease 0.5s both;
}

.error-description {
  font-size: 1.2rem;
  color: var(--text-color-muted);
  margin-bottom: 3rem;
  line-height: 1.6;
  animation: slideDown 0.8s ease 0.7s both;
}

.error-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;
  animation: slideUp 0.8s ease 0.9s both;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  min-width: 140px;
}

.btn-primary {
  background: linear-gradient(
    45deg,
    var(--primary-color),
    var(--primary-variant)
  );
  color: white;
  box-shadow: 0 4px 15px rgba(216, 118, 40, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(216, 118, 40, 0.4);
}

.btn-secondary {
  background: transparent;
  color: var(--text-color);
  border: 2px solid var(--outline-color);
}

.btn-secondary:hover {
  background: var(--text-color);
  color: var(--background-color);
  transform: translateY(-2px);
}

.error-details {
  animation: fadeIn 1s ease 1.1s both;
}

.error-details details {
  text-align: left;
  background: var(--background-color);
  border-radius: 10px;
  padding: 1rem;
  border: 1px solid var(--outline-color);
}

.error-details summary {
  cursor: pointer;
  font-weight: 600;
  color: var(--text-color-muted);
  margin-bottom: 0.5rem;
}

.error-details pre {
  color: var(--text-color);
  font-size: 0.9rem;
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-word;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.8;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .error-page {
    padding: 1rem;
    min-height: calc(100vh - 70px);
  }

  .error-content {
    padding: 2rem 1.5rem;
  }

  .error-code {
    font-size: 4rem;
  }

  .error-title {
    font-size: 2rem;
  }

  .error-description {
    font-size: 1.1rem;
  }

  .error-buttons {
    flex-direction: column;
    align-items: center;
  }

  .btn {
    width: 200px;
  }
}
</style>
