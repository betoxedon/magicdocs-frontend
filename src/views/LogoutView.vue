<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'
const router = useRouter()
const { logout } = useUserStore()
onMounted(() => {
  logout()
  router.push({ name: 'Home' })
})
</script>

<template>
  <div></div>
</template>

<style></style>
