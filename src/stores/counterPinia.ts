import { defineStore } from 'pinia'
// import { ref } from 'vue'

import { TypeOfGenre, MovieRequest } from '../types/apiType'

// export const useCounterStore = defineStore('counter', {
//     state: () => {
//         return { count: 0 }
//     },
//     // could also be defined as
//     // state: () => ({ count: 0 })
//     actions: {
//         increment() {
//             this.count++
//         },
//     },
// })

export const storeTMDB = defineStore('store', () => {
    const allGenres: TypeOfGenre[] = []
    const aMovie: MovieRequest | null = null
    // const count = ref(0)
    // function increment() {
    //     count.value++
    // }

    return { allGenres, aMovie }
})
