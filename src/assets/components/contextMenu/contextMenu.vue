<script setup>
import {ref, onMounted} from 'vue';
import AiSidebar from './AiSidebar.vue';
import aiResponse from './aiResponse.vue';
import axios from 'axios'

// PROMPTS 
// const promptAlongar = "Vocé não é o ChatGPT, você é um assistente especializado em alongar textos, sem que estes percam o sentido ou deixe de apresentar informações importantes."

const actions = {
    'encurtar': 'Vocé não é o ChatGPT, você é um assistente jurídico  especializado em resumir textos, sem que estes percam o sentido ou deixe de apresentar informações importantes.',
    'alongar': 'Vocé não é o ChatGPT, você é um assistente jurídico  especializado em alongar textos, sem que estes percam o sentido ou deixe de apresentar informações importantes. Encurte todo o texto que lhe for fornecido e responda apenas com a versão reduzida do texto',
    'corrigir': 'Vocé não é o ChatGPT, você é um assistente jurídico especializado em corrigir textos, sem que estes percam o sentido',
}

// Menu de contexto
const ctxmenu = ref(null);
const wd = ref(null)
const action = ref('')


// Barra de pesquisa
const search_bar = ref(null);
const selectionText =  ref('')
const query =  ref('')
const response = ref(null)

onMounted(()=>{
    ctxmenu.value = document.getElementById('context-menu')
    wd.value = window
})

/**
 * Define a posição do menu de contexto quando o usuário clicar com o botão direito do mouse,
 * além de mostra-lo para o usuário.
 * @param {Number} posX - A posição do mouse em X
 * @param {Number} posY - A posição do mouse em Y
 * @returns {None} Esta função não possui retorno
 */
function showMenu(posX, posY){
    let wdWid = wd.value.innerHeight
    let wdHei = wd.value.innerWidth
    let width = ctxmenu.value.clientWidth
    let height = ctxmenu.value.clientHeight
    let x, y
    if (posX> wdWid/2){
        x = posX - width - 10
    } else {
        x = posX + 10
    }
    if (posY> wdHei/2){
        y = posY - height
    } else {
        y = posY
    }
    ctxmenu.value.style.left = `${x}px`;
    ctxmenu.value.style.top = `${y}px`;
    ctxmenu.value.style.visibility = 'visible';
}

/**
 * Esconde o menu de contexto.
 */
function hideMenu(){
    ctxmenu.value.style.visibility = 'hidden';
}

/**
 * Recebe o texto que o usuário selecionou imediatamente antes de abrir o menu de contexto.
 * @param {string} text 
 */
function defineSelectedText(text){
    if (text) {
        selectionText.value = text
    }
}

function callAction(act){
    action.value = act
    hideMenu()
    if (act === 'pesquisar' || act === 'prompt'){
        search_bar.value.showBar()
    }
    if (selectionText.value) {
        query.value = selectionText.value
        selectionText.value = ''
        handleAction()
    } else {
        search_bar.value.showBar()
    }
}

function handleSearch(value){
    response.value.showResponseBlock()
    if (action.value === 'pesquisar') {
        pesquisarJurisprudencia(value);
    } else if (action.value === 'prompt') {
        runPrompt(value)
    } else {
        runPrompt(value, actions[action.value])
    }
}

function handleAction(){
    response.value.showResponseBlock()
    let value = query.value
    runPrompt(value, actions[action.value])
}

const api = axios.create({
    baseURL: 'ai/',
    // timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'},
    auth: {
    username: 'api_user',
    password: 'N6V2AKsBa76!qHWARZi*Ha&wMbxSox'
  },
})

function pesquisarJurisprudencia(query){
    response.value.load()
    let body = {
        "busca": "abrangente",
        "conversation": [
            {}
        ],
        "language": "português brasileiro",
        "material_core": [
            "jusbrasil.com.br",
            "planalto.gov.br",
            "jus.br",
            "portal.tcu.gov.br",
            "corpus927.enfam.jus.br"
        ],
        "model": "standard",
        "prompt": "Vocé não é o ChatGPT, você é um assistente especializado em perguntas gerais.",
        "query": query,
        "scalations": [
            {
            "resposta": "Para Falar com um atendente clique aqui...",
            "sentenca": "Quero falar com um atendente"
            },
            {
            "resposta": "Para Falar com um atendente clique aqui...",
            "sentenca": "Quero falar com um humano"
            },
            {
            "resposta": "O contato do setor do ISS é ...",
            "sentenca": "Qual o telefone para falar sobre o ISS?"
            }
        ],
        "sources": 2
        }
    api.post('/chabot_web_search', body).then((res)=>{
        response.value.type(res.data.response)
    }).then((e)=>{
        response.value.unload()
    })
}

function runPrompt(query, prompt = "Vocé não é o ChatGPT, você é um assistente especializado em perguntas gerais."){
    response.value.clean()
    response.value.load()
    let body = {
        "busca": "abrangente",
        "conversation": [
            {}
        ],
        "language": "português brasileiro",
        "model": "basic",
        "prompt": prompt,
        "query": query,
        "scalations": [
            {
            "resposta": "Para Falar com um atendente clique aqui...",
            "sentenca": "Quero falar com um atendente"
            },
            {
            "resposta": "Para Falar com um atendente clique aqui...",
            "sentenca": "Quero falar com um humano"
            },
            {
            "resposta": "O contato do setor do ISS é ...",
            "sentenca": "Qual o telefone para falar sobre o ISS?"
            }
        ]
        }
        api.post('/chabot_geral_conversation', body).then((res)=>{
            response.value.type(res.data.response)
        }).then((e)=>{
            response.value.unload()
        })
}


function hideAll(){
    response.value.hideResponseBlock()
}


defineExpose({
    showMenu,
    defineSelectedText
})

</script>

<template>
<div id="context-widgets">
    <AiSidebar v-model="selectionText"  ref="search_bar" @search="(e)=>{handleSearch(e)}" @closeBar="hideAll"></AiSidebar>
    <aiResponse ref="response"></aiResponse>
</div>
<div id="context-menu" v-click-outside="hideMenu">
    <div class="ctx-item" @click="callAction('prompt')">Pesquisar</div>
    <div class="ctx-item" @click="callAction('pesquisar')">Pesquisar Jurisprudência</div>
    <div class="ctx-item" @click="callAction('encurtar')">Encurtar Texto</div>
    <div class="ctx-item" @click="callAction('alongar')">Alongar Texto</div>
    <div class="ctx-item" @click="callAction('corrigir')">Corrigir Texto</div>
</div>
</template>

<style scoped>

#bot-baloon {
    position: absolute;
    top: 5rem;
    background-color: white;
}

#context-widgets {
    width: 100vw;
    height: fit-content;
    position: fixed;
    margin: 0 min(2rem, auto);
    left: 0;
    top: 5rem;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

#loader {
    align-self: center;
}

#context-menu {
    position: fixed;
    height: fit-content;
    width: fit-content;
    min-width: 200px;
    background-color: var(--color-secondary);
    z-index: 1000;
    visibility: hidden;
    border-radius: 10px;
}

.ctx-item {
    padding: .4rem 1rem;
    color: var(--color-neutral);
}

.ctx-item:hover {
    background-color: var(--color-primary);
    cursor: pointer;
    border-radius: 10px;
}

@media screen and (max-width: 1080px) {
}
</style>