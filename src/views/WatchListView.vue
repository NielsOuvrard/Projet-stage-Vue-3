<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import { useI18n } from 'vue-i18n'
    import API from '../services/api'
    import ElementCard from '../components/ElementCard.vue'
    import { MovieRequest } from '../types/apiType'
    import { watchlistStore } from '../stores/watchlistStore'
    import { MyListOfFilms } from '../types/watchlistType'

    const store = watchlistStore()
    const { t } = useI18n()
    const listInfosMovies = ref<MovieRequest[]>([])
    const myWatchList = ref<MyListOfFilms[]>([])

    function actualise() {
        myWatchList.value = store.watchList
        myWatchList.value.forEach(async (movie) => {
            const infosMovie = await API.specificMovieInfoRequest(movie.id)
            listInfosMovies.value.push(infosMovie)
        })
    }

    onMounted(async () => {
        actualise()
    })

    function deleteMovie(id: number) {
        store.deleteMovieFromWatchList(id)
        myWatchList.value = []
        listInfosMovies.value = []
        actualise()
    }
</script>

<template>
    <div class="watchlist">
        <div class="title">
            <h1>{{ t('watchList') }}</h1>
        </div>
        <div class="mylist">
            <div
                v-for="movie in listInfosMovies"
                :key="movie.id"
                class="mylist__movies"
            >
                <ElementCard :all-infos-movie="movie" />
                <button
                    type="submit"
                    class="mylist__movies__button"
                    @click="deleteMovie(movie.id)"
                >
                    {{ t('delWatchList') }}
                </button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .title {
        color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .mylist {
        display: flex;
        align-content: center;
        justify-content: center;
        flex-wrap: wrap;
        &__movies {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            &__button {
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
        }
    }
</style>
