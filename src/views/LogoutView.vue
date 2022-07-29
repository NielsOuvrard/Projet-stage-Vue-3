<script setup lang="ts">
    import { onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import { userStore } from '../store/userStore'
    import { useI18n } from 'vue-i18n'

    const { t } = useI18n({ useScope: 'global' })

    const router = useRouter()
    const store = userStore()

    onMounted(() => {
        alert(t('disconnected'))
        store.setUserDesconnection()
        router.push('/login')
    })
</script>

<template>
    <div></div>
</template>
