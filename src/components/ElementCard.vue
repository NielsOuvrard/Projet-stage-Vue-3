<script setup lang="ts">
    // import { onMounted } from 'vue'

    // import { Component, Prop, Vue } from 'vue-property-decorator';
    // import colorGenre from '@/utils/colorGenre';
    import { MovieRequest } from '../types/apiType'

    interface Props {
        allInfosMovie: MovieRequest
    }

    defineProps<Props>()
    // let filmInfo: MovieRequest | null = null

    // colorForGenre: ColorToEachGenre = colorGenre

    // onMounted(async () => {
    // filmInfo = this.allInfosMovie
    // if (this.allInfosMovie?.genre_ids !== undefined) {
    //     filmInfo.genres = this.whatGenreOfMovie(this.allInfosMovie.genre_ids)
    // }
    // })

    // whatGenreOfMovie(idsOfGenres: number[]) {
    //     const listGenre: TypeOfGenre[] = []
    //     idsOfGenres.forEach(genreOfMovie => {
    //         // const allOffGenres:TypeOfGenre[] = this.$store.state.genres      // vuex
    //         allOffGenres.find(genreOff =>  {
    //             if (genreOff.id === genreOfMovie) {
    //                 listGenre.push(genreOff)
    //             }
    //         })
    //     })
    //     return listGenre
    // }
    // }
</script>

<template>
    <div
        v-if="allInfosMovie"
        :to="{ name: 'movie', params: { id: allInfosMovie.id } }"
        class="router-link"
    >
        <div
            :style="{
                'background-image': `linear-gradient(to bottom, rgba(0, 0, 0, 0) -10%, #1f2223 100%), url('https://image.tmdb.org/t/p/w500/${allInfosMovie.poster_path}')`,
            }"
            class="cardMovie"
        >
            <div class="cardContent">
                <div class="genreList">
                    <!--
                        <ul>
                        <li v-for="genreMovie in allInfosMovie.genres"
                        :style="{'background-color': `${colorForGenre[genreMovie.name]}`}"
                        :key="genreMovie.id">{{ genreMovie.name }}</li>
                        </ul>
                    -->
                </div>
                <h2 class="title">{{ allInfosMovie.title }}</h2>
                <div class="filmNote">
                    <img
                        class="starIcon"
                        src="https://uxwing.com/wp-content/themes/uxwing/download/36-arts-graphic-shapes/star.png"
                    >
                    <span class="note">
                        {{ allInfosMovie.vote_average }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .router-link {
        color: white;
        text-shadow: 3px 1px 7px black;
        &:hover {
            color: #f7f846;
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

            .cardContent{
                position: absolute;
                padding-bottom: 20px;
                left: 0;
                bottom: 0;
                .genreList {
                    color: white;
                    font-weight: bold;
                    font-size: 17px;

                    ul {
                        padding: 0;
                        margin: 0;
                    }
                    .genreItem {
                        border-radius: 0.4em;
                        padding: 0.15em;
                        margin: 0.2em;
                        display: inline-block;
                        text-align:left;
                        list-style: none;
                    }
                }
                .title {
                    padding-left: 15px;
                    font-size: 22px;
                }
                .filmNote{
                    display: flex;
                    margin-top: 0.5em;
                    align-items: center;
                    color: white;
                    .starIcon {
                        width: 1.1em;
                        margin-left: 1em;
                        filter: drop-shadow(3px 2px 2px #222);
                    }
                    .note {
                        margin-left: 0.2em;
                        font-weight: bold;
                        filter: drop-shadow(3px 2px 2px #222);
                        font-size: 17px;
                    }
                }
            }
        }
    }
    @media (max-width : 720px) {
        .router-link {
            margin: 0;
        }
    }
</style>