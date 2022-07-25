<script setup lang="ts">
    import { useI18n } from 'vue-i18n'

    defineProps({
        link: {
            type: String,
            default: 'Home',
        },
    })

    const { t } = useI18n()
</script>

<template>
    <div class="routerView">
        <RouterLink class="routerView__link" :to="{ name: link }">{{
            t(link)
        }}</RouterLink>
    </div>
</template>

<style lang="scss" scoped>
    .routerView {
        display: flex;

        &__link {
            color: black;
            font-weight: 600;
            text-decoration: none;
            margin: 0 0.5em 0 0.5em;
        }
    }
</style>
