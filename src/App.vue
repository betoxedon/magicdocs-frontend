<script setup>
import { RouterView} from 'vue-router';
import HeaderComponent from './assets/components/HeaderComponent.vue';
// import { useUserStore } from './stores/user';
// import { onMounted,} from 'vue';
// import {container} from 'jenesius-vue-modal'
// import botBubble from './assets/components/Bot/BotBubble.vue'
// const {onload, getUserData} = useUserStore()
// import { storeToRefs } from 'pinia';
// const {user} = storeToRefs(useUserStore())

// onMounted(()=>{
//   onload()
//   getUserData()

// })
</script>

<template>
    <HeaderComponent></HeaderComponent>
    <div  class='container'>
      <RouterView></RouterView>
      <container></container>
      <botBubble v-if="user"></botBubble>
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
  position: relative;
  overflow-x: hidden;
}


@media screen and (min-width: 1024px) {}

@media screen and (min-width: 768px) and (max-width: 1023px) {}

@media screen and (max-width: 767px) {}

</style>