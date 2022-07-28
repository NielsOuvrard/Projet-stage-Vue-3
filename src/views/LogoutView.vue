<script setup lang="ts">
    import { onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import { userStore } from '../store/userStore'

    const router = useRouter()
    const store = userStore()

    onMounted(() => {
        alert('You are disconnected!')
        store.setUserDesconnection()
        router.push('/login')
    })
</script>
