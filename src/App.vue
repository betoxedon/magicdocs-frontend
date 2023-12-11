<script setup>
import { RouterView, useRoute } from 'vue-router';
import Header from './assets/components/App/Header.vue';
import { useUserStore } from './stores/user';
import { onMounted, ref } from 'vue';
import {container} from 'jenesius-vue-modal'
const {onload, getUserData} = useUserStore()
const route = useRoute()


import contextMenu from './assets/components/contextMenu/contextMenu.vue';

const posX = ref(0)
const posY = ref(0)
const ctxmenu = ref(null)

function updateCoordinates(event) {
  posX.value = event.clientX
  posY.value = event.clientY
}

onMounted(()=>{
  onload()
  getUserData()

  const app = document.getElementById('app-container')
  app.addEventListener('mousemove', updateCoordinates)
  app.addEventListener('mouseenter', updateCoordinates)
  app.addEventListener('mouseleave', updateCoordinates)

})
</script>

<template>
    <Header></Header>
    <context-menu ref="ctxmenu"></context-menu>
    <div id="app-container" class='container' @contextmenu.prevent="$refs.ctxmenu.showMenu(posX, posY)">
      <RouterView></RouterView>
    </div>
    <container></container>
</template>
<style scoped>

.container {
  width: 100%;
  height: 100%;
  min-height: fit-content;
  overflow: visible;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem 2rem;
  position: relative;
}
.container_pad {
  /* max-width: 1024px; */
  width: 100%;
  height: 100%;
  min-height: fit-content;
  overflow: visible;
  margin: 0 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem 2rem;
  position: relative;
}

@media screen and (min-width: 1024px) {}

@media screen and (min-width: 768px) and (max-width: 1023px) {}

@media screen and (max-width: 767px) {}

</style>