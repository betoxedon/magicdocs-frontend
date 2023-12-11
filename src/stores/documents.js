import { defineStore } from "pinia";
import {ref} from 'vue'
import { useToast } from "vue-toastification";
import apiAuth from "../api/api.js";
import { closeModal } from "jenesius-vue-modal";
const toast = useToast()

export const useDocumentStore = defineStore('document', ()=>{
    const pads = ref([])
    const padDetail = ref('')

    async function getPads(payload = null){
        pads.value = await apiAuth.api.get('/files/', {params: {q: payload}}).then((res)=>{
            return res.data.results
        })
    }

    async function deletePad(payload = null){
        await apiAuth.api.delete(`/files/${payload}/`,).then(()=>{
            return getPads()
        })
    }

    async function createPad(payload = null){
        console.log(payload)
        await apiAuth.api.post(`/files/`,{"name": payload.name, "description": payload.description}).then(()=>{
            getPads()
            closeModal()
        }).catch((err)=> {
            return err
        })
    }
    return { getPads, pads, padDetail, deletePad, createPad }
})