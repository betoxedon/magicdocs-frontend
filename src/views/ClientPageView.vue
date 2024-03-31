<script setup>
import ClientPerfilItem from '../components/ClientPerfilItem.vue'
import FileCard from '../components/FileCard.vue'
import imageComponentModal from '../components/imageComponentModal.vue'
import { onMounted, ref, computed } from 'vue'
import { useClientStore } from '../stores/clients'
import { useRoute, useRouter } from 'vue-router'
import { useFileStore } from '../stores/files'
import { storeToRefs } from 'pinia'
import { openModal } from 'jenesius-vue-modal'
import fileFormModal from '../components/fileFormModal.vue'
const { postFiles, getFiles, getClientFiles } = useFileStore()
const { files } = storeToRefs(useFileStore())
const route = useRoute()
const router = useRouter()
const { getClientData, updateClient } = useClientStore()
const client = ref({})

onMounted(async () => {
  client.value = await getClientData(route.query.id)
})
onMounted(async () => {
  filteredArray.value = await getClientFiles(route.query.id)
})

const filteredArray = ref([])
const clientFolder = ref(null)

const images = computed(()=>{
  return files.value.filter(item => ['image/jpeg', 'image/png'].includes(item.type) )
})
const documentos = computed(()=>{
  return files.value.filter(item => item.type === 'doc')
})
const pdfs = computed(()=>{
  return files.value.filter(item => item.type === 'application/pdf')
})

// DRAG AND DROP FUNCTION

function dragoverHandler(ev) {
  ev.preventDefault()
  // ev.dataTransfer.dropEffect = 'move'
}
async function dropHandler(ev) {
  ev.preventDefault()
  createFile(ev.dataTransfer.files)
}

async function createFile(file) {
  let files = file
  openModal(fileFormModal, { file: files })
}

async function handleDeactivate() {
  await updateClient({ is_active: false }, route.query.id)
  window.location.reload()
}

async function handleActivate() {
  await updateClient({ is_active: true }, route.query.id)
  window.location.reload()
}

function handleNewDocument() {
  openModal(fileFormModal)
}

</script>

<template>
  <div class="container spaced">
    <div class="container-header">
      <span>{{ client.name }}</span>
      <button class="btn-new-file btn-primary" type="button" @click="handleNewDocument">Criar Documento</button>
    </div>
    <div class="container-body">
      <div class="client-data" style="height: fit-content">
        <ClientPerfilItem icon="handshake">{{ client.causa }}</ClientPerfilItem>
        <ClientPerfilItem icon="phone">{{ client.phone_number }}</ClientPerfilItem>
        <ClientPerfilItem icon="cake-candles">{{ client.birth_date }}</ClientPerfilItem>
        <ClientPerfilItem icon="venus-mars">{{ client.sex === 'MALE' ? 'Masculino' : 'Feminino' }}</ClientPerfilItem>
        <ClientPerfilItem icon="id-card">{{ client.cpf }}</ClientPerfilItem>
        <ClientPerfilItem icon="id-card">{{ client.rg }}</ClientPerfilItem>
        <ClientPerfilItem icon="map-location-dot">{{ client.postal_code }}</ClientPerfilItem>
        <ClientPerfilItem icon="location-crosshairs"
          >{{ client.adress }}, <span v-if="client.number">{{ client.number }}</span
          >, <span v-if="client.neighborhood">{{ client.neighborhood }}</span> -
          <span v-if="client.city">{{ client.city }}</span>
          <span v-if="client.state">- {{ client.state }}</span>
        </ClientPerfilItem>
        <div class="line">
          <button @click="router.push({ name: 'clientForm', query: { id: client.id, type: 'old' } })">
            Alterar Dados
          </button>
          <button class="btn-danger" type="button" @click="handleDeactivate" v-if="client.is_active">
            Desativar Cliente
          </button>
          <button class="btn-primary" type="button" @click="handleActivate" v-else>Ativar Cliente</button>
        </div>
      </div>
      <div
        class="client-data fileslist"
        style="width: 100% !important"
        ref="clientFolder"
        @drop.prevent="(event) => dropHandler(event)"
        @dragover.prevent="(event) => dragoverHandler(event)"
      >
        <span style="margin: 0 auto;">Adicione novos documentos arrastando arquivos para cá ou crie utilizando o botão acima</span>
        <div v-if="documentos.length" class="documentos">
          <h3>Documentos:</h3>
          <FileCard v-for="(file, index) in documentos" :key="index" :file="file" />
        </div>
        <div v-if="pdfs.length" class="documentos">
          <h3>PDF:</h3>
          <FileCard v-for="(file, index) in pdfs" :key="index" :file="file" />
        </div>
        <div class="documentos" v-if="images.length">
          <h3 >Imagens:</h3>
          <div class="images">
            <img v-for="(img, index) in images" :key="index" :src="img.url" alt="" @click="openModal(imageComponentModal, {file: img})">
          </div>
        </div>
        <div
          style="
            display: flex;
            flex-direction: column;
            gap: 1rem;
            align-items: center;
            height: 100%;
            justify-content: center;
          "
          v-if="files.length === 0"
        >
          <span>Ainda não há documentos aqui.</span>
          <font-awesome-icon icon="file-import" size="2xl" />
          <span>Adicione novos documentos arrastando arquivos para cá ou crie novos utilizando o botão acima</span>
        </div>
      </div>
    </div>
    <div class="container-footer"></div>
  </div>
</template>

<style scoped>

.documentos {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
}

.images {
  display: flex;
  flex-wrap: wrap;
  gap: .5rem;
}

.images img {
  aspect-ratio: 1.5;
  height: 150px;
  cursor: zoom-in;
  transition: all ease-in-out .1s;
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
