<template>
  <Header></Header>
  <router-view></router-view>
  <Footer></Footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "Components/layout/Header.vue";
import Footer from "Components/layout/Footer.vue";

export default defineComponent({
  components: {
    Header,
    Footer,
  },
});
</script>

<style>
</style>