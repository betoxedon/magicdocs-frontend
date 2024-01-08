<script setup>
import { ref, onMounted } from 'vue';
import {useChatStore} from '../../../stores/chat.js'
import { storeToRefs } from 'pinia';
import buttonPrimary from '../form/buttonPrimary.vue';
import { openModal } from 'jenesius-vue-modal';
import messageModal from './messageModal.vue'

const {createMessage, getListMessages} = useChatStore()
const {chatMessages, loadingChat, listMessages} = storeToRefs(useChatStore())

onMounted(async ()=> await getListMessages())

const bot_screen = ref(null)
const bot_messages = ref(null)
const showMenu = ref(false)
const showMessages = ref(false)
const chat = ref('')
const search_query = ref('')
const action = ref('jurisprudencia')

function toggleChat(){
    if (showMenu.value) {
        bot_screen.value.style.right = '-41rem'
        showMenu.value = !showMenu.value
    } else {
        bot_screen.value.style.right = '1rem'
        showMenu.value = !showMenu.value
    }
}

function toggleMessages(){
    if (showMessages.value) {
        bot_messages.value.style.right = '-41rem'
        showMessages.value = !showMessages.value
    } else {
        bot_messages.value.style.right = '1rem'
        showMessages.value = !showMessages.value
    }
}

async function sendChatMessage(message, agent='user'){
    chatMessages.value.push({
        origin: agent,
        content: chat.value
    })
    chat.value = ''
    await createMessage(message)
}

function openMessage(message){
    openModal(messageModal,{chatMessages: message})
}

</script>

<template>
    <div id="bot-bubble" @click.capture="toggleChat" v-if="!showMenu">
        <font-awesome-icon icon="robot" size="2xl" />
    </div>
    <div id="bot-screen" ref="bot_screen">
        <font-awesome-icon icon="xmark" size="2xl" style="color: var(--color-neutral);" class="icon" @click="toggleChat"/>
        <div class="header">
            MagicBot
        </div>
        <div class="chat">
            <div v-for="(message, index) in chatMessages" :key="index" class="message" :class="{user:message.origin==='user', bot:message.origin==='bot',}">{{ message.content }}</div>
            <div v-if="loadingChat" class="bot message loading">
                <font-awesome-icon icon="robot" size="lg" />
            </div>
        </div>
        <!-- <select name="action_select" id="agent_action_select" v-model="action">
            <option value="jurisprudencia" selected>Pesquisar Jurisprudência</option>
            <option value="bot" >Assistente</option>
            <option value="pesquisar">Pesquisar</option>
        </select> -->
        <div class="prompt">
            <textarea name="" id="" v-model="chat" cols="30" rows="10" @keyup.enter="sendChatMessage(chat)">
                <buttonPrimary></buttonPrimary>
            </textarea>
        </div>
        <div class="options">
            <buttonPrimary style="flex-grow: 1;" label="Histórico de Mensagens" @click="toggleMessages"></buttonPrimary>
        </div>
    </div>


    <div id="bot-messages" ref="bot_messages">
        <font-awesome-icon icon="xmark" size="2xl" style="color: var(--color-neutral);" class="icon" @click="toggleMessages"/>
        <div class="header">
            MagicBot - Histórico
        </div>
        <div class="messages-list">
            <input type="search" placeholder="Pesquisar" v-model="search_query" class="search_message" @input="getListMessages(search_query)">
            <table>
                <tr>
                    <th>Busca</th>
                </tr>
                <tr v-for="(item, index) in listMessages" :key="index">
                    <td style="width: 100%;">{{ item.content }}</td>
                    <td><buttonPrimary label="" icon="arrow-up-right-from-square" @click="openMessage(item)"></buttonPrimary></td>
                </tr>
            </table>
        </div> 
    </div>
</template>

<style scoped>
#bot-bubble {
    position: fixed;
    height: 50px;
    width: 50px;
    bottom: 5rem;
    right: 2rem;
    z-index: 1;
    border-radius: 25px;
    background-color: var(--color-ai-primary);
    color: var(--color-neutral);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform .5s ease-in-out;
    cursor: pointer;
}

#bot-bubble:hover {
    transform: scale(1.1);
}

#bot-screen, #bot-messages {
    width: 40rem;
    height: 50rem;
    position: fixed;
    background-color: var(--color-ai-primary);
    border-radius: 2rem;
    transition: right .5s ease-in-out;
    bottom: 5rem;
    right: -41rem;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 2rem;
    justify-content: flex-end;
    z-index: 999;
}

#bot-messages {
    width: 40rem;
    background-color: #bdbaba;
    z-index: 1000;
    justify-content: flex-start;
    padding-top: 6rem;
}

#bot-messages .header {
    color: var(--color-ai-primary);
}

#agent_action_select {
    border-radius: 1rem;
    padding: .5rem;
    margin-bottom: .5rem;
}

.icon {
    position: absolute;
    right: 2rem;
    top: 2rem;
    cursor: pointer;
}

.header {
    color: var(--color-neutral);
    position: absolute;
    top: 2rem;
    left: 2rem;
    font-family: 'Rubik';
    font-size: 2rem;
}

.chat {
    height: 100%;
    margin: 4rem 0 2rem 0;
    overflow-y: auto;
    overflow-x: none;
    gap: 1rem;
    display: flex;
    flex-direction: column;
    padding-right: 1rem;
}

.chat::-webkit-scrollbar {
    width: .5rem;
}

.chat::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

.chat::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  outline: 1px solid slategrey;
}

.prompt {
    position: relative;
    width: 100%;
    height: 6rem;
}

.prompt textarea {
    width: 100%;
    height: 100%;
    border-radius: 1rem;
    resize: none;
    padding: 1rem;
    outline: none;
}

.message {
    padding: 1rem;
    background-color: var(--color-neutral);
    max-width: 80%;
    min-width: 8rem;
    width: fit-content;
    border-radius: .5rem;
    word-wrap: break-word;
}

.bot {
    align-self: flex-end;
}

.loading {
    font-size: 1.5rem;
}

.loading:after {
  overflow: hidden;
  display: inline-block;
  vertical-align: bottom;
  -webkit-animation: ellipsis steps(4,end) 900ms infinite;      
  animation: ellipsis steps(4,end) 900ms infinite;
  content: "\2026"; /* ascii code for the ellipsis character */
  width: 0px;
}

@keyframes ellipsis {
  to {
    width: 1.25em;    
  }
}

@-webkit-keyframes ellipsis {
  to {
    width: 1.25em;    
  }
}

.options {
    display: flex;
    justify-content: stretch;
    gap: 1rem;
    margin-top: 1rem;
}



table {
  width: 100%;
  overflow-y: auto;
}

td, th {
  text-align: left;
}
th, td {
  padding: 0.5rem 1rem;
}

tr:nth-child(even) {background-color: var(--color-ai-terciary);}

tr:hover {background-color: var(--color-ai-primary); color: var(--color-neutral);}
tr:hover:nth-child(1) {background-color: white; color: var(--color-ai-primary);}

.search_message {
    width: 100%;
    border-radius: .5rem;
    outline: none;
    border: none;
    height: 3rem;
    padding: .5rem 1rem;
    margin-bottom: 1rem;
}

.messages-list{
    overflow-y: auto;
    padding-right: .5rem;
}

.messages-list::-webkit-scrollbar {
    width: .5rem;
}

.messages-list::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

.messages-list::-webkit-scrollbar-thumb {
  background-color: var(--color-ai-primary);
  outline: 1px solid slategrey;
}
</style>