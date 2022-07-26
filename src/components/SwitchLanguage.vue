<script setup lang="ts">
    import { useI18n } from 'vue-i18n'
    import { Langs } from '../utils/langs'
    const { locale, t } = useI18n({ useScope: 'global' })

    const langs = [Langs.EN, Langs.FR]
</script>

<template>
    <div class="">
        <span class="language">{{ t('language') }}</span>
        <select v-model="locale">
            <option v-for="lang in langs" :key="lang">
                {{ lang }}
            </option>
        </select>
    </div>
</template>

<style lang="scss" scoped>
    .language {
        color: black;
        font-size: 15px;
        font-weight: 600;
    }

    @media (min-width: 720px) {
        .language {
            font-size: 18px;
        }
    }
</style>
