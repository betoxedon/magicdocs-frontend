<script setup>
import RegisterForm from '../components_old/RegisterForm.vue';
import containerComponent from '../components/containerComponent.vue';
</script>

<template>
    <div class="page">
        <containerComponent>
            <template v-slot:content>
                <RegisterForm></RegisterForm>
            </template>
        </containerComponent>
    </div>
</template>

<style scoped>
    .page {
        width: 100%;
        height: 100%;
        padding: 3rem;
        background-color: var(--color-secondary);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    form   {
        display: flex;
        flex-direction: column;
        background-color: var(--color-neutral);
        max-width: 640px;
        min-width: 300px;
        width: 100%;
        height: fit-content;
        padding: 2rem;
        border-radius: 1rem;
        gap: 2rem;
    }

    .title {
        font-size: 3rem;
    }

    .row {
        display: flex;
        gap: 1rem;
    }
</style>