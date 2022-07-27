import { defineStore } from 'pinia'

import { TypeOfGenre, MovieRequest } from '../types/apiType'

export const storeTMDB = defineStore('store', () => {
    const allGenres: TypeOfGenre[] = []
    const aMovie: MovieRequest | null = null
    const moviesDisplay: MovieRequest[] = []

    return { allGenres, aMovie, moviesDisplay }
})
