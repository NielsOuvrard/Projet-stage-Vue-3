<script setup lang="ts">
    // import { Component, Prop, Vue } from 'vue-property-decorator';
    // import colorGenre from '@/utils/colorGenre';
    import { GenreMovie, SoloMovie, Color } from '@/types/apiType'

    // @Component
    // export default class ElementCard extends Vue {
    colorForGenre: Color = colorGenre
    filmInfo: SoloMovie | null = null


    defineProps<{
        allInfosMovie!: SoloMovie
    }>()

    
    onMounted(async () => {

        this.filmInfo = this.allInfosMovie
        if (this.allInfosMovie?.genre_ids !== undefined) {
            this.filmInfo.genres = this.whatGenreOfMovie(this.allInfosMovie.genre_ids)
        }
    }
    whatGenreOfMovie(ids: number[]) {
        const listGenre: GenreMovie[] = []
        ids.forEach(genreOfMovie => {
            const allOffGenres:GenreMovie[] = this.$store.state.genres
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
