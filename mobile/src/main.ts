import { createApp } from 'vue'

import App from './App.vue'
import router from "./router";
import pinia from "./store/store";


import '@/assets/sass/reset.scss'
import 'animate.css';
// vant css
import 'vant/lib/index.css';

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
