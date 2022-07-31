<script setup lang="ts">
    import ElementCard from '../components/ElementCard.vue'
    import SearchBar from '../components/SearchBar.vue'
    import API from '../services/api'
    import { ref, watch, onMounted } from 'vue'
    import { storeTMDB } from '../stores/storeMovie'
    import { useI18n } from 'vue-i18n'
    import { LocationQueryValue, useRoute } from 'vue-router'
    import { useQuery } from 'vue-query'
    import { MovieRequest } from '../types/apiType'

    const listMovies = ref<MovieRequest[] | null>()
    const searchBarText = ref('')

    const { locale, t } = useI18n({ useScope: 'global' })
    const route = useRoute()
    const store = storeTMDB()

    const {
        data: dataSearch,
        isLoading: isLoadingSearch,
        isError: isErrorSearch,
        error: errorSearch,
    } = useQuery(
        ['movieList', searchBarText.value],
        () => API.searchBarMovieRequest(searchBarText.value),
        {
            enabled: !!searchBarText.value,
            cacheTime: 500000,
        }
    )
    const {
        isLoading: isLoadingDiscovery,
        isError: isErrorDiscovery,
        error: errorDiscovery,
    } = useQuery('movieHomeList', () => API.homePageMovieRequest(), {
        cacheTime: 500000,
    })

    onMounted(async () => {
        const search = route.query.search as LocationQueryValue
        if (search) {
            listMovies.value = await API.searchBarMovieRequest(search)
        } else {
            listMovies.value = await API.homePageMovieRequest()
        }
        store.moviesDisplay = listMovies.value
    })

    function actualiseSearchbar(search: string) {
        searchBarText.value = search
        listMovies.value = store.moviesDisplay
    }

    async function actualiseLanguage() {
        const search = route.query.search as LocationQueryValue
        if (search) {
            // si on doit refresh une page recherche
            listMovies.value = await API.searchBarMovieRequest(search)
        } else {
            // si on doit refresh page home (discovery movie)
            listMovies.value = await API.homePageMovieRequest()
        }
        store.moviesDisplay = listMovies.value
    }

    watch(locale, () => {
        actualiseLanguage()
    })
</script>

<template>
    <div class="home">
        <SearchBar @make-search="actualiseSearchbar" />
        <div v-if="dataSearch || route.query.search">
            <div v-if="isLoadingSearch" class="home__loading"></div>
            <div v-else-if="isErrorSearch">
                {{ t('errorOccured') }} {{ errorSearch }}
            </div>
            <div class="home__card">
                <div v-for="movie in listMovies" :key="movie.id">
                    <ElementCard :all-infos-movie="movie" />
                </div>
            </div>
        </div>
        <div v-else>
            <div v-if="isLoadingDiscovery" class="home__loading"></div>
            <div v-else-if="isErrorDiscovery">
                {{ t('errorOccured') }} {{ errorDiscovery }}
            </div>
            <div class="home__card">
                <div v-for="movie in listMovies" :key="movie.id">
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
        align-items: center;

        &__card {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
        }

        &__loading {
            display: inline-block;
            width: 5em;
            height: 5em;

            &::after {
                content: ' ';
                display: block;
                width: 4em;
                height: 4em;
                margin: 0.5em;
                border-radius: 50%;
                border: 0.375em solid #fff;
                border-color: #fff transparent #fff transparent;
                animation: loading 1.2s linear infinite;
            }

            @keyframes loading {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(360deg);
                }
            }
        }
    }
</style>
