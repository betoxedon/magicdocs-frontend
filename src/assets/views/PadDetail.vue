<script setup>
import { useRoute } from 'vue-router';
const route = useRoute()
</script>

<template>
<div class="pad_container">
    <iframe :src="`https://etherpad.dev.magicdocs.com.br/p/${route.query.pad_id}`" style="max-width: 1024px;" width="100%" height="100%"></iframe>
</div>
</template>

<style scoped>
.pad_container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
}
</style>