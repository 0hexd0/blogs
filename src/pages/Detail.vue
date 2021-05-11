<template>
  <div class="pure-g">
    <div class="pure-u-1-8"></div>
    <div class="pure-u-3-4">
      <div id="md-content" v-html="content"></div>
    </div>
    <div class="pure-u-1-8"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { apis } from "Apis/index";
import marked from "marked";
import hljs from "highlight.js";
import katex from "katex";

// Set options
// `highlight` example uses `highlight.js`
marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function (code: string, lang: string, callback: any) {
    return hljs.highlight(code, { language: lang }).value;
  },
  langPrefix: "hljs ",
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
});

// Override function
const tokenizer = {
  inlineText(src: string, inRawBlock: boolean, smartypants: any) {
    // const match = src.match(/\$\$([^\$\n]+?)\$\$/);
    const mathMatch = src.match(/\$\$([^\$\n]+?)\$\$/);
    if (mathMatch && src.includes("$$")) {
      console.log("inRawBlock", inRawBlock);
      console.log("mathMatch[0]", mathMatch[0].trim());
      return {
        type: "text",
        raw: mathMatch[0],
        text: katex.renderToString(mathMatch[1].trim()),
      };
    }
    // return false to use original codespan tokenizer
    return false;
  },
} as any;

marked.use({ tokenizer });

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

<style lang="scss">
@import url("./markdown.scss");
</style>