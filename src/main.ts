import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import i18n from './i18n'
import Router from './router/router'
import pinia from './pinia'
import { VueQueryPlugin } from 'vue-query'

const app = createApp(App)

app.use(i18n)
app.use(Router)
app.use(pinia)
app.use(VueQueryPlugin)
app.mount('#app')
