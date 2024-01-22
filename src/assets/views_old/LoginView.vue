<script setup>
import loginForm from '../components/LoginForm.vue';
</script>

<template>
    <div class="form-container">
        <loginForm></loginForm>
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


.form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all .5s ease-in-out;
}

.form img {
    transition: all 1s ease-in-out;
}

@media screen and (min-width: 1024px) {}

@media screen and (min-width: 768px) and (max-width: 1023px) {}

@media screen and (max-width: 767px) {}
</style>