<script setup lang="ts">
    import { useI18n } from 'vue-i18n'

    const { t } = useI18n({ useScope: 'global' })
</script>

<template>
    <div class="about">
        <h1>{{ t('about') }}</h1>
        <p>{{ t('siteDescription') }}</p>
    </div>
</template>

<style lang="scss" scoped>
    .about {
        background-color: whitesmoke;
    }
</style>
