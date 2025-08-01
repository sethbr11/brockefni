<template>
  <section class="featured">
    <h1>PORTFOLIO PROJECTS</h1>
    <CardList :cards="cardData" :columns="4" />
  </section>
</template>

<script lang="ts">
import CardList from "../components/ProjectsPage/CardList.vue";
import cardData from "../assets/data/cardData";

export default {
  components: {
    CardList,
  },
  data() {
    return {
      cardData: cardData,
    };
  },
};
</script>

<style scoped></style>
