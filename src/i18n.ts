import { createI18n } from 'vue-i18n'
import en from './utils/en.json'
import fr from './utils/fr.json'

const i18n = createI18n({
    legacy: false,
    locale: 'en',
    keySeparator: true,
    globalInjection: true,
    fallbackLocale: 'fr',
    messages: {
        en,
        fr,
    },
})

export default i18n
