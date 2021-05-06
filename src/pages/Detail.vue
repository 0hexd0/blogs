<template>
  <div class="pure-g">
    <div class="pure-u-1-6"></div>
    <div class="pure-u-5-6">
      <div v-html="content"></div>
    </div>
    <div class="pure-u-1-6"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { apis } from "Apis/index";
import marked from "marked";

export default defineComponent({
  components: {},
  data() {
    return {
      content: "",
    };
  },
  methods: {
    async loadData(name = "") {
      const res = await apis.getDetail({ name });
      const { data } = res as any;
      this.content = marked(data);
    },
  },
  mounted() {
    this.loadData(this.$route.params?.name as string);
  },
});
</script>

<style lang="scss" scoped>
</style>