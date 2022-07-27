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

    onMounted(async () => {
        const array: TypeOfGenre = ref([])
        const listgenre = await API.getListOfAllGenreRequest()
        listgenre.forEach((genre) => {
            array.value.push(genre)
        })
        storeTMDB.allGenres = array
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
