import axios from 'axios'
import {
    TypeOfGenre,
    MovieRequest,
    CreditsFromMovie,
    ActorInfo,
} from '../types/apiType'
// import { useI18n } from 'vue-i18n'

// const { t } = useI18n()
// // eslint-disable-next-line no-console
// console.log(t('languageDate'))

const themovieDb = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    params: {
        api_key: 'b727df34ebe5c889191806b447bf57d2',
    },
})

class API {
    static async homePageMovieRequest(): Promise<MovieRequest[]> {
        const response = await themovieDb.get(`discover/movie`, {
            params: { language: 'en' },
        })
        return response.data.results
    }

    static async movieRequestFromSpecificGenre(
        idGenre: number
    ): Promise<MovieRequest[]> {
        const response = await themovieDb.get('discover/movie', {
            params: { with_genres: idGenre },
        })
        return response.data.results
    }

    static async specificActorInfoRequest(idActor: number): Promise<ActorInfo> {
        const response = await themovieDb.get(`person/${idActor}`)
        return response.data
    }

    static async specificMovieInfoRequest(
        idMovie: number
    ): Promise<MovieRequest> {
        const response = await themovieDb.get(`movie/${idMovie}`)
        return response.data
    }

    static async getListOfAllGenreRequest(): Promise<TypeOfGenre[]> {
        const response = await themovieDb.get(`genre/movie/list`)
        return response.data.genres
    }

    static async searchBarMovieRequest(
        request: string
    ): Promise<MovieRequest[]> {
        const response = await themovieDb.get('search/movie', {
            params: { query: request },
        })
        return response.data.results
    }

    static async allActorsFromMovieRequest(
        idMovie: number
    ): Promise<CreditsFromMovie[]> {
        const response = await themovieDb.get(`movie/${idMovie}/credits`)
        return response.data.cast
    }

    static async allMoviesFromActorRequest(
        idActor: number
    ): Promise<MovieRequest[]> {
        const response = await themovieDb.get(`person/${idActor}/movie_credits`)
        return response.data.cast
    }
}

export default API
