<template>
    <GlobalNavbar />
    <RouterView />
</template>

<script setup lang="ts">
    import GlobalNavbar from './components/GlobalNavbar.vue'
    import { onMounted, ref } from 'vue'
    import API from './services/api'
    import { TypeOfGenre } from './types/apiType'
    import { storeTMDB } from './stores/storePinia'

    // map
    // filter
    // find
    // sort
    // reduce
    const listGenrePinia: TypeOfGenre = ref([])

    onMounted(async () => {
        const listGenreLocal = await API.getListOfAllGenreRequest()
        listGenrePinia.value = listGenreLocal.map((x) => x)
        storeTMDB.allGenres = listGenrePinia
    })
</script>

<style>
    body {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        font-family: Lato;
        background-color: #393e46;
    }
</style>
