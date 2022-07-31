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
    <RouterView />
</template>


<style>
    body {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        font-family: Lato;
        background-color: #393e46;
    }
</style>
