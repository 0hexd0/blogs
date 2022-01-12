<template>
  <div class="pure-g">
    <div class="pure-u-1-8"></div>
    <div class="pure-u-1-2">
      <div id="md-content" v-html="content"></div>
    </div>
    <div class="pure-u-3-8">
      目录
      <div v-for="item in headList">
        <a :href="'#' + item.anchor" class="anchor-fix">
          {{ item.text }}
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { apis } from "Apis/index";
import { marked } from "marked";
import katex from "katex";

// Set options
// `highlight` example uses `highlight.js`
const renderer = new marked.Renderer();

const headList: any[] = [];
renderer.heading = function (text, level, raw) {
  const anchor = headList.push({ text, level, anchor: 0 });
  headList[headList.length - 1].anchor = anchor;
  // return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  return `<h${level} id="${anchor}">${text}</h${level}>`;
};

marked.setOptions({
  renderer,
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
      headList,
    };
  },
  methods: {
    async loadData(name = "") {
      const res = await apis.getDetail({ name });
      const { data } = res as any;
      this.content = marked(data);
      console.log(headList);
    },
  },
  mounted() {
    this.loadData(this.$route.params?.name as string);
  },
  watch: {
    "$route.params.name"(val: string) {
      this.loadData(val);
    },
  },
});
</script>

<style lang="scss">
@import url("./markdown.scss");
</style>
