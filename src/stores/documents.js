import { defineStore } from "pinia";
import {ref} from 'vue'
import { useToast } from "vue-toastification";
import apiAuth from "../api/api.js";
import { closeModal } from "jenesius-vue-modal";
import { useRouter } from "vue-router";

const router = useRouter()
const toast = useToast()


export const useDocumentStore = defineStore('document', ()=>{

    const documents = ref([])

    async function getAllFiles(payload = null) {
        pads.value = await apiAuth.api.get('/files/', { params: { q: payload } }).then((res) => {
            documents.value = res.data.results
        return res.data.results
        })
    }


    // O que estiver daqui para baixo deve ser substituído

    const pads = ref([])
    const padFromModel = ref([])
    const padTemplate = ref({
        "name": 'Novo Documento',
        "description": '',
        "type": 'doc',
        "client": "",
        "content": "",
        "action": ""
    })
    const pad = ref(padTemplate.value)
    const padDetail = ref('')

    function loadNewPad(){
        pad.value = {...padTemplate.value}
    }

    async function getPads(payload = null){
        pads.value = await apiAuth.api.get('/files/', {params: {q: payload}}).then((res)=>{
            return res.data.results
        })
    }

    async function getPadToDoc(payload = null){
        let res = await apiAuth.api.get(`/files/${payload}`)
        return res.data
    }
    

    async function deletePad(payload = null){
        await apiAuth.api.delete(`/files/${payload}/`,).then(()=>{
            return getPads()
        })
    }

    async function createPad(payload = null){
        await apiAuth.api.post(`/files/`,payload).then((res)=>{
            getPads()
            closeModal()
            pad.value = res.data
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

    function handlePromptResponse(prompt, response){
        pad.value.content = pad.value.content.replace(prompt, response)
    }
    return {
      getPads,
      pads,
      padDetail,
      deletePad,
      createPad,
      updatePad,
      getPadToDoc,
      pad,
      loadNewPad,
      handlePromptResponse,
      padFromModel,
      // manter apenas daqui para baixo
      getAllFiles,
      documents
    }
})