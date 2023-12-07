<script setup>
import { onMounted, ref } from 'vue';
import {useRouter, useRoute} from 'vue-router'
const router = useRouter()
const route = useRoute()
const menu = ref(null)
const menuShown = ref(false)
onMounted(()=>{
    menu.value = document.getElementById('menu')
})

function handleMenu(){
    menuShown.value = !menuShown.value
    if (menuShown.value) {
        menu.value.style.top = `50px`
    } else {
        menu.value.style.top = `-${menu.value.clientHeight}px`
    }
}
</script>

<template>
<nav class="navbar">
    <div class="container">
        <span style="font-weight: 500; align-self: center;">MAGICDOCS</span>
        <div class="links">
            <span @click="router.push({name: 'Home'})">Home</span>
            <span @click="router.push({name: 'Home'})">Quem somos</span>
            <span @click="router.push({name: 'Home'})">Preços</span>
            <span @click="router.push({name: 'MyDocuments'})">Meus Documentos</span>
        </div>
        <div class="user">
            <span @click="router.push('/login')">Login</span>
            <font-awesome-icon icon="bars" size="xl" class="menu-icon" style="margin-left: 2rem;" @click="handleMenu"/>
        </div>

    </div>
</nav>
<div class="menu" id="menu">
        <span @click="router.push('/login')" :class="[route.name==='Login' ? 'active' : '']">Login</span>
        <span @click="router.push({name: 'Home'})" :class="[route.name==='Home' ? 'active' : '']">Home</span>
        <span @click="router.push({name: 'Home'})">Quem somos</span>
        <span @click="router.push({name: 'Home'})">Preços</span>
    </div>
</template>


<style scoped>

.active {
    text-decoration: underline;
}
.navbar {
    font-family: 'Rubik';
    font-size: .8rem;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 50px;
    height: 50px;
    background-color: var(--color-primary);
    color: var(--color-neutral);
    gap: 1rem;
    z-index: 9999;
}

.container {
    max-width: 1080px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    z-index: 9999;
}

.navbar span {
    cursor: pointer;
    font-size: .9rem;
    font-weight: 3;
    height: fit-content;
}

.menu-icon {
    display: none;
}

.links  {

    gap: 1rem;

}

.links, .user {
    display: flex;
    align-items: center;
}

.menu {
    font-family: 'Rubik';
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: var(--color-neutral);
    color: var(--color-primary);
    width: fit-content;
    min-width: 100vw;
    top: 50px;
    right: 0;
    z-index: 900;
    transition: all .5s ease-in-out;
    display: none;
}
.menu span {
    padding: 1rem 1rem 1rem 1rem;
    font-weight: 500;
}
.menu span:hover {
    color: var(--color-neutral);
    background-color: var(--color-primary);
    font-weight: 500;
}

@media screen and (max-width: 1200px) {
    .container {
        margin: 0 3rem;
    }
}

@media screen and (max-width: 760px) {
    .links {
        display: none;
    }
    .user span {
        display: none;
    }
    .menu {
        display: flex;
    }
    .menu-icon {
        display: block;
    }
    .active{
        background-color: var(--color-secondary);
        color: var(--color-neutral);
    }
}
</style>