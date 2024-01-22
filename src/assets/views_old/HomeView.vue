<script setup>
import buttonprimary from '../components_old/form/buttonprimary.vue';
import { useRouter } from 'vue-router';
const router = useRouter()

</script>
<template>
  <div class="home">
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      Em desenvolvimento
      <buttonprimary label="Novo Mundo da AdvocacI.A." @click="router.push({name: 'Promotional'})"></buttonprimary>
    </div>
  </div>
</template>

<style scoped>
.home {
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: var(--color-secondary);
  color: var(--color-neutral);
  font-family: 'Rubik Mono One';
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  letter-spacing: 2px;
  font-size: 3rem;
}


@media (min-width: 1024px) {
  #sample {
    display: flex;
    flex-direction: column;
    place-items: center;
    width: 100%;
  }
}
</style>