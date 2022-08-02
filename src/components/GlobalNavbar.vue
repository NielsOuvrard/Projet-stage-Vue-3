<script setup lang="ts">
    import SwitchLanguage from './SwitchLanguage.vue'
    import NavbarLink from './NavbarLink.vue'
    import { RouteName } from '../utils/RouteAttr'
    import { ref, onMounted } from 'vue'

    const display = ref(false)

    const allLinks = [
        RouteName.HOME,
        RouteName.ABOUT,
        RouteName.WATCH_LIST,
        RouteName.LOGIN,
        RouteName.REGISTER,
        RouteName.LOGOUT,
    ]

    onMounted(() => {
        window.addEventListener('resize', windowResize)
    })

    function windowResize() {
        if (window.innerWidth > 1000) {
            display.value = true
        } else {
            display.value = false
        }
    }

    function changeDisplay() {
        display.value = !display.value
    }
</script>

<template>
    <nav class="navbar">
        <button type="button" class="navbar__icon" @click="changeDisplay">
            <i class="fa fa-bars"></i>
        </button>
        <RouterLink :to="{ name: RouteName.HOME }">
            <img
                class="navbar__logo"
                src="https://cdn.worldvectorlogo.com/logos/flix-1.svg"
            />
        </RouterLink>
        <div v-show="display" class="navbar__links">
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
        position: relative;
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

        &__icon {
            color: black;
            display: block;
            position: absolute;
            right: 0;
            top: 0;

            &:hover {
                background-color: #ddd;
                color: black;
            }

            @media (min-width: 45em) {
                display: none;
            }
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
            @media (min-width: 45em) {
                display: flex;
            }
        }
    }
</style>
