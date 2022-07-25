<script setup lang="ts">
    import { useI18n } from 'vue-i18n'

    // import { i18n } from '../i18n'
    // const listLang = ['fr', 'en']
    // const usedLang = 'fr'
    const { t } = useI18n()
    // i = ui8n

    // function reassignLang(lang: string) {
    //     listLang.find((elem) => lang === elem)
    // }
    // const { t } = useI18n({})
    // return process.env.VUE_APP_I18NSUPPORTED_LOCALE.split(',')
    console.log(t)
</script>

<template>
    <div>
        <!-- <SwitchLang /> -->
        <!-- {{ locale }} -->
        <p>{{ $t('hello') }}</p>
        <p>hello</p>
        <!-- <ul>
            <li v-for="lang in listLang" :key="lang">
            {{ lang }}
            </li>
        </ul> -->
        <!-- @click="reassignLang(lang)" -->
    </div>
</template>
