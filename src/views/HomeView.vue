<script setup lang="ts">
    import { useI18n } from 'vue-i18n'
    // import { storeTMDB } from '../stores/counterPinia'

    const { t } = useI18n()
</script>

<template>
    <div class="home">
        <h1>{{ t('home') }}</h1>
        <!-- {{ storeTMDB.allGenres }} -->
    </div>
</template>

<style lang="scss" scoped>
    .home {
        display: flex;
    }
</style>
