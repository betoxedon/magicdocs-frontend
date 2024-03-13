<script setup>
const props = defineProps({
  img: {
    type: String,
    default: '../images/avatar.jpg'
  }
})
</script>

<template>
  <div>
    <img :src="props.img" alt="Imagem de Perfil" />
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
