import Vue from 'vue'
import VueRouter from 'vue-router'
import {store} from "../store";

const RegisterView = require('../components/RegisterView.vue').default
const LoginView = require('../components/LoginView.vue').default
const HomeView = require('../components/HomeView.vue').default

const ifNotAuthenticated = (to, from, next) => {
    if (!store.getters.isAuth) {
        next()
        return
    }
    next('/')
}

const ifAuthenticated = (to, from, next) => {
    if (store.getters.isAuth) {
        next()
        return
    }
    next('/login')
}

Vue.use(VueRouter)

const routes = [
    {
        path: '/register',
        component: RegisterView,
        meta: {title: 'Регистрация'}
    },
    {
        path: '/login',
        component: LoginView,
        meta: {title: 'Авторизация'}
    },
    {
        path: '/home',
        component: HomeView,
        meta: {title: 'Гостевая книга'}
    },
    {
        path: '*',
        redirect: '/login'
    }
]

export function createRouter() {
    const router = new VueRouter({
        routes
    })
    router.beforeEach((to, from, next) => {
        document.title = to.meta.title
        next()
    })
    return router
}

