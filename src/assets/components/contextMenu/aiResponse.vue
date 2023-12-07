<script setup>
import {ref, onMounted} from 'vue'
const text = ref("")
const textWrapper = ref(null)
const responseToggle = ref(null)
const emits = defineEmits(['endLoading'])
import voiceWavesLoading from './voiceWavesLoading.vue';
const loader = ref(null)
const typedtext = ref('')


onMounted(()=>{
    textWrapper.value = document.getElementById('response-container')
    responseToggle.value = document.getElementById('response-toggle')
})


function showResponseBlock(){
    responseToggle.value.style.display = 'block'
    load()
}

function hideResponseBlock(){
    responseToggle.value.style.display = 'none'
    clean()
    unload()
}


function type(text){
    for (let i=0; i<text.length; i++) {
        (function(i){
            setTimeout(function() {
                typeLetter(text[i])
            }, 2000);
        })(i)
    }
    return emits('endLoading')
}

function typeLetter(letter){
    typedtext.value += letter
}

function clean(){
    typedtext.value = ''
}

function load(){
    loader.value.showLoad()
    clean()
}

function unload(){
    loader.value.hideLoad()
}

defineExpose({
    showResponseBlock,
    hideResponseBlock,
    type,
    clean,
    load,
    unload
})
</script>

<template>
    <div id="response-toggle">
        <div class="response-container" id="response-container" @click="type(text)">
            <font-awesome-icon class="close" :icon="['fas', 'xmark']" style="color: #ededed; cursor: pointer;" @click="hideResponseBlock" />
            <voiceWavesLoading ref=loader id="loader"></voiceWavesLoading>
            <p id="typedtext">
                {{ typedtext ? typedtext :  'Carregando...'}}
                <span id="cursor" class="cursor"></span>
            </p>
        </div>
    </div>
</template>

<style scoped>
.close {
    position: relative;
    top: -1rem;
    left: calc(100% - .7rem);
}

#loader {
    position: relative;
    top: -3.5rem;
    left: calc(50% - 23px);
}

#response-toggle {
    display: none;
    width: 100%;
    max-width: 1080px;
}
.response-container {
    display: flex;
    gap: 2px;
    background-color: var(--color-ai-secondary);
    width: 100%;
    height: fit-content;
    padding: 2rem;
    box-sizing: border-box;
    color: var(--color-neutral);
    border-radius: 10px;
}
.cursor {
  display: inline-block;
  vertical-align: bottom;
  width: 0.2em;
  height: 1em;
  background-color: var(--color-neutral);
  animation: blink 1s linear infinite;
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