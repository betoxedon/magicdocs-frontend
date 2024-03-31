<script setup>
const props = defineProps({
    model: {
        type: Object
    }
})
</script>

<template>
    <div class="document-model">
        <font-awesome-icon icon="file-lines" />
        <div>{{ model.name }}</div>
    </div>
</template>

<style scoped>
.document-model {
    background-color: var(--color-primary-background);
    padding: 1rem;
    border-radius: 5px;
    transition: all .1s ease-in-out;
    display: flex;
    gap: 1rem;
}

.document-model:hover {
    cursor: pointer;
    transform: scale(1.01);
}
</style>