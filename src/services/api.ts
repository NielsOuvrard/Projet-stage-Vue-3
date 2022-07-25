import axios from 'axios'
import {
    ListMovieRequest,
    GenreMovie,
    MovieRequest,
    CreditMovie,
    Credit,
} from '../types/apiType'

const url = 'https://api.themoviedb.org/3/'
const key = '?api_key=b727df34ebe5c889191806b447bf57d2'

class API {
    static async homeMenuDiscoverRequest(): Promise<ListMovieRequest[]> {
        const response = await axios.get(`${url}discover/movie${key}`)
        return response.data.results
    }

    static async homeMenuDiscoverRequestGenre(
        id_genre: number
    ): Promise<ListMovieRequest[]> {
        const response = await axios.get(
            `${url}discover/movie${key}&with_genres=${id_genre}`
        )
        return response.data.results
    }

    static async actorDiscoverRequest(id: number): Promise<Credit> {
        const response = await axios.get(`${url}person/${id}${key}`)
        return response.data
    }

    static async movieDiscoverRequest(id: number): Promise<MovieRequest> {
        const response = await axios.get(`${url}movie/${id}${key}`)
        return response.data
    }

    static async genreDiscoverRequest(): Promise<GenreMovie[]> {
        const response = await axios.get(`${url}genre/movie/list${key}`)
        return response.data.genres
    }

    static async searchMovieRequest(
        request: string
    ): Promise<ListMovieRequest[]> {
        const response = await axios.get(
            `${url}search/movie${key}&query=${request}`
        )
        return response.data.results
    }

    static async actorInMovieRequest(id_movie: number): Promise<CreditMovie[]> {
        // return all persons of a movie
        const response = await axios.get(
            `${url}movie/${id_movie}/credits${key}`
        )
        return response.data.cast
    }

    static async movieOfActorRequest(id_actor: number): Promise<MovieRequest[]> {
        // return all movies of a person
        const response = await axios.get(
            `${url}person/${id_actor}/movie_credits${key}`
        )
        return response.data.cast
    }
}

export default API

// export default API
