<script setup lang="ts">
    import { useI18n } from 'vue-i18n'
    import ElementCard from '../components/ElementCard.vue'
    import SearchBar from '../components/SearchBar.vue'
    import API from '../services/api'
    import { onMounted, ref } from 'vue'
    import { storeTMDB } from '../stores/storePinia'
    // import { MovieRequest } from '../types/apiType'

    const listMovies = ref()
    onMounted(async () => {
        listMovies.value = await API.homePageMovieRequest()
        storeTMDB.moviesDisplay = listMovies.value
        // fight club = 550
    })
    // listMovies.value = computed(storeTMDB.moviesDisplay)
    function actualise() {
        listMovies.value = storeTMDB.moviesDisplay
    }

    const { t } = useI18n()
</script>

<template>
    <div class="home">
        <h1>{{ t('home') }}</h1>
        <SearchBar @make-search="actualise" />
        <div class="home__card">
            <div v-for="movie in listMovies" :key="movie">
                <ElementCard :allInfosMovie="movie" />
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
        }
    }
</style>
