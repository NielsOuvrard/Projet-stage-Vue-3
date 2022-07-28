<script setup lang="ts">
    import ElementCard from '../components/ElementCard.vue'
    import SearchBar from '../components/SearchBar.vue'
    import API from '../services/api'
    import { ref, watch, onMounted } from 'vue'
    import { storeTMDB } from '../stores/storePinia'
    import { MovieRequest } from '../types/apiType'
    import { useI18n } from 'vue-i18n'
    import { useRoute } from 'vue-router'

    const { locale } = useI18n({ useScope: 'global' })
    const route = useRoute()
    const listMovies = ref()

    onMounted(async () => {
        const search: string = route.query.search
        if (search) {
            // recherche url ( /?search=batman par exemple)
            listMovies.value = await API.searchBarMovieRequest(search)
        } else {
            listMovies.value = await API.homePageMovieRequest()
        }
        storeTMDB.moviesDisplay = listMovies.value as MovieRequest
    })

    function actualiseSearchbar() {
        // recherche input ( tape "batman" et appuie sur entrée par exemple)
        listMovies.value = storeTMDB.moviesDisplay
    }
    async function actualiseLanguage() {
        const search: string = route.query.search
        if (search) {
            // si on doit refresh une page recherche
            listMovies.value = await API.searchBarMovieRequest(search)
        } else {
            // si on doit refresh page home (discovery movie)
            listMovies.value = await API.homePageMovieRequest()
        }
        storeTMDB.moviesDisplay = listMovies.value as MovieRequest
    }

    watch(locale, () => {
        actualiseLanguage()
    })
</script>

<template>
    <div class="home">
        <SearchBar @make-search="actualiseSearchbar" />
        <div class="home__card">
            <div v-for="movie in listMovies" :key="movie">
                <ElementCard :all-infos-movie="movie" />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .home {
        display: flex;
        flex-direction: column;
        &__card {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
        }
    }
</style>
