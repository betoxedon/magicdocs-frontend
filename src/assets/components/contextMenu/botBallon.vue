<script setup>
import { ref, onMounted } from 'vue';
import contextMenu from '../contextMenu/contextmenu.vue'
const ctxmenu = ref(null)
function show(){
    ctxmenu.value.showMenu(500, 500)
}
</script>

<template>
    <contextMenu ref="ctxmenu" ></contextMenu>
    <div id="bot-baloon" @click.capture="show">
        <font-awesome-icon :icon="['fas', 'robot']" size="2xl" />
    </div>
</template>

<style scoped>
#bot-baloon {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    width: 50px;
    bottom: 5rem;
    right: 1rem;
    background-color:var(--color-ai-primary);
    color: var(--color-neutral);
    padding: .5rem;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    cursor: pointer;
    transition: all .5s ease-in-out;
}

#bot-baloon:hover {
    transform: scale(1.1);
}


</style>