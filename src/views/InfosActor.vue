<script setup lang="ts">
    import ElementCard from '../components/ElementCard.vue'
    import API from '../services/api'
    import { onMounted, ref, watch } from 'vue'
    import { useRoute } from 'vue-router'
    import { useI18n } from 'vue-i18n'
    import { ActorInfo, MovieRequest } from '../types/apiType'
    import { useQuery } from 'vue-query'

    const actorInfo = ref<ActorInfo | null>()
    const listMovies = ref<MovieRequest[] | null>()

    const {
        isLoading: isLoading,
        isError: isError,
        error: errorMessage,
    } = useQuery(
        'movieHomeList',
        () => API.specificActorInfoRequest(parseInt(route.params.id as string)),
        {
            cacheTime: 500000,
        }
    )
    const { t, locale } = useI18n({ useScope: 'global' })
    const route = useRoute()

    onMounted(async () => {
        actorInfo.value = await API.specificActorInfoRequest(
            parseInt(route.params.id as string)
        )
        listMovies.value = await API.allMoviesFromActorRequest(
            parseInt(route.params.id as string)
        )
    })

    watch(locale, () => {
        actualise()
    })

    function dateAccordingLang(dateString: string) {
        const arrayDate: string[] | undefined = dateString.split('-')
        const date = new Date(
            parseInt(arrayDate[0]),
            parseInt(arrayDate[1]),
            parseInt(arrayDate[2])
        )
        return new Intl.DateTimeFormat(t('languageDate'), {
            dateStyle: 'long',
        }).format(date)
    }

    function checkImage(profile_path?: string) {
        if (profile_path) {
            return `https://image.tmdb.org/t/p/w500/${profile_path}`
        } else {
            return 'data:image/png;base64,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'
        }
    }

    async function actualise() {
        actorInfo.value = await API.specificActorInfoRequest(
            parseInt(route.params.id as string)
        )
        listMovies.value = await API.allMoviesFromActorRequest(
            parseInt(route.params.id as string)
        )
    }
</script>

<template>
    <div class="actor">
        <div v-if="isLoading" class="actor__loading"></div>
        <div v-else-if="isError">
            {{ t('errorOccured') }} {{ errorMessage }}
        </div>
        <div v-else-if="actorInfo" class="actor__up-page">
            <div class="actor__up-left">
                <h1 class="actor__name">
                    {{ actorInfo.name }}
                </h1>
                <img
                    class="actor__picture"
                    :src="checkImage(actorInfo.profile_path)"
                />
            </div>
            <div class="actor__up-right">
                <p v-if="actorInfo.birthday">
                    {{ t('birthday') }} :
                    {{ dateAccordingLang(actorInfo.birthday) }}
                </p>
                <p v-if="actorInfo.deathday">
                    {{ t('deathday') }} :
                    {{ dateAccordingLang(actorInfo.deathday) }}
                </p>
                <div>
                    <p>{{ actorInfo.biography }}</p>
                </div>
            </div>
            <div class="actor__movies">
                <div v-for="movie in listMovies" :key="movie.id">
                    <ElementCard :all-infos-movie="movie" />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .actor {
        display: flex;
        height: auto;
        justify-content: center;
        margin-left: 2em;
        margin-right: 2em;

        &__up-page {
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
        }

        &__up-right {
            color: rgb(232, 232, 232);
            justify-content: center;
            align-items: flex-start;
            border-radius: 2em;
            overflow: auto;
            text-align: justify;
            @media (min-width: 65em) {
                width: 40%;
                height: 20em;
                padding: 1.2em;
                margin: 1.8em;
            }
        }

        &__up-left {
            width: 40%;
            height: 20em;
            padding: 1.2em;
            margin: 1.8em;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border-radius: 2em;
            color: rgb(227, 227, 227);
        }

        &__name {
            justify-content: center;
            display: flex;
            font-family: Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif;
            @media (min-width: 45em) {
                margin-left: 4em;
                margin-right: 4em;
            }
        }

        &__picture {
            height: 17em;
            box-shadow: 0.2em 0.2em 0.5em rgb(0, 0, 0);
        }

        &__movies {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
        }

        &__loading {
            display: inline-block;
            width: 5em;
            height: 5em;

            &::after {
                content: ' ';
                display: block;
                width: 4em;
                height: 4em;
                margin: 0.5em;
                border-radius: 50%;
                border: 0.375em solid #fff;
                border-color: #fff transparent #fff transparent;
                animation: loading 1.2s linear infinite;
            }

            @keyframes loading {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(360deg);
                }
            }
        }
    }
</style>
