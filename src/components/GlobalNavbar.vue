<script setup lang="ts">
    import SwitchLanguage from './SwitchLanguage.vue'
    import NavbarLink from './NavbarLink.vue'
    import { RouteName } from '../utils/RouteAttr'

    const allLinks = [
        RouteName.HOME,
        RouteName.ABOUT,
        RouteName.WATCH_LIST,
        RouteName.LOGIN,
        RouteName.REGISTER,
    ]
</script>

<template>
    <nav class="navbar">
        <RouterLink :to="{ name: RouteName.HOME }">
            <img
                class="navbar__logo"
                src="https://cdn.worldvectorlogo.com/logos/flix-1.svg"
            />
        </RouterLink>
        <div class="navbar__links">
            <div v-for="link in allLinks" :key="link">
                <NavbarLink :link="link" />
            </div>
        </div>
        <SwitchLanguage />
    </nav>
</template>

<style lang="scss" scoped>
    .navbar {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 0.5em 0;
        background-color: aqua;

        &__logo {
            flex: 1;
            width: 5em;
        }

        &__links {
            display: flex;
            flex: 1;
            align-items: center;
            justify-content: center;
        }
    }

    @media (min-width: 5em) {
        .navbar {
            flex-direction: row;
            padding: 1em;
        }
    }
</style>
