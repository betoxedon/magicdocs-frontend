<script setup>
import RegisterForm from '../components/RegisterForm.vue';
</script>

<template>
    <div class="form-container" ref="container">
        <RegisterForm></RegisterForm>
    </div>
</template>

<style scoped>
.form-container {
    box-sizing: border-box;
    padding: 1rem;
    width: 100%;
    background-color: white;
    height: fit-content;
    -webkit-border-radius: 2rem;
    -moz-border-radius: 2rem;
    border-radius: 2rem;
    transition: all 1s ease-in-out;
    display: flex;
}


@media screen and (min-width: 1024px) {}

@media screen and (min-width: 768px) and (max-width: 1023px) {}

@media screen and (max-width: 767px) {}
</style>