<script setup lang="ts">
    import { onMounted, ref, watch, computed } from 'vue'
    import API from '../services/api'
    import colorAccordingId from '../utils/colorGenre'
    import { useRoute } from 'vue-router'
    import ActorCardInfosMoviePage from '../components/ActorCardInfosMoviePage.vue'
    import { useI18n } from 'vue-i18n'
    import { MovieRequest } from '../types/apiType'
    import { watchlistStore } from '../stores/watchlistStore'
    import { MyListOfFilms } from '../types/watchlistType'

    const { locale, t } = useI18n({ useScope: 'global' })
    const filmInfo = ref<MovieRequest | null>()
    const route = useRoute()
    const inTheWatchlistButton = ref(t('addWatchList'))

    const store = watchlistStore()

    onMounted(async () => {
        const movieId = parseInt(route.params.id as string)
        filmInfo.value = await API.specificMovieInfoRequest(movieId)
    })

    watch(locale, () => {
        actualise()
    })

    function dateAccordingLang() {
        if (filmInfo.value === null) {
            return null
        }
        const arrayDate: string[] | undefined =
            filmInfo.value?.release_date.split('-')
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
            return movie.id === filmInfo.value?.id
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

    async function actualise() {
        inTheWatchlistButton.value = t('addWatchList')
        const id = parseInt(route.params.id as string)
        filmInfo.value = await API.specificMovieInfoRequest(id)
    }
</script>

<template>
    <div v-if="filmInfo" class="movie">
        <div class="movie__title">
            <h1>{{ filmInfo.title }}</h1>
        </div>
        <div class="movie__up-page">
            <div class="movie__up-left">
                <img
                    class="movie__poster"
                    :src="`https://image.tmdb.org/t/p/w500/${filmInfo.poster_path}`"
                />
                <br />
                <span>{{ filmInfo.vote_average }}</span>
                <p>{{ t('releaseDate') }} : {{ dateAccordingLang() }}</p>
            </div>
            <div v-if="filmInfo.id" class="movie__up-right">
                <button
                    type="button"
                    class="movie__watchlist"
                    @click="addToWatchList(filmInfo.id)"
                >
                    {{ changeButtonWatchListName }}
                </button>
                <h4 class="movie__genre-title">{{ t('genres') }} :</h4>
                <div v-if="filmInfo.genres" class="movie__genres">
                    <div v-for="genre in filmInfo.genres" :key="genre.id">
                        <div class="movie__genres-distance">
                            <div
                                class="movie__genres-background"
                                :style="{
                                    'background-color': `${colorAccordingId[genre.id as keyof typeof colorAccordingId]}`,
                                }"
                            >
                                {{ genre.name }}
                            </div>
                        </div>
                    </div>
                </div>
                <h4 class="movie__description">{{ t('description') }} :</h4>
                <div>
                    <p>{{ filmInfo.overview }}</p>
                </div>
            </div>
        </div>
        <h3>{{ t('actors') }} :</h3>
        <ActorCardInfosMoviePage />
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
    }
</style>

<!--
    <template>
    <div v-if="filmInfo" class="movie">
    <div class="movie__title">
    <h1>{{ filmInfo.title }}</h1>
    </div>
    <div class="movie__up-page">
    <div class="movie__up-left">
    <img
    class="movie__poster"
    :src="`https://image.tmdb.org/t/p/w500/${filmInfo.poster_path}`"
    />
    <br />
    <span>{{ filmInfo.vote_average }}</span>
    <p>{{ t('releaseDate') }} : {{ dateAccordingLang() }}</p>
    </div>
    <div class="movie__up-right">
    <button
    type="submit"
    class="movie__add-watchlist"
    @click="addToWatchList(filmInfo.id)"
    >
    {{ changeButtonWatchListName }}
    </button>
    <h4 class="movie__description">{{ t('genres') }} :</h4>
    <div v-if="filmInfo.genres" class="moviey">
    <div v-for="genre in filmInfo.genres" :key="genre.id">
    <div class="genre-row__commas">
    <div
    class="genre-row__commas__colored"
    :style="{
    'background-color': `${colorAccordingId[genre.id as keyof typeof colorAccordingId]}`,
    }"
    >
    {{ genre.name }}
    </div>
    </div>
    </div>
    </div>
    <br /><br />
    <h4 class="solo-movie__up-page__right__title">
    {{ t('description') }} :
    </h4>
    <div>
    <p>{{ filmInfo.overview }}</p>
    </div>
    </div>
    </div>
    <h3>{{ t('actors') }} :</h3>
    <ActorCardInfosMoviePage />
    </div>
    </template>

    <style lang="scss" scoped>
    .solo {
    margin-left: 2em;
    margin-right: 2em;
    color: rgb(226, 226, 226);
    @media (min-width: 720px) {
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

    &__add-watchlist {
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

    &__description {
    color: white;
    font-size: 1.2em;
    }
    }

    .genre-row {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    &__commas {
    padding: 0.1em;
    &__colored {
    padding: 0.4em;
    border-radius: 0.4em;
    box-shadow: 0.1em 0.1em 0.2em rgb(0, 0, 0);
    text-shadow: 0.05em 0.05em 0.3em rgb(0, 0, 0);
    }
    }
    }
    </style> 
-->
