import { defineStore } from 'pinia'
import { MovieRequest, TypeOfGenre } from '../types/apiType'
import API from '../services/api'

interface State {
    allGenres: TypeOfGenre[]
    moviesDisplay?: MovieRequest[]
}

export const storeTMDB = defineStore('storeTMDB', {
    state: (): State => ({
        allGenres: [],
        moviesDisplay: [],
    }),
    getters: {},
    actions: {
        async setAllGenres() {
            this.allGenres = await API.getListOfAllGenreRequest()
        },
        async setMovieList(movieList?: MovieRequest[]) {
            this.moviesDisplay = movieList
        },
    },
})
