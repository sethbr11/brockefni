<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Brockefni',
  meta: [
    {
      name: 'description',
      content:
        "Seth Brock offers professional freelance web development, design, and consulting services tailored to your needs. Discover innovative solutions for your projects and explore Seth Brock's portfolio showcasing past work and achievements.",
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico',
    },
  ],
})
</script>

<style>
:root {
  --primary-color: #d87628;
  --primary-variant: #bf6922;
  --primary-darker-variant: #ad5e1d;
  --secondary-color: #2c3e50;
  --secondary-variant: #23303e;
  --secondary-lighter-variant: #294563;
  --secondary-darker-variant: #1a334c;
  --background-color: #f4f4f4;
  --background-variant: white;
  --background-lighter-variant: #f2f2f2;
  --background-darker-variant: #dcdcdc;
  --outline-color: #e5e7eb;
  --text-color: #2c3e50;
  --text-color-muted: #666;
  --secondary-text-color: #6b7280;
  --shadow: rgba(0, 0, 0, 0.1);
  --heavy-shadow: rgba(0, 0, 0, 0.12);
  --link-text: #6366f1;
  --link-text-hover: #4f46e5;
}

body {
  margin: 0;
  padding: 0;
}

.darkmode {
  --background-color: var(--secondary-color);
  --background-variant: var(--secondary-variant);
  --background-lighter-variant: var(--secondary-lighter-variant);
  --background-darker-variant: var(--secondary-darker-variant);
  --outline-color: #56626f;
  --text-color: white;
  --text-color-muted: rgb(215, 215, 215);
  --secondary-text-color: #e2e2e2;
  --shadow: rgba(169, 175, 227, 0.427);
  --heavy-shadow: rgba(169, 175, 227, 0.45);
  --link-text: #7a7cff;
  --link-text-hover: #a09bff;
}

#__nuxt {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: var(--background-color);
  color: var(--text-color);
  min-height: 100vh;
}
</style>
