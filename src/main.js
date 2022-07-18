import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


// Sweet Alert
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import axios from 'axios'


// LINK URL
axios.defaults.baseURL='http://192.168.0.100/'
// axios.defaults.baseURL='https://mls-api.loca.lt/'
// axios.defaults.baseURL='http://localhost:8000/'
// axios.defaults.baseURL='https://api.cloudlearning.my.id'


createApp(App).use(router).use(VueSweetalert2).mount('#app')
