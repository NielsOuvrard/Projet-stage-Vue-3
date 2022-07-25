import { createWebHistory, createRouter } from 'vue-router'
import Home from '../views/HomeView.vue'
import About from '../views/AboutView.vue'
import WatchList from '../views/WatchListView.vue'
import Login from '../views/LoginView.vue'
import Register from '../views/RegisterView.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/about',
        name: 'About',
        component: About,
    },
    {
        path: '/watchlist',
        name: 'WatchList',
        component: WatchList,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
