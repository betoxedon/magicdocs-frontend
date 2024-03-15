<script setup>
import InputComponent from '../components/InputComponent.vue'
import ClientCard from '../components/ClientCard.vue'
import { onMounted, ref } from 'vue'
import { useClientStore } from '../stores/clients'
import { useRouter } from 'vue-router'

const router = useRouter()
const { getClients } = useClientStore()
const clients = ref([])
const filteredArray = ref(clients.value)
const searchString = ref('')

onMounted(async () => {
  filteredArray.value = await getClients()
})

async function handleClientForm() {
  router.push({ name: 'clientForm', query: { type: 'new' } })
}

function handleClientData(id) {
  router.push({ name: 'ClientPage', query: { id: id } })
}
</script>

<template>
  <div class="container spaced">
    <div class="add-client">
      <button @click="handleClientForm">Novo cliente</button>
    </div>
    <div class="container-header">
      <h3>{{ 'Clientes'.toUpperCase() }}</h3>
    </div>
    <div class="container-body">
      <div>
        <InputComponent
          style="max-width: 250px"
          nolabel
          placeholder="Pesquisar"
          icon="magnifying-glass"
          @input="handleSearch"
          v-model="searchString"
        ></InputComponent>
      </div>
      <div class="clients-container">
        <ClientCard
          v-for="(client, index) in filteredArray"
          :key="index"
          :client="client"
          @click="handleClientData(client.id)"
        ></ClientCard>
      </div>
    </div>
  </div>
</template>

<style scoped>
.clients-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  grid-template-rows: repeat(auto-fit, minmax(175px, 1fr));
  margin-top: 1rem;
  gap: 1rem;
}

.add-client {
  position: absolute;
  right: 0rem;
  right: 2rem;
}

.spaced {
  position: relative;
  background-color: var(--color-secondary-background);
}
</style>
