<script setup>
import { ref, onMounted } from 'vue';
import { onClickOutside } from '@vueuse/core'
import { usePromptStore } from '../stores/prompts.js'
import { useChatStore } from '../stores/chat';
const {requestPrompt} = useChatStore()
const { getPrompts } = usePromptStore()
const prompts = ref([])
onMounted(async () => {
  prompts.value = await getPrompts().then((res) => {
    return res.data.results
  })
})

const contextmenu = ref(null)
onClickOutside(contextmenu, () => hideMenu())

const x = ref(0)
const y = ref(0)
const content = ref('')

const isVisible = ref(false)

function showMenu() {
    isVisible.value = true
}
function hideMenu() {
    isVisible.value = false
}

function defineCoordinates(Coorx, Coory){
    x.value = Coorx
    y.value = Coory
}

function defineText(text){
    content.value = text
}

defineExpose({
    showMenu, 
    hideMenu,
    defineCoordinates,
    defineText
})

function handleContextMenuOption(value){
    hideMenu()
    handleRequest(value)
}
async function handleRequest(prompt) {
    let message = {
      content: `${content.value}`,
      prompt: prompt.id
    }
    requestPrompt(message)
  }
</script>

<template>
    <div class="contextmenu" ref="contextmenu" :style="{ top: y + 'px', left: x + 'px' }" :class="{visible: isVisible}" @click.capture="hideMenu">
        <span v-for="(item, index) in prompts" :key="index" @click="handleContextMenuOption(item)">{{ item.name }}</span>
    </div>
</template>

<style scoped>
    .contextmenu {
        /* position: fixed; */
        visibility: hidden;
        position: fixed;
        display: flex;
        flex-direction: column;
        gap: 10px;
        z-index: 1000;
        padding: 10px;
        font-size: .9rem;
        font-weight: 300;
        width: 120px;
        background-color: var(--color-neutral);
        border-radius: 5px;
    }
    .contextmenu span {
        cursor: pointer;
        transition: all .25s ease-in-out
    }
    .contextmenu span:hover {
        font-weight: 500;
    }
    .visible {
        visibility: visible;
    }
</style>