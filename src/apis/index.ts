import axios from "axios";

const apis = {
    async getDetail({ name }: any) {
        return axios.get(`../../articles/${name}.md`);
    }
}

export { apis }