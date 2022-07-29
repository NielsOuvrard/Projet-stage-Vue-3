<script setup lang="ts">
    import { useI18n } from 'vue-i18n'
    import { userStore } from '../store/userStore'
    import { computed } from 'vue'

    interface Props {
        link: string
    }
    const props = defineProps<Props>()

    const { t } = useI18n({ useScope: 'global' })

    const store = userStore()

    const checkUserConnected = computed(() => {
        if (store.userConnected !== null) {
            if (props.link === 'login' || props.link === 'register') {
                return false
            } else {
                return true
            }
        } else {
            if (props.link !== 'watchList' && props.link !== 'logout') {
                return true
            } else {
                return false
            }
        }
    })
</script>

<template>
    <div v-if="checkUserConnected" class="navbar-links">
        <RouterLink class="navbar-links__path" :to="{ name: link }">
            {{ t(link) }}
        </RouterLink>
    </div>
</template>

<style lang="scss" scoped>
    $font-color: #4b494e;
    $border: #4b494e;
    .navbar-links {
        display: flex;
        text-transform: uppercase;
        border: 0.1875em solid $border;
        border-radius: 2em;
        transition: transform 0.2s;
        padding: 0.3em 0.5em;
        margin: 0 0 0 0.2em;
        transition-timing-function: cubic-bezier(0.45, -0.85, 0.55, -0.45);

        @media (min-width: 45em) {
            padding: 0.3em 0.85em;
            margin: 0 0 0 0.8em;
        }

        &:visited {
            color: $font-color;
        }

        &:hover {
            transform: scale(1.1);
            background: linear-gradient(315deg, #045de9 0%, #09c6f9 74%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        &__path {
            color: $font-color;
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
