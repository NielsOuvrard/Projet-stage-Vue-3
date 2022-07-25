<script setup lang="ts">
    import { useI18n } from 'vue-i18n'

    const { t } = useI18n()
</script>

<template>
    <div class="register">
        <h1>{{ t('Register') }}</h1>
    </div>
</template>

<style lang="scss" scoped>
    .register {
        display: flex;
    }
</style>
