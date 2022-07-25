<script setup lang="ts">
    import { useI18n } from 'vue-i18n'

    const { t } = useI18n()
</script>

<template>
    <div class="watchlist">
        <h1>{{ t('watchlist') }}</h1>
    </div>
</template>

<style lang="scss" scoped>
    .watchlist {
        display: flex;
    }
</style>
