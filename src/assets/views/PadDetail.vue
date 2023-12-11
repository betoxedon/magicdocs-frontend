<script setup>
import { useDocumentStore } from '../../stores/documents';
import { storeToRefs } from 'pinia';
const {padDetail} = storeToRefs(useDocumentStore())

</script>

<template>
<div class="pad_container">
<iframe :src="`https://etherpad.dev.magicdocs.com.br/p/${padDetail}`" width="100%" height="100%"></iframe>
</div>
</template>

<style scoped>
.pad_container {
    width: 100%;
    height: 100%;
}
</style>