import { defineStore } from "pinia";
import { ref } from "vue";
import apiAuth from '../api/api.js'

export const useDocumentoModelStore = defineStore('model', ()=>{
    const models = ref([])
    const model = ref({})

    const campos = {
      name: 'Nome',
      email: 'Email',
      sex: 'Sexo',
      cpf: 'CPF',
      rg: 'RG',
      postal_code: 'CEP',
      phone_number: 'Telefone',
      adress: 'Endereço',
      neighborhood: 'Bairro',
      city: 'Cidade',
      state: 'Estado',
      number: 'Número',
      causa: 'Causa',
      birth_date: 'Data de Nascimento'
    }

    async function getModels(q=null) {
        let query = `?q=${q}`
        let url = `/model/`
        if (q) {
            url = `/model/${query}`
        }
        models.value = (await apiAuth.api.get(url)).data
    }

    async function getModelInstance(id) {
          let url = `/model/${id}/`
          model.value = (await apiAuth.api.get(url)).data
        }

    async function createModel(payload) {
        let res = await apiAuth.api.post(`/model/`, payload)
        if (res.status === 201) {
            getModels()
            return true
        }
        return false
    }

    return { models, getModels, createModel, getModelInstance, model, campos }
})