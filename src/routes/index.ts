import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "Components/layout/index.vue";
import Home from "Pages/Home.vue";
import List from "Pages/List.vue";
import Detail from "Pages/Detail.vue";

const routes = [
    {
        path: '/',
        component: Layout,
        children: [
            {
                name: 'home-page',
                path: 'home',
                component: Home,
            },
            {
                name: 'list-page',
                path: 'list/:type',
                component: List,
            },
            {
                name: 'detail-page',
                path: 'detail/:name',
                component: Detail,
            },
        ],
        redirect: { name: 'home-page' }
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export { router };