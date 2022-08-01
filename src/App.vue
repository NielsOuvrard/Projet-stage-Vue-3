<script setup lang="ts">
    import GlobalNavbar from './components/GlobalNavbar.vue'
    import { onMounted } from 'vue'
    import { storeTMDB } from './stores/storeMovie'

    const store = storeTMDB()

    onMounted(async () => {
        store.setAllGenres()
    })
</script>

<template>
    <GlobalNavbar />
    <Transition name="fade" mode="out-in">
        <RouterView />
    </Transition>
</template>

<style>
    .fade-enter-active,
    .fade-leave-active {
        transition-duration: 0.5s;
        transition-property: opacity;
        transition-timing-function: ease;
    }

    .fade-enter,
    .fade-leave-active {
        opacity: 0;
    }
</style>
