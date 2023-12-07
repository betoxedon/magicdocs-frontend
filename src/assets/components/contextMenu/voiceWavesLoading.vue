<script setup>
import { ref, onMounted } from 'vue';
const loader = ref(null)
const toggle = ref(null)

onMounted(()=>{
    loader.value = document.getElementById('loader');
})

function showLoad(){
    loader.value.style.display = 'block';
    randomDelay()
}

function randomDelay(){
    let wrapper = loader.value.childNodes[0]
    let count = wrapper.childElementCount
    let random 
    for (let i=0; i<count; i++){
        random = Math.random()
        wrapper.childNodes[i].style.animationDelay = `${random}s`;
    }
}

function hideLoad(){
    loader.value.style.display = 'none';
}
defineExpose({
    showLoad,
    hideLoad
})
</script>

<template>
    <div id="loader">
        <div id="loader_anim" class="loader">
            <span class="stroke"></span>
            <span class="stroke"></span>
            <span class="stroke"></span>
            <span class="stroke"></span>
            <span class="stroke"></span>
            <span class="stroke"></span>
            <span class="stroke"></span>
            <span class="stroke"></span>
            <span class="stroke"></span>
            <span class="stroke"></span>
            <span class="stroke"></span>
            <span class="stroke"></span>
            <span class="stroke"></span>
            <span class="stroke"></span>
            <span class="stroke"></span>
            <span class="stroke"></span>
            <span class="stroke"></span>
            <span class="stroke"></span>
            <span class="stroke"></span>
            <span class="stroke"></span>
            <span class="stroke"></span>
            <span class="stroke"></span>
            <span class="stroke"></span>
            <span class="stroke"></span>
            <span class="stroke"></span>
        </div>
    </div>
</template>

<style scoped>

#toggle{
    display: block;
}
.loader {
        height: 30px;
        display: flex;
        align-items: center;
        background-color: var(--color-ai-primary);
        border-radius: 15px;
        width: fit-content;
        padding: 8px;
    }

    .loader .stroke {
        display: block;
        position: relative;
        background-color: var(--color-neutral);
        height: 100%;
        width: 1px;
        border-radius: 50px;
        margin: 0 1px;
        animation: animate 1.2s linear infinite;
        transition: all .5s;
    }

    @keyframes animate {
        50% {
            height: 20%;
        }
        100% {
            height: 100%;
        }
    }

</style>