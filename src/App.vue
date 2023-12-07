<script setup>
import { onMounted, ref } from 'vue';
import { RouterView } from 'vue-router';
import { useUserStore } from './stores/user';
import {storeToRefs} from 'pinia'
import Header from './assets/components/App/Header.vue';
import contextMenu from './assets/components/contextMenu/contextMenu.vue';
import Footer from './assets/components/App/Footer.vue';
import botBallonVue from './assets/components/contextMenu/botBallon.vue';
const posX = ref(0)
const posY = ref(0)
const ctxmenu = ref(null)
const {token, user} = storeToRefs(useUserStore())


function updateCoordinates(event) {
  posX.value = event.clientX
  posY.value = event.clientY
}
onMounted(()=>{
  const app = document.getElementById('app-container')
  app.addEventListener('mousemove', updateCoordinates)
  app.addEventListener('mouseenter', updateCoordinates)
  app.addEventListener('mouseleave', updateCoordinates)
})
</script>

<template>
  <div id="app-container" v-if="user" @contextmenu.prevent="$refs.ctxmenu.showMenu(posX, posY)" >
    <context-menu ref="ctxmenu"></context-menu>
    <Header></Header>
    <div class="container">
      <RouterView></RouterView>
    </div>
    <!-- <Footer></Footer> -->
  </div>
  <div id="app-container" v-else>
    <context-menu ref="ctxmenu"></context-menu>
    <Header></Header>
    <div class="container">
      <RouterView></RouterView>
    </div>
    <!-- <Footer></Footer> -->
  </div>
</template>

<style scoped>
.container {
  display: flex;
  height: calc(100% - 50px);
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 2rem 2rem;
  box-sizing: border-box;
}

#app-container {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: none;
}
@media screen and (max-width: 760px) {
  .container {
    padding: 0 2rem;
  }
  
}
</style>