export type ListMovieRequest = {
    adult: boolean
    backdrop_path?: string
    genre_ids: number[]
    id?: number
    original_language?: string
    original_title?: string
    overview?: string
    popularity?: Float32Array
    poster_path?: string
    release_date?: string
    title?: string
    video?: boolean
    vote_average?: Float32Array
    vote_count?: number
}

export type MovieRequest = {
    adult: boolean
    backdrop_path: string
    genres: GenreMovie[]
    genre_ids: number[] // uniquement pour ElementCard
    id: number
    original_language?: string
    original_title?: string
    overview: string
    popularity: Float32Array
    poster_path: string
    release_date: string
    title: string
    video: boolean
    vote_average: Float32Array
    vote_count: number
}

export type actorCast = {
    cast: []
}

export type CreditMovie = {
    adult?: boolean
    gender?: number
    id: number
    known_for_department?: string
    name: string
    original_name: string
    popularity?: Float32Array
    profile_path?: string
    cast_id?: number
    character: string
    credit_id?: number
}

export type Credit = {
    birthday?: string
    known_for_department?: string
    deathday?: string
    id: number
    name?: string
    also_known_as?: string[]
    gender?: number
    biography?: string
    popularity?: Float32Array
    place_of_birth?: string
    profile_path?: string
    adult?: string
    imdb_id?: string
    homepage?: string
}

export type GenreMovie = {
    id: number
    name: GenreName
}

export type User = {
    email: string
    username: string
    password: string
}

export type MyListType = {
    id: number
}

export type Register = {
    username: string
    email: string
    password: string
    bornDate: string
    avatar: string
}

export type Color = Record<GenreName, string>

export type GenreName =
    | 'Action'
    | 'Adventure'
    | 'Animation'
    | 'Comedy'
    | 'Crime'
    | 'Documentary'
    | 'Drama'
    | 'Family'
    | 'Fantasy'
    | 'History'
    | 'Horror'
    | 'Music'
    | 'Mystery'
    | 'Romance'
    | 'Science Fiction'
    | 'TV Movie'
    | 'Thriller'
    | 'War'
    | 'Western'
