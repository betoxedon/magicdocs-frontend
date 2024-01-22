<script setup>
const props = defineProps(['title'])
</script>

<template>
    <h3>{{props.title}}</h3>
</template>

<style scoped>
    h3 {
        font-weight: 700;
        font-size: 2rem;
    }
</style>