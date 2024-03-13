<script setup>
import NavBar from './components/NavBar.vue'
</script>

<template>
  <div style="height: 100%; width: 100%; overflow-x: hidden">
    <NavBar></NavBar>
    <div class="main-container">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  top: 80px;
  width: 100%;
  margin: 0 auto;
  min-height: fit-content;
  overflow: visible;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: absolute;
  overflow: hidden;
  box-sizing: border-box;
  min-height: 90vh;
}
</style>
