<script setup lang="ts">
    import { storeTMDB } from '../stores/storePinia'
    import colorGenre from '../utils/colorGenre'
    import {
        MovieRequest,
        TypeOfGenre,
        ColorToEachGenre,
    } from '../types/apiType'
    import { onMounted, ref } from 'vue'

    interface Props {
        allInfosMovie: MovieRequest
    }
    const props = defineProps<Props>()
    const genres = ref()
    const colorForGenre: ColorToEachGenre = colorGenre

    onMounted(() => {
        if (props.allInfosMovie && props.allInfosMovie?.genre_ids) {
            genres.value = whatGenreOfMovie(props.allInfosMovie.genre_ids)
        } else {
            genres.value = props.allInfosMovie.genres
        }
    })

    function whatGenreOfMovie(idsOfGenres: number[]) {
        const allOffGenres: TypeOfGenre[] = storeTMDB.allGenres
            ._rawValue as TypeOfGenre[]
        return allOffGenres.filter((genre) => idsOfGenres.includes(genre.id))
    }
</script>

<template>
    <RouterLink
        v-if="allInfosMovie"
        :to="{ name: 'movie', params: { id: allInfosMovie.id } }"
        class="routerLink"
    >
        <div
            :style="{
                'background-image': `linear-gradient(to bottom, rgba(0, 0, 0, 0) -10%, #1f2223 100%), url('https://image.tmdb.org/t/p/w500/${allInfosMovie.poster_path}')`,
            }"
            class="cardMovie"
        >
            <div class="cardContent">
                <div class="cardContent__genreList">
                    <ul>
                        <li
                            v-for="genreMovie in genres"
                            :key="genreMovie.id"
                            :style="{
                                'background-color': `${
                                    colorForGenre[genreMovie.id]
                                }`,
                            }"
                            class="cardContent__genreList__genreItem"
                        >
                            {{ genreMovie.name }}
                        </li>
                    </ul>
                </div>
                <h2 class="cardContent__title">{{ allInfosMovie.title }}</h2>
                <div class="filmNote">
                    <img
                        class="filmNote__starIcon"
                        src="https://uxwing.com/wp-content/themes/uxwing/download/36-arts-graphic-shapes/star.png"
                    />
                    <span class="filmNote__note">
                        {{ allInfosMovie.vote_average }}
                    </span>
                </div>
            </div>
        </div>
    </RouterLink>
</template>

<style lang="scss" scoped>
    .routerLink {
        color: white;
        text-shadow: 3px 1px 7px black;
        &:hover {
            color: #f7f846;
        }
    }
    .cardMovie {
        margin: 1em;
        width: 250px;
        height: 375px;
        border-radius: 10px;
        box-shadow: 2px 5px 10px black;
        background-size: cover;
        position: relative;
        transition: box-shadow 0.2s;
        &:hover {
            box-shadow: 2px 5px 10px rgb(34, 34, 34);
        }
    }
    .cardContent {
        position: absolute;
        padding-bottom: 20px;
        left: 0;
        bottom: 0;
        &__genreList {
            color: white;
            font-weight: bold;
            font-size: 17px;
            &__genreItem {
                border-radius: 0.4em;
                padding: 0.15em;
                margin: 0.2em;
                display: inline-block;
                text-align: left;
                list-style: none;
            }
        }
        &__title {
            padding-left: 15px;
            font-size: 22px;
        }
    }
    .filmNote {
        display: flex;
        margin-top: 0.5em;
        align-items: center;
        color: white;
        &__starIcon {
            width: 1.1em;
            margin-left: 1em;
            filter: drop-shadow(3px 2px 2px #222);
        }
        &__note {
            margin-left: 0.2em;
            font-weight: bold;
            filter: drop-shadow(3px 2px 2px #222);
            font-size: 17px;
        }
    }
    @media (max-width: 720px) {
        .routerLink {
            margin: 0;
        }
    }
</style>
