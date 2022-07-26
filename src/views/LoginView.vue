<script setup lang="ts">
    import { useI18n } from 'vue-i18n'

    const { t } = useI18n()
</script>

<template>
    <div class="login">
        <h1>{{ t('login') }}</h1>
    </div>
</template>

<style lang="scss" scoped>
    .login {
        display: flex;
    }
</style>
