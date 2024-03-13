<script setup>
import { RouterView } from 'vue-router'
import Layout from './LayoutDefault.vue'
import { container } from 'jenesius-vue-modal'
</script>

<template>
  <Layout>
    <container></container>
    <RouterView></RouterView>
  </Layout>
</template>
<style scoped>
@media screen and (min-width: 1024px) {
}

@media screen and (min-width: 768px) and (max-width: 1023px) {
}

@media screen and (max-width: 767px) {
}
</style>
