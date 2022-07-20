import App from './App.vue'
import * as Vue from 'vue' // in Vue 3
import axios from 'axios'
import VueAxios from 'vue-axios'
const app = Vue.createApp(App)
app.provide('axios', app.config.globalProperties.axios)
app.use(VueAxios, axios)
app.mount('#app')
