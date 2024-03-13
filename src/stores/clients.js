import { defineStore } from 'pinia'
import { ref } from 'vue'
import apiAuth from '../api/api.js'
import { useToast } from 'vue-toastification'
const toast = useToast()

export const useClientStore = defineStore('clients', () => {
  const client = ref({})
  async function getClients() {
    let request = await apiAuth.api.get(`/clients/`)
    if (request.status === 200) {
      client.value = request.data.results
      return request.data.results
    } else {
      toast.warning('Houve um erro ao buscar seus clientes. Tente novamente mais tarde')
    }
  }

  async function getClientData(id) {
    let request = await apiAuth.api.get(`/clients/${id}/`)
    if (request.status === 200) {
      return request.data
    } else {
      toast.warning('Houve um erro ao buscar os dados. Tente novamente mais tarde')
    }
  }

  async function createClient(payload) {
    const request = await apiAuth.api.post('/clients/', payload)
    console.log(request)
    if (request.status === 201) {
      return request.data.results
    } else {
      toast.warning('Houve um erro ao criar o cliente. Tente novamente.')
      return false
    }
  }

  async function updateClient(payload, id) {
    const request = await apiAuth.api.patch(`/clients/${id}/`, payload)
    if (request.status === 200) {
      return request.data.results
    } else {
      toast.warning('Houve um erro ao atualizar seu cliente. Tente novamente.')
      return false
    }
  }

  async function deleteClient(id) {
    const request = await apiAuth.api.delete(`/clients/${id}/`)
    if (request.status === 200) {
      return request.data.results
    } else {
      toast.warning('Houve um erro ao apagar seu cliente. Tente novamente.')
      return false
    }
  }

  return { getClients, createClient, updateClient, deleteClient, getClientData }
})
