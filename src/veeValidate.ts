import { defineRule, configure } from 'vee-validate'
import AllRules from '@vee-validate/rules'
import { localize } from '@vee-validate/i18n'
import en from '@vee-validate/i18n/dist/locale/en.json'
import fr from '@vee-validate/i18n/dist/locale/fr.json'

configure({
    validateOnInput: true,
    generateMessage: localize({
        en,
        fr,
    }),
})

Object.keys(AllRules).forEach((rule) => {
    defineRule(rule, AllRules[rule])
})
