import { defineStore } from "pinia";
import {ref} from 'vue'
import { useToast } from "vue-toastification";
import apiAuth from "../api/api.js";
import { closeModal } from "jenesius-vue-modal";
const toast = useToast()

export const useDocumentStore = defineStore('document', ()=>{
    const pads = ref([])
    const pad = ref(null)
    const padDetail = ref('')

    async function getPads(payload = null){
        pads.value = await apiAuth.api.get('/files/', {params: {q: payload}}).then((res)=>{
            return res.data.results
        })
    }

    async function getPadToDoc(payload = null){
        pad.value = await apiAuth.api.get(`/files/${payload}`).then((res)=>{
            return res.data
        })
    }
    

    async function deletePad(payload = null){
        await apiAuth.api.delete(`/files/${payload}/`,).then(()=>{
            return getPads()
        })
    }

    async function createPad(payload = null){
        await apiAuth.api.post(`/files/`,payload).then(()=>{
            getPads()
            closeModal()
        }).catch((err)=> {
            toast.warning('Verique os campos e tente novamente!')
            return err
        })
    }

    async function updatePad(payload = null){
        await apiAuth.api.put(`/files/${payload.pad_id}/`, payload).then(()=>{
            getPads()
            closeModal()
        }).catch((err)=> {
            return err
        })
    }
    return { getPads, pads, padDetail, deletePad, createPad, updatePad, getPadToDoc, pad }
})