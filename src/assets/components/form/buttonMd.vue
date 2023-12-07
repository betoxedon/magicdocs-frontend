<script setup>
const props = defineProps({
    type: {
        default: 'button',
        type: String
    },
    id: {
        default: 'id',
        type: String
    },
    label: {
        type: String,
        default: 'Label'
    },
    icon: {
        type: String
    }
})
const emit = defineEmits(['click'])
</script>

<template>
    <button @click="emit('click')" :type="props.type">{{ props.label }}</button>
</template>

<style scoped>
    button {
        border: none;
        color: var(--color-primary);
        background-color: var(--color-neutral);
        padding: .5rem 2rem;
        width: 100%;
        cursor: pointer;
        font-weight: 500;
        font-family: 'Rubik';
        margin-bottom: 1rem;
    }
</style>
