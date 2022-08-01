<script setup lang="ts">
    import ElementCard from '../components/ElementCard.vue'
    import { watch } from 'vue'
    import { useI18n } from 'vue-i18n'
    import API from '../services/api'
    import { MovieRequest } from '../types/apiType'
    import { watchlistStore } from '../stores/watchlistStore'
    import { useQuery } from 'vue-query'

    const { t, locale } = useI18n()
    const store = watchlistStore()
    const { data, refetch, isLoading, isFetching, isError, error } = useQuery(
        'movieInfo',
        async () => {
            const listInfosMovies: Promise<MovieRequest>[] = []
            store.watchList.forEach((movie) => {
                listInfosMovies?.push(API.specificMovieInfoRequest(movie.id))
            })
            return Promise.all(listInfosMovies)
        }
    )

    watch(locale, () => {
        refetch.value()
    })
    function deleteMovie(idMovie: number) {
        store.deleteMovieFromWatchList(idMovie)
        refetch.value()
    }
</script>

<template>
    <div class="watchlist">
        <div class="watchlist__title">
            <h1>{{ t('watchList') }}</h1>
        </div>
        <div v-if="isLoading || isFetching" class="watchlist__loading"></div>
        <div v-else-if="isError">{{ t('errorOccured') }} {{ error }}</div>
        <div v-else class="watchlist__mylist">
            <div
                v-for="movie in data"
                :key="movie.id"
                class="watchlist__movies"
            >
                <ElementCard :all-infos-movie="movie" />
                <button
                    type="submit"
                    class="watchlist__delete"
                    @click="deleteMovie(movie.id)"
                >
                    {{ t('delWatchList') }}
                </button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .watchlist {
        &__title {
            color: white;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        &__mylist {
            display: flex;
            align-content: center;
            justify-content: center;
            flex-wrap: wrap;
        }

        &__movies {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        &__delete {
            padding: 10px;
            width: 15em;
            background-color: #ffffff;
            color: #080710;
            margin-bottom: 30px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: box-shadow 0.4s, background-color 0.4s;

            &:hover {
                background-color: #b9b9b9;
                box-shadow: 4px 4px 10px rgb(0, 0, 0);
            }
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
