import { defineStore } from 'pinia'
import { MyListOfFilms } from '../types/watchlistType'

interface State {
    title: string | null
    watchList: MyListOfFilms[]
}

export const watchlistStore = defineStore('user', {
    state: (): State => ({
        title: localStorage.getItem('title'),
        watchList: JSON.parse(localStorage.getItem('watchList') || '[]'),
    }),
    getters: {},
    actions: {
        setMovieToWatchList(newFilm: MyListOfFilms) {
            this.watchList?.push(newFilm)
            localStorage.setItem('watchList', JSON.stringify(this.watchList))
        },
        deleteMovieFromWatchList(filmId: number) {
            this.watchList = this.watchList.filter(
                (film: MyListOfFilms) => film.id != filmId
            )
            localStorage.setItem('watchList', JSON.stringify(this.watchList))
        },
    },
})
