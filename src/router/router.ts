import { createWebHistory, createRouter } from 'vue-router'
import { RouteName } from '../utils/RouteAttr'
import Home from '../views/HomeView.vue'
import About from '../views/AboutView.vue'
import WatchList from '../views/WatchListView.vue'
import Login from '../views/LoginView.vue'
import Register from '../views/RegisterView.vue'

const routes = [
    {
        path: '/',
        name: RouteName.HOME,
        component: Home,
    },
    {
        path: '/about',
        name: RouteName.ABOUT,
        component: About,
    },
    {
        path: '/watchlist',
        name: RouteName.WATCH_LIST,
        component: WatchList,
    },
    {
        path: '/login',
        name: RouteName.LOGIN,
        component: Login,
    },
    {
        path: '/register',
        name: RouteName.REGISTER,
        component: Register,
    },
    {
        path: '/movie/:id',
        name: RouteName.MOVIE,
        component: () => import('../views/InfosMovie.vue'),
    },
    {
        path: '/actor/:id',
        name: RouteName.ACTOR,
        component: () => import('../views/InfosActor.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
