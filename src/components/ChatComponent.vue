<script setup>
import BotTransitionsComponent from './BotTransitionsComponent.vue'
import { usePromptStore } from '../stores/prompts.js'
import { onMounted, ref } from 'vue'
import botMessage from './botMessage.vue'
import { useChatStore } from '../stores/chat.js'
import makeid from '../utils/id.js'
import { useToast } from 'vue-toastification'
import { useUserStore } from '../stores/user.js'
const { getUserData } = useUserStore()

const toast = useToast()
const { createMessage } = useChatStore()
const emits = defineEmits(['import', 'copy'])

const { getPrompts } = usePromptStore()

const prompts = ref([])
const sectionId = ref(`${makeid(8)}`)

const loading = ref(false)
const selectedPrompt = ref(null)
const chatLog = ref([])

onMounted(async () => {
  prompts.value = await getPrompts().then((res) => {
    return res.data.results
  })
})

const request = ref('')

async function handleRequest() {
  if (selectedPrompt.value === null) {
    selectedPrompt.value = 9
  }
  loading.value = true
  let message = {
    content: `${request.value}`,
    prompt: selectedPrompt.value,
    session: sectionId.value
  }
  createUserMessage()
  await createMessage(message)
    .then((res) => {
      createBotMessage(res.data.response)
    })
    .then(() => {
      getUserData()
      loading.value = false
      botchat.value.lastElementChild.scrollIntoView()
    })
}

function createUserMessage() {
  chatLog.value.push({
    origin: 'user',
    message: request.value
  })
  request.value = undefined
}

function createBotMessage(message) {
  chatLog.value.push({
    origin: 'agent',
    message: message
  })
}

const botHidden = ref(true)
const botchat = ref(null)

function closeBot() {
  botHidden.value = true
}

function openBot() {
  botHidden.value = false
}
</script>

<template>
  <BotTransitionsComponent>
    <div class="bot-container" v-if="botHidden === false">
      <div class="bot-header">
        <div style="display: flex; align-items: center; gap: 1rem">
          <font-awesome-icon :icon="['fas', 'wand-sparkles']" beat-fade class="bot-img" />
          <h3>MagicBot</h3>
        </div>
        <div class="nav">
          <!-- <font-awesome-icon icon="window-minimize" class="minimize nav-icons" /> -->
          <font-awesome-icon icon="xmark" class="nav-icons" @click="closeBot" size="xl" />
        </div>
      </div>
      <div class="bot-chat" ref="botchat">
        <botMessage
          v-for="(message, index) in chatLog"
          :message="message"
          @copy="handleCopy"
          @import="(e) => emits('import', e)"
        />
        <font-awesome-icon icon="gear" spin class="loading" v-if="loading" />
      </div>
      <div class="bot-request">
        <div class="request-navigation">
          <select name="" id="" v-model="selectedPrompt">
            <option v-for="(prompt, index) in prompts" :key="index" :value="prompt.id">
              {{ prompt.name }}
            </option>
          </select>
        </div>
        <textarea
          type="text"
          placeholder="Em que posso te ajudar?"
          v-model="request"
          @keydown.enter.prevent="handleRequest"
        ></textarea>
        <font-awesome-icon icon="paper-plane" class="icon" @click="handleRequest" />
      </div>
    </div>
    <div class="bot-bubble" v-if="botHidden === true" @click.capture="openBot">
      <font-awesome-icon :icon="['fas', 'wand-sparkles']" class="bot-img" size="2xl" />
    </div>
  </BotTransitionsComponent>
</template>

<style scoped>
.bot-container {
  width: 400px;
  height: calc(100% - 60px);
  background-color: var(--color-dark-background);
  border-radius: 15px;
  position: absolute;
  z-index: 100;
  right: 20px;
  bottom: 60px;
  padding: 0.5rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.bot-request {
  height: fit-content;
  width: 100%;
}

.bot-request textarea {
  border: none;
  width: 100%;
  margin-top: 0.5rem;
  box-sizing: border-box;
  padding: 0.8rem 2.5rem 0.8rem 0.8rem;
  outline: none;
  resize: none;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  border-radius: 10px;
}

.bot-request .icon {
  position: absolute;
  bottom: 32px;
  right: 1.5rem;
  color: var(--color-label-primary);
  cursor: pointer;
}

.bot-header {
  width: 100%;
  height: fit-content;
  padding: 1rem;
  box-sizing: border-box;
  background-color: var(--color-label-primary);
  color: var(--color-white-fonts);
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
}

.bot-header .bot-img {
  background-color: var(--color-white-fonts);
  border-radius: 50%;
  color: var(--color-label-primary);
  padding: 0.5rem;
}

.nav {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.minimize {
  position: relative;
  bottom: 5px;
}

.nav-icons {
  cursor: pointer;
}

.bot-chat {
  height: 100%;
  flex-grow: 1;
  background-color: var(--color-white-fonts);
  margin: 0.5rem 0;
  box-sizing: border-box;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem;
  position: relative;
  overflow-y: auto;
}

.request-navigation {
  display: flex;
  gap: 1rem;
  color: var(--color-white-fonts);
  align-items: center;
}

.loading {
  position: absolute;
  right: 1rem;
  bottom: 0.5rem;
}

.bot-bubble {
  position: absolute;
  z-index: 100;
  padding: 1rem;
  border-radius: 50%;
  background-color: var(--color-dark-background);
  color: var(--color-white-fonts);
  bottom: 2rem;
  right: 2rem;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
}

.bot-bubble:hover {
  transform: scale(1.1);
}
</style>
