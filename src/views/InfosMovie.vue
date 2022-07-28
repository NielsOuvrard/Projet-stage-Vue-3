<script setup lang="ts">
    import { onMounted, ref, watch } from 'vue'
    import API from '../services/api'
    import colorGenre from '../utils/colorGenre'
    import { useRoute } from 'vue-router'
    import ActorCardInfosMoviePage from '../components/ActorCardInfosMoviePage.vue'
    import { useI18n } from 'vue-i18n'
    const { locale } = useI18n({ useScope: 'global' })

    const filmInfo = ref()
    const colorForGenre = colorGenre
    const route = useRoute()
    const { t } = useI18n()

    onMounted(async () => {
        const id = parseInt(route.params.id)
        filmInfo.value = await API.specificMovieInfoRequest(id)
    })

    function frenchDate() {
        if (filmInfo.value === null) {
            return null
        }
        const arrayDate: string[] | undefined =
            filmInfo.value.release_date.split('-')
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

    async function actualise() {
        const id = parseInt(route.params.id)
        filmInfo.value = await API.specificMovieInfoRequest(id)
    }
    watch(locale, () => {
        actualise()
    })
</script>

<template>
    <div v-if="filmInfo" class="soloMovie">
        <div class="title_movie">
            <h1>{{ filmInfo.title }}</h1>
        </div>
        <div class="upPage">
            <div class="upPage__Left">
                <img
                    class="upPage__Left__ImagesMovie"
                    :src="`https://image.tmdb.org/t/p/w500/${filmInfo.poster_path}`"
                />
                <br />
                <span>{{ filmInfo.vote_average }}</span>
                <p>{{ t('releaseDate') }} : {{ frenchDate() }}</p>
            </div>
            <div class="upPage__Right">
                <!--
                    Faire le boutton watchlist ici

                    <button
                    type="submit"
                    class="upPage__Right__WatchListButton"
                    @click="toMyWatchList">
                    {{ inTheWatchlistButton }}
                    </button>
                -->
                <h4 class="upPage__Right__Title">{{ t('genres') }} :</h4>
                <div v-if="filmInfo.genres" class="genreRow">
                    <div v-for="genre in filmInfo.genres" :key="genre.id">
                        <div class="genreRow__Commas">
                            <div
                                class="genreRow__Commas__Colored"
                                :style="{
                                    'background-color': `${
                                        colorForGenre[genre.id]
                                    }`,
                                }"
                            >
                                {{ genre.name }}
                            </div>
                            &nbsp; &nbsp;
                        </div>
                    </div>
                </div>
                <br /><br />
                <h4 class="upPage__Right__Title">{{ t('description') }} :</h4>
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
    .soloMovie {
        margin-left: 2em;
        margin-right: 2em;
        color: rgb(226, 226, 226);
        @media (min-width: 720px) {
            margin-left: 4em;
            margin-right: 4em;
        }
    }

    .title_movie {
        justify-content: center;
        display: flex;
        font-family: Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif;
    }

    .upPage {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        flex-direction: column;
        &__Left {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            &__ImagesMovie {
                height: 300px;
                box-shadow: 1px 1px 3px rgb(0, 0, 0);
            }
        }
        &__Right {
            flex: 1;
            text-align: justify;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            &__WatchListButton {
                padding: 10px;
                width: 15em;
                background-color: #ffffff;
                box-shadow: 1px 1px 3px rgb(0, 0, 0);
                color: #080710;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                transition: box-shadow 0.4s, background-color 0.4s;
                &:hover {
                    background-color: #b9b9b9;
                    box-shadow: 4px 4px 10px rgb(0, 0, 0);
                }
            }
            &__Title {
                color: white;
                font-size: 1.2em;
            }
        }
        @media (min-width: 720px) {
            flex-direction: row;
        }
    }
    .genreRow {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        &__Commas {
            padding: 0.1em;
            &__Colored {
                padding: 0.4em;
                border-radius: 0.4em;
                box-shadow: 1px 1px 2px rgb(0, 0, 0);
                text-shadow: 0.5px 0.5px 3px rgb(0, 0, 0);
            }
        }
    }
</style>
