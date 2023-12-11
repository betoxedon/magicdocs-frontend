<script setup>
import { onMounted, ref } from 'vue';
import { useDocumentStore } from '../../stores/documents';
import { storeToRefs } from 'pinia';
import cardDocument from '../components/cardDocument.vue';
import buttonPrimary from '../components/form/buttonPrimary.vue';
import { useRouter } from 'vue-router';
import { openModal } from 'jenesius-vue-modal';
import newPadForm from '../components/newPadForm.vue';
const router = useRouter()

const {pads, padDetail} = storeToRefs(useDocumentStore())
const {getPads, deletePad} = useDocumentStore()
const tableVisualization = ref(false)

function handleDetail(id){
    padDetail.value = id
    router.push({name: 'PadDetail'})
}

const q = ref()

onMounted(()=> {
  getPads()
})

</script>

<template>
  <div class="card-container">
    <div class="header">
      <font-awesome-icon class="menu-item" icon="plus" size="xl" @click="openModal(newPadForm)"/>
      <font-awesome-icon class="menu-item" icon="table-list" @click="tableVisualization=true" size="xl" />
      <font-awesome-icon class="menu-item" icon="file" @click="tableVisualization=false" size="xl" />
      <!-- <font-awesome-icon class="menu-item" icon="trash-can" size="xl" /> -->
      <div class="search-bar">
        <input type="search" @input="getPads(q)" v-model="q" placeholder="Pesquisar" @keyup.enter="getPads(q)">
        <font-awesome-icon class="menu-item" icon="magnifying-glass" size="xl" @click="getPads(q)"/>
      </div>
    </div>
    <div v-if="!tableVisualization" class="document-container">
      <cardDocument v-for="(document, index) in pads" :key="index" :object="document"></cardDocument>
    </div>
    <div v-else class="document-container">
      <table>
        <tr>
          <th>Titulo</th>
          <th>Cliente</th>
          <th>Ação</th>
          <th>Descrição</th>
        </tr>
        <tr v-for="(document, index) in pads" :key="index">
          <td>{{document.name}}</td>
          <td>{{document.description}}</td>
          <td>{{document.description}}</td>
          <td>{{document.description}}</td>
          <td><buttonPrimary width="100%" label="Abrir" @click=handleDetail(document.pad_id)></buttonPrimary></td>
          <td><buttonPrimary width="100%" label="Apagar" @click=deletePad(document.pad_id)></buttonPrimary></td>
        </tr>
      </table>
    </div>
  </div>

</template>

<style scoped>
.card-container {
  display: flex;
  flex-flow: column;
  gap: 1rem;
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 2rem;
  padding: 2rem;
}

.header {
  display: flex;
  justify-content: flex-start;
  border-radius: 1rem;
  background-color: var(--color-neutral);
  padding: 1rem;
  gap: 1rem;
}

.menu-item {
  border-radius: 50%;
  padding: 1rem;
  transition: all .2s ease-in-out;
  cursor: pointer;
}

.menu-item:hover {
  background-color: var(--color-background);

}

.search-bar {
  display: flex;
  width: 100%;
}

.search-bar input {
  border: none;
  border-radius: 5px;
  width: 100%;  
  outline: none;
  padding: 0 2rem;
}

.search-bar .menu-item {
  position: absolute;
  right: 5rem;
}

.document-container {
  display: flex;
  gap: 3rem;
  justify-content: flex-start;
  flex-wrap: wrap;
  height: fit-content;
  overflow-y: auto;
}

table {
  width: 100%;
}

td, th {
  text-align: left;
}
th, td {
  padding: 0.5rem 1rem;
}

tr:nth-child(even) {background-color: var(--color-ai-terciary);}

tr:hover {background-color: var(--color-ai-primary); color: var(--color-neutral);}
tr:hover:nth-child(1) {background-color: white; color: var(--color-ai-primary);}
</style>