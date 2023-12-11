<script setup>
import { ref } from 'vue';

const action = ref('pesquisar_jurisprudencia')
</script>

<template>
    <div id="search_container">
        <div id="search_bar">
            <select v-model="action" name="" id="">
                <option v-bind:value="'pesquisar_jurisprudencia'" selected>Pesquisar</option>
                <option value="encurtar">Encurtar</option>
            </select>
            <input type="search" placeholder="Pesquisar">
            <font-awesome-icon class="icon" icon="search" size="xl" @click="closeModal"/>
        </div>
        <div id="search_response">

        </div>
    </div>
</template>

<style scoped>
#search_bar{
    max-width: 1024px;
    width: 100%;
    height: 6rem;
    margin: 0 auto 2rem auto;
    box-sizing: border-box;
    padding: 1rem;
    background-color: var(--color-ai-secondary);
    align-items: center;
    display: flex;
    position: relative;
    -webkit-border-radius: 1rem;
    -moz-border-radius: 1rem;
    border-radius: 1rem;
    gap: 1rem;
}

#search_bar input {
    width: 100%;
    height: 100%;
    -webkit-border-radius: 1rem;
    -moz-border-radius: 1rem;
    border-radius: 1rem;
    outline: none;
    border: none;
    padding: 2rem;
}

#search_bar select {
    width: fit-content;
    height: 100%;
    -webkit-border-radius: 1rem;
    -moz-border-radius: 1rem;
    border-radius: 1rem;
    outline: none;
    border: none;
    padding: 2rem;
}

.icon {
    position: absolute;
    right: 2rem;
}
</style>