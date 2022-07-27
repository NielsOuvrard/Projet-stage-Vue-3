import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import i18n from './i18n'
import Router from './router/router'
import { defineRule, configure } from 'vee-validate'
import AllRules from '@vee-validate/rules'

configure({
    validateOnInput: true,
})

Object.keys(AllRules).forEach((rule) => {
    defineRule(rule, AllRules[rule])
})

const app = createApp(App)

app.use(i18n)
app.use(Router)

app.mount('#app')
