<script setup lang="ts">
    import { ref } from 'vue'
    import { useI18n } from 'vue-i18n'
    import { useRouter } from 'vue-router'

    const inputRequest = ref('')

    const router = useRouter()

    const { t } = useI18n()

    const emit = defineEmits<{
        (e: 'make-search', search: string): void
    }>()

    async function requestMovieTest() {
        if (inputRequest.value) {
            router.push({ query: { search: inputRequest.value } })
            emit('make-search', inputRequest.value)
        }
    }
</script>

<template>
    <div class="div-search-bar">
        <input
            v-model="inputRequest"
            type="text"
            :placeholder="t('search')"
            class="search-term"
            @keyup.enter="requestMovieTest"
        />
    </div>
</template>

<style lang="scss">
    .div-search-bar {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .search-term {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50em;
        border: none;
        outline: none;
        color: white;
        border-radius: 0.5em;
        background-color: #393e46;
        margin: 1em;
        padding: 1em;
        background-image: linear-gradient(white, whitesmoke);
        background-position: bottom 0.5em center;
        background-size: calc(100% - 1em) 0.2em;
        background-repeat: no-repeat;
        @media (max-width: 720px) {
            width: 20em;
        }
    }
</style>
