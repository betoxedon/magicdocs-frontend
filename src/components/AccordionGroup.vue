<script setup>
</script>

<template>
    <div class="accordion">
        <slot></slot>
    </div>
</template>

<style scoped>
    .accordion {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        width: 100%;
        padding-right: 10px;
        gap: 10px;
        height: 100%;
    }
</style>