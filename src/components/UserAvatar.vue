<script setup>
import avatar from '../images/avatar.jpg'
const props = defineProps({
  img: {
    type: String,
    default: '../images/avatar.jpg'
  }
})
</script>

<template>
  <div>
    <img :src="avatar" alt="Imagem de Perfil" v-if="props.img === null"/>
    <img :src="props.img" alt="Imagem de Perfil" v-else/>
  </div>
</template>

<style scoped>
img {
  height: 40px;
  aspect-ratio: 1;
  border-radius: 50%;
  cursor: pointer;
}
</style>
