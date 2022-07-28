import { defineStore } from 'pinia'
import API from '../services/api'
import { MovieRequest, TypeOfGenre } from '../types/apiType'

export const storeTMDB = defineStore('storeTMDB', {
    state: () => ({
        allGenres: [] as TypeOfGenre[],
        moviesDisplay: [] as MovieRequest[],
    }),
    actions: {
        async fetchSearchMovies(search: string) {
            const data = await API.searchBarMovieRequest(search)
            this.moviesDisplay = data
        },
    },
})
