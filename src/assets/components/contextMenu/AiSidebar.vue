<script setup>
import { ref, onMounted} from 'vue';

const AiSearchBar = ref(null)
const barToggle = ref(null)
const value = ref('')
const emits = defineEmits(['search', 'update:modelValue', 'closeBar'])

onMounted(()=>{
    AiSearchBar.value = document.getElementById('ai-container')
    barToggle.value = document.getElementById('bar-toggle')
})

function search(){
    if (value.value){
        emits('search', value.value)
    }
}

function showBar(){
    barToggle.value.style.display = 'block';
}

function hideBar(){
    barToggle.value.style.display = 'none';
    value.value = ''
    emits('closeBar')
}

defineExpose({
    showBar,
    hideBar,
})
</script>

<template>
    <div id="bar-toggle">
        <div id="ai-container">
            <span class="bar-title">MagicDocs</span>
            <input type="text" v-model="value" @keydown.enter="search" placeholder="Digite aqui sua pesquisa...">
            <font-awesome-icon :icon="['far', 'circle-right']" style="color: #ededed; cursor: pointer;" @click="search"/>
            <font-awesome-icon :icon="['fas', 'xmark']" style="color: #ededed; cursor: pointer;" @click="hideBar" />
        </div>
    </div>
</template>

<style scoped>
#bar-toggle {
    display: none;
    width: 100%;
    max-width: 1080px;
}
#ai-container {
    position: relative;
    height: 3rem;
    width: 100%;

    border-radius: 10px;
    box-sizing: border-box;

    background-color: var(--color-ai-primary);

    display: flex;
    align-items: center;
    padding: 0 2rem;
    /* visibility: hidden; */
    gap: 1rem;
    }

#ai-container input {
    position: relative;
    background-color: var(--color-ai-primary);
    height: 2rem;
    width: 100%;
    border: none;
    outline: none;
    color: var(--color-neutral);
}

.bar-title {
    color: var(--color-neutral);
    margin-right: 1rem;
}

#ai-response {
    position: fixed;
    top: 6rem;
    width: 80vw;
    height: fit-content;
    left: 10vw;
    background-color: var(--color-secondary);
    box-sizing: border-box;

    padding: 1rem 2rem;
    color: var(--color-neutral);
}

.ai-loader {
    position: absolute;
    top: 2rem;
    left: calc(40vw - 23px);

}

.ai-response {
    position: absolute;
    top: 4rem;
    left: 0px;
}

</style>