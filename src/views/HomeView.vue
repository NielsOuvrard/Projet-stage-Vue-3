<script setup lang="ts">
    import ElementCard from '../components/ElementCard.vue'
    import SearchBar from '../components/SearchBar.vue'
    import API from '../services/api'
    import { ref, watch, onMounted } from 'vue'
    import { storeTMDB } from '../stores/storePinia'
    import { useI18n } from 'vue-i18n'
    import { useRoute } from 'vue-router'
    import { useQuery } from 'vue-query'

    const { locale, t } = useI18n({ useScope: 'global' })
    const route = useRoute()
    const listMovies = ref()
    const searchBarText = ref('')
    const { data, isLoading, isError, error } = useQuery(
        ['movieList', searchBarText.value],
        () => API.searchBarMovieRequest(searchBarText.value || 'batman'),
        {
            enabled: !searchBarText.value,
        }
    )

    onMounted(async () => {
        const search: string = route.query.search
        if (search) {
            // recherche url ( /?search=batman par exemple)
            listMovies.value = await API.searchBarMovieRequest(search)
        } else {
            listMovies.value = await API.homePageMovieRequest()
        }
        storeTMDB.moviesDisplay = listMovies.value
    })

    function actualiseSearchbar(search: string) {
        searchBarText.value = search
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
        storeTMDB.moviesDisplay = listMovies.value
    }

    watch(locale, () => {
        actualiseLanguage()
    })
</script>

<template>
    <div class="home">
        <SearchBar @make-search="actualiseSearchbar" />
        <div v-if="isLoading">{{ t('loading') }}</div>
        <div v-else-if="isError">{{ t('errorOccured') }} {{ error }}</div>
        <div v-else-if="data?.values">
            <div class="home__card">
                <div v-for="movie in listMovies" :key="movie">
                    <ElementCard :all-infos-movie="movie" />
                </div>
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
