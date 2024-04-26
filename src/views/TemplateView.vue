<script setup>
import {useDocumentoModelStore} from '../stores/documentModels.js'
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import DocumentModelItemList from '../components/DocumentModelItemList.vue';
import { useRouter } from 'vue-router';
import InputComponent from '../components/InputComponent.vue';

const router = useRouter()

const documentStore = useDocumentoModelStore()
const {models} = storeToRefs(documentStore)

onMounted(async () => {
    await documentStore.getModels()
})
const seachString = ref('')
async function handleSearch(){
    await documentStore.getModels(seachString.value)
}


</script>

<template>
    <div class="container spaced">
        <div class="container-header">
            Modelos
        </div>
        <div class="container-body" style="display: flex; gap: 1rem; justify-content: space-between">
            <InputComponent nolabel placeholder="Pesquisar..." v-model="seachString" @input="handleSearch" icon="magnifying-glass"/>
            <button @click="router.push({name: 'NovoModelo'})" style="align-self: end ;">Novo Modelo</button>
        </div>
        <div v-if="models.count === 0" class="no-results">
            Você ainda não possui modelos cadastrados. Cadastre um novo modelo e facilite a emissão de documentos para seus clientes!
        </div>
        <div class="document-container" v-else>
            <DocumentModelItemList v-for="(model, index) in models.results" :key="index" :model="model" client/>
        </div>

    </div>
</template>

<style scoped> 
.no-results {
    margin: 0 auto;
}

.document-container {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    flex-wrap: wrap;
}
</style>