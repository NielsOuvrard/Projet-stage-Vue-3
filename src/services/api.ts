import axios from 'axios'
import {
    TypeOfGenre,
    MovieRequest,
    CreditsFromMovie,
    ActorInfo,
} from '../types/apiType'

const themovieDb = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    params: {
        api_key: 'b727df34ebe5c889191806b447bf57d2',
    },
})

class API {
    static async homePageMovieRequest(): Promise<MovieRequest[]> {
        const response = await themovieDb.get(`discover/movie`)
        return response.data.results
    }

    static async movieRequestFromSpecificGenre(
        id_genre: number
    ): Promise<MovieRequest[]> {
        const response = await themovieDb.get('discover/movie', {
            params: { with_genres: id_genre },
        })
        return response.data.results
    }

    static async specificActorInfoRequest(id: number): Promise<ActorInfo> {
        const response = await themovieDb.get(`person/${id}`)
        return response.data
    }

    static async specificMovieInfoRequest(id: number): Promise<MovieRequest> {
        const response = await themovieDb.get(`movie/${id}`)
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
        id_movie: number
    ): Promise<CreditsFromMovie[]> {
        const response = await themovieDb.get(`movie/${id_movie}/credits`)
        return response.data.cast
    }

    static async allMoviesFromActorRequest(
        id_actor: number
    ): Promise<MovieRequest[]> {
        const response = await themovieDb.get(
            `person/${id_actor}/movie_credits`
        )
        return response.data.cast
    }
}

export default API
