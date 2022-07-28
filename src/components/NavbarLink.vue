<script setup lang="ts">
    import { useI18n } from 'vue-i18n'

    interface Props {
        link: string
    }

    defineProps<Props>()

    const { t } = useI18n({ useScope: 'global' })
</script>

<template>
    <div class="navbar-links">
        <RouterLink class="navbar-links__path" :to="{ name: link }">
            {{ t(link) }}
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
