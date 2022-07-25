<script setup lang="ts">
    import { useI18n } from 'vue-i18n'
    const { locale, t } = useI18n({ useScope: 'global' })

    const langs = ['en', 'fr']
</script>

<template>
    <div class="">
        <span class="language">{{ t('Language') }}</span>
        <select v-model="locale">
            <option v-for="(lang, i) in langs" :key="`Lang${i}`">
                {{ lang }}
            </option>
        </select>
    </div>
</template>

<style lang="scss" scoped>
    .language {
        color: black;
        font-weight: 600;
    }
</style>
