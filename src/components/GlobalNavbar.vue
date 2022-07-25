<script setup lang="ts">
    import { useI18n } from 'vue-i18n'
    import SwitchLang from './components/SwitchLang.vue'

    const { t } = useI18n()
</script>

<template>
    <SwitchLang />
    <nav class="navbar">
        <RouterLink class="navbar__routerLink" :to="{ name: 'Home' }">
            <img
                class="navbar__logo"
                src="https://cdn.worldvectorlogo.com/logos/flix-1.svg"
                alt="logo"
            />
        </RouterLink>
        <RouterLink class="navbar__routerLink" :to="{ name: 'Home' }">{{
            t('home')
        }}</RouterLink>
        <RouterLink class="navbar__routerLink" :to="{ name: 'About' }">{{
            t('about')
        }}</RouterLink>
        <RouterLink class="navbar__routerLink" :to="{ name: 'WatchList' }">{{
            t('watchlist')
        }}</RouterLink>
        <RouterLink class="navbar__routerLink" :to="{ name: 'Login' }">{{
            t('login')
        }}</RouterLink>
        <RouterLink class="navbar__routerLink" :to="{ name: 'Register' }">{{
            t('register')
        }}</RouterLink>
    </nav>
</template>

<style lang="scss" scoped>
    .navbar {
        display: flex;
        padding: 1em;
        background-color: aqua;

        &__logo {
            width: 5em;
        }

        &__routerLink {
            color: black;
            font-weight: 600;
            text-decoration: none;
        }
    }
</style>
