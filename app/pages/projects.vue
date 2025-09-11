<template>
  <section class="featured">
    <h1>PORTFOLIO PROJECTS</h1>
    <CardList :cards="cardData" :columns="4" project-card-mode />
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CardList from '../components/ProjectsPage/CardList.vue'
import cardData from '../assets/data/projectsCardData'
import { useHead } from '#app'

export default defineComponent({
  components: {
    CardList,
  },
  setup() {
    useHead({
      title: 'Projects',
      meta: [
        {
          name: 'description',
          content:
            'Explore Seth Brock’s portfolio of web development and design projects. Discover innovative solutions and creative designs tailored to meet diverse needs.',
        },
        {
          name: 'author',
          content: 'Seth Brock',
        },
        {
          name: 'keywords',
          content:
            'Seth Brock projects, web development portfolio, design portfolio, creative solutions',
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0',
        },
      ],
    })
  },
  data() {
    return {
      cardData: cardData,
    }
  },
})
</script>

<style scoped></style>
