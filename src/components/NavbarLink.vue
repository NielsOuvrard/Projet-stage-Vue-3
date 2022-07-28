<script setup lang="ts">
    import { useI18n } from 'vue-i18n'
    import { userStore } from '../store/userStore'

    interface Props {
        link: string
    }

    const props = defineProps<Props>()

    const store = userStore()

    function checkUserConnected() {
        if (store.userConnected !== null) {
            if (props.link === 'login' || props.link === 'register') {
                return false
            } else {
                return true
            }
        } else {
            if (props.link !== 'watchList' && props.link !== 'logout')
                return true
        }
    }

    const { t } = useI18n({ useScope: 'global' })
</script>

<template>
    <div v-if="checkUserConnected()" class="navbar-links">
        <RouterLink class="navbar-links__path" :to="{ name: link }">
            {{ t(props.link) }}
        </RouterLink>
    </div>
</template>

<style lang="scss" scoped>
    .navbar-links {
        display: flex;

        &__path {
            color: black;
            font-size: 0.7em;
            font-weight: 600;
            text-decoration: none;
            margin: 0 0.5em;

            @media (min-width: 45em) {
                font-size: 1.1em;
            }
        }
    }
</style>
