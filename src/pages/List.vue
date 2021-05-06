<template>
  <div class="pure-g">
    <div class="pure-u-1-8"></div>
    <div class="pure-u-3-4">
      <ul>
        <li @click="goDetail(item)" v-for="(item, idx) in list" :key="idx">
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div class="pure-u-1-8"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { apis } from "Apis/index";

export default defineComponent({
  data() {
    return {
      list: [],
    };
  },
  methods: {
    goDetail({ name }: any) {
      this.$router.push({
        name: "detail-page",
        params: {
          name: name,
        },
      });
    },
    async loadList(type: string) {
      this.list = (await apis.getList({ type })) as any;
    },
  },
  mounted() {
    this.loadList(this.type as string);
  },
  computed: {
    type() {
      return this.$route.params.type;
    },
  },
  watch: {
    type(newType: string, oldType) {
      this.loadList(newType);
    },
  },
});
</script>

<style lang="scss" scoped>
ul {
  li {
    margin: 20px 0;
    cursor: pointer;
    color: #777;
    list-style: none;
    font-size: 18px;
    &:hover {
      color: #f7b267;
    }
  }
}
</style>