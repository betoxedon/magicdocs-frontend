<script setup>
import { ref } from 'vue';
function testAPI(){
    console.log(tinymce.activeEditor.getContent());
}
</script>
<template>
  <div></div>
</template>

<style scoped>
@media (min-width: 1024px) {
  #sample {
    display: flex;
    flex-direction: column;
    place-items: center;
    width: 100%;
  }
}
</style>