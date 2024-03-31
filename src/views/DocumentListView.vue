<script setup>
import FileCard from '../components/FileCard.vue'
import InputComponent from '../components/InputComponent.vue'
import { openModal } from 'jenesius-vue-modal'
import fileFormModal from '../components/fileFormModal.vue'
import { onMounted, ref, computed } from 'vue'
import { useDocumentStore } from '../stores/documents.js'
import { storeToRefs } from 'pinia'
const { documents } = storeToRefs(useDocumentStore())
const { getAllFiles } = useDocumentStore()

import { useClientStore } from '../stores/clients'
const { getClients } = useClientStore()
const { clients } = storeToRefs(useClientStore())

onMounted(async () => {
  await getAllFiles()
  await getClients()
})

const clientsOptions = computed(()=>{
  let arr = clients.value.map(item => {
    return { label: item.name, value: item.id }
  })
  return arr
})

const searchParams = ref('')

async function handleSearch(){
    await getAllFiles(searchParams.value)
}

function handleNewDocument() {
  openModal(fileFormModal, {ask_client: true})
}

</script>

<template>
  <div class="container spaced">
    <div class="container-header">
      <h3>{{ 'Documentos'.toUpperCase() }}</h3>
    </div>
    <div class="container-body">
      <div style="display: flex; gap: 2rem;">
        <InputComponent
          style="max-width: 250px"
          nolabel
          placeholder="Pesquisar"
          icon="magnifying-glass"
          @input="handleSearch"
          v-model="searchParams"
        ></InputComponent>
        <button @click="handleNewDocument">Novo Documento</button>
      </div>
      <div class="clients-container">
        <FileCard v-for="(file, index) in documents" :key="index" :file="file" client/>
      </div>
    </div>
  </div>
</template>

<style scoped>

.clients-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.container-body {
    flex-direction: column !important;
}

.documentos {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
}

.images {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.images img {
  aspect-ratio: 1.5;
  height: 150px;
  cursor: zoom-in;
  transition: all ease-in-out 0.1s;
}

.images img:hover {
  transform: scale(1.05);
}

.fileslist {
  max-height: fit-content;
}

.btn-new-file {
  position: absolute;
  right: 0px;
}
.no-file {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto auto;
  gap: 1rem;
  cursor: pointer;
}
.client-data {
  padding: 1rem;
  border-radius: 5px;
  background-color: #ececec;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.container-body {
  display: flex;
  gap: 2rem;
}

.container-header {
  position: relative;
}

table {
  width: 100%;
}

th,
td {
  width: 100%;
}

th {
  text-align: left;
  padding: 0.8rem 0;
}
tr {
  display: flex;
  border-bottom: 1px solid var(--color-neutral);
  border-radius: 8px;
  transition: all 0.25s ease-in-out;
}

td {
  padding: 0.8rem 0;
  display: flex;
  gap: 0.5rem;
}
.items {
  padding: 0 1rem;
}
.items:hover {
  transform: scale(1.01);
  background-color: var(--color-primary) !important;
  color: var(--color-white);
  cursor: pointer;
}

tr:nth-child(even) {
  background-color: var(--color-neutral);
}

.line {
  display: flex;
  justify-content: space-around;
  margin-top: 0.5rem;
}
</style>
