<script setup lang="ts">
    import { storeTMDB } from '../stores/storePinia'
    import colorAccordingId from '../utils/colorGenre'
    import { MovieRequest, TypeOfGenre } from '../types/apiType'
    import { onMounted, ref } from 'vue'
    import { RouteName } from '../utils/RouteAttr'

    interface Props {
        allInfosMovie: MovieRequest
    }
    const props = defineProps<Props>()
    const genres = ref<TypeOfGenre[] | null>()

    onMounted(() => {
        if (props.allInfosMovie?.genre_ids) {
            genres.value = whatGenreOfMovie(props.allInfosMovie.genre_ids)
        } else {
            genres.value = props.allInfosMovie.genres
        }
    })

    function whatGenreOfMovie(idsOfGenres: number[]) {
        const allOffGenres: TypeOfGenre[] = storeTMDB.allGenres.value
        return allOffGenres.filter((genre) => idsOfGenres.includes(genre.id))
    }
</script>

<template>
    <RouterLink
        v-if="allInfosMovie"
        :to="{ name: RouteName.MOVIE, params: { id: allInfosMovie.id } }"
        class="router-link"
    >
        <div
            :style="{
                'background-image': `linear-gradient(to bottom, rgba(0, 0, 0, 0) -10%, #1f2223 100%), url('https://image.tmdb.org/t/p/w500/${allInfosMovie.poster_path}')`,
            }"
            class="router-link__card-movie"
        >
            <div class="router-link__card-movie__card-content">
                <div class="router-link__card-movie__card-content__genre-list">
                    <ul>
                        <li
                            v-for="genreMovie in genres"
                            :key="genreMovie.id"
                            :style="{
                                'background-color': `${colorAccordingId(
                                    genreMovie.id
                                )}`,
                            }"
                            class="router-link__card-movie__card-content__genre-list__genre-item"
                        >
                            {{ genreMovie.name }}
                        </li>
                    </ul>
                </div>
                <h2 class="router-link__card-movie__card-content__title">
                    {{ allInfosMovie.title }}
                </h2>
                <div class="router-link__card-movie__card-content__film-note">
                    <img
                        class="router-link__card-movie__card-content__film-note__star-icon"
                        src="https://uxwing.com/wp-content/themes/uxwing/download/36-arts-graphic-shapes/star.png"
                    />
                    <span
                        class="router-link__card-movie__card-content__film-note__note"
                    >
                        {{ allInfosMovie.vote_average }}
                    </span>
                </div>
            </div>
        </div>
    </RouterLink>
</template>

<style lang="scss" scoped>
    .router-link {
        color: white;
        text-shadow: 0.3em 0.1em 0.7em black;
        &:hover {
            color: #f7f846;
        }
        @media (max-width: 720px) {
            margin: 0;
        }
        &__card-movie {
            margin: 1em;
            width: 15em;
            height: 22.5em;
            border-radius: 0.5em;
            box-shadow: 0.2em 0.5em 1em black;
            background-size: cover;
            position: relative;
            transition: box-shadow 0.2s;
            &:hover {
                box-shadow: 0.2em 0.5em 1em rgb(34, 34, 34);
            }
            &__card-content {
                position: absolute;
                padding-bottom: 1em;
                left: 0;
                bottom: 0;
                &__genre-list {
                    color: white;
                    font-weight: bold;
                    font-size: 0.9em;
                    &__genre-item {
                        border-radius: 0.4em;
                        padding: 0.15em;
                        margin: 0.2em;
                        display: inline-block;
                        text-align: left;
                        list-style: none;
                    }
                }
                &__title {
                    padding-left: 0.9em;
                    font-size: 1.32em;
                }
                &__film-note {
                    display: flex;
                    margin-top: 0.5em;
                    align-items: center;
                    color: white;
                    &__star-icon {
                        width: 1.1em;
                        margin-left: 1em;
                        filter: drop-shadow(0.3em 0.2em 0.2em #222);
                    }
                    &__note {
                        margin-left: 0.2em;
                        font-weight: bold;
                        filter: drop-shadow(0.3em 0.2em 0.2em #222);
                        font-size: 1.02em;
                    }
                }
            }
        }
    }
</style>
