<script setup lang="ts">
    import { useI18n } from 'vue-i18n'
    import { Langs } from '../utils/langs'
    import { setLocale } from '@vee-validate/i18n'

    const { locale, t } = useI18n({ useScope: 'global' })
    const langs = [Langs.EN, Langs.FR]

    function changeLocale() {
        setLocale(locale.value)
    }
</script>

<template>
    <div class="">
        <span class="language">{{ t('language') }}</span>
        <select v-model="locale" @change="changeLocale">
            <option v-for="lang in langs" :key="lang">
                {{ lang }}
            </option>
        </select>
    </div>
</template>

<style lang="scss" scoped>
    .language {
        color: black;
        font-size: 0.9375em;
        font-weight: 600;

        @media (min-width: 45em) {
            font-size: 1.125em;
        }
    }
</style>
