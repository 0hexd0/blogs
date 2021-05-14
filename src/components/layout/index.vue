<template>
  <Header></Header>
  <section class="main">
    <router-view></router-view>
  </section>
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

<style lang="scss" scoped>
.main {
  min-height: calc(100vh - 118px - 3.1em);
}
</style>