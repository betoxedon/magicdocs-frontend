<script setup>
    const props = defineProps(['modelValue'])
    const emits = defineEmits(['update:modelValue'])
</script>

<template>
    <input type="text" :value="props.modelValue" @input="emits('update:modelValue', $event.target.value)">
</template>

<style scoped>
    input {
        border: .1px solid var(--color-primary);
        height: 4rem;
        padding: 0 1rem;
        border-radius: 5px;
        outline: none;
    }
</style>