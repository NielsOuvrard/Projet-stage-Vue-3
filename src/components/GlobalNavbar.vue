<script setup lang="ts">
    import SwitchLanguage from './SwitchLanguage.vue'
    import RouterLinkNavbarVue from './RouterLinkNavbar.vue'

    const allLinks = ['Home', 'About', 'WatchList', 'Register', 'Login']
</script>

<template>
    <nav class="navbar">
        <RouterLink class="navbar__routerLink" :to="{ name: 'Home' }">
            <img
                class="navbar__logo"
                src="https://cdn.worldvectorlogo.com/logos/flix-1.svg"
            />
        </RouterLink>
        <div class="navbar__links">
            <div v-for="link in allLinks" :key="link">
                <RouterLinkNavbarVue :link="link" />
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
        flex-direction: row;
        padding: 1em;
        background-color: aqua;

        &__logo {
            flex: 1;
            width: 5em;
        }

        &__links {
            align-items: center;
            justify-content: center;
            flex: 1;
            display: flex;
        }
    }
</style>
