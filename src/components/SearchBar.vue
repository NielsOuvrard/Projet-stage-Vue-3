<script setup lang="ts">
    import { ref } from 'vue'
    // import { storeTMDB } from '../stores/counterPinia'
    // import API from '../services/api'

    const inputRequest = ref('')
    let inputRequest2 = ''

    function requestMovieTest() {
        // eslint-disable-next-line no-console
        console.log(inputRequest2)
        inputRequest2 = 'f'
        if (inputRequest.value) {
            // storeTMDB.searchWords = await API.searchBarMovieRequest(
            //     inputRequest.value
            // )
        }
    }
</script>

<template>
    <div>
        <!-- Remplacer search i18n -->
        <input
            type="text"
            :v-model="inputRequest2"
            placeholder="Search"
            class="searchTerm"
            @keyup.enter="requestMovieTest"
        />
        <button type="submit" @click="requestMovieTest">BUTTON</button>
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
