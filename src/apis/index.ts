import axios from "axios";

enum Type {
    frontend = 'frontend',
    computer = 'computer',
    math = 'math'
}

const list = [
    {
        type: Type.frontend,
        name: 'item1',
        title: 'item1'
    },
    {
        type: Type.computer,
        name: 'item2',
        title: 'item2'
    },
    {
        type: Type.math,
        name: 'item3'
    },
    {
        type: Type.frontend,
        name: 'item4',
        title: 'item4'
    },
    {
        type: Type.frontend,
        name: 'user-info',
        title: '用户数据收集与分析'
    }
];

const apis = {
    async getDetail({ name }: any) {
        return axios.get(`../../articles/${name}.md`);
    },
    async getList(params: any) {
        return new Promise((resolve) => {
            resolve(list.filter(({ type }) => type === params.type));
        })
    }
}

export { apis }