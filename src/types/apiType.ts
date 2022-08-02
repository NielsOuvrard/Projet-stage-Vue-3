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

export type RequestSpecifiqueCredits = {
    id: number
    cast: CreditsFromMovie[]
    crew: CreditsFromMovie[]
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
    job: string
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

export type RegisterSetup = {
    username: string
    email: string
    password: string
    bornDate: string
    avatar: string
}

export type allTypesOfGenres =
    | 28
    | 12
    | 16
    | 35
    | 80
    | 99
    | 18
    | 10751
    | 14
    | 36
    | 27
    | 10402
    | 9648
    | 10749
    | 878
    | 10770
    | 53
    | 10752
    | 37
