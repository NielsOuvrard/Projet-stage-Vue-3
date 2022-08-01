import { defineStore } from 'pinia'
import { TypeOfGenre } from '../types/apiType'
import API from '../services/api'

interface State {
    allGenres: TypeOfGenre[]
}

export const storeTMDB = defineStore('storeTMDB', {
    state: (): State => ({
        allGenres: [],
    }),
    getters: {},
    actions: {
        async setAllGenres() {
            this.allGenres = await API.getListOfAllGenreRequest()
        },
    },
})
