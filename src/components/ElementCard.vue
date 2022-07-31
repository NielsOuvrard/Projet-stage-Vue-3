<script setup lang="ts">
    import { storeTMDB } from '../stores/storeMovie'
    import colorGenre from '../utils/colorGenre'
    import { MovieRequest, TypeOfGenre } from '../types/apiType'
    import { onMounted, ref } from 'vue'
    import { useI18n } from 'vue-i18n'

    interface Props {
        allInfosMovie: MovieRequest
    }

    const props = defineProps<Props>()

    const genres = ref<TypeOfGenre[]>()

    const { t } = useI18n({ useScope: 'global' })

    const store = storeTMDB()

    onMounted(() => {
        if (props.allInfosMovie?.genre_ids) {
            genres.value = whatGenreOfMovie(props.allInfosMovie.genre_ids)
        } else {
            genres.value = props.allInfosMovie.genres
        }
    })

    function whatGenreOfMovie(idsOfGenres: number[]) {
        const allOffGenres: TypeOfGenre[] = store.allGenres
        return allOffGenres.filter((genre) => idsOfGenres.includes(genre.id))
    }
</script>

<template>
    <RouterLink
        v-if="allInfosMovie"
        :to="{ name: 'movie', params: { id: allInfosMovie.id } }"
        class="card"
    >
        <div
            :style="{
                'background-image': `linear-gradient(to bottom, rgba(0, 0, 0, 0) -10%, #1f2223 100%), url('https://image.tmdb.org/t/p/w500/${allInfosMovie.poster_path}')`,
            }"
            class="card__background"
        >
            <div class="card__content">
                <div class="card__genres">
                    <ul>
                        <li
                            v-for="genreMovie in genres"
                            :key="genreMovie.id"
                            :style="{
                                'background-color': `${
                                    colorGenre[genreMovie.id as keyof typeof colorGenre]
                                }`,
                            }"
                            class="card__genre"
                        >
                            {{ genreMovie.name }}
                        </li>
                    </ul>
                </div>
                <h2 class="card__title">{{ allInfosMovie.title }}</h2>
                <div class="carad__avaliation">
                    <img
                        class="card__star-icon"
                        src="https://uxwing.com/wp-content/themes/uxwing/download/36-arts-graphic-shapes/star.png"
                    />
                    <span class="card__rating">
                        {{ allInfosMovie.vote_average }}{{ t('inTen') }}
                    </span>
                </div>
            </div>
        </div>
    </RouterLink>
</template>

<style lang="scss" scoped>
    .card {
        color: white;
        text-shadow: 0.1875em 0.0625em 0.4375em black;
        margin: 0;

        &:hover {
            color: #f7f846;
        }

        &__background {
            margin: 1em;
            width: 15.625em;
            height: 23.4375em;
            border-radius: 0.625em;
            box-shadow: 0.125em 0.3125em 0.625em black;
            background-size: cover;
            position: relative;
            transition: box-shadow 0.2s;
            &:hover {
                box-shadow: 0.125em 0.3125em 0.625em rgb(34, 34, 34);
            }
        }

        &__content {
            position: absolute;
            padding-bottom: 1.25em;
            left: 0;
            bottom: 0;
        }

        &__genres {
            color: white;
            font-weight: bold;
            font-size: 1.0625em;
        }

        &__genre {
            border-radius: 0.4em;
            padding: 0.15em;
            margin: 0.2em;
            display: inline-block;
            text-align: left;
            list-style: none;
        }

        &__title {
            padding-left: 0.9375em;
            font-size: 1.375em;
        }

        &__avaliation {
            display: flex;
            margin-top: 0.5em;
            align-items: center;
            color: white;
        }

        &__star-icon {
            width: 1.1em;
            margin-left: 1em;
            filter: drop-shadow(0.1875em 0.125em 0.125em #222);
        }

        &__rating {
            color: white;
            margin-left: 0.2em;
            font-weight: bold;
            filter: drop-shadow(0.1875em 0.125em 0.125em #222);
            font-size: 1.0625em;
        }
    }
</style>
