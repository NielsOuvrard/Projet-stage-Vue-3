export type ListMovieRequest = {
    adult: boolean
    backdrop_path: string
    genre_ids: number[]
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}

export type MovieRequest = {
    adult: boolean
    backdrop_path: string
    genres: TypeOfGenre[]
    genre_ids: number[] // uniquement pour ElementCard
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}

export type CreditsFromMovie = {
    adult: boolean
    gender: number
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path: string
    cast_id: number
    character: string
    credit_id: number
}

export type ActorInfo = {
    birthday: string
    known_for_department: string
    deathday: string
    id: number
    name: string
    also_known_as: string[]
    gender: number
    biography: string
    popularity: number
    place_of_birth: string
    profile_path: string
    adult: string
    imdb_id: string
    homepage: string
}

export type TypeOfGenre = {
    id: number
    name: allTypesOfGenres
}

export type UserLoginSetup = {
    email: string
    username: string
    password: string
}

export type MyListOfFilms = {
    id: number
}

export type RegisterSetup = {
    username: string
    email: string
    password: string
    bornDate: string
    avatar: string
}

export type ColorToEachGenre = Record<allTypesOfGenres, string>

export type allTypesOfGenres =
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
