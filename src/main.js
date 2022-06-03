import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import Vue from 'vue'

import axios from 'axios'

// Vue.prototype.$http=axios

axios.defaults.baseURL='http://localhost:8000/'



createApp(App).use(router).use(router).mount('#app')
