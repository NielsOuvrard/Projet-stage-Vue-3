<script setup lang="ts">
    import ElementCard from '../components/ElementCard.vue'
    import SearchBar from '../components/SearchBar.vue'
    import colorAccordingId from '../utils/colorGenre'
    import API from '../services/api'
    import { ref, watch, onMounted } from 'vue'
    import { useI18n } from 'vue-i18n'
    import { LocationQueryValue, useRoute } from 'vue-router'
    import { useQuery } from 'vue-query'
    import { storeTMDB } from '../stores/storeMovie'
    import { useRouter } from 'vue-router'

    const router = useRouter()
    const store = storeTMDB()
    const searchBarText = ref('')
    const genreChoosen = ref<number | null>(null)
    const { locale, t } = useI18n({ useScope: 'global' })
    const route = useRoute()
    const typeToDisplay = ref(0) // 1 = discovery / 2 = search / 3 = genre

    const {
        refetch: refetchSearch,
        data: dataSearch,
        isLoading: isLoadingSearch,
        isFetching: isFetchingSearch,
        isError: isErrorSearch,
        error: errorSearch,
    } = useQuery(
        ['movieList', searchBarText.value],
        () => API.searchBarMovieRequest(searchBarText.value),
        {
            enabled: !!searchBarText.value,
        }
    )
    const {
        refetch: refetchGenre,
        data: dataGenre,
        isLoading: isLoadingGenre,
        isFetching: isFetchingGenre,
        isError: isErrorGenre,
        error: errorGenre,
    } = useQuery(
        ['movieList', genreChoosen.value],
        () => API.movieRequestFromSpecificGenre(genreChoosen.value as number),
        {
            enabled: !!genreChoosen.value,
        }
    )
    const {
        refetch: refetchDiscovery,
        data: dataHomeMovie,
        isLoading: isLoadingDiscovery,
        isFetching: isFetchingDiscovery,
        isError: isErrorDiscovery,
        error: errorDiscovery,
    } = useQuery('movieHomeList', () => API.homePageMovieRequest(), {
        staleTime: 600000,
    })

    onMounted(async () => {
        const search = route.query.search as LocationQueryValue
        const genre = route.query.genre as LocationQueryValue
        if (search) {
            typeToDisplay.value = 2
            searchBarText.value = search
            refetchSearch.value()
        } else if (genre) {
            typeToDisplay.value = 3
            genreChoosen.value = parseInt(genre)
            refetchGenre.value()
        } else {
            refetchDiscovery.value()
            typeToDisplay.value = 1
        }
    })

    function searchSpecificGenre(idGenre: number) {
        genreChoosen.value = idGenre
        refetchGenre.value()
        typeToDisplay.value = 3
        router.push({ query: { genre: idGenre } })
    }

    function actualiseSearchbar(search: string) {
        searchBarText.value = search
        refetchSearch.value()
        typeToDisplay.value = 2
    }

    function actualiseLanguage() {
        const search = route.query.search as LocationQueryValue
        const genre = route.query.genre as LocationQueryValue
        if (search) {
            refetchSearch.value()
        } else if (genre) {
            refetchGenre.value()
        } else {
            refetchDiscovery.value()
        }
    }

    function beforeColorGenre(idGenre: number) {
        if (
            !route.query.genre ||
            idGenre === parseInt(route.query.genre as string)
        ) {
            return colorAccordingId(idGenre)
        }
        return '#b4b7bb'
    }

    watch(locale, () => {
        actualiseLanguage()
    })
</script>

<template>
    <div class="home">
        <SearchBar @make-search="actualiseSearchbar" />

        <div class="home__group-buttons">
            <button
                v-for="genre in store.allGenres"
                :id="genre.id.toString()"
                :key="genre.id"
                type="submit"
                class="home__group-buttons__button"
                :style="{ 'background-color': `${beforeColorGenre(genre.id)}` }"
                @click="searchSpecificGenre(genre.id)"
            >
                {{ genre.name }}
            </button>
        </div>

        <div v-if="typeToDisplay === 2">
            <div
                v-if="isLoadingSearch || isFetchingSearch"
                class="home__loading"
            ></div>
            <div v-else-if="isErrorSearch">
                {{ t('errorOccured') }} {{ errorSearch }}
            </div>
            <div v-else class="home__card">
                <div v-for="movie in dataSearch" :key="movie.id">
                    <ElementCard :all-infos-movie="movie" />
                </div>
            </div>
        </div>
        <div v-else-if="typeToDisplay === 3">
            <div
                v-if="isLoadingGenre || isFetchingGenre"
                class="home__loading"
            ></div>
            <div v-else-if="isErrorGenre">
                {{ t('errorOccured') }} {{ errorGenre }}
            </div>
            <div v-else class="home__card">
                <div v-for="movie in dataGenre" :key="movie.id">
                    <ElementCard :all-infos-movie="movie" />
                </div>
            </div>
        </div>
        <div v-else>
            <div
                v-if="isLoadingDiscovery || isFetchingDiscovery"
                class="home__loading"
            ></div>
            <div v-else-if="isErrorDiscovery">
                {{ t('errorOccured') }} {{ errorDiscovery }}
            </div>
            <div v-else class="home__card">
                <div v-for="movie in dataHomeMovie" :key="movie.id">
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
        &__group-buttons {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-content: center;
            &__button {
                animation-name: transitionAppare;
                height: 3em;
                border-radius: 0.4em;
                margin: 0.3em;
                border: none;
                color: white;
                text-shadow: 0.1em 0.1em 0.2em black;
                box-shadow: 0.2em 0.2em 0.3em rgb(0, 0, 0);
                cursor: pointer;
                transition: box-shadow 0.15s;
                &:hover {
                    box-shadow: 0em 0em 0.5em ghostwhite;
                }
            }
        }
    }
</style>
