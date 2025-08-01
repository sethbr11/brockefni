<template>
  <DefaultHeader />
  <slot />
  <DefaultFooter />
</template>

<script lang="ts">
import DefaultHeader from "../components/Layout/DefaultHeader.vue";
import DefaultFooter from "../components/Layout/DefaultFooter.vue";

export default {
  components: {
    DefaultHeader,
    DefaultFooter,
  },
};
</script>
