import { createWebHistory, createRouter } from 'vue-router'
import { RouteName } from '../utils/RouteAttr'
import Home from '../views/HomeView.vue'
import About from '../views/AboutView.vue'
import WatchList from '../views/WatchListView.vue'
import Login from '../views/LoginView.vue'
import Logout from '../views/LogoutView.vue'
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
        path: '/logout',
        name: RouteName.LOGOUT,
        component: Logout,
    },
    {
        path: '/register',
        name: RouteName.REGISTER,
        component: Register,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    const isConnected = !!localStorage.getItem('userConnected')
    if (
        to.name !== RouteName.LOGIN &&
        to.name !== RouteName.REGISTER &&
        isConnected === false
    ) {
        if (from.name === RouteName.LOGIN) {
            next(false)
        } else {
            next({ name: RouteName.LOGIN } || { name: RouteName.REGISTER })
        }
    } else {
        next()
    }
})

export default router
