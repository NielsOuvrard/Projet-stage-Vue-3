<script setup lang="ts">
    import { ref } from 'vue'
    import { storeTMDB } from '../stores/storePinia'
    import API from '../services/api'
    import { MovieRequest } from '../types/apiType'

    const inputRequest = ref('')

    async function requestMovieTest() {
        const emit = defineEmits(['make-search'])
        if (inputRequest.value) {
            const arrayMovies: MovieRequest[] = await API.searchBarMovieRequest(
                inputRequest.value
            )
            storeTMDB.moviesDisplay = arrayMovies
            // eslint-disable-next-line no-console
            // console.log(storeTMDB.moviesDisplay)
            emit('make-search')
        }
    }
</script>

<template>
    <div>
        <!-- Remplacer search i18n -->
        <input
            v-model="inputRequest"
            type="text"
            placeholder="Search"
            class="searchTerm"
            @keyup.enter="requestMovieTest"
        />
    </div>
</template>

<style lang="scss">
    .searchTerm {
        width: 50em;
        border: none;
        outline: none;
        color: white;
        border-radius: 10px;
        background-color: #393e46;
        margin: 1em;
        padding: 1em;
        background-image: linear-gradient(white, whitesmoke);
        background-position: bottom 5px center;
        background-size: calc(100% - 10px) 2px;
        background-repeat: no-repeat;
        @media (max-width: 720px) {
            width: 20em;
        }
    }
</style>
