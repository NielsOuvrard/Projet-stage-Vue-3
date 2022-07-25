<script setup lang="ts">
    import { useI18n } from 'vue-i18n'

    const { t } = useI18n()
</script>

<template>
    <div class="about">
        <h1>{{ t('About') }}</h1>
        <p>{{ t('SiteDescription') }}</p>
    </div>
</template>

<style lang="scss" scoped>
    .about {
        background-color: whitesmoke;
    }
</style>
