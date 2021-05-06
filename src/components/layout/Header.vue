<template>
  <div class="custom-wrapper pure-g" id="menu">
    <div class="pure-u-1-4">
      <div class="pure-menu">
        <a @click="goHeader" class="pure-menu-heading brand">Blogs</a>
      </div>
    </div>
    <div class="pure-u-3-4">
      <div class="pure-menu pure-menu-horizontal custom-can-transform">
        <ul class="pure-menu-list">
          <li @click="goList('frontend')" class="pure-menu-item">
            <a class="pure-menu-link">前端</a>
          </li>
          <li @click="goList('computer')" class="pure-menu-item">
            <a class="pure-menu-link">计算机</a>
          </li>
          <li @click="goList('math')" class="pure-menu-item">
            <a class="pure-menu-link">数学</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  methods: {
    goHeader() {
      this.$router.push({
        name: "home-page",
      });
    },
    goList(type: string) {
      this.$router.push({
        name: "list-page",
        params: {
          type,
        },
      });
    },
  },
});
</script>

<style lang="scss" scoped>
.custom-wrapper {
  background-color: #f7b267;
  margin-bottom: 1em;
  -webkit-font-smoothing: antialiased;
  height: 2.1em;
  -webkit-transition: height 0.5s;
  -moz-transition: height 0.5s;
  -ms-transition: height 0.5s;
  transition: height 0.5s;
  .brand {
    cursor: pointer;
  }
  .pure-menu-list {
    .pure-menu-item {
      cursor: pointer;
    }
  }
}

.custom-toggle .bar {
  background-color: #777;
  display: block;
  width: 20px;
  height: 2px;
  border-radius: 100px;
  position: absolute;
  top: 18px;
  right: 7px;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  -ms-transition: all 0.5s;
  transition: all 0.5s;
}
</style>