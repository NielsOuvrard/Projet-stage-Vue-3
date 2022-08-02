<script setup lang="ts">
    import { ref, watch, computed } from 'vue'
    import API from '../services/api'
    import colorAccordingId from '../utils/colorGenre'
    import { useRoute } from 'vue-router'
    import ActorCardInfosMoviePage from '../components/ActorCardInfosMoviePage.vue'
    import { useI18n } from 'vue-i18n'
    import { watchlistStore } from '../stores/watchlistStore'
    import { MyListOfFilms } from '../types/watchlistType'
    import { useQuery } from 'vue-query'

    const { locale, t } = useI18n({ useScope: 'global' })
    const route = useRoute()
    const inTheWatchlistButton = ref(t('addWatchList'))
    const store = watchlistStore()
    const movieId = ref(parseInt(route.params.id as string))

    const { data: infosActors } = useQuery(['creditInfo', movieId.value], () =>
        API.allCreditsFromMovieRequest(movieId.value)
    )

    const { refetch, data, isLoading, isFetching, isError, error } = useQuery(
        ['movieInfo', movieId.value],
        () => API.specificMovieInfoRequest(movieId.value)
    )

    watch(locale, () => {
        actualise()
    })

    function dateAccordingLang() {
        if (data.value === null) {
            return null
        }
        const arrayDate: string[] | undefined =
            data.value?.release_date.split('-')
        if (arrayDate) {
            const date = new Date(
                parseInt(arrayDate[0]),
                parseInt(arrayDate[1]),
                parseInt(arrayDate[2])
            )
            return new Intl.DateTimeFormat(t('languageDate'), {
                dateStyle: 'long',
            }).format(date)
        }
    }

    const changeButtonWatchListName = computed(() => {
        const watchList = !!store.watchList.find((movie: MyListOfFilms) => {
            return movie.id === data.value?.id
        })
        if (watchList) {
            return t('delWatchList')
        } else {
            return t('addWatchList')
        }
    })

    function addToWatchList(filmId: number) {
        const film: MyListOfFilms = { id: filmId }
        const watchList = !!store.watchList.find((movie: MyListOfFilms) => {
            return movie.id === filmId
        })
        if (watchList) {
            store.deleteMovieFromWatchList(filmId)
        } else {
            store.setMovieToWatchList(film)
        }
    }

    function actualise() {
        inTheWatchlistButton.value = t('addWatchList')
        refetch.value()
    }
</script>

<template>
    <div v-if="isLoading || isFetching" class="movie__loading"></div>
    <div v-else-if="isError">{{ t('errorOccured') }} {{ error }}</div>
    <div v-else-if="data" class="movie">
        <div class="movie__title">
            <h1>{{ data.title }}</h1>
        </div>
        <div class="movie__up-page">
            <div class="movie__up-left">
                <img
                    class="movie__poster"
                    :src="`https://image.tmdb.org/t/p/w500/${data.poster_path}`"
                />
                <br />
                <span>{{ data.vote_average }}</span>
                <p>{{ t('releaseDate') }} : {{ dateAccordingLang() }}</p>
            </div>
            <div class="movie__up-right">
                <button
                    type="button"
                    class="movie__watchlist"
                    @click="addToWatchList(data.id)"
                >
                    {{ changeButtonWatchListName }}
                </button>
                <h4 class="movie__genre-title">{{ t('genres') }} :</h4>
                <div v-if="data.genres" class="movie__genres">
                    <div v-for="genre in data.genres" :key="genre.id">
                        <div class="movie__genres-distance">
                            <div
                                class="movie__genres-background"
                                :style="{
                                    'background-color': `${colorAccordingId(genre.id as number)}`,
                                }"
                            >
                                {{ genre.name }}
                            </div>
                        </div>
                    </div>
                </div>
                <h4 class="movie__description">{{ t('description') }} :</h4>
                <div>
                    <p>{{ data.overview }}</p>
                </div>
            </div>
        </div>
        <h3>{{ t('actors') }} :</h3>
        <ActorCardInfosMoviePage
            v-if="infosActors && infosActors.cast"
            :list-credits="infosActors.cast"
        />
        <h3>{{ t('crew') }} :</h3>
        <ActorCardInfosMoviePage
            v-if="infosActors && infosActors.cast"
            :list-credits="infosActors.crew"
        />
    </div>
</template>

<style lang="scss" scoped>
    .movie {
        margin-left: 2em;
        margin-right: 2em;
        color: rgb(226, 226, 226);

        @media (min-width: 45em) {
            margin-left: 4em;
            margin-right: 4em;
        }

        &__title {
            justify-content: center;
            display: flex;
            font-family: Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif;
        }

        &__up-page {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            flex-direction: column;

            @media (min-width: 45em) {
                flex-direction: row;
            }
        }

        &__up-left {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        &__poster {
            height: 18em;
            box-shadow: 0.1em 0.1em 0.3em rgb(0, 0, 0);
        }

        &__up-right {
            flex: 1;
            text-align: justify;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        &__watchlist {
            padding: 0.8em;
            width: 15em;
            background-color: #ffffff;
            box-shadow: 0.1em 0.1em 0.3em rgb(0, 0, 0);
            color: #080710;
            border: none;
            cursor: pointer;
            transition: box-shadow 0.4s, background-color 0.4s;

            &:hover {
                background-color: #b9b9b9;
                box-shadow: 0.4em 0.4em 1em rgb(0, 0, 0);
            }
        }

        &__genre-title {
            color: white;
            font-size: 1.2em;
        }

        &__description {
            margin-top: 3em;
        }

        &__genres {
            display: flex;
            flex-wrap: wrap;
            flex-direction: row;
            justify-content: center;
            align-items: center;
        }

        &__genres-distance {
            padding: 0.1em;
        }

        &__genres-background {
            padding: 0.4em;
            border-radius: 0.4em;
            box-shadow: 0.1em 0.1em 0.2em rgb(0, 0, 0);
            text-shadow: 0.05em 0.05em 0.3em rgb(0, 0, 0);
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
