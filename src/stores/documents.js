import { defineStore } from "pinia";
import {ref} from 'vue'
import { useToast } from "vue-toastification";
import apiAuth from "../api/api.js";

const toast = useToast()

export const useDocumentStore = defineStore('document', ()=>{
    const pads = ref([])
    const padDetail = ref('')

    async function getPads(payload = null){
        pads.value = await apiAuth.api.get('/api/files/', {params: {q: payload}}).then((res)=>{
            return res.data.results
        })
    }

    async function deletePad(payload = null){
        await apiAuth.api.delete(`/api/files/${payload}/`,).then(()=>{
            return getPads()
        })
    }
    return { getPads, pads, padDetail, deletePad }
})