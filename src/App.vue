<script setup>
import { RouterView} from 'vue-router';
import Header from './assets/components/App/Header.vue';
import { useUserStore } from './stores/user';
import { onMounted,} from 'vue';
import {container} from 'jenesius-vue-modal'
import botBubble from './assets/components/Bot/BotBubble.vue'
const {onload, getUserData} = useUserStore()

onMounted(()=>{
  onload()
  getUserData()

})
</script>

<template>
    <Header></Header>
    <div  class='container'>
      <RouterView style="max-width: 1024px;"></RouterView>
      <container></container>
      <botBubble></botBubble>
    </div>
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
  overflow-x: hidden;
}


@media screen and (min-width: 1024px) {}

@media screen and (min-width: 768px) and (max-width: 1023px) {}

@media screen and (max-width: 767px) {}

</style>