<script setup>
    const props = defineProps(['modelValue', 'label'])
    const emits = defineEmits(['click'])
</script>

<template>
    <button @click="emits('click')" type="button">{{ props.label }}</button>
</template>

<style scoped>
    button {
        background-color: var(--color-primary);
        color: var(--color-neutral);
        border: .1px solid var(--color-primary);
        height: 4rem;
        padding: 0 1rem;
        border-radius: 5px;
        outline: none;
        cursor: pointer;
    }
</style>