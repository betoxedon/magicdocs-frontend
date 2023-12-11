<script setup>
import { RouterView } from 'vue-router';
import Header from './assets/components/App/Header.vue';
import { useUserStore } from './stores/user';
import { onMounted } from 'vue';
import {container} from 'jenesius-vue-modal'
const {onload} = useUserStore()

onMounted(()=>{
  onload()
})
</script>

<template>
    <Header></Header>
    <div class="container">
      <RouterView></RouterView>
    </div>
    <container></container>
</template>
<style scoped>

.container {
  max-width: 1024px;
  width: 100%;
  height: 100%;
  min-height: fit-content;
  overflow: visible;
  margin: 0 auto;
  margin-bottom: 5rem;
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