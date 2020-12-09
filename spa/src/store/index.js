const Cookies = require('js-cookie')
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        baseUrl: null,
        authUser: null,
        status: null,
        token: null
    },
    actions: {
        logOut ({commit}) {
            commit('AUTH_LOGOUT')
        },
        logIn ({commit, dispatch}, query) {
            return new Promise ((resolve, reject) => {
                commit('SET_STATUS', 'request')
                Vue.axios.post('/api/login', {email: query.email, password: query.password})
                    .then(res => {
                        let token = res.data.success.token
                        commit('SAVE_TOKEN', token)
                        dispatch('setAuthUser')
                        resolve (res)
                    })
                    .catch(e => {
                        commit('AUTH_LOGOUT')
                        reject (e)
                    })
            })
        },
        setAuthUser ({commit}) {
            Vue.axios.post('/api/details')
                .then(res => commit('SET_AUTH_USER', res.data.success))
                .catch(() => commit('AUTH_LOGOUT'))
        }
    },
    mutations: {
        SET_BASE_URL (state, url) {
            state.baseUrl = url
        },
        SAVE_TOKEN (state, token) {
            let now = new Date()
            now.setMinutes(1 + now.getMinutes())
            Cookies.set('passport-token', token, {expires: now, path: '/'})
            setInterval(() => {
                let now = new Date()
                now.setMinutes(1 + now.getMinutes())
                Cookies.set('passport-token', token, {expires: now, path: '/'})
            }, 30000)
            Vue.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
            state.token = token
        },
        SET_STATUS (state, status) {
            state.status = status
        },
        AUTH_LOGOUT (state) {
            Cookies.remove('passport-token')
            delete Vue.axios.defaults.headers.common['Authorization']
            state.authUser = null
            state.status = 'logout'
        },
        SET_AUTH_USER (state, user) {
            state.authUser = user
            state.status = 'success'
        }
    },
    getters: {
        isAuth: state => state.status === 'success',
        token: () => Cookies.get('passport-token') || null
    }
})