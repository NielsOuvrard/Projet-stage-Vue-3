<script setup lang="ts">
    import { useI18n } from 'vue-i18n'
    // import { useCounterStore } from '../stores/counterPinia.js'
    // const counter = useCounterStore()        // to use pinia

    const { t } = useI18n({ useScope: 'global' })
</script>

<template>
    <div class="watchlist">
        <h1>{{ t('watchList') }}</h1>
    </div>
</template>

<style lang="scss" scoped>
    .watchlist {
        display: flex;
    }
</style>
