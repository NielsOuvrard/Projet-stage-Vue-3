import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import i18n from './i18n'
import Router from './router/router'
import './veeValidate'
import pinia from './pinia'

const app = createApp(App)

app.use(i18n)
app.use(Router)
app.use(pinia)

app.mount('#app')
