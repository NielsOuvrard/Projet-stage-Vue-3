import { defineStore } from 'pinia'
import { MovieRequest, TypeOfGenre } from '../types/apiType'

export const storeTMDB = defineStore('storeTMDB', {
    state: () => ({
        allGenres: [] as TypeOfGenre[],
        moviesDisplay: [] as MovieRequest[],
    }),
})
