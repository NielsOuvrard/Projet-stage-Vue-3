<script setup lang="ts">
    import { useI18n } from 'vue-i18n'

    const { t } = useI18n({ useScope: 'global' })
</script>

<template>
    <div class="home">
        <h1>{{ t('home') }}</h1>
    </div>
</template>

<style lang="scss" scoped>
    .home {
        display: flex;
    }
</style>
