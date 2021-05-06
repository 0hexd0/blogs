<template>
  <div class="pure-g">
    <div class="pure-u-1-8"></div>
    <div class="pure-u-3-4">
      <div v-html="content"></div>
    </div>
    <div class="pure-u-1-8"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { apis } from "Apis/index";
import marked from "marked";
import hljs from "highlight.js";

// Set options
// `highlight` example uses `highlight.js`
marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function (code: string, lang: string, callback: any) {
    return hljs.highlight(lang, code).value;
  },
  langPrefix: "hljs ",
  pedantic: false,
  gfm: true,
  tables: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
});

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