import axios from "axios";

enum Type {
  frontend = "frontend",
  computer = "computer",
  math = "math",
  okr = "okr",
}

const list = [
  {
    type: Type.frontend,
    name: "designPatterns",
    title: "设计模式",
  },
  // {
  //     type: Type.frontend,
  //     name: 'jointjs',
  //     title: 'jointjs使用说明'
  // },
  // {
  //     type: Type.computer,
  //     name: 'md-demo',
  //     title: 'md使用说明'
  // },
  // {
  //     type: Type.frontend,
  //     name: 'user-info',
  //     title: '用户数据收集与分析'
  // },
  // {
  //     type: Type.computer,
  //     name: 'ocaml',
  //     title: 'ocaml使用说明'
  // },
  // {
  //     type: Type.okr,
  //     name: 'okr',
  //     title: '个人季度okr'
  // }
];

const apis = {
  async getDetail({ name }: any) {
    return axios.get(`../../articles/${name}.md`);
  },
  async getList(params: any) {
    return new Promise((resolve) => {
      resolve(list.filter(({ type }) => type === params.type));
    });
  },
};

export { apis };
