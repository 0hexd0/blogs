import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "Components/layout/index.vue";
import Home from "Pages/Home.vue";
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