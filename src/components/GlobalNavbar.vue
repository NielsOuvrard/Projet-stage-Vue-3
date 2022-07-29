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
        RouteName.LOGOUT,
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
    $font-color: #333435;

    .navbar {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        color: $font-color;
        background-image: linear-gradient(315deg, #d3cfcf 0%, #d7e1ec 74%);
        padding: 1.1em;
        box-shadow: 0 0.125em 0.25em 0 rgba(0, 0, 0, 0.2);

        @media (min-width: 45em) {
            flex-direction: row;
            padding: 1.3em;
        }

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
</style>
