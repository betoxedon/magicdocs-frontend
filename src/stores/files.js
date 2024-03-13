import { defineStore } from 'pinia'
import apiAuth from '../api/api.js'
import { useToast } from 'vue-toastification'
const toast = useToast()
import { ref } from 'vue'

export const useFileStore = defineStore('files', () => {
  const files = ref([])

  async function getFiles() {
    let request = await apiAuth.api.get(`/files/`)
    if (request.status === 200) {
      files.value = request.data.results
      return request.data.results
    } else {
      toast.warning('Houve um erro ao buscar seus arquivos. Tente novamente.')
    }
  }

  async function getClientFiles(client_id) {
    let request = await apiAuth.api.get(`/files/?client=${client_id}`)
    if (request.status === 200) {
      files.value = request.data.results
      return request.data.results
    } else {
      toast.warning('Houve um erro ao buscar seus arquivos. Tente novamente.')
    }
  }

  async function getSingleFile(id) {
    let request = await apiAuth.api.get(`/files/?id=${id}`)
    if (request.status === 200) {
      files.value = request.data.results
      return request.data.results
    } else {
      toast.warning('Houve um erro ao buscar seus arquivos. Tente novamente.')
    }
  }

  async function postFiles(payload) {
    let headers = {
      'Content-Type': 'multipart/form-data'
    }
    let request = await apiAuth.api.post(`/files/`, payload, { headers })
    return request
  }

  async function updateDocFile(payload) {
    let headers = {
      'Content-Type': 'multipart/form-data'
    }
    let request = await apiAuth.api.patch(`/files/${payload.id}/`, payload, { headers })
    return request
  }

  return { postFiles, getFiles, files, getSingleFile, getClientFiles, updateDocFile }
})
