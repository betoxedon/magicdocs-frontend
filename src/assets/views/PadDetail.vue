<script setup>
import { useRoute } from 'vue-router';
import searchBar from '../components/searchBar.vue';
const route = useRoute()
</script>

<template>
<div class="pad_container">
    <!-- <searchBar></searchBar> -->
    <iframe :src="`https://etherpad.dev.magicdocs.com.br/p/${route.query.pad_id}`" width="100%" height="100%"></iframe>
</div>
</template>

<style scoped>
.pad_container {
    width: 100%;
    height: 100%;
}
</style>