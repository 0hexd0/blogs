<template>
  <div class="pure-g">
    <div class="pure-u-1-8"></div>
    <div class="pure-u-3-4">
      <ul>
        <li @click="goDetail" v-for="idx in 10" :key="idx">1</li>
      </ul>
    </div>
    <div class="pure-u-1-8"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  methods: {
    goDetail() {
      this.$router.push({
        name: "detail-page",
        params: {
          name: "demo",
        },
      });
    },
  },
});
</script>

<style>
</style>