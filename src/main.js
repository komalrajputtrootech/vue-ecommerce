import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice';

import 'primevue/resources/themes/saga-blue/theme.css'       //theme
import 'primevue/resources/primevue.min.css'                 //core css
import 'primeicons/primeicons.css'                           //icons

axios.defaults.baseURL = "http://localhost:8000/api/v1/"
const app = createApp(App)
app.config.globalProperties.$axios = axios;
app.use(PrimeVue).use(ToastService).use(store).use(router).mount('#app')
