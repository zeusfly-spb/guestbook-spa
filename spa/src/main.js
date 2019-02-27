window.Cookies = require('js-cookie')
require('dotenv').load()

import Vue from 'vue'
import App from './App.vue'

import 'es6-promise/auto'; // for ancient browsers
import {store} from './store'

import {createRouter} from './router'
const router = createRouter()

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
Vue.axios.defaults.headers.common['Accept'] = 'application/json'
Vue.axios.defaults.baseURL = process.env.VUE_APP_BASE_URL
Vue.config.productionTip = false

Vue.axios.interceptors.response.use(
    response => {
        return response;
    },
    function(error) {
        if (error.response.status === 401) {
            router.replace('/login');
        }
        return Promise.reject(error.response);
    }
)

const token = Cookies.get('passport-token')
     if (token) {
         Vue.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
         store.dispatch('setAuthUser')
             .then(() => router.push('/home'))
     } else {
         store.dispatch('logOut')
             .then(() => router.push('/login'))
     }

new Vue({
    router,
    store,
  render: h => h(App),
}).$mount('#app')
