<script setup>
import { ref } from 'vue';
import aiApp from '../../api/ai.js'
// const action = ref('pesquisar_jurisprudencia')
const query = ref('')
const response = ref('')
const showModal = ref(true)
async function search(){
    showModal.value = true
    let res = await aiApp.jurisprudencia(query.value)
    response.value = res
}
</script>

<template>
    <div id="search_container">
        <div id="search_bar">
            <!-- <select v-model="action" name="" id="">
                <option v-bind:value="'pesquisar_jurisprudencia'" selected>Pesquisar</option>
                <option value="encurtar">Encurtar</option>
            </select> -->
            <input type="search" placeholder="Pesquisar" v-model="query" @keypress.enter="search">
            <font-awesome-icon class="icon" icon="search" size="xl" @click="search"/>
        </div>
        <div id="search_response" v-if="showModal">
            {{ response ? response : 'Carregando...' }}<span id="cursor"></span> 
            <font-awesome-icon class="icon" icon="times" size="xl" @click="search"/>
        </div>
    </div>
</template>

<style scoped>
#search_container {
    position: relative;
}

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

#search_response {
    max-width: 1024px;
    width: 100%;
    height: fit-content;
    margin: 0 auto 0 auto;
    box-sizing: border-box;
    padding: 2rem;
    background-color: var(--color-ai-terciary);
    align-items: center;
    display: flex;
    justify-content: flex-start;
    position: absolute;
    -webkit-border-radius: 1rem;
    -moz-border-radius: 1rem;
    border-radius: 1rem;
    color: var(--color-ai-primary);
}

#search_response .icon {
    position: absolute;
    right: 2rem;
    top: 2rem;
    color: var(--color-ai-primary);
}

#cursor {
    height: 1.5rem;
    width: 2px;
    background-color: black;
    transition: all .5s ease-in-out;
    animation: blink .8s linear infinite;
}
@keyframes blink {
    50% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

</style>