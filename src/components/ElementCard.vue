<script setup lang="ts">
    import { onMounted } from 'vue'

    // import { Component, Prop, Vue } from 'vue-property-decorator';
    // import colorGenre from '@/utils/colorGenre';
    import { TypeOfGenre, MovieRequest, ColorToEachGenre } from '../types/apiType'
    // @Component
    // export default class ElementCard extends Vue {
    const props = defineProps<allInfosMovie>({
        // allInfosMovie: {
            // type: MovieRequest,
            default: '0'
        // }
    })

    // colorForGenre: ColorToEachGenre = colorGenre
    let filmInfo: MovieRequest | null = null


    onMounted(async () => {
        filmInfo = props.allInfosMovie
        if (props.allInfosMovie?.genre_ids !== undefined) {
            filmInfo.genres = this.whatGenreOfMovie(props.allInfosMovie.genre_ids)
        }
    })


    whatGenreOfMovie(idsOfGenres: number[]) {
        const listGenre: TypeOfGenre[] = []
        idsOfGenres.forEach(genreOfMovie => {
            // const allOffGenres:TypeOfGenre[] = this.$store.state.genres      // vuex
            allOffGenres.find(genreOff =>  {
                if (genreOff.id === genreOfMovie) {
                    listGenre.push(genreOff)
                }
            })
        })
        return listGenre
    }
    // }
</script>

<template>
    <router-link :to="{ name: 'movie', params: { id: filmInfo.id } }" v-if="filmInfo">
        <div
            :style="{'background-image': `linear-gradient(to bottom, rgba(0, 0, 0, 0) -10%, #1f2223 100%), url('https://image.tmdb.org/t/p/w500/${filmInfo.poster_path}')`}"
        >
            <div>
                <div>
                    <ul>
                        <li v-for="genreMovie in filmInfo.genres"
                        :style="{'background-color': `${colorForGenre[genreMovie.name]}`}"
                        :key="genreMovie.id">{{ genreMovie.name }}</li>
                    </ul>
                </div>
                <h2>{{ filmInfo.title }}</h2>
                <div>
                    <img src="https://uxwing.com/wp-content/themes/uxwing/download/36-arts-graphic-shapes/star.png">
                    <span>{{ filmInfo.vote_average }}/10</span>
                </div>
            </div>
        </div>
    </router-link>
</template>
