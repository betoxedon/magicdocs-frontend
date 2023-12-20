<script setup>
import { ref } from 'vue';
import {useChatStore} from '../../../stores/chat.js'
import { storeToRefs } from 'pinia';

const {createMessage} = useChatStore()
const {chatMessages, loadingChat} = storeToRefs(useChatStore())

const bot_screen = ref(null)
const showMenu = ref(false)
const chat = ref('')

function toggleChat(){
    if (showMenu.value) {
        bot_screen.value.style.right = '-41rem'
        showMenu.value = !showMenu.value
    } else {
        bot_screen.value.style.right = '1rem'
        showMenu.value = !showMenu.value
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
        <div class="prompt">
            <textarea name="" id="" v-model="chat" cols="30" rows="10" @keyup.enter="sendChatMessage(chat)">
                <buttonPrimary></buttonPrimary>
            </textarea>
        </div>
    </div>
</template>

<style scoped>
#bot-bubble {
    position: absolute;
    height: 50px;
    width: 50px;
    bottom: 5rem;
    right: 1rem;
    z-index: 100;
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

#bot-screen {
    width: 40rem;
    height: 50rem;
    position: absolute;
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
    height: 10rem;
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
    font-size: 2rem;
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

</style>