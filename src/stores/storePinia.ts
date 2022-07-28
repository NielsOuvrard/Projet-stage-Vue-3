import { defineStore } from 'pinia'

export const storeTMDB = defineStore('storeTMDB', {
    state: () => ({
        allGenres: [],
        moviesDisplay: [],
    }),
})
