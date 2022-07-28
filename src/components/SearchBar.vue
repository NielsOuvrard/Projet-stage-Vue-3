<script setup lang="ts">
    import { ref } from 'vue'
    import { storeTMDB } from '../stores/storePinia'
    import API from '../services/api'
    import { MovieRequest } from '../types/apiType'
    import { useI18n } from 'vue-i18n'
    import { useRouter } from 'vue-router'

    const inputRequest = ref('')
    const router = useRouter()

    // pas trouvé comment corrigé cette erreure, l'emit fonctionne cependant

    // eslint-disable-next-line vue/require-emit-validator
    const emit = defineEmits(['make-search'])
    async function requestMovieTest() {
        if (inputRequest.value) {
            const arrayMovies: MovieRequest[] = await API.searchBarMovieRequest(
                inputRequest.value
            )
            storeTMDB.moviesDisplay = arrayMovies
            router.push({ query: { search: inputRequest.value } })
            emit('make-search', inputRequest.value)
        }
    }
    const { t } = useI18n()
</script>

<template>
    <div>
        <input
            v-model="inputRequest"
            type="text"
            :placeholder="t('search')"
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
